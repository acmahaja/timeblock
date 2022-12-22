import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import TextField from "../components/TextField";
import Toast from "../components/Toast";

import "../styles/Register.css";
import "../styles/Light/Register.css";
import "../styles/Dark/Register.css";

import { ReactComponent as LoginImage } from "../assets/undraw_welcome.svg";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);
  const [popupError, setPopupError] = useState("");

  const navigate = useNavigate();

  async function registerUser(event) {
    event.preventDefault();

    const response = await fetch(
      `${process.env.REACT_APP_SERVER_ADDRESS}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      }
    );

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

  function updateName(text) {
    setName(text);
  }

  function updateEmail(text) {
    setEmail(text);
  }

  function updatePassword(text) {
    setPassword(text);
  }

  return (
    <div className="Register gradient-bg">
      {popupError.length ? (
        <Toast
          title={"Error"}
          message={popupError}
          clearError={(event) => clearError()}
        />
      ) : (
        ""
      )}

      <form data-aos="fade-up" className="registerForm" onSubmit={registerUser}>
        <img alt="logo" className="logo" />
        <LoginImage className="cover" />
        <TextField
          name="name"
          type="text"
          setText={updateName}
          placeholder="full name"
          icon="newuser"
          required="true"
          error={error}
        />
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
          Register
        </button>

        <a href="/login">Login</a>
      </form>
    </div>
  );
}

export default Register;
