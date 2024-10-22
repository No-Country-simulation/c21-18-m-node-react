import Cookies from "js-cookie";
export async function createShelter(
  shelterName,
  shelterAddress,
  shelterPhoneNumber,
  shelterEmail
) {
  const userToken = Cookies.get("connect.sid");
  console.log(Cookies.get("connect.sid"));
  console.log("userToken", userToken);
  const response = await fetch(
    "http://localhost:3000/api/shelter/create-shelter",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        shelterName,
        shelterAddress,
        shelterPhoneNumber,
        shelterEmail,
      }),
    }
  );
  console.log(response);
  return response.json();
}
