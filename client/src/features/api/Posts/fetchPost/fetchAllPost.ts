import axios from "axios";
export const fetchAllPost = async ({ pageParam }: { pageParam: number }) => {
  const response = await axios.get(`posts/popular/?page=${pageParam}`);
  return response.data;
};
