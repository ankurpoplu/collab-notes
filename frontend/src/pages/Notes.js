// src/pages/Notes.js
import { useEffect, useState } from "react";
import { getNotes, deleteNote, createNote, updateNote } from "../api/axios";
import ErrorBar from "../components/ErrorBar";
import NoteModal from "../components/NoteModal";
import { getToken } from "../utils/auth";
import { jwtDecode } from "jwt-decode";
import { io } from "socket.io-client";
import HistoryModal from "../components/HistoryModal";

const socket = io("http://localhost:5030");


export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [role, setRole] = useState("");
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNote, setEditingNote] = useState(null);
    const [historyNote, setHistoryNote] = useState(null);

    useEffect(() => {
        const token = getToken();
        if (token) {
            const decoded = jwtDecode(token);
            setRole(decoded.role);  // ✅ read from JWT
        }
        fetchNotes();
        socket.on("note-updated", (updatedNote) => {
            setNotes((prev) =>
                prev.map((n) => (n._id === updatedNote._id ? updatedNote : n))
            );
        });

        return () => {
            socket.off("note-updated");
        };
    }, []);

    useEffect(() => {
        const syncOfflineNotes = async () => {
            if (!navigator.onLine) return;

            const offlineNotes = JSON.parse(localStorage.getItem("offlineNotes") || "[]");
            for (const note of offlineNotes) {
                if (!note._id.toString().match(/^[0-9a-fA-F]{24}$/)) {
                    await createNote({ title: note.title, content: note.content });
                } else {
                    await updateNote(note._id, { title: note.title, content: note.content });
                }
            }

            localStorage.removeItem("offlineNotes");
            fetchNotes();
        };

        window.addEventListener("online", syncOfflineNotes);
        return () => window.removeEventListener("online", syncOfflineNotes);
    }, []);

    const fetchNotes = async () => {
        try {
            const res = await getNotes();
            setNotes(res);
        } catch {
            setError("Failed to fetch notes");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteNote(id);
            setNotes(notes.filter((n) => n._id !== id));
        } catch {
            setError("Failed to delete note");
        }
    };

    const handleSave = async (note) => {
        let savedNote;
        try {
            if (editingNote) {
                console.log(editingNote);
                savedNote = await updateNote(editingNote._id, note);
                setNotes(
                    notes.map((n) => (n._id === editingNote._id ? { ...n, ...note } : n))
                );
            } else {
                savedNote = await createNote(note);
                setNotes([savedNote, ...notes]);
            }
            setIsModalOpen(false);
            setEditingNote(null);
        } catch {
            setError("Failed to save note");
        }
    };

    let filteredNotes = search
        ? notes.filter(
            (note) =>
                note.title.includes(search)
        )
        : notes;
    console.log(filteredNotes);

    filteredNotes = [...filteredNotes].sort((a, b) => {
        if (sortOrder === "asc") {
            return a.title.localeCompare(b.title);
        } else {
            return b.title.localeCompare(a.title);
        }
    });

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <ErrorBar message={error} onClose={() => setError("")} />
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">📝 My Notes</h1>
                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </header>
            {(role === "owner" || role === "editor") && (
                <button
                    onClick={() => {
                        setEditingNote(null);
                        setIsModalOpen(true);
                    }}
                    className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    ➕ New Note
                </button>
            )}
            <input
                type="text"
                placeholder="Search notes (case-sensitive)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-2 mb-6 border border-gray-300 rounded-lg"
            />
            <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="p-2 mb-6 border px-3 py-2 rounded-md"
            >
                <option value="asc">⬆️ Ascending</option>
                <option value="desc">⬇️ Descending</option>
            </select>
            {filteredNotes.length === 0 ? (
                <p className="text-gray-500 text-center mt-10">
                    No notes yet. Start by creating one!
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredNotes.map((note) => (
                        <div key={note._id} className="bg-white p-4 rounded relative shadow">
                            <h3 className="font-bold text-lg">{note.title}</h3>
                            <p className="text-gray-600">{note.content}</p>
                            <button
                                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                                onClick={() => setHistoryNote(note)}
                                title="View History"
                            >
                                🕑
                            </button>
                            <div className="flex gap-2 mt-2">
                                {/* Edit allowed for Owner + Editor */}
                                {(role === "owner" || role === "editor") && (
                                    <button
                                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                        onClick={() => {
                                            setEditingNote(note);
                                            setIsModalOpen(true);
                                        }}
                                    >
                                        Edit
                                    </button>
                                )}
                                {/* Delete only Owner */}
                                {role === "owner" && (
                                    <button
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                        onClick={() => handleDelete(note._id)}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <NoteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialNote={editingNote}
            />
            <HistoryModal
                note={historyNote}
                onClose={() => setHistoryNote(null)}
            />
            <footer className="text-center text-gray-500 py-4">
                © {new Date().getFullYear()} Collab Notes
            </footer>
        </div>
    );
}
