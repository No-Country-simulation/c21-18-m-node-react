import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.status(401).send({
			status: 'fail',
			message: 'User is not authenticated',
		});
	}
};
