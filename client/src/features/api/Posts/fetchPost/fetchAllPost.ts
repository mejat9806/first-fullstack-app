import axios from "axios";
export const fetchAllPost = async ({ pageParam }: { pageParam: number }) => {
  const response = await axios.get(`posts/?page=` + pageParam);
  return response.data;
};
