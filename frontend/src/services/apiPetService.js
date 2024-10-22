export async function getAllPets() {
  try {
    const response = await fetch(`http://localhost:3000/api/pet/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function newPet() {
  try {
    const response = await fetch(`http://localhost:3000/api/pet/create-pet`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getPet(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/pet/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function toggleStatus(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/pet/${id}`);
    const petData = await response.json();

    const newStatus = !petData.status;

    const updateResponse = await fetch(`http://localhost:3000/api/pet/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!updateResponse.ok) {
      throw new Error("Failed to update pet status");
    }

    return newStatus;
  } catch (error) {
    console.error("Error toggling status:", error);
  }
}
