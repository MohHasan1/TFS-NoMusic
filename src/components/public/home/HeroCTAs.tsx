import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroCTAs() {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button
        render={<Link id="login-btn" href="/signin" />}
        nativeButton={false}
        size="lg"
        className="rounded-full px-8"
      >
        Sign In
      </Button>

      <Button
        render={<Link id="request-access-btn" href="/request-access" />}
        nativeButton={false}
        variant="outline"
        size="lg"
        className="rounded-full px-8 border-white/10 bg-transparent text-white/60 hover:border-white/25 hover:bg-transparent hover:text-white/80"
      >
        Request Access
      </Button>
    </div>
  );
}
