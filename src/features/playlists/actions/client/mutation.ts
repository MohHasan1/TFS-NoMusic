"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TPlaylist } from "../../types/playlist";
import type { TPlaylistCreate, TPlaylistUpdate, TReorderTracks } from "../../validations/playlist";
import { createPlaylistAction } from "../server/create-playlist";
import { reorderPlaylistTracksAction } from "../server/reorder-tracks";
import { updatePlaylistAction } from "../server/update-playlist";
import { QUERY_KEYS } from "./keys";

export function useCreatePlaylistMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: TPlaylistCreate & { trackId?: string }) => createPlaylistAction(input),
    onSuccess: (res) => {
      if (!res.isSuccess) return;
      // Show the new playlist immediately, then reconcile with the server.
      queryClient.setQueryData<TPlaylist[]>(QUERY_KEYS.playlists.list, (old = []) => [res.data, ...old]);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.playlists.list });
    },
  });
}

export function useUpdatePlaylistMutation(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: TPlaylistUpdate) => updatePlaylistAction(id, input),
    onSuccess: (res) => {
      if (!res.isSuccess) return;
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.playlist.one(id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.playlists.list });
    },
  });
}

export function useReorderTracksMutation(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (trackIds: TReorderTracks["trackIds"]) => reorderPlaylistTracksAction(id, { trackIds }),
    onSuccess: (res) => {
      if (!res.isSuccess) return;
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.playlist.one(id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.playlists.list });
    },
  });
}
