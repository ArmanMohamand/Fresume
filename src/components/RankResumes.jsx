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
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function CandidateDetail() {
  const { state: candidate } = useLocation();
  const navigate = useNavigate();

  if (!candidate) {
    return (
      <div className="p-6 text-center text-gray-500">
        No candidate selected
        <div className="mt-4">
          <button
            onClick={() => navigate("/rank")}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const meta = candidate.metadata || {};

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Candidate Profile</h2>

      <div className="space-y-2">
        <p>
          <strong>Name:</strong> {meta.name || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {meta.email || "N/A"}
        </p>
        <p>
          <strong>Phone:</strong> {meta.phone || "N/A"}
        </p>
        <p>
          <strong>GitHub:</strong> {meta.github || "N/A"}
        </p>
      </div>

      <div className="mt-5">
        <p className="font-semibold mb-2">Projects:</p>

        <ul className="list-disc ml-6">
          {Array.isArray(meta.projects) && meta.projects.length > 0 ? (
            meta.projects.map((p, i) => <li key={i}>{p}</li>)
          ) : (
            <li>N/A</li>
          )}
        </ul>
      </div>

      <div className="mt-6 text-lg font-bold text-green-600">
        Score:{" "}
        {typeof candidate.score === "number"
          ? candidate.score.toFixed(2)
          : candidate.score || 0}
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-6 px-4 py-2 bg-gray-700 text-white rounded"
      >
        Back
      </button>
    </div>
  );
}

export default CandidateDetail;
