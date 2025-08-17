# 📁 Collab Notes

A collaborative note-taking application with real-time synchronization, role-based access, offline editing, and note history tracking.

---

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Usage](#usage)
- [Socket.IO Integration](#socketio-integration)
- [Notes](#notes)
- [License](#license)

---

## Features

- **Role-based access control**
  - Owner: Add, edit, delete notes
  - Editor: Add and edit notes
  - View-only: Can view notes only
- **Real-time synchronization** using Socket.IO
- **Offline editing** with automatic sync when online
- **Note history**: View last 10 changes with timestamp and user
- **Search & Sort**
  - Case-sensitive search
  - Sort notes ascending/descending by title
- **Authentication**
  - JWT-based login/signup
- Responsive UI with **React.js** and **TailwindCSS**

---

## Technologies

- **Frontend:** React.js, TailwindCSS, Axios, Socket.IO-client
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, Socket.IO
- **Authentication:** JWT

---

## Project Structure

```
collab-notes/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── socket.js
│   ├── server.js
│   ├── package.json
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   └── utils/
│   ├── package.json
│   └── .gitignore
└── README.md
```

---

## Setup & Installation

### Backend

1. Navigate to backend:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file:

```
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
PORT=5030
```

4. Run the backend server:

```bash
npm run dev
```

Backend will run at `http://localhost:5030`.

---

### Frontend

1. Navigate to frontend:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run the frontend:

```bash
npm start
```

Frontend will run at `http://localhost:3000`.

---

## Usage

1. Open the frontend URL in your browser.
2. Sign up or login as a user.
3. User roles:
   - **Owner:** Can add, edit, delete notes
   - **Editor:** Can add and edit notes
   - **View-only:** Can only view notes
4. Create a new note using the **➕ New Note** button.
5. Edit or delete notes depending on your role.
6. Click the **🕑** icon on the top-right of each note card to view history (last 10 changes, with user and timestamp).
7. Offline edits will sync automatically when the internet connection restores.
8. Real-time updates are applied to all connected users.

---

## Socket.IO Integration

- Real-time collaboration is powered by Socket.IO.
- Users editing the same note see live updates.
- Socket rooms are used per note for efficient broadcasting.

---

## Notes

- Offline edits are stored in `localStorage` and synced when back online.
- Note history is maintained up to 10 changes per note.
- JWT tokens are used for authentication and role-based access control.

---

## License

This project is licensed under the MIT License.

