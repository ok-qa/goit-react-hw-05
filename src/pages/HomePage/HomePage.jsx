import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../api-servise";
import ErrorMessage from "../../components/ErrorMsg/ErrorMsg";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const movies = await getTrendingMovies();
        setMovies(movies.result);
        setError(false);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <>
      {error && <ErrorMessage />}
      {isLoading && <Loader />}
      {movies.length > 0 && <MovieList movies={movies} />}
    </>
  );
};

export default HomePage;
