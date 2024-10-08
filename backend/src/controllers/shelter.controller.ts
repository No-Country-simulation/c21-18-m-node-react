import { prisma } from '@/data/postgres';
import { Request, Response } from 'express';

export const createShelter = async (req: Request, res: Response) => {
	try {
		const { name, address, email, phone } = req.body;
		if (!name || !address || !email || !phone)
			throw {
				message: ' Missing Information',
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
			status: 'success',
			data: newShelter,
		});
	} catch (error) {
		res.status(400).send({
			status: 'fail',
			data: error,
		});
	}
};

export const getAllShelters = async (req: Request, res: Response) => {
	try {
		const shelters = await prisma.shelter.findMany();
		res.status(201).send({
			status: 'success',
			data: shelters,
		});
	} catch (error) {
		res.status(400).send({
			status: 'fail',
			data: error,
		});
	}
};
