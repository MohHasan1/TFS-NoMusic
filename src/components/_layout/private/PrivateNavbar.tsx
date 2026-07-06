import { Suspense } from "react";

import { PwaInstallControl } from "#components/shared/pwa/PwaInstallControl";
import { BrandLogoLink } from "#components/shared/BrandLogoLink";
import { PRIVATE_ROUTES } from "#constants/routes";
import { PrivateNavLinks } from "./PrivateNavLinks";
import { PrivateUserMenuFallback } from "./PrivateUserMenuFallback";
import { PrivateUserMenuServer } from "./PrivateUserMenuServer";

export function PrivateNavbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-border border-b bg-background/50 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-3 sm:px-4 lg:px-8">
        <div className="shrink-0">
          <BrandLogoLink link={PRIVATE_ROUTES.NOMUSIC} />
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
          <PwaInstallControl />

          <PrivateNavLinks />

          <Suspense fallback={<PrivateUserMenuFallback />}>
            <PrivateUserMenuServer />
          </Suspense>
        </div>
      </nav>
    </header>
  );
}
