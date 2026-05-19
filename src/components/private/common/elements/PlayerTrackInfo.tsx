import { cn } from "@/lib/utils";
import type { TNoMusic } from "@/types/nomusic";

type PlayerTrackInfoProps = {
  track: TNoMusic;
  size?: "sm" | "md" | "lg";
  align?: "left" | "center";
  className?: string;
};

const TITLE_SIZE = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-2xl md:text-3xl",
} as const;

const ARTIST_SIZE = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
} as const;

export function PlayerTrackInfo({ track, size = "sm", align = "left", className }: PlayerTrackInfoProps) {
  return (
    <div className={cn("min-w-0 flex flex-col", align === "center" ? "items-center text-center" : "items-start text-left", className)}>
      <h4 className={cn("max-w-full truncate font-bold tracking-tight text-card-foreground", TITLE_SIZE[size])} title={track.name || track.title || undefined}>
        {track.name || track.title}
      </h4>
      <p className={cn("max-w-full truncate text-muted-foreground", ARTIST_SIZE[size])}>{track.artist || "Unknown Artist"}</p>
    </div>
  );
}
