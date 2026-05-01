import React, { useState } from "react";
import API from "../api";

function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      if (isSignup) {
        // Register new user
        const res = await API.post("/register", formData);
        setMessage(res.data.message);

        // Auto login after signup
        const loginRes = await API.post("/login", formData);
        const token = loginRes.data.access_token;
        localStorage.setItem("token", token);
        setToken(token);
      } else {
        // Login existing user
        const res = await API.post("/login", formData);
        const token = res.data.access_token;
        localStorage.setItem("token", token);
        setToken(token);
        setMessage("Login successful!");
      }
    } catch (err) {
      setMessage(
        "Error: " + (err.response?.data?.error || err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-lg font-bold mb-4">
          {isSignup ? "Sign Up" : "Login"}
        </h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <div className="relative mb-2">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-sm text-blue-600 hover:underline"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isSignup ? "Register & Login" : "Login"}
        </button>
        <p className="mt-2 text-sm text-gray-600">{message}</p>
        <p
          onClick={() => setIsSignup(!isSignup)}
          className="mt-4 text-sm text-blue-600 cursor-pointer hover:underline"
        >
          {isSignup ? "Already have an account? Login" : "New user? Sign up"}
        </p>
      </div>
    </div>
  );
}

export default Login;
