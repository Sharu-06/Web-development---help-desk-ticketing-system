package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.DTO.CreateTicketRequest;
import com.examly.springapp.DTO.UpdateTicketStatusRequest;
import com.examly.springapp.model.Ticket;

public interface TicketService {
    Ticket createTicket(CreateTicketRequest request);
    List<Ticket> getAllTickets();
    Ticket getTicketById(Long id);
    Ticket updateTicketStatus(Long id, UpdateTicketStatusRequest request);
    void deleteTicket(Long id);
}
