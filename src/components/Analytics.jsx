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
    return (
      <p className="p-4 sm:p-6 text-white text-center">
        Select candidate first
      </p>
    );
  }
  const skills = candidate.skills || [];
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
    <div className="p-4 sm:p-6 text-white">
      <div className="bg-gray-800 rounded-2xl p-4 sm:p-6 mb-6 shadow-lg space-y-3">
        <h3 className="text-lg sm:text-2xl font-semibold mb-4">
          Contact Details
        </h3>
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
              className="text-blue-400 underline break-all"
            >
              Open GitHub
            </a>
          ) : (
            "N/A"
          )}
        </p>
      </div>
      <div className="bg-gray-800 rounded-2xl p-4 sm:p-6 mb-6 shadow-lg">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center">
          Skills Distribution
        </h3>
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto h-auto min-h-[400px]">
          <Pie
            data={pieData}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "top",
                  labels: {
                    color: "#d1d5db",
                    boxWidth: 20,
                    padding: 10,
                  },
                },
              },
            }}
          />
        </div>
      </div>
      <div className="bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center">
          Candidate Score
        </h3>
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto">
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
}
export default Analytics;
