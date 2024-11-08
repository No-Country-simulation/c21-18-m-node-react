import "dotenv/config";
import * as env from "env-var";

export const envs = {
  PORT: env.get("PORT").required().asPortNumber(),
  POSTGRES_URL: env.get("POSTGRES_URL").required().asUrlString(),
  POSTGRES_USER: env.get("POSTGRES_USER").required().asString(),
  POSTGRES_DB: env.get("POSTGRES_DB").required().asString(),
  POSTGRES_PORT: env.get("POSTGRES_PORT").required().asPortNumber(),
  POSTGRES_PASSWORD: env.get("POSTGRES_PASSWORD").required().asString(),
  GOOGLE_CLIENT_ID: env.get("GOOGLE_CLIENT_ID").asString(),
  GOOGLE_SECRET_ID: env.get("GOOGLE_SECRET_ID").asString(),
  REDIRECT_URL: env.get("REDIRECT_URL").asString(),
  SESSION_SECRET: env.get("SESSION_SECRET").asString(),
  NODEMAILER_HOST: env.get("NODEMAILER_HOST").asString(),
  NODEMAILER_EMAIL: env.get("NODEMAILER_EMAIL").asString(),
  NODEMAILER_PASS: env.get("NODEMAILER_PASS").asString(),
  FRONTEND_URL: env.get("FRONTEND_URL").required().asString(),
};
