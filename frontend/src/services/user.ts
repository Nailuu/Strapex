import { getStrapiURL } from "./data";
import { getAuthToken } from "./token";
import qs from "qs";

export interface IUser {
  ok: boolean,
  data: any,
  error: any,
}

const query = qs.stringify({
  fields: ["username", "email"],
  populate: {
    role: {
      fields: ["name"],
    },
  },
});

export async function getUserMeLoader(): Promise<IUser> {
  const baseUrl = getStrapiURL();

  const url = new URL("/api/users/me", baseUrl);
  url.search = query;

  const authToken = await getAuthToken();

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