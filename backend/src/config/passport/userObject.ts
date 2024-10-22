interface UserOptions {
	id: string;
	displayName: string;
	name: Name;
	photos: Photo[];
	provider: string;
	emails?: Email[];
}

interface Name {
	familyName: string;
	givenName: string;
}
interface Email {
	value: string;
}
interface Photo {
	value: string;
}

export const userObject = ({ id, name, photos, emails }: UserOptions) => {
	const newUserObject = {
		id: id,
		name: `${name.familyName} ${name.givenName}`,
		picture: photos[0].value,
		email: emails?.[0]?.value,
	};
	return newUserObject;
};
