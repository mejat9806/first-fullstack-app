import axios from "axios";

export const updatePassword = async (formData: FormData) => {
  const response = await axios.patch("/auth/updatePassword", formData);
  return response;
};
