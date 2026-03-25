import type { Server } from "socket.io"
import prisma from "../prisma"
import { getUserIdFromToken } from "../middleware/checkAuth"
import axios from "axios";

async function moderateMessage(text: string): Promise<{ [key: string]: number }> {
    const res = await axios.post("http://moderation:5000/moderate", { text })
    return res.data;
}

type ChatSendPayload = {
    message: string;
}

type AuthenticatedUser = {
    id: number;
    name: string;
}

function getCookieValue(cookieHeader: string | undefined, key: string): string | undefined {
    if (!cookieHeader) return undefined

    for (const cookiePair of cookieHeader.split(";")) {
        const [cookieKey, ...cookieValueParts] = cookiePair.trim().split("=")
        if (cookieKey !== key) continue
        return decodeURIComponent(cookieValueParts.join("="))
    }

    return undefined
}

export function registerChatSocket(io: Server) {
    io.use(async (socket, next) => {
        const token = getCookieValue(socket.handshake.headers.cookie, "token")
        const userId = getUserIdFromToken(token)

        if (userId == null) return next(new Error("Unauthorized"))

        try {
            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: { id: true, username: true },
            })

            if (!user) return next(new Error("Unauthorized"))

            socket.data.user = {
                id: user.id,
                name: user.username,
            } as AuthenticatedUser

            next()
        } catch {
            next(new Error("Unauthorized"))
        }
    })

    io.on("connection", (socket) => {
        const user = socket.data.user as AuthenticatedUser | undefined
        if (!user) {
            socket.disconnect(true)
            return
        }

        console.log(`socket connected: ${socket.id} (user ${user.id} - ${user.name})`)

        socket.on("chat:send", async (payload: ChatSendPayload) => {
            if (!payload || typeof payload.message !== "string") return

            const message = payload.message.trim()
            if (!message) return



            let blocked = false
            const results = await moderateMessage(message)
            if (results.severe_toxicity >= 0.45
                || results.identity_attack + (results.toxicity / 3) > 0.8
                || results.sexual_explicit + (results.toxicity / 5) > 0.8) {
                blocked = true
            }

            console.log("\n\n", message)

            for (const key in (results)) {
                console.log(key, results[key].toFixed(2))
            }

            if (blocked) {
                io.to(socket.id).emit("chat:new", {
                    type: "warn",
                    message: "That message can’t be sent. Try rewording it in a respectful way.",
                    time: new Date().toLocaleTimeString("en-GB"),
                })
                return
            }

            io.emit("chat:new", {
                time: new Date().toLocaleTimeString("en-GB"),
                message,
                sender: {
                    name: user.name,
                    id: user.id,
                },
            })
        })

        socket.on("disconnect", (reason) => {
            console.log(`socket disconnected: ${socket.id} (${reason})`)
        })
    })
}
