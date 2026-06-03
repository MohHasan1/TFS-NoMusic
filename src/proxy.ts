import { NextRequest, NextResponse } from "next/server";

export default async function proxy(request: NextRequest) {
  const token = request.cookies.get("payload-token")?.value;
  // No cookie means user is not logged in, so show signin page
  if (!token) {
    return NextResponse.next();
  }

  try {
    const response = await fetch(new URL("/api/users/me", request.url), {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`,
      },
      credentials: "include",
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.next();
    }

    const data = await response.json().catch(() => null);

    // Important: response can be OK but user can still be null
    if (!data?.user) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/nomusic", request.url));
  } catch {
    // If Payload API fails during restart/dev reload, don't force redirect
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/signin"],
};
