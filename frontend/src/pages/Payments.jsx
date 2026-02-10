import { useEffect, useState } from "react";
import { API } from "../api";

export default function Payments() {
  const [members, setMembers] = useState([]);
  const [payments, setPayments] = useState([]);

  const [form, setForm] = useState({
    memberId: "",
    amount: "",
    method: ""
  });

  // Fetch Members
  const fetchMembers = async () => {
    const res = await API.get("/members");
    setMembers(res.data);
  };

  // Fetch Payments
  const fetchPayments = async () => {
    const res = await API.get("/payments");
    setPayments(res.data);
  };

  useEffect(() => {
    fetchMembers();
    fetchPayments();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add Payment
  const addPayment = async () => {
    if (!form.memberId || !form.amount || !form.method) {
      alert("Please fill all required fields (*)");
      return;
    }

    try {
      await API.post("/payments", {
        memberId: form.memberId,
        amount: Number(form.amount),
        method: form.method
      });

      alert("Payment added successfully. Email sent to member.");

      setForm({ memberId: "", amount: "", method: "" });
      fetchPayments();

    } catch (err) {
      alert("Payment added, but email may have failed.");
    }
  };

  return (
    <div className="container container-box">

      <div
        style={{
          background: "linear-gradient(to right, #ff512f, #dd2476)",
          padding: "10px",
          borderRadius: "8px",
          color: "white",
          marginBottom: "20px",
          textAlign: "center"
        }}
      >
        <h3>Payment Management</h3>
      </div>

      <h5>Add Payment</h5>

      {/* Member Dropdown */}
      <label>Member *</label>
      <select
        className="form-control mb-2"
        name="memberId"
        value={form.memberId}
        onChange={handleChange}
      >
        <option value="">Select Member</option>
        {members.map((m) => (
          <option key={m._id} value={m._id}>
            {m.name}
          </option>
        ))}
      </select>

      {/* Amount */}
      <label>Amount *</label>
      <input
        className="form-control mb-2"
        name="amount"
        value={form.amount}
        onChange={handleChange}
        placeholder="Enter Amount"
        type="number"
      />

      {/* Payment Method */}
      <label>Payment Method *</label>
      <select
        className="form-control mb-3"
        name="method"
        value={form.method}
        onChange={handleChange}
      >
        <option value="">Select Method</option>
        <option value="Cash">Cash</option>
        <option value="UPI">UPI</option>
        <option value="Card">Card</option>
        <option value="Net Banking">Net Banking</option>
      </select>

      <button
        onClick={addPayment}
        style={{
          background: "linear-gradient(to right, #ff512f, #dd2476)",
          border: "none",
          color: "white",
          padding: "8px 20px",
          borderRadius: "6px"
        }}
      >
        Add Payment
      </button>

      <hr />

      <h5>Payment Records</h5>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Member</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p._id}>
              <td>{p.memberId?.name || "Deleted Member"}</td>
              <td>₹{p.amount}</td>
              <td>{p.method}</td>
              <td>{new Date(p.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}