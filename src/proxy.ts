import { NextRequest, NextResponse } from "next/server";

export default async function proxy(request: NextRequest) {
  const token = request.cookies.get("payload-token")?.value;

  // not logged in -> allow signin page
  if (!token) {
    return NextResponse.next();
  }

  // logged in -> verify token through Payload API
  const response = await fetch(`${request.nextUrl.origin}/api/users/me`, {
    headers: {
      cookie: request.headers.get("cookie") ?? "",
    },
  });

  if (!response.ok) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/nomusic", request.url));
}

export const config = {
  matcher: ["/signin"],
};
