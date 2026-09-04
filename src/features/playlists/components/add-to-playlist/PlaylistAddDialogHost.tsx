"use client";

import { errorResponse } from "#responses";
import { useMyPlaylistsQuery } from "../../actions/client/query";
import { usePlaylistAddDialog } from "../../hooks/use-playlist-add-dialog";
import { PlaylistAddDialog } from "./PlaylistAddDialog";

// Mounted once in the private layout. Reads the store + playlists and renders the dialog.
export function PlaylistAddDialogHost() {
  const { trackId, close } = usePlaylistAddDialog();
  const { data: playlists, isPending } = useMyPlaylistsQuery();

  if (!trackId) return null;

  return (
    <PlaylistAddDialog
      open
      onOpenChange={(next) => {
        if (!next) close();
      }}
      playlists={playlists ?? []}
      isLoading={isPending}
      containingIds={new Set()}
      togglingId={null}
      onToggle={() => {
        // TODO: add/remove trackId to the playlist, then invalidate queries.
      }}
      onCreate={async () => {
        // TODO: create the playlist, add trackId to it.
        return errorResponse([], "Not wired up yet.");
      }}
    />
  );
}
