import axios from "axios";

export async function logoutApi() {
  const response = await axios.get("auth/logout");

  return response;
}
