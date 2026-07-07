import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Navbar } from "../components/layout/Navbar";

export function AppRoutes() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
