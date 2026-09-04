"use client";

import { Button } from "#components/ui/button";
import { usePlaylistTrackEditor } from "../../hooks/use-playlist-track-editor";
import type { TPlaylistDetail } from "../../types/playlist";
import { PlaylistAudioBrowser } from "../elements/PlaylistAudioBrowser";
import { PlaylistAudioEmptyBox } from "../elements/PlaylistAudioEmptyBox";
import { PlaylistReorderList } from "../elements/PlaylistReorderList";

export function PlaylistAudioSection({ playlist, isOwner }: TProps) {
  const { tracks } = playlist;
  const { isEditing, draftTracks, isPending, start, cancel, move, remove, save } =
    usePlaylistTrackEditor(playlist.id, tracks);

  const canEdit = isOwner && tracks.length >= 1;

  return (
    <section className="space-y-4">
      {canEdit ? (
        <div className="flex items-center justify-end gap-2 px-3 md:px-4">
          {isEditing ? (
            <>
              <Button type="button" size="sm" variant="ghost" disabled={isPending} onClick={cancel}>
                Cancel
              </Button>
              <Button type="button" size="sm" disabled={isPending} onClick={save}>
                {isPending ? "Saving…" : "Save"}
              </Button>
            </>
          ) : (
            <Button type="button" size="sm" variant="outline" onClick={start}>
              Edit tracks
            </Button>
          )}
        </div>
      ) : null}

      <div className="space-y-2">
        {!isEditing ? (
          <div className="grid grid-cols-[22px_minmax(0,1fr)_28px_44px] items-center gap-3 px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-200/35 md:grid-cols-[40px_minmax(0,1fr)_minmax(90px,130px)_28px_56px] md:gap-4 md:px-4">
            <span>#</span>
            <span>Title</span>
            <span className="hidden text-center md:col-start-3 md:block">Language</span>
            <span aria-hidden="true" className="hidden md:col-start-4 md:block" />
            <span className="col-start-4 text-right md:col-start-5">Time</span>
          </div>
        ) : null}

        {tracks.length === 0 ? (
          <PlaylistAudioEmptyBox />
        ) : isEditing && draftTracks.length === 0 ? (
          <p className="px-3 text-sm text-primary-200/60 md:px-4">
            All tracks removed — Save to confirm, or Cancel.
          </p>
        ) : isEditing ? (
          <PlaylistReorderList
            tracks={draftTracks}
            onMove={move}
            onRemove={remove}
            disabled={isPending}
          />
        ) : (
          <PlaylistAudioBrowser playlistId={playlist.id} tracks={tracks} />
        )}
      </div>
    </section>
  );
}

type TProps = {
  playlist: TPlaylistDetail;
  isOwner: boolean;
};
