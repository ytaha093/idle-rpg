import jwt from "jsonwebtoken"
import 'dotenv/config'
import { NextFunction, Request, Response } from 'express'
import type { JwtUserPayload } from "../types/jwt"

export function getUserIdFromToken(token?: string): number | null {
    if (!token) return null

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret) as JwtUserPayload
        return typeof payload.userId === "number" ? payload.userId : null
    } catch {
        return null
    }
}


export function checkAuth(req: Request, res: Response, next: NextFunction) {
    const userId = getUserIdFromToken(req.cookies.token)

    if (userId == null) return res.sendStatus(401)

    req.userId = userId
    next()
}