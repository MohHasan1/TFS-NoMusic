"use client";

import { PrivatePageShell } from "#components/private/shared/PrivatePageShell";
import { usePlaylistQuery } from "../../actions/client/query";

import { PlaylistAudioSectionSkeleton } from "../elements/PlaylistAudioSectionSkeleton";
import { PlaylistHeroSkeleton } from "../elements/PlaylistHeroSkeleton";
import { PlaylistNotFoundBox } from "../elements/PlaylistNotFoundBox";
import { PlaylistAudioSection } from "../sections/PlaylistAudioSection";
import { PlaylistHeroSection } from "../sections/PlaylistHeroSection";

export function PlaylistView({ id, currentUserId }: TProps) {
  const { data: playlist, isPending, isError } = usePlaylistQuery(id);

  const isOwner = Boolean(currentUserId) && playlist?.ownerId === currentUserId;

  return (
    <PrivatePageShell>
      {isPending ? (
        <>
          <PlaylistHeroSkeleton />
          <PlaylistAudioSectionSkeleton />
        </>
      ) : isError || !playlist ? (
        <PlaylistNotFoundBox />
      ) : (
        <>
          <PlaylistHeroSection playlist={playlist} isOwner={isOwner} />
          <PlaylistAudioSection playlist={playlist} />
        </>
      )}
    </PrivatePageShell>
  );
}

type TProps = {
  id: string;
  currentUserId: string | null;
};
