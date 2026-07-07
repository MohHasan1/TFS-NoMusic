import { type NextRequest, NextResponse } from "next/server";

const SIGN_IN_PATH = "/signin";
const COLLECTION_PATH = "/nomusic";
const DEFAULT_AUTHENTICATED_PATH = COLLECTION_PATH;

const PROTECTED_ROUTES = ["/nomusic", "/libraries", "/profile", "/request-nomusic"];
export const config = {
  matcher: [
    "/signin",
    "/nomusic/:path*",
    "/libraries/:path*",
    "/profile/:path*",
    "/request-nomusic/:path*",
  ],
};

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isSignInPage = pathname === SIGN_IN_PATH;
  const isPrivatePage = isProtectedRoute(pathname);

  const token = request.cookies.get("payload-token")?.value;
  if (!token) {
    if (isPrivatePage) {
      return redirectToSignIn(request);
    }

    return NextResponse.next();
  }

  try {
    const response = await fetch(new URL("/api/users/me", request.url), {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`,
      },
      cache: "no-store",
    });

    const data = response.ok ? await response.json().catch(() => null) : null;
    const isAuthenticated = Boolean(data?.user);
    const prefAudioLang = data?.user?.prefAudioLang;

    if (!isAuthenticated) {
      if (isSignInPage) {
        return allowSignInAndClearToken();
      }

      if (isPrivatePage) {
        return redirectToSignIn(request, {
          clearToken: true,
        });
      }

      return NextResponse.next();
    }

    // Logged-in users should not access signin
    if (isSignInPage) {
      return NextResponse.redirect(new URL(DEFAULT_AUTHENTICATED_PATH, request.url));
    }

    // const isCollectionPage = pathname === COLLECTION_PATH;
    // if (
    //   isSignInPage ||
    //   (isCollectionPage && !request.nextUrl.searchParams.get("language") && Boolean(prefAudioLang))
    // ) {
    //   const redirectURL = new URL(DEFAULT_AUTHENTICATED_PATH, request.url);
    //   if (prefAudioLang) {
    //     redirectURL.searchParams.set("language", prefAudioLang);
    //   }
    //   return NextResponse.redirect(redirectURL);
    // }

    return NextResponse.next();
  } catch {
    // Authentication could not be verified
    if (isPrivatePage) {
      return redirectToSignIn(request);
    }

    return NextResponse.next();
  }
}

function isProtectedRoute(pathname: string) {
  return PROTECTED_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

function redirectToSignIn(request: NextRequest, options: { clearToken?: boolean } = {}) {
  const { pathname, search } = request.nextUrl;

  const signInURL = new URL(SIGN_IN_PATH, request.url);
  signInURL.searchParams.set("redirect", `${pathname}${search}`);

  const response = NextResponse.redirect(signInURL);

  if (options.clearToken) {
    response.cookies.delete("payload-token");
  }

  return response;
}

function allowSignInAndClearToken() {
  const response = NextResponse.next();
  response.cookies.delete("payload-token");

  return response;
}
