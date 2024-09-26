import { cookies } from "next/headers";

export function getAuthToken() {
  return cookies().get("jwt")?.value;
}