import { Router } from "express";
import { me, updateAccount } from "../controllers/user.controller";
import { requireUser } from "../middlewares/auth.middleware";

export const UserRouter: Router = Router();

UserRouter.get("/me", requireUser, me);
UserRouter.post("/update-account/:id", requireUser, updateAccount);
