// import React from "react";

// function CandidateDetail({ candidate }) {
//   if (!candidate) {
//     return (
//       <div className="p-6 text-gray-500">
//         Select a candidate to view details
//       </div>
//     );
//   }

//   const metadata = candidate.metadata || {};

//   return (
//     <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl">
//       <h2 className="text-2xl font-bold mb-6 text-center">Candidate Profile</h2>

//       <div className="space-y-3 text-gray-700 dark:text-gray-300">
//         <p><strong>Resume ID:</strong> {candidate.resume_id}</p>
//         <p><strong>Name:</strong> {metadata.name || "N/A"}</p>
//         <p><strong>Email:</strong> {metadata.email || "N/A"}</p>
//         <p><strong>Phone:</strong> {metadata.phone || "N/A"}</p>
//         <p><strong>GitHub:</strong> {metadata.github || "N/A"}</p>
//         <p><strong>LinkedIn:</strong> {metadata.linkedin || "N/A"}</p>

//         <div>
//           <strong>Projects:</strong>
//           {metadata.projects && metadata.projects.length > 0 ? (
//             <ul className="list-disc list-inside">
//               {metadata.projects.map((proj, idx) => (
//                 <li key={idx}>
//                   {proj}
//                   {metadata.project_links?.[idx] && (
//                     <>
//                        —
//                       <a
//                         href={metadata.project_links[idx]}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-500 hover:underline"
//                       >
//                         View
//                       </a>
//                     </>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>N/A</p>
//           )}
//         </div>

//         <p>
//           <strong>Score:</strong>
//           {typeof candidate.score === "number" ? candidate.score.toFixed(2) : "N/A"}
//         </p>

//         {candidate.matched_skills?.length > 0 && (
//           <p><strong>Matched Skills:</strong> {candidate.matched_skills.join(", ")}</p>
//         )}

//         {candidate.matched_keywords?.length > 0 && (
//           <p><strong>Matched Keywords:</strong> {candidate.matched_keywords.join(", ")}</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CandidateDetail;

// import React from "react";

// function CandidateDetail({ candidate }) {
//   if (!candidate) {
//     return <div className="p-6 text-gray-500">Select candidate</div>;
//   }

//   const m = candidate.metadata || {};

//   // ✅ Fix GitHub / LinkedIn URLs (handles usernames like "arman123")
//   const formatUrl = (url, base) => {
//     if (!url) return null;

//     if (url.startsWith("http")) return url;

//     // If only username → convert to full URL
//     return `${base}/${url.replace(/^@/, "")}`;
//   };

//   const githubUrl = formatUrl(m.github, "https://github.com");
//   const linkedinUrl = formatUrl(m.linkedin, "https://linkedin.com/in");

//   return (
//     <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-xl shadow">
//       {/* TITLE */}
//       <h2 className="text-2xl font-bold mb-4 text-center">Candidate Profile</h2>

//       <div className="space-y-2 text-gray-700 dark:text-gray-300">
//         <p>
//           <strong>Resume ID:</strong> {candidate.resume_id}
//         </p>

//         <p>
//           <strong>Name:</strong> {m.name || "N/A"}
//         </p>

//         <p>
//           <strong>Email:</strong> {m.email || "N/A"}
//         </p>

//         <p>
//           <strong>Phone:</strong> {m.phone || "N/A"}
//         </p>

//         {/* ✅ GitHub FIXED */}
//         <p>
//           <strong>GitHub:</strong>{" "}
//           {githubUrl ? (
//             <a
//               href={githubUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-500 hover:underline"
//             >
//               View Profile
//             </a>
//           ) : (
//             "N/A"
//           )}
//         </p>

//         {/* ✅ LinkedIn FIXED */}
//         <p>
//           <strong>LinkedIn:</strong>{" "}
//           {linkedinUrl ? (
//             <a
//               href={linkedinUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-500 hover:underline"
//             >
//               View Profile
//             </a>
//           ) : (
//             "N/A"
//           )}
//         </p>

//         {/* ✅ PROJECTS */}
//         <div>
//           <strong>Projects:</strong>
//           {m.projects?.length > 0 ? (
//             <ul className="list-disc list-inside">
//               {m.projects.map((proj, idx) => (
//                 <li key={idx}>
//                   {proj}
//                   {m.project_links?.[idx] && (
//                     <>
//                       {" "}
//                       —{" "}
//                       <a
//                         href={m.project_links[idx]}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-500 hover:underline"
//                       >
//                         View
//                       </a>
//                     </>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>N/A</p>
//           )}
//         </div>

//         {/* ✅ SCORE SAFE */}
//         <p>
//           <strong>Score:</strong>{" "}
//           {typeof candidate.score === "number"
//             ? candidate.score.toFixed(3)
//             : "N/A"}
//         </p>

//         {/* ✅ SKILLS */}
//         <p>
//           <strong>Skills:</strong>{" "}
//           {candidate.skills?.length > 0 ? candidate.skills.join(", ") : "None"}
//         </p>

//         {/* ✅ OPTIONAL KEYWORDS (if backend sends later) */}
//         {candidate.matched_keywords?.length > 0 && (
//           <p>
//             <strong>Keywords:</strong> {candidate.matched_keywords.join(", ")}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CandidateDetail;

// import React from "react";

// function CandidateDetail({ candidate }) {
//   if (!candidate) {
//     return <div className="p-6 text-gray-500">Select candidate</div>;
//   }

//   // ✅ Use DIRECT fields from backend (NOT metadata)
//   const formatUrl = (url, base) => {
//     if (!url) return null;
//     if (url.startsWith("http")) return url;
//     return `${base}/${url.replace(/^@/, "")}`;
//   };

//   const githubUrl = formatUrl(candidate.github, "https://github.com");
//   const linkedinUrl = formatUrl(candidate.linkedin, "https://linkedin.com/in");

//   return (
//     <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-xl shadow">
//       <h2 className="text-2xl font-bold mb-4 text-center">Candidate Profile</h2>

//       <div className="space-y-2 text-gray-700 dark:text-gray-300">
//         <p>
//           <strong>Resume ID:</strong> {candidate.resume_id}
//         </p>
//         {/* ❌ NAME REMOVED (not available yet) */}
//         <p>
//           <strong>Email:</strong> {candidate.email || "N/A"}
//         </p>
//         <p>
//           <strong>Phone:</strong> {candidate.phone || "N/A"}
//         </p>
//         {/* ✅ GitHub */}
//         <p>
//           <strong>GitHub:</strong>{" "}
//           {githubUrl ? (
//             <a
//               href={githubUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-500 hover:underline"
//             >
//               View Profile
//             </a>
//           ) : (
//             "N/A"
//           )}
//         </p>
//         {/* ✅ LinkedIn */}
//         <p>
//           <strong>LinkedIn:</strong>{" "}
//           {linkedinUrl ? (
//             <a
//               href={linkedinUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-500 hover:underline"
//             >
//               View Profile
//             </a>
//           ) : (
//             "N/A"
//           )}
//         </p>
//         <div>
//           <strong>Projects:</strong>
//           {m.projects?.length > 0 ? (
//             <ul className="list-disc list-inside">
//               {m.projects.map((proj, idx) => (
//                 <li key={idx}>
//                   {proj}
//                   {m.project_links?.[idx] && (
//                     <>
//                       <a
//                         href={m.project_links[idx]}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-500 hover:underline"
//                       >
//                         View
//                       </a>
//                     </>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>N/A</p>
//           )}
//         </div>
//         <p>
//           <strong>Score:</strong>{" "}
//           {typeof candidate.score === "number" ? candidate.score : "N/A"}
//         </p>
//         <p>
//           <strong>Skills:</strong>{" "}
//           {candidate.skills?.length > 0 ? candidate.skills.join(", ") : "None"}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default CandidateDetail;

import React from "react";

function CandidateDetail({ candidate }) {
  if (!candidate) {
    return <div className="p-6 text-gray-500">Select candidate</div>;
  }

  const m = candidate.metadata || {};

  const formatUrl = (url, base) => {
    if (!url) return null;

    if (url.startsWith("http")) return url;

    return `https://${url.replace(/^@/, "")}`;
  };

  const githubUrl = formatUrl(candidate.github, "https://github.com");
  const linkedinUrl = formatUrl(candidate.linkedin, "https://linkedin.com/in");

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Candidate Profile</h2>

      <div className="space-y-2 text-gray-700 dark:text-gray-300">
        <p>
          <strong>Resume File:</strong> {candidate.filename || "Resume.pdf"}
        </p>
        <p>
          <strong>Email:</strong> {candidate.email || "N/A"}
        </p>

        <p>
          <strong>Phone:</strong> {candidate.phone || "N/A"}
        </p>
        <p>
          <strong>GitHub:</strong>{" "}
          {githubUrl ? (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {githubUrl}
            </a>
          ) : (
            "N/A"
          )}
        </p>
        <p>
          <strong>LinkedIn:</strong>{" "}
          {linkedinUrl ? (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {linkedinUrl}
            </a>
          ) : (
            "N/A"
          )}
        </p>
        <div>
          <strong>Projects:</strong>
          {m.projects?.length > 0 ? (
            <ul className="list-disc list-inside mt-2">
              {m.projects.map((proj, idx) => (
                <li key={idx}>
                  {idx + 1}. {proj}
                  {m.project_links?.[idx] && (
                    <>
                      {" "}
                      —{" "}
                      <a
                        href={m.project_links[idx]}
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
          {typeof candidate.score === "number" ? candidate.score : "N/A"}
        </p>

        <p>
          <strong>Skills:</strong>{" "}
          {candidate.skills?.length > 0 ? candidate.skills.join(", ") : "None"}
        </p>
      </div>
    </div>
  );
}

export default CandidateDetail;
