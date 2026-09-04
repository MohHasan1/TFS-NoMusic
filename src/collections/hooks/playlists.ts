import type { CollectionBeforeChangeHook, CollectionBeforeValidateHook } from "payload";
import slugify from "slugify";
import type { Playlist } from "#payload-types";

/**
 * Own the playlist to the creating user. App users always own what they create;
 * admins set the owner explicitly in the dashboard, so their value is left alone.
 */
export const assignOwnerBeforeValidate: CollectionBeforeValidateHook<Playlist> = ({
  data,
  operation,
  req,
}) => {
  if (!data || operation !== "create") return data;

  if (req.user?.collection === "users") {
    data.user = req.user.id;
  }

  return data;
};

/**
 * Slug is derived from the name — on create, and again whenever the name
 * changes. It's a cosmetic field only; playlists are addressed by id, so the
 * slug carries no uniqueness guarantee.
 */
export const generateSlugBeforeValidate: CollectionBeforeValidateHook<Playlist> = ({
  data,
  operation,
  originalDoc,
}) => {
  if (!data) return data;

  const nameChanged =
    operation === "update" && typeof data.name === "string" && data.name !== originalDoc?.name;

  if ((operation === "create" || nameChanged) && data.name) {
    data.slug = slugify(data.name, { lower: true, strict: true, trim: true });
  }

  return data;
};

// Denormalize the owner's name onto `author` so lists skip populating `user`.
export const syncAuthorBeforeValidate: CollectionBeforeValidateHook<Playlist> = async ({
  data,
  originalDoc,
  req,
}) => {
  if (!data) return data;

  const ownerRef = data.user ?? originalDoc?.user;
  const ownerId = typeof ownerRef === "string" ? ownerRef : ownerRef?.id;
  if (!ownerId) return data;

  if (data.user === undefined && (data.author || originalDoc?.author)) return data;

  const owner = await req.payload.findByID({
    collection: "users",
    id: ownerId,
    depth: 0,
    overrideAccess: true,
  });

  if (typeof owner?.name === "string") {
    data.author = owner.name;
  }

  return data;
};

/**
 * Keep `trackCount` in sync with the `tracks` relationship length.
 */
export const syncTrackCountBeforeChange: CollectionBeforeChangeHook<Playlist> = ({
  data,
  originalDoc,
}) => {
  if (!data) return data;

  if (Array.isArray(data.tracks)) {
    data.trackCount = data.tracks.length;
  } else if (typeof data.trackCount !== "number") {
    data.trackCount = originalDoc?.trackCount ?? 0;
  }

  return data;
};
