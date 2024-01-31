import type { z } from "zod";
import { UserModel } from "../models/user.model";
import type { registerSchema } from "../schemas/auth.schema";

export const getUsers = async () => {
  return await UserModel.find();
};

export const getUserByEmail = async (email: string) => {
  return await UserModel.findOne({ email });
};

export const createUser = async (payload: z.infer<typeof registerSchema>) => {
  return await UserModel.create(payload);
};
