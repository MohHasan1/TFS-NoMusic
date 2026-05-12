import { PUBLIC_ROUTES } from "#constants/routes";
import Link from "next/link";

export function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-6">
      <Link
        href={PUBLIC_ROUTES.HOME}
        className="group text-sm font-semibold  uppercase transition-colors duration-300"
      >
        <span className="text-white/80 group-hover:text-white/60">No</span>
        <span
          className="bg-linear-to-br from-violet-400 to-purple-600 bg-clip-text text-transparent 
        group-hover:from-violet-400/80 group-hover:to-purple-600/80 transition-all duration-300"
        >
          Music
        </span>
      </Link>
    </header>
  );
}

{
  /* <a
  href="/admin"
  className="text-xs tracking-widest uppercase text-white/30 hover:text-white/70 transition-colors"
>
  Admin
</a>; */
}
