import { apiClient } from "@/utils/axios";
import { UserType } from "@/utils/type";

export interface Ireply {
  createdAt: string;
  reply: Ireply[];
  commentText: string;
  _id: string;
  user: UserType;
  commentId: string;
}
export interface Icomment {
  _id: string;
  commentText: string;
  commentId: string;
  reply: Ireply[];
  timeStamp: string;
  user: UserType;
  post: string;
}
export type IsinglePostDetail = {
  data: {
    title: string;
    detail: string;
    author: { id: string; profileImage: string; name: string; bio: string };
    image: [string];
    createAt: string;
    slug: string;
    id: string;
    likes: [];
    comments: Icomment[];
  };
};

export const fetchPostDetail = async ({ postId }: { postId: string }) => {
  const response = await apiClient.get(`/posts/${postId}`);
  return response.data;
};
