import axios from "axios";
export const fetchlatest = async ({ pageParam }: { pageParam: number }) => {
  const response = await axios.get(`/posts/latest/?page=${pageParam}`);
  return response.data;
};
