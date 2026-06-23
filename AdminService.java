package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.model.Ticket;
import com.examly.springapp.model.TicketStatus;

public interface AdminService {
    List<Ticket> getAllTickets(TicketStatus status, String agentEmail);
    Ticket assignTicketToAgent(Long ticketId, String agentEmail);
    Ticket updateTicketStatus(Long ticketId, TicketStatus status);
    void deleteTicket(Long ticketId);
}
