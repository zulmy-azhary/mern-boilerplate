import type { z } from "zod";
import { UserModel } from "../models/user.model";
import type { registerSchema } from "../schemas/auth.schema";
import type { UpdateQuery } from "mongoose";

export const getUsers = async () => {
  return await UserModel.find();
};

export const getUserByEmail = async (email: string) => {
  return await UserModel.findOne({ email });
};

export const createUser = async (payload: Omit<z.infer<typeof registerSchema>, "confirmPassword">) => {
  return await UserModel.create(payload);
};

type UpdateUserByIdPayload = UpdateQuery<Omit<z.infer<typeof registerSchema>, "confirmPassword">>;
export const updateUserById = async (_id: string, payload: UpdateUserByIdPayload) => {
  return await UserModel.findByIdAndUpdate(_id, payload, { new: true });
};

type UpdateUserByEmailPayload = UpdateQuery<Omit<z.infer<typeof registerSchema>, "email" | "confirmPassword">>;
export const updateUserByEmail = async (email: string, payload: UpdateUserByEmailPayload) => {
  return await UserModel.findOneAndUpdate({ email }, payload, { new: true });
};
