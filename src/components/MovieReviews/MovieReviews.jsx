import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../api-servise";
import ErrorMessage from "../ErrorMsg/ErrorMsg";
import Loader from "../Loader/Loader";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movieReviews, setMovieReviews] = useState();
  const { movieId } = useParams();
  useEffect(() => {
    const getReviews = async () => {
      try {
        const reviews = await getMovieReviews(movieId);
        setMovieReviews(reviews);
        setIsLoading(true);
        setError(false);
      } catch (error) {
        console.error("error", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getReviews();
  }, [movieId]);

  console.log("reviews: ", movieReviews);
  return (
    <>
      {error && <ErrorMessage />}
      {isLoading && <Loader />}
      {!isLoading && !error && movieReviews?.results.length === 0 && (
        <p className={css.noReviewsText}>
          We don't have any reviews for `${movieId}`.
        </p>
      )}
      <ul>
        {movieReviews?.results.length > 0 &&
          movieReviews?.results.map((review) => (
            <li key={review.id}>
              <div className={css.reviewTitle}>
                <img
                  className={css.image}
                  src={`https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}`}
                  alt={review.author}
                />
                <h3>{review.author}</h3>
              </div>
              <div className={css.reviewText}>
                <p>{review.content}</p>
                <p>Rating: {review.author_details.rating}</p>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};
export default MovieReviews;
