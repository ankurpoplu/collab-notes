# Collab Notes 📝

A collaborative note-taking web application built with **MERN stack** that supports real-time updates, role-based access, offline editing, search, and note history.

## Features

- User authentication with **JWT**
- Role-based access:
  - **Owner**: Add, edit, delete notes
  - **Editor**: Add, edit notes
  - **View-only**: View notes only
- Real-time note updates using **Socket.IO**
- Offline editing & synchronization
- Note history (last 10 changes)
- Search notes (case-sensitive)
- Sort notes ascending/descending
- Responsive design with header and footer

## Tech Stack

- **Frontend**: React.js, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-time**: Socket.IO
- **Authentication**: JWT

## Installation

1. Clone the repo:
```bash
git clone https://github.com/yourusername/collab-notes.git
cd collab-notes
