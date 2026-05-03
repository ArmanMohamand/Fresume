// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api";

// function RankResumes({
//   jobDesc,
//   requiredSkills,
//   setSelectedCandidate,
// }) {
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   // ---------------- RANK HANDLER ----------------
//   const handleRank = async () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       alert("User not authenticated");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await API.post(
//         "/rank",
//         {
//           job_description: jobDesc || "",
//           required_skills: requiredSkills || [],
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         },
//       );

//       console.log("Rank API Response:", res.data);

//       // ✅ Store ranked results
//       setResults(res.data.ranked || []);

//     } catch (err) {
//       console.error("Ranking failed:", err);

//       alert(
//         err.response?.data?.error ||
//         err.message ||
//         "Ranking failed"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------- SELECT CANDIDATE ----------------
//   const handleSelectCandidate = (candidate) => {
//     setSelectedCandidate(candidate);

//     // ✅ Navigate to analytics page
//     navigate("/analytics");
//   };

//   return (
//     <div className="p-6">
//       {/* ---------------- TITLE ---------------- */}
//       <h2 className="text-2xl font-bold mb-6 text-white">
//         Rank Resumes
//       </h2>

//       {/* ---------------- BUTTON ---------------- */}
//       <button
//         onClick={handleRank}
//         disabled={loading}
//         className={`px-6 py-3 rounded-xl text-white font-semibold transition ${
//           loading
//             ? "bg-gray-500 cursor-not-allowed"
//             : "bg-blue-500 hover:bg-blue-600"
//         }`}
//       >
//         {loading ? "Ranking..." : "Rank"}
//       </button>

//       {/* ---------------- NO RESULTS ---------------- */}
//       {!loading && results.length === 0 && (
//         <p className="mt-6 text-gray-300">
//           No ranked resumes yet.
//         </p>
//       )}

//       {/* ---------------- RESULTS ---------------- */}
//       {results.length > 0 && (
//         <div className="mt-8">
//           <h3 className="text-xl font-semibold mb-4 text-white">
//             Ranked Results
//           </h3>

//           <ul className="space-y-4">
//             {results.map((r) => (
//               <li
//                 key={r.resume_id}
//                 onClick={() => handleSelectCandidate(r)}
//                 className="cursor-pointer p-5 border rounded-2xl bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition shadow"
//               >
//                 {/* NAME */}
//                 <p className="font-bold text-xl text-black dark:text-white">
//                   {r.metadata?.name || `Resume ${r.resume_id}`}
//                 </p>

//                 {/* SCORE */}
//                 <p className="mt-2 text-black dark:text-gray-200">
//                   <strong>Score:</strong>{" "}
//                   {typeof r.score === "number"
//                     ? r.score.toFixed(2)
//                     : "N/A"}
//                 </p>

//                 {/* SKILLS */}
//                 <p className="mt-1 text-black dark:text-gray-200">
//                   <strong>Skills:</strong>{" "}
//                   {r.matched_skills?.length > 0
//                     ? r.matched_skills.join(", ")
//                     : "None"}
//                 </p>

//                 {/* FILE */}
//                 <p className="mt-1 text-black dark:text-gray-200">
//                   <strong>File:</strong>{" "}
//                   {r.filename || "N/A"}
//                 </p>

//                 {/* EMAIL */}
//                 <p className="mt-1 text-black dark:text-gray-200">
//                   <strong>Email:</strong>{" "}
//                   {r.metadata?.email || "N/A"}
//                 </p>

//                 {/* PHONE */}
//                 <p className="mt-1 text-black dark:text-gray-200">
//                   <strong>Phone:</strong>{" "}
//                   {r.metadata?.phone || "N/A"}
//                 </p>

//                 {/* GITHUB */}
//                 <p className="mt-1 text-black dark:text-gray-200 break-all">
//                   <strong>GitHub:</strong>{" "}
//                   {r.metadata?.github || "N/A"}
//                 </p>

//                 {/* LINKEDIN */}
//                 <p className="mt-1 text-black dark:text-gray-200 break-all">
//                   <strong>LinkedIn:</strong>{" "}
//                   {r.metadata?.linkedin || "N/A"}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default RankResumes;


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

      // Store ranked results
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

    // Navigate to analytics page
    navigate("/analytics");
  };

  return (
    <div className="p-6">

      {/* ---------------- TITLE ---------------- */}
      <h2 className="text-3xl font-bold mb-3 text-white">
        Rank Resumes
      </h2>

      {/* ---------------- INSTRUCTIONS ---------------- */}
      <div className="mb-6 p-4 rounded-xl bg-blue-500/20 border border-blue-400">
        <p className="text-white font-medium">
          1. Click the{" "}
          <span className="font-bold text-blue-300">
            Rank
          </span>{" "}
          button to generate ranked resumes.
        </p>

        <p className="text-white font-medium mt-2">
          2. After ranking appears, click any{" "}
          <span className="font-bold text-green-300">
            candidate card
          </span>{" "}
          to view analytics and candidate details.
        </p>
      </div>

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

          <h3 className="text-2xl font-semibold mb-2 text-white">
            Ranked Results
          </h3>

          <p className="text-sm text-gray-300 mb-5">
            Click any candidate below to open analytics and detailed information.
          </p>

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

                {/* CLICK HINT */}
                <div className="mt-4 inline-block px-3 py-1 rounded-lg bg-green-500 text-white text-sm font-semibold">
                  Click to View Analytics
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RankResumes;