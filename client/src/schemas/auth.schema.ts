import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required.")
      .min(4, "Name must be at least 4 characters.")
      .max(24, "Maximum length of Name is 24 characters."),
    email: z.string().min(1, "Email Address is required.").email("Invalid Email Address."),
    password: z.string().min(1, "Password is required.").min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string().min(1, "Confirm Password is required."),
    role: z.enum(["Admin", "User"])
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Password and Confirm Password does not match.",
    path: ["confirmPassword"]
  });

export const loginSchema = z.object({
  email: z.string().min(1, "Email Address is required.").email("Invalid Email Address."),
  password: z.string().min(1, "Password is required.")
});
