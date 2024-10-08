import { prisma } from "@/data/postgres";
import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, phone } = req.body;
    if (!name || !email || !password || !role || !phone)
      throw {
        message: " Missing Information",
      };
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role,
        phone,
      },
    });
    res.status(201).send({
      status: "success",
      data: newUser,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      data: error,
    });
  }
};
