import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchAsyncMovies } from "../features";
import { ThemeContext } from "../features/ThemeContext";
import { useAuth } from "../features/AuthContext";
// import User from "../assets/user.png";
import { searchMovies } from "../features/movieAPI"; // Import movie API

export const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Handle Search Input
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.length > 2) {
      const results = await searchMovies(query);
      setSuggestions(results || []);
    } else {
      setSuggestions([]);
    }
  };

  // Submit Search
  const submitHandler = (e) => {
    e.preventDefault();
    if (searchTerm === "") return alert("Please enter a search term!");
    dispatch(fetchAsyncMovies(searchTerm));
    setSearchTerm("");
    setSuggestions([]); // Clear suggestions after search
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } h-24 flex items-center justify-between py-0 px-10 shadow-lg transition-colors duration-300`}
    >
      <div className="text-xl font-bold">
        <Link to="/">
          <span>
            Movie <span className="text-yellow-500">Maze</span>
          </span>
        </Link>
      </div>

      {/* Search Bar Section */}
      <div className="relative w-6/12 flex justify-center">
        <form
          className={`relative w-[70%] flex justify-center items-center rounded-lg shadow-md ${
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
            onChange={handleSearchChange}
          />

          <button
            className="py-0 px-4 h-10 bg-yellow-500 text-white rounded-r-lg hover:bg-yellow-600 transition-colors duration-200"
            type="submit"
          >
            🔍
          </button>
        </form>

        {/* Search Suggestions */}
        {suggestions.length > 0 && (
          <div className="absolute top-full mt-1 left-0 w-[70%] bg-white text-black shadow-lg rounded-lg overflow-hidden border border-gray-300 z-50">
            {suggestions.map((movie, index) => (
              <Link
                key={index}
                to={`/movie/${movie.imdbID}`}
                className="flex items-center gap-2 p-2 hover:bg-gray-200 transition-all"
                onClick={() => setSuggestions([])}
              >
                <img src={movie.Poster} alt={movie.Title} className="w-10 h-14 object-cover rounded-md" />
                <span className="text-sm">{movie.Title} ({movie.Year})</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* User & Logout */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          {darkMode ? "🌙" : "☀️"}
        </button>

        {isAuthenticated ? (
          <>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
            <div className="relative">
              {/* <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-500 cursor-pointer">
                <img src={User} alt="User" className="w-full h-full object-cover" />
              </div> */}
            </div>
          </>
        ) : (
          <Link to="/login" className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-600 transition">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};
