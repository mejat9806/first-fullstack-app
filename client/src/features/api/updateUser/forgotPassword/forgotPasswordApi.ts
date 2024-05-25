import axios from "axios";

export const forgotPassword = async (email: string) => {
  const response = await axios.post("/auth/forgotPassword", { email });
  return response;
};
