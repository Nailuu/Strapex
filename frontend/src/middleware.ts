import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserMeLoader } from "@/services/user";

export async function middleware(request: NextRequest) {
  const user = await getUserMeLoader();
  const currentPath = request.nextUrl.pathname;

  if (currentPath.startsWith("/_next")) {
    return NextResponse.next();
  }

  if (currentPath != "/signin" && currentPath != "/signup" && user.ok === false) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (currentPath != "/whitelist" && user.ok && user.data.role.name === "Authenticated") {
    return NextResponse.redirect(new URL("/whitelist", request.url))
  }

  if ((currentPath == "/signin" || currentPath == "/signup") && user.ok) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}