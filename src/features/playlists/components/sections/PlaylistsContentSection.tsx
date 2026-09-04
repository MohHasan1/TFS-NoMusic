import { Suspense } from "react";

import { PRIVATE_ROUTES } from "#constants/routes";
import { PlaylistCard } from "../elements/PlaylistCard";
import { PlaylistEmptyBox } from "../elements/PlaylistEmptyBox";
import { PlaylistGridSkeleton } from "../elements/PlaylistGridSkeleton";

export default function PlaylistsContentSection() {
  return (
    <Suspense fallback={<PlaylistGridSkeleton />}>
      <PlaylistsGrid />
    </Suspense>
  );
}

type PlaylistItem = {
  id: string;
  name: string;
  trackCount?: number | null;
  coverImage?: string | null;
};

async function PlaylistsGrid() {
  // TODO: fetch the current user's playlists
  const playlists: PlaylistItem[] = [];

  if (playlists.length === 0) return <PlaylistEmptyBox />;

  return (
    <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {playlists.map((playlist) => (
        <PlaylistCard key={playlist.id} href={PRIVATE_ROUTES.PLAYLIST(playlist.id)} name={playlist.name} author="" trackCount={playlist.trackCount} imageURL={playlist.coverImage} />
      ))}
    </div>
  );
}
