import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavourite,
  getAllFavourite,
  removeFromFavourite,
} from "../features";
import { ThemeContext } from "../features/ThemeContext";

export const MovieCard = ({ data }) => {
  const [priority, setPriority] = useState("lower");
  const favouriteMovies = useSelector(getAllFavourite);
  const dispatch = useDispatch();
  const { darkMode } = useContext(ThemeContext);

  const isCurrentDataInFavouriteMovies = favouriteMovies.find(
    ({ imdbID }) => imdbID === data.imdbID
  );

  useEffect(() => {
    if (isCurrentDataInFavouriteMovies) {
      setPriority(isCurrentDataInFavouriteMovies.priority);
    }
    if (data?.priority) {
      setPriority(data.priority);
    }
  }, [data.priority, isCurrentDataInFavouriteMovies]);

  const isMovieInFavourite = favouriteMovies.some(
    ({ imdbID }) => imdbID === data.imdbID
  );

  const favouriteClickHandler = () => {
    if (isMovieInFavourite) {
      dispatch(removeFromFavourite(data.imdbID));
    } else {
      dispatch(
        addToFavourite({
          ...data,
          priority,
        })
      );
    }
  };

  return (
    <div
      className={`max-w-[320px] mx-auto rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 ${
        darkMode
          ? "bg-gray-800 text-white hover:shadow-gray-600"
          : "bg-white text-gray-900 hover:shadow-lg"
      }`}
    >
      <Link to={`/movie/${data.imdbID}`} className="block">
        <div>
          <img
            width="300px"
            height="450px"
            className="w-full h-[500px] object-cover"
            loading="lazy"
            src={data.Poster}
            alt={data.Title}
          />
          <div className="p-4 flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h4 className="text-lg font-semibold truncate w-full" title={data.Title}>{data.Title}</h4>
              <p className="text-sm opacity-80 mt-1">{data.Year}</p>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                favouriteClickHandler();
              }}
              className={`ml-2 transition-colors duration-200 flex-shrink-0 ${
                isMovieInFavourite ? "text-red-500" : "text-gray-400 hover:text-red-500"
              }`}
            >
              <span className="material-icons-outlined">
                {isMovieInFavourite ? "favorite" : "favorite_border"}
              </span>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};



// import React, { useState, useEffect, useContext } from "react";
// import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   addToFavourite,
//   getAllFavourite,
//   removeFromFavourite,
//   updateMoviePriority,
// } from "../features";
// import { ThemeContext } from "../features/ThemeContext";

// export const MovieCard = ({ data }) => {
//   const [priority, setPriority] = useState("lower");
//   const favouriteMovies = useSelector(getAllFavourite);
//   const dispatch = useDispatch();
//   const { darkMode } = useContext(ThemeContext);

//   const isCurrentDataInFavouriteMovies = favouriteMovies.find(
//     ({ imdbID }) => imdbID === data.imdbID
//   );

//   useEffect(() => {
//     if (isCurrentDataInFavouriteMovies) {
//       setPriority(isCurrentDataInFavouriteMovies.priority);
//     }
//     if (data?.priority) {
//       setPriority(data.priority);
//     }
//   }, [data.priority, isCurrentDataInFavouriteMovies]);

//   const isMovieInFavourite = favouriteMovies.some(
//     ({ imdbID }) => imdbID === data.imdbID
//   );

//   const favouriteClickHandler = () => {
//     if (isMovieInFavourite) {
//       dispatch(removeFromFavourite(data.imdbID));
//     } else {
//       dispatch(
//         addToFavourite({
//           ...data,
//           priority,
//         })
//       );
//     }
//   };

//   const selectChangeHandler = (e) => {
//     setPriority(e.target.value);
//     if (isMovieInFavourite) {
//       dispatch(
//         updateMoviePriority({
//           imdbID: data.imdbID,
//           priority: e.target.value,
//         })
//       );
//     }
//   };

//   return (
//     <div
//       className={`max-w-[230px] mx-auto rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 ${
//         darkMode
//           ? "bg-gray-800 text-white hover:shadow-gray-600"
//           : "bg-white text-gray-900 hover:shadow-lg"
//       }`}
//     >
//       <Link to={`/movie/${data.imdbID}`}>
//         <div>
//           {/* Movie Poster */}
//           <img
//             width="200px"
//             height="320px"
//             className="w-full h-80 object-cover"
//             loading="lazy"
//             src={data.Poster}
//             alt={data.Title}
//           />
//           <div className="p-4">
//             <h4 className="text-lg font-semibold truncate">{data.Title}</h4>
//             <p className="text-sm mt-1 opacity-80">{data.Year}</p>
//           </div>
//         </div>
//       </Link>

//       {/* Favorite Section */}
//       <div className="p-4 flex items-center justify-between border-t border-gray-300 dark:border-gray-700">
//         {/* Priority Selector
//         <select
//           value={priority}
//           onChange={selectChangeHandler}
//           className={`rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-yellow-500 transition-all ${
//             darkMode
//               ? "bg-gray-700 text-white border-gray-600"
//               : "bg-gray-100 text-gray-900 border-gray-300"
//           }`}
//         >
//           <option value="lower">Lower</option>
//           <option value="higher">Higher</option>
//         </select> */}

//         {/* Favorite Button */}
//         <button
//           onClick={favouriteClickHandler}
//           className={`transition-colors duration-200 ${
//             isMovieInFavourite ? "text-red-500" : "text-gray-400 hover:text-red-500"
//           }`}
//         >
//           <span className="material-icons-outlined">
//             {isMovieInFavourite ? "favorite" : "favorite_border"}
//           </span>
//         </button>
//       </div>
//     </div>
//   );
// };
