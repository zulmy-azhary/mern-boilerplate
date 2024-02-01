import axios from "@/api/axios";
import type { Response } from "@/types/api";

export const me = async () => {
  return await axios.get<Response>("/me");
};
