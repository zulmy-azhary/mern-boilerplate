import { type Secret, type SignOptions, type JwtPayload, sign, verify } from "jsonwebtoken";
import { config } from "../config/environtments";

export const generateAccessToken = (payload: Record<string, unknown>, options?: SignOptions) => {
  return sign(payload, config.jwtSecret as Secret, {
    ...options,
    algorithm: "HS256"
  });
};

export const verifyToken = <T = string | JwtPayload>(token: string) => {
  try {
    const decoded = verify(token, config.jwtSecret as Secret);
    return {
      valid: true,
      expired: false,
      decoded: decoded as T
    };
  } catch (err) {
    return {
      valid: false,
      expired: (err as Error).message === "jwt is expired or not eligible to use",
      decoded: null
    };
  }
};
