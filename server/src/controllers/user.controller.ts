import type { Request, Response } from "express";
import { logger } from "../utils/logger";

export const getUser = async (req: Request, res: Response) => {
  try {
    logger.info("USER -> GET_USER = User fetched successfully!");
    return res
      .status(200)
      .send({ status: true, statusCode: 200, message: "User fetched successfully!", data: { name: "John Doe" } });
  } catch (err) {
    logger.error(`USER -> GET_USER = ${(err as Error).message}`);
    return res.status(500).send({ status: false, statusCode: 500, message: (err as Error).message });
  }
};
