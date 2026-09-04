"use client";

import { RiAddLine } from "@remixicon/react";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";

import FormFieldError from "#components/shared/form/FormFieldError";
import { Button } from "#components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "#components/ui/dialog";
import { Field } from "#components/ui/field";
import { Input } from "#components/ui/input";
import { Spinner } from "#components/ui/spinner";
import type { TResponse } from "#responses";
import { PLAYLIST_FIELD_LIMITS, PLAYLIST_LIMITS } from "../../constants/playlist";
import type { TPlaylist } from "../../types/playlist";
import { PlaylistCreateSchema } from "../../validations/playlist";
import { PlaylistAddList } from "./PlaylistAddList";

export function PlaylistAddDialog({
  open,
  onOpenChange,
  playlists,
  isLoading,
  containingIds,
  togglingId,
  onToggle,
  onCreate,
}: TProps) {
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);

  const atLimit = playlists.length >= PLAYLIST_LIMITS.perUser;

  const form = useForm({
    defaultValues: { name: "" },
    validators: { onSubmit: PlaylistCreateSchema },
    onSubmit: async ({ value, formApi }) => {
      const res = await onCreate(value.name);
      if (!res.isSuccess) {
        toast.error(res.message);
        return;
      }
      toast.success("Playlist created.");
      formApi.reset();
      setIsCreateFormOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="text-primary-200">
        <DialogHeader>
          <DialogTitle>Add to playlist</DialogTitle>
        </DialogHeader>

        {isCreateFormOpen ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void form.handleSubmit();
            }}
          >
            <form.Field name="name">
              {(field) => {
                const isSubmitting = form.state.isSubmitting;
                return (
                  <Field className="min-w-0">
                    <div className="flex gap-2">
                      <Input
                        autoFocus
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        maxLength={PLAYLIST_FIELD_LIMITS.nameMax}
                        placeholder="Playlist name"
                        disabled={isSubmitting}
                      />
                      <Button type="submit" size="sm" disabled={isSubmitting}>
                        {isSubmitting ? <Spinner className="size-3.5" /> : "Create"}
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        disabled={isSubmitting}
                        onClick={() => setIsCreateFormOpen(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                    <FormFieldError errors={field.state.meta.errors} />
                  </Field>
                );
              }}
            </form.Field>
          </form>
        ) : (
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="w-full justify-start"
            disabled={atLimit}
            onClick={() => setIsCreateFormOpen(true)}
          >
            <RiAddLine data-icon="inline-start" />
            {atLimit ? `Playlist limit reached (${PLAYLIST_LIMITS.perUser})` : "New playlist"}
          </Button>
        )}

        <PlaylistAddList
          playlists={playlists}
          isLoading={isLoading}
          containingIds={containingIds}
          togglingId={togglingId}
          onToggle={onToggle}
        />
      </DialogContent>
    </Dialog>
  );
}

type TProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  playlists: TPlaylist[];
  isLoading: boolean;
  containingIds: Set<string>;
  togglingId: string | null;
  onToggle: (playlistId: string) => void;
  onCreate: (name: string) => Promise<TResponse<unknown>>;
};
