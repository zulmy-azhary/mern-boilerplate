import { BASE_URL } from "@/config";
import axios from "axios";

export default axios.create({
  baseURL: BASE_URL
});

export const axiosWithCredentials = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true
});
