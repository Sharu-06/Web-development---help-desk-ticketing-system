import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Modal,
  Paper,
  TextField,
  MenuItem,
  Stack,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { getUser } from "../../utils/auth";
import axiosInstance from "../../api/axiosInstance";

const STATUSES = ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"];

export default function AgentDashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [comment, setComment] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const user = getUser();
  const userName = user?.name || "Agent";
  const userEmail = user?.email || "";

  const loadTickets = async () => {
    if (!userEmail) return;
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/tickets?assignedAgent=${userEmail}`);
      setTickets(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to load tickets. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
    // eslint-disable-next-line
  }, [userEmail]);

  const handleOpen = (ticket, isView = false) => {
    setSelectedTicket(ticket);
    setNewStatus(ticket.status || "");
    setComment("");
    setViewMode(isView);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTicket(null);
    setViewMode(false);
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleUpdate = async () => {
    if (!selectedTicket) return;
    try {
      await axiosInstance.put(`/tickets/${selectedTicket.id}/status`, {
        status: newStatus,
        comment: comment || null,
      });
      showSnackbar("Ticket updated successfully!");
      handleClose();
      await loadTickets();
    } catch (err) {
      console.error("Update ticket error:", err.response?.data || err.message);
      const message = err.response?.data?.message || "Failed to update ticket.";
      showSnackbar(message, "error");
    }
  };

  const handleDelete = async (ticketId) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;
    try {
      await axiosInstance.delete(`/tickets/${ticketId}`);
      showSnackbar("Ticket deleted successfully!", "success");
      await loadTickets();
    } catch (err) {
      console.error("Delete ticket error:", err.response?.data || err.message);
      const message = err.response?.data?.message || "Failed to delete ticket.";
      showSnackbar(message, "error");
    }
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Agent Dashboard</Typography>
      </Box>

      <Typography variant="h6" gutterBottom>
        Welcome, {userName}
      </Typography>

      <Paper>
        {loading ? (
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </Box>
        ) : tickets.length === 0 ? (
          <Typography sx={{ p: 2 }}>No tickets assigned yet.</Typography>
        ) : (
          tickets.map((ticket) => (
            <Box
              key={ticket.id}
              p={2}
              borderBottom="1px solid #ddd"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              gap={2}
            >
              <Box>
                <Typography fontWeight={600}>{ticket.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  #{ticket.id} • {ticket.priority} • {ticket.category} • {ticket.status}
                </Typography>
                <Typography variant="body2">Reported By: {ticket.reportedBy}</Typography>
              </Box>

              <Stack direction="row" spacing={1}>
                <Button variant="outlined" onClick={() => handleOpen(ticket)}>
                  Update
                </Button>
                <Button color="error" variant="outlined" onClick={() => handleDelete(ticket.id)}>
                  Delete
                </Button>
                <Button color="info" variant="outlined" onClick={() => handleOpen(ticket, true)}>
                  View
                </Button>
              </Stack>
            </Box>
          ))
        )}
      </Paper>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 420,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
          }}
        >
          {selectedTicket && (
            <>
              <Typography variant="h6" gutterBottom>
                {viewMode ? `View Ticket #${selectedTicket.id}` : `Update Ticket #${selectedTicket.id}`}
              </Typography>
              <Typography fontWeight={600} gutterBottom>
                {selectedTicket.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {selectedTicket.description}
              </Typography>

              {viewMode ? (
                <>
                  <Typography variant="body2">Status: {selectedTicket.status}</Typography>
                  <Typography variant="body2">Priority: {selectedTicket.priority}</Typography>
                  <Typography variant="body2">Category: {selectedTicket.category}</Typography>
                  <Typography variant="body2">Reported By: {selectedTicket.reportedBy}</Typography>
                  <Box textAlign="right" mt={2}>
                    <Button variant="contained" onClick={handleClose}>
                      Close
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  <TextField
                    select
                    fullWidth
                    label="Status"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    sx={{ mt: 2 }}
                  >
                    {STATUSES.map((s) => (
                      <MenuItem key={s} value={s}>
                        {s}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    fullWidth
                    multiline
                    minRows={2}
                    label="Comment (optional)"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    sx={{ mt: 2 }}
                  />

                  <Stack direction="row" spacing={1} sx={{ mt: 2, justifyContent: "flex-end" }}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleUpdate}>
                      Save
                    </Button>
                  </Stack>
                </>
              )}
            </>
          )}
        </Box>
      </Modal>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
