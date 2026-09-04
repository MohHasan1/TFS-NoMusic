import { z } from "zod";
import { PLAYLIST_VISIBILITY } from "@/collections/constants/playlists";
import { PLAYLIST_DESCRIPTION_MAX, PLAYLIST_NAME_MAX, PLAYLIST_NAME_MIN } from "../constants/playlist";

export const PlaylistUpdateSchema = z.object({
  name: z.string().trim().min(PLAYLIST_NAME_MIN, "Give the playlist a name.").max(PLAYLIST_NAME_MAX, "That name is too long."),
  description: z.string().trim().max(PLAYLIST_DESCRIPTION_MAX, "That description is too long."),
  visibility: z.enum(PLAYLIST_VISIBILITY),
});

export type TPlaylistUpdate = z.infer<typeof PlaylistUpdateSchema>;

export const ReorderTracksSchema = z.object({
  // The full desired track list (reordered, minus any removed). May be empty.
  trackIds: z.array(z.string().min(1)),
});

export type TReorderTracks = z.infer<typeof ReorderTracksSchema>;
