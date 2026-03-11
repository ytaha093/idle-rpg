import { Attributes, ItemId } from "../generated/prisma/client"
import prisma from "../prisma"
import { getTotalPower } from "./equipmentUtils"
import { getLevel, getNextLevelXP } from "./levelUtils"
import { getMobById } from "./Descriptions/BattlingData"

type battleResponse = {
    win: boolean,
    player: { maxHP: number, currentHP: number, playerDamage: number, playerHits: number, playerMisses: number, playerDodges: number },
    mob: { maxHP: number, currentHP: number, mobDamage: number, mobHits: number, mobMisses: number, mobName: string }
}

export async function getBattleData(userID: number, mobID: number): Promise<battleResponse> {
    const playerStats = await getPlayerStats(userID)
    const mobStats = await getMobStats(mobID)
    let win = false
    let playerHP = playerStats.playerHP
    let mobHP = mobStats.hp
    let playerHits = 0
    let playerMisses = 0
    let playerDodges = 0
    let mobHits = 0
    let mobMisses = 0

    const randomModifier = (Math.random() * 0.1) + 0.95 // random modifier between 0.95 and 1.05
    const playerDamage = Math.round((playerStats.totalAttack * 0.25) + Math.min(1, Math.abs((playerStats.totalAttack * 0.75) - mobStats.defense)) * randomModifier)
    const mobDamage = Math.round(((mobStats.attack * 0.25) + Math.min(1, Math.abs((mobStats.attack * 0.75) - playerStats.totalDefense))) * randomModifier)

    while (playerHP > 0 && mobHP > 0) {
        // Player attacks first
        if (Math.random() < (0.5 + (playerStats.attributes.Accuracy * 0.01))) {
            mobHP -= playerDamage
            playerHits++
        } else {
            playerMisses++
        }

        if (Math.random() < (0.5)) {
            if (Math.random() < (playerStats.attributes.Dodge * 0.01)) {
                playerDodges++
            } else {
                playerHP -= mobDamage
                mobHits++
            }
        } else {
            mobMisses++
        }

        if (mobHP <= 0) {
            win = true
            break
        }
    }

    playerHP = Math.max(0, playerHP)
    mobHP = Math.max(0, mobHP)

    return {
        win,
        player: { maxHP: playerStats.playerHP, currentHP: playerHP, playerDamage, playerHits, playerMisses, playerDodges },
        mob: { maxHP: mobStats.hp, currentHP: mobHP, mobDamage, mobHits, mobMisses, mobName: mobStats.name }
    }
}

async function getMobStats(mobID: number): Promise<{ name: string, attack: number, defense: number, hp: number }> {
    const mob = getMobById(mobID)
    if (!mob) throw new Error("Mob not found")
    return { name: mob.name, attack: mob.power, defense: mob.power / 3, hp: mob.power * 18 }
}

async function getPlayerStats(userID: number): Promise<{ totalAttack: number, totalDefense: number, playerHP: number, attributes: Attributes }> {
    const equipment = await prisma.equipment.findUnique({ where: { userId: userID } })
    if (!equipment) throw new Error("Equipment not found for user")

    let totalAttack = getTotalPower(equipment.MainWeaponLevel, equipment.MainWeaponQuality) +
        getTotalPower(equipment.OffWeaponLevel, equipment.OffWeaponQuality) + 10

    let totalDefense = getTotalPower(equipment.HelmLevel, equipment.HelmQuality) +
        getTotalPower(equipment.ArmorLevel, equipment.ArmorQuality) +
        getTotalPower(equipment.GauntletsLevel, equipment.GauntletsQuality) +
        getTotalPower(equipment.LegsLevel, equipment.LegsQuality) +
        getTotalPower(equipment.BootsLevel, equipment.BootsQuality) + 10


    const combatXP = await prisma.skills.findUnique({ where: { userId: userID }, select: { Battling: true } })
    if (!combatXP) throw new Error("Combat XP not found for user")

    const attributes = await prisma.attributes.findUnique({ where: { userId: userID } })
    if (!attributes) throw new Error("Attributes not found for user")

    totalAttack = totalAttack * (attributes.Attack / 10)
    totalDefense = (totalDefense / 2.5) * (attributes.Defense / 10)

    const playerHP = calcHP(getLevel(combatXP.Battling), attributes.Health);


    return { totalAttack, totalDefense, playerHP, attributes }
}

function hpToNextLevel(n: number): number {
    return Math.floor(5.414538 * n + 41.045074 * Math.sqrt(n) + 6.612773)
}

function baseHP(level: number): number {
    let hp = 50;
    for (let n = 1; n < level; n++) {
        hp += hpToNextLevel(n)
    }
    return hp;
}

function calcHP(level: number, attr: number): number {
    return Math.floor(baseHP(level) * attr / 10)
}

export async function getCombatXPDrop(win: boolean, mobID: number, userID: number): Promise<{ amount: number, skill: string, levelUp: boolean, level: number | false }> {
    const mob = getMobById(mobID)
    if (!mob) throw new Error("Mob not found")

    const xp = await getCombatXP(userID)

    const levelModifier = (1 + (getLevel(xp) / 100) * 2) // +2% xp per level

    const xpDrop = win ? Math.round(mob.xp * levelModifier) : 0
    const levelUp = getNextLevelXP(xp) <= xp + xpDrop

    if (win) {
        await prisma.skills.update({
            where: {
                userId: userID
            },
            data: {
                Battling: { increment: xpDrop }
            }
        })
    }

    return { amount: xpDrop, skill: "Battling", levelUp: levelUp, level: levelUp && getLevel(xp) + 1 }
}

async function getCombatXP(userID: number): Promise<number> {
    const xpData = await prisma.skills.findUnique({
        where: { userId: userID },
        select: { Battling: true }
    })
    if (!xpData) throw new Error("Combat XP not found for user")

    return xpData.Battling
}

type ItemDrop = { itemId: ItemId, amount: number, log: boolean, text?: string, rarity?: number }

export async function getCombatItemDrops(win: boolean, mobID: number, userID: number): Promise<ItemDrop[]> {
    if (!win) return []

    const mob = getMobById(mobID)
    if (!mob) throw new Error("Mob not found")

    const itemDrops = getZoneItemDrops(mob.loot)
    const goldDrop = (100 + (mob.id * 17))
    itemDrops.push({ itemId: "Gold", amount: goldDrop, log: false })

    if (Math.random() <= (1 / 2000)) {
        const goldRush = await getGoldRushDrop(userID, goldDrop)
        itemDrops.push({ itemId: "Gold", amount: goldRush.gold, log: true, text: "Gold Rush: ", rarity: goldRush.rarity })
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

function getZoneItemDrops(lootTable: { item: ItemId, chance: number, amount: number }[]): ItemDrop[] {
    const drops = []
    const dropChance = 0.02
    if (Math.random() >= dropChance) return []

    const totalWeight = lootTable.reduce((sum, loot) => sum + loot.chance, 0)
    let roll = Math.random() * totalWeight

    for (const loot of lootTable) {
        roll -= loot.chance
        if (roll <= 0) {
            drops.push({ itemId: loot.item, amount: loot.amount, log: true })
            break
        }
    }

    return drops
}

async function getGoldRushDrop(userId: number, goldDrop: number): Promise<{ gold: number, rarity: number }> {
    const goldRush = await prisma.attributes.findUnique({
        where: { userId },
        select: { Gold_Rush: true }
    })

    if (Math.random() <= 0.8) {
        return { gold: goldDrop * (100 + goldRush!.Gold_Rush), rarity: 3 }
    } if (Math.random() <= 0.8) {
        return { gold: goldDrop * (200 + (goldRush!.Gold_Rush * 2)), rarity: 4 }
    }
    return { gold: goldDrop * (300 + (goldRush!.Gold_Rush * 3)), rarity: 5 }
}
