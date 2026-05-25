import { PUBLIC_ROUTES } from "#constants/routes";
import { Button } from "#components/ui/button";
import Link from "next/link";

export function HeroCTAs() {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button
        render={<Link id="login-btn" href={PUBLIC_ROUTES.SIGNIN} />}
        nativeButton={false}
        size="lg"
        className="rounded-full px-8"
      >
        Sign In
      </Button>

      <Button
        render={<Link id="request-access-btn" href={PUBLIC_ROUTES.REQUEST_ACCESS} />}
        nativeButton={false}
        variant="outline"
        size="lg"
        className="rounded-full px-8"
      >
        Request Access
      </Button>
    </div>
  );
}
