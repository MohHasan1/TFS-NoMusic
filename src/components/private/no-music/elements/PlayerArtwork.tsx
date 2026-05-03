import { RiMusic2Line } from "@remixicon/react";

export function PlayerArtwork({ isPlaying = false }: PlayerArtworkProps) {
  return (
    <div className="relative shrink-0">
      <div className="flex size-11 items-center justify-center rounded-xl bg-muted text-muted-foreground shadow-lg md:size-12">
        <RiMusic2Line className="size-5" />
      </div>

      {isPlaying ? (
        <span className="-top-1 -right-1 absolute size-3 rounded-full border-2 border-card bg-primary" />
      ) : null}
    </div>
  );
}

type PlayerArtworkProps = {
  isPlaying?: boolean;
};
