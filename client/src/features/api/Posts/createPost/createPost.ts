import axios from "axios";

export interface IcreatePost {
  title: string;
  detail: string;
}

export const createPostApi = async ({ title, detail }: IcreatePost) => {
  console.log(title);
  const response = await axios.post("posts/create", { title, detail });
  return response;
};
