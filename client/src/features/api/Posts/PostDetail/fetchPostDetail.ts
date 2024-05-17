import axios from "axios";

export type IsinglePostDetail = {
  data: {
    name: string;
    post: string;
  };
};

export const fetchPostDetail = async ({
  postId,
}: {
  postId: string;
}): Promise<IsinglePostDetail> => {
  console.log(postId, "params here");
  const response: IsinglePostDetail = await axios.get(`/posts/${postId}`);
  return response;
};
