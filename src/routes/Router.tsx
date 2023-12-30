import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import LandingPage from "../pages/LandingPage";
import Dashboard from "../pages/dashboard/DashboardPage";
import TicTacToeGame from "../pages/games/TicTacToeGame";
import ProtectedRoute from "./ProtectedRoute";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute authenticatedView={false} element={<LandingPage />} />} />
        <Route path="/login" element={<ProtectedRoute authenticatedView={false} element={<LoginPage />} />} />
        <Route path="/register" element={<ProtectedRoute authenticatedView={false} element={<RegisterPage />} />} />
        <Route path="/dashboard" element={<ProtectedRoute authenticatedView={true} element={<Dashboard />} />} />
        <Route path="/game/:gameId" element={<ProtectedRoute authenticatedView={true} element={<TicTacToeGame />} />} />
        <Route path="*" element={<ProtectedRoute authenticatedView={true} element={<Dashboard />} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;