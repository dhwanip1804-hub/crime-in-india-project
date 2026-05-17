import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Crime in India</div>

      <div className="nav-links">
        <Link to="/dashboard">Home</Link>

        <Link to="/login">Login</Link>

        <Link to="/signup">Signup</Link>
      </div>
    </nav>
  );
};

export default Navbar;