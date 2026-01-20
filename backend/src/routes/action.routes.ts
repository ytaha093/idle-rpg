import { Router } from "express";
import { Request, Response } from "express";
import { checkAuth } from "../middleware/checkAuth";
import prisma from "../prisma";
import { body, validationResult } from "express-validator";
import { ItemId } from "../generated/prisma/enums";

const actionRouter = Router();

const trainAttributeValidator = [
  body("attribute")
    .exists()
    .withMessage("trainingAttribute is required")
    .isIn([
      "Health",
      "Attack",
      "Defense",
      "Accuracy",
      "Dodge",
      "GoldRush",
      "Mining",
      "Woodcutting",
      "Quarrying",
      "ClanBoost",
    ])
    .withMessage("Invalid training attribute"),
];

actionRouter.post(
  "/train-attribute",
  checkAuth,
  trainAttributeValidator,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { attribute } = req.body;

    await prisma.stats.update({
      where: {
        userId: req.userId,
      },
      data: {
        trainingAttribute: attribute,
      },
    });

    res.json({ attribute: attribute });
  },
);

// Helper function to add or update inventory item
async function addInventoryItem(
  userId: number,
  itemId: ItemId,
  amount: number,
) {
  return prisma.inventoryItem.upsert({
    where: {
      userId_itemId: {
        userId,
        itemId,
      },
    },
    update: {
      amount: {
        increment: amount,
      },
    },
    create: {
      userId,
      itemId,
      amount,
    },
  });
}

actionRouter.post(
  "/gathering",
  checkAuth,
  async (req: Request, res: Response) => {
    if (req.userId === undefined) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const userId: number = req.userId;

    addInventoryItem(userId, ItemId.Wood, 100);

    res.json({ Wood: "+100 Wood" });
  },
);

export default actionRouter;
