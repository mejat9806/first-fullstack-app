import axios from "axios";

export const checkEmail = async (email: string) => {
  const response = await axios.post("/auth/checkEmail", { email });
  return response.data.isValid;
};
