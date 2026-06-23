package com.examly.springapp.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.DTO.AssignTicketRequest;
import com.examly.springapp.model.Ticket;
import com.examly.springapp.model.TicketStatus;
import com.examly.springapp.service.AgentService;

@RestController
@RequestMapping("/api/agent")
@CrossOrigin(origins = "http://localhost:3000")
public class AgentController {

    private final AgentService agentService;

    public AgentController(AgentService agentService) {
        this.agentService = agentService;
    }

    @GetMapping("/tickets/open")
    public ResponseEntity<List<Ticket>> getOpenTickets() {
        return ResponseEntity.ok(agentService.getOpenTickets());
    }

    @GetMapping("/tickets")
    public ResponseEntity<List<Ticket>> getMyTickets(@RequestParam String agentEmail) {
        return ResponseEntity.ok(agentService.getTicketsByAgent(agentEmail));
    }

    @PutMapping("/tickets/{id}/assign")
    public ResponseEntity<Ticket> assignTicket(
            @PathVariable Long id,
            @RequestBody AssignTicketRequest request) {
        return ResponseEntity.ok(agentService.assignTicketToAgent(id, request.getAgentEmail()));
    }

    @PutMapping("/tickets/{id}/status")
    public ResponseEntity<Ticket> updateTicketStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> payload) {
        TicketStatus status = TicketStatus.valueOf(payload.get("status"));
        String comment = payload.get("comment");
        return ResponseEntity.ok(agentService.updateTicketStatus(id, status, comment));
    }

    @DeleteMapping("/tickets/{id}")
    public ResponseEntity<String> deleteTicket(@PathVariable Long id) {
        agentService.deleteTicket(id);
        return ResponseEntity.ok("Ticket deleted successfully");
    }
}
