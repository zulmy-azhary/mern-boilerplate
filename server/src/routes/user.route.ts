import { Router } from "express";
import { me } from "../controllers";
import { requireUser } from "../middlewares/auth.middleware";

export const UserRouter: Router = Router();

UserRouter.get("/me", requireUser, me);
