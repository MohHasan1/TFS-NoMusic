import { Badge } from "@/components/ui/badge";

export function HeroTitle() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <Badge
        variant="outline"
        className="gap-2 border-white/10 bg-white/5 px-4 py-4 text-xs tracking-widest uppercase text-white/50 rounded-full"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
        Private Access Only
      </Badge>

      <h1 className="text-6xl sm:text-8xl font-bold tracking-tighter leading-none">
        <span className="text-white uppercase">No</span>
        <br />
        <span className="uppercase bg-linear-to-br from-primary-400 to-primary-600 bg-clip-text text-transparent">
          Music
        </span>
      </h1>

      <p className="text-base sm:text-lg text-white/40 max-w-sm leading-relaxed">
        Pure vocals. No instruments. A private space for the voices that move you.
      </p>
    </div>
  );
}
