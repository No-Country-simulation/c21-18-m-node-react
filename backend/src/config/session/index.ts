import session from 'express-session';
import { envs } from '../plugins/env.plugin';

//*Setup Session Middleware
const sessionMiddleware = session({
	secret: envs.SESSION_SECRET as string,
	resave: true,
	saveUninitialized: true,
	cookie: {
		maxAge: 1000 * 60 * 60, // 1 hour
	},
});

export default sessionMiddleware;
