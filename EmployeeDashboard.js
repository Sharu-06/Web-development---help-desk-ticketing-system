import React, { useState, useEffect } from "react";
import TicketForm from "../tickets/TicketForm";
import TicketList from "../tickets/TicketList";
import { getUser } from "../../utils/auth";
import axiosInstance from "../../api/axiosInstance";

export default function EmployeeDashboard() {
  const user = getUser();
  const loggedUserEmail = user?.email || "";

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    if (loggedUserEmail) {
      axiosInstance
        .get(`/tickets?reportedBy=${loggedUserEmail}`)
        .then((res) => setTickets(res.data))
        .catch((err) => console.error("Error fetching tickets:", err));
    }
  }, [loggedUserEmail]);

  return (
    <div className="container py-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Welcome, {user?.name || user?.email}</h4>
      </div>

      <div className="row g-3">
        <div className="col-lg-6">
          <TicketForm />
        </div>
        <div className="col-lg-6">
          <TicketList tickets={tickets} />
        </div>
      </div>
    </div>
  );
}
