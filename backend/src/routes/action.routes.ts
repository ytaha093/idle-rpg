import { Router } from "express";
import { Request, Response } from 'express';
import { checkAuth } from "../middleware/checkAuth";
import prisma from "../prisma";
import { body, validationResult } from "express-validator";

const actionRouter = Router()

const trainAttributeValidator = [
    body("attribute")
        .exists().withMessage("trainingAttribute is required")
        .isIn(['Health', 'Attack', 'Defense', 'Accuracy', 'Dodge', 'GoldRush', 'Mining', 'Woodcutting', 'Quarrying', 'ClanBoost'])
        .withMessage("Invalid training attribute")
];

actionRouter.post("/train-attribute", checkAuth, trainAttributeValidator, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { attribute } = req.body;

    const updatedStats = await prisma.stats.update({
        where: {
            userId: req.userId
        },
        data: {
            trainingAttribute: attribute
        }
    });

    res.json({ attribute: updatedStats });
});


export default actionRouter;