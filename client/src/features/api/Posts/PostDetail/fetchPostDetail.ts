import axios from "axios";

export type IsinglePostDetail = {
  data: {
    title: string;
    detail: string;
    author: { id: string; profileImage: string; name: string };
    image: [number];
    createAt: string;
    slug: string;
    id: string;
  };
};

export const fetchPostDetail = async ({
  postId,
}: {
  postId: string;
}): Promise<IsinglePostDetail> => {
  const response: IsinglePostDetail = await axios.get(`/posts/${postId}`);
  return response;
};
