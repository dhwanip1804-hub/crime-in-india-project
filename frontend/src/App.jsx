import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import CrimeRecords from "./pages/CrimeRecords";
import StatesCovered from "./pages/StatesCovered";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LANDING PAGE */}
        <Route
          path="/"
          element={<LandingPage />}
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* CRIME RECORDS */}
        <Route
          path="/crime-records"
          element={<CrimeRecords />}
        />

        {/* STATES COVERED */}
        <Route
          path="/states-covered"
          element={<StatesCovered />}
        />

      </Routes>
    </BrowserRouter>
  );
}