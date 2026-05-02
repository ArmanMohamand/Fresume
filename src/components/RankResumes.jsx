import React, { useState } from "react";
import API from "../api";
import CandidateDetail from "./CandidateDetail";
import ErrorBoundary from "./ErrorBoundary"; // import the boundary

function RankResumes({ jobDesc, requiredSkills, setAnalytics }) {
  const [results, setResults] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [loadingCandidate, setLoadingCandidate] = useState(false);

  const handleRank = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await API.post(
        "/rank",
        { job_description: jobDesc, required_skills: requiredSkills },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setResults(res.data.results);
      if (res.data.analytics) {
        setAnalytics(res.data.analytics);
      }
    } catch (err) {
      console.error("Ranking failed:", err);
    }
  };

  const handleSelectCandidate = (candidate) => {
    setLoadingCandidate(true);
    // simulate fetch delay or set loading while fetching details
    setTimeout(() => {
      setSelectedCandidate(candidate);
      setLoadingCandidate(false);
    }, 800);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Rank Resumes</h2>
      <button
        onClick={handleRank}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Rank
      </button>

      {results && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Results</h3>
          <ul className="space-y-2">
            {results.map((r) => (
              // <li
              //   key={r.resume_id}
              //   onClick={() => handleSelectCandidate(r)}
              //   className="cursor-pointer p-2 border rounded hover:bg-gray-500"
              // >
              //   Resume {r.resume_id} → Score:{" "}
              //   {typeof r.score === "number" ? r.score.toFixed(2) : "N/A"} | Skills:{" "}
              //   {r.matched_skills?.join(", ") || "None"}
              // </li>
              <li
                key={r.resume_id}
                onClick={() => handleSelectCandidate(r)}
                className="cursor-pointer p-2 border rounded hover:bg-gray-500"
              >
                Resume {r.resume_id} → Score:{" "}
                {typeof r.score === "number" ? r.score.toFixed(2) : "N/A"} |
                Skills: {r.matched_skills?.join(", ") || "None"} | File:{" "}
                {r.filename || "N/A"}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Candidate Detail wrapped in ErrorBoundary */}
      <div className="mt-6">
        <ErrorBoundary>
          <CandidateDetail
            candidate={selectedCandidate}
            loading={loadingCandidate}
            onClose={() => setSelectedCandidate(null)}
          />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default RankResumes;

// import React, { useState } from "react";
// import API from "../api";
// import { useNavigate } from "react-router-dom";

// function RankResumes() {
//   const [results, setResults] = useState(null);
//   const navigate = useNavigate();

//   const handleRank = async () => {
//     const token = localStorage.getItem("token");

//     const res = await API.post(
//       "/rank",
//       {
//         job_description: localStorage.getItem("jobDesc") || "",
//         required_skills: JSON.parse(localStorage.getItem("requiredSkills") || "[]"),
//       },
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     setResults(res.data.results);
//   };

//   return (
//     <div className="p-6">
//       <button onClick={handleRank} className="bg-blue-500 px-4 py-2 text-white">
//         Rank
//       </button>

//       {results && results.map((r) => (
//         <div
//           key={r.resume_id}
//           onClick={() => navigate("/candidate", { state: r })}
//           className="p-3 border mt-2 cursor-pointer"
//         >
//           Resume {r.resume_id} → Score {r.score}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default RankResumes;
