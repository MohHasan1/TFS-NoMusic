"use client";

import {
  useCreatePlaylistMutation,
  useToggleTrackInPlaylistMutation,
} from "../../actions/client/mutation";
import { useMyPlaylistsQuery, useTrackPlaylistMembershipQuery } from "../../actions/client/query";
import { usePlaylistAddDialog } from "../../hooks/use-playlist-add-dialog";
import { PlaylistAddDialog } from "./PlaylistAddDialog";

// Mounted once in the private layout. Reads the store + playlists and renders the dialog.
export function PlaylistAddDialogHost() {
  const { trackId, close } = usePlaylistAddDialog();
  const { data: playlists, isPending } = useMyPlaylistsQuery();
  const { data: memberIds } = useTrackPlaylistMembershipQuery(trackId);
  const { mutateAsync: createPlaylist } = useCreatePlaylistMutation();
  const toggle = useToggleTrackInPlaylistMutation(trackId ?? "");

  if (!trackId) return null;

  const containingIds = new Set(memberIds ?? []);

  return (
    <PlaylistAddDialog
      open
      onOpenChange={(next) => {
        if (!next) close();
      }}
      playlists={playlists ?? []}
      isLoading={isPending}
      containingIds={containingIds}
      togglingId={toggle.isPending ? (toggle.variables?.playlistId ?? null) : null}
      onToggle={(playlistId) =>
        toggle.mutate({ playlistId, shouldAdd: !containingIds.has(playlistId) })
      }
      onCreate={(name) => createPlaylist({ name, trackId })}
    />
  );
}
