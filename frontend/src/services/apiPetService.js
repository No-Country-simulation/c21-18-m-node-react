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