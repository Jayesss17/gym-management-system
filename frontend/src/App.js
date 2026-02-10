import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./common.css";

import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Members from "./pages/Members";
import Trainers from "./pages/Trainers";
import Attendance from "./pages/Attendance";
import Payments from "./pages/Payments";
import WorkoutPlans from "./pages/WorkoutPlans";
import DietPlans from "./pages/DietPlans";
import Dashboard from "./pages/Dashboard";

// Auth
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <BrowserRouter>
      {isLoggedIn && <Navbar />}

      <Routes>
        {/* 🔥 DEFAULT ROUTE → SIGNUP */}
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/home" /> : <Signup />
          }
        />

        {/* Auth routes */}
        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to="/home" /> : <Signup />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/home" /> : <Login />}
        />

        {/* Protected routes */}
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/members"
          element={isLoggedIn ? <Members /> : <Navigate to="/login" />}
        />
        <Route
          path="/trainers"
          element={isLoggedIn ? <Trainers /> : <Navigate to="/login" />}
        />
        <Route
          path="/attendance"
          element={isLoggedIn ? <Attendance /> : <Navigate to="/login" />}
        />
        <Route
          path="/payments"
          element={isLoggedIn ? <Payments /> : <Navigate to="/login" />}
        />
        <Route
          path="/workouts"
          element={isLoggedIn ? <WorkoutPlans /> : <Navigate to="/login" />}
        />
        <Route
          path="/dietplans"
          element={isLoggedIn ? <DietPlans /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;