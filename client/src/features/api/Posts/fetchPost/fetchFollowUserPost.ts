import axios from "axios";

export const fetchFollowUserPost = async ({
  pageParam,
}: {
  pageParam: number;
}) => {
  const response = await axios.get(`posts/?page=${pageParam}`);
  return response.data;
};
