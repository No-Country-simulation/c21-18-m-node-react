import Cookies from "js-cookie";
const  URL = import.meta.env.VITE_BACKEND_URL
export async function getAllPets() {
  try {
    const response = await fetch(`${URL}/api/pet/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function newPet() {
  try {
    const response = await fetch(`${URL}/api/pet/create-pet`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getPet(id) {
  try {
    const response = await fetch(`${URL}/api/pet/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function toggleStatus(id) {
  const userCredentials = Cookies.get("user");
  if (!userCredentials) {
    throw new Error("User credentials not found");
  }

  try {
    const response = await fetch(`${URL}/api/pet/${id}`);
    const petData = await response.json();

    if (!petData) {
      throw new Error("Pet data not found");
    }

    // Cambiar el estado actual de la mascota
    const newStatus = !petData.data.status;

    // Realizar la actualización en el servidor
    const updateResponse = await fetch(`${URL}/api/pet/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-User-Credentials": userCredentials,
      },
      credentials: "include",
      body: JSON.stringify({ status: newStatus }), // Enviamos el nuevo estado
    });

    if (!updateResponse.ok) {
      throw new Error("Failed to update pet status");
    }

    return newStatus; // Retornamos el nuevo estado
  } catch (error) {
    console.error("Error toggling status:", error);
  }
}
