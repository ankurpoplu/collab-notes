import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Notes from "./pages/Notes";
import PrivateRoute from "./components/PrivateRoute";
import { isLoggedIn } from "./utils/auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* default route → redirect based on login status */}
        <Route
          path="/"
          element={
            isLoggedIn() ? <Navigate to="/notes" replace /> : <Navigate to="/login" replace />
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* protected route */}
        <Route
          path="/notes"
          element={
            <PrivateRoute>
              <Notes />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
