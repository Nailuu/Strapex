import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStrapiURL() {
  return "http://127.0.0.1:1337";
}

export async function getStrapiData(path: string) {
  try {
    const req = await fetch(getStrapiURL() + path, {cache: 'no-store'});
    const res = await req.json();

    return (res);
  } catch (error) {
    console.error(error);
  }
}