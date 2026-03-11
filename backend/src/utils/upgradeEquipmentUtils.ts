import { ItemId } from "../generated/prisma/client"
import prisma from "../prisma"
import { getArmorUpgradeCost, getEquipmentUpgradeCost, getWeaponUpgradeCost } from "./equipmentUtils"

type ArmorSlot =
    | "Helm"
    | "Armor"
    | "Gauntlets"
    | "Legs"
    | "Boots"

type WeaponSlot =
    | "MainWeapon"
    | "OffWeapon"

type ToolSlot =
    | "Pickaxe"
    | "Hatchet"
    | "Hammer"

export type EquipmentSlot = ToolSlot | WeaponSlot | ArmorSlot
export type UpgradeType = "level" | "quality"
type UpgradeResult = {
    equipment: EquipmentSlot, level: number, quality: number,
    item: { itemId: ItemId, amount: number }[]
}

const TOOL_SLOTS = ["Pickaxe", "Hatchet", "Hammer"]
const upgradeQueueByUserId = new Map<number, Promise<UpgradeResult>>()

function isToolSlot(item: string): item is ToolSlot {
    return TOOL_SLOTS.includes(item as ToolSlot)
}

function getToolMaterial(equipment: ToolSlot): ("Metal" | "Wood" | "Stone") {
    // Tool level upgrades are paid with their matching gathering material.
    if (equipment === "Pickaxe") return "Metal"
    if (equipment === "Hatchet") return "Wood"
    return "Stone"
}


export function queueUpgradeUserEquipment(userId: number, equipment: EquipmentSlot, type: UpgradeType): Promise<UpgradeResult> {
    const latestUpgrade = upgradeQueueByUserId.get(userId)

    const nextUpgrade = latestUpgrade ?
        latestUpgrade
            .catch(() => undefined)
            .then(() => upgradeUserEquipment(userId, equipment, type)) :
        upgradeUserEquipment(userId, equipment, type)

    const trackedUpgrade = nextUpgrade.finally(() => {
        if (upgradeQueueByUserId.get(userId) === trackedUpgrade) {
            upgradeQueueByUserId.delete(userId)
        }
    })

    upgradeQueueByUserId.set(userId, trackedUpgrade)

    return trackedUpgrade
}


export async function upgradeUserEquipment(userId: number, equipment: EquipmentSlot, type: UpgradeType): Promise<UpgradeResult> {
    return prisma.$transaction(async (tx) => {

        const equipmentLevel = (equipment + "Level")
        const equipmentQuality = (equipment + "Quality")

        const currentEquipment = await tx.equipment.findUnique({
            where: { userId },
            select: {
                [equipmentLevel]: true,
                [equipmentQuality]: true,
            }
        })
        if (!currentEquipment) throw new Error("Equipment not found")

        let upgradeItemId: ItemId
        let upgradeCost: number
        if (isToolSlot(equipment)) { // if tool
            if (type === "level") {
                upgradeItemId = getToolMaterial(equipment)
                upgradeCost = getEquipmentUpgradeCost(currentEquipment[equipmentLevel] + 7) * 7
            } else {
                upgradeItemId = "ToolComponent"
                upgradeCost = getArmorUpgradeCost(currentEquipment[equipmentQuality] + 1)
            }
        } else { // if weapon or armor
            if (type === "level") {
                upgradeItemId = "Gold"
                upgradeCost = Math.round(getEquipmentUpgradeCost(currentEquipment[equipmentLevel] + 1) * 2.5)
            } else {
                upgradeItemId = equipment.includes("Weapon") ? "WeaponComponent" : "ArmorComponent"
                upgradeCost = equipment.includes("Weapon") ? getWeaponUpgradeCost(currentEquipment[equipmentQuality] + 1) : getArmorUpgradeCost(currentEquipment[equipmentQuality] + 1)
            }
        }

        // Make sure the player can actually afford the upgrade before changing anything.
        const costItem = await tx.inventoryItem.findUnique({
            where: {
                userId_itemId: {
                    userId,
                    itemId: upgradeItemId,
                }
            }
        })
        if (!costItem || costItem.amount < upgradeCost) {
            throw new Error(`Not enough ${upgradeItemId}`)
        }

        // Deduct the payment inside the same transaction as the equipment upgrade.
        await tx.inventoryItem.update({
            where: {
                userId_itemId: {
                    userId,
                    itemId: upgradeItemId,
                }
            },
            data: {
                amount: { decrement: upgradeCost }
            }
        })

        // Increment only the requested stat (`level` or `quality`).
        await tx.equipment.update({
            where: { userId },
            data: {
                [(type === "level" ? equipmentLevel : equipmentQuality)]: { increment: 1 }
            },
        })

        // Return the final values so the frontend can update its store immediately.
        return {
            equipment,
            level: currentEquipment[equipmentLevel] + (type === "level" ? 1 : 0),
            quality: currentEquipment[equipmentQuality] + (type === "quality" ? 1 : 0),
            item: [{ itemId: upgradeItemId, amount: upgradeCost }]
        }
    })
}

