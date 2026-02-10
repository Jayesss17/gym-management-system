import { useEffect, useState } from "react";
import { API } from "../api";

export default function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    phone: ""
  });

  const fetchTrainers = async () => {
    const res = await API.get("/trainers");   // ✅ fixed
    setTrainers(res.data);
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addTrainer = async () => {
    if (!form.name || !form.specialization || !form.phone) {
      alert("Please fill all required fields (*)");
      return;
    }

    await API.post("/trainers", form);   // ✅ fixed
    setForm({ name: "", specialization: "", phone: "" });
    fetchTrainers();
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
        <h3>Trainer Management</h3>
      </div>

      <h5>Add New Trainer</h5>

      <label>Name *</label>
      <input className="form-control mb-2"
        name="name" value={form.name}
        onChange={handleChange}
        placeholder="Trainer Name"
      />

      <label>Specialization *</label>
      <input className="form-control mb-2"
        name="specialization" value={form.specialization}
        onChange={handleChange}
        placeholder="Yoga / Strength / Cardio"
      />

      <label>Phone *</label>
      <input className="form-control mb-3"
        name="phone" value={form.phone}
        onChange={handleChange}
        placeholder="Phone Number"
      />

      <button
        onClick={addTrainer}
        style={{
          background: "linear-gradient(to right, #ff512f, #dd2476)",
          border: "none",
          color: "white",
          padding: "8px 20px",
          borderRadius: "6px"
        }}
      >
        Add Trainer
      </button>

      <hr />

      <h5>All Trainers</h5>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialization</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {trainers.map((t) => (
            <tr key={t._id}>
              <td>{t.name}</td>
              <td>{t.specialization}</td>
              <td>{t.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{ fontSize: "13px" }}>
        Fields marked with * are required.
      </p>
    </div>
  );
}
