import axios from "axios";

export const loginApi = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(
    "auth/login",
    { email, password },
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: true,
    },
  );
  console.log(response);
  return response;
};
