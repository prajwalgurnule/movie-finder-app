import React, { useState, useContext } from "react";
import { useAuth } from "../features/AuthContext";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../features/ThemeContext"; // Import ThemeContext

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext); // Access dark mode state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    login();
    navigate("/");
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`p-8 rounded-xl shadow-lg w-96 transition-colors duration-300 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2 className="text-2xl font-bold text-center text-yellow-400 mb-4">
          Welcome Back 🎬
        </h2>
        <form onSubmit={handleLogin} className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            className={`mb-3 p-2 rounded focus:ring-2 focus:ring-yellow-400 transition-colors ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className={`mb-3 p-2 rounded focus:ring-2 focus:ring-yellow-400 transition-colors ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-yellow-500 py-2 rounded text-gray-900 font-bold hover:bg-yellow-600 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm mt-3">
          New here?{" "}
          <a
            href="/register"
            className="text-yellow-400 hover:underline transition"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};
