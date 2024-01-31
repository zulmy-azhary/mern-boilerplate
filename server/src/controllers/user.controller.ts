import type { Request, Response } from "express";
import { logger } from "../libs/logger";

export const me = async (req: Request, res: Response) => {
  try {
    logger.info("USER -> GET_ME = User is authenticated.");
    return res.status(200).send({ success: true, code: 200, message: "User is authenticated." });
  } catch (err) {
    logger.error(`USER -> GET_ME = ${(err as Error).message}`);
    return res.status(500).send({ success: false, error: { code: 500, message: (err as Error).message } });
  }
};
