import axios from "axios";

export type IsinglePostDetail = {
  data: {
    title: string;
    detail: string;
    author: { id: string; profileImage: string; name: string };
    image: [string];
    createAt: string;
    slug: string;
    id: string;
    likes: [];
  };
};

export const fetchPostDetail = async ({
  postId,
}: {
  postId: string;
}): Promise<IsinglePostDetail> => {
  const response: IsinglePostDetail = await axios.get(`/posts/${postId}`);
  console.log(response.data);
  return response;
};
