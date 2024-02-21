import type { registerSchema } from "@/schemas/auth.schema";
import type { z } from "zod";

export type UserInfos = Omit<z.infer<typeof registerSchema>, "password" | "confirmPassword">;
