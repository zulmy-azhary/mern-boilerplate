/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import dotenv from "dotenv";
import express, { type NextFunction, type Request, type Response } from "express";
import mongoose from "mongoose";
import config from "./config/environtments";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { logger } from "./utils/logger";
import { routes } from "./routes";

dotenv.config();

mongoose.set("strictQuery", true);

const app = express();
const port = config.port || 5000;
const CLIENT_BASE_URL = config.clientBaseUrl || "http://127.0.0.1:5173";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Middleware
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

// Cors
app.use(
  cors({
    origin: [CLIENT_BASE_URL, "*"],
    credentials: true
  })
);

// Set Headers
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// All Routes
routes(app);

app.listen(port, () => {
  logger.info(`Server listening on port ${port}, url: http://localhost:${port}`);
});
