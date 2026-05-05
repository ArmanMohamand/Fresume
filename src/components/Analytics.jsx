

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
  BarElement,
);

const generateColors = (count) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(`hsl(${(i * 360) / count}, 70%, 55%)`);
  }
  return colors;
};

function Analytics({ candidate }) {
  if (!candidate || !candidate.analytics) {
    return <p className="p-6">Select a resume to view analytics</p>;
  }

  const analytics = candidate.analytics;

  const skillData = {
    labels: Object.keys(analytics.skill_distribution || {}),
    datasets: [
      {
        data: Object.values(analytics.skill_distribution || {}),
        backgroundColor: generateColors(
          Object.keys(analytics.skill_distribution || {}).length,
        ),
      },
    ],
  };

  const scoreData = {
    labels: [`Resume ${candidate.resume_id}`],
    datasets: [
      {
        label: "Score",
        data: analytics.scores || [],
        backgroundColor: "#36A2EB",
      },
    ],
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">
        Analytics for{" "}
        {candidate.metadata?.name || `Resume ${candidate.resume_id}`}
      </h2>

      <p className="mb-4">
        <strong>Average Score:</strong>{" "}
        {analytics.average_score?.toFixed(2) || "N/A"}
      </p>

      {/* Pie Chart */}
      <div className="flex justify-center mb-6">
        <div className="w-[400px] h-[400px]">
          <Pie data={skillData} />
        </div>
      </div>

      {/* Bar Chart */}
      <div>
        <Bar data={scoreData} />
      </div>
    </div>
  );
}

export default Analytics;
