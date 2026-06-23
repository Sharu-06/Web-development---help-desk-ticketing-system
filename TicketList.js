import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import axiosInstance from "../../api/axiosInstance"; 
import { useNavigate } from "react-router-dom";

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/tickets")
      .then((res) => {
        setTickets(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tickets:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading tickets...</p>;

  return (
    <div className="container mt-4">
      <h2>All Tickets</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.title}</td>
                <td>{ticket.status}</td>
                <td>{ticket.priority}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/tickets/${ticket.id}`)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No tickets found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
