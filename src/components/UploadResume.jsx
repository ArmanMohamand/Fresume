import React, { useState, useEffect } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import API from "../api";
import pdfjsLib from "../pdfConfig";
import { jwtDecode } from "jwt-decode";
import Tesseract from "tesseract.js";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [username, setUsername] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [projectLinks, setProjectLinks] = useState([""]);
  // ---------------- GET USERNAME ----------------
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        console.log("Decoded token:", decoded);

        setUsername(decoded.username || "");
      } catch (err) {
        console.error("JWT Decode Error:", err);
      }
    }
  }, []);

  // ---------------- FILE SELECT ----------------
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // ---------------- DRAG DROP ----------------
  const handleDrop = (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  // ---------------- ADD PROJECT FIELD ----------------
  const addProjectField = () => {
    setProjectLinks([...projectLinks, ""]);
  };

  // ---------------- UPDATE PROJECT FIELD ----------------
  const updateProjectLink = (index, value) => {
    const updated = [...projectLinks];

    updated[index] = value;

    setProjectLinks(updated);
  };
  // ---------------- PDF TEXT EXTRACTION ----------------
  const extractPdfText = async (file) => {
    const arrayBuffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({
      data: arrayBuffer,
    }).promise;

    let textContent = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);

      const text = await page.getTextContent();

      text.items.forEach((item) => {
        textContent += item.str + " ";
      });

      // OCR fallback
      if (text.items.length === 0) {
        console.log(`Running OCR on page ${i}`);

        const viewport = page.getViewport({ scale: 2 });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport,
        }).promise;

        const result = await Tesseract.recognize(canvas, "eng");

        textContent += result.data.text;
      }
    }

    return textContent;
  };

  // ---------------- UPLOAD ----------------
  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("User not authenticated");
      return;
    }

    try {
      setUploading(true);
      setMessage("");

      let text = "";

      // PDF
      if (file.type === "application/pdf") {
        text = await extractPdfText(file);
      }

      // TXT
      else {
        text = await file.text();
      }

      console.log("Extracted text length:", text.length);
      console.log("Extracted text sample:", text.slice(0, 300));

      if (!text || text.trim() === "") {
        setMessage("Could not extract text from resume");
        setUploading(false);
        return;
      }

      // ---------------- API CALL ----------------
      const uploadRes = await API.post(
        "/upload",
        {
          filename: file.name,

          text: text,

          linkedin,

          github,

          project_links: projectLinks.filter((p) => p.trim() !== ""),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      console.log("Upload response:", uploadRes.data);

      setMessage("Resume uploaded successfully!");
      setFile(null);
    } catch (err) {
      console.error("Upload Error:", err);

      setMessage(
        err.response?.data?.error ||
          err.response?.data?.msg ||
          err.response?.data?.message ||
          err.message ||
          "Upload failed",
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center text-white">
        Welcome, {username}
      </h1>

      <h2 className="text-3xl font-extrabold mb-8 text-center text-white">
        Upload Resume
      </h2>

      {/* ---------------- DRAG AREA ---------------- */}
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

      {/* ---------------- FILE INPUT ---------------- */}
      <input
        type="file"
        accept=".pdf,.txt"
        onChange={handleFileChange}
        className="mt-4 w-full text-gray-700 dark:text-gray-200"
      />

      {/* ---------------- FILE NAME ---------------- */}
      {file && (
        <p className="mt-3 text-sm text-gray-300">Selected File: {file.name}</p>
      )}
      {/* ---------------- GITHUB ---------------- */}
      <input
        type="text"
        placeholder="GitHub Link"
        value={github}
        onChange={(e) => setGithub(e.target.value)}
        className="mt-4 w-full p-3 rounded bg-gray-700 text-white"
      />

      {/* ---------------- LINKEDIN ---------------- */}
      <input
        type="text"
        placeholder="LinkedIn Link"
        value={linkedin}
        onChange={(e) => setLinkedin(e.target.value)}
        className="mt-4 w-full p-3 rounded bg-gray-700 text-white"
      />

      {/* ---------------- PROJECT LINKS ---------------- */}
      <div className="mt-4">
        <p className="text-white mb-2 font-semibold">Project Links</p>

        {projectLinks.map((link, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Project Link ${index + 1}`}
            value={link}
            onChange={(e) => updateProjectLink(index, e.target.value)}
            className="mb-2 w-full p-3 rounded bg-gray-700 text-white"
          />
        ))}

        <button
          type="button"
          onClick={addProjectField}
          className="bg-blue-500 px-4 py-2 rounded text-white mt-2"
        >
          Add Another Project
        </button>
      </div>

      {/* ---------------- BUTTON ---------------- */}
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className={`w-full mt-4 py-3 rounded-xl text-white font-semibold transition ${
          uploading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {uploading ? "Uploading..." : "Upload Resume"}
      </button>

      {/* ---------------- MESSAGE ---------------- */}
      {message && (
        <p className="mt-4 text-center text-white font-medium">{message}</p>
      )}
    </div>
  );
}

export default UploadResume;
