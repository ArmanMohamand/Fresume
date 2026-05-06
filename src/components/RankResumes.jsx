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

//       // Store ranked results
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

//     // Navigate to analytics page
//     navigate("/analytics");
//   };

//   return (
//     <div className="p-6">

//       {/* ---------------- TITLE ---------------- */}
//       <h2 className="text-3xl font-bold mb-3 text-white">
//         Rank Resumes
//       </h2>

//       {/* ---------------- INSTRUCTIONS ---------------- */}
//       <div className="mb-6 p-4 rounded-xl bg-blue-500/20 border border-blue-400">
//         <p className="text-white font-medium">
//           1. Click the
//           <span className="font-bold text-blue-300">
//             Rank
//           </span>
//           button to generate ranked resumes.
//         </p>

//         <p className="text-white font-medium mt-2">
//           2. After ranking appears, click any
//           <span className="font-bold text-green-300">
//             candidate card
//           </span>
//           to view analytics and candidate details.
//         </p>
//       </div>

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

//           <h3 className="text-2xl font-semibold mb-2 text-white">
//             Ranked Results
//           </h3>

//           <p className="text-sm text-gray-300 mb-5">
//             Click any candidate below to open analytics and detailed information.
//           </p>

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
//                   <strong>Score:</strong>
//                   {typeof r.score === "number"
//                     ? r.score.toFixed(2)
//                     : "N/A"}
//                 </p>

//                 {/* SKILLS */}
//                 <p className="mt-1 text-black dark:text-gray-200">
//                   <strong>Skills:</strong>
//                   {r.matched_skills?.length > 0
//                     ? r.matched_skills.join(", ")
//                     : "None"}
//                 </p>

//                 {/* FILE */}
//                 <p className="mt-1 text-black dark:text-gray-200">
//                   <strong>File:</strong>
//                   {r.filename || "N/A"}
//                 </p>

//                 {/* EMAIL */}
//                 <p className="mt-1 text-black dark:text-gray-200">
//                   <strong>Email:</strong>
//                   {r.metadata?.email || "N/A"}
//                 </p>

//                 {/* PHONE */}
//                 <p className="mt-1 text-black dark:text-gray-200">
//                   <strong>Phone:</strong>
//                   {r.metadata?.phone || "N/A"}
//                 </p>

//                 {/* GITHUB */}
//                 <p className="mt-1 text-black dark:text-gray-200 break-all">
//                   <strong>GitHub:</strong>
//                   {r.metadata?.github || "N/A"}
//                 </p>

//                 {/* LINKEDIN */}
//                 <p className="mt-1 text-black dark:text-gray-200 break-all">
//                   <strong>LinkedIn:</strong>
//                   {r.metadata?.linkedin || "N/A"}
//                 </p>

//                 {/* CLICK HINT */}
//                 <div className="mt-4 inline-block px-3 py-1 rounded-lg bg-green-500 text-white text-sm font-semibold">
//                   Click to View Analytics
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default RankResumes;

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
//           },
//         }
//       );

//       const ranked = res.data.ranked || [];
//       setResults(ranked);

//     } catch (err) {
//       alert(err.response?.data?.error || "Ranking failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSelectCandidate = (candidate) => {
//     setSelectedCandidate(candidate);
//     navigate("/analytics");
//   };

//   // 🧠 Identify top candidates
//   const sorted = [...results].sort((a, b) => b.score - a.score);

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-3 text-white">
//         Rank Resumes
//       </h2>

//       <button
//         onClick={handleRank}
//         disabled={loading}
//         className={`px-6 py-3 rounded-xl text-white ${
//           loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
//         }`}
//       >
//         {loading ? "Ranking..." : "Rank"}
//       </button>

//       {results.length > 0 && (
//         <ul className="mt-8 space-y-4">
//           {results.map((r, index) => {
//             const isTop1 = r === sorted[0];
//             const isTop2 = r === sorted[1];
//             const isTop3 = r === sorted[2];

//             return (
//               <li
//                 key={r.resume_id}
//                 onClick={() => handleSelectCandidate(r)}
//                 className={`cursor-pointer p-5 rounded-2xl shadow transition ${
//                   isTop1
//                     ? "border-2 border-green-500 bg-green-50"
//                     : "bg-white dark:bg-gray-800"
//                 }`}
//               >
//                 {/* 🏆 BADGES */}
//                 <div className="mb-2">
//                   {isTop1 && <span className="mr-2">🏆 Best Candidate</span>}
//                   {isTop2 && <span className="mr-2">🥈 2nd</span>}
//                   {isTop3 && <span className="mr-2">🥉 3rd</span>}
//                 </div>

//                 <p className="font-bold text-xl">
//                   {r.metadata?.name || `Resume ${r.resume_id}`}
//                 </p>

//                 <p>Score: {r.score?.toFixed(3)}</p>

//                 <p>
//                   Skills:
//                   {r.matched_skills?.join(", ") || "None"}
//                 </p>

//                 <p>Email: {r.metadata?.email || "N/A"}</p>
//                 <p>Phone: {r.metadata?.phone || "N/A"}</p>

//                 <p>GitHub: {r.metadata?.github || "N/A"}</p>
//                 <p>LinkedIn: {r.metadata?.linkedin || "N/A"}</p>

//                 <div className="mt-3 text-sm bg-green-500 text-white px-3 py-1 rounded">
//                   View Analytics →
//                 </div>
//               </li>
//             );
//           })}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default RankResumes;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api";

// function RankResumes({ jobDesc, requiredSkills, setSelectedCandidate }) {
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

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
//           },
//         },
//       );

//       setResults(res.data.ranked || []);
//     } catch (err) {
//       alert(err.response?.data?.error || "Ranking failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSelectCandidate = (candidate) => {
//     setSelectedCandidate(candidate);
//     navigate("/analytics");
//   };

//   const getSkillMatchPercentage = (matched, required) => {
//     if (!required || required.length === 0) return 0;

//     const matchCount = matched?.length || 0;

//     return ((matchCount / required.length) * 100).toFixed(0);
//   };

//   const getBadge = (index) => {
//     if (index === 0)
//       return (
//         <span className="ml-2 px-2 py-1 text-xs bg-yellow-400 text-black rounded">
//           🏆 Best Candidate
//         </span>
//       );

//     if (index === 1)
//       return (
//         <span className="ml-2 px-2 py-1 text-xs bg-gray-300 text-black rounded">
//           🥈 2nd
//         </span>
//       );

//     if (index === 2)
//       return (
//         <span className="ml-2 px-2 py-1 text-xs bg-orange-300 text-black rounded">
//           🥉 3rd
//         </span>
//       );

//     return null;
//   };

//   const getCardStyle = (index) => {
//     if (index === 0)
//       return "border-2 border-yellow-400 bg-yellow-50 dark:bg-yellow-900";

//     if (index === 1)
//       return "border-2 border-gray-400 bg-gray-100 dark:bg-gray-800";

//     if (index === 2)
//       return "border-2 border-orange-400 bg-orange-50 dark:bg-orange-900";

//     return "bg-white dark:bg-gray-800";
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-4 text-white">Rank Resumes</h2>
//       <button
//         onClick={handleRank}
//         disabled={loading}
//         className={`px-6 py-3 rounded-xl text-white font-semibold ${
//           loading
//             ? "bg-gray-500 cursor-not-allowed"
//             : "bg-blue-500 hover:bg-blue-600"
//         }`}
//       >
//         {loading ? "Ranking..." : "Rank"}
//       </button>
//       {!loading && results.length === 0 && (
//         <p className="mt-6 text-gray-300">No ranked resumes yet.</p>
//       )}
//       {results.length > 0 && (
//         <div className="mt-8 space-y-4">
//           <h3 className="text-2xl font-semibold text-white mb-2">
//             Ranked Results
//           </h3>

//           {results.map((r, index) => {
//             const percent = getSkillMatchPercentage(
//               r.matched_skills,
//               requiredSkills,
//             );

//             return (
//               <div
//                 key={r.resume_id}
//                 onClick={() => handleSelectCandidate(r)}
//                 className={`cursor-pointer p-5 rounded-2xl shadow transition hover:scale-[1.02] ${getCardStyle(
//                   index,
//                 )}`}
//               >
//                 <div className="flex items-center">
//                   <p className="font-bold text-xl text-black dark:text-white">
//                     {r.metadata?.name || `Resume ${r.resume_id}`}
//                   </p>
//                   {getBadge(index)}
//                 </div>

//                 <p className="mt-2 text-black dark:text-gray-200">
//                   <strong>Score:</strong>{" "}
//                   {typeof r.score === "number" ? r.score.toFixed(3) : "N/A"}
//                 </p>

//                 <p className="mt-1 text-black dark:text-gray-200">
//                   <strong>Skill Match:</strong> {percent}%
//                 </p>

//                 <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
//                   <div
//                     className="bg-green-500 h-2 rounded-full"
//                     style={{ width: `${percent}%` }}
//                   />
//                 </div>

//                 <p className="mt-2 text-black dark:text-gray-200">
//                   <strong>Skills:</strong>{" "}
//                   {r.matched_skills?.length > 0
//                     ? r.matched_skills.join(", ")
//                     : "None"}
//                 </p>

//                 <p className="mt-1 text-black dark:text-gray-200">
//                   <strong>Email:</strong> {r.metadata?.email || "N/A"}
//                 </p>

//                 <div className="mt-4 inline-block px-3 py-1 rounded-lg bg-green-500 text-white text-sm font-semibold">
//                   View Details
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

// export default RankResumes;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api";

// function RankResumes({ jobDesc, requiredSkills, setSelectedCandidate }) {
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // ---------------- NORMALIZE ----------------
//   const normalize = (data) => {
//     if (!data) return [];
//     return data
//       .toString()
//       .toLowerCase()
//       .split(",")
//       .map((s) => s.trim())
//       .filter(Boolean);
//   };

//   // ---------------- MATCH % ----------------
//   const getSkillMatchPercentage = (candidateSkills, requiredSkills) => {
//     const cSkills = normalize(candidateSkills);
//     const rSkills = normalize(requiredSkills);

//     if (rSkills.length === 0) return 0;

//     const matched = rSkills.filter((skill) => cSkills.includes(skill)).length;

//     return Math.round((matched / rSkills.length) * 100);
//   };

//   // ---------------- API CALL ----------------
//   const handleRank = async () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       alert("Login required");
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
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );

//       setResults(res.data.ranked || []);
//     } catch (err) {
//       alert(err.response?.data?.error || "Ranking failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------- SELECT ----------------
//   const handleSelect = (candidate) => {
//     setSelectedCandidate(candidate);
//     navigate("/analytics");
//   };

//   return (
//     <div className="p-6 text-white">
//       <button onClick={handleRank} className="bg-blue-500 px-4 py-2 rounded">
//         {loading ? "Ranking..." : "Rank"}
//       </button>

//       {/* RESULTS */}
//       <div className="mt-6 space-y-4">
//         {results.map((r, i) => {
//           const skills = r.skills || r.matched_skills || [];
//           const percent = getSkillMatchPercentage(skills, requiredSkills);

//           return (
//             <div
//               key={r.resume_id}
//               onClick={() => handleSelect(r)}
//               className="p-4 border rounded cursor-pointer bg-gray-800"
//             >
//               <h3 className="font-bold">Resume {r.resume_id}</h3>

//               <p>Score: {r.score?.toFixed(3) || "0.000"}</p>

//               {/* BAR */}
//               <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
//                 <div
//                   className="bg-green-500 h-2 rounded-full"
//                   style={{ width: `${percent}%` }}
//                 />
//               </div>

//               <p className="text-sm mt-1">Skill Match: {percent}%</p>

//               <p className="mt-2">Skills: {skills.join(", ") || "None"}</p>

//               <p>Email: {r.email || "N/A"}</p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default RankResumes;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api";

// function RankResumes({ jobDesc, requiredSkills, setSelectedCandidate }) {
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const normalize = (arr) => {
//     if (!arr) return [];
//     if (typeof arr === "string") {
//       return arr.split(",").map((s) => s.trim().toLowerCase());
//     }
//     return arr.map((s) => s.toLowerCase());
//   };

//   const getMatchPercent = (candidateSkills, required) => {
//     const c = normalize(candidateSkills);
//     const r = normalize(required);

//     if (r.length === 0) return 0;

//     const match = r.filter((s) => c.includes(s)).length;

//     return Math.round((match / r.length) * 100);
//   };

//   const handleRank = async () => {
//     const token = localStorage.getItem("token");

//     const res = await API.post(
//       "/rank",
//       {
//         job_description: jobDesc,
//         required_skills: requiredSkills,
//       },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     setResults(res.data.ranked || []);
//   };

//   const handleSelect = (r) => {
//     setSelectedCandidate(r);
//     navigate("/analytics");
//   };

//   return (
//     <div className="p-6 text-white">
//       <button
//         onClick={handleRank}
//         className="bg-blue-500 px-4 py-2 rounded"
//       >
//         {loading ? "Ranking..." : "Rank"}
//       </button>

//       <div className="mt-6 space-y-4">
//         {results.map((r, i) => {
//           const percent = getMatchPercent(r.skills, requiredSkills);

//           return (
//             <div
//               key={r.resume_id}
//               onClick={() => handleSelect(r)}
//               className="p-4 border rounded bg-gray-800 cursor-pointer"
//             >
//               {/* 🏆 TOP BADGES */}
//               {i === 0 && <p>🏆 Best Candidate</p>}
//               {i === 1 && <p>🥈 2nd</p>}
//               {i === 2 && <p>🥉 3rd</p>}

//               <h3 className="font-bold">
//                 Resume {r.resume_id}
//               </h3>

//               {/* SCORE */}
//               <p>Score: {r.score}</p>

//               {/* SKILL BAR */}
//               <div className="w-full bg-gray-700 h-2 rounded mt-2">
//                 <div
//                   className="bg-green-500 h-2 rounded"
//                   style={{ width: `${percent}%` }}
//                 />
//               </div>

//               <p>Skill Match: {percent}%</p>

//               <p>Skills: {r.skills?.join(", ") || "None"}</p>

//               <p>Email: {r.email || "N/A"}</p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default RankResumes;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api";

// function RankResumes({ jobDesc, requiredSkills, setSelectedCandidate }) {
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // ---------------- NORMALIZE ----------------
//   const normalize = (arr) => {
//     if (!arr) return [];
//     if (typeof arr === "string") {
//       return arr.split(",").map((s) => s.trim().toLowerCase());
//     }
//     return arr.map((s) => String(s).toLowerCase());
//   };

//   // ---------------- RANK API ----------------
//   const handleRank = async () => {
//     const token = localStorage.getItem("token");

//     try {
//       setLoading(true);

//       const res = await API.post(
//         "/rank",
//         {
//           job_description: jobDesc,
//           required_skills: requiredSkills,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );

//       setResults(res.data.ranked || []);
//     } catch (err) {
//       alert(err.response?.data?.error || "Ranking failed - please login again");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------- SELECT CANDIDATE ----------------
//   const handleSelect = (candidate) => {
//     setSelectedCandidate(candidate);
//     navigate("/analytics", { state: { candidate } });
//   };

//   return (
//     <div className="p-6 text-white">
//       {/* ================= TOP INFO BOX ================= */}
//       <div className="mb-6 p-4 rounded-xl bg-blue-500/20 border border-blue-400">
//         <h2 className="text-xl font-bold mb-2"> How to Use This Page</h2>

//         <p>
//           1️⃣ Click <b>Rank Button</b> to generate ranked candidates
//         </p>

//         <p className="mt-1">
//           2️⃣ After ranking, click any <b>candidate card</b> to open Analytics
//         </p>

//         <p className="mt-1">
//           3️⃣ Analytics page shows <b>charts, score breakdown & skills</b>
//         </p>
//       </div>

//       {/* ================= RANK BUTTON ================= */}
//       <button
//         onClick={handleRank}
//         className="bg-blue-500 px-5 py-2 rounded font-semibold hover:bg-blue-600"
//       >
//         {loading ? "Ranking..." : "Rank Resumes"}
//       </button>

//       {/* ================= RESULTS ================= */}
//       <div className="mt-6 space-y-4">
//         {results.map((r, i) => {
//           return (
//             <div
//               key={r.resume_id}
//               onClick={() => handleSelect(r)}
//               className="p-5 border rounded-xl bg-gray-800 cursor-pointer hover:scale-[1.02] transition"
//             >
//               {i === 0 && <p>🏆 Best Candidate</p>}
//               {i === 1 && <p>🥈 2nd Best</p>}
//               {i === 2 && <p>🥉 3rd Best</p>}

//               <h3 className="font-bold text-lg mt-1">Resume {r.resume_id}</h3>

//               <p className="mt-1">
//                 Score: {r.score ? r.score.toFixed(3) : "0.000"}
//               </p>

//               <p className="mt-2">Skills: {r.skills?.join(", ") || "None"}</p>

//               <p>Email: {r.email || "N/A"}</p>
//               <p className="text-green-400 text-sm mt-2">
//                 Click to view Analytics →
//               </p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default RankResumes;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function RankResumes({ jobDesc, requiredSkills, setSelectedCandidate }) {
  const [results, setResults] = useState([]);
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
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setResults(res.data.ranked || []);
    } catch (err) {
      alert(err.response?.data?.error || "Ranking failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (candidate) => {
    setSelectedCandidate(candidate);
    navigate("/analytics", { state: { candidate } });
  };

  return (
    <div className="p-6 text-white">
      {/* INFO BOX */}
      <div className="mb-6 p-4 rounded-xl bg-blue-500/20 border border-blue-400">
        <h2 className="text-xl font-bold mb-2">How to Use This Page</h2>

        <p>
          1️⃣ Click <b>Rank Button</b> to generate ranked candidates
        </p>
        <p className="mt-1">2️⃣ Click a candidate to open Analytics</p>
        <p className="mt-1">3️⃣ View charts, score & skills</p>
      </div>

      {/* BUTTON */}
      <button
        onClick={handleRank}
        className="bg-blue-500 px-5 py-2 rounded font-semibold hover:bg-blue-600"
      >
        {loading ? "Ranking..." : "Rank Resumes"}
      </button>

      {/* RESULTS */}
      <div className="mt-6 space-y-4">
        {results.map((r, i) => (
          <div
            key={r.resume_id}
            onClick={() => handleSelect(r)}
            className="p-5 border rounded-xl bg-gray-800 cursor-pointer hover:scale-[1.02] transition"
          >
            {/* BADGES */}
            {i === 0 && <p>🏆 Best Candidate</p>}
            {i === 1 && <p>🥈 2nd Best</p>}
            {i === 2 && <p>🥉 3rd Best</p>}

            <h3 className="font-bold text-lg mt-1">Resume {r.resume_id}</h3>

            {/* ✅ FIXED SCORE */}
            <p>Score: {r.score ?? 0}</p>

            {/* SKILLS */}
            <p className="mt-2">Skills: {r.skills?.join(", ") || "None"}</p>

            {/* EMAIL */}
            <p>Email: {r.email || "N/A"}</p>

            <p className="text-green-400 text-sm mt-2">
              Click to view Analytics →
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RankResumes;
