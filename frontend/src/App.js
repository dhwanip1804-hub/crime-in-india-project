import React from "react";
import { Routes, Route } from "react-router-dom";
import Resources from "./pages/Resources";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CrimeRecords from "./pages/CrimeRecords";
import StatesCovered from "./pages/StatesCovered";
import Visualization from "./pages/Visualization";
import Catalog from "./pages/Catalog";
import Downloads from "./pages/Downloads";
import SafetyClassification from "./pages/SafetyClassification";

import AboutUs from "./pages/AboutUs";
import UploadCSV from "./pages/UploadCSV";
import CSVPreview from "./pages/CSVPreview";
import KMeansPrediction from "./pages/KMeansPrediction";
import PredictionHome from "./pages/PredictionHome";
import CrimePrediction from "./pages/CrimePrediction";
import TheftCrime from "./pages/TheftCrime";
import Analysis from "./pages/Analysis";
function App() {
  return (
    
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

        <Route path="/states-covered" element={<StatesCovered />} />

        <Route path="/visualization" element={<Visualization />} />

        <Route path="/resources" element={<Resources />} />

        <Route path="/catalog" element={<Catalog />} />

        <Route path="/upload-csv" element={<UploadCSV />} />
        
        <Route path="/about-us" element={<AboutUs />} />

        <Route path="/downloads" element={<Downloads />} />

        <Route path="/safety-classification" element={<SafetyClassification />}/>

        <Route path="/prediction"  element={<PredictionHome />} />
        
        <Route path="/upload-csv" element={<UploadCSV />} />
        
        <Route path="/csv-preview" element={<CSVPreview />} />
        
        <Route path="/kmeans-prediction" element={<KMeansPrediction />} />

        <Route path="/prediction/:crimeType" element={<CrimePrediction />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/theft-crime" element={<TheftCrime />} /> </Routes>
    
  );
}

export default App;