import type { Request, Response } from "express";
import type { DocumentResult } from "../types/common";
import type { UserInfos } from "../types/user";
import { logger } from "../libs/logger";
import { accountSchema } from "../schemas/user.schema";
import { updateUserById } from "../services/user.service";
import { createAccessToken } from "../libs/jwt";

export const me = async (req: Request, res: Response) => {
  try {
    const { _id, name, email, role } = (res.locals.user as DocumentResult<UserInfos>)._doc;
    logger.info("USER -> GET_ME = User is authenticated.");
    return res
      .status(200)
      .send({ success: true, code: 200, message: "User is authenticated.", data: { _id, name, email, role } });
  } catch (err) {
    logger.error(`USER -> GET_ME = ${(err as Error).message}`);
    return res.status(500).send({ success: false, error: { code: 500, message: (err as Error).message } });
  }
};

export const updateAccount = async (req: Request, res: Response) => {
  const { id } = req.params;
  const validatedFields = accountSchema.safeParse(req.body);
  if (!validatedFields.success) {
    logger.error("USER -> UPDATE_ACCOUNT = Invalid fields.");
    return res.status(422).send({ success: false, error: { code: 422, message: "Invalid fields." } });
  }

  const { email, newPassword, ...userInfos } = validatedFields.data;

  try {
    const updatedUser = (await updateUserById(id, userInfos))!;
    const { password, ...updatedUserInfos } = updatedUser;
    createAccessToken(res, updatedUserInfos);

    logger.info("USER -> UPDATE_ACCOUNT = Account updated successfully.");
    return res.status(200).send({ success: true, code: 200, message: "Account updated successfully." });
  } catch (err) {
    logger.error(`USER -> UPDATE_ACCOUNT = ${(err as Error).message}`);
    return res.status(500).send({ success: false, error: { code: 500, message: (err as Error).message } });
  }
};
