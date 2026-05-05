
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function Popup({ message, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-sm w-full">
        <p className="text-gray-800 dark:text-gray-200 mb-4">{message}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          OK
        </button>
      </div>
    </div>
  );
}

function JobDescription({ setJobDesc, setRequiredSkills }) {
  const [desc, setDesc] = useState("");
  const [skills, setSkills] = useState("");
  const [endTime, setEndTime] = useState("");
  const [savedEntries, setSavedEntries] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const API_URL = "https://bresume.onrender.com";

  // ✅ CHECK ADMIN
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode(token);
      setIsAdmin(decoded.role === "admin");
    }
  }, []);

  // ✅ FETCH JOBS FROM BACKEND (IMPORTANT)
  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(`${API_URL}/jobdesc/list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setSavedEntries(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchJobs();
  }, []);

  // ✅ SAVE
  const handleSave = async () => {
    if (!isAdmin) {
      setPopupMessage("Only admins can add job descriptions");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_URL}/jobdesc/save`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          desc,
          skills: skills.split(",").map((s) => s.trim()),
          endTime,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setPopupMessage(data.error);
        return;
      }

      // ✅ ADD NEW JOB FROM BACKEND RESPONSE
      setSavedEntries((prev) => [data.job, ...prev]);

      setJobDesc(desc);
      setRequiredSkills(skills.split(",").map((s) => s.trim()));

      localStorage.setItem("jobDesc", desc);
      localStorage.setItem(
        "requiredSkills",
        JSON.stringify(skills.split(",").map((s) => s.trim()))
      );

      setPopupMessage("Saved successfully");

      setDesc("");
      setSkills("");
      setEndTime("");
    } catch (err) {
      setPopupMessage("Something went wrong");
    }
  };

  // ✅ DELETE (FIXED USING _id)
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_URL}/jobdesc/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setPopupMessage(data.error);
        return;
      }

      setSavedEntries((prev) => prev.filter((j) => j._id !== id));

      setPopupMessage("Deleted successfully");
    } catch (err) {
      setPopupMessage("Delete failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Job Description</h2>

      {/* INPUTS */}
      <textarea
        placeholder="Paste job description..."
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="w-full p-3 border rounded mb-4 text-white"
      />

      <input
        type="text"
        placeholder="Skills (comma separated)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        className="w-full p-3 border rounded mb-4 text-white"
      />

      <input
        type="datetime-local"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        className="w-full p-3 border rounded mb-4 text-white"
      />

      {/* ADMIN BUTTON */}
      {isAdmin && (
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Save
        </button>
      )}

      {!isAdmin && (
        <p className="text-red-500 mt-2">
          Only admins can add/edit/delete job descriptions.
        </p>
      )}

      {/* JOB LIST */}
      <div className="mt-6 space-y-4">
        {savedEntries.map((entry) => (
          <div key={entry._id} className="p-4 border rounded">
            <p>{entry.desc}</p>

            <p className="text-sm mt-2">
              Skills: {entry.skills?.join(", ")}
            </p>

            {entry.endTime && (
              <p className="text-sm text-red-400">
                Expires: {new Date(entry.endTime).toLocaleString()}
              </p>
            )}

            {/* DELETE BUTTON */}
            {isAdmin && (
              <button
                onClick={() => handleDelete(entry._id)}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>

      <Popup message={popupMessage} onClose={() => setPopupMessage("")} />
    </div>
  );
}

export default JobDescription;