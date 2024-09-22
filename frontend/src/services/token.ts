import Cookies from "js-cookie";

export async function getAuthToken() {
    const authToken = Cookies.get("jwt");

  return (authToken);
}