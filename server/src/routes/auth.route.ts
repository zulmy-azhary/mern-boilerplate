import { Router } from "express";
import { login, logout, register } from "../controllers";

export const AuthRouter: Router = Router();

AuthRouter.post("/register", register);
AuthRouter.post("/login", login);
AuthRouter.post("/logout", logout);
