import axios from "axios";

export interface Iprops {
  formdata: FormData;
  postId: string;
}
export const updatePostApi = async ({ formdata, postId }: Iprops) => {
  console.log(formdata);
  const response = await axios.patch(`posts/${postId}`, formdata, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
