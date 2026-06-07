"use client";

import { useState } from "react";
import { Button } from "#components/ui/button";
import { usePlayerPlay } from "#modules/player/hooks/usePlayerPlay";
import type { TNoMusic } from "#types/nomusic";
import { NewPlayerDialog } from "./NewPlayerDialog";

type NewDialogTestClientProps = {
  tracks: TNoMusic[];
};

export function NewDialogTestClient({ tracks }: NewDialogTestClientProps) {
  const [open, setOpen] = useState(false);
  const { playTrack } = usePlayerPlay();

  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-4xl flex-col items-center justify-center gap-6 px-4 py-20">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold text-primary-200">New Dialog Test</h1>
        <p className="text-sm text-muted-foreground">Play a track and open the route-local copy of the new dialog.</p>
      </div>

      <div className="grid w-full gap-3">
        {tracks.map((track) => (
          <div key={track.id} className="flex items-center justify-between gap-3 rounded-3xl border border-border/60 bg-card-secondary/60 p-4">
            <div className="min-w-0">
              <div className="truncate font-medium text-primary-200">{track.name}</div>
              <div className="truncate text-sm text-muted-foreground">{track.artist ?? "Unknown Artist"}</div>
            </div>

            <Button
              type="button"
              onClick={() => {
                playTrack(track);
                setOpen(true);
              }}
            >
              Play in new dialog
            </Button>
          </div>
        ))}
      </div>

      <NewPlayerDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
