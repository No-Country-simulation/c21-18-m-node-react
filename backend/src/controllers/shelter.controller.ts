import { prisma } from "../data/postgres";
import { Request, Response } from "express";

export const createShelter = async (req: Request, res: Response) => {
  try {
    const { name, address, email, phone } = req.body;
    if (!name || !address || !email || !phone)
      throw {
        message: " Missing Information",
      };
    const newShelter = await prisma.shelter.create({
      data: {
        name,
        email,
        address,
        phone,
      },
    });
    res.status(201).send({
      status: "success",
      data: newShelter,
    });
  } catch (error) {
    res.status(500).send({
      status: "fail",
      data: error,
    });
  }
};

export const getAllShelters = async (req: Request, res: Response) => {
  try {
    const shelters = await prisma.shelter.findMany();
    res.status(201).send({
      status: "success",
      data: shelters,
    });
  } catch (error) {
    res.status(500).send({
      status: "fail",
      data: error,
    });
  }
};

export const getAshelter = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNum = parseInt(id);
  try {
    const getShelter = await prisma.shelter.findUnique({
      where: { id: idNum },
    });
    if (!getShelter) {
      res.status(400).send("The shelter does not exists!");
      return;
    }
    res.status(200).send(getShelter);
    return;
  } catch (error) {
    res.status(500).send(error);
    return;
  }
};

export const updateShelter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idNum = parseInt(id);
    const { name, address, email, phone } = req.body;
    const getShelter = await prisma.shelter.findUnique({
      where: { id: idNum },
    });

    if (!getShelter) {
      res.status(404).send("Shelter does not exist, nothing to update!");
      return;
    }

    const updatedShelter = await prisma.shelter.update({
      where: { id: idNum },
      data: {
        name,
        address,
        email,
        phone,
      },
    });
    res.status(200).send({
      status: "shelter updated",
      data: updatedShelter,
    });
    return;
  } catch (error) {
    res.status(500).send(error);
    return;
  }
};

export const deleteShelter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idNum = parseInt(id);

    const shelters = await prisma.shelter.findMany({
      where: { id: { not: idNum } },
    });
    if (shelters.length === 0) {
      res
        .status(400)
        .send("There are no refugies available to reassign pets to.");
      return;
    }
    const randomShelterId =
      shelters[Math.floor(Math.random() * shelters.length)].id;
    await prisma.pet.updateMany({
      where: { shelterId: idNum },
      data: { shelterId: randomShelterId },
    });
    await prisma.shelter.delete({
      where: { id: idNum },
    });
    res.status(204).send();
    return;
  } catch (error) {
    res.status(500).send(error);
    console.error(error);
    return;
  }
};
