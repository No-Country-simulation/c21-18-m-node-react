import { prisma } from '@/data/postgres';
import { Request, Response } from 'express';

export const createUser = async (req: Request, res: Response) => {
	try {
		const { name, email, picture } = req.body;
		if (!name || !email || !picture)
			throw {
				message: ' Missing Information',
			};
		const newUser = await prisma.user.create({
			data: {
				name: name as string,
				email: email as string,
				picture: picture as string,
			},
		});
		res.status(201).send({
			status: 'success',
			data: newUser,
		});
	} catch (error) {
		res.status(400).send({
			status: 'fail',
			data: error,
		});
	}
};
