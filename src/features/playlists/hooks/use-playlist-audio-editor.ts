"use client";

import { useState } from "react";
import { toast } from "sonner";

import type { TNoMusic } from "#types/nomusic";
import { useReorderTracksMutation } from "../actions/client/mutation";

export function usePlaylistAudioEditor(playlistId: string, tracks: TNoMusic[]) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTracks, setDraftTracks] = useState(tracks);
  const { mutateAsync, isPending } = useReorderTracksMutation(playlistId);

  function start() {
    setDraftTracks(tracks);
    setIsEditing(true);
  }

  function cancel() {
    setIsEditing(false);
  }

  function move(from: number, to: number) {
    if (to < 0 || to >= draftTracks.length) return;
    setDraftTracks((prev) => {
      const next = [...prev];
      const moved = next.splice(from, 1)[0];
      next.splice(to, 0, moved);
      return next;
    });
  }

  function remove(index: number) {
    setDraftTracks((prev) => prev.filter((_, i) => i !== index));
  }

  async function save() {
    const res = await mutateAsync(draftTracks.map((track) => track.id));
    if (!res.isSuccess) {
      toast.error(res.message);
      return;
    }
    toast.success("Playlist saved.");
    setIsEditing(false);
  }

  return { isEditing, draftTracks, isPending, start, cancel, move, remove, save };
}
