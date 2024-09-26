import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStrapiURL() {
  return "http://127.0.0.1:1337";
}

// 43200 -> 12 hours
export async function getStrapiData(path: string, qs: string = "", revalidation: number = 43200) {
  const baseUrl = getStrapiURL();

  const url = new URL(path, baseUrl);
  url.search = qs;

  const options = {
    // de-comment for prod
    cache: "no-store",
    // next: {
    //   revalidate: revalidation,
    // },
  };

  try {
    const req = await fetch(url.href, options);
    const res = await req.json();

    return (res);
  } catch (error) {
    console.error(error);
  }
}