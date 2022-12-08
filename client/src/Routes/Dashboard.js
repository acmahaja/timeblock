import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
import { Link } from "react-router-dom";

function Dashboard() {
  let navigate = useNavigate();

  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    const req = await fetch(
      `${process.env.REACT_APP_SERVER_ADDRESS}/api/message`,
      {
        method: "GET",
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );

    const data = await req.json();
    if (data.status === "error") {
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      console.log(data);
      setMessages(data.data);
    }
  };

  const logout = async () => {
    localStorage.setItem("token", "");
    navigate("/login");

  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = decodeToken(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        getMessages();
      }
    } else {
      navigate("/login");
    }
  }, []);


  return (
    <>
      <main>

        <a onClick={logout}>Logout</a>
        
        <Link to={`/new`}>New</Link>
        <br />
        <button onClick={getMessages}>Get Messages</button>
        
        {messages?.map((message) => (
          <li>
            <Link to={`/userdata/${message._id}`}>{message.Message}</Link>
          </li>
        ))}

      </main>
    </>
  );
}

export default Dashboard;
