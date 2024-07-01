import axios from "axios";

export const loginApi = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await axios.post("/api/auth/login", { email, password });
  console.log(response);
  return response;
};
