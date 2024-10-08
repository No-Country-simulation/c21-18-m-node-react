import { Router } from 'express';
import { createUser } from '../controllers';
const usersRouter = Router();

usersRouter.route('/').put(createUser);

export default usersRouter;
