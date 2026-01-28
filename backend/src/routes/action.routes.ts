import { Router } from "express";
import { Request, Response } from 'express';
import { checkAuth } from "../middleware/checkAuth";
import prisma from "../prisma";
import { validationResult } from "express-validator";
import { gatheringValidator, trainAttributeValidator } from "../middleware/validators";
import { getGatheringItemDrops, getGatheringXPDrop } from "../utils/gatheringUtils";
import { checkCooldown } from "../middleware/checkCooldown";
import { getActionBonus, getAttributeUpgrade } from "../utils/ActionUtils";

const actionRouter = Router()

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

actionRouter.post("/gathering", checkAuth, checkCooldown, gatheringValidator, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { type } = req.body
    const xpDrop = await getGatheringXPDrop(req.userId as number, type)
    const itemDrops = await getGatheringItemDrops(req.userId as number, type)
    const actionBonus = await getActionBonus(req.userId as number)
    const attributeUpgrade = await getAttributeUpgrade(req.userId as number)

    return res.json({ xp: xpDrop, item: itemDrops, actionBonus: actionBonus, attribute: attributeUpgrade })
})


export default actionRouter