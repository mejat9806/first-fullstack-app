import axios from "axios";

export const getLike = async ({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) => {
  const response = await axios.get(`likeDislike/getLike/${postId}/${userId}`);
  return response.data;
};
