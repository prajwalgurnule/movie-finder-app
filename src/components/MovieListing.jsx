// import React from "react";
// import { useSelector } from "react-redux";
// import {
//   sortBy,
//   getAllMovies,
//   getLoaderInfo,
//   getAllFavourite,
// } from "../features/movies/movieSlice";
// import { getFilteredMovies } from "../utils/getFilteredData";
// import { MovieCard } from "./MovieCard";
// import { TailSpin } from "react-loader-spinner";
// import { SelectBox } from "./SelectBox";

// export const MovieListing = () => {
//   const movies = useSelector(getAllMovies);
//   const isLoading = useSelector(getLoaderInfo);
//   const sortByType = useSelector(sortBy);
//   const favouriteMovies = useSelector(getAllFavourite);

//   const filteredMovies = getFilteredMovies(movies, favouriteMovies, sortByType);

//   return (
//     <div>
//       {isLoading ? (
//         <TailSpin color="#00BFFF" height={80} width={80} />
//       ) : (
//         <>
//           <div className="my-5 mx-0">
//             <div className="mr-3 flex gap-4 justify-between items-center">
//               <h2 className="text-font-secondary text-2xl font-semibold mt-2 mr-3">
//                 Movies
//               </h2>
//               <SelectBox />
//             </div>
//             <div className="grid-layout">
//               {filteredMovies.map((movie, index) => (
//                 <MovieCard key={index} data={movie} />
//               ))}
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };


import React, { useContext } from "react";
import { useSelector } from "react-redux";
import {
  sortBy,
  getAllMovies,
  getLoaderInfo,
  getAllFavourite,
} from "../features/movies/movieSlice";
import { getFilteredMovies } from "../utils/getFilteredData";
import { MovieCard } from "./MovieCard";
import { TailSpin } from "react-loader-spinner";
import { SelectBox } from "./SelectBox";
import { ThemeContext } from "../features/ThemeContext";

export const MovieListing = () => {
  const { darkMode } = useContext(ThemeContext);
  const movies = useSelector(getAllMovies);
  const isLoading = useSelector(getLoaderInfo);
  const sortByType = useSelector(sortBy);
  const favouriteMovies = useSelector(getAllFavourite);

  const filteredMovies = getFilteredMovies(movies, favouriteMovies, sortByType);

  return (
    <div
      className={`px-5 py-8 min-h-screen transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">🎬 Trending Movies</h2>

       {/* Select Box with Adaptive Styles */}
        <SelectBox
          className={`border rounded-lg px-3 py-1 focus:ring-2 focus:ring-yellow-500 transition-all duration-300 ${
            darkMode
              ? "bg-gray-800 text-white border-gray-700 hover:bg-gray-700 hover:border-yellow-400"
              : "bg-white text-black border-gray-300 hover:bg-gray-100 hover:border-yellow-500"
          }`}
        />

      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <TailSpin
            color="#facc15"
            height={100}
            width={100}
            ariaLabel="loading"
          />
        </div>
      ) : filteredMovies.length > 0 ? (
        // Movie Cards Grid
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies.map((movie, index) => (
            <MovieCard
              key={index}
              data={movie}
              className={`hover:scale-105 transition-transform duration-300 rounded-xl overflow-hidden shadow-lg ${
                darkMode
                  ? "bg-gray-800 text-white hover:shadow-gray-700"
                  : "bg-white text-black hover:shadow-lg"
              }`}
            />
          ))}
        </div>
      ) : (
        // No Movies Found State
        <div className="flex flex-col justify-center items-center min-h-[40vh] text-gray-600 dark:text-gray-300">
          <h3 className="text-xl font-medium">No movies found 😞</h3>
          <p className="mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

