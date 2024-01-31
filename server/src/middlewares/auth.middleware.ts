import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../libs/jwt";
import { logger } from "../libs/logger";

export const requireUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;

    if (!user) {
      logger.error("AUTH -> REQUIRE USER = Access Denied.");
      return res.status(403).send({ status: false, statusCode: 403, message: "Access Denied." });
    }

    next();
  } catch (err) {
    return res.status(500).send({ status: false, statusCode: 500, message: (err as Error).message });
  }
};

// Token
export const deserializedToken = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.replace(/^Bearer\s/, "");
  if (!accessToken) {
    return next();
  }

  const token = verifyToken(accessToken);
  if (token.decoded) {
    res.locals.user = token.decoded;
    return next();
  }

  if (token.expired) {
    next();
  }

  next();
};
