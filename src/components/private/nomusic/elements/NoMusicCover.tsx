import { BrandLogo } from "#components/shared/BrandLogo";

export function NoMusicCover({ name, artist }: TProps) {
  const color_gradient = getGradientFromText(`${name ?? ""}-${artist ?? ""}`);

  return (
    <div
      className={`bg-linear-to-bl ${color_gradient} absolute inset-0 h-full w-full overflow-hidden transition-transform duration-500 group-hover:scale-105`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.26),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.18),transparent_38%)]" />
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary-foreground/30 blur-2xl" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-size-[22px_22px] opacity-[0.08]" />

      <div className="relative flex h-full flex-col justify-between p-3 md:p-4">
        <div className="flex items-start justify-between">
          <span className="text-xs">
            <BrandLogo />
          </span>
        </div>

        <div className="max-w-[80%] truncate flex-col justify-center items-start">
          <p className="line-clamp-1 text-sm md:text-lg text-primary-200">
            {name || "Untitled Track"}
          </p>

          <p className="line-clamp-1 text-xs md:text-sm text-primary-200/70">
            {artist || "No instruments"}
          </p>
        </div>
      </div>
    </div>
  );
}

type TProps = {
  name?: string | null;
  artist?: string | null;
};

const gradients = [
  "from-primary-600/60 via-primary to-secondary",
  "from-primary/50 via-primary-400/50 to-primary-600/50",
  "from-pink-500/70 via-pink-800 to-pink-600",
  "from-green-500/60 via-green-900 to-green-950",
  "from-red-600/60 via-primary to-secondary",

  "from-fuchsia-500/70 via-rose-800 to-purple-950",
  "from-lime-500/60 via-green-700 to-emerald-950",
  "from-cyan-500/60 via-blue-800 to-indigo-950",
  "from-yellow-500/70 via-orange-700 to-red-950",
  "from-stone-500/60 via-neutral-800 to-black",

  "from-purple-500/70 via-purple-900 to-indigo-950",
  "from-blue-500/60 via-sky-800 to-cyan-950",
  "from-orange-500/70 via-amber-800 to-yellow-950",
  "from-teal-500/60 via-emerald-800 to-green-950",
  "from-zinc-500/60 via-slate-800 to-zinc-950",
] as const;

function getGradientFromText(value: string) {
  let hash = 0;

  for (let i = 0; i < 5; i++) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }

  return gradients[Math.abs(hash) % gradients.length];
}

// via-primary to-secondary from-primary-600/60 - og
