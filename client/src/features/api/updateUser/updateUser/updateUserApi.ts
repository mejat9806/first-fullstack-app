import axios from "axios";

const updateUserApi = (formData: FormData) => {
  console.log(formData);
  const response = axios.patch("auth/updateMe", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response;
};

export default updateUserApi;
