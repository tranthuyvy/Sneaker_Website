import { Server } from "socket.io";
import { search } from "./elastic";
export default function socket(server) {
    const io = new Server(server, {
        cors: {
            origin: "*",
        }
    });
    io.on("connection", (socket) => {
        socket.on('search', (data) => {
            search(data).then(data => {
                io.local.emit('search', data);
            })
        })
    });
}