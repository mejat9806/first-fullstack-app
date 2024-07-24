import { apiClient } from "@/utils/axios";

interface RegisterType {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
}

export const registerApi = async ({
  email,
  password,
  passwordConfirm,
  name,
}: RegisterType) => {
  const data = await apiClient.post(
    "auth/register",
    {
      email,
      password,
      passwordConfirm,
      name,
    },
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    },
  );

  return data;
};
