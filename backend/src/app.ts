import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes";

export const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter)

app.get("/", (_req, res) => {
    res.json({ status: "okeeeee" });
});

