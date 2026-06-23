package com.examly.springapp.DTO;

import com.examly.springapp.model.TicketStatus;

public class UpdateTicketStatusRequest {
    private String status; 

    public UpdateTicketStatusRequest() {}

    public UpdateTicketStatusRequest(String status) {
        this.status = status;
    }

    public TicketStatus getStatus() {
        return TicketStatus.fromString(status);
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
