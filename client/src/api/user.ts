import type { AxiosResponse } from "axios";
import axios from "@/api/axios";
import type { TResponse, TUser } from "@/types";

export const getUser = async () => {
  const res: AxiosResponse<TResponse<TUser>> = await axios.get("/user");

  return res.data;
};
