"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { TPlaylist } from "../../types/playlist";
import type { TPlaylistCreate, TPlaylistUpdate, TReorderTracks } from "../../validations/playlist";
import { createPlaylistAction } from "../server/create-playlist";
import { reorderPlaylistTracksAction } from "../server/reorder-tracks";
import { setTrackInPlaylistAction } from "../server/set-track-in-playlist";
import { updatePlaylistAction } from "../server/update-playlist";
import { QUERY_KEYS } from "./keys";

export function useCreatePlaylistMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: TPlaylistCreate & { trackId?: string }) => createPlaylistAction(input),
    onSuccess: (res, variables) => {
      if (!res.isSuccess) return;
      // Show the new playlist immediately, then reconcile with the server.
      queryClient.setQueryData<TPlaylist[]>(QUERY_KEYS.playlists.list, (old = []) => [
        res.data,
        ...old,
      ]);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.playlists.list });
      if (variables.trackId) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.playlists.membership(variables.trackId),
        });
      }
    },
  });
}

export function useToggleTrackInPlaylistMutation(trackId: string) {
  const queryClient = useQueryClient();
  const key = QUERY_KEYS.playlists.membership(trackId);

  return useMutation({
    mutationFn: ({ playlistId, shouldAdd }: { playlistId: string; shouldAdd: boolean }) =>
      setTrackInPlaylistAction(playlistId, { trackId, shouldAdd }),
    onMutate: async ({ playlistId, shouldAdd }) => {
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<string[]>(key);
      queryClient.setQueryData<string[]>(key, (old = []) =>
        shouldAdd ? [...new Set([...old, playlistId])] : old.filter((id) => id !== playlistId),
      );
      return { previous };
    },
    onSuccess: (res, { playlistId }, context) => {
      if (!res.isSuccess) {
        queryClient.setQueryData(key, context?.previous);
        toast.error(res.message);
        return;
      }
      queryClient.setQueryData<TPlaylist[]>(QUERY_KEYS.playlists.list, (old) =>
        old?.map((playlist) => (playlist.id === playlistId ? res.data : playlist)),
      );
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.playlist.one(playlistId) });
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(key, context?.previous);
      toast.error("Couldn't update the playlist.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: key });
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
    mutationFn: (trackIds: TReorderTracks["trackIds"]) =>
      reorderPlaylistTracksAction(id, { trackIds }),
    onSuccess: (res) => {
      if (!res.isSuccess) return;
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.playlist.one(id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.playlists.list });
    },
  });
}
