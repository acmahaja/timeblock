import React, { useEffect } from "react";

import { useState } from "react";


import "../styles/components/Toast.css";
import "../styles/components/Light/Toast.css";
import "../styles/components/Dark/Toast.css";

function Toast({title, message, clearError}) {

    function toggleShow(event) {
        clearError(event)
    }

    return (
        <div data-aos="fade-up" className={`Toast ${!message.length ? 'hide': ""}`}>
            <span data-icon={"error"}>
                {title}
                <button onClick={toggleShow}>x</button>
            </span>
            <p>{message}</p>
        </div>
    )
}

export default Toast;