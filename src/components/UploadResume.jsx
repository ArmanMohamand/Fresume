import React, { useState } from "react";
import API from "../api";
import pdfjsLib from "../pdfConfig";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);

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
    }

    return textContent;
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setUploading(true);
      setMessage("");

      const token = localStorage.getItem("token");
      console.log("TOKEN:", token); // debug check

      if (!token) {
        setMessage("Please login again. Token missing.");
        setUploading(false);
        return;
      }

      const text =
        file.type === "application/pdf"
          ? await extractPdfText(file)
          : await file.text();

      // ✅ IMPORTANT: NO manual headers here
      const res = await API.post("/upload", {
        filename: file.name,
        text: text,
      });

      setMessage(res.data.message || "Upload successful!");
      setFile(null);
    } catch (err) {
      console.error(err);
      setMessage(
        "Upload failed: " + (err.response?.data?.error || err.message),
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-extrabold mb-8 text-center">
        Upload Resume
      </h2>

      <input type="file" accept=".pdf,.txt" onChange={handleFileChange} />

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
