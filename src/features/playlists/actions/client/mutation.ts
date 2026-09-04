"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TPlaylistUpdate } from "../../validations/playlist";
import { updatePlaylistAction } from "../server/update-playlist";
import { QUERY_KEYS } from "./keys";

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
