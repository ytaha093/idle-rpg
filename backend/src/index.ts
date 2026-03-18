import { createServer } from "node:http"
import { app } from "./app"
import { Server } from "socket.io"
import { registerChatSocket } from "./sockets/chat"

const PORT = process.env.PORT || 3000

const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: true,
        credentials: true,
    },
})

registerChatSocket(io)

server.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`)
})
