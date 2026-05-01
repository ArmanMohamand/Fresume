import React, { useState, useEffect } from "react";

function JobDescription({ setJobDesc, setRequiredSkills }) {
  const [desc, setDesc] = useState("");
  const [skills, setSkills] = useState("");
  const [endTime, setEndTime] = useState("");
  const [savedEntries, setSavedEntries] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleSave = () => {
    const newEntry = {
      desc,
      skills: skills.split(",").map((s) => s.trim()),
      timestamp: new Date().toLocaleString(),
      endTime: endTime ? new Date(endTime).getTime() : null,
    };

    if (editIndex !== null) {
      const updatedEntries = [...savedEntries];
      updatedEntries[editIndex] = newEntry;
      setSavedEntries(updatedEntries);
      setEditIndex(null);
    } else {
      setSavedEntries([newEntry, ...savedEntries]);
    }

    setJobDesc(newEntry.desc);
    setRequiredSkills(newEntry.skills);

    // Reset inputs
    setDesc("");
    setSkills("");
    setEndTime("");
  };

  const handleDelete = (index) => {
    setSavedEntries(savedEntries.filter((_, i) => i !== index));
    if (editIndex === index) {
      setEditIndex(null);
      setDesc("");
      setSkills("");
      setEndTime("");
    }
  };

  const handleEdit = (index) => {
    const entry = savedEntries[index];
    setDesc(entry.desc);
    setSkills(entry.skills.join(", "));
    setEndTime(
      entry.endTime ? new Date(entry.endTime).toISOString().slice(0, 16) : "",
    );
    setEditIndex(index);
  };

  // Auto-remove expired entries
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setSavedEntries((entries) =>
        entries.filter((e) => !e.endTime || e.endTime > now),
      );
    }, 1000 * 60); // check every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Job Description</h2>
      <textarea
        placeholder="Paste job description..."
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <input
        type="text"
        placeholder="Required skills (comma separated)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <input
        type="datetime-local"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleSave}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        {editIndex !== null ? "Update" : "Save"}
      </button>

      {savedEntries.length > 0 && (
        <div className="mt-6 space-y-4">
          {savedEntries.map((entry, idx) => {
            const isLatest = idx === 0;
            return (
              <div
                key={idx}
                className={`p-4 border rounded ${
                  isLatest
                    ? "border-green-500 bg-green-50 dark:bg-green-900"
                    : "bg-gray-50 dark:bg-gray-800"
                }`}
              >
                <h3 className="text-lg font-semibold mb-2">
                  Saved Job Description {isLatest && "(Latest)"}
                </h3>
                <p className="mb-2">{entry.desc}</p>
                <h4 className="font-semibold">Required Skills:</h4>
                <ul className="list-disc list-inside mb-2">
                  {entry.skills.map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
                <p className="text-sm text-gray-600 mb-1">
                  Saved at: {entry.timestamp}
                </p>
                {entry.endTime && (
                  <p className="text-sm text-red-600 mb-2">
                    Expires at: {new Date(entry.endTime).toLocaleString()}
                  </p>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(idx)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(idx)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default JobDescription;

