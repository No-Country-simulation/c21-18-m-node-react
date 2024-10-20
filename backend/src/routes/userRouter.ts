import { Router } from 'express';
import {
	createUser,
	deleteUser,
	getAllUsers,
	getUserById,
	updateUser,
} from '../controllers';
import { isAuthenticated } from '../middleware/isAuthenticate';
const usersRouter = Router();

usersRouter.route('/create-user').post(createUser);
usersRouter.use(isAuthenticated);
usersRouter.get('/users', getAllUsers);

usersRouter
	.route('/users/:id')
	.get(getUserById)
	.put(updateUser)
	.delete(deleteUser);

export default usersRouter;
