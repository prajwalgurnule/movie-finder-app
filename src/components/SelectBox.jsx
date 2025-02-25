import React from "react";
import { sortBy, updateSortByType } from "../features";
import { useSelector, useDispatch } from "react-redux";

export const SelectBox = () => {
  const currentSortByType = useSelector(sortBy);
  const dispatch = useDispatch();

  const changeSelectHandler = (e) => {
    dispatch(updateSortByType(e.target.value));
  };

  return (
    <select
      value={currentSortByType}
      onChange={changeSelectHandler}
      className="p-2 rounded-lg border focus:ring-2 focus:ring-yellow-500 transition 
      bg-white text-black border-gray-300 hover:bg-gray-100 hover:border-yellow-500
      dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-yellow-400"
    >
      <option value="all">All</option>
      <option value="only_favourites">Only Favourites</option>
      <option value="other_movies_you_might_like">
        Other movies you might like
      </option>
    </select>
  );
};
