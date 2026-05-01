// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

function Navbar({ handleLogout, toggleTheme, theme }) {
  return (
    <nav className="flex items-center justify-between  dark:bg-gray-800 px-6 py-3">
      <div className="flex space-x-6">
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
      <div className="flex space-x-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
