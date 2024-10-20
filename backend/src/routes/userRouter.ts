import { Router } from 'express';
import {
	createUser,
	deleteUser,
	getAllUsers,
	getUserById,
	updateUser,
} from '../controllers';
const usersRouter = Router();

usersRouter.route('/create-user').post(createUser);

usersRouter.get('/users', getAllUsers);

usersRouter
	.route('/users/:id')
	.get(getUserById)
	.put(updateUser)
	.delete(deleteUser);

export default usersRouter;
