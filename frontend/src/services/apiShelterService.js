import Cookies from "js-cookie";
export async function createShelter(
  shelterName,
  shelterAddress,
  shelterPhoneNumber,
  shelterEmail
) {
  const formatData =
    (shelterName, shelterAddress, shelterPhoneNumber, shelterEmail);
  const response = await fetch(
    "http://localhost:3000/api/shelter/create-shelter",
    {
      method: "POST",
      body: formatData,
    }
  );
  console.log(response);
  return response.json();
}
