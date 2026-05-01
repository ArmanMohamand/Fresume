import React, { useState } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import API from "../api";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

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
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("No token found. Please login first.");
      return;
    }

    try {
      setUploading(true);
      setProgress(0);

      let fileContent = "";
      if (file.type === "application/pdf") {
        fileContent = await extractPdfText(file);
      } else {
        fileContent = await file.text();
      }

      const res = await API.post(
        "/upload",
        {
          filename: file.name,
          text: fileContent,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (event) => {
            if (event.total) {
              const percent = Math.round((event.loaded * 100) / event.total);
              setProgress(percent);
            }
          },
        },
      );

      setMessage(res.data.message);
      setFile(null);
    } catch (err) {
      setMessage("Upload failed: " + (err.response?.data?.msg || err.message));
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800 dark:text-gray-100">
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
        className="w-full mb-4 text-gray-700 dark:text-gray-200"
      />

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className={`w-full py-3 rounded-xl font-semibold transition transform ${
          file && !uploading
            ? "bg-green-500 text-white hover:bg-green-600 hover:scale-105 shadow-md"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
      >
        {uploading
          ? "Uploading..."
          : file
            ? "Upload Resume"
            : "Select a file first"}
      </button>

      {uploading && (
        <div className="mt-4 w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
          <div
            className="bg-green-500 h-4 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {file && !uploading && (
        <div className="mt-4 text-sm text-gray-700 dark:text-gray-300 text-center">
          <strong>Selected:</strong> {file.name}
        </div>
      )}

      {message && (
        <p className="mt-6 text-center text-sm font-medium text-gray-700 dark:text-gray-400">
          {message}
        </p>
      )}
    </div>
  );
}

export default UploadResume;
