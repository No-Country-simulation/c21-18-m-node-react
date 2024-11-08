const  URL = import.meta.env.VITE_BACKEND_URL
export async function getAllUsers() {
	try {
		const response = await fetch(`${URL}/api/user/users`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function getUsersByEmail(email) {
	try {
		const response = await fetch(
			`${URL}/api/user/users/mail/${email}`
		);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}
