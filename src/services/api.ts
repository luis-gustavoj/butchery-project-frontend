import { parseCookies } from "nookies";
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_PATH,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const { "butcher.access_token": token } = parseCookies();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, undefined);
