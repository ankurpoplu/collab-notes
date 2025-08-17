// src/components/NoteModal.js
import { useState, useEffect } from "react";

export default function NoteModal({ isOpen, onClose, onSave, initialNote }) {
    const [note, setNote] = useState({ title: "", content: "" });

    useEffect(() => {
        if (initialNote) {
            setNote(initialNote);
        } else {
            setNote({ title: "", content: "" });
        }
    }, [initialNote]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative animate-fadeIn">
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    ✖
                </button>

                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                    {initialNote ? "Edit Note" : "New Note"}
                </h2>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (!navigator.onLine) {
                            const offlineNotes = JSON.parse(localStorage.getItem("offlineNotes") || "[]");
                            const noteToSave = { ...note, _id: note._id || Date.now() };
                            offlineNotes.push(noteToSave);
                            localStorage.setItem("offlineNotes", JSON.stringify(offlineNotes));
                            alert("You're offline. Note saved locally and will sync when online.");
                            onClose();
                            return;
                        }
                        onSave(note);
                    }}
                    className="space-y-4"
                >
                    <input
                        type="text"
                        placeholder="Title"
                        value={note.title}
                        onChange={(e) => setNote({ ...note, title: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <textarea
                        placeholder="Content..."
                        value={note.content}
                        onChange={(e) => setNote({ ...note, content: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition"
                    >
                        💾 Save
                    </button>
                </form>
            </div>
        </div>
    );
}
