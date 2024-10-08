import Cookies from "js-cookie";
import qs from "qs";
import { IUser } from "./user";
import { getStrapiExternalURL } from "./data";

const query = qs.stringify({
  fields: ["username", "email"],
  populate: {
    role: {
      fields: ["name"],
    },
  },
});

export async function getUserMeLoaderClient(): Promise<IUser> {
  const baseUrl = getStrapiExternalURL();

  const url = new URL("/api/users/me", baseUrl);
  url.search = query;

  const authToken = Cookies.get("jwt");

  if (!authToken)
    return { ok: false, data: null, error: null };

  try {
    const response = await fetch(url.href, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = await response.json();

    if (data.error)
      return { ok: false, data: null, error: data.error };
    return { ok: true, data: data, error: null };
  } catch (error) {
    return { ok: false, data: null, error: error };
  }
}