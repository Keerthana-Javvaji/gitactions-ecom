import { useState } from "react";
import axios from "axios";
import "./LoginPage.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Backend API URL from environment variable
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // clear previous error

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      if (response.status === 200 && response.data) {
        // Save logged-in user to localStorage
        localStorage.setItem("user", JSON.stringify(response.data));

        // Redirect to dashboard
        window.location.href = "/dashboard";
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data); // backend error message
      } else {
        setError("Server error. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        {error && <p className="error-text">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
        <p className="signup-text">
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}
