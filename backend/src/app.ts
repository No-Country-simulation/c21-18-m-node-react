import "dotenv/config";
import express, { Request, Response } from "express";
import compression from "compression";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { envs } from "./config/plugins/env.plugin";
import {
  userRouter,
  petRouter,
  shelterRouter,
  authRouter,
  applicationRouter,
  applicationConfirmRouter,
} from "./routes";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerConfig from "./config/swagger";

import passport from "./config/passport"; // Import Passport configuration
import sessionMiddleware from "./config/session"; // Import session middleware
import session from "express-session";
import { isAuthenticated } from "./middleware/isAuthenticate";
import { roleCheck } from "./middleware/roleCheck";

// Create Express server
const app = express();

// Express configuration

app.set("port", envs.PORT ?? 3001);
const allowedOrigins = ["http://localhost:5173", envs.FRONTEND_URL];

// Middleware
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan("dev"));
// app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

// Passport & session middleware
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
// app.use(
// 	session({
// 		secret: envs.SESSION_SECRET as string,
// 		resave: true,
// 		saveUninitialized: true,
// 		cookie: { maxAge: 1000 * 60 * 60 },
// 	})
// );

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

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

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/pet", petRouter);
app.use("/api/shelter", shelterRouter);
app.use("/api/application-form", applicationRouter);
app.use("/api/application-confirmation", applicationConfirmRouter);

export default app;
