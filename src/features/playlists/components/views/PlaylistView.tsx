import { Suspense } from "react";

import { PrivatePageShell } from "#components/private/shared/PrivatePageShell";
import { PlaylistAudioSectionSkeleton } from "../elements/PlaylistAudioSectionSkeleton";
import { PlaylistHeroSkeleton } from "../elements/PlaylistHeroSkeleton";
import { PlaylistAudioSection } from "../sections/PlaylistAudioSection";
import { PlaylistHeroSection } from "../sections/PlaylistHeroSection";

export function PlaylistView({ id }: TProps) {
  return (
    <PrivatePageShell>
      <Suspense fallback={<PlaylistHeroSkeleton />}>
        <PlaylistHeroSection playlistId={id} />
      </Suspense>

      <Suspense fallback={<PlaylistAudioSectionSkeleton />}>
        <PlaylistAudioSection playlistId={id} />
      </Suspense>
    </PrivatePageShell>
  );
}

type TProps = {
  id: string;
};
