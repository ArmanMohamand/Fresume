// import React from "react";
// import { Pie, Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
// } from "chart.js";

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
// );

// const generateColors = (count) => {
//   const colors = [];
//   for (let i = 0; i < count; i++) {
//     colors.push(`hsl(${(i * 360) / count}, 70%, 55%)`);
//   }
//   return colors;
// };

// function Analytics({ candidate }) {
//   if (!candidate || !candidate.analytics) {
//     return <p className="p-6">Select a resume to view analytics</p>;
//   }

//   const analytics = candidate.analytics;

//   const skillData = {
//     labels: Object.keys(analytics.skill_distribution || {}),
//     datasets: [
//       {
//         data: Object.values(analytics.skill_distribution || {}),
//         backgroundColor: generateColors(
//           Object.keys(analytics.skill_distribution || {}).length,
//         ),
//       },
//     ],
//   };

//   const scoreData = {
//     labels: [`Resume ${candidate.resume_id}`],
//     datasets: [
//       {
//         label: "Score",
//         data: analytics.scores || [],
//         backgroundColor: "#36A2EB",
//       },
//     ],
//   };

//   return (
//     <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
//       <h2 className="text-xl font-bold mb-4">
//         Analytics for
//         {candidate.metadata?.name || `Resume ${candidate.resume_id}`}
//       </h2>

//       <p className="mb-4">
//         <strong>Average Score:</strong>
//         {analytics.average_score?.toFixed(2) || "N/A"}
//       </p>

//       {/* Pie Chart */}
//       <div className="flex justify-center mb-6">
//         <div className="w-[400px] h-[400px]">
//           <Pie data={skillData} />
//         </div>
//       </div>

//       {/* Bar Chart */}
//       <div>
//         <Bar data={scoreData} />
//       </div>
//     </div>
//   );
// }

// export default Analytics;

// import React from "react";
// import { Pie, Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
// } from "chart.js";

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement
// );

// function Analytics({ candidate }) {
//   if (!candidate) {
//     return <p className="p-6">Select candidate</p>;
//   }

//   // 🧠 Build skill chart manually
//   const skills = candidate.matched_skills || [];

//   const skillData = {
//     labels: skills,
//     datasets: [
//       {
//         data: skills.map(() => 1),
//         backgroundColor: skills.map(
//           (_, i) => `hsl(${(i * 360) / skills.length},70%,55%)`
//         ),
//       },
//     ],
//   };

//   const scoreData = {
//     labels: ["Score"],
//     datasets: [
//       {
//         label: "Score",
//         data: [candidate.score],
//       },
//     ],
//   };

//   return (
//     <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow">
//       <h2 className="text-xl font-bold mb-4">
//         Analytics - {candidate.metadata?.name || "Candidate"}
//       </h2>

//       <p className="mb-4">
//         Score: {candidate.score?.toFixed(3)}
//       </p>

//       {/* Pie */}
//       {skills.length > 0 && (
//         <div className="w-[300px] mx-auto">
//           <Pie data={skillData} />
//         </div>
//       )}

//       {/* Bar */}
//       <div className="mt-6">
//         <Bar data={scoreData} />
//       </div>
//     </div>
//   );
// }

// export default Analytics;

// import React from "react";
// import { Pie, Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
// } from "chart.js";

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
// );

// function Analytics({ candidate }) {
//   if (!candidate) {
//     return <p className="p-6 text-white">Select candidate</p>;
//   }

//   const skills = candidate.skills || [];

//   const skillData = {
//     labels: skills.length ? skills : ["No Skills"],
//     datasets: [
//       {
//         data: skills.length ? skills.map(() => 1) : [1],
//         backgroundColor: skills.length
//           ? skills.map((_, i) => `hsl(${(i * 360) / skills.length},70%,55%)`)
//           : ["gray"],
//       },
//     ],
//   };

//   const scoreData = {
//     labels: ["Score"],
//     datasets: [
//       {
//         label: "Score",
//         data: [candidate.score || 0],
//       },
//     ],
//   };

//   return (
//     <div className="p-6 text-white">
//       <h2 className="text-xl font-bold mb-4">Resume {candidate.resume_id}</h2>

//       <p>Score: {candidate.score?.toFixed(3)}</p>

//       <div className="w-[300px] mx-auto mt-4">
//         <Pie data={skillData} />
//       </div>

//       <div className="mt-6">
//         <Bar data={scoreData} />
//       </div>
//     </div>
//   );
// }

// export default Analytics;

// import React from "react";
// import { Pie, Bar } from "react-chartjs-2";

// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
// } from "chart.js";

// // ✅ MUST register (this is your bug)
// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement
// );

// function Analytics({ candidate }) {
//   if (!candidate) return <p className="p-6 text-white">Select candidate</p>;

//   const skills = candidate.skills || [];

//   // 🥧 PIE CHART (skills)
//   const skillData = {
//     labels: skills.length ? skills : ["No Skills"],
//     datasets: [
//       {
//         data: skills.length ? skills.map(() => 1) : [1],
//         backgroundColor: skills.map(
//           (_, i) => `hsl(${(i * 360) / (skills.length || 1)},70%,55%)`
//         ),
//       },
//     ],
//   };

//   // 📊 BAR CHART (scores)
//   const scoreData = {
//     labels: ["Final Score", "TF-IDF Score", "Skill Score"],
//     datasets: [
//       {
//         label: "Score Breakdown",
//         data: [
//           candidate.score || 0,
//           candidate.tfidf_score || 0,
//           candidate.skill_score || 0,
//         ],
//         backgroundColor: ["#4ade80", "#60a5fa", "#facc15"],
//       },
//     ],
//   };

//   return (
//     <div className="p-6 text-white">
//       <h2 className="text-xl font-bold mb-4">Candidate Profile</h2>

//       <p>Name: {candidate.name || "N/A"}</p>
//       <p>Email: {candidate.email || "N/A"}</p>

//       <p className="mt-2">Score: {candidate.score ?? 0}</p>

//       {/* PIE */}
//       <div className="w-[300px] mt-4">
//         <Pie data={skillData} />
//       </div>

//       {/* BAR */}
//       <div className="w-[400px] mt-6">
//         <Bar data={scoreData} />
//       </div>
//     </div>
//   );
// }

// export default Analytics;

// import React from "react";
// import { Pie, Bar } from "react-chartjs-2";
// import { useLocation } from "react-router-dom";

// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
// } from "chart.js";

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement
// );

// function Analytics() {
//   const location = useLocation();
//   const candidate = location.state?.candidate;

//   if (!candidate) {
//     return <p className="p-6 text-white">Select candidate first</p>;
//   }

//   const skills = candidate.skills || [];

//   // ---------------- PIE DATA ----------------
//   const pieData = {
//     labels: skills.length ? skills : ["No Skills Found"],
//     datasets: [
//       {
//         data: skills.length ? skills.map(() => 1) : [1],
//         backgroundColor: skills.length
//           ? skills.map(
//               (_, i) =>
//                 `hsl(${(i * 360) / skills.length},70%,55%)`
//             )
//           : ["#9ca3af"],
//       },
//     ],
//   };

//   // ---------------- BAR DATA ----------------
//   const barData = {
//     labels: ["Score", "TF-IDF", "Skill Score"],
//     datasets: [
//       {
//         label: "Performance",
//         data: [
//           candidate.score || 0,
//           candidate.tfidf_score || 0,
//           candidate.skill_score || 0,
//         ],
//         backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"],
//       },
//     ],
//   };

//   return (
//     <div className="p-6 text-white">
//       <h2 className="text-2xl font-bold mb-4">
//         Candidate Profile
//       </h2>

//       {/* BASIC INFO */}
//       <div className="mb-4">
//         <p>Name: {candidate.name || "N/A"}</p>
//         <p>Email: {candidate.email || "N/A"}</p>
//         <p>Phone: {candidate.phone || "N/A"}</p>

//         <p className="mt-2 font-bold">
//           Score: {candidate.score?.toFixed(3) || "0.000"}
//         </p>
//       </div>

//       {/* PIE CHART */}
//       <div className="w-[320px] mx-auto">
//         <Pie data={pieData} />
//       </div>

//       {/* BAR CHART */}
//       <div className="w-[420px] mt-8 mx-auto">
//         <Bar data={barData} />
//       </div>
//     </div>
//   );
// }

// export default Analytics;

// import React from "react";
// import { Pie, Bar } from "react-chartjs-2";
// import { useLocation } from "react-router-dom";

// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
// } from "chart.js";

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
// );

// function Analytics() {
//   const location = useLocation();
//   const candidate = location.state?.candidate;

//   if (!candidate) {
//     return <p className="p-6 text-white">Select candidate first</p>;
//   }

//   const skills = candidate.skills || [];

//   // ---------------- PIE DATA ----------------
//   const pieData = {
//     labels: skills.length ? skills : ["No Skills Found"],
//     datasets: [
//       {
//         data: skills.length ? skills.map(() => 1) : [1],
//         backgroundColor: skills.length
//           ? skills.map((_, i) => `hsl(${(i * 360) / skills.length},70%,55%)`)
//           : ["#9ca3af"],
//       },
//     ],
//   };

//   // ---------------- BAR DATA ----------------
//   const barData = {
//     labels: ["Score", "TF-IDF", "Skill Score"],
//     datasets: [
//       {
//         label: "Performance",
//         data: [
//           candidate.score || 0,
//           candidate.tfidf_score || 0,
//           candidate.skill_score || 0,
//         ],
//         backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"],
//       },
//     ],
//   };

//   return (
//     <div className="p-6 text-white">
//       <h2 className="text-2xl font-bold mb-4">Candidate Profile</h2>

//       {/* BASIC INFO */}
//       <div className="mb-4">
//         <p>Name: {candidate.metadata?.name || "N/A"}</p>
//         <p>Email: {candidate.email || "N/A"}</p>
//         <p>Phone: {candidate.phone || "N/A"}</p>

//         <p className="mt-2 font-bold">
//           Score: {candidate.score?.toFixed(3) || "0.000"}
//         </p>

//         {/* ✅ SHOW ALL SKILLS */}
//         <p className="mt-2">
//           <strong>Skills:</strong>{" "}
//           {skills.length > 0 ? skills.join(", ") : "None"}
//         </p>
//       </div>

//       {/* PIE CHART */}
//       <div className="w-[320px] mx-auto">
//         <Pie data={pieData} />
//       </div>

//       {/* BAR CHART */}
//       <div className="w-[420px] mt-8 mx-auto">
//         <Bar data={barData} />
//       </div>
//     </div>
//   );
// }

// export default Analytics;

// import React from "react";
// import { Pie, Bar } from "react-chartjs-2";
// import { useLocation } from "react-router-dom";

// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
// } from "chart.js";

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
// );

// function Analytics() {
//   const location = useLocation();
//   const candidate = location.state?.candidate;

//   if (!candidate) {
//     return <p className="p-6 text-white">Select candidate first</p>;
//   }

//   const skills = candidate.skills || [];

//   const pieData = {
//     labels: skills.length ? skills : ["No Skills Found"],
//     datasets: [
//       {
//         data: skills.length ? skills.map(() => 1) : [1],
//         backgroundColor: skills.length
//           ? skills.map((_, i) => `hsl(${(i * 360) / skills.length},70%,55%)`)
//           : ["#9ca3af"],
//       },
//     ],
//   };

//   const barData = {
//     labels: ["Score"],
//     datasets: [
//       {
//         label: "Performance",
//         data: [candidate.score || 0],
//         backgroundColor: ["#3b82f6"],
//       },
//     ],
//   };

//   return (
//     <div className="p-6 text-white">
//       <h2 className="text-2xl font-bold mb-4">Contact Details </h2>

//       <div className="mb-4">
//         <p>Name: N/A</p>

//         <p>Email: {candidate.email || "N/A"}</p>
//         <p>Phone: {candidate.phone || "N/A"}</p>

//         <p className="mt-2 font-bold">
//           Score: {candidate.score?.toFixed(3) || "0.000"}
//         </p>

//         <p className="mt-2">
//           <strong>Skills:</strong>{" "}
//           {skills.length > 0 ? skills.join(", ") : "None"}
//         </p>
//       </div>

//       <div className="w-[320px] mx-auto">
//         <Pie data={pieData} />
//       </div>

//       <div className="w-[420px] mt-8 mx-auto">
//         <Bar data={barData} />
//       </div>
//     </div>
//   );
// }

// export default Analytics;

import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import { useLocation } from "react-router-dom";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);

function Analytics() {
  const location = useLocation();
  const candidate = location.state?.candidate;

  if (!candidate) {
    return <p className="p-6 text-white">Select candidate first</p>;
  }

  const skills = candidate.skills || [];
  const metadata = candidate.metadata || {};

  // ---------------- PIE ----------------
  const pieData = {
    labels: skills.length ? skills : ["No Skills Found"],
    datasets: [
      {
        data: skills.length ? skills.map(() => 1) : [1],
        backgroundColor: skills.length
          ? skills.map((_, i) => `hsl(${(i * 360) / skills.length},70%,55%)`)
          : ["#9ca3af"],
      },
    ],
  };

  // ---------------- BAR ----------------
  const barData = {
    labels: ["Score"],
    datasets: [
      {
        label: "Performance",
        data: [candidate.score || 0],
        backgroundColor: ["#3b82f6"],
      },
    ],
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Contact Details</h2>

      {/* ✅ ONLY CONTACT INFO */}
      <div className="mb-4 space-y-2">
        <p>
          <strong>Name:</strong> {metadata.name || "N/A"}
        </p>

        <p>
          <strong>Email:</strong> {candidate.email || "N/A"}
        </p>

        <p>
          <strong>Phone:</strong> {candidate.phone || "N/A"}
        </p>

        <p className="mt-2 font-bold">
          Score: {candidate.score?.toFixed(3) || "0.000"}
        </p>

        <p>
          <strong>Skills:</strong>{" "}
          {skills.length > 0 ? skills.join(", ") : "None"}
        </p>
      </div>

      {/* PIE */}
      <div className="w-[320px] mx-auto">
        <Pie data={pieData} />
      </div>

      {/* BAR */}
      <div className="w-[420px] mt-8 mx-auto">
        <Bar data={barData} />
      </div>
    </div>
  );
}

export default Analytics;