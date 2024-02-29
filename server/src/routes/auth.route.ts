import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller";
import { requireUser } from "../middlewares/auth.middleware";

export const AuthRouter: Router = Router();

AuthRouter.post("/register", register);
AuthRouter.post("/login", login);
AuthRouter.post("/logout", requireUser, logout);
