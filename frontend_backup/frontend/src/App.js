import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CrimeRecords from "./pages/CrimeRecords";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Main Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        {/* Dashboard Feature Pages */}
        <Route path="/crime-records" element={<CrimeRecords />} />

        <Route path="/states-covered" element={<Dashboard />} />

        <Route path="/resources" element={<Dashboard />} />

        <Route path="/visualization" element={<Dashboard />} />

        <Route path="/catalog" element={<Dashboard />} />

        <Route path="/downloads" element={<Dashboard />} />

        <Route path="/safety" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;