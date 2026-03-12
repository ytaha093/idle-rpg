import { Router } from "express";
import { Request, Response } from 'express';
import { checkAuth } from "../middleware/checkAuth";
import prisma from "../prisma";
import { validationResult } from "express-validator";
import { battlingValidator, gatheringValidator, trainAttributeValidator, upgradeEquipmentValidator } from "../middleware/validators";
import { getGatheringItemDrops, getGatheringXPDrop } from "../utils/gatheringUtils";
import { checkCooldown } from "../middleware/checkCooldown";
import { getActionBonus, getAttributeUpgrade, refillEnergy } from "../utils/ActionUtils";
import { checEnergyCount } from "../middleware/checEnergyCount";
import { getBattleData, getCombatItemDrops, getCombatXPDrop, updateLastMob } from "../utils/BattlingUtils";
import { type EquipmentSlot, type UpgradeType, queueUpgradeUserEquipment } from "../utils/upgradeEquipmentUtils";

const actionRouter = Router()

actionRouter.post("/refill-energy", checkAuth, async (req: Request, res: Response) => {
    const energy = await refillEnergy(req.userId as number)

    res.json({ energy: energy.currentEnergy })
})

actionRouter.post("/train-attribute", checkAuth, trainAttributeValidator, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { attribute } = req.body

    await prisma.stats.update({
        where: {
            userId: req.userId
        },
        data: {
            trainingAttribute: attribute
        }
    })

    res.json({ attribute: attribute })
})

actionRouter.post("/upgrade-equipment", checkAuth, upgradeEquipmentValidator, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { equipment, type } = req.body as { equipment: EquipmentSlot, type: UpgradeType }
    const userId = req.userId as number

    try {
        const upgraded = await queueUpgradeUserEquipment(userId, equipment, type)
        return res.json(upgraded)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message })
        }
        return res.status(500).json({ error: "Failed to upgrade equipment" })
    }
})

actionRouter.post("/gathering", checkAuth, checkCooldown, checEnergyCount, gatheringValidator, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { type } = req.body
    const userId = req.userId as number

    const [xpDrop, itemDrops, actionBonus, attributeUpgrade] = await Promise.all([
        getGatheringXPDrop(userId, type),
        getGatheringItemDrops(userId, type),
        getActionBonus(userId),
        getAttributeUpgrade(userId)
    ])

    return res.json({ xp: xpDrop, item: itemDrops, actionBonus: actionBonus, attribute: attributeUpgrade, energyRemaining: req.energy })
})

actionRouter.post("/battling", checkAuth, checkCooldown, checEnergyCount, battlingValidator, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { mobID }: { mobID: number } = req.body
    const userId = req.userId as number

    updateLastMob(userId, mobID)
    const battleData = await getBattleData(userId, mobID)

    const [xpDrop, itemDrops, actionBonus, attributeUpgrade] = await Promise.all([
        getCombatXPDrop(battleData.win, mobID, userId),
        getCombatItemDrops(battleData.win, mobID, userId),
        getActionBonus(userId),
        getAttributeUpgrade(userId)
    ])

    return res.json({ xp: xpDrop, item: itemDrops, actionBonus: actionBonus, attribute: attributeUpgrade, energyRemaining: req.energy, battleData: battleData })
})


export default actionRouter