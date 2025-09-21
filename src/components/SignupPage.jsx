import { useState } from "react";
import axios from "axios";
import "./Auth.css";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Backend API URL from environment variable
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setSuccess("");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/auth/signup`, {
        username: name,
        email,
        password,
        role: "user", // default role
      });

      if (response.data === "User registered successfully!") {
        setSuccess("Account created successfully! Redirecting...");
        setError("");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        setError(response.data);
        setSuccess("");
      }
    } catch (err) {
      setError("Server error. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Sign Up</h2>
        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>
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
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="auth-button">Sign Up</button>
        </form>

        <p className="signup-text">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
