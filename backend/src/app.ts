import express from "express"
import cors from "cors"
import authRouter from "./routes/auth.routes"
import actionRouter from "./routes/action.routes"
import cookieParser from "cookie-parser"


export const app = express()

app.use(cors({
    origin: "http://localhost:8080",
    credentials: true,
}));
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRouter)
app.use("/api/action", actionRouter)

app.get("/", (_req, res) => {
    res.json({ status: "okeeeee" });
});

