import { RiArrowRightLine, RiGlobalLine, RiTimeLine, RiUser3Line } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import { NoMusicCover } from "#components/private/nomusic/elements/NoMusicCover";
import { Button } from "#components/ui/button";
import { Card, CardContent, CardHeader } from "#components/ui/card";
import { PRIVATE_ROUTES } from "#constants/routes";
import { formatPlaybackTime } from "#lib/helpers/playback";
import type { TNoMusicShare } from "#types/nomusic-share";

const shouldSkipImageOptimization = process.env.NODE_ENV === "development";

export function NoMusicShareCard({ track }: TProps) {
  const artist = track.artist || "Unknown artist";
  const destination = `${PRIVATE_ROUTES.NOMUSIC_LANGUAGE(track.language)}?q=${encodeURIComponent(track.name)}`;

  return (
    <section className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 items-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="grid w-full overflow-hidden border-border/70 bg-card/90 backdrop-blur-xl md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <CardHeader className="relative aspect-square overflow-hidden bg-muted p-0 md:aspect-auto md:min-h-112">
          {track.coverImage ? <Image src={track.coverImage} alt={`${track.name} cover`} fill priority unoptimized={shouldSkipImageOptimization} sizes="(min-width: 768px) 448px, 100vw" className="object-cover" /> : <NoMusicCover name={track.name} artist={track.artist} />}
        </CardHeader>

        <CardContent className="flex flex-col justify-center gap-6 p-6 sm:p-8 md:p-10">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-400">Shared on NoMusic</p>
            <h1 className="text-3xl font-semibold tracking-tight text-primary-200 sm:text-4xl">{track.name}</h1>
            <p className="text-sm leading-relaxed text-muted-foreground">A clean vocals-only track waiting in the private NoMusic listening space.</p>
          </div>

          <dl className="grid gap-3 text-sm text-primary-200/80 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
            <ShareDetail icon={<RiUser3Line />} label="Artist" value={artist} />
            <ShareDetail icon={<RiGlobalLine />} label="Language" value={track.language} />
            <ShareDetail icon={<RiTimeLine />} label="Duration" value={formatPlaybackTime(track.duration ?? 0)} />
          </dl>

          <div className="space-y-3">
            <Button nativeButton={false} render={<Link href={destination}>Sign in to listen</Link>} size="lg" className="w-full sm:w-auto">
              <RiArrowRightLine data-icon="inline-end" />
            </Button>
            <p className="text-xs text-muted-foreground">Already signed in? You’ll go straight to the track.</p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function ShareDetail({ icon, label, value }: TDetailProps) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-2 capitalize">
      <span className="text-primary-400 [&>svg]:size-4">{icon}</span>
      <span className="min-w-0">
        <span className="block text-[10px] uppercase tracking-wide text-muted-foreground">{label}</span>
        <span className="block truncate">{value}</span>
      </span>
    </div>
  );
}

type TProps = {
  track: TNoMusicShare;
};

type TDetailProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};
