import axios from "axios";
import { Movie } from "../types/movie";

interface MovieResponse {
  results: Movie[];
}

const BASE_URL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    Accept: "application/json",
  },
};

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<MovieResponse>(`${BASE_URL}/search/movie`, {
    ...options,
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
  });

  return response.data.results;
};
