import mongoose from "mongoose";
import Note from "../models/Notes.js";
import { getIO } from "../socket.js";

// Create Note
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.create({
      title,
      content,
      owner: req.user._id, // from authMiddleware
    });
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Notes (only for logged-in user)
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ updatedAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Note
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = new mongoose.Types.ObjectId(req.user.id)
    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    note.history.unshift({
      user: userId,
      title: note.title,
      content: note.content,
      timestamp: new Date(),
    });

    if (note.history.length > 10) note.history = note.history.slice(0, 10);

    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;

    const updatedNote = await note.save();
    const io = getIO();
    io.emit("note-updated", updatedNote);
    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Note
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!note) return res.status(404).json({ message: "Note not found" });

    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
