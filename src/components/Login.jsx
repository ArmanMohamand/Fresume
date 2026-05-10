// import React, { useState } from "react";
// import API from "../api";

// function Login({ setToken }) {
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [isSignup, setIsSignup] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     if (!email) {
//       setMessage("Email is required");
//       return;
//     }
//     if (!password) {
//       setMessage("Password is required");
//       return;
//     }
//     if (password.length < 6) {
//       setMessage("Password must be at least 6 characters");
//       return;
//     }
//     setLoading(true);
//     try {
//       if (isSignup) {
//         if (password !== confirmPassword) {
//           setMessage("Passwords do not match");
//           setLoading(false);
//           return;
//         }
//         await API.post("/register", { email, username, password });
//         setMessage("Registration successful!");

//         const loginRes = await API.post("/login", { email, password });
//         const token = loginRes.data.access_token;
//         localStorage.setItem("token", token);
//         setToken(token);
//       } else {
//         const res = await API.post("/login", { email, password });
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
//             err.message),
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-black via-red-800 to-gray-900">
//       <div className="bg-white p-8 rounded-lg shadow-xl w-96 animate-fadeIn">
//         <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">
//           {isSignup ? "Create Your Account" : "Welcome Back"}
//         </h1>

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full mb-3 p-2 border rounded"
//         />

//         {isSignup && (
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="w-full mb-3 p-2 border rounded"
//           />
//         )}

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
//           disabled={loading}
//           className={`w-full py-2 rounded transition duration-300 ${
//             loading
//               ? "bg-gray-400 text-white cursor-not-allowed"
//               : "bg-blue-500 text-white hover:bg-blue-600"
//           }`}
//         >
//           {loading ? "Processing..." : isSignup ? "Register & Login" : "Login"}
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  const handleSubmit = async () => {
    if (!email) {
      setMessage("Email is required");
      return;
    }
    if (!isValidEmail(email)) {
      setMessage("Please enter a valid email address");
      return;
    }
    if (!password) {
      setMessage("Password is required");
      return;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    // ✅ New username validation for signup
    if (isSignup && !username.trim()) {
      setMessage("Username is required");
      return;
    }

    setLoading(true);
    try {
      if (isSignup) {
        if (password !== confirmPassword) {
          setMessage("Passwords do not match");
          setLoading(false);
          return;
        }
        await API.post("/register", {
          email: email.trim(),
          username: username.trim(),
          password,
        });
        setMessage("Registration successful!");

        const loginRes = await API.post("/login", {
          email: email.trim(),
          password,
        });
        const token = loginRes.data.access_token;
        localStorage.setItem("token", token);
        setToken(token);
      } else {
        const res = await API.post("/login", {
          email: email.trim(),
          password,
        });
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black via-red-800 to-gray-900 px-4">
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-xl w-full max-w-md animate-fadeIn">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-6 text-blue-700">
          {isSignup ? "Create Your Account" : "Welcome Back"}
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {!email && message === "Email is required" && (
          <p className="text-red-500 text-sm mt-1">Email is required</p>
        )}

        {isSignup && (
          <>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mb-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {isSignup &&
              !username.trim() &&
              message === "Username is required" && (
                <p className="text-red-500 text-sm mt-1">
                  Username is required
                </p>
              )}
          </>
        )}

        <div className="relative mb-2">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            aria-label="Toggle password visibility"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-sm text-blue-600 hover:underline"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {!password && message === "Password is required" && (
          <p className="text-red-500 text-sm mt-1">Password is required</p>
        )}
        {password.length > 0 &&
          password.length < 6 &&
          message === "Password must be at least 6 characters" && (
            <p className="text-red-500 text-sm mt-1">
              Password must be at least 6 characters
            </p>
          )}

        {isSignup && (
          <>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mb-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {password !== confirmPassword &&
              message === "Passwords do not match" && (
                <p className="text-red-500 text-sm mt-1">
                  Passwords do not match
                </p>
              )}
          </>
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

        <p className="mt-3 text-sm text-gray-600 break-words">
          {message &&
            ![
              "Email is required",
              "Password is required",
              "Password must be at least 6 characters",
              "Passwords do not match",
              "Username is required",
            ].includes(message) &&
            message}
        </p>
        <p
          onClick={() => setIsSignup(!isSignup)}
          className="mt-4 inline-block px-3 py-1 text-sm font-medium text-blue-600 
             bg-blue-50 rounded cursor-pointer hover:bg-blue-100 hover:text-blue-800 
             transition duration-200"
        >
          {isSignup ? "Already have an account? Login" : "New user? Sign up"}
        </p>
      </div>
    </div>
  );
}

export default Login;
