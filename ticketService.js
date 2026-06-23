import axiosInstance from "./axiosInstance";

export function createTicket(ticketData) {
  return axiosInstance.post("/tickets", {
    subject: ticketData.subject,
    description: ticketData.description,
    priority: ticketData.priority.toUpperCase(),
    category: ticketData.category.toUpperCase(),
    reportedBy: ticketData.reportedBy,
    status: "OPEN"
  });
}

export function getAllTickets() {
  return axiosInstance.get("/tickets");
}

export function getTicketById(id) {
  return axiosInstance.get(`/tickets/${id}`);
}

export function updateTicketStatus(id, payload) {
  return axiosInstance.put(`/tickets/${id}/status`, payload);
}

export function deleteTicket(id) {
  return axiosInstance.delete(`/tickets/${id}`);
}
