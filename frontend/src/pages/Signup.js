import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-overlay">
        <form className="auth-box" onSubmit={handleSignup}>
          <h2>Signup</h2>

          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />

          <button type="submit">Create Account</button>

          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;