import type { Request, Response } from "express";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { logger } from "../libs/logger";
import { createUser, getUserByEmail } from "../services/user.service";
import { checkPasswordMatch, hashPassword } from "../libs/utils";
import { generateAccessToken } from "../libs/jwt";

export const register = async (req: Request, res: Response) => {
  const validatedFields = registerSchema.safeParse(req.body);
  if (!validatedFields.success) {
    logger.error("AUTH -> REGISTER = Invalid fields.");
    return res.status(422).send({ success: false, error: { code: 422, message: "Invalid fields." } });
  }

  const { name, email, password, role } = validatedFields.data;

  try {
    // If user already exist, then return an error.
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      logger.error("AUTH -> REGISTER = Email address already exists. Please use another one.");
      return res.status(422).send({
        success: false,
        error: { code: 422, message: "Email address already exists. Please use another one." }
      });
    }

    // Hash password that user entered.
    const hashedPassword = await hashPassword(password);

    // Create user with hashed password
    await createUser({
      name,
      email,
      password: hashedPassword,
      role
    });

    // Log and return success message.
    logger.info("AUTH -> REGISTER = Your account has been registered successfully.");
    return res
      .status(201)
      .send({ success: true, code: 201, message: "Your account has been registered successfully." });
  } catch (err) {
    logger.error(`AUTH -> REGISTER = ${(err as Error).message}`);
    return res.status(500).send({ success: false, error: { code: 500, message: (err as Error).message } });
  }
};

export const login = async (req: Request, res: Response) => {
  const validatedFields = loginSchema.safeParse(req.body);
  if (!validatedFields.success) {
    logger.error("AUTH -> LOGIN = Invalid fields.");
    return res.status(422).send({ success: false, error: { code: 422, message: "Invalid fields." } });
  }

  const { email, password } = validatedFields.data;

  try {
    // If user doesn't exist, then return invalid credentials.
    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      logger.error("AUTH -> LOGIN = Invalid credentials.");
      return res.status(401).send({ success: false, error: { code: 401, message: "Invalid credentials." } });
    }

    // If passwords doesn't matches, then return invalid credentials.
    const isPasswordMatch = await checkPasswordMatch(password, existingUser.password);
    if (!isPasswordMatch) {
      logger.error("AUTH -> LOGIN = Invalid credentials.");
      return res.status(401).send({ success: false, error: { code: 401, message: "Invalid credentials." } });
    }

    // Generate accessToken based on user infos, except password
    const { password: _, ...userInfos } = existingUser;
    const accessToken = generateAccessToken(userInfos, { expiresIn: 1000 * 60 * 60 * 24 }); // Expires 1d

    // Set httpOnly cookie
    const expires = new Date(new Date().setDate(new Date().getDate() + 1)); // Expires 1d
    res.cookie("accessToken", accessToken, {
      expires,
      httpOnly: true,
      sameSite: "none",
      secure: true
    });

    // Log and return success message
    logger.info("AUTH -> LOGIN = User logged in successfully.");
    return res.status(200).send({
      success: true,
      code: 200,
      message: "You have been logged in."
    });
  } catch (err) {
    logger.error(`AUTH -> LOGIN = ${(err as Error).message}`);
    return res.status(500).send({ success: false, error: { code: 500, message: (err as Error).message } });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    // Send response to the client that'll remove accessToken's cookie in the browser
    res.clearCookie("accessToken", { httpOnly: true });

    // Log and return success message
    logger.info("AUTH -> LOGOUT = User logged out successfully.");
    return res.status(200).send({
      success: true,
      code: 200,
      message: "You have been logged out."
    });
  } catch (err) {
    logger.error(`AUTH -> LOGOUT = ${(err as Error).message}`);
    return res.status(500).send({ success: false, error: { code: 500, message: (err as Error).message } });
  }
};
