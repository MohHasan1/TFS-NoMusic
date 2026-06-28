import { BrandLogoLink } from "#components/shared/BrandLogoLink";
import { PwaInstallControl } from "#components/shared/pwa/PwaInstallControl";

import { PUBLIC_ROUTES } from "#constants/routes";

export function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-6">
      <BrandLogoLink link={PUBLIC_ROUTES.HOME} />
      <PwaInstallControl />
    </header>
  );
}
