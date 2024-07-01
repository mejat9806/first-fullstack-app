import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_DEVELOPMENT_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

console.log(import.meta.env.VITE_DEVELOPMENT_URL, "axios link");
