import { getGradientFromText } from "#components/private/_utils/helpers";
import { BrandLogo } from "#components/shared/BrandLogo";

export function NoMusicCover({ name, artist }: TProps) {
  const color_gradient = getGradientFromText(`${name ?? ""}-${artist ?? ""}`);

  return (
    <div
      className={`bg-linear-to-bl ${color_gradient} absolute inset-0 h-full w-full overflow-hidden transition-transform duration-500 group-hover:scale-105`}
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
