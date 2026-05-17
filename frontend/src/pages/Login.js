import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-overlay">
        <form className="auth-box" onSubmit={handleLogin}>
          <h2>Login</h2>

          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />

          <button type="submit">Login</button>

          <p>
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;