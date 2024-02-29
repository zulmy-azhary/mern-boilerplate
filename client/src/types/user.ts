import type { registerSchema } from "@/schemas/auth.schema";
import type { z } from "zod";
import type { MongoDocument } from "@/types/common";

export type UserInfos = MongoDocument<
  Omit<z.infer<typeof registerSchema>, "password" | "confirmPassword"> & { _id: string }
>;
