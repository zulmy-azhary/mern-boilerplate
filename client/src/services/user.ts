import type { Response } from "@/types/api";
import type { UserInfos } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

export const useCurrentUser = () => {
  const queryClient = useQueryClient();
  const response = queryClient.getQueryData<AxiosResponse<Response<UserInfos>>>(["user", "me"]);

  return response?.data.data;
};
