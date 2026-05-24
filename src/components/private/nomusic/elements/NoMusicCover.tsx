import { RiMusic2Line } from "@remixicon/react";

type NoMusicCoverTheme = "primary" | "soft" | "deep" | "glow" | "midnight";

type NoMusicCoverProps = {
  name?: string | null;
  artist?: string | null;
  coverTheme?: NoMusicCoverTheme | null;
};

const COVER_THEMES: Record<
  NoMusicCoverTheme,
  {
    bg: string;
    glowOne: string;
    glowTwo: string;
    icon: string;
    label: string;
    title: string;
    subtitle: string;
    grid: string;
  }
> = {
  primary: {
    bg: "bg-gradient-to-br from-primary-200 via-primary-400 to-primary",
    glowOne: "bg-primary-foreground/40",
    glowTwo: "bg-primary-600/35",
    icon: "bg-primary-foreground/20 text-primary-foreground",
    label: "text-primary-foreground/70",
    title: "text-primary-foreground",
    subtitle: "text-primary-foreground/75",
    grid: "bg-[linear-gradient(rgba(255,255,255,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.55)_1px,transparent_1px)]",
  },

  soft: {
    bg: "bg-gradient-to-br from-primary-200 via-primary-foreground to-primary-400",
    glowOne: "bg-primary/25",
    glowTwo: "bg-primary-600/25",
    icon: "bg-primary/10 text-primary",
    label: "text-primary/55",
    title: "text-foreground",
    subtitle: "text-foreground/55",
    grid: "bg-[linear-gradient(rgba(0,0,0,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.55)_1px,transparent_1px)]",
  },

  deep: {
    bg: "bg-gradient-to-br from-primary-400 via-primary to-primary-600",
    glowOne: "bg-primary-foreground/30",
    glowTwo: "bg-chart-1/30",
    icon: "bg-white/15 text-white",
    label: "text-white/65",
    title: "text-white",
    subtitle: "text-white/70",
    grid: "bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]",
  },

  glow: {
    bg: "bg-gradient-to-br from-chart-1 via-chart-2 to-chart-5",
    glowOne: "bg-primary-foreground/35",
    glowTwo: "bg-chart-3/35",
    icon: "bg-white/15 text-white",
    label: "text-white/65",
    title: "text-white",
    subtitle: "text-white/70",
    grid: "bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]",
  },

  midnight: {
    bg: "bg-gradient-to-br from-background via-primary to-black",
    glowOne: "bg-primary-400/35",
    glowTwo: "bg-primary-foreground/20",
    icon: "bg-white/10 text-white",
    label: "text-white/50",
    title: "text-white",
    subtitle: "text-white/60",
    grid: "bg-[linear-gradient(rgba(255,255,255,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.45)_1px,transparent_1px)]",
  },
};

export function NoMusicCover({ name, artist, coverTheme = "deep" }: NoMusicCoverProps) {
  const theme = COVER_THEMES[coverTheme || "deep"];

  return (
    <div
      className={[
        "absolute inset-0 h-full w-full overflow-hidden bg-muted transition-transform duration-500 group-hover:scale-105",
        theme.bg,
      ].join(" ")}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.26),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.18),transparent_38%)]" />

      <div
        className={[
          "absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-30 blur-2xl",
          theme.glowOne,
        ].join(" ")}
      />

      <div
        className={["absolute inset-0 opacity-[0.08] bg-size-[22px_22px]", theme.grid].join(
          " ",
        )}
      />

      <div className="relative flex h-full flex-col justify-between p-4 md:p-5">
        <div className="flex items-start justify-between">
          <span
            className={["text-[10px] font-semibold uppercase tracking-[0.24em]", theme.label].join(
              " ",
            )}
          >
            No Music
          </span>

          <div
            className={[
              "flex h-10 w-10 items-center justify-center rounded-2xl backdrop-blur-sm",
              theme.icon,
            ].join(" ")}
          >
            <RiMusic2Line className="h-5 w-5" />
          </div>
        </div>

        <div className="max-w-[88%]">
          <p
            className={[
              "line-clamp-3 text-left text-lg font-semibold leading-[1.02] tracking-[-0.03em] md:text-xl",
              theme.title,
            ].join(" ")}
          >
            {name || "Untitled Track"}
          </p>

          <p className={["mt-2 line-clamp-1 text-xs md:text-sm", theme.subtitle].join(" ")}>
            {artist || "Private family track"}
          </p>
        </div>
      </div>
    </div>
  );
}
