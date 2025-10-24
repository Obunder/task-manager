import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";

function App() {
    const [token, setToken] = useState(() => localStorage.getItem("taskManagerToken"));

  useEffect(() => {
    if (token) {
      localStorage.setItem("taskManagerToken", token);
    } else {
      localStorage.removeItem("taskManagerToken");
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <Router>
      <nav style={{ padding: 10, display: "flex", gap: 10 }}>
        {!token && <Link to="/login">Login</Link>}
        {!token && <Link to="/register">Register</Link>}
        {token && <Link to="/dashboard">Dashboard</Link>}
        {token && (
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>

      <Routes>
        <Route
          path="/"
          element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
        />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
