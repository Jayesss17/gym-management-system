import { useEffect, useState } from "react";
import { API } from "../api";
import "./dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await API.get("/dashboard/stats");
      setStats(res.data);
    };
    fetchStats();
  }, []);

  // 🔔 Send Reminder Emails Function
  const sendReminders = async () => {
    setLoading(true);
    try {
      const res = await API.post("/reminders/send-reminders");
      alert(res.data.message);
    } catch (err) {
      alert("Failed to send reminder emails");
    }
    setLoading(false);
  };

  if (!stats) return <h2>Loading Dashboard...</h2>;

  return (
    <div className="dashboard">
      <h2>Gym Dashboard</h2>

      {/* Cards */}
      <div className="cards">
        <div className="card">Total Members<br />{stats.totalMembers}</div>
        <div className="card">Total Trainers<br />{stats.totalTrainers}</div>
        <div className="card">Total Payments<br />{stats.totalPayments}</div>
        <div className="card">Today Attendance<br />{stats.todayAttendance}</div>
      </div>

      {/* 🔔 Reminder Button */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button 
          onClick={sendReminders}
          style={{
            padding: "10px 20px",
            backgroundColor: "#ff3c00",
            color: "white",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          {loading ? "Sending..." : "Send Membership Expiry Reminders"}
        </button>
      </div>

      {/* Chart */}
      <h3 style={{ textAlign: "center", marginTop: "40px" }}>
        Monthly Payments Chart
      </h3>

      <div className="chart">
        {stats.monthlyPayments.map((m) => (
          <div key={m._id} className="bar-container">
            <div
              className="bar"
              style={{ height: m.count * 20 }}
            ></div>
            <span>Month {m._id}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
