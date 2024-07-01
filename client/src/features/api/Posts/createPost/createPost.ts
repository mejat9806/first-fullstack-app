// export interface IcreatePost {
//   title: string;
//   detail: string;
//   image: File | null;
// }

import { apiClient } from "@/utils/axios";

export const createPostApi = async (formData: FormData) => {
  console.log(formData, "image at create post api");
  const response = await apiClient.post("posts/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response;
};
