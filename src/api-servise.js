import axios from "axios";

const KEY = "2b090d474ca21114f3dc14fa79d128ca";
const authHeader =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjA5MGQ0NzRjYTIxMTE0ZjNkYzE0ZmE3OWQxMjhjYSIsInN1YiI6IjY2NjExOTliZTliNjFhYzY2NmEyNGM2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xsFWMzb4U_VjMTfYUsc2fNUPsXz40GO4P0-A9l-SJbw";
axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common.Authorization = authHeader;

export const getTrendingMovies = async () => {
  const url = "/trending/movie/day";
  const { data } = await axios.get(url);

  return {
    result: data.results,
    currentPage: data.page,
    totalPages: data.total_pages,
    totalResults: data.total_results,
  };
};

export const getMoviesByQuery = async (searchQuery) => {
  const { data } = await axios.get("/search/movie", {
    params: {
      client_id: KEY,
      query: searchQuery,
    },
  });

  return data.results;
};

export const getMovieDetails = async (id) => {
  const url = `/movie/${id}?language=en-US`;
  const { data } = await axios.get(url);
  return data;
};

export const getMovieCast = async (id) => {
  const url = `/movie/${id}/credits`;
  const { data } = await axios.get(url);
  return data;
};

export const getMovieReviews = async (id) => {
  const url = `/movie/${id}/reviews`;
  const { data } = await axios.get(url);
  return data;
};
