import { apiClient } from "@/utils/axios";

const updateUserApi = (formData: FormData) => {
  const response = apiClient.patch("auth/updateMe", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response;
};

export default updateUserApi;
