import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function Popup({ message, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => onClose(), 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 max-w-sm w-full">
        <p className="text-gray-800 dark:text-gray-200 mb-4 text-sm sm:text-base">
          {message}
        </p>
        <button
          onClick={onClose}
          className="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded text-sm sm:text-base"
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
  const [editId, setEditId] = useState(null);
  const [loadingJobs, setLoadingJobs] = useState(true);

  const API_URL = "https://bresume.onrender.com";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setIsAdmin(decoded.role === "admin");
    }
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem("token");
      try {
        setLoadingJobs(true);
        const res = await fetch(`${API_URL}/jobdesc/list`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setSavedEntries(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingJobs(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = savedEntries.filter((job) => {
    if (isAdmin) return true;
    if (!job.endTime) return true;
    return new Date(job.endTime) > new Date();
  });

  const formatSkills = (skills) => {
    if (Array.isArray(skills)) return skills.join(", ");
    if (typeof skills === "string") return skills;
    return "";
  };

  const handleSave = async () => {
    if (!isAdmin) return;
    const token = localStorage.getItem("token");
    try {
      const url = editId
        ? `${API_URL}/jobdesc/update/${editId}`
        : `${API_URL}/jobdesc/save`;
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          desc,
          skills: skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          endTime,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPopupMessage(data.error || "Error");
        return;
      }
      if (editId) {
        setSavedEntries((prev) =>
          prev.map((j) => (j._id === editId ? data.job : j)),
        );
        setPopupMessage("Updated successfully");
      } else {
        setSavedEntries((prev) => [data.job, ...prev]);
        setPopupMessage("Saved successfully");
      }
      setEditId(null);
      setDesc("");
      setSkills("");
      setEndTime("");
    } catch (err) {
      console.error(err);
      setPopupMessage("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/jobdesc/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      let data = null;
      try {
        data = await res.json();
      } catch {}
      if (!res.ok) {
        setPopupMessage(data?.error || "Delete failed");
        return;
      }
      setSavedEntries((prev) => prev.filter((j) => j._id !== id));
      setPopupMessage("Deleted successfully");
    } catch (err) {
      console.error(err);
      setPopupMessage("Delete failed");
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-lg sm:text-2xl font-bold mb-4">Job Description</h2>
      {isAdmin && (
        <>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full p-2 sm:p-3 border rounded mb-4 bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
            placeholder="Paste job description..."
          />
          <input
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full p-2 sm:p-3 border rounded mb-4 bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
            placeholder="Skills (comma separated)"
          />
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full p-2 sm:p-3 border rounded mb-4 bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
          />
          <button
            onClick={handleSave}
            className="px-3 sm:px-4 py-2 bg-green-500 text-white rounded text-sm sm:text-base"
          >
            {editId ? "Update" : "Save"}
          </button>
        </>
      )}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {loadingJobs && (
          <p className="text-gray-500 text-sm sm:text-base">Loading jobs...</p>
        )}
        {!loadingJobs && filteredJobs.length === 0 && (
          <p className="text-gray-500 text-sm sm:text-base">
            No job descriptions found
          </p>
        )}
        {filteredJobs.map((entry) => {
          const isExpired =
            entry.endTime && new Date(entry.endTime) < new Date();
          return (
            <div key={entry._id} className="p-3 sm:p-4 border rounded relative">
              {isExpired && (
                <span className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-xs rounded">
                  Expired
                </span>
              )}
              {/* <div className="p-3 sm:p-4 border rounded relative">
                <p className="w-full text-sm sm:text-base text-left">
                  {entry.desc}
                </p>
                <p className="text-xs sm:text-sm mt-2">
                  <strong>Skills:</strong>{" "}
                  {formatSkills(entry.skills) || "None"}
                </p>
              </div> */}
              <div className="w-full">
                <div className="p-3 sm:p-4 border rounded bg-gray-800">
                  <p className="w-full text-sm sm:text-base text-left">
                    {entry.desc}
                  </p>
                </div>
              </div>

              {entry.endTime && (
                <p className="text-xs sm:text-sm text-yellow-500">
                  Expires: {new Date(entry.endTime).toLocaleString()}
                </p>
              )}
              {isAdmin ? (
                !isExpired ? (
                  <button
                    onClick={() => {
                      setJobDesc(entry.desc);
                      setRequiredSkills(entry.skills || []);
                    }}
                    className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-xs sm:text-sm"
                  >
                    Use
                  </button>
                ) : (
                  <p className="mt-2 text-red-500 text-xs sm:text-sm">
                    Cannot use expired job
                  </p>
                )
              ) : (
                <p className="mt-2 text-gray-400 text-xs sm:text-sm">
                  Admin only access
                </p>
              )}
              {isAdmin && (
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => {
                      setEditId(entry._id);
                      setDesc(entry.desc);
                      setSkills(formatSkills(entry.skills));
                      setEndTime(entry.endTime || "");
                    }}
                    className="px-3 py-1 bg-yellow-500 text-white rounded text-xs sm:text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(entry._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded text-xs sm:text-sm"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <Popup message={popupMessage} onClose={() => setPopupMessage("")} />
    </div>
  );
}
export default JobDescription;
