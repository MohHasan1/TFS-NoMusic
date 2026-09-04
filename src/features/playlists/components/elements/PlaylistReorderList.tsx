"use client";

import type { TNoMusic } from "#types/nomusic";
import { PlaylistTrackRow } from "./PlaylistTrackRow";

export function PlaylistReorderList({ tracks, onMove, onRemove, disabled }: TProps) {
  return (
    <div className="space-y-1.5">
      {tracks.map((track, index) => (
        <PlaylistTrackRow
          key={track.id}
          index={index}
          track={track}
          reorder={{
            disabled,
            isFirst: index === 0,
            isLast: index === tracks.length - 1,
            onUp: () => onMove(index, index - 1),
            onDown: () => onMove(index, index + 1),
            onRemove: () => onRemove(index),
          }}
        />
      ))}
    </div>
  );
}

type TProps = {
  tracks: TNoMusic[];
  onMove: (from: number, to: number) => void;
  onRemove: (index: number) => void;
  disabled?: boolean;
};
