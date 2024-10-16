import "dotenv/config";
import express, { Request, Response } from "express";
import compression from "compression";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerConfig from "./config/swagger";
import { envs } from "./config/plugins/env.plugin";
import { userRouter, petRouter, shelterRouter } from "./routes";

// Create Express server
const app = express();

// Express configuration
app.set("port", envs.PORT ?? 3001);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

//documentación --->
app.use(
  "/api-doc",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJSDoc(swaggerConfig))
);
//<---- documentación

// Root endpoint
app.get("/", (req: Request, res: Response) => {
  res.send({
    name: "API adopción de mascotas",
    environment: app.get("env"),
  });
});

// Api routes
app.use("/api/user", userRouter);
app.use("/api/pet", petRouter);
app.use("/api/shelter", shelterRouter);

export default app;
