"use client";
import React, { useEffect, useMemo } from "react";
import { MovieListing } from "../components";
import { useDispatch } from "react-redux";
import { fetchAsyncMovies } from "../features";

export const Home = () => {
  const dispatch = useDispatch();

  // Memoize the movie list to prevent re-creation on every render
  const movieList = useMemo(
    () => ["Inception", "Avenger", "Titanic", "Naruto", "Joker", "Avatar", "Marvels"],
    []
  );

  // Memoize the random movie selection to avoid unnecessary changes
  const randomMovie = useMemo(() => {
    return movieList[Math.floor(Math.random() * movieList.length)];
  }, [movieList]);

  useEffect(() => {
    dispatch(fetchAsyncMovies(randomMovie));
  }, [dispatch, randomMovie]); // No warning now 🎉

  return <MovieListing />;
};
