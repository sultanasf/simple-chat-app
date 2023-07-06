import express from "express"
import dotenv from "dotenv"
import http from "http"
import { Server } from "socket.io"
import cors from "cors"

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('client'))

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: true,
    }
})
// Set up a connection event handler
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle incoming chat messages
    socket.on('chat message', (message) => {
        console.log('Received message:', message);

        // Broadcast the message to all connected clients
        io.emit('chat message', message);
    });

    // Handle disconnect event
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});
// Start the server
server.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`);
});