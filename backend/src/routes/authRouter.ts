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
// authRouter.get(
// 	'/google/callback',
// 	passport.authenticate('google', {
// 		failureMessage: 'authentication failed :(',
// 	}),
// 	(req: Request, res: Response) => {
// 		res.redirect('/api/auth/profile');
// 	}
// );
authRouter.get(
	'/google/callback',
	passport.authenticate('google', {
		failureMessage: 'authentication failed :(',
	}),
	(req: Request, res: Response) => {
		// Assuming accessToken is available in req.authInfo or req.user
		const user = req.user as any;
		const accessToken = req.authInfo as string; // You should pass this from the Google strategy as explained before

		// Set cookies
		res.cookie('access_token', accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production', // Set to true in production for HTTPS
			maxAge: 24 * 60 * 60 * 1000, // 1 day expiry
		});

		res.cookie(
			'user',
			JSON.stringify({
				name: user.name,
				email: user.email,
				role: user.role,
				picture: user.picture,
			}),
			{
				httpOnly: false,
				maxAge: 24 * 60 * 60 * 1000, // 1 day expiry
			}
		);

		res.redirect('http://localhost:5173');
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
// authRouter.get('/logout', (req: Request, res: Response, next: NextFunction) => {
// 	req.logout((err) => {
// 		if (err) {
// 			return next(err);
// 		}
// 		res.redirect('http://localhost:5173'); // Redirect after logout
// 	});
// });
authRouter.get('/logout', (req: Request, res: Response, next: NextFunction) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		// Clear cookies when user logs out
		res.clearCookie('access_token');
		res.clearCookie('user');
		res.redirect('http://localhost:5173'); // Redirect after logout
	});
});

export default authRouter;
