import "dotenv/config";

const config = {
  db: process.env.DB,
  port: process.env.PORT,
  clientBaseUrl: process.env.CLIENT_BASE_URL
};

export default config;
