import { NextFunction, Request, Response } from 'express'
import prisma from '../prisma'

const COOLDOWN_MS = 5400; // 5.4 seconds instead of 5.5 to account for varriance in network latency

export async function checkCooldown(req: Request, res: Response, next: NextFunction) {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" })

    const stats = await prisma.stats.findUnique({
        where: { userId: req.userId },
        select: { lastActionAt: true }
    })

    if (!stats) return res.status(401).json({ error: "No user found" })

    const now = new Date();
    const lastAction = stats.lastActionAt;

    if (lastAction) {
        const timeSinceLastAction = now.getTime() - lastAction.getTime();

        if (timeSinceLastAction < COOLDOWN_MS) {
            return res.status(429).json({ error: `Action on cooldown` })
        }
    }

    // Update last action time
    await prisma.stats.update({
        where: { userId: req.userId },
        data: { lastActionAt: now }
    });

    next();
}