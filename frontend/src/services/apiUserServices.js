export async function getAllUsers() {
  try {
    const response = await fetch(`http://localhost:3000/api/user/users`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getUsersByEmail(email) {
  try {
    const response = await fetch(`http://localhost:3000/api/user/users/${email}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}





