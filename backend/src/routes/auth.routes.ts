import { Router } from "express"
import { Request, Response } from 'express';
import { validationResult } from "express-validator";
import prisma from "../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { checkAuth } from "../middleware/checkAuth";
import { authCookieOptions } from "../config/authCookies";
import { loginValidator, registerValidator } from "../middleware/validators";
import { refillEnergy } from "../utils/ActionUtils";

const authRouter = Router()

authRouter.post("/login", loginValidator, async (req: Request, res: Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg })
    }

    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            username: username,
        }
    })
    if (user == null) {
        return res.status(400).json({ error: "Invalid username or password" })
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
        return res.status(400).json({ error: "Invalid username or password" })
    }

    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
    )

    res.cookie("token", token, authCookieOptions);

    res.json({ status: "Logged in" })
})

authRouter.post("/logout", (_req: Request, res: Response) => {
    res.clearCookie("token", authCookieOptions);

    res.json({ status: "logged out" });
})


authRouter.post("/register", registerValidator, async (req: Request, res: Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg })
    }

    const { username, password, email = null } = req.body;

    const exists = await prisma.user.findUnique({
        where: {
            username: username
        }
    })
    if (exists != null) {
        return res.status(400).json({ error: "Username already in use" })
    }

    const newUser = await prisma.user.create({
        data: {
            username: username,
            password: await bcrypt.hash(password, 12),
            email: email,
            skills: { create: {} },
            attributes: { create: {} },
            stats: { create: { trainingAttribute: "Health" } },
            equipment: { create: {} },
        }
    })

    const token = jwt.sign(
        { userId: newUser.id },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
    )

    res.cookie("token", token, authCookieOptions);

    res.json({ status: "Success" })
})


authRouter.get("/me", checkAuth, async (req: Request, res: Response) => {
    await refillEnergy(req.userId as number)

    const user = await prisma.user.findUnique({
        where: { id: req.userId },
        include: {
            skills: true,
            attributes: true,
            stats: true,
            equipment: true,
            inventory: true,
        },
    });

    if (!user) return res.sendStatus(404);

    res.json(user);
});


export default authRouter
