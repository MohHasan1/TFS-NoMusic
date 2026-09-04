"use client";

import { PRIVATE_ROUTES } from "#constants/routes";
import { useMyPlaylistsQuery } from "../../actions/client/query";
import { PlaylistCard } from "../elements/PlaylistCard";
import { PlaylistEmptyBox } from "../elements/PlaylistEmptyBox";
import { PlaylistErrorBox } from "../elements/PlaylistErrorBox";
import { PlaylistGridSkeleton } from "../elements/PlaylistGridSkeleton";

export default function PlaylistsContentSection() {
  const { data: playlists, isPending, isError } = useMyPlaylistsQuery();

  if (isPending) return <PlaylistGridSkeleton />;
  if (isError) return <PlaylistErrorBox />;
  if (playlists.length === 0) return <PlaylistEmptyBox />;

  return (
    <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {playlists.map((playlist) => (
        <PlaylistCard key={playlist.id} href={PRIVATE_ROUTES.PLAYLIST(playlist.id)} name={playlist.name} author={playlist.author ?? ""} trackCount={playlist.trackCount} imageURL={playlist.coverImage} />
      ))}
    </div>
  );
}
