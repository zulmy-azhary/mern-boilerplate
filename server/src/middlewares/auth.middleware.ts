import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../libs/jwt";
import { logger } from "../libs/logger";

export const requireUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check if res.locals.user passed from deserializedToken
    const user = res.locals.user;
    // If token not valid, then return 403 forbidden
    if (!user) {
      res.clearCookie("accessToken", { httpOnly: true });
      logger.error("AUTH -> REQUIRE_USER = Access Denied.");
      return res.status(403).send({ success: false, error: { code: 403, message: "Access Denied." } });
    }

    // If token is valid, then handle the next middleware or controller
    next();
  } catch (err) {
    return res.status(500).send({ success: false, error: { code: 500, message: (err as Error).message } });
  }
};

// Token
export const deserializedToken = async (req: Request, res: Response, next: NextFunction) => {
  // Get accessToken from httpOnly cookies
  const accessToken: string | undefined = req.cookies.accessToken;
  if (!accessToken) {
    return next();
  }

  const token = verifyToken(accessToken);
  if (token.expired) {
    return next();
  }

  // If decoded exist, then set response locals user to use to the next middleware
  // For example: (..., deserializedToken, requireUser, ...)
  if (token.decoded) {
    res.locals.user = token.decoded;
    return next();
  }

  next();
};
