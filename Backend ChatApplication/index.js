const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const port = 8000;

const server = http.createServer(app);

const corsOptions = { 
    origin: '*',
    methods: ['GET', 'POST'],
};
const io = new Server(server, { cors: corsOptions });

app.use(express.json());

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

// ********************************************************************************************************
//                                              Socket Connections
// ********************************************************************************************************
const rooms = {};

io.on("connection", (socket) => {
    console.log(`New connection: ${socket.id}`);

    // Handle the user that is joining the room .
    socket.on("join_room", ({ username, room }) => {
        try {
            if (!username || !room) throw new Error("Username and room are required.");
            if (!rooms[room]) {
                rooms[room] = [];
            }
            rooms[room].push({ id: socket.id, username });
            socket.join(room);
            console.log(`${username} joined room: ${room}`);

    // Notify others in the room
            socket.to(room).emit("user:joined", { username, message: `${username} has joined the room.` });
            socket.emit("joined_successfully", { socketId: socket.id, room });
        } 
        catch (error)
         {
            console.error(`Error in join_room: ${error.message}`);
            socket.emit("error", { message: "Failed to join the room. Please try again." });
        }
    });

    // Handle all the sending messages
    socket.on("send_message", ({ data: { room, message, username } }) => {
        try {
            console.log("Data in the backend:", room, message, username);
            if(message != ''){
                io.to(room).emit("receive_message", { username, message });
            }else{
                console.log("Message string is empty");
            }
        } 
        catch (error) {
            console.error(`Error in send_message: ${error.message}`);
            socket.emit("error", { message: "Failed to send the message. Please try again." });
        }
    });
    
    // Handle the disconnected users
    socket.on("disconnect", () => {
        try {
            console.log(`User disconnected: ${socket.id}`);
            for (const room in rooms) {
                const userIndex = rooms[room].findIndex(user => user.id === socket.id);
                if (userIndex !== -1) {
                    const username = rooms[room][userIndex].username;
                    rooms[room].splice(userIndex, 1);

                    io.to(room).emit("user_left", { username, message: `${username} has left the room.` });
                    break;
                }
            }
        }
        catch (error) {
            console.error(`Error during disconnect: ${error.message}`);
        }
    });
});
