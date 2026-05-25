import { PUBLIC_ROUTES } from "#constants/routes";
import { BrandLogoLink } from "#components/shared/BrandLogoLink";

export function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-6">
      <BrandLogoLink link={PUBLIC_ROUTES.HOME} />
    </header>
  );
}
