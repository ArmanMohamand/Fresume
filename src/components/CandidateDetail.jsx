// import React, { useState } from "react";
// import pdfjsLib from "../pdfConfig";
// function CandidateDetail() {
//   const [file, setFile] = useState(null);
//   const [textContent, setTextContent] = useState("");

//   const handleFileChange = (e) => setFile(e.target.files[0]);

//   const extractPdfText = async (file) => {
//     const arrayBuffer = await file.arrayBuffer();
//     const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
//     let text = "";

//     for (let i = 1; i <= pdf.numPages; i++) {
//       const page = await pdf.getPage(i);
//       const content = await page.getTextContent();
//       content.items.forEach((item) => {
//         text += item.str + " ";
//       });
//     }
//     return text;
//   };

//   const handleProcess = async () => {
//     if (!file) return;
//     let content =
//       file.type === "application/pdf"
//         ? await extractPdfText(file)
//         : await file.text();
//     setTextContent(content);
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-12 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl">
//       <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
//         Candidate Detail
//       </h2>

//       <input
//         type="file"
//         accept=".pdf,.txt"
//         onChange={handleFileChange}
//         className="w-full mb-4 text-gray-700 dark:text-gray-200"
//       />

//       <button
//         onClick={handleProcess}
//         disabled={!file}
//         className={`w-full py-2 rounded-xl font-semibold transition ${
//           file
//             ? "bg-green-500 text-white hover:bg-green-600"
//             : "bg-gray-300 text-gray-600 cursor-not-allowed"
//         }`}
//       >
//         {file ? "Extract Text" : "Select a file first"}
//       </button>

//       {textContent && (
//         <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-700 dark:text-gray-300">
//           <strong>Extracted Content:</strong>
//           <p className="mt-2 whitespace-pre-wrap">{textContent}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CandidateDetail;


// import React from "react";

// function CandidateDetail({ candidate }) {
//   if (!candidate) {
//     return (
//       <div className="p-6 text-gray-500">
//         Select a candidate to view details
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl mx-auto mt-10 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl">
//       <h2 className="text-2xl font-bold mb-6">Candidate Profile</h2>

//       <div className="space-y-3">
//         <p><strong>Name:</strong> {candidate.name || "N/A"}</p>
//         <p><strong>Email:</strong> {candidate.email || "N/A"}</p>
//         <p><strong>GitHub:</strong> {candidate.github || "N/A"}</p>
//         <p><strong>Project:</strong> {candidate.project || "N/A"}</p>
//         <p><strong>Score:</strong> {candidate.score?.toFixed(2) || "N/A"}</p>

//         {candidate.matched_skills && (
//           <p>
//             <strong>Skills:</strong> {candidate.matched_skills.join(", ")}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CandidateDetail;
import React from "react";
import { useLocation } from "react-router-dom";

function CandidateDetail() {
  const { state } = useLocation();

  if (!state) return <p>No candidate selected</p>;

  const meta = state.metadata || {};

  return (
    <div className="p-6">
      <h2>Candidate Details</h2>

      <p>Name: {meta.name || "N/A"}</p>
      <p>Email: {meta.email || "N/A"}</p>
      <p>Phone: {meta.phone || "N/A"}</p>
      <p>GitHub: {meta.github || "N/A"}</p>
      <p>Score: {state.score}</p>
    </div>
  );
}

export default CandidateDetail;