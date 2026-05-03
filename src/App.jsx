// // src/App.js
// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import UploadResume from "./components/UploadResume";
// import RankResumes from "./components/RankResumes";
// import Analytics from "./components/Analytics";
// import JobDescription from "./components/JobDescription";
// import Login from "./components/Login";
// import Navbar from "./components/Navbar";
// import "./index.css";

// function App() {
//   const [analytics, setAnalytics] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

//   // New state for JD + required skills
//   const [jobDesc, setJobDesc] = useState("");
//   const [requiredSkills, setRequiredSkills] = useState([]);

//   useEffect(() => {
//     if (theme === "dark") {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setToken(null);
//   };

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };

//   return (
//     <Router>
//       {!token ? (
//         <Login setToken={setToken} />
//       ) : (
//         <div className="min-h-screen bg-gray-100 text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
//           <div className="flex justify-between items-center px-6 py-4">
//             <h1 className="text-2xl font-bold">Resume Screening Dashboard</h1>

//           </div>

//           <Navbar
//             handleLogout={handleLogout}
//             toggleTheme={toggleTheme}
//             theme={theme}
//           />

//           <Routes>
//             <Route path="/upload" element={<UploadResume />} />
//             <Route
//               path="/jobdesc"
//               element={
//                 <JobDescription
//                   setJobDesc={setJobDesc}
//                   setRequiredSkills={setRequiredSkills}
//                 />
//               }
//             />
//             <Route
//               path="/rank"
//               element={
//                 <RankResumes
//                   jobDesc={jobDesc}
//                   requiredSkills={requiredSkills}
//                   setAnalytics={setAnalytics}
//                 />
//               }
//             />
//             <Route
//               path="/analytics"
//               element={<Analytics analytics={analytics} />}
//             />
//             <Route path="*" element={<Navigate to="/upload" />} />
//           </Routes>
//         </div>
//       )}
//     </Router>
//   );
// }

// export default App;

// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// import UploadResume from "./components/UploadResume";
// import RankResumes from "./components/RankResumes";
// import Analytics from "./components/Analytics";
// import JobDescription from "./components/JobDescription";
// import Login from "./components/Login";
// import Navbar from "./components/Navbar";
// import CandidateDetail from "./components/CandidateDetail";

// import "./index.css";

// function App() {
//   const [analytics, setAnalytics] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

//   const [jobDesc, setJobDesc] = useState("");
//   const [requiredSkills, setRequiredSkills] = useState([]);

//   useEffect(() => {
//     if (theme === "dark") {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setToken(null);
//   };

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };

//   return (
//     <Router>
//       {!token ? (
//         <Login setToken={setToken} />
//       ) : (
//         <div className="min-h-screen bg-gray-100 text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">

//           <div className="flex justify-between items-center px-6 py-4">
//             <h1 className="text-2xl font-bold">
//               Resume Screening Dashboard
//             </h1>
//           </div>

//           <Navbar
//             handleLogout={handleLogout}
//             toggleTheme={toggleTheme}
//             theme={theme}
//           />

//           <Routes>
//             <Route path="/upload" element={<UploadResume />} />

//             <Route
//               path="/jobdesc"
//               element={
//                 <JobDescription
//                   setJobDesc={setJobDesc}
//                   setRequiredSkills={setRequiredSkills}
//                 />
//               }
//             />

//             <Route
//               path="/rank"
//               element={
//                 <RankResumes
//                   jobDesc={jobDesc}
//                   requiredSkills={requiredSkills}
//                   setAnalytics={setAnalytics}
//                 />
//               }
//             />

//             <Route
//               path="/analytics"
//               element={<Analytics analytics={analytics} />}
//             />

//             {/* ✅ NEW ROUTE: Candidate Detail Page */}
//             <Route
//               path="/candidate"
//               element={<CandidateDetail />}
//             />

//             <Route path="*" element={<Navigate to="/upload" />} />
//           </Routes>
//         </div>
//       )}
//     </Router>
//   );
// }

// export default App;

// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// import UploadResume from "./components/UploadResume";
// import RankResumes from "./components/RankResumes";
// import Analytics from "./components/Analytics";
// import JobDescription from "./components/JobDescription";
// import Login from "./components/Login";
// import Navbar from "./components/Navbar";
// import CandidateDetail from "./components/CandidateDetail";

// import "./index.css";

// function App() {
//   const [analytics, setAnalytics] = useState(null);
//   const [selectedCandidate, setSelectedCandidate] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

//   const [jobDesc, setJobDesc] = useState("");
//   const [requiredSkills, setRequiredSkills] = useState([]);

//   useEffect(() => {
//     if (theme === "dark") {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setToken(null);
//   };

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };

//   return (
//     <Router>
//       {!token ? (
//         <Login setToken={setToken} />
//       ) : (
//         <div className="min-h-screen bg-gray-100 text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
//           <div className="flex justify-between items-center px-6 py-4">
//             <h1 className="text-2xl font-bold">Resume Screening Dashboard</h1>
//           </div>

//           <Navbar
//             handleLogout={handleLogout}
//             toggleTheme={toggleTheme}
//             theme={theme}
//           />

//           <Routes>
//             <Route path="/upload" element={<UploadResume />} />

//             <Route
//               path="/jobdesc"
//               element={
//                 <JobDescription
//                   setJobDesc={setJobDesc}
//                   setRequiredSkills={setRequiredSkills}
//                 />
//               }
//             />

//             <Route
//               path="/rank"
//               element={
//                 <RankResumes
//                   jobDesc={jobDesc}
//                   requiredSkills={requiredSkills}
//                   setAnalytics={setAnalytics}
//                   setSelectedCandidate={setSelectedCandidate}
//                 />
//               }
//             />

//             <Route
//               path="/analytics"
//               element={<Analytics analytics={analytics} />}
//             />

//             <Route
//               path="/candidate"
//               element={<CandidateDetail candidate={selectedCandidate} />}
//             />

//             <Route path="*" element={<Navigate to="/upload" />} />
//           </Routes>
//         </div>
//       )}
//     </Router>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

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
  const [activeTab, setActiveTab] = useState("rank");

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
        <div className="min-h-screen bg-gray-100 text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
          <div className="flex justify-between items-center px-6 py-4">
            <h1 className="text-2xl font-bold">Resume Screening Dashboard</h1>
          </div>

          <Navbar
            handleLogout={handleLogout}
            toggleTheme={toggleTheme}
            theme={theme}
          />

          {/* Tab headers */}
          <div className="flex space-x-4 border-b px-6">
            <button
              className={`pb-2 ${activeTab === "rank" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
              onClick={() => setActiveTab("rank")}
            >
              Rank
            </button>
            <button
              className={`pb-2 ${activeTab === "analytics" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
              onClick={() => setActiveTab("analytics")}
              disabled={!selectedCandidate}
            >
              Analytics
            </button>
          </div>

          {/* Tab content */}
          {activeTab === "rank" && (
            <RankResumes
              jobDesc={jobDesc}
              requiredSkills={requiredSkills}
              setSelectedCandidate={setSelectedCandidate}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === "analytics" && selectedCandidate && (
            <div className="relative space-y-8 pb-20 px-6">
              <CandidateDetail candidate={selectedCandidate} />
              <Analytics candidate={selectedCandidate} />

              {/* Sticky Back to Rank button */}
              <div className="fixed bottom-6 right-6">
                <button
                  onClick={() => setActiveTab("rank")}
                  className="px-4 py-2 bg-gray-600 text-white rounded shadow-lg hover:bg-gray-700"
                >
                  ← Back to Rank
                </button>
              </div>
            </div>
          )}

          <Routes>
            <Route path="/upload" element={<UploadResume />} />
            <Route
              path="/jobdesc"
              element={
                <JobDescription
                  setJobDesc={setJobDesc}
                  setRequiredSkills={setRequiredSkills}
                />
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
