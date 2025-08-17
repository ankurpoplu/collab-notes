import express from "express";
import { createNote, getNotes, updateNote, deleteNote } from "../controllers/noteController.js";
import { protect } from "../middleware/authMiddleware.js";
import { requireRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/:id/history", protect, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).populate("history.user", "username email");
    if (!note) return res.status(404).json({ message: "Note not found" });

    res.json(note.history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/", protect, requireRole(["owner", "editor"]), createNote); 
router.get("/", protect, getNotes); 
router.put("/:id", protect, requireRole(["owner", "editor"]), updateNote); 
router.delete("/:id", protect, requireRole(["owner"]), deleteNote);

export default router;
