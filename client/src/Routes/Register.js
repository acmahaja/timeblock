import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


import '../styles/Register.css'
import '../styles/Light/Register.css'
import '../styles/Dark/Register.css'

import {ReactComponent as LoginImage} from '../assets/undraw_schedule.svg';

import LogoDark from '../assets/logo-dark.svg'
import LogoLight from '../assets/logo-light.svg'


function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function registerUser(event) {
    event.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (data.status === "ok") {
      navigate("/login");
    } else {
      console.log("error");
    }
  }

  return (
    <div className="Register gradient-bg">
      <form className="registerForm" onSubmit={registerUser}>
        <img alt="logo" className="logo" />
        <LoginImage className="cover" />
        <div>
          <label htmlFor="name">Name</label>
          <input
            placeholder={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            id="name"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            placeholder={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
            placeholder={password}
            type="password"
            name="password"
            id="password"
          //   required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Register</button>

        <a href="/login">Login</a>
      </form>
    </div>
  );
}

export default Register;
