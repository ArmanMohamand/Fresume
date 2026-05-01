import React from "react";

function CandidateDetail({ candidate, loading, onClose }) {
  if (loading) {
    return (
      <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md animate-pulse">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded">
        Select a candidate to view details.
      </div>
    );
  }

  const metadata = candidate.metadata || {};

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Candidate Details
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Close
          </button>
        )}
      </div>

      <p className="mb-2 text-gray-700 dark:text-gray-300">
        <strong>Name:</strong> {metadata.name || "Unknown"}
      </p>

      <p className="mb-2 text-gray-700 dark:text-gray-300">
        <strong>Email:</strong> {metadata.email || "Not provided"}
      </p>

      <p className="mb-2 text-gray-700 dark:text-gray-300">
        <strong>Phone:</strong> {metadata.phone || "Not provided"}
      </p>

      <p className="mb-2 text-gray-700 dark:text-gray-300">
        <strong>Score:</strong>{" "}
        {typeof candidate.score === "number"
          ? candidate.score.toFixed(2)
          : "N/A"}
      </p>

      <p className="mb-2 text-gray-700 dark:text-gray-300">
        <strong>Skills:</strong>{" "}
        {candidate.matched_skills?.length > 0
          ? candidate.matched_skills.join(", ")
          : "No skills detected"}
      </p>
    </div>
  );
}

export default CandidateDetail;
