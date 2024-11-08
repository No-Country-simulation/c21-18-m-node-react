import Cookies from "js-cookie";
const  URL = import.meta.env.VITE_BACKEND_URL
export async function createShelter(
  shelterName,
  shelterAddress,
  shelterPhoneNumber,
  shelterEmail
) {
  const userCredentials = Cookies.get("user");
  console.log(userCredentials);
  if (!shelterName || !shelterAddress || !shelterPhoneNumber || !shelterEmail) {
    throw new Error("All fields are required");
  }

  if (!userCredentials) {
    throw new Error("User credentials not found");
  }
  try {
    const response = await fetch(
      `${URL}/api/shelter/create-shelter`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-Credentials": userCredentials,
        },
        credentials: "include",
        body: JSON.stringify({
          name: shelterName,
          address: shelterAddress,
          phone: shelterPhoneNumber,
          email: shelterEmail,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getAllShelters() {
  try {
    const response = await fetch(`${URL}/api/shelter`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getShelter(id) {
  try {
    const response = await fetch(`${URL}/api/shelter/${id}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}
