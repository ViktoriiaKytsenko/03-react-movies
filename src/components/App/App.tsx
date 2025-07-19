import { useState } from "react";
import { SearchBar } from "../SearchBar";
import { fetchMovies } from "../../services/movieService";
import { Movie } from "../../types/movie";
import { MovieGrid } from "../MovieGrid/MovieGrid";
import { MovieModal } from "../MovieModal/MovieModal";
import { Loader } from "../Loader/Loader";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(false);
    setMovies([]);

    try {
      const results = await fetchMovies(query);

      if (results.length === 0) {
        toast("No movies found for your request.");
      }

      setMovies(results);
    } catch (error) {
      console.error("Помилка під час пошуку фільмів:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />

      {loading && <Loader />}
      {error && <ErrorMessage />}

      {!loading && !error && movies.length > 0 && (
        <MovieGrid
          movies={movies}
          onSelect={(movie) => setSelectedMovie(movie)}
        />
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}

export default App;
