import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import UploadResume from "./components/UploadResume";
import RankResumes from "./components/RankResumes";
import Analytics from "./components/Analytics";
import JobDescription from "./components/JobDescription";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import CandidateDetail from "./components/CandidateDetail";

import "./index.css";

function App() {
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const [token, setToken] = useState(localStorage.getItem("token"));

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const [jobDesc, setJobDesc] = useState("");
  const [requiredSkills, setRequiredSkills] = useState([]);
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Router>
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
          <div className="flex justify-between items-center px-6 py-4">
            <h1 className="text-2xl font-bold">Resume Screening Dashboard</h1>
          </div>

          <Navbar
            handleLogout={handleLogout}
            toggleTheme={toggleTheme}
            theme={theme}
          />
          <Toaster position="top-right" />

          <Routes>
            <Route path="/upload" element={<UploadResume />} />

            <Route
              path="/jobdesc"
              element={
                <JobDescription
                  setJobDesc={setJobDesc}
                  setRequiredSkills={setRequiredSkills}
                  token={token}
                />
              }
            />

            <Route
              path="/rank"
              element={
                <RankResumes
                  jobDesc={jobDesc}
                  requiredSkills={requiredSkills}
                  setSelectedCandidate={setSelectedCandidate}
                />
              }
            />

            <Route
              path="/analytics"
              element={
                selectedCandidate ? (
                  <div className="space-y-8 p-6">
                    <CandidateDetail candidate={selectedCandidate} />

                    <Analytics candidate={selectedCandidate} />
                  </div>
                ) : (
                  <Navigate to="/rank" />
                )
              }
            />

            <Route path="*" element={<Navigate to="/upload" />} />
          </Routes>
        </div>
      )}
    </Router>
  );
}

export default App;
