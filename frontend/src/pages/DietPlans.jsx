import { useEffect, useState } from "react";
import { API } from "../api";

export default function DietPlans() {
  const [members, setMembers] = useState([]);
  const [plans, setPlans] = useState([]);

  const [form, setForm] = useState({
    memberId: "",
    dietType: "",
    weeklyPlan: "",
    calories: ""
  });

  // Fetch Members
  const fetchMembers = async () => {
    const res = await API.get("/members");   // ✅ fixed
    setMembers(res.data);
  };

  // Fetch Diet Plans
  const fetchPlans = async () => {
    const res = await API.get("/dietplans");   // ✅ fixed
    setPlans(res.data);
  };

  useEffect(() => {
    fetchMembers();
    fetchPlans();
  }, []);

  // Handle Input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add Diet Plan
  const addPlan = async () => {
    if (!form.memberId || !form.dietType || !form.weeklyPlan) {
      alert("Please fill all required fields (*)");
      return;
    }

    await API.post("/dietplans", {   // ✅ fixed
      memberId: form.memberId,
      dietType: form.dietType,
      weeklyPlan: form.weeklyPlan,
      calories: Number(form.calories)
    });

    setForm({
      memberId: "",
      dietType: "",
      weeklyPlan: "",
      calories: ""
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
        <h3>Diet Plan Management</h3>
      </div>

      <h5>Create Diet Plan</h5>

      <label>Member *</label>
      <select
        className="form-control mb-2"
        name="memberId"
        value={form.memberId}
        onChange={handleChange}
      >
        <option value="">Select Member</option>
        {members.map((m) => (
          <option key={m._id} value={m._id}>{m.name}</option>
        ))}
      </select>

      <label>Diet Type *</label>
      <select
        className="form-control mb-2"
        name="dietType"
        value={form.dietType}
        onChange={handleChange}
      >
        <option value="">Select Type</option>
        <option value="Veg">Veg</option>
        <option value="Non-Veg">Non-Veg</option>
      </select>

      <label>Weekly Diet Plan *</label>
      <textarea
        className="form-control mb-2"
        name="weeklyPlan"
        rows="4"
        placeholder="Enter Monday to Sunday diet plan..."
        value={form.weeklyPlan}
        onChange={handleChange}
      />

      <label>Daily Calories (optional)</label>
      <input
        className="form-control mb-3"
        name="calories"
        value={form.calories}
        onChange={handleChange}
        placeholder="Enter calories per day"
      />

      <button
      type="button"
        onClick={addPlan}
        style={{
          background: "linear-gradient(to right, #ff512f, #dd2476)",
          border: "none",
          color: "white",
          padding: "8px 20px",
          borderRadius: "6px"
        }}
      >
        Save Diet Plan
      </button>

      <hr />

      <h5>Assigned Diet Plans</h5>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Member</th>
            <th>Diet Type</th>
            <th>Calories</th>
            <th>Weekly Plan</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((p) => (
            <tr key={p._id}>
              <td>{p.memberId?.name}</td>
              <td>{p.dietType}</td>
              <td>{p.calories || "-"}</td>
              <td style={{ maxWidth: "300px" }}>{p.weeklyPlan}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
