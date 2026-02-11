import "./auth.css";
import { useState } from "react";
import { API } from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [dark, setDark] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const signup = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/api/auth/signup", form);
      alert("Signup successful. Please login.");
      navigate("/login");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <div className={`auth-card ${dark ? "dark" : ""}`}>

        <div className="auth-icon">💪</div>
        <h2>FitnessHub Signup</h2>

        <form onSubmit={signup}>
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <button type="submit">Signup</button>
        </form>

        <div className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>

        <div
          className="theme-toggle"
          onClick={() => setDark(!dark)}
        >
          {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </div>
      </div>
    </div>
  );
}