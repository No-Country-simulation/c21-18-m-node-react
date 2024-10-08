import { Router } from "express";
import {
  createPet,
  deletePet,
  getPetById,
  getPets,
  updatePet,
} from "@/controllers";

const petRouter = Router();

import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

petRouter.post("/mascotas", upload.single("picture"), createPet);
petRouter.get("/api/mascotas", getPets);
petRouter.get("/api/mascotas/:id", getPetById);
petRouter.put("/api/mascotas/:id", updatePet);
petRouter.delete("/api/mascotas/:id", deletePet);

export default petRouter;
