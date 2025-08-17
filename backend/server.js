import express from "express";
import mongoose from "mongoose";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import noteRoutes from "./routes/noteRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { initIO } from "./socket.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);

const server = http.createServer(app);
const io = initIO(server);

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("join-note", (noteId) => {
        socket.join(noteId); // join a room for each note
    });

    socket.on("leave-note", (noteId) => {
        socket.leave(noteId);
    });

    socket.on("edit-note", (data) => {
        const { noteId, updatedNote } = data;
        // Broadcast update to other clients in the same room
        socket.to(noteId).emit("note-updated", updatedNote);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

mongoose.connection.once("open", () => {
    console.log("MongoDB connected");
});

app.get("/", (req, res) => {
    res.send("Server running...");
});

const PORT = process.env.PORT || 5030;
mongoose.connect(process.env.MONGO_URI, { dbName: "collab-notes" })
    .then(() => server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`)))
    .catch((err) => console.log(err));
