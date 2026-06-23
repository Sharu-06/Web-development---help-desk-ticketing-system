import React, { useState } from "react";
import { createTicket } from "../../api/ticketService";

export default function TicketForm({ onCreated }) {
  const [form, setForm] = useState({ subject: "", description: "", priority: "", category: "", reportedBy: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [errs, setErrs] = useState({});

  const categories = ["SOFTWARE", "HARDWARE", "NETWORK", "OTHER"];
  const priorities = ["LOW", "MEDIUM", "HIGH"];

  const validate = () => {
    const e = {};
    if (!form.subject || form.subject.trim().length < 5) e.subject = "Title must be at least 5 characters";
    if (!form.description || form.description.trim().length === 0) e.description = "Description is required";
    if (!priorities.includes(form.priority.toUpperCase())) e.priority = "Select valid priority";
    if (!categories.includes(form.category.toUpperCase())) e.category = "Select valid category";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.reportedBy)) e.reportedBy = "Enter a valid email";
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    if (!validate()) return;

    try {
      setLoading(true);
      await createTicket(form);
      setMsg({ type: "success", text: "Ticket created successfully!" });
      setForm({ subject: "", description: "", priority: "", category: "", reportedBy: "" });
      setErrs({});
      if (onCreated) onCreated();
    } catch (err) {
      console.error("Ticket creation error:", err.response?.data || err.message);
      setMsg({ type: "error", text: err.response?.data?.message || "Ticket creation failed. Check server logs." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-3 mb-3 shadow-sm">
      <h5>Create Ticket</h5>
      {msg && <div className={`alert ${msg.type === "success" ? "alert-success" : "alert-danger"}`}>{msg.text}</div>}
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Title" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
        {errs.subject && <div className="text-danger small">{errs.subject}</div>}

        <textarea className="form-control mb-2" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        {errs.description && <div className="text-danger small">{errs.description}</div>}

        <select className="form-select mb-2" value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
          <option value="">Select Priority</option>
          {priorities.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        {errs.priority && <div className="text-danger small">{errs.priority}</div>}

        <select className="form-select mb-2" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
          <option value="">Select Category</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        {errs.category && <div className="text-danger small">{errs.category}</div>}

        <input className="form-control mb-2" placeholder="Reported By (email)" value={form.reportedBy} onChange={e => setForm({ ...form, reportedBy: e.target.value })} />
        {errs.reportedBy && <div className="text-danger small">{errs.reportedBy}</div>}

        <button className="btn btn-primary" disabled={loading}>{loading ? "Creating..." : "Submit Ticket"}</button>
      </form>
    </div>
  );
}
