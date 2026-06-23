import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance"; 

export default function TicketDetails() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(`/tickets/${id}`)
      .then((res) => {
        setTicket(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching ticket:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading ticket...</p>;
  if (!ticket) return <p>Ticket not found</p>;

  return (
    <div className="container mt-4">
      <h2>Ticket Details</h2>
      <p><strong>ID:</strong> {ticket.id}</p>
      <p><strong>Title:</strong> {ticket.title}</p>
      <p><strong>Description:</strong> {ticket.description}</p>
      <p><strong>Status:</strong> {ticket.status}</p>
      <p><strong>Priority:</strong> {ticket.priority}</p>
    </div>
  );
}
