import Cookies from "js-cookie";

export function extractUserDetails() {
  const userCookie = Cookies.get("user");

  if (!userCookie) {
    console.error("User cookie not found");
    return;
  }

  try {
    const decodedCookie = decodeURIComponent(userCookie);

    const user = JSON.parse(decodedCookie);

    const { name, email, role, picture } = user;
    // console.log(picture);
    if (!name || !email || !role || !picture) {
      return "not info";
    } else {
      return { name, email, role, picture };
    }
  } catch (error) {
    console.log("Error parsing user cookie:", error);
  }
}
export const isAdmin = () => {
  try {
    const user = extractUserDetails();
    return user.role === "ADMIN" ? true : false;
  } catch (error) {
    console.log(error);
  }
};
export const logged = () => {
  try {
    const user = extractUserDetails();
    if (user.name) return true;
  } catch (error) {
    console.log(error);
  }
};
