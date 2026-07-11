import { type NextRequest, NextResponse } from "next/server";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "#constants/routes";
import { verifyPayloadToken } from "#lib/auth/verify-payload-token";
import { tryCatchResponse } from "#trycatch-response";

const PATH = {
  SIGN_IN: PUBLIC_ROUTES.SIGNIN,
  COLLECTION: PRIVATE_ROUTES.NOMUSIC,
  AFTER_AUTHENTICATED: PRIVATE_ROUTES.NOMUSIC,
} as const;
const TOKEN_COOKIE = "payload-token";
const PREF_LANG_PARAM = "setPrefAudioLang";
const PROTECTED_ROUTES = Object.values(PRIVATE_ROUTES).filter((r) => typeof r === "string");

export const config = {
  matcher: ["/signin", "/nomusic/:path*", "/libraries/:path*", "/profile/:path*", "/request-nomusic/:path*"],
};

// {
//   id: '6a204d08318ccbd78919a336',
//   collection: 'users',
//   email: 'hasan.swe.dev@gmail.com',
//   sid: 'e9692cb6-fac3-4392-b8d8-04d2ed725d13',
//   prefAudioLang: 'english',
//   iat: 1783807121,
//   exp: 1786399121
// }

export default async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isSignInPage = isSigninRoute(pathname);
  const isPrivatePage = isProtectedRoute(pathname);
  const shouldSetPrefLang = shouldUsePrefLang(request);

  const token = request.cookies.get(TOKEN_COOKIE)?.value;

  if (!token) {
    return isPrivatePage ? redirectToSignIn(request) : NextResponse.next();
  }

  const tokenPayload = await verifyPayloadToken(token);

  if (!tokenPayload || tokenPayload.collection !== "users") {
    return handleInvalidToken(request);
  }

  let prefAudioLang = extractPrefAudioLang(tokenPayload.prefAudioLang);

  // Normal authenticated navigation needs no API request.
  if (!isSignInPage && !shouldSetPrefLang) {
    return NextResponse.next();
  }

  // Migration fallback for older tokens without prefAudioLang.
  if (!prefAudioLang) {
    const user = await getCurrentUser(request, token);

    if (user) {
      prefAudioLang = extractPrefAudioLang(user.prefAudioLang);
    }
  }

  if (isSignInPage) {
    return redirectAuthenticatedUser(request, prefAudioLang);
  }

  return redirectWithPreferredLanguage(request, prefAudioLang);
}

// --- Helpers
function isProtectedRoute(pathname: string) {
  return PROTECTED_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

function isSigninRoute(pathname: string) {
  return pathname === PATH.SIGN_IN;
}

function isCollectionRoute(pathname: string) {
  return pathname === PATH.COLLECTION;
}

function shouldUsePrefLang(request: NextRequest) {
  return isCollectionRoute(request.nextUrl.pathname) && request.nextUrl.searchParams.get(PREF_LANG_PARAM) === "1";
}

function redirectToSignIn(request: NextRequest, options: { clearToken?: boolean } = {}) {
  const { pathname, search } = request.nextUrl;

  const signInURL = new URL(PATH.SIGN_IN, request.url);
  signInURL.searchParams.set("redirect", `${pathname}${search}`);

  const response = NextResponse.redirect(signInURL);

  if (options.clearToken) {
    response.cookies.delete(TOKEN_COOKIE);
  }

  return response;
}

function allowRequestAndClearToken() {
  const response = NextResponse.next();
  response.cookies.delete(TOKEN_COOKIE);

  return response;
}

function handleInvalidToken(request: NextRequest) {
  if (isSigninRoute(request.nextUrl.pathname)) {
    return allowRequestAndClearToken();
  }

  if (isProtectedRoute(request.nextUrl.pathname)) {
    return redirectToSignIn(request, { clearToken: true });
  }

  return NextResponse.next();
}

async function getCurrentUser(request: NextRequest, token: string) {
  const result = await tryCatchResponse(() =>
    fetch(new URL("/api/users/me", request.url), {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`,
      },
      cache: "no-store",
    }),
  );

  if (!result.isSuccess || !result.data.ok) {
    return null;
  }

  const data = await result.data.json().catch(() => null);

  return data?.user ?? null;
}

function extractPrefAudioLang(str: unknown): string {
  return typeof str === "string" ? str : "";
}

function redirectAuthenticatedUser(request: NextRequest, prefAudioLang: string) {
  const url = new URL(PATH.AFTER_AUTHENTICATED, request.url);

  if (prefAudioLang) {
    url.searchParams.set("language", prefAudioLang);
  }

  return NextResponse.redirect(url);
}

function redirectWithPreferredLanguage(request: NextRequest, prefAudioLang: string) {
  const url = request.nextUrl.clone();

  url.searchParams.delete(PREF_LANG_PARAM);

  if (!url.searchParams.has("language") && prefAudioLang) {
    url.searchParams.set("language", prefAudioLang);
  }

  return NextResponse.redirect(url);
}
