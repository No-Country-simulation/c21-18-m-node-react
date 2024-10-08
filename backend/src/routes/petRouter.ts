import { Router } from "express";
import {
  createPet,
  deletePet,
  getPetById,
  getPets,
  updatePet,
} from "@/controllers";

const petRouter = Router();

petRouter.post("/api/mascotas", createPet);
petRouter.get("/api/mascotas", getPets);
petRouter.get("/api/mascotas/:id", getPetById);
petRouter.put("/api/mascotas/:id", updatePet);
petRouter.delete("/api/mascotas/:id", deletePet);

export default petRouter;
