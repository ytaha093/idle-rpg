import { NextFunction, Request, Response } from 'express'
import prisma from '../prisma'

export async function checEnergyCount(req: Request, res: Response, next: NextFunction) {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" })

    const stats = await prisma.stats.findUnique({
        where: { userId: req.userId },
        select: { currentEnergy: true }
    })

    if (!stats) return res.status(401).json({ error: "No user found" })

    if (stats.currentEnergy <= 0) {
        return res.status(403).json({ error: `Out of energy` })
    }

    // Update energy
    await prisma.stats.update({
        where: { userId: req.userId },
        data: { currentEnergy: { decrement: 1 } }
    });

    req.energy = stats.currentEnergy - 1

    next();
}