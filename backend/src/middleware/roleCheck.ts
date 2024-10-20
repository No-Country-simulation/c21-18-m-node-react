import { Request, Response, NextFunction } from 'express';

export const roleCheck = (allowedRoles: string[]) => {
	return (req: Request, res: Response, next: NextFunction): void => {
		if (!req.isAuthenticated()) {
			res.status(401).send({
				status: 'fail',
				message: 'User is not authenticated',
			});
			return;
		}

		const user = req.user as any;
		if (!allowedRoles.includes(user.role)) {
			res.status(403).send({
				status: 'fail',
				message: 'Access denied',
			});
			return;
		}

		next();
	};
};
