import React, { useState } from "react";
import { updateTicketStatus } from "../../api/ticketService";

export default function TicketStatusUpdate({ ticket, onUpdated }) {
  const [status, setStatus] = useState(ticket.status || "");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const statuses = ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"];

  const handleUpdate = async () => {
    if (!status) {
      setMsg({ type: "error", text: "Please select a status" });
      return;
    }
    try {
      setLoading(true);
      await updateTicketStatus(ticket.id, { toStatus: status, comment });
      setMsg({ type: "success", text: "Status updated successfully" });
      setComment("");
      if (onUpdated) onUpdated();
    } catch (err) {
      console.error("Status update error:", err.response?.data || err.message);
      setMsg({ type: "error", text: err.response?.data?.message || "Status update failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-2 mt-3 mb-3">
      <h6>Update Status</h6>
      {msg && <div className={`alert ${msg.type === "success" ? "alert-success" : "alert-danger"}`}>{msg.text}</div>}
      <div className="d-flex gap-2 align-items-center">
        <select className="form-select" value={status} onChange={e => setStatus(e.target.value)}>
          <option value="">Select Status</option>
          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <input className="form-control" placeholder="Optional comment" value={comment} onChange={e => setComment(e.target.value)} />
        <button className="btn btn-primary" onClick={handleUpdate} disabled={loading}>{loading ? "Updating..." : "Update"}</button>
      </div>
    </div>
  );
}
