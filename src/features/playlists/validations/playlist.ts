import { z } from "zod";
import { PLAYLIST_VISIBILITY } from "@/collections/constants/playlists";
import { PLAYLIST_FIELD_LIMITS } from "../constants/playlist";

export const PlaylistUpdateSchema = z.object({
  name: z.string().trim().min(PLAYLIST_FIELD_LIMITS.nameMin, "Give the playlist a name.").max(PLAYLIST_FIELD_LIMITS.nameMax, "That name is too long."),
  description: z.string().trim().max(PLAYLIST_FIELD_LIMITS.descriptionMax, "That description is too long."),
  visibility: z.enum(PLAYLIST_VISIBILITY),
});

export type TPlaylistUpdate = z.infer<typeof PlaylistUpdateSchema>;

export const PlaylistCreateSchema = PlaylistUpdateSchema.pick({ name: true });

export type TPlaylistCreate = z.infer<typeof PlaylistCreateSchema>;

export const ReorderTracksSchema = z.object({
  // The full desired track list (reordered, minus any removed). May be empty.
  trackIds: z.array(z.string().min(1)),
});

export type TReorderTracks = z.infer<typeof ReorderTracksSchema>;

export const ToggleTrackSchema = z.object({
  trackId: z.string().min(1),
  shouldAdd: z.boolean(),
});

export type TToggleTrack = z.infer<typeof ToggleTrackSchema>;
