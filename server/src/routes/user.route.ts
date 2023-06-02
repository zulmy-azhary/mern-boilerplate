import { Router } from "express";
import { getUser } from "../controllers";

export const UserRouter: Router = Router();

UserRouter.get("/", getUser);
