import React from "react";
import { useState } from "react";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  async function loginUser(event) {
    event.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.status ==='ok') {
      localStorage.setItem("token", data.token);
      console.log("redirecting");
      navigate("/dashboard");
    } else {
      console.log("An Error!");
    }
  }

  return (
      <form onSubmit={loginUser}>
        <div className="textInput">
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
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">
          Login
        </button>
        <a href="/register">
          Register Here!
        </a>
      </form>
  );
}

export default Login;