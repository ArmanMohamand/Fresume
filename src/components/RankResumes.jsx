import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import toast from "react-hot-toast";

function RankResumes({ jobDesc, requiredSkills, setSelectedCandidate }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRank = async () => {
    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      const res = await API.post(
        "/rank",
        {
          job_description: jobDesc,
          required_skills: requiredSkills,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setResults(res.data.ranked || []);
      toast.success("Ranking completed");
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        toast.error("Session expired. Please login again.");
        navigate("/login");
        return;
      }
      toast.error(err.response?.data?.error || "Ranking failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (candidate) => {
    setSelectedCandidate(candidate);
    navigate("/analytics", { state: { candidate } });
  };

  const handleDelete = async (e, resumeId) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");

    try {
      await API.delete(`/delete_resume/${resumeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResults(results.filter((x) => x.resume_id !== resumeId));
      toast.success("Resume deleted");
    } catch (err) {
      toast.error(err.response?.data?.error || "Delete failed");
    }
  };

  return (
    <div className="p-4 sm:p-6 text-white">
      {/* INFO */}
      <div className="mb-6 p-4 rounded-xl bg-blue-500/20 border border-blue-400">
        <h2 className="text-lg sm:text-xl font-bold mb-2">
          How to Use This Page
        </h2>
        <p>
          1️⃣ Click <b>Rank Button</b> to rank resumes
        </p>
        <p className="mt-1">2️⃣ Click candidate card to open analytics</p>
        <p className="mt-1">3️⃣ View charts, score & skills</p>
      </div>

      <button
        onClick={handleRank}
        className="bg-blue-500 px-4 sm:px-5 py-2 rounded font-semibold hover:bg-blue-600 w-full sm:w-auto"
      >
        {loading ? "Ranking..." : "Rank Resumes"}
      </button>

      <div className="mt-6 space-y-4">
        {results.map((r, i) => (
          <div
            key={r.resume_id}
            onClick={() => handleSelect(r)}
            className="p-4 sm:p-5 border rounded-xl bg-gray-800 cursor-pointer hover:scale-[1.02] transition"
          >
            {i === 0 && <p>🏆 Best Candidate</p>}
            {i === 1 && <p>🥈 2nd Best</p>}
            {i === 2 && <p>🥉 3rd Best</p>}

            <h3 className="font-bold text-base sm:text-lg mt-1">
              {r.metadata?.name || "Unknown User"}
            </h3>

            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              {r.filename || "Resume.pdf"}
            </p>

            <p className="text-sm sm:text-base">Score: {r.score ?? 0}</p>
            <p className="mt-2 text-sm sm:text-base">
              Skills: {r.skills?.join(", ") || "None"}
            </p>
            <p className="text-sm sm:text-base">Email: {r.email || "N/A"}</p>

            <div className="mt-3">
              <a
                href={r.file_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg inline-block text-sm sm:text-base"
              >
                View Resume
              </a>
            </div>

            <p className="text-green-400 text-xs sm:text-sm mt-2">
              Click to view Analytics →
            </p>

            <button
              onClick={(e) => handleDelete(e, r.resume_id)}
              className="mt-3 bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-sm sm:text-base"
            >
              Delete Resume
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RankResumes;
