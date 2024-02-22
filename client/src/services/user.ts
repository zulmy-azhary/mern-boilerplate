import type { Response } from "@/types/api";
import type { UserInfos } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

export const getCurrentUser = () => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<AxiosResponse<Response<UserInfos>>>(["user", "me"]);

  return data?.data.data;
};
