// // import React, { useState } from "react";
// // import API from "../api";
// // import pdfjsLib from "../pdfConfig";

// // function UploadResume() {
// //   const [file, setFile] = useState(null);
// //   const [message, setMessage] = useState("");
// //   const [uploading, setUploading] = useState(false);

// //   const handleFileChange = (e) => setFile(e.target.files[0]);

// //   const extractPdfText = async (file) => {
// //     const arrayBuffer = await file.arrayBuffer();
// //     const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

// //     let textContent = "";

// //     for (let i = 1; i <= pdf.numPages; i++) {
// //       const page = await pdf.getPage(i);
// //       const text = await page.getTextContent();
// //       text.items.forEach((item) => {
// //         textContent += item.str + " ";
// //       });
// //     }

// //     return textContent;
// //   };
// //   const handleUpload = async () => {
// //     if (!file) return;

// //     try {
// //       setUploading(true);
// //       setMessage("");

// //       const token = localStorage.getItem("token");

// //       let text =
// //         file.type === "application/pdf"
// //           ? await extractPdfText(file)
// //           : await file.text();

// //       const res = await API.post(
// //         "/upload",
// //         {
// //           filename: file.name,
// //           text: text,
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         },
// //       );

// //       setMessage(res.data.message);
// //       setFile(null);
// //     } catch (err) {
// //       setMessage("Upload failed: " + err.message);
// //     } finally {
// //       setUploading(false);
// //     }
// //   };
// //   return (
// //     <div className="max-w-xl mx-auto mt-12 bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-2xl">
// //       <h2 className="text-3xl font-extrabold mb-8 text-center">
// //         Upload Resume
// //       </h2>

// //       <input type="file" accept=".pdf,.txt" onChange={handleFileChange} />

// //       <button
// //         onClick={handleUpload}
// //         disabled={!file || uploading}
// //         className="w-full mt-4 py-3 bg-green-500 text-white rounded-xl"
// //       >
// //         {uploading ? "Uploading..." : "Upload Resume"}
// //       </button>

// //       {message && <p className="mt-4">{message}</p>}
// //     </div>
// //   );
// // }

// // export default UploadResume;

// import React, { useState } from "react";
// import { CloudArrowUpIcon } from "@heroicons/react/24/outline"; // ✅ icon
// import API from "../api";
// import pdfjsLib from "../pdfConfig";

// function UploadResume() {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState("");
//   const [uploading, setUploading] = useState(false);

//   const handleFileChange = (e) => setFile(e.target.files[0]);
//   const handleDrop = (e) => {
//     e.preventDefault();
//     if (e.dataTransfer.files.length > 0) {
//       setFile(e.dataTransfer.files[0]);
//     }
//   };
//   const handleDragOver = (e) => e.preventDefault();

//   const extractPdfText = async (file) => {
//     const arrayBuffer = await file.arrayBuffer();
//     const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

//     let textContent = "";
//     for (let i = 1; i <= pdf.numPages; i++) {
//       const page = await pdf.getPage(i);
//       const text = await page.getTextContent();
//       text.items.forEach((item) => {
//         textContent += item.str + " ";
//       });
//     }
//     return textContent;
//   };

//   const handleUpload = async () => {
//     if (!file) return;

//     const token = localStorage.getItem("token");

//     try {
//       setUploading(true);

//       let text =
//         file.type === "application/pdf"
//           ? await extractPdfText(file)
//           : await file.text();

//       // 1️⃣ Upload resume
//       await API.post(
//         "/upload",
//         {
//           filename: file.name,
//           text: text,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       // 2️⃣ AUTO TRIGGER RANK after upload
//       const rankRes = await API.post(
//         "/rank",
//         {
//           job_description: localStorage.getItem("jobDesc") || "",
//           required_skills: JSON.parse(
//             localStorage.getItem("requiredSkills") || "[]",
//           ),
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );

//       // optional: store analytics globally
//       localStorage.setItem("analytics", JSON.stringify(rankRes.data.analytics));

//       setMessage("Upload + Ranking completed successfully!");
//       setFile(null);
//     } catch (err) {
//       setMessage("Upload failed: " + err.message);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-12 bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-2xl">
//       <h2 className="text-3xl font-extrabold mb-8 text-center">
//         Upload Resume
//       </h2>

//       {/* Drag & Drop Zone */}
//       <div
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//         className="border-2 border-dashed border-gray-400 rounded-xl p-12 text-center mb-6 hover:border-green-500 transition cursor-pointer bg-gray-50 dark:bg-gray-800"
//       >
//         <CloudArrowUpIcon className="mx-auto h-16 w-16 text-green-500 mb-4" />
//         <p className="text-gray-700 dark:text-gray-300 font-medium">
//           Drag & drop your resume here
//         </p>
//         <p className="text-sm text-gray-500 dark:text-gray-400">
//           or click below to select a file
//         </p>
//       </div>

//       <input
//         type="file"
//         accept=".pdf,.txt"
//         onChange={handleFileChange}
//         className="mt-4 w-full text-gray-700 dark:text-gray-200"
//       />
//       <button
//         onClick={handleUpload}
//         disabled={!file || uploading}
//         className="w-full mt-4 py-3 bg-green-500 text-white rounded-xl"
//       >
//         {uploading ? "Uploading..." : "Upload Resume"}
//       </button>

//       {message && <p className="mt-4">{message}</p>}
//     </div>
//   );
// }

// export default UploadResume;

// import React, { useState, useEffect } from "react";
// import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
// import API from "../api";
// import pdfjsLib from "../pdfConfig";
// import { jwtDecode } from "jwt-decode";

// function UploadResume() {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const [username, setUsername] = useState("");

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       const decoded = jwtDecode(token);
//       console.log("Decoded token:", decoded); // ✅ check payload structure
//       // Adjust depending on payload structure
//       setUsername(decoded.username || decoded.sub?.username || "");
//     }
//   }, []);

//   const handleFileChange = (e) => setFile(e.target.files[0]);
//   const handleDrop = (e) => {
//     e.preventDefault();
//     if (e.dataTransfer.files.length > 0) {
//       setFile(e.dataTransfer.files[0]);
//     }
//   };
//   const handleDragOver = (e) => e.preventDefault();

//   const extractPdfText = async (file) => {
//     const arrayBuffer = await file.arrayBuffer();
//     const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
//     let textContent = "";
//     for (let i = 1; i <= pdf.numPages; i++) {
//       const page = await pdf.getPage(i);
//       const text = await page.getTextContent();
//       text.items.forEach((item) => {
//         textContent += item.str + " ";
//       });
//     }
//     return textContent;
//   };

//   const handleUpload = async () => {
//     if (!file) return;
//     const token = localStorage.getItem("token");

//     try {
//       setUploading(true);
//       let text =
//         file.type === "application/pdf"
//           ? await extractPdfText(file)
//           : await file.text();

//       // ✅ Prevent sending empty text
//       if (!text || text.trim() === "") {
//         setMessage("Error: Could not extract text from resume");
//         setUploading(false);
//         return;
//       }

//       // ✅ Upload resume with proper JSON headers
//       await API.post(
//         "/upload",
//         { filename: file.name, text },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         },
//       );

//       // ✅ Trigger ranking with proper JSON headers
//       const rankRes = await API.post(
//         "/rank",
//         {
//           job_description: localStorage.getItem("jobDesc") || "",
//           required_skills: JSON.parse(
//             localStorage.getItem("requiredSkills") || "[]",
//           ),
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         },
//       );

//       localStorage.setItem("analytics", JSON.stringify(rankRes.data.analytics));
//       setMessage("Upload + Ranking completed successfully!");
//       setFile(null);
//     } catch (err) {
//       setMessage(
//         "Upload failed: " + (err.response?.data?.error || err.message),
//       );
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-12 bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-2xl">
//       <h1 className="text-2xl font-bold mb-6 text-center">
//         Welcome, {username}
//       </h1>

//       <h2 className="text-3xl font-extrabold mb-8 text-center">
//         Upload Resume
//       </h2>

//       <div
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//         className="border-2 border-dashed border-gray-400 rounded-xl p-12 text-center mb-6 hover:border-green-500 transition cursor-pointer bg-gray-50 dark:bg-gray-800"
//       >
//         <CloudArrowUpIcon className="mx-auto h-16 w-16 text-green-500 mb-4" />
//         <p className="text-gray-700 dark:text-gray-300 font-medium">
//           Drag & drop your resume here
//         </p>
//         <p className="text-sm text-gray-500 dark:text-gray-400">
//           or click below to select a file
//         </p>
//       </div>

//       <input
//         type="file"
//         accept=".pdf,.txt"
//         onChange={handleFileChange}
//         className="mt-4 w-full text-gray-700 dark:text-gray-200"
//       />
//       <button
//         onClick={handleUpload}
//         disabled={!file || uploading}
//         className="w-full mt-4 py-3 bg-green-500 text-white rounded-xl"
//       >
//         {uploading ? "Uploading..." : "Upload Resume"}
//       </button>

//       {message && <p className="mt-4">{message}</p>}
//     </div>
//   );
// }

// export default UploadResume;

import React, { useState, useEffect } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import API from "../api";
import pdfjsLib from "../pdfConfig";
import { jwtDecode } from "jwt-decode";
import Tesseract from "tesseract.js"; // ✅ OCR library

function UploadResume() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      console.log("Decoded token:", decoded);
      setUsername(decoded.username || decoded.sub?.username || "");
    }
  }, []);

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };
  const handleDragOver = (e) => e.preventDefault();

  // ✅ Extract text from PDF, fallback to OCR if empty
  const extractPdfText = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let textContent = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const text = await page.getTextContent();
      text.items.forEach((item) => {
        textContent += item.str + " ";
      });

      // OCR fallback if no text items
      if (text.items.length === 0) {
        const viewport = page.getViewport({ scale: 1 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport }).promise;
        const ocrResult = await Tesseract.recognize(canvas, "eng");
        textContent += ocrResult.data.text;
      }
    }
    return textContent;
  };

  const handleUpload = async () => {
    if (!file) return;
    const token = localStorage.getItem("token");

    try {
      setUploading(true);
      let text =
        file.type === "application/pdf"
          ? await extractPdfText(file)
          : await file.text();

      if (!text || text.trim() === "") {
        setMessage("Error: Could not extract text from resume");
        setUploading(false);
        return;
      }
      

      await API.post(
        "/upload",
        { filename: file.name, text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const rankRes = await API.post(
        "/rank",
        {
          job_description: localStorage.getItem("jobDesc") || "",
          required_skills: JSON.parse(
            localStorage.getItem("requiredSkills") || "[]"
          ),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("analytics", JSON.stringify(rankRes.data.analytics));
      setMessage("Upload + Ranking completed successfully!");
      setFile(null);
    } catch (err) {
      setMessage(
        "Upload failed: " + (err.response?.data?.error || err.message)
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Welcome, {username}
      </h1>

      <h2 className="text-3xl font-extrabold mb-8 text-center">
        Upload Resume
      </h2>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-gray-400 rounded-xl p-12 text-center mb-6 hover:border-green-500 transition cursor-pointer bg-gray-50 dark:bg-gray-800"
      >
        <CloudArrowUpIcon className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <p className="text-gray-700 dark:text-gray-300 font-medium">
          Drag & drop your resume here
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          or click below to select a file
        </p>
      </div>

      <input
        type="file"
        accept=".pdf,.txt"
        onChange={handleFileChange}
        className="mt-4 w-full text-gray-700 dark:text-gray-200"
      />
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full mt-4 py-3 bg-green-500 text-white rounded-xl"
      >
        {uploading ? "Uploading..." : "Upload Resume"}
      </button>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}

export default UploadResume;
