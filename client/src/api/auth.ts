import type { loginSchema, registerSchema } from "@/schemas/auth.schema";
import type { z } from "zod";
import axios from "./axios";
import type { Response } from "@/types/api";

export const login = async (payload: z.infer<typeof loginSchema>) => {
  return await axios.post<Response>("/auth/login", payload);
};

export const register = async (payload: z.infer<typeof registerSchema>) => {
  return await axios.post<Response>("/auth/register", payload);
};
