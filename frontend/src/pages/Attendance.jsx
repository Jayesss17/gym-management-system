import { useEffect, useState } from "react";
import { API } from "../api";

export default function Attendance() {
  const [records, setRecords] = useState([]);
  const [members, setMembers] = useState([]);
  const [memberId, setMemberId] = useState("");

  // Fetch attendance records
  const fetchAttendance = async () => {
    const res = await API.get("/attendance");
    setRecords(res.data);
  };

  // Fetch members for dropdown
  const fetchMembers = async () => {
    const res = await API.get("/members");
    setMembers(res.data);
  };

  useEffect(() => {
    fetchAttendance();
    fetchMembers();
  }, []);

  // Mark attendance
  const markAttendance = async () => {
    if (!memberId) {
      alert("Please select a member");
      return;
    }

    await API.post("/attendance", { memberId });
    setMemberId("");
    fetchAttendance();
  };

  return (
    <div className="container container-box">

      <div style={{
        background: "linear-gradient(to right, #ff512f, #dd2476)",
        padding: "10px",
        borderRadius: "8px",
        color: "white",
        marginBottom: "20px",
        textAlign: "center"
      }}>
        <h3>Attendance</h3>
      </div>

      <h5>Mark Attendance</h5>

      {/* Member Dropdown */}
      <select
        className="form-control mb-3"
        value={memberId}
        onChange={(e) => setMemberId(e.target.value)}
      >
        <option value="">Select Member</option>
        {members.map((m) => (
          <option key={m._id} value={m._id}>
            {m.name}
          </option>
        ))}
      </select>

      <button
        onClick={markAttendance}
        style={{
          background: "linear-gradient(to right, #ff512f, #dd2476)",
          border: "none",
          color: "white",
          padding: "8px 20px",
          borderRadius: "6px"
        }}
      >
        Mark Present
      </button>

      <hr />

      <h5>Attendance Records</h5>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Member</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r._id}>
              <td>{r.memberId?.name || "Deleted Member"}</td>
              <td>{new Date(r.date).toLocaleString()}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
