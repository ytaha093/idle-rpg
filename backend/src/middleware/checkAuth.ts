import jwt, { JwtPayload } from "jsonwebtoken"
import 'dotenv/config'
import { NextFunction, Request, Response } from 'express'

export interface JwtUserPayload extends JwtPayload {
    userId: number;
}


export function checkAuth(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token

    if (!token) return res.sendStatus(401);

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret) as JwtUserPayload
        req.userId = payload.userId;
        next();
    } catch {
        res.sendStatus(401);
    }
}