import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function New() {
  const [message, setMessage] = useState("");

  let navigate = useNavigate();

  async function submitInvoice(event) {
    event.preventDefault();
    console.log("ASd");
    const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    if (data.status === "ok") {
      navigate(`/dashboard`);
    }
  }

  return (
    <div>
      <h3>New Message From</h3>
      <form onSubmit={submitInvoice}>
        <div>
          <div>
            <label>Message</label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default New;
