import { useEffect, useState } from "react";
import { API } from "../api";

export default function WorkoutPlans() {
  const [members, setMembers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [plans, setPlans] = useState([]);

  const [form, setForm] = useState({
    memberId: "",
    trainerId: "",
    details: "",
    startDate: "",
    endDate: ""
  });

  const fetchMembers = async () => {
    const res = await API.get("/members");   // ✅ fixed
    setMembers(res.data);
  };

  const fetchTrainers = async () => {
    const res = await API.get("/trainers");  // ✅ fixed
    setTrainers(res.data);
  };

  const fetchPlans = async () => {
    const res = await API.get("/workouts");  // ✅ fixed
    setPlans(res.data);
  };

  useEffect(() => {
    fetchMembers();
    fetchTrainers();
    fetchPlans();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addPlan = async () => {
    if (!form.memberId || !form.trainerId || !form.details) {
      alert("Please fill all required fields (*)");
      return;
    }

    await API.post("/workouts", form);   // ✅ fixed

    setForm({
      memberId: "",
      trainerId: "",
      details: "",
      startDate: "",
      endDate: ""
    });

    fetchPlans();
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
        <h3>Workout Plan Management</h3>
      </div>

      <h5>Assign Workout Plan</h5>

      <label>Member *</label>
      <select className="form-control mb-2"
        name="memberId"
        value={form.memberId}
        onChange={handleChange}
      >
        <option value="">Select Member</option>
        {members.map((m) => (
          <option key={m._id} value={m._id}>{m.name}</option>
        ))}
      </select>

      <label>Trainer *</label>
      <select className="form-control mb-2"
        name="trainerId"
        value={form.trainerId}
        onChange={handleChange}
      >
        <option value="">Select Trainer</option>
        {trainers.map((t) => (
          <option key={t._id} value={t._id}>{t.name}</option>
        ))}
      </select>

      <label>Workout Details *</label>
      <input className="form-control mb-2"
        name="details"
        value={form.details}
        onChange={handleChange}
        placeholder="Enter workout plan details"
      />

      <label>Start Date (optional)</label>
      <input className="form-control mb-2"
        type="date"
        name="startDate"
        value={form.startDate}
        onChange={handleChange}
      />

      <label>End Date (optional)</label>
      <input className="form-control mb-3"
        type="date"
        name="endDate"
        value={form.endDate}
        onChange={handleChange}
      />

      <button
        onClick={addPlan}
        style={{
          background: "linear-gradient(to right, #ff512f, #dd2476)",
          border: "none",
          color: "white",
          padding: "8px 20px",
          borderRadius: "6px"
        }}
      >
        Assign Plan
      </button>

      <hr />

      <h5>All Workout Plans</h5>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Member</th>
            <th>Trainer</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((p) => (
            <tr key={p._id}>
              <td>{p.memberId?.name}</td>
              <td>{p.trainerId?.name}</td>
              <td>{p.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
