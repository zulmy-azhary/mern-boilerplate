import { axiosWithCredentials } from "@/api/axios";
import type { Response } from "@/types/api";
import type { UserInfos } from "@/types/user";

export const me = async () => {
  return await axiosWithCredentials.get<Response<UserInfos>>("/user/me");
};
