import { Router } from "express";
import {
  createPet,
  deletePet,
  getPetById,
  getPets,
  updatePet,
} from "@/controllers";
import {uploadPhoto , resizeAndUploadImage} from "@/middleware/imageUploadMiddleware";


const petRouter = Router();

petRouter.post("/create-pet",uploadPhoto.single("picture"),resizeAndUploadImage, createPet);
petRouter.get("/", getPets);
petRouter.get("/:id", getPetById);
petRouter.put("/:id", updatePet);
petRouter.delete("/:id", deletePet);

export default petRouter;
