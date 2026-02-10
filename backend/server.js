const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// ✅ CORS FIX (DO NOT CHANGE ANYTHING ELSE)
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://gym-management-system-z25i.onrender.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// ✅ Handle preflight requests
app.options("*", cors());

app.use(express.json());

// ROUTES
app.use("/api/members", require("./routes/memberRoutes"));
app.use("/api/trainers", require("./routes/trainerRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/workouts", require("./routes/workoutRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));
app.use("/api/dietplans", require("./routes/dietplansRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/reminders", require("./routes/reminderRoutes"));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);