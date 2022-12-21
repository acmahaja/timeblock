import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState, useEffect } from "react";

import "./App.css";

import Register from "./Routes/Register";
import Login from "./Routes/Login";
import Welcome from "./Routes/Welcome";
import Dashboard from "./Routes/Dashboard";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || "Light");

  useEffect(() => {
    setLoggedIn(localStorage.getItem("token") === null);
    localStorage.setItem('theme', theme)
  }, [loggedIn]);

  return (
    <div className={`App ${theme}`}>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            index
            path="/"
            element={loggedIn ? <Dashboard /> : <Welcome />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
