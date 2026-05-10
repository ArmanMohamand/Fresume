import React, { useState, useEffect } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import API from "../api";
import { jwtDecode } from "jwt-decode";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [username, setUsername] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [projectLinks, setProjectLinks] = useState([""]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.username || "");
      } catch (err) {
        console.error("JWT Decode Error:", err);
      }
    }
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const addProjectField = () => setProjectLinks([...projectLinks, ""]);

  const updateProjectLink = (index, value) => {
    const updated = [...projectLinks];
    updated[index] = value;
    setProjectLinks(updated);
  };

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

      const formData = new FormData();
      formData.append("file", file);
      formData.append("linkedin", linkedin);
      formData.append(
        "project_links",
        JSON.stringify(projectLinks.filter((p) => p.trim() !== "")),
      );

      const uploadRes = await API.post("/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(uploadRes.data);
      setMessage("Resume uploaded successfully!");
      setFile(null);
      setLinkedin("");
      setProjectLinks([""]);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 sm:mt-12 bg-white dark:bg-gray-900 p-4 sm:p-8 md:p-10 rounded-2xl shadow-2xl">
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-center text-white">
        Welcome, {username}
      </h1>

      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-6 sm:mb-8 text-center text-white">
        Upload Resume
      </h2>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-gray-400 rounded-xl p-6 sm:p-8 md:p-12 text-center mb-6 hover:border-green-500 transition cursor-pointer bg-gray-50 dark:bg-gray-800"
      >
        <CloudArrowUpIcon className="mx-auto h-12 sm:h-16 w-12 sm:w-16 text-green-500 mb-4" />
        <p className="text-gray-700 dark:text-gray-300 font-medium">
          Drag & drop your resume here
        </p>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          or click below to select a file
        </p>
      </div>

      <input
        type="file"
        accept=".pdf,.txt"
        onChange={handleFileChange}
        className="mt-4 w-full text-gray-700 dark:text-gray-200"
      />
      {file && (
        <p className="mt-3 text-xs sm:text-sm text-gray-300">
          Selected File: {file.name}
        </p>
      )}

      <input
        type="text"
        placeholder="LinkedIn Link"
        value={linkedin}
        onChange={(e) => setLinkedin(e.target.value)}
        className="mt-4 w-full p-2 sm:p-3 rounded bg-gray-700 text-white"
      />

      <div className="mt-4">
        <p className="text-white mb-2 font-semibold">Project Links</p>
        {projectLinks.map((link, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Project Link ${index + 1}`}
            value={link}
            onChange={(e) => updateProjectLink(index, e.target.value)}
            className="mb-2 w-full p-2 sm:p-3 rounded bg-gray-700 text-white"
          />
        ))}
        <button
          type="button"
          onClick={addProjectField}
          className="bg-blue-500 px-3 sm:px-4 py-2 rounded text-white mt-2 text-sm sm:text-base"
        >
          Add Another Project
        </button>
      </div>

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className={`w-full mt-4 py-2 sm:py-3 rounded-xl text-white font-semibold transition ${
          uploading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {uploading ? "Uploading..." : "Upload Resume"}
      </button>

      {message && (
        <p className="mt-4 text-center text-white font-medium text-sm sm:text-base">
          {message}
        </p>
      )}
    </div>
  );
}

export default UploadResume;
