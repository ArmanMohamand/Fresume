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
//   const metadata = candidate.metadata || {};

//   // ---------------- PIE ----------------
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

//   // ---------------- BAR ----------------
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
//       <h2 className="text-2xl font-bold mb-4">Contact Details</h2>

//       {/* ✅ ONLY CONTACT INFO */}
//       <div className="mb-4 space-y-2">
//         <p>
//           <strong>Name:</strong> {candidate.metadata?.name || "N/A"}
//         </p>
//         <p>
//           <strong>Email:</strong> {candidate.email || "N/A"}
//         </p>

//         <p>
//           <strong>Phone:</strong> {candidate.phone || "N/A"}
//         </p>

//         <p className="mt-2 font-bold">
//           Score: {candidate.score?.toFixed(3) || "0.000"}
//         </p>

//         <p>
//           <strong>Skills:</strong>{" "}
//           {skills.length > 0 ? skills.join(", ") : "None"}
//         </p>
//       </div>

//       {/* PIE */}
//       <div className="w-[320px] mx-auto">
//         <Pie data={pieData} />
//       </div>

//       {/* BAR */}
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

  // ---------------- PIE CHART ----------------
  const pieData = {
    labels: skills.length ? skills : ["No Skills Found"],

    datasets: [
      {
        data: skills.length ? skills.map(() => 1) : [1],

        backgroundColor: skills.length
          ? skills.map((_, i) => `hsl(${(i * 360) / skills.length}, 70%, 55%)`)
          : ["#9ca3af"],

        borderWidth: 1,
      },
    ],
  };

  // ---------------- BAR CHART ----------------
  const barData = {
    labels: ["Resume Score"],

    datasets: [
      {
        label: "Score",

        data: [candidate.score || 0],

        backgroundColor: ["#3b82f6"],

        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="p-6 text-white">
      {/* ---------------- CONTACT CARD ---------------- */}
      <div className="bg-gray-800 rounded-2xl p-6 mb-8 shadow-lg space-y-3">
        <h3 className="text-2xl font-semibold mb-4">Contact Details</h3>

        <p>
          <strong>Name:</strong> {candidate.metadata?.name || "N/A"}
        </p>

        <p>
          <strong>Email:</strong> {candidate.email || "N/A"}
        </p>

        <p>
          <strong>Phone:</strong> {candidate.phone || "N/A"}
        </p>

        <p>
          <strong>GitHub:</strong>{" "}
          {candidate.github ? (
            <a
              href={candidate.github}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 underline"
            >
              Open GitHub
            </a>
          ) : (
            "N/A"
          )}
        </p>

        <p>
          <strong>LinkedIn:</strong>{" "}
          {candidate.linkedin ? (
            <a
              href={candidate.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 underline"
            >
              Open LinkedIn
            </a>
          ) : (
            "N/A"
          )}
        </p>
      </div>
      {/* ---------------- PIE CHART ---------------- */}
      <div className="bg-gray-800 rounded-2xl p-6 mb-8 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Skills Distribution
        </h3>

        <div className="w-[320px] mx-auto">
          <Pie data={pieData} />
        </div>
      </div>

      {/* ---------------- BAR CHART ---------------- */}
      <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Candidate Score
        </h3>

        <div className="w-[420px] mx-auto">
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
}

export default Analytics;
