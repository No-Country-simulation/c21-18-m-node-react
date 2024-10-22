import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import { envs } from '../plugins/env.plugin';
import { prisma } from '../../data/postgres';

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
			try {
				// Make sure to check for the email in the profile
				const email = await profile.emails?.[0]?.value;

				if (!email) {
					return done(new Error('Email not provided by Google'), null);
				}

				// Check if the user exists in the database by email
				let user = await prisma.user.findUnique({
					where: { email: profile.emails[0].value },
				});

				if (!user) {
					// If the user doesn't exist, create a new user
					user = await prisma.user.create({
						data: {
							name:
								profile.displayName ||
								`${profile.name.givenName} ${profile.name.familyName}`,
							email: profile.emails?.[0]?.value, // Store the user's email
							picture: profile.photos?.[0]?.value, // Store the user's Google profile picture
						},
					});
				}

				return done(null, user, accessToken);
			} catch (err) {
				return done(err, null);
			}
		}
	)
);

// Serialize user into the session
passport.serializeUser((user: any, done: Function) => {
	done(null, user.id); // Store only the user ID in the session
});

// Deserialize user from the session
passport.deserializeUser(async (id: string, done: Function) => {
	try {
		const user = await prisma.user.findUnique({
			where: { id },
		});
		done(null, user);
	} catch (err) {
		done(err, null);
	}
});

export default passport;
