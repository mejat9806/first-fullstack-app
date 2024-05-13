import axios from "axios";

export async function logoutApi() {
  await axios.get("users/logout");
}
