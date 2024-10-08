import { prisma } from "@/data/postgres";
import { Request, Response } from "express";

export const createPet = async (req: Request, res: Response) => {
  try {
    const { name, age, type, refugeId, picture } = req.body;
    if (!name || !age || !type || !refugeId || !picture)
      throw { message: "Missing Information" };
    const newPet = await prisma.pet.create({
      data: {
        name,
        age,
        type,
        refugeId,
        picture,
      },
    });
    res.status(201).send({
      status: "success",
      data: newPet,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      data: error,
    });
  }
};

export const getPets = async (req: Request, res: Response) => {
  try {
    const pets = await prisma.pet.findMany();
    res.status(200).send({
      status: "success",
      data: pets,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      data: error,
    });
  }
};

export const getPetById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pet = await prisma.pet.findUnique({
      where: { id },
    });
    res.status(200).send({
      status: "success",
      data: pet,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      data: error,
    });
  }
};

export const updatePet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, age, type, refugeId, picture } = req.body;
    const updatedPet = await prisma.pet.update({
      where: { id },
      data: { name, age, type, refugeId, picture },
    });
    res.status(200).send({
      status: "success",
      data: updatedPet,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      data: error,
    });
  }
};

export const deletePet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.pet.delete({
      where: { id },
    });
    res.status(200).send({
      status: "success",
      message: "Pet deleted successfully",
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      data: error,
    });
  }
};