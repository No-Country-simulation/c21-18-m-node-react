import { Router } from "express";
import {
  createPet,
  deletePet,
  getPet,
  getPets,
  updatePet,
} from "@/controllers";

const petRouter = Router();

petRouter.post("/", createPet);
router.get("/", getPets);
router.get("/:id", getPet);
router.put("/:id", updatePet);

export default petRouter;
