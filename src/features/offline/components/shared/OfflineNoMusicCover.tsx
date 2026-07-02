import { getGradientFromText } from "#components/private/_utils/helpers";
import { BrandLogo } from "#components/shared/BrandLogo";

export function OfflineNoMusicCover({ name, artist }: TProps) {
  const colorGradient = getGradientFromText(`${name ?? ""}-${artist ?? ""}`);

  return (
    <div
      className={`bg-linear-to-bl ${colorGradient} absolute inset-0 h-full w-full overflow-hidden transition-transform duration-500 group-hover:scale-105`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.26),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.18),transparent_38%)]" />
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary-foreground/30 blur-2xl" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-size-[22px_22px] opacity-[0.05]" />

      <div className="relative flex h-full flex-col justify-between p-3 md:p-4">
        <div className="flex items-start justify-between">
          <span className="text-xs">
            <BrandLogo />
          </span>
        </div>

        <div className="max-w-[80%] truncate flex-col items-start justify-center">
          <p className="line-clamp-1 text-sm text-primary-200 md:text-lg">
            {name || "Untitled Track"}
          </p>

          <p className="line-clamp-1 text-xs text-primary-200/70 md:text-sm">
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
