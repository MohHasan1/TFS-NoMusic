import type { CollectionBeforeChangeHook, CollectionBeforeValidateHook } from "payload";
import slugify from "slugify";
import type { Playlist } from "#payload-types";

/**
 * Own the playlist to the creating user. Runs on create only; the `user`
 * field is otherwise read-only, so ownership can't be reassigned later.
 */
export const assignOwnerBeforeValidate: CollectionBeforeValidateHook<Playlist> = ({ data, operation, req }) => {
  if (!data || operation !== "create") return data;

  const userId = req.user?.id;
  if (!userId) return data;

  data.user = userId;
  return data;
};

/**
 * Slug is derived from the name — on create, and again whenever the name
 * changes. It's a cosmetic field only; playlists are addressed by id, so the
 * slug carries no uniqueness guarantee.
 */
export const generateSlugBeforeValidate: CollectionBeforeValidateHook<Playlist> = ({ data, operation, originalDoc }) => {
  if (!data) return data;

  const nameChanged = operation === "update" && typeof data.name === "string" && data.name !== originalDoc?.name;

  if ((operation === "create" || nameChanged) && data.name) {
    data.slug = slugify(data.name, { lower: true, strict: true, trim: true });
  }

  return data;
};

/**
 * Keep `trackCount` in sync with the `tracks` relationship length.
 */
export const syncTrackCountBeforeChange: CollectionBeforeChangeHook<Playlist> = ({ data, originalDoc }) => {
  if (!data) return data;

  if (Array.isArray(data.tracks)) {
    data.trackCount = data.tracks.length;
  } else if (typeof data.trackCount !== "number") {
    data.trackCount = originalDoc?.trackCount ?? 0;
  }

  return data;
};
