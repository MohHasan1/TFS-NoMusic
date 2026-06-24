"use client";

import { useRouter } from 'nextjs-toploader/app';
import { useState } from "react";

import { PUBLIC_ROUTES } from "#constants/routes";
import { Button } from "#components/ui/button";
import { Spinner } from "#components/ui/spinner";

type LoadingCTA = "signin" | "request-access" | null;

export function HeroCTAs() {
  const router = useRouter();
  const [loadingCTA, setLoadingCTA] = useState<LoadingCTA>(null);

  function handleRedirect(route: string, cta: Exclude<LoadingCTA, null>) {
    setLoadingCTA(cta);
    router.push(route);
  }

  const isSigninLoading = loadingCTA === "signin";
  const isRequestAccessLoading = loadingCTA === "request-access";

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button
        type="button"
        onClick={() => handleRedirect(PUBLIC_ROUTES.SIGNIN, "signin")}
        disabled={loadingCTA !== null}
        aria-busy={isSigninLoading}
        size="lg"
        className="rounded-full px-8"
      >
        {isSigninLoading && <Spinner />}
        {isSigninLoading ? "Waking cat..." : "Sign In"}
      </Button>

      <Button
        type="button"
        onClick={() => handleRedirect(PUBLIC_ROUTES.REQUEST_ACCESS, "request-access")}
        disabled={loadingCTA !== null}
        aria-busy={isRequestAccessLoading}
        variant="outline"
        size="lg"
        className="rounded-full px-8"
      >
        {isRequestAccessLoading && <Spinner />}
        {isRequestAccessLoading ? "Calling cat..." : "Request Access"}
      </Button>
    </div>
  );
}
