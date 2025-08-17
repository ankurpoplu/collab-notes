import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  content: String,
  timestamp: { type: Date, default: Date.now },
});

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    history: [historySchema]
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);
export default Note;
