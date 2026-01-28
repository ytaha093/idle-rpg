import { ItemId } from "../generated/prisma/client"
import prisma from "../prisma"
import { getLevel, getNextLevelXP } from "./levelUtils"

export async function getGatheringXPDrop(userID: number, type: "Mining" | "Woodcutting" | "Quarrying") {
    const equipment = await getEquipmentBonuses(userID, type)
    const base = 100

    const xp = await getUserSkillXP(userID, type)

    const levelModifier = (1 + (getLevel(xp) / 100) * 2) // +2% xp per level
    const equipmentXpModifier = equipment.xpBonus // equipment xp bonus
    const totalXpModifier = levelModifier * equipmentXpModifier

    const xpDrop = Math.round(base * totalXpModifier)
    const levelUp = getNextLevelXP(xp) <= xp + xpDrop

    await prisma.skills.update({
        where: {
            userId: userID
        },
        data: {
            [type]: { increment: xpDrop }
        }
    })

    return { amount: xpDrop, skill: type, levelUp: levelUp, level: levelUp && getLevel(xp) + 1 }
}

export async function getGatheringItemDrops(userID: number, type: "Mining" | "Woodcutting" | "Quarrying"): Promise<{ itemId: ItemId; amount: number; log: boolean }[]> {
    const level = getLevel(await getUserSkillXP(userID, type))
    const equipment = await getEquipmentBonuses(userID, type)

    let itemDrops

    switch (type) {
        case "Mining": itemDrops = miningDrops(level, equipment); break
        case "Woodcutting": itemDrops = woodcuttingDrops(level, equipment); break
        case "Quarrying": itemDrops = quarryingDrops(level, equipment); break
    }

    for (const drop of itemDrops) {
        await prisma.inventoryItem.upsert({
            where: {
                userId_itemId: {
                    userId: userID,
                    itemId: drop.itemId
                },
            },
            update: {
                amount: { increment: drop.amount },
            },
            create: {
                userId: userID,
                itemId: drop.itemId,
                amount: drop.amount,
            }
        })
    }

    return itemDrops

}

function miningDrops(level: number, equipment: EquipmentBonuses) {
    const drops = []

    const randomModifier = getRandomArbitrary(0.9, 1.1)
    const lootChanceModifier = equipment.lootChanceBonus // item drop chance bonus
    const levelModifier = (1 + (level / 100)) // +1% per level
    const resourceModifier = equipment.resourceBonus // equipment xp bonus

    // always drop metal
    drops.push({ itemId: ItemId.Metal, amount: Math.round((100 * (levelModifier * resourceModifier)) * randomModifier), log: false })
    // level based rare items
    if (level >= 50) {
        if (Math.random() < 0.02 * lootChanceModifier) drops.push({ itemId: ItemId.GemFragment, amount: Math.round(12 * randomModifier), log: true })
        if (Math.random() < 0.02 * lootChanceModifier) drops.push({ itemId: ItemId.Ruby, amount: Math.round(1 * randomModifier), log: true })
    } else if (level >= 60) {
        if (Math.random() < 0.005 * lootChanceModifier) drops.push({ itemId: ItemId.Diamond, amount: Math.round(1 * randomModifier), log: true })
    } else if (level >= 75) {
        if (Math.random() < 0.002 * lootChanceModifier) drops.push({ itemId: ItemId.Dragonstone, amount: Math.round(1 * randomModifier), log: true })
    } else if (level >= 100) {
        if (Math.random() < 0.0005 * lootChanceModifier) drops.push({ itemId: ItemId.Onyx, amount: Math.round(1 * randomModifier), log: true })
    }
    // other drops
    if (Math.random() < 0.02 * lootChanceModifier) drops.push({ itemId: ItemId.ToolComponent, amount: Math.round(1 * randomModifier * levelModifier), log: true })
    if (Math.random() < 0.005) drops.push({ itemId: ItemId.Credits, amount: Math.round(1 * randomModifier), log: true })


    return drops
}


function woodcuttingDrops(level: number, equipment: EquipmentBonuses) {
    const drops = []

    const randomModifier = getRandomArbitrary(0.9, 1.1)
    const lootChanceModifier = equipment.lootChanceBonus // item drop chance bonus
    const levelModifier = (1 + (level / 100)) // +1%  per level
    const resourceModifier = equipment.resourceBonus // equipment xp bonus

    // always drop wood
    drops.push({ itemId: ItemId.Wood, amount: Math.round((100 * (levelModifier * resourceModifier)) * randomModifier), log: false })
    // level based rare items
    if (level >= 50) {
        if (Math.random() < 0.02 * lootChanceModifier) drops.push({ itemId: ItemId.TreeSap, amount: Math.round(1 * randomModifier), log: true })
        if (Math.random() < 0.02 * lootChanceModifier) drops.push({ itemId: ItemId.ResourceCache, amount: Math.round(1 * randomModifier), log: true })
    } else if (level >= 60) {
        if (Math.random() < 0.005 * lootChanceModifier) drops.push({ itemId: ItemId.BirdsNest, amount: Math.round(1 * randomModifier), log: true })
    } else if (level >= 75) {
        if (Math.random() < 0.0005 * lootChanceModifier) drops.push({ itemId: ItemId.GoldenEgg, amount: Math.round(1 * randomModifier), log: true })
    }
    // other drops
    if (Math.random() < 0.02 * lootChanceModifier) drops.push({ itemId: ItemId.ToolComponent, amount: Math.round(1 * randomModifier * levelModifier), log: true })
    if (Math.random() < 0.005) drops.push({ itemId: ItemId.Credits, amount: Math.round(1 * randomModifier), log: true })

    return drops
}


function quarryingDrops(level: number, equipment: EquipmentBonuses) {
    const drops = []

    const randomModifier = getRandomArbitrary(0.9, 1.1)
    const lootChanceModifier = equipment.lootChanceBonus // item drop chance bonus
    const levelModifier = (1 + (level / 100)) // +1% per level
    const resourceModifier = equipment.resourceBonus // equipment xp bonus

    // always drop stone
    drops.push({ itemId: ItemId.Stone, amount: Math.round((100 * (levelModifier * resourceModifier)) * randomModifier), log: false })
    // level based rare items
    if (level >= 50) {
        if (Math.random() < 0.02 * lootChanceModifier) drops.push({ itemId: ItemId.Sandstone, amount: Math.round(1 * randomModifier), log: true })
    } else if (level >= 60) {
        if (Math.random() < 0.005 * lootChanceModifier) drops.push({ itemId: ItemId.Marble, amount: Math.round(1 * randomModifier), log: true })
    } else if (level >= 75) {
        if (Math.random() < 0.0005 * lootChanceModifier) drops.push({ itemId: ItemId.Malachite, amount: Math.round(1 * randomModifier), log: true })
    }
    // other drops
    if (Math.random() < 0.02 * lootChanceModifier) drops.push({ itemId: ItemId.ToolComponent, amount: Math.round(1 * randomModifier * levelModifier), log: true })
    if (Math.random() < 0.005) drops.push({ itemId: ItemId.Credits, amount: Math.round(1 * randomModifier), log: true })

    return drops
}

function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

async function getUserSkillXP(userID: number, skill: "Mining" | "Woodcutting" | "Quarrying") {
    const xpData = await prisma.skills.findUnique({
        where: { userId: userID },
        select: { [skill]: true }
    })

    return xpData ? xpData[skill] : 0
}

type Equipment = { level: number; quality: number }

type EquipmentBonuses = { resourceBonus: number, lootChanceBonus: number, xpBonus: number }

async function getEquipmentBonuses(userID: number, skill: "Mining" | "Woodcutting" | "Quarrying"): Promise<EquipmentBonuses> {
    if (skill === "Mining") {
        const equipment = await prisma.equipment.findUnique({
            where: { userId: userID },
            select: { PickaxeLevel: true, PickaxeQuality: true }
        })
        return getBonuses({ level: equipment?.PickaxeLevel ?? 1, quality: equipment?.PickaxeQuality ?? 1 })
    } else if (skill === "Woodcutting") {
        const equipment = await prisma.equipment.findUnique({
            where: { userId: userID },
            select: { HatchetLevel: true, HatchetQuality: true }
        })
        return getBonuses({ level: equipment?.HatchetLevel ?? 1, quality: equipment?.HatchetQuality ?? 1 })
    } else {
        const equipment = await prisma.equipment.findUnique({
            where: { userId: userID },
            select: { HammerLevel: true, HammerQuality: true }
        })
        return getBonuses({ level: equipment?.HammerLevel ?? 1, quality: equipment?.HammerQuality ?? 1 })
    }
}


function getBonuses(equipment: Equipment): EquipmentBonuses {
    const resourceBonus = 1 + (equipment.level * 0.02)
    const lootChanceBonus = 1 + (equipment.quality * 0.02)
    const xpBonus = 1 + (equipment.quality * 0.02)

    return { resourceBonus, lootChanceBonus, xpBonus }
}