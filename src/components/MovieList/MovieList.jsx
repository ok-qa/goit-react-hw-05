import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <div className={css.wrapper}>
      <ul className={css.moviesList}>
        {movies.map((movie) => (
          <li key={movie.id} className={css.moviesItem}>
            <div className={css.itemWrapper}>
              <Link
                to={`/movies/${movie.id}`}
                state={location}
                className={css.movieLink}
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                      : `http://www.suryalaya.org/images/no_image.jpg`
                  }
                  alt="Poster"
                />
                <h4 className={css.movieTitle}>{movie.original_title}</h4>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
