import { Suspense, useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { getMovieDetails } from "../../api-servise";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMsg/ErrorMsg";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const goBack = useRef(location.state ?? "/movies");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await getMovieDetails(movieId);
        setMovie(movieData);
        setIsLoading(true);
        setError(false);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovie();
  }, [movieId]);

  return (
    <div>
      <Link to={goBack.current} className={css.goBackLink}>
        Go back
      </Link>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}

      {movie && (
        <div className={css.detailsContainer}>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                : `http://www.suryalaya.org/images/no_image.jpg`
            }
            alt="Poster"
          />
          <h4 className={css.movieTitle}>{movie.title}</h4>
          <p className={css.titleItem}>Overview: {movie.overview}</p>
        </div>
      )}
      {!isLoading && !error && (
        <ul className={css.movieDetailsNavigation}>
          <li>
            <NavLink className={css.movieDetails} to="cast">
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink className={css.movieDetails} to="reviews">
              Reviews
            </NavLink>
          </li>
        </ul>
      )}
      <Suspense fallback={<div>Loading details...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
