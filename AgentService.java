package com.examly.springapp.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.examly.springapp.model.Ticket;
import com.examly.springapp.model.TicketStatus;
import com.examly.springapp.repository.TicketRepository;
import com.examly.springapp.repository.UserRepository;

@Service
@Transactional
public class AgentService {

    private final TicketRepository ticketRepo;
    private final UserRepository userRepo;

    public AgentService(TicketRepository ticketRepo, UserRepository userRepo) {
        this.ticketRepo = ticketRepo;
        this.userRepo = userRepo;
    }

    public List<Ticket> getOpenTickets() {
        return ticketRepo.findByStatus(TicketStatus.OPEN);
    }

    public List<Ticket> getTicketsByAgent(String agentEmail) {
        return ticketRepo.findByAssignedAgent_Email(agentEmail);
    }

    public Ticket assignTicketToAgent(Long ticketId, String agentEmail) {
        Ticket ticket = ticketRepo.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
        if (ticket.getAssignedAgent() != null) {
            throw new RuntimeException("Ticket already assigned");
        }
        ticket.setAssignedAgent(userRepo.findByEmail(agentEmail)
                .orElseThrow(() -> new RuntimeException("Agent not found")));
        return ticketRepo.save(ticket);
    }

    public Ticket updateTicketStatus(Long ticketId, TicketStatus status, String comment) {
        Ticket ticket = ticketRepo.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
        ticket.setStatus(status);
        if (comment != null && !comment.isEmpty()) {
            ticket.setComment(comment);
        }
        return ticketRepo.save(ticket);
    }

    public void deleteTicket(Long ticketId) {
        if (!ticketRepo.existsById(ticketId)) {
            throw new RuntimeException("Ticket not found");
        }
        ticketRepo.deleteById(ticketId);
    }
}
