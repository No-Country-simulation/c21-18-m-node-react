import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerOptions from '@/config/swagger';
import swaggerJSDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import { envs } from './config/plugins/env.plugin';
import { userRouter, petRouter, shelterRouter } from './routes';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import session from 'express-session';

// Create Express server
const app = express();

// Express configuration
//!Passport configuration
app.set('port', envs.PORT ?? 3001);
passport.use(
	new GoogleStrategy(
		{
			clientID: envs.GOOGLE_CLIENT_ID as string,
			clientSecret: envs.GOOGLE_SECRET_ID as string,
			callbackURL: envs.REDIRECT_URL,
		},
		async (
			accessToken: string,
			refreshToken: string,
			profile: any,
			done: Function
		) => {
			// Your logic to handle the profile returned by Google
			return done(null, profile);
		}
	)
);
//*Save User session(cookie)
passport.serializeUser((user, done) => {
	done(null, user);
});

//*Retrieve User session(cookie)
passport.deserializeUser((user, done) => {
	if (!user) return;
	done(null, user);
});
//*Setup Session Middleware
app.use(
	session({
		secret: envs.SESSION_SECRET as string,
		resave: true,
		saveUninitialized: true,
		cookie: {
			maxAge: 1000 * 60 * 60,
		},
	})
);
//*Setup Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
app.get(
	'/api/auth/google',
	passport.authenticate('google', { scope: ['profile'] })
);
app.get(
	'/api/auth/google/callback',
	passport.authenticate('google', {
		failureMessage: 'authentication failed :(',
	}),
	(req: Request, res: Response) => {
		res.redirect('/api/user/profile');
	}
);

//*Display the user Profile
app.get('/api/user/profile', (req: Request, res: Response) => {
	if (req.isAuthenticated()) {
		res.status(200).send({
			status: 'success',
			message: `${JSON.stringify(req.user, null, 2)}`,
		});
	} else {
		res.status(400).send({
			status: 'fail',
			message: `User is Not Sign In`,
		});
	}
});

app.get(
	'/api/user/logout',
	(req: Request, res: Response, next: NextFunction) => {
		req.logout((err) => {
			if (err) {
				return next(err); // Handle the error if logout fails
			}
			res.redirect('http://localhost:5173'); // Redirect after logout
		});
	}
);

//!Passport configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan('dev'));
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

//documentación --->
const specs = swaggerJSDoc(swaggerOptions);
app.use('/api/docs', serve, setup(specs));
//<---- documentación

// Root endpoint
app.get('/', (req: Request, res: Response) => {
	res.send({
		name: 'API adopción de mascotas',
		environment: app.get('env'),
	});
});

// Api routes
app.use('/api/user', userRouter);
app.use('/api/pet', petRouter);
app.use('/api/shelter', shelterRouter);
export default app;
