import axios from "axios";
export const fetchAllPost = async ({ pageParam }: { pageParam: number }) => {
  console.log(pageParam);
  const response = await axios.get(`posts/?page=` + pageParam);
  return response.data;
};
