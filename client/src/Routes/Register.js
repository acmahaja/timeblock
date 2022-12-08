import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function registerUser(event) {
    event.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (data.status === "ok") {
      navigate("/login");
    }
  }

  return (
    <form className="registerForm" onSubmit={registerUser}>
            {process.env.REACT_APP_SERVER_ADDRESS}

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
  );
}

export default Register;
