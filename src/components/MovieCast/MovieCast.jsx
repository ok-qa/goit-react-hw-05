import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../api-servise";
import ErrorMessage from "../ErrorMsg/ErrorMsg";
import Loader from "../Loader/Loader";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getCast = async () => {
      try {
        setIsLoading(true);
        const movieCast = await getMovieCast(movieId);
        setCast(movieCast);

        setError(false);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getCast();
  }, [movieId]);

  return (
    <>
      {error && <ErrorMessage />}
      {isLoading && <Loader />}
      {!isLoading && !error && cast?.cast.length === 0 && (
        <p className={css.noCastText}>
          We don't have any cast information for this movie.
        </p>
      )}
      <ul className={css.castList}>
        {cast?.cast.length > 0 &&
          cast.cast.map((cast) => (
            <li key={cast.id}>
              <img
                src={
                  cast.profile_path
                    ? `https://image.tmdb.org/t/p/w300${cast.profile_path}`
                    : `http://www.suryalaya.org/images/no_image.jpg`
                }
                alt={cast.name}
                width={200}
                height={300}
              />
              <div className={css.wrapperText}>
                <h4>{cast.name}</h4>
                <p>{cast.character}</p>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

export default MovieCast;
