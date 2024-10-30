import express from "express";
import * as applicationConfirmation from "../controllers/applicationConfirm";
const applicationConfirmRouter = express.Router();

applicationConfirmRouter.post(
  "/send",
  applicationConfirmation.sendApplicationConfirmation
);

export default applicationConfirmRouter;
