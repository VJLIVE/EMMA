// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

import Navbar from "./components/Navbar"; // Import Navbar
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import SetPin from "./pages/SetPin";
import AskPin from "./pages/AskPin";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import TransactionHistoryPage from "./pages/TransactionHistoryPage.tsx";

function App() {
  return (
    <AuthProvider> {/* Provide auth context globally */}
      <Router>
        <Navbar /> {/* Navbar will appear on every page */}
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={<PublicRoute restricted={false}><Home /></PublicRoute>}
          />
          <Route
            path="/login"
            element={<PublicRoute restricted={true}><Login /></PublicRoute>}
          />
          <Route
            path="/signup"
            element={<PublicRoute restricted={true}><Signup /></PublicRoute>}
          />

          {/* Private Routes */}
          <Route
            path="/dashboard"
            element={<PrivateRoute><Dashboard /></PrivateRoute>}
          />
          <Route
            path="/askpin"
            element={<PrivateRoute><AskPin /></PrivateRoute>}
          />
          <Route
            path="/setpin"
            element={<PrivateRoute><SetPin /></PrivateRoute>}
          />
          <Route path="/transactions/:walletAddress" element={<TransactionHistoryPage />} /> {/* New route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
