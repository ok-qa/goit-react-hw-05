import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";
import { getMoviesByQuery } from "../../api-servise";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchMovies = async () => {
      const movieSearch = searchParams.get("title") ?? "";
      if (movieSearch) {
        setQuery(movieSearch);
        try {
          setIsLoading(true);
          setHasSearched(true);
          setError(false);
          const data = await getMoviesByQuery(movieSearch);
          setMovies(data);
        } catch (error) {
          console.error("Error fetching movies:", error);
          setError(true);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchMovies();
  }, [searchParams]);

  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setSearchParams({ title: query });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={css.search}>
        <input
          className={css.input}
          type="text"
          name="title"
          value={query}
          onChange={handleChange}
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>
      {error && <ErrorMessage />}
      {isLoading && <Loader />}
      {movies.length > 0 && <MovieList movies={movies} />}
      {movies.length === 0 && hasSearched && !isLoading && (
        <p>There are no movies that matched your request.</p>
      )}
    </>
  );
};

export default MoviesPage;
