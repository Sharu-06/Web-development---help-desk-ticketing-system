package com.examly.springapp.model;

public enum TicketStatus {
    OPEN,
    IN_PROGRESS,
    RESOLVED;

    public static TicketStatus fromString(String value) {
        if (value == null) {
            return null;
        }
        String normalized = value.trim().toUpperCase().replace(" ", "_");
        for (TicketStatus status : TicketStatus.values()) {
            if (status.name().equals(normalized)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Invalid ticket status: " + value);
    }
}
