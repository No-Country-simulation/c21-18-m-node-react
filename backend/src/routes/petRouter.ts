import { Router } from "express";
import {
  createPet,
  deletePet,
  getPetById,
  getPets,
  updatePet,
} from "../controllers";

const petRouter = Router();

petRouter.post("/create-pet", createPet);
petRouter.get("/", getPets);
petRouter.get("/:id", getPetById);
petRouter.put("/:id", updatePet);
petRouter.delete("/:id", deletePet);

export default petRouter;