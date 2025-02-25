import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import User from "../assets/user.png";
import { fetchAsyncMovies } from "../features";
import { ThemeContext } from "../features/ThemeContext";

export const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchTerm === "") return alert("Please enter a search term!");
    dispatch(fetchAsyncMovies(searchTerm));
    setSearchTerm("");
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } h-24 flex items-center justify-between py-0 px-10 shadow-lg transition-colors duration-300`}
    >
      {/* Brand */}
      <div className="text-xl font-bold">
        <Link to="/">
          <span>
            Movie <span className="text-yellow-500">Maze</span>
          </span>
        </Link>
      </div>

      {/* Search Bar */}
<div className="w-6/12 flex justify-center">
  <form
    className={`w-[70%] flex justify-center items-center rounded-lg shadow-md ${
      darkMode ? "bg-gray-900" : "bg-white"
    } p-1 border-2 ${
      darkMode ? "border-gray-700" : "border-gray-300"
    } transition-all duration-300`}
    onSubmit={submitHandler}
  >
    <input
      className={`w-full text-lg px-3 h-10 rounded-l-lg outline-none focus:ring-2 focus:ring-yellow-500 ${
        darkMode
          ? "bg-gray-800 text-white placeholder-gray-400 border-r border-gray-700"
          : "bg-white text-black placeholder-gray-500 border-r border-gray-300"
      }`}
      type="text"
      placeholder="Search Movies or Shows"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />

    <button
      className="py-0 px-4 h-10 bg-yellow-500 text-white rounded-r-lg hover:bg-yellow-600 transition-colors duration-200"
      type="submit"
    >
      🔍
    </button>
  </form>
</div>

       {/* User Image & Dark Mode Toggle */}
       <div className="flex items-center gap-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          {darkMode ? "🌙" : "☀️"}
        </button>
        {/* <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-500">
          <img src={User} alt="User" className="w-full h-full object-cover" />
        </div> */}
      </div>
    </div>

  );
};


//  {/* User Image & Dark Mode Toggle */}
//  <div className="flex items-center gap-4">
//  <button
//      onClick={() => dispatch(toggleDarkMode())}
//      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
//    >
//      {darkMode ? "🌙" : "☀️"}
//    </button>
//    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-500">
//      <img src={User} alt="User" className="w-full h-full object-cover" />
//    </div>
//  </div>
// </div>