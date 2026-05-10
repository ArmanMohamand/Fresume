// import React from "react";

// function CandidateDetail({ candidate }) {
//   if (!candidate) {
//     return <div className="p-6 text-gray-500">Select candidate</div>;
//   }

//   const m = candidate.metadata || {};

//   const formatUrl = (url, base) => {
//     if (!url) return null;

//     if (url.startsWith("http")) return url;

//     return `https://${url.replace(/^@/, "")}`;
//   };

//   const githubUrl = formatUrl(candidate.github, "https://github.com");
//   const linkedinUrl = formatUrl(candidate.linkedin, "https://linkedin.com/in");

//   return (
//     <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-xl shadow">
//       <h2 className="text-2xl font-bold mb-4 text-center">Candidate Profile</h2>

//       <div className="space-y-2 text-gray-700 dark:text-gray-300">
//         <p>
//           <strong>Resume File:</strong> {candidate.filename || "Resume.pdf"}
//         </p>
//         <p>
//           <strong>Email:</strong> {candidate.email || "N/A"}
//         </p>

//         <p>
//           <strong>Phone:</strong> {candidate.phone || "N/A"}
//         </p>
//         <p>
//           <strong>GitHub:</strong>{" "}
//           {githubUrl ? (
//             <a
//               href={githubUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-500 hover:underline"
//             >
//               {githubUrl}
//             </a>
//           ) : (
//             "N/A"
//           )}
//         </p>
//         <p>
//           <strong>LinkedIn:</strong>{" "}
//           {linkedinUrl ? (
//             <a
//               href={linkedinUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-500 hover:underline"
//             >
//               {linkedinUrl}
//             </a>
//           ) : (
//             "N/A"
//           )}
//         </p>
//         <div>
//           <strong>Projects & Links:</strong>
//           {m.project_links?.length > 0 ? (
//             <ul className="list-disc list-inside mt-2">
//               {m.project_links.map((link, idx) => (
//                 <li key={idx}>
//                   <a
//                     href={link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-500 hover:underline"
//                   >
//                     {link}
//                   </a>
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
    return (
      <div className="p-4 sm:p-6 text-gray-500 text-center">
        Select candidate
      </div>
    );
  }

  const m = candidate.metadata || {};

  const formatUrl = (url) => {
    if (!url) return null;
    if (url.startsWith("http")) return url;
    return `https://${url.replace(/^@/, "")}`;
  };

  const githubUrl = formatUrl(candidate.github);
  const linkedinUrl = formatUrl(candidate.linkedin);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-900 p-4 sm:p-6 md:p-8 rounded-xl shadow-md">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-center">
        Candidate Profile
      </h2>

      <div className="space-y-3 text-gray-700 dark:text-gray-300 text-sm sm:text-base break-words">
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
              className="text-blue-500 hover:underline break-all"
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
              className="text-blue-500 hover:underline break-all"
            >
              {linkedinUrl}
            </a>
          ) : (
            "N/A"
          )}
        </p>

        <div>
          <strong>Projects & Links:</strong>
          {m.project_links?.length > 0 ? (
            <ul className="list-disc list-inside mt-2 space-y-1">
              {m.project_links.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline break-all"
                  >
                    {link}
                  </a>
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
