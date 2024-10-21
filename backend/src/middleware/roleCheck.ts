import { Request, Response, NextFunction } from 'express';
//when you call this middleware you have to indicate what roles are going to be allow to pass the check in an array e.g. roleCheck(['ADMIN','USER'])
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
