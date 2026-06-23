package com.examly.springapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.examly.springapp.model.Ticket;
import com.examly.springapp.model.TicketStatus;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.TicketRepository;
import com.examly.springapp.repository.UserRepository;

@Service
public class AdminServiceImpl implements AdminService {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;

    public AdminServiceImpl(TicketRepository ticketRepository, UserRepository userRepository) {
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Ticket> getAllTickets(TicketStatus status, String agentEmail) {
        if (status != null && agentEmail != null) {
            return ticketRepository.findByStatusAndAssignedAgent_Email(status, agentEmail);
        } else if (status != null) {
            return ticketRepository.findByStatus(status);
        } else if (agentEmail != null) {
            return ticketRepository.findByAssignedAgent_Email(agentEmail);
        } else {
            return ticketRepository.findAll();
        }
    }

    @Override
    public Ticket assignTicketToAgent(Long ticketId, String agentEmail) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        User agent = userRepository.findByEmail(agentEmail)
                .orElseThrow(() -> new RuntimeException("Agent not found"));

        ticket.setAssignedAgent(agent);
        return ticketRepository.save(ticket);
    }

    @Override
    public Ticket updateTicketStatus(Long ticketId, TicketStatus status) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
        ticket.setStatus(status);
        return ticketRepository.save(ticket);
    }

    @Override
    public void deleteTicket(Long ticketId) {
        if (!ticketRepository.existsById(ticketId)) {
            throw new RuntimeException("Ticket not found");
        }
        ticketRepository.deleteById(ticketId);
    }
}
