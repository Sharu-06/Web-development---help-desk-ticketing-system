import React, { useState } from "react";
import TicketForm from "../components/tickets/TicketForm";
import TicketList from "../components/tickets/TicketList";

export default function TicketsPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTicketCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="container py-3">
      <h3 className="mb-3">Create Ticket</h3>
      <TicketForm onCreated={handleTicketCreated} />

      <h3 className="mt-4 mb-3">All Tickets</h3>
      <TicketList refreshTrigger={refreshTrigger} />
    </div>
  );
}
