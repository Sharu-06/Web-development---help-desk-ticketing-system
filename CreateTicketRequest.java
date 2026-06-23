package com.examly.springapp.DTO;

import com.examly.springapp.model.TicketCategory;
import com.examly.springapp.model.TicketPriority;
import com.examly.springapp.model.TicketStatus;

public class CreateTicketRequest {
    private String subject;
    private String description;
    private TicketCategory category;
    private TicketPriority priority;
    private String reportedBy;
    private TicketStatus status;

    public CreateTicketRequest() {}

    public CreateTicketRequest(String subject, String description, TicketCategory category,
                                TicketPriority priority, String reportedBy, TicketStatus status) {
        this.subject = subject;
        this.description = description;
        this.category = category;
        this.priority = priority;
        this.reportedBy = reportedBy;
        this.status = status;
    }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public TicketCategory getCategory() { return category; }
    public void setCategory(TicketCategory category) { this.category = category; }

    public TicketPriority getPriority() { return priority; }
    public void setPriority(TicketPriority priority) { this.priority = priority; }

    public String getReportedBy() { return reportedBy; }
    public void setReportedBy(String reportedBy) { this.reportedBy = reportedBy; }

    public TicketStatus getStatus() { return status; }
    public void setStatus(TicketStatus status) { this.status = status; }
}
