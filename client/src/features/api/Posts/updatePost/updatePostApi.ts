import { apiClient } from "@/utils/axios";

export interface Iprops {
  formdata: FormData;
  postId: string;
}
export const updatePostApi = async ({ formdata, postId }: Iprops) => {
  console.log(formdata);
  const response = await apiClient.patch(`posts/${postId}`, formdata, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
