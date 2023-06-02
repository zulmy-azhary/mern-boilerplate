import type { AxiosResponse } from "axios";
import axios from "./axios";
import type { TResponse, TUser } from "../types";

export const getUser = async () => {
  return await axios.get("/user").then((res: AxiosResponse<TResponse<TUser>>) => res.data);
};
