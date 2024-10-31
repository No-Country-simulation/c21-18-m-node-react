import { prisma } from '../data/postgres';
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

// Get All Users
export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const users = await prisma.user.findMany();
		res.status(200).send({
			status: 'success',
			data: users,
		});
	} catch (error) {
		res.status(400).send({
			status: 'fail',
			data: error,
		});
	}
};

// Find User by ID
export const getUserById = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { id } = req.params;
		const user = await prisma.user.findUnique({
			where: { id },
		});
		if (!user) {
			res.status(404).send({
				status: 'fail',
				message: 'User not found',
			});
			return;
		}
		res.status(200).send({
			status: 'success',
			data: user,
		});
	} catch (error) {
		res.status(400).send({
			status: 'fail',
			data: error,
		});
	}
};
// Find User by email
export const getUserByEmail = async (req: Request, res: Response) => {
	try {
		const { email } = req.params;
		const user = await prisma.user.findFirst({
			where: { email: email as string },
		});
		if (!user) {
			res.status(404).send({
				status: 'fail',
				message: 'User not found',
			});
			return;
		}
		res.status(200).send({
			status: 'success',
			data: user,
		});
	} catch (error) {
		res.status(400).send({
			status: 'fail',
			data: error,
		});
	}
};
export const updateUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const {
			name,
			email,
			phone,
			picture,
			password,
			role,
			address,
			localidad,
			provincia,
		} = req.body;

		const updatedUser = await prisma.user.update({
			where: { id: id as string },
			data: {
				name: name as string,
				email: email as string,
				phone: phone as string,
				picture: picture as string,
				password: password as string,
				role: role, // Update role if provided,
				address: address as string,
				localidad: localidad as string,
				provincia: provincia as string,
			},
		});

		res.status(200).send({
			status: 'success',
			data: updatedUser,
		});
	} catch (error) {
		res.status(400).send({
			status: 'fail',
			message: 'error',
			data: error,
		});
	}
};
// Delete User
export const deleteUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await prisma.user.delete({
			where: { id: id },
		});
		res.status(200).send({
			status: 'success',
			message: 'user deleted successfully',
			data: null,
		});
	} catch (error) {
		res.status(400).send({
			status: 'fail',
			data: error,
		});
	}
};
