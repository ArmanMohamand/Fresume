
import React from "react";

function CandidateDetail({ candidate }) {
  if (!candidate) {
    return (
      <div className="p-6 text-gray-500">
        Select a candidate to view details
      </div>
    );
  }

  const metadata = candidate.metadata || {};

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Candidate Profile</h2>

      <div className="space-y-3 text-gray-700 dark:text-gray-300">
        <p><strong>Resume ID:</strong> {candidate.resume_id}</p>
        <p><strong>Name:</strong> {metadata.name || "N/A"}</p>
        <p><strong>Email:</strong> {metadata.email || "N/A"}</p>
        <p><strong>Phone:</strong> {metadata.phone || "N/A"}</p>
        <p><strong>GitHub:</strong> {metadata.github || "N/A"}</p>
        <p><strong>LinkedIn:</strong> {metadata.linkedin || "N/A"}</p>

        <div>
          <strong>Projects:</strong>
          {metadata.projects && metadata.projects.length > 0 ? (
            <ul className="list-disc list-inside">
              {metadata.projects.map((proj, idx) => (
                <li key={idx}>
                  {proj}
                  {metadata.project_links?.[idx] && (
                    <>
                      {" "}—{" "}
                      <a
                        href={metadata.project_links[idx]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        View
                      </a>
                    </>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>N/A</p>
          )}
        </div>

        <p>
          <strong>Score:</strong>{" "}
          {typeof candidate.score === "number" ? candidate.score.toFixed(2) : "N/A"}
        </p>

        {candidate.matched_skills?.length > 0 && (
          <p><strong>Matched Skills:</strong> {candidate.matched_skills.join(", ")}</p>
        )}

        {candidate.matched_keywords?.length > 0 && (
          <p><strong>Matched Keywords:</strong> {candidate.matched_keywords.join(", ")}</p>
        )}
      </div>
    </div>
  );
}

export default CandidateDetail;
