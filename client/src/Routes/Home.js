import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <Link to="/login">Login</Link>  
            <Link to="/register">Register</Link>  
            <h2>Welcome to Timeblock</h2>
        </>

    )
}

export default Home;