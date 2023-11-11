import { Server } from "socket.io";
import { filter, search } from "./elastic";
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
        socket.on('filter', data => {
            console.log(data)
            filter(data.minPrice, data.maxPrice, data.listSize).then(data => {
                io.local.emit('filter',data)
            })
        })
    });
}