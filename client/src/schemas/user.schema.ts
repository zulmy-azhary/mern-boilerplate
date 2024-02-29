import { z } from "zod";

export const accountSchema = z
  .object({
    name: z.optional(
      z
        .string()
        .min(1, "Name is required.")
        .min(4, "Name must be at least 4 characters.")
        .max(24, "Maximum length of Name is 24 characters.")
    ),
    email: z.string().email("Invalid Email Address."),
    password: z.optional(z.string().min(6, "Password must be at least 6 characters.")),
    newPassword: z.optional(z.string().min(6, "New Password must be at least 6 characters.")),
    role: z.enum(["Admin", "User"])
  })
  .refine(
    data => {
      if (!data.password && data.newPassword) return false;
      return true;
    },
    {
      message: "Password is required.",
      path: ["password"]
    }
  )
  .refine(
    data => {
      if (data.password && !data.newPassword) return false;
      return true;
    },
    {
      message: "New Password is required.",
      path: ["newPassword"]
    }
  );
