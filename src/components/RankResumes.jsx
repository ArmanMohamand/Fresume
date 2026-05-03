// // import React, { useState } from "react";
// // import API from "../api";
// // import CandidateDetail from "./CandidateDetail";
// // import ErrorBoundary from "./ErrorBoundary"; // import the boundary

// // function RankResumes({ jobDesc, requiredSkills, setAnalytics }) {
// //   const [results, setResults] = useState(null);
// //   const [selectedCandidate, setSelectedCandidate] = useState(null);
// //   const [loadingCandidate, setLoadingCandidate] = useState(false);

// //   const handleRank = async () => {
// //     const token = localStorage.getItem("token");
// //     try {
// //       const res = await API.post(
// //         "/rank",
// //         { job_description: jobDesc, required_skills: requiredSkills },
// //         { headers: { Authorization: `Bearer ${token}` } },
// //       );
// //       setResults(res.data.results);
// //       if (res.data.analytics) {
// //         setAnalytics(res.data.analytics);
// //       }
// //     } catch (err) {
// //       console.error("Ranking failed:", err);
// //     }
// //   };ye

// //   const handleSelectCandidate = (candidate) => {
// //     setLoadingCandidate(true);
// //     // simulate fetch delay or set loading while fetching details
// //     setTimeout(() => {
// //       setSelectedCandidate(candidate);
// //       setLoadingCandidate(false);
// //     }, 800);
// //   };

// //   return (
// //     <div className="p-6">
// //       <h2 className="text-xl font-bold mb-4">Rank Resumes</h2>
// //       <button
// //         onClick={handleRank}
// //         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
// //       >
// //         Rank
// //       </button>

// //       {results && (
// //         <div className="mt-4">
// //           <h3 className="text-lg font-semibold mb-2">Results</h3>
// //           <ul className="space-y-2">
// //             {results.map((r) => (
// //               // <li
// //               //   key={r.resume_id}
// //               //   onClick={() => handleSelectCandidate(r)}
// //               //   className="cursor-pointer p-2 border rounded hover:bg-gray-500"
// //               // >
// //               //   Resume {r.resume_id} → Score:{" "}
// //               //   {typeof r.score === "number" ? r.score.toFixed(2) : "N/A"} | Skills:{" "}
// //               //   {r.matched_skills?.join(", ") || "None"}
// //               // </li>
// //               <li
// //                 key={r.resume_id}
// //                 onClick={() => handleSelectCandidate(r)}
// //                 className="cursor-pointer p-2 border rounded hover:bg-gray-500"
// //               >
// //                 Resume {r.resume_id} → Score:{" "}
// //                 {typeof r.score === "number" ? r.score.toFixed(2) : "N/A"} |
// //                 Skills: {r.matched_skills?.join(", ") || "None"} | File:{" "}
// //                 {r.filename || "N/A"}
// //               </li>
// //             ))}
// //           </ul>
// //         </div>
// //       )}

// //       {/* Candidate Detail wrapped in ErrorBoundary */}
// //       <div className="mt-6">
// //         <ErrorBoundary>
// //           <CandidateDetail
// //             candidate={selectedCandidate}
// //             loading={loadingCandidate}
// //             onClose={() => setSelectedCandidate(null)}
// //           />
// //         </ErrorBoundary>
// //       </div>
// //     </div>
// //   );
// // }

// // export default RankResumes;




// import React, { useState } from "react";
// import API from "../api";

// function RankResumes({ jobDesc, requiredSkills, setSelectedCandidate, setActiveTab }) {
//   const [results, setResults] = useState(null);

//   const handleRank = async () => {
//     const token = localStorage.getItem("token");
//     try {
//       const res = await API.post(
//         "/rank",
//         { job_description: jobDesc, required_skills: requiredSkills },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setResults(res.data.results);
//     } catch (err) {
//       console.error("Ranking failed:", err);
//     }
//   };

//   const handleSelectCandidate = (candidate) => {
//     setSelectedCandidate(candidate);
//     setActiveTab("analytics"); // switch to Analytics tab when a resume is clicked
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
//                 className="cursor-pointer p-2 border rounded hover:bg-gray-200"
//               >
//                 {r.metadata?.name || `Resume ${r.resume_id}`} → Score:{" "}
//                 {typeof r.score === "number" ? r.score.toFixed(2) : "N/A"} |
//                 Skills: {r.matched_skills?.join(", ") || "None"} | File:{" "}
//                 {r.filename || "N/A"}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default RankResumes;


// // import React, { useState } from "react";
// // import API from "../api";
// // import { useNavigate } from "react-router-dom";

// // function RankResumes() {
// //   const [results, setResults] = useState(null);
// //   const navigate = useNavigate();

// //   const handleRank = async () => {
// //     const token = localStorage.getItem("token");

// //     const res = await API.post(
// //       "/rank",
// //       {
// //         job_description: localStorage.getItem("jobDesc") || "",
// //         required_skills: JSON.parse(localStorage.getItem("requiredSkills") || "[]"),
// //       },
// //       {
// //         headers: { Authorization: `Bearer ${token}` },
// //       }
// //     );

// //     setResults(res.data.results);
// //   };

// //   return (
// //     <div className="p-6">
// //       <button onClick={handleRank} className="bg-blue-500 px-4 py-2 text-white">
// //         Rank
// //       </button>

// //       {results && results.map((r) => (
// //         <div
// //           key={r.resume_id}
// //           onClick={() => navigate("/candidate", { state: r })}
// //           className="p-3 border mt-2 cursor-pointer"
// //         >
// //           Resume {r.resume_id} → Score {r.score}
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }

// // export default RankResumes;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function RankResumes({
  jobDesc,
  requiredSkills,
  setSelectedCandidate,
}) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ---------------- RANK HANDLER ----------------
  const handleRank = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("User not authenticated");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post(
        "/rank",
        {
          job_description: jobDesc || "",
          required_skills: requiredSkills || [],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      console.log("Rank API Response:", res.data);

      // ✅ Store ranked results
      setResults(res.data.ranked || []);

    } catch (err) {
      console.error("Ranking failed:", err);

      alert(
        err.response?.data?.error ||
        err.message ||
        "Ranking failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // ---------------- SELECT CANDIDATE ----------------
  const handleSelectCandidate = (candidate) => {
    setSelectedCandidate(candidate);

    // ✅ Navigate to analytics page
    navigate("/analytics");
  };

  return (
    <div className="p-6">
      {/* ---------------- TITLE ---------------- */}
      <h2 className="text-2xl font-bold mb-6 text-white">
        Rank Resumes
      </h2>

      {/* ---------------- BUTTON ---------------- */}
      <button
        onClick={handleRank}
        disabled={loading}
        className={`px-6 py-3 rounded-xl text-white font-semibold transition ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "Ranking..." : "Rank"}
      </button>

      {/* ---------------- NO RESULTS ---------------- */}
      {!loading && results.length === 0 && (
        <p className="mt-6 text-gray-300">
          No ranked resumes yet.
        </p>
      )}

      {/* ---------------- RESULTS ---------------- */}
      {results.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-white">
            Ranked Results
          </h3>

          <ul className="space-y-4">
            {results.map((r) => (
              <li
                key={r.resume_id}
                onClick={() => handleSelectCandidate(r)}
                className="cursor-pointer p-5 border rounded-2xl bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition shadow"
              >
                {/* NAME */}
                <p className="font-bold text-xl text-black dark:text-white">
                  {r.metadata?.name || `Resume ${r.resume_id}`}
                </p>

                {/* SCORE */}
                <p className="mt-2 text-black dark:text-gray-200">
                  <strong>Score:</strong>{" "}
                  {typeof r.score === "number"
                    ? r.score.toFixed(2)
                    : "N/A"}
                </p>

                {/* SKILLS */}
                <p className="mt-1 text-black dark:text-gray-200">
                  <strong>Skills:</strong>{" "}
                  {r.matched_skills?.length > 0
                    ? r.matched_skills.join(", ")
                    : "None"}
                </p>

                {/* FILE */}
                <p className="mt-1 text-black dark:text-gray-200">
                  <strong>File:</strong>{" "}
                  {r.filename || "N/A"}
                </p>

                {/* EMAIL */}
                <p className="mt-1 text-black dark:text-gray-200">
                  <strong>Email:</strong>{" "}
                  {r.metadata?.email || "N/A"}
                </p>

                {/* PHONE */}
                <p className="mt-1 text-black dark:text-gray-200">
                  <strong>Phone:</strong>{" "}
                  {r.metadata?.phone || "N/A"}
                </p>

                {/* GITHUB */}
                <p className="mt-1 text-black dark:text-gray-200 break-all">
                  <strong>GitHub:</strong>{" "}
                  {r.metadata?.github || "N/A"}
                </p>

                {/* LINKEDIN */}
                <p className="mt-1 text-black dark:text-gray-200 break-all">
                  <strong>LinkedIn:</strong>{" "}
                  {r.metadata?.linkedin || "N/A"}
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