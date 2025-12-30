import { Router } from "express"
import { Request, Response } from 'express';

import { body, validationResult } from "express-validator";

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
        .isString()
        .exists().withMessage("username is required")
        .isLength({ min: 3 }).withMessage("username too short"),
    body("password")
        .isString()
        .exists().withMessage("password is required")
        .isLength({ min: 1 }).withMessage("password is required")
]


authRouter.post("/login", loginValidator, (req: Request, res: Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg })
    }

    const { username, password } = req.body;
    console.log(username, password)

    res.json({ status: "ok" })
})


export default authRouter
