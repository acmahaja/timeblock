import {BrowserRouter, Routes, Route} from "react-router-dom";

import { useState, useEffect } from "react";

import Register from "./Routes/Register";
import Login from "./Routes/Login";
import Dashboard from "./Routes/Dashboard";
import UserData from "./Routes/UserData";
import New from "./Routes/New";

function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(()=>{setLoggedIn(localStorage.getItem("token") === null)}, [loggedIn])
 
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/userdata/:id" element={<UserData />} /> 
            <Route path="/new" element={<New />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route index path="/" element={loggedIn ? <Login />: <Dashboard />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
