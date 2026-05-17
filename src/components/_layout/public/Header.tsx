import { PUBLIC_ROUTES } from "#constants/routes";
import { BrandLogo } from "@/components/shared/BrandLogo";

export function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-6">
      <BrandLogo link={PUBLIC_ROUTES.HOME} />
    </header>
  );
}
