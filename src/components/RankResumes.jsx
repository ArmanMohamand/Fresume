// import React, { useState } from "react";
// import API from "../api";
// import CandidateDetail from "./CandidateDetail";
// import ErrorBoundary from "./ErrorBoundary"; // import the boundary

// function RankResumes({ jobDesc, requiredSkills, setAnalytics }) {
//   const [results, setResults] = useState(null);
//   const [selectedCandidate, setSelectedCandidate] = useState(null);
//   const [loadingCandidate, setLoadingCandidate] = useState(false);

//   const handleRank = async () => {
//     const token = localStorage.getItem("token");
//     try {
//       const res = await API.post(
//         "/rank",
//         { job_description: jobDesc, required_skills: requiredSkills },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setResults(res.data.results);
//       if (res.data.analytics) {
//         setAnalytics(res.data.analytics);
//       }
//     } catch (err) {
//       console.error("Ranking failed:", err);
//     }
//   };

//   const handleSelectCandidate = (candidate) => {
//     setLoadingCandidate(true);
//     // simulate fetch delay or set loading while fetching details
//     setTimeout(() => {
//       setSelectedCandidate(candidate);
//       setLoadingCandidate(false);
//     }, 800);
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Rank Resumes</h2>
//       <button
//         onClick={handleRank}
//         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//       >
//         Rank
//       </button>

//       {results && (
//         <div className="mt-4">
//           <h3 className="text-lg font-semibold mb-2">Results</h3>
//           <ul className="space-y-2">
//             {results.map((r) => (
//               <li
//                 key={r.resume_id}
//                 onClick={() => handleSelectCandidate(r)}
//                 className="cursor-pointer p-2 border rounded hover:bg-gray-500"
//               >
//                 Resume {r.resume_id} → Score:{" "}
//                 {typeof r.score === "number" ? r.score.toFixed(2) : "N/A"} | Skills:{" "}
//                 {r.matched_skills?.join(", ") || "None"}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Candidate Detail wrapped in ErrorBoundary */}
//       <div className="mt-6">
//         <ErrorBoundary>
//           <CandidateDetail
//             candidate={selectedCandidate}
//             loading={loadingCandidate}
//             onClose={() => setSelectedCandidate(null)}
//           />
//         </ErrorBoundary>
//       </div>
//     </div>
//   );
// }

// export default RankResumes;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function RankResumes({ jobDesc, requiredSkills, setAnalytics }) {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRank = async () => {
    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      const res = await API.post(
        "/rank",
        {
          job_description: jobDesc,
          required_skills: requiredSkills,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setResults(res.data.results);

      if (res.data.analytics) {
        setAnalytics(res.data.analytics);
      }
    } catch (err) {
      console.error("Ranking failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCandidate = (candidate) => {
    navigate("/candidate", { state: candidate });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Rank Resumes</h2>

      <button
        onClick={handleRank}
        disabled={loading}
        className={`px-4 py-2 rounded text-white transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "Ranking..." : "Rank Resumes"}
      </button>

      {results && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Ranked Candidates</h3>

          <ul className="space-y-3">
            {results.map((r) => (
              <li
                key={r.resume_id}
                onClick={() => handleSelectCandidate(r)}
                className="cursor-pointer p-4 border rounded-lg 
                           bg-white dark:bg-gray-800 
                           hover:bg-gray-100 dark:hover:bg-gray-700 
                           transition shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <div className="font-semibold">Resume #{r.resume_id}</div>

                  <div className="text-sm font-bold text-blue-500">
                    Score:{" "}
                    {typeof r.score === "number" ? r.score.toFixed(2) : "N/A"}
                  </div>
                </div>

                <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Skills: {r.matched_skills?.join(", ") || "None"}
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  Click to view full candidate profile →
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RankResumes;
