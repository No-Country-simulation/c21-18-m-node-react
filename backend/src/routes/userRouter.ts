import { Router } from 'express';
import {
	createUser,
	deleteUser,
	getAllUsers,
	getUserById,
	updateUser,
} from '../controllers';
import { isAuthenticated } from '../middleware/isAuthenticate';
import { roleCheck } from '../middleware/roleCheck';
const usersRouter = Router();

usersRouter.route('/create-user').post(createUser);
usersRouter.use(isAuthenticated);
usersRouter.get('/users', roleCheck(['ADMIN']), getAllUsers);

usersRouter
	.route('/users/:id')
	.get(getUserById)
	.put(updateUser)
	.delete(deleteUser);

export default usersRouter;
