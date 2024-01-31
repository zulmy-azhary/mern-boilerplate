import "dotenv/config";

export const config = {
  db: process.env.DB,
  port: process.env.PORT,
  clientBaseUrl: process.env.CLIENT_BASE_URL,
  jwtSecret: process.env.JWT_SECRET
};
