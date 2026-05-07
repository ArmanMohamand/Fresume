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

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api";

// function RankResumes({ jobDesc, requiredSkills, setSelectedCandidate }) {
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

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
//       alert(err.response?.data?.error || "Ranking failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSelect = (candidate) => {
//     setSelectedCandidate(candidate);
//     navigate("/analytics", { state: { candidate } });
//   };

//   return (
//     <div className="p-6 text-white">
//       {/* INFO BOX */}
//       <div className="mb-6 p-4 rounded-xl bg-blue-500/20 border border-blue-400">
//         <h2 className="text-xl font-bold mb-2">How to Use This Page</h2>

//         <p>
//           1️⃣ Click <b>Rank Button</b> to generate ranked candidates
//         </p>
//         <p className="mt-1">2️⃣ Click a candidate to open Analytics</p>
//         <p className="mt-1">3️⃣ View charts, score & skills</p>
//       </div>

//       {/* BUTTON */}
//       <button
//         onClick={handleRank}
//         className="bg-blue-500 px-5 py-2 rounded font-semibold hover:bg-blue-600"
//       >
//         {loading ? "Ranking..." : "Rank Resumes"}
//       </button>

//       {/* RESULTS */}
//       <div className="mt-6 space-y-4">
//         {results.map((r, i) => (
//           <div
//             key={r.resume_id}
//             onClick={() => handleSelect(r)}
//             className="p-5 border rounded-xl bg-gray-800 cursor-pointer hover:scale-[1.02] transition"
//           >
//             {/* BADGES */}
//             {i === 0 && <p>🏆 Best Candidate</p>}
//             {i === 1 && <p>🥈 2nd Best</p>}
//             {i === 2 && <p>🥉 3rd Best</p>}

//             <h3 className="font-bold text-lg mt-1">Resume {r.resume_id}</h3>

//             {/* ✅ FIXED SCORE */}
//             <p>Score: {r.score ?? 0}</p>

//             {/* SKILLS */}
//             <p className="mt-2">Skills: {r.skills?.join(", ") || "None"}</p>

//             {/* EMAIL */}
//             <p>Email: {r.email || "N/A"}</p>

//             <p className="text-green-400 text-sm mt-2">
//               Click to view Analytics →
//             </p>
//             <button
//               onClick={async (e) => {
//                 e.stopPropagation();

//                 const token = localStorage.getItem("token");

//                 try {
//                   await API.delete(`/delete_resume/${r.resume_id}`, {
//                     headers: {
//                       Authorization: `Bearer ${token}`,
//                     },
//                   });

//                   setResults(
//                     results.filter((x) => x.resume_id !== r.resume_id),
//                   );
//                 } catch (err) {
//                   alert("Delete failed");
//                 }
//               }}
//               className="mt-3 bg-red-500 px-3 py-1 rounded"
//             >
//               Delete Resume
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default RankResumes;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import toast from "react-hot-toast";

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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setResults(res.data.ranked || []);

      toast.success("Ranking completed");
    } catch (err) {
      toast.error(err.response?.data?.error || "Ranking failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (candidate) => {
    setSelectedCandidate(candidate);

    navigate("/analytics", {
      state: { candidate },
    });
  };

  const handleDelete = async (e, resumeId) => {
    e.stopPropagation();

    const token = localStorage.getItem("token");

    try {
      await API.delete(`/delete_resume/${resumeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResults(results.filter((x) => x.resume_id !== resumeId));

      toast.success("Resume deleted");
    } catch (err) {
      toast.error(err.response?.data?.error || "Delete failed");
    }
  };

  return (
    <div className="p-6 text-white">
      {/* INFO */}
      <div className="mb-6 p-4 rounded-xl bg-blue-500/20 border border-blue-400">
        <h2 className="text-xl font-bold mb-2">How to Use This Page</h2>

        <p>
          1️⃣ Click <b>Rank Button</b> to rank resumes
        </p>

        <p className="mt-1">2️⃣ Click candidate card to open analytics</p>

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
            {i === 0 && <p>🏆 Best Candidate</p>}
            {i === 1 && <p>🥈 2nd Best</p>}
            {i === 2 && <p>🥉 3rd Best</p>}

            <h3 className="font-bold text-lg mt-1">
              {r.metadata?.name || "Unknown User"}
            </h3>

            <p>Score: {r.score ?? 0}</p>

            <p className="mt-2">Skills: {r.skills?.join(", ") || "None"}</p>

            <p>Email: {r.email || "N/A"}</p>

            <p className="text-green-400 text-sm mt-2">
              Click to view Analytics →
            </p>

            <button
              onClick={(e) => handleDelete(e, r.resume_id)}
              className="mt-3 bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Delete Resume
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RankResumes;
