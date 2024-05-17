import axios from "axios";

// export interface IcreatePost {
//   title: string;
//   detail: string;
//   image: File | null;
// }

export const createPostApi = async (formData: FormData) => {
  console.log(formData, "image at create post api");
  const response = await axios.post("posts/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response;
};
