import { Attributes, ItemId } from "../generated/prisma/client"
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

type ItemDrop = { itemId: ItemId, amount: number, log: boolean, text?: string, rarity?: number }


export async function getGatheringItemDrops(userID: number, type: "Mining" | "Woodcutting" | "Quarrying"): Promise<ItemDrop[]> {
    const level = getLevel(await getUserSkillXP(userID, type))
    const equipment = await getEquipmentBonuses(userID, type)

    let itemDrops: ItemDrop[]

    switch (type) {
        case "Mining": itemDrops = await miningDrops(userID, level, equipment); break
        case "Woodcutting": itemDrops = await woodcuttingDrops(userID, level, equipment); break
        case "Quarrying": itemDrops = await quarryingDrops(userID, level, equipment); break
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

async function miningDrops(userID: number, level: number, equipment: EquipmentBonuses) {
    const drops: ItemDrop[] = []

    const randomModifier = getRandomArbitrary(0.9, 1.1)
    const lootChanceModifier = equipment.lootChanceBonus // item drop chance bonus
    const levelModifier = (1 + (level / 100)) // +1% per level
    const resourceModifier = equipment.resourceBonus // equipment xp bonus

    // always drop metal
    const resourceAmount = Math.round((100 * (levelModifier * resourceModifier)) * randomModifier)
    drops.push({ itemId: ItemId.Metal, amount: resourceAmount, log: false })

    // roll for resource rush
    if (Math.random() <= (1 / 2000)) {
        const resourceRush = await getResourceRushDrop(userID, resourceAmount, "Mining")
        drops.push({ itemId: ItemId.Metal, amount: resourceRush.resource, log: true, text: "Resource Rush: ", rarity: resourceRush.rarity })
    }

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
    if (Math.random() < 0.001) drops.push({ itemId: ItemId.Credits, amount: Math.round(1 * randomModifier), log: true })


    return drops
}


async function woodcuttingDrops(userID: number, level: number, equipment: EquipmentBonuses) {
    const drops = []

    const randomModifier = getRandomArbitrary(0.9, 1.1)
    const lootChanceModifier = equipment.lootChanceBonus // item drop chance bonus
    const levelModifier = (1 + (level / 100)) // +1%  per level
    const resourceModifier = equipment.resourceBonus // equipment xp bonus

    // always drop metal
    const resourceAmount = Math.round((100 * (levelModifier * resourceModifier)) * randomModifier)
    drops.push({ itemId: ItemId.Wood, amount: resourceAmount, log: false })

    // roll for resource rush
    if (Math.random() <= (1 / 2000)) {
        const resourceRush = await getResourceRushDrop(userID, resourceAmount, "Woodcutting")
        drops.push({ itemId: ItemId.Wood, amount: resourceRush.resource, log: true, text: "Resource Rush: ", rarity: resourceRush.rarity })
    }

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


async function quarryingDrops(userID: number, level: number, equipment: EquipmentBonuses) {
    const drops = []

    const randomModifier = getRandomArbitrary(0.9, 1.1)
    const lootChanceModifier = equipment.lootChanceBonus // item drop chance bonus
    const levelModifier = (1 + (level / 100)) // +1% per level
    const resourceModifier = equipment.resourceBonus // equipment xp bonus

    // always drop metal
    const resourceAmount = Math.round((100 * (levelModifier * resourceModifier)) * randomModifier)
    drops.push({ itemId: ItemId.Stone, amount: resourceAmount, log: false })

    // roll for resource rush
    if (Math.random() <= (1 / 2000)) {
        const resourceRush = await getResourceRushDrop(userID, resourceAmount, "Quarrying")
        drops.push({ itemId: ItemId.Stone, amount: resourceRush.resource, log: true, text: "Resource Rush: ", rarity: resourceRush.rarity })
    }

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
        return getBonuses({ level: equipment?.PickaxeLevel ?? 0, quality: equipment?.PickaxeQuality ?? 0 })
    } else if (skill === "Woodcutting") {
        const equipment = await prisma.equipment.findUnique({
            where: { userId: userID },
            select: { HatchetLevel: true, HatchetQuality: true }
        })
        return getBonuses({ level: equipment?.HatchetLevel ?? 0, quality: equipment?.HatchetQuality ?? 0 })
    } else {
        const equipment = await prisma.equipment.findUnique({
            where: { userId: userID },
            select: { HammerLevel: true, HammerQuality: true }
        })
        return getBonuses({ level: equipment?.HammerLevel ?? 0, quality: equipment?.HammerQuality ?? 0 })
    }
}


function getBonuses(equipment: Equipment): EquipmentBonuses {
    const resourceBonus = 1 + (equipment.level * 0.01)
    const lootChanceBonus = 1 + (equipment.quality * 0.01)
    const xpBonus = 1 + (equipment.quality * 0.01)

    return { resourceBonus, lootChanceBonus, xpBonus }
}

async function getResourceRushDrop(userId: number, resourceAmount: number, attribute: keyof Attributes): Promise<{ resource: number, rarity: number }> {
    const rush = await prisma.attributes.findUnique({
        where: { userId },
        select: { [attribute]: true }
    })

    if (Math.random() <= 0.8) {
        return { resource: resourceAmount * (100 + rush![attribute]), rarity: 3 }
    } if (Math.random() <= 0.8) {
        return { resource: resourceAmount * (200 + (rush![attribute] * 2)), rarity: 4 }
    }
    return { resource: resourceAmount * (300 + (rush![attribute] * 3)), rarity: 5 }
}

