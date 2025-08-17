import { Server } from "socket.io";

let io;

export const initIO = (server) => {
  io = new Server(server, {
    cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("join-note", (noteId) => {
      socket.join(noteId); // join a room for each note
    });

    socket.on("leave-note", (noteId) => {
      socket.leave(noteId);
    });

    socket.on("edit-note", ({ noteId, updatedNote }) => {
      socket.to(noteId).emit("note-updated", updatedNote);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
};

// Get io instance in controllers
export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};
