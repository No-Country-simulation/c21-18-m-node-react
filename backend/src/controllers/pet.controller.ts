import { prisma } from "@/data/postgres";
import { Request, Response } from "express";

export const createPet = async (req: Request, res: Response) => {
  try {
    const { name, age, type, shelterId, description, gender, status } =
      req.body;
    const picture = req.imageUrls ? req.imageUrls[0] : null;
    const ageInt = parseInt(age, 10);
    const shelterIdInt = parseInt(shelterId, 10);
    const statusBoolean = status === "true";

    if (
      !name ||
      !age ||
      !type ||
      !shelterId ||
      !picture ||
      !description ||
      !gender ||
      !status
    )
      throw { message: "Missing Information" };
    const newPet = await prisma.pet.create({
      data: {
        name,
        age: ageInt,
        type,
        shelterId: shelterIdInt,
        picture,
        description,
        gender,
        status: statusBoolean,
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
    const { name, age, type, shelterId, picture, description, gender, status } =
      req.body;
    const updatedPet = await prisma.pet.update({
      where: { id },
      data: {
        name,
        age,
        type,
        shelterId,
        picture,
        description,
        gender,
        status,
      },
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
