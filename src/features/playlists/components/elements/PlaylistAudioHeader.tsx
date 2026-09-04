"use client";

import { RiListSettingsLine } from "@remixicon/react";

import { Button } from "#components/ui/button";
import type { TNoMusic } from "#types/nomusic";
import { PlaylistAudioControls } from "./PlaylistAudioControls";

export function PlaylistAudioHeader({
  playlistId,
  tracks,
  canEdit,
  isEditing,
  isSaving,
  onStartEdit,
  onCancelEdit,
  onSave,
}: TProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2  md:px-2 pb-4">
      {isEditing ? (
        <span className="text-sm text-primary-200/60">Reorder or remove tracks</span>
      ) : (
        <PlaylistAudioControls playlistId={playlistId} tracks={tracks} />
      )}

      {canEdit ? (
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                disabled={isSaving}
                onClick={onCancelEdit}
              >
                Cancel
              </Button>
              <Button type="button" size="sm" disabled={isSaving} onClick={onSave}>
                {isSaving ? "Saving…" : "Save"}
              </Button>
            </>
          ) : (
            <Button
              type="button"
              size="icon-sm"
              variant="outline"
              onClick={onStartEdit}
              aria-label="Edit tracks"
              title="Edit tracks"
            >
              <RiListSettingsLine />
            </Button>
          )}
        </div>
      ) : null}
    </div>
  );
}

type TProps = {
  playlistId: string;
  tracks: TNoMusic[];
  canEdit: boolean;
  isEditing: boolean;
  isSaving: boolean;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onSave: () => void;
};
