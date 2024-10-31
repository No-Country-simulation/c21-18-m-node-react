export async function getAllApplications() {
  try {
    const response = await fetch(
      `http://localhost:3000/api/application-form/ `
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
