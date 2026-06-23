package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Ticket;
import com.examly.springapp.model.TicketStatus;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByStatus(TicketStatus status);

    List<Ticket> findByAssignedAgent_Email(String email);

    List<Ticket> findByStatusAndAssignedAgent_Email(TicketStatus status, String email);
}
