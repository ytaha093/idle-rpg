import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes";
import cookieParser from "cookie-parser";


export const app = express();

app.use(cors({
    origin: "http://localhost:8080",
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter)

app.get("/", (_req, res) => {
    res.json({ status: "okeeeee" });
});

