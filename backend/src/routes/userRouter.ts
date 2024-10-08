import { Router } from 'express';
import { createUser } from '../controllers';
const usersRouter = Router();

usersRouter.route('/').post(createUser);

export default usersRouter;
