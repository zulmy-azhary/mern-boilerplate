import type { Request, Response } from "express";
import type { DocumentResult, UserInfos } from "../types";
import { logger } from "../libs/logger";

export const me = async (req: Request, res: Response) => {
  try {
    const { name, email, role } = (res.locals.user as DocumentResult<UserInfos>)._doc;
    logger.info("USER -> GET_ME = User is authenticated.");
    return res
      .status(200)
      .send({ success: true, code: 200, message: "User is authenticated.", data: { name, email, role } });
  } catch (err) {
    logger.error(`USER -> GET_ME = ${(err as Error).message}`);
    return res.status(500).send({ success: false, error: { code: 500, message: (err as Error).message } });
  }
};
