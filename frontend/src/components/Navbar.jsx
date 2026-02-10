import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {

  const handleLogout = () => {
    localStorage.removeItem("token");     // 🔥 THIS was the bug
    window.location.replace("/login");    // force auth reset
  };

  return (
    <nav className="navbar">

      {/* Brand */}
      <div className="navbar-brand">
        <span>Fitness</span><span>Hub</span>
      </div>

      {/* Links */}
      <div className="navbar-links">
        <Link to="/home">Home</Link>
        <Link to="/members">Members</Link>
        <Link to="/trainers">Trainers</Link>
        <Link to="/attendance">Attendance</Link>
        <Link to="/payments">Payments</Link>
        <Link to="/workouts">Workout Plans</Link>
        <Link to="/dietplans">Diet Plans</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>

      {/* Logout */}
      <button className="navbar-logout" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}