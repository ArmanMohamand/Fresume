import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
function CandidateDetail() {
  const [file, setFile] = useState(null);
  const [textContent, setTextContent] = useState("");

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const extractPdfText = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      content.items.forEach((item) => {
        text += item.str + " ";
      });
    }
    return text;
  };

  const handleProcess = async () => {
    if (!file) return;
    let content =
      file.type === "application/pdf"
        ? await extractPdfText(file)
        : await file.text();
    setTextContent(content);
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
        Candidate Detail
      </h2>

      <input
        type="file"
        accept=".pdf,.txt"
        onChange={handleFileChange}
        className="w-full mb-4 text-gray-700 dark:text-gray-200"
      />

      <button
        onClick={handleProcess}
        disabled={!file}
        className={`w-full py-2 rounded-xl font-semibold transition ${
          file
            ? "bg-green-500 text-white hover:bg-green-600"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
      >
        {file ? "Extract Text" : "Select a file first"}
      </button>

      {textContent && (
        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-700 dark:text-gray-300">
          <strong>Extracted Content:</strong>
          <p className="mt-2 whitespace-pre-wrap">{textContent}</p>
        </div>
      )}
    </div>
  );
}

export default CandidateDetail;
