const API_KEY = "8d2ab62c"; // Replace with your OMDB API Key
const BASE_URL = "https://www.omdbapi.com/";

// Fetch movies or TV shows based on search query
export const searchMovies = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}?s=${query}&apikey=${API_KEY}`);
    const data = await response.json();
    
    if (data.Response === "True") {
      return data.Search; // Returns an array of movie objects
    } else {
      return []; // Returns empty array if no results found
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

// Fetch detailed information about a movie by IMDb ID
export const getMovieDetails = async (imdbID) => {
  try {
    const response = await fetch(`${BASE_URL}?i=${imdbID}&plot=full&apikey=${API_KEY}`);
    const data = await response.json();
    
    if (data.Response === "True") {
      return data; // Returns movie details
    } else {
      return null; // Returns null if no movie found
    }
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};

// Fetch top trending movies (Example: Using a predefined keyword like "Marvel")
export const getTrendingMovies = async () => {
  return searchMovies("Marvel"); // Replace "Marvel" with another keyword for different results
};
