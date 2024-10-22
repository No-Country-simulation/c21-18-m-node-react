import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { roleCheck } from '../middleware/roleCheck';

const authRouter = express.Router();

// Google OAuth route
authRouter.get(
	'/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback route
authRouter.get(
	'/google/callback',
	passport.authenticate('google', {
		failureMessage: 'authentication failed :(',
	}),
	(req: Request, res: Response) => {
		res.redirect('/api/auth/profile');
	}
);

// Display user profile
authRouter.get('/profile', (req: Request, res: Response) => {
	if (req.isAuthenticated()) {
		res.status(200).send({
			status: 'success',
			message: `${JSON.stringify(req.user, null, 2)}`,
		});
	} else {
		res.status(400).send({
			status: 'fail',
			message: 'User is Not Signed In',
		});
	}
});

// Logout user
authRouter.get('/logout', (req: Request, res: Response, next: NextFunction) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		res.redirect('http://localhost:5173'); // Redirect after logout
	});
});

export default authRouter;
