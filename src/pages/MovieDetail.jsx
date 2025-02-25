import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncMoviesOrShowsDetails,
  getSelectedMovieOrShow,
  removeSelectedMovieOrShow,
} from "../features";
import { TailSpin } from "react-loader-spinner";
import { ThemeContext } from "../features/ThemeContext";

export const MovieDetail = () => {
  const { imdbID } = useParams();
  const dispatch = useDispatch();
  const data = useSelector(getSelectedMovieOrShow);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    dispatch(fetchAsyncMoviesOrShowsDetails(imdbID));
    return () => {
      dispatch(removeSelectedMovieOrShow());
    };
  }, [dispatch, imdbID]);

  return (
    <div
      className={`flex flex-col lg:flex-row gap-10 p-8 min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Loading Spinner */}
      {Object.keys(data).length === 0 ? (
        <div className="flex justify-center items-center w-full min-h-screen">
          <TailSpin color={darkMode ? "#facc15" : "#3b82f6"} height={80} width={80} />
        </div>
      ) : (
        <>
          {/* Movie Poster Section */}
          <div className="flex-shrink-0 rounded-2xl overflow-hidden shadow-lg max-w-xs mx-auto lg:mx-0">
            <img
              src={data.Poster}
              alt={data.Title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Movie Information Section */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">{data.Title}</h1>

            {/* Ratings and Stats */}
            <div className="flex flex-wrap gap-4 mb-6">
              {[
                { label: "IMDB Rating", value: data.imdbRating, icon: "star" },
                { label: "IMDB Votes", value: data.imdbVotes, icon: "thumb_up" },
                { label: "Runtime", value: data.Runtime, icon: "videocam" },
                { label: "Year", value: data.Year, icon: "calendar_month" },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow ${
                    darkMode
                      ? "bg-gray-800 text-yellow-400"
                      : "bg-white text-gray-800"
                  }`}
                >
                  <span className="material-icons-outlined">{item.icon}</span>
                  <div className="text-sm font-medium">
                    {item.label}: <span className="font-semibold">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Movie Plot */}
            <p className="mb-6 text-lg leading-7 opacity-80">{data.Plot}</p>

            {/* Detailed Movie Info */}
            <div className="space-y-3">
              <InfoRow label="Director" value={data.Director} darkMode={darkMode} />
              <InfoRow label="Stars" value={data.Actors} darkMode={darkMode} />
              <InfoRow label="Genres" value={data.Genre} darkMode={darkMode} />
              <InfoRow label="Languages" value={data.Language} darkMode={darkMode} />
              <InfoRow label="Awards" value={data.Awards} darkMode={darkMode} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Reusable Info Row Component
const InfoRow = ({ label, value, darkMode }) => {
  return (
    <div
      className={`flex justify-between items-center p-3 rounded-lg ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      } shadow-sm`}
    >
      <span className="font-medium">{label}:</span>
      <span className="opacity-80">{value}</span>
    </div>
  );
};
