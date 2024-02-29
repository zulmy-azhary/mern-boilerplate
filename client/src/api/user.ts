import { axiosWithCredentials } from "@/api/axios";
import type { accountSchema } from "@/schemas/user.schema";
import type { Response } from "@/types/api";
import type { MongoDocument } from "@/types/common";
import type { UserInfos } from "@/types/user";
import type { z } from "zod";

export const me = async () => {
  return await axiosWithCredentials.get<Response<UserInfos>>("/user/me");
};

export const updateAccount = async (payload: MongoDocument<z.infer<typeof accountSchema>>) => {
  const { _id, ...userInfos } = payload;
  return await axiosWithCredentials.post<Response>(`/user/update-account/${_id}`, userInfos);
};
