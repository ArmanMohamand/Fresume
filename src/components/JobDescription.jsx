// import React, { useState, useEffect } from "react";

// function Popup({ message, onClose }) {
//   useEffect(() => {
//     if (message) {
//       const timer = setTimeout(() => {
//         onClose();
//       }, 3000); // auto-close after 3 seconds
//       return () => clearTimeout(timer);
//     }
//   }, [message, onClose]);

//   if (!message) return null;
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-sm w-full">
//         <p className="text-gray-800 dark:text-gray-200 mb-4">{message}</p>
//         <button
//           onClick={onClose}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           OK
//         </button>
//       </div>
//     </div>
//   );
// }

// function JobDescription({ setJobDesc, setRequiredSkills, token }) {
//   const [desc, setDesc] = useState("");
//   const [skills, setSkills] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [savedEntries, setSavedEntries] = useState([]);
//   const [editIndex, setEditIndex] = useState(null);
//   const [popupMessage, setPopupMessage] = useState("");

//   const handleSave = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/jobdesc/save", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ desc, skills }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setPopupMessage(data.error); // non-admin popup
//         return;
//       }

//       setPopupMessage(data.message); // success popup
//       setJobDesc(desc);
//       setRequiredSkills(skills.split(",").map((s) => s.trim()));
//       setDesc("");
//       setSkills("");
//       setEndTime("");
//     } catch (err) {
//       console.error(err);
//       setPopupMessage("Something went wrong");
//     }
//   };

//   const handleDelete = async (index) => {
//     try {
//       const res = await fetch(
//         `http://localhost:5000/jobdesc/delete/${index}`,
//         {
//           method: "DELETE",
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         setPopupMessage(data.error); // non-admin popup
//         return;
//       }

//       setPopupMessage(data.message); // success popup
//       setSavedEntries(savedEntries.filter((_, i) => i !== index));
//     } catch (err) {
//       console.error(err);
//       setPopupMessage("Something went wrong");
//     }
//   };

//   const handleEdit = (index) => {
//     const entry = savedEntries[index];
//     setDesc(entry.desc);
//     setSkills(entry.skills.join(", "));
//     setEndTime(
//       entry.endTime ? new Date(entry.endTime).toISOString().slice(0, 16) : ""
//     );
//     setEditIndex(index);
//   };

//   // Auto-remove expired entries
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const now = Date.now();
//       setSavedEntries((entries) =>
//         entries.filter((e) => !e.endTime || e.endTime > now)
//       );
//     }, 1000 * 60);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Job Description</h2>
//       <textarea
//         placeholder="Paste job description..."
//         value={desc}
//         onChange={(e) => setDesc(e.target.value)}
//         className="w-full p-2 border rounded mb-4"
//       />
//       <input
//         type="text"
//         placeholder="Required skills (comma separated)"
//         value={skills}
//         onChange={(e) => setSkills(e.target.value)}
//         className="w-full p-2 border rounded mb-4"
//       />
//       <input
//         type="datetime-local"
//         value={endTime}
//         onChange={(e) => setEndTime(e.target.value)}
//         className="w-full p-2 border rounded mb-4"
//       />
//       <button
//         onClick={handleSave}
//         className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//       >
//         {editIndex !== null ? "Update" : "Save"}
//       </button>

//       {savedEntries.length > 0 && (
//         <div className="mt-6 space-y-4">
//           {savedEntries.map((entry, idx) => {
//             const isLatest = idx === 0;
//             return (
//               <div
//                 key={idx}
//                 className={`p-4 border rounded ${
//                   isLatest
//                     ? "border-green-500 bg-green-50 dark:bg-green-900"
//                     : "bg-gray-50 dark:bg-gray-800"
//                 }`}
//               >
//                 <h3 className="text-lg font-semibold mb-2">
//                   Saved Job Description {isLatest && "(Latest)"}
//                 </h3>
//                 <p className="mb-2">{entry.desc}</p>
//                 <h4 className="font-semibold">Required Skills:</h4>
//                 <ul className="list-disc list-inside mb-2">
//                   {entry.skills.map((skill, i) => (
//                     <li key={i}>{skill}</li>
//                   ))}
//                 </ul>
//                 <p className="text-sm text-gray-600 mb-1">
//                   Saved at: {entry.timestamp}
//                 </p>
//                 {entry.endTime && (
//                   <p className="text-sm text-red-600 mb-2">
//                     Expires at: {new Date(entry.endTime).toLocaleString()}
//                   </p>
//                 )}
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => handleEdit(idx)}
//                     className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(idx)}
//                     className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Tailwind Popup with auto-close */}
//       <Popup message={popupMessage} onClose={() => setPopupMessage("")} />
//     </div>
//   );
// }

// export default JobDescription;

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
        <p className="text-gray-800 dark:text-gray-200 mb-4">
          {message}
        </p>

        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          OK
        </button>
      </div>
    </div>
  );
}

function JobDescription({
  setJobDesc,
  setRequiredSkills,
}) {
  const [desc, setDesc] = useState("");
  const [skills, setSkills] = useState("");
  const [endTime, setEndTime] = useState("");
  const [savedEntries, setSavedEntries] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // ---------------- CHECK ADMIN ----------------
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        console.log("Decoded JWT:", decoded);

        setIsAdmin(decoded.role === "admin");
      } catch (err) {
        console.error("JWT Decode Error:", err);
      }
    }
  }, []);

  // ---------------- SAVE ----------------
  const handleSave = async () => {
    if (!isAdmin) {
      setPopupMessage(
        "Only admins can add job descriptions",
      );
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        "https://bresume.onrender.com/jobdesc/save",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            desc,
            skills,
            endTime,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        setPopupMessage(
          data.error || "Failed to save",
        );
        return;
      }

      const newEntry = {
        desc,
        skills: skills
          .split(",")
          .map((s) => s.trim()),
        timestamp: new Date().toLocaleString(),
        endTime: endTime
          ? new Date(endTime).getTime()
          : null,
      };

      if (editIndex !== null) {
        const updated = [...savedEntries];

        updated[editIndex] = newEntry;

        setSavedEntries(updated);

        setEditIndex(null);
      } else {
        setSavedEntries([
          newEntry,
          ...savedEntries,
        ]);
      }

      setJobDesc(desc);

      setRequiredSkills(
        skills
          .split(",")
          .map((s) => s.trim()),
      );

      localStorage.setItem("jobDesc", desc);

      localStorage.setItem(
        "requiredSkills",
        JSON.stringify(
          skills
            .split(",")
            .map((s) => s.trim()),
        ),
      );

      setPopupMessage(
        data.message || "Saved successfully",
      );

      setDesc("");
      setSkills("");
      setEndTime("");
    } catch (err) {
      console.error(err);

      setPopupMessage("Something went wrong");
    }
  };

  // ---------------- DELETE ----------------
  const handleDelete = async (index) => {
    if (!isAdmin) {
      setPopupMessage(
        "Only admins can delete job descriptions",
      );
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `https://bresume.onrender.com/jobdesc/delete/${index}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      if (!res.ok) {
        setPopupMessage(
          data.error || "Delete failed",
        );
        return;
      }

      setSavedEntries(
        savedEntries.filter(
          (_, i) => i !== index,
        ),
      );

      setPopupMessage(
        data.message || "Deleted successfully",
      );
    } catch (err) {
      console.error(err);

      setPopupMessage("Something went wrong");
    }
  };

  // ---------------- EDIT ----------------
  const handleEdit = (index) => {
    const entry = savedEntries[index];

    setDesc(entry.desc);

    setSkills(entry.skills.join(", "));

    setEndTime(
      entry.endTime
        ? new Date(entry.endTime)
            .toISOString()
            .slice(0, 16)
        : "",
    );

    setEditIndex(index);
  };

  // ---------------- AUTO REMOVE EXPIRED ----------------
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();

      setSavedEntries((entries) =>
        entries.filter(
          (e) =>
            !e.endTime ||
            e.endTime > now,
        ),
      );
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Job Description
      </h2>

      {/* ---------------- TEXTAREA ---------------- */}
      <textarea
        placeholder="Paste job description..."
        value={desc}
        onChange={(e) =>
          setDesc(e.target.value)
        }
        className="w-full p-3 border rounded mb-4 text-black"
        rows={6}
      />

      {/* ---------------- SKILLS ---------------- */}
      <input
        type="text"
        placeholder="Required skills (comma separated)"
        value={skills}
        onChange={(e) =>
          setSkills(e.target.value)
        }
        className="w-full p-3 border rounded mb-4 text-black"
      />

      {/* ---------------- END TIME ---------------- */}
      <input
        type="datetime-local"
        value={endTime}
        onChange={(e) =>
          setEndTime(e.target.value)
        }
        className="w-full p-3 border rounded mb-4 text-black"
      />

      {/* ---------------- SAVE BUTTON ---------------- */}
      {isAdmin && (
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {editIndex !== null
            ? "Update"
            : "Save"}
        </button>
      )}

      {/* ---------------- NON ADMIN MESSAGE ---------------- */}
      {!isAdmin && (
        <p className="text-red-500 font-medium">
          Only admins can add/edit/delete
          job descriptions.
        </p>
      )}

      {/* ---------------- SAVED ENTRIES ---------------- */}
      {savedEntries.length > 0 && (
        <div className="mt-6 space-y-4">
          {savedEntries.map(
            (entry, idx) => {
              const isLatest =
                idx === 0;

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
                    Saved Job
                    Description{" "}
                    {isLatest &&
                      "(Latest)"}
                  </h3>

                  <p className="mb-2">
                    {entry.desc}
                  </p>

                  <h4 className="font-semibold">
                    Required Skills:
                  </h4>

                  <ul className="list-disc list-inside mb-2">
                    {entry.skills.map(
                      (skill, i) => (
                        <li key={i}>
                          {skill}
                        </li>
                      ),
                    )}
                  </ul>

                  <p className="text-sm text-gray-600 mb-1">
                    Saved at:{" "}
                    {entry.timestamp}
                  </p>

                  {entry.endTime && (
                    <p className="text-sm text-red-600 mb-2">
                      Expires at:{" "}
                      {new Date(
                        entry.endTime,
                      ).toLocaleString()}
                    </p>
                  )}

                  {/* ---------------- ADMIN BUTTONS ---------------- */}
                  {isAdmin && (
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleEdit(idx)
                        }
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(idx)
                        }
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              );
            },
          )}
        </div>
      )}

      {/* ---------------- POPUP ---------------- */}
      <Popup
        message={popupMessage}
        onClose={() =>
          setPopupMessage("")
        }
      />
    </div>
  );
}

export default JobDescription;