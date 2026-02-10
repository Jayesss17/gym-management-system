import "./auth.css";
import { useState } from "react";
import { API } from "../api";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [dark, setDark] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const login = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Fill all fields");
      return;
    }

    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      window.location.replace("/");
    } catch {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <div className={`auth-card ${dark ? "dark" : ""}`}>
        
        <div className="auth-icon">🏋️</div>
        <h2>FitnessHub Login</h2>

        <form onSubmit={login}>
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

          <button type="submit">Login</button>
        </form>

        <div className="auth-link">
          Don’t have an account? <Link to="/signup">Signup</Link>
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