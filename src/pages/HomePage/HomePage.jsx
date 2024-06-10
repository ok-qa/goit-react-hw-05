import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../api-servise";
import ErrorMessage from "../../components/ErrorMsg/ErrorMsg";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
  const [movies, setMovies] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  console.log("trending movies", movies);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await getTrendingMovies();
        setMovies(movies);
        setIsLoading(true);
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
      {movies?.result.length > 0 && <MovieList movies={movies.result} />}
    </>
  );
};

export default HomePage;
