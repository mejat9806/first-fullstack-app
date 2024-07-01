import { apiClient } from "@/utils/axios";

export async function logoutApi() {
  const response = await apiClient.get("auth/logout");

  return response;
}
