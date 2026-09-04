"use client";

import { RiEditLine } from "@remixicon/react";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";
import FormFieldError from "#components/shared/form/FormFieldError";
import { Button } from "#components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "#components/ui/dialog";
import { Field, FieldLabel } from "#components/ui/field";
import { Input } from "#components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#components/ui/select";
import { Textarea } from "#components/ui/textarea";
import { PLAYLIST_VISIBILITY_OPTIONS } from "@/collections/constants/playlists";
import { useUpdatePlaylistMutation } from "../../actions/client/mutation";
import { PLAYLIST_DESCRIPTION_MAX, PLAYLIST_NAME_MAX } from "../../constants/playlist";
import type { TPlaylistDetail } from "../../types/playlist";
import { PlaylistUpdateSchema } from "../../validations/playlist";

export function PlaylistEditDialog({ playlist }: TProps) {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useUpdatePlaylistMutation(playlist.id);

  const form = useForm({
    defaultValues: {
      name: playlist.name ?? "",
      description: playlist.description ?? "",
      visibility: playlist.visibility,
    },
    validators: { onSubmit: PlaylistUpdateSchema },
    onSubmit: async ({ value }) => {
      const res = await mutateAsync(value);
      if (!res.isSuccess) {
        toast.error(res.message);
        return;
      }
      toast.success("Playlist updated.");
      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>
        <RiEditLine className="size-4" />
        Edit
      </DialogTrigger>

      <DialogContent className="text-primary-200">
        <DialogHeader>
          <DialogTitle>Edit playlist</DialogTitle>
        </DialogHeader>

        <form
          className="min-w-0 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            void form.handleSubmit();
          }}
        >
          <form.Field name="name">
            {(field) => (
              <Field className="min-w-0">
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  id={field.name}
                  maxLength={PLAYLIST_NAME_MAX}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isPending}
                />
                <FormFieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          <form.Field name="description">
            {(field) => (
              <Field className="min-w-0">
                <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                <Textarea
                  id={field.name}
                  rows={3}
                  maxLength={PLAYLIST_DESCRIPTION_MAX}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isPending}
                  className="wrap-break-word"
                />
                <FormFieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          <form.Field name="visibility">
            {(field) => (
              <Field className="min-w-0">
                <FieldLabel>Visibility</FieldLabel>
                <Select
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value as typeof field.state.value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PLAYLIST_VISIBILITY_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          </form.Field>

          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

type TProps = {
  playlist: TPlaylistDetail;
};
