import { ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";

export interface PostItemType {
  author: { name: string; _id: string; profileImage: string };
  createAt: string;
  detail: string;
  slug: string;
  title: string;
  _id: string;
  image: string[];
  likesCount: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  likes: any[];
  id: string;
}
export interface IEmail {
  name: string;
  url: string;
}

export interface FormInput {
  form: UseFormReturn<{
    password: string;
    passwordConfirm: string;
  }>;
  label: string;
  placeholder: string;
  name: "password" | "passwordConfirm";
  type: string;
  disabled: boolean;
}
export interface IData {
  mainTitles: string;
  desc: string;
  form: ReactNode;
  image: string;
  alt: string;
}
export interface Iposts {
  name: string;
  email: string;
  profileImage: string;
  createAt: string;
  detail: string;
  id: string;
  image: [string];
  likesCount: number;
  slug: string;
  title: string;
  _id: string;
}
export interface Ilike {
  user: string;
  name: string;
  profileImage: string;
  post: Iposts;
  _id: string;
}
export interface PostFooter {
  like: number;
  author: string;
  postId: string;
}
export interface IBookmark {
  _id: string;
  createAt: string;
  post: PostItemType;
}
export interface AuthType {
  email: string;
  id: string;
  name: string;
  iat: string;
  profileImage: string;
}

export interface UserType extends AuthType {
  accessToken: string;
  id: string;
  name: string;
  email: string;
  _id: string;
  posts: Iposts[];
  followCount: number;
  followerCount: number;
  followers: [];
  following: [];
  profileImage: string;
  likePosts: Ilike[];
  joinDate: string;
  bio: string;
  bannerImage: string;
  bookmark: IBookmark[];
}

// export interface IUserProfileData {
//   id: string;
//   name: string;
//   email: string;
//   posts: Iposts[];
//   profileImage: string;
//   likePosts: [];
//   joinDate: string;
//   bio: string;
//   bannerImage: string;
//   bookmark: IBookmark[];
// }

export interface Ifollow {
  _id: string;
  follower: string;
  user: string;
}
