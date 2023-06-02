import type { Request, Response } from "express";
import { logger } from "../utils/logger";

export const getHealth = (req: Request, res: Response) => {
  try {
    logger.info("HEALTH -> GET = Health OK! Server is running");
    return res.status(200).send({ status: true, statusCode: 200, message: "Health OK! Server is running" });
  } catch (err) {
    logger.error(`HEALTH -> GET = ${(err as Error).message}`);
    return res.status(500).send({ status: false, statusCode: 500, message: (err as Error).message });
  }
};
