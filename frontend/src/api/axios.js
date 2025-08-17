import axios from "axios";
import { getToken } from "../utils/auth";

const API = axios.create({
  baseURL: "http://localhost:5030/api",
});

// attach JWT token on each request
API.interceptors.request.use((req) => {
  const token = getToken();
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;

export const getNotes = async () => {
  const { data } = await API.get("/notes");
  return data;
};

export const createNote = async (note) => {
  const { data } = await API.post("/notes", note);
  return data;
};

export const updateNote = async (id, note) => {
  const { data } = await API.put(`/notes/${id}`, note);
  return data;
};

export const deleteNote = async (id) => {
  await API.delete(`/notes/${id}`);
};

export const getNoteHistory = async (noteId) => {
  const { data } = await API.get(`/notes/${noteId}/history`);
  return data;
};
