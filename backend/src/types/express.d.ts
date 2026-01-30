import "express";

declare module "express" {
    export interface Request {
        userId?: number;
        energy?: number;
    }
}