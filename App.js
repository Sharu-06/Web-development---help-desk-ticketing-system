import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

import EmployeeDashboard from "./components/employee/EmployeeDashboard";
import AgentDashboard from "./components/agent/AgentDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import TicketsPage from "./pages/TicketsPage";
import TicketList from "./components/tickets/TicketList";
import TicketDetails from "./components/tickets/TicketDetails";

import { isAuthenticated, getUser } from "./utils/auth";

const PrivateRoute = ({ children, roles }) => {
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  const user = getUser();
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
};

export default function App() {
  return (
    <Router>
      <Navbar />
      <main className="py-4">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated() ? (
                <Navigate to={`/${getUser().role.toLowerCase()}`} replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/employee"
            element={
              <PrivateRoute roles={["EMPLOYEE"]}>
                <EmployeeDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/agent"
            element={
              <PrivateRoute roles={["AGENT"]}>
                <AgentDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute roles={["ADMIN"]}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/tickets"
            element={
              <PrivateRoute roles={["EMPLOYEE", "AGENT", "ADMIN"]}>
                <TicketsPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/tickets/list"
            element={
              <PrivateRoute roles={["EMPLOYEE", "AGENT", "ADMIN"]}>
                <TicketList />
              </PrivateRoute>
            }
          />

          <Route
            path="/tickets/:id"
            element={
              <PrivateRoute roles={["EMPLOYEE", "AGENT", "ADMIN"]}>
                <TicketDetails />
              </PrivateRoute>
            }
          />

          <Route
            path="*"
            element={
              <div className="container py-4">
                <h2>404 - Page not found</h2>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
