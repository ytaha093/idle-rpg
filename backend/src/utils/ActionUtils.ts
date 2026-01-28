import prisma from "../prisma"
import { ItemId } from "../generated/prisma/enums"

export async function getActionBonus(userId: number) {
    const stats = await prisma.stats.findUnique({
        where: {
            userId
        },
        select: {
            bonusProgress: true,
            bonusCap: true
        }
    })

    if (!stats) {
        return { bonusCap: 0, bonusProgress: 0 }
    }

    let newBonusProgress = stats.bonusProgress + 1
    let newBonusCap = stats.bonusCap
    let triggerBonus = false
    let bonusItem = null


    if (newBonusProgress == newBonusCap) {
        triggerBonus = true
        if (Math.random() < 0.1) {
            bonusItem = { itemId: ItemId.Credits, amount: 1 }
        } else {
            bonusItem = { itemId: ItemId.Gold, amount: newBonusCap * 15 }
        }
    }

    if (newBonusProgress > newBonusCap) {
        newBonusProgress = 1
        newBonusCap++
    }

    await prisma.stats.update({
        where: {
            userId
        },
        data: {
            bonusProgress: newBonusProgress,
            bonusCap: newBonusCap
        }
    })

    if (bonusItem) {
        await prisma.inventoryItem.upsert({
            where: {
                userId_itemId: {
                    userId,
                    itemId: bonusItem.itemId
                },
            },
            update: {
                amount: { increment: bonusItem.amount },
            },
            create: {
                userId,
                itemId: bonusItem.itemId,
                amount: bonusItem.amount,
            }
        })
    }

    return { bonusProgress: newBonusProgress, bonusCap: newBonusCap, triggerBonus: triggerBonus, bonusItem: bonusItem }
}

export async function getAttributeUpgrade(userID: number) {
    let attributeUpgrade = null

    const stats = await prisma.stats.findUnique({
        where: {
            userId: userID
        },
        select: {
            trainingAttribute: true,
        }
    })
    if (!stats) {
        return attributeUpgrade
    }

    const currentAttribute = await prisma.attributes.findUnique({
        where: {
            userId: userID
        },
        select: {
            [stats.trainingAttribute]: true,
        }
    })
    if (!currentAttribute) {
        return attributeUpgrade
    }

    // how many full 100-level chunks
    const tiers = Math.floor(currentAttribute[stats.trainingAttribute] / 50);

    // each tier reduces chance by 30%
    const chance = 0.04 * Math.pow(0.85, tiers);


    if (Math.random() < chance) {
        const attribute = (stats.trainingAttribute).replace("_", "");
        await prisma.attributes.update({
            where: {
                userId: userID
            },
            data: {
                [attribute]: { increment: 1 }
            }
        })
        attributeUpgrade = { attribute, amount: 1 }
    }
    return attributeUpgrade
}