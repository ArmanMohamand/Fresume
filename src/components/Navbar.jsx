import React from "react";
import { Link } from "react-router-dom";

function Navbar({ handleLogout }) {
  return (
    <nav className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 px-4 sm:px-6 py-3">
      <div className="flex flex-wrap gap-4 sm:gap-6 text-sm sm:text-base">
        <Link to="/upload" className="hover:underline">
          Upload
        </Link>
        <Link to="/jobdesc" className="hover:underline">
          Job Description
        </Link>
        <Link to="/rank" className="hover:underline">
          Rank
        </Link>
        <Link to="/analytics" className="hover:underline">
          Analytics
        </Link>
      </div>
      <div className="flex-shrink-0">
        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
