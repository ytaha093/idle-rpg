import { Router } from "express"
import { Request, Response } from 'express';
import { body, validationResult } from "express-validator";
import prisma from "../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { checkAuth } from "../middleware/checkAuth";

const authRouter = Router()

const registerValidator = [
    body("username")
        .exists().withMessage("username is required")
        .isString().withMessage("username must be a string")
        .isAlphanumeric().withMessage("username must be letters and numbers only")
        .trim()
        .isLength({ min: 3 }).withMessage("username too short"),
    body("password")
        .exists().withMessage("password is required")
        .isString().withMessage("password must be a string")
        .isLength({ min: 6 }).withMessage("password too short"),
    body("email")
        .optional()
        .isEmail().withMessage("invalid email")
];


const loginValidator = [
    body("username")
        .isString().withMessage("Invalid username")
        .exists().withMessage("username is required")
        .isLength({ min: 1 }).withMessage("username too short"),
    body("password")
        .isString().withMessage("Invalid password")
        .exists().withMessage("password is required")
        .isLength({ min: 1 }).withMessage("password is required")
]


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


    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax"
    })

    res.json({ status: "Logged in" })
})

authRouter.post("/logout", (req: Request, res: Response) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
    });

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

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax"
    })

    res.json({ status: "Success" })
})


authRouter.get("/me", checkAuth, async (req: Request, res: Response) => {
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
