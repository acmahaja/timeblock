import React from "react";
import { useState } from "react";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import TextField from "../components/TextField";
import Toast from "../components/Toast";

import "../styles/Login.css";
import "../styles/Light/Login.css";
import "../styles/Dark/Login.css";

import { ReactComponent as LoginImage } from "../assets/undraw_schedule.svg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);
  const [popupError, setPopupError] = useState("");

  const navigate = useNavigate();

  async function loginUser(event) {
    event.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.status === "ok") {
      navigate("/login");
    } else {
      setError(true);
      setPopupError(data.error);

      const timer = setTimeout(() => {
        setPopupError(false);
      }, 50000);
      return () => clearTimeout(timer);
    }
  }

  function clearError() {
    setPopupError("");
    setError(false);
  }

  function updateEmail(text) {
    setEmail(text);
  }

  function updatePassword(text) {
    setPassword(text);
  }

  return (
    <div className="Login gradient-bg">
      {popupError.length ? (
        <Toast
          title={"Error"}
          message={popupError}
          clearError={(event) => clearError()}
        />
      ) : (
        ""
      )}

      <form data-aos="fade-up" className="loginForm" onSubmit={loginUser}>
        <img alt="logo" className="logo" />
        <LoginImage className="cover" />

        <TextField
          name="email"
          type="email"
          setText={updateEmail}
          placeholder="your@email.com"
          icon="email"
          required="true"
          error={error}
        />
        <TextField
          name="password"
          type="password"
          setText={updatePassword}
          placeholder="password"
          icon="password"
          required="true"
          error={error}
        />

        <button className="PrimaryL" type="submit">
          Login
        </button>

        <a href="/register">Register here!</a>
      </form>
    </div>
  );
}

export default Login;