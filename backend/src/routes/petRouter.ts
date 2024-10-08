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
petRouter.get("/", getPets);
petRouter.get("/:id", getPetById);
petRouter.put("/:id", updatePet);
petRouter.delete("/:id", deletePet);


export default petRouter;
