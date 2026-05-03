// import React, { useState } from "react";
// import API from "../api"; // axios instance with baseURL set to https://bresume.onrender.com

// function Login({ setToken }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [isSignup, setIsSignup] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = async () => {
//     try {
//       if (isSignup) {
//         if (password !== confirmPassword) {
//           setMessage("Error: Passwords do not match");
//           return;
//         }
//         // Register new user with JSON
//         const res = await API.post("/register", {
//           username,
//           password,
//         });
//         setMessage(res.data.message);

//         // Auto login after signup
//         const loginRes = await API.post("/login", {
//           username,
//           password,
//         });
//         const token = loginRes.data.access_token;
//         localStorage.setItem("token", token);
//         setToken(token);
//       } else {
//         // Login existing user with JSON
//         const res = await API.post("/login", {
//           username,
//           password,
//         });
//         const token = res.data.access_token;
//         localStorage.setItem("token", token);
//         setToken(token);
//         setMessage("Login successful!");
//       }
//     } catch (err) {
//       setMessage(
//         "Error: " +
//           (err.response?.data?.error ||
//             err.response?.data?.message ||
//             err.message)
//       );
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-black via-red-800 to-gray-900">
//       <div className="bg-white p-8 rounded-lg shadow-xl w-96 animate-fadeIn">
//         <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">
//           {isSignup ? "Create Your Account" : "Welcome Back"}
//         </h1>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="w-full mb-3 p-2 border rounded"
//         />
//         <div className="relative mb-3">
//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-2 border rounded pr-10"
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-2 top-2 text-sm text-blue-600 hover:underline"
//           >
//             {showPassword ? "Hide" : "Show"}
//           </button>
//         </div>
//         {isSignup && (
//           <input
//             type="password"
//             placeholder="Confirm Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="w-full mb-3 p-2 border rounded"
//           />
//         )}
//         <button
//           onClick={handleSubmit}
//           className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
//         >
//           {isSignup ? "Register & Login" : "Login"}
//         </button>
//         <p className="mt-3 text-sm text-gray-600">{message}</p>
//         <p
//           onClick={() => setIsSignup(!isSignup)}
//           className="mt-4 text-sm text-blue-600 cursor-pointer hover:underline"
//         >
//           {isSignup ? "Already have an account? Login" : "New user? Sign up"}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import API from "../api";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); // only used at signup
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (isSignup) {
        if (password !== confirmPassword) {
          setMessage("Error: Passwords do not match");
          setLoading(false);
          return;
        }
        await API.post("/register", { email, username, password });
        setMessage("Registration successful!");

        const loginRes = await API.post("/login", { email, password });
        const token = loginRes.data.access_token;
        localStorage.setItem("token", token);
        setToken(token);
      } else {
        const res = await API.post("/login", { email, password });
        const token = res.data.access_token;
        localStorage.setItem("token", token);
        setToken(token);
        setMessage("Login successful!");
      }
    } catch (err) {
      setMessage(
        "Error: " +
          (err.response?.data?.error ||
            err.response?.data?.message ||
            err.message),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-black via-red-800 to-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96 animate-fadeIn">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">
          {isSignup ? "Create Your Account" : "Welcome Back"}
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        {isSignup && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />
        )}

        <div className="relative mb-3">
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

        {isSignup && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-2 rounded transition duration-300 ${
            loading
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {loading ? "Processing..." : isSignup ? "Register & Login" : "Login"}
        </button>

        <p className="mt-3 text-sm text-gray-600">{message}</p>
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
