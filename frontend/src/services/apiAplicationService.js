import Cookies from "js-cookie";
const  URL = import.meta.env.VITE_BACKEND_URL
export async function getAllApplications() {
  try {
    const response = await fetch(`${URL}/api/application-form`);
    if (!response.ok) {
      throw new Error("Error al obtener las aplicaciones");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getAllApplications:", error);
    throw error;
  }
}

export async function toggleStatus(
  applicationId,
  newStatus,
  applicationDetails
) {
  const { userId, petId, email, name, isApproved } = applicationDetails;
  const userCredentials = Cookies.get("user");

  if (!userCredentials) {
    console.error("Error: Credenciales de usuario no encontradas");
    throw new Error("Credenciales de usuario no encontradas");
  }

  try {
    const response = await fetch(
      `${URL}/api/application-confirmation/send`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-Credentials": userCredentials,
        },
        credentials: "include",
        body: JSON.stringify({
          applicationId,
          status: newStatus,
          isApproved,
          userId,
          petId,
          email,
          name,
        }), // Incluyendo isApproved en el cuerpo
      }
    );

    if (!response.ok) {
      throw new Error(`Error en el servidor: ${response.statusText}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("El servidor devolvió un tipo de contenido no válido");
    }

    const data = await response.json();
    console.log("toggleStatus response:", data);
    return data.updatedStatus || newStatus;
  } catch (error) {
    console.error("Error en toggleStatus:", error);
    throw error;
  }
}
