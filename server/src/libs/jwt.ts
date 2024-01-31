import jwt, { type Secret, type SignOptions, sign } from "jsonwebtoken";
import { config } from "../config/environtments";

export const generateAccessToken = (payload: Record<string, unknown>, options?: SignOptions) => {
  return sign(payload, config.jwtSecret as Secret, {
    ...options,
    algorithm: "HS256"
  });
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, config.jwtSecret as Secret);
    return {
      valid: true,
      expired: false,
      decoded
    };
  } catch (err) {
    return {
      valid: false,
      expired: (err as Error).message === "jwt is expired or not eligible to use",
      decoded: null
    };
  }
};
