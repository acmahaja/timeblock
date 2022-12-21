import {BrowserRouter, Routes, Route} from "react-router-dom";

import { useState, useEffect } from "react";

import './App.css'


import Register from "./Routes/Register";
import Login from "./Routes/Login";
import Welcome from "./Routes/Welcome";
import Dashboard from "./Routes/Dashboard";

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(()=>{setLoggedIn(localStorage.getItem("token") === null)}, [loggedIn])
 
  return (
    <div className="App Light">
      <BrowserRouter>
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route index path="/" element={loggedIn ? <Dashboard />: <Welcome />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
