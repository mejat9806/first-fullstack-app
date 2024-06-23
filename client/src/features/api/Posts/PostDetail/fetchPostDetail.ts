import { UserType } from "@/utils/type";
import axios from "axios";

export interface Ireply {
  createdAt: string;
  reply: Ireply[];
  text: string;
  _id: string;
  user: UserType;
  commentId: string;
}
export interface Icomment {
  _id: string;
  commentText: string;
  reply: Ireply[];
  timeStamp: string;
  user: UserType;
  post: string;
}
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
    comments: Icomment[];
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
