import { Router } from "express";
import { Request, Response } from 'express';
import { checkAuth } from "../middleware/checkAuth";
import prisma from "../prisma";
import { validationResult } from "express-validator";
import { gatheringValidator, trainAttributeValidator } from "../middleware/validators";
import { ItemId } from "../generated/prisma/enums";
import { Skills } from "../generated/prisma/client";

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

actionRouter.post("/gathering", checkAuth, gatheringValidator, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { type } = req.body

    // handle the xp drop
    const xp = await prisma.skills.update({
        where: {
            userId: req.userId
        },
        data: {
            [type]: { increment: 100 }
        }
    })

    // handle the item drop
    function dropType(type: "Mining" | "Woodcutting" | "Quarrying"): ItemId {
        switch (type) {
            case "Mining": return ItemId.Metal
            case "Woodcutting": return ItemId.Wood
            case "Quarrying": return ItemId.Stone
        }
    }

    const itemId = dropType(type)

    const item = await prisma.inventoryItem.upsert({
        where: {
            userId_itemId: {
                userId: req.userId as number,
                itemId
            },
        },
        update: {
            amount: { increment: 100 },
        },
        create: {
            userId: req.userId as number,
            itemId,
            amount: 100,
        },
    })

    return res.json({ xp: { skill: type, xp: xp[type as keyof Skills] }, item: [item] })
})


export default actionRouter