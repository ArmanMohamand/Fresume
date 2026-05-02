// // src/components/Analytics.jsx
// import React from "react";
// import { Bar, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   BarElement,
// } from "chart.js";

// ChartJS.register(
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   BarElement,
// );

// function Analytics({ analytics }) {
//   if (!analytics) {
//     return (
//       <p className="p-6">No analytics available yet. Run ranking first.</p>
//     );
//   }

//   // Pie chart for skill distribution
//   const skillData = {
//     labels: Object.keys(analytics.skill_distribution || {}),
//     datasets: [
//       {
//         label: "Skill Count",
//         data: Object.values(analytics.skill_distribution || {}),
//         backgroundColor: [
//           "#36A2EB",
//           "#FF6384",
//           "#FFCE56",
//           "#4BC0C0",
//           "#9966FF",
//           "#FF9F40",
//         ],
//       },
//     ],
//   };

//   // Bar chart for resume scores
//   const scoreData = {
//     labels: (analytics.scores || []).map((_, i) => `Resume ${i + 1}`),
//     datasets: [
//       {
//         label: "Scores",
//         data: analytics.scores || [],
//         backgroundColor: "#36A2EB",
//       },
//     ],
//   };

//   // Optional: show required skills vs available
//   const requiredSkills = analytics.required_skills || [];

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Analytics Dashboard</h2>
//       <p>
//         <strong>Average Score:</strong>{" "}
//         {analytics.average_score ? analytics.average_score.toFixed(2) : "N/A"}
//       </p>

//       {requiredSkills.length > 0 && (
//         <p className="mb-4">
//           <strong>Required Skills:</strong> {requiredSkills.join(", ")}
//         </p>
//       )}

//       <div className="mb-6">
//         <h3 className="text-lg font-semibold mb-2">Skill Distribution (Pie)</h3>
//         <div className="w-1/2">
//           <Pie data={skillData} />
//         </div>
//       </div>

//       <div>
//         <h3 className="text-lg font-semibold mb-2">Resume Scores (Bar)</h3>
//         <div className="w-3/4">
//           <Bar data={scoreData} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Analytics;

import React from "react";
import { Pie, Bar } from "react-chartjs-2";
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
  BarElement
);

const generateColors = (count) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(`hsl(${(i * 360) / count}, 70%, 55%)`);
  }
  return colors;
};

function Analytics({ analytics }) {
  const storedAnalytics = JSON.parse(localStorage.getItem("analytics") || "{}");
  const data = analytics || storedAnalytics;

  if (!data || !data.skill_distribution) {
    return <p className="p-6">No analytics available yet</p>;
  }

  const skills = data.skill_distribution || {};
  const skillLabels = Object.keys(skills);
  const skillValues = Object.values(skills);

  const skillData = {
    labels: skillLabels,
    datasets: [
      {
        data: skillValues,
        backgroundColor: generateColors(skillLabels.length),
        borderWidth: 1,
      },
    ],
  };

  const scoreData = {
    labels: data.scores?.map((_, i) => `Resume ${i + 1}`) || [],
    datasets: [
      {
        label: "Scores",
        data: data.scores || [],
        backgroundColor: "#36A2EB",
      },
    ],
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Analytics Dashboard</h2>

      <p className="mb-4">
        <strong>Average Score:</strong>{" "}
        {data.average_score?.toFixed(2) || "N/A"}
      </p>

      {/* Pie Chart */}
      <div className="flex justify-center">
        <div className="w-[400px] h-[400px]">
          <Pie data={skillData} />
        </div>
      </div>

      {/* Bar Chart */}
      <div className="mt-8">
        <Bar data={scoreData} />
      </div>
    </div>
  );
}

export default Analytics;
