import { useEffect, useState } from "react";
import { API } from "../api";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    membershipType: "",
    membershipEndDate: ""   // ✅ new field
  });

  const fetchMembers = async () => {
    const res = await API.get("/members");
    setMembers(res.data);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addMember = async () => {
    if (!form.name || !form.phone || !form.membershipType || !form.membershipEndDate) {
      alert("Please fill all required fields (*)");
      return;
    }

    await API.post("/members", {
      ...form,
      joinDate: new Date()
    });

    // Reset form
    setForm({
      name: "",
      phone: "",
      email: "",
      membershipType: "",
      membershipEndDate: ""
    });

    fetchMembers();
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
        <h3>Member Management</h3>
      </div>

      <h5>Add New Member</h5>

      <label>Name *</label>
      <input
        className="form-control mb-2"
        name="name"
        placeholder="Enter full name"
        value={form.name}
        onChange={handleChange}
      />

      <label>Phone *</label>
      <input
        className="form-control mb-2"
        name="phone"
        placeholder="Enter phone number"
        value={form.phone}
        onChange={handleChange}
      />

      <label>Email *</label>
      <input
        className="form-control mb-2"
        name="email"
        placeholder="Enter email address"
        value={form.email}
        onChange={handleChange}
      />

      <label>Membership Type *</label>
      <input
        className="form-control mb-2"
        name="membershipType"
        placeholder="Monthly / Quarterly / Yearly"
        value={form.membershipType}
        onChange={handleChange}
      />

      {/* ✅ NEW FIELD */}
      <label>Membership Expiry Date *</label>
      <input
        type="date"
        className="form-control mb-3"
        name="membershipEndDate"
        value={form.membershipEndDate}
        onChange={handleChange}
      />

      <button 
        onClick={addMember}
        style={{
          background: "linear-gradient(to right, #ff512f, #dd2476)",
          border: "none",
          color: "white",
          padding: "8px 20px",
          borderRadius: "6px"
        }}
      >
        Add Member
      </button>

      <hr />

      <h5>All Members</h5>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Membership</th>
            <th>Expiry Date</th> {/* ✅ new column */}
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m._id}>
              <td>{m.name}</td>
              <td>{m.phone}</td>
              <td>{m.email}</td>
              <td>{m.membershipType}</td>
              <td>
                {m.membershipEndDate 
                  ? new Date(m.membershipEndDate).toLocaleDateString() 
                  : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{ fontSize: "13px", marginTop: "10px" }}>
        Fields marked with * are required.
      </p>
    </div>
  );
}
