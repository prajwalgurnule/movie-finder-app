import React, { useContext } from "react";
import { ThemeContext } from "../features/ThemeContext";

export const Footer = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <footer
      className={`w-full py-6 mt-10 border-t transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 text-gray-300 border-gray-700 shadow-lg"
          : "bg-gray-100 text-gray-700 border-gray-300 shadow-md"
      }`}
    >
      <div className="container mx-auto flex flex-col items-center space-y-3">
        {/* App Name */}
        <h2 className="text-xl font-semibold tracking-wider">
          🎬 MovieMaze
        </h2>
        
        {/* Description */}
        <p className="text-sm opacity-80">
          Your go-to app for discovering trending movies and shows.
        </p>

        {/* Copyright */}
        <p className="text-xs opacity-60">
          © {new Date().getFullYear()} MovieMaze, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
