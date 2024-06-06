import axios from "axios";

const KEY = "2b090d474ca21114f3dc14fa79d128ca";
axios.defaults.baseURL = "https://api.themoviedb.org";

export const getPhotosByQuery = async (searchQuery, currentPage) => {
  const response = await axios.get("/search/photos", {
    params: {
      client_id: KEY,
      query: searchQuery,
      page: currentPage,
      per_page: 12,
      orientation: "landscape",
    },
  });

  return {
    result: response.data.results,
    totalPages: response.data.total_pages,
  };
};
