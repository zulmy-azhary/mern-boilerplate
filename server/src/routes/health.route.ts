import { Router } from "express";
import { getHealth } from "../controllers";

export const HealthRouter: Router = Router();

HealthRouter.get("/", getHealth);
