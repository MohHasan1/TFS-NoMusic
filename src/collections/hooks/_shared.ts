import type { CollectionBeforeValidateHook } from "payload";
import { isID } from "#lib/utils";

/**
 * When a cover image is uploaded (`imageFile`), copy the media file's URL into
 * `uploadedImageURL`. Shared by every collection that has an upload + URL pair
 * (Libraries, Users, Nomusic, Playlists).
 *
 * To re-sync after changing the upload, clear `uploadedImageURL` first.
 */
export const syncUploadImageURLBeforeValidate: CollectionBeforeValidateHook = async ({
  data,
  req,
}) => {
  if (!data?.imageFile) return data;

  // NOTE: Already synced — clear uploadedImageURL in admin to force a re-sync.
  if (data.uploadedImageURL) return data;

  const imageFile = data.imageFile;

  // -- If the relation is populated, read the media URL directly.
  if (typeof imageFile === "object" && imageFile !== null && "url" in imageFile) {
    if (typeof imageFile.url === "string") data.uploadedImageURL = imageFile.url;
    return data;
  }

  // -- If the relation is an ID, fetch media first, then copy its URL.
  if (isID(imageFile)) {
    const media = await req.payload.findByID({
      collection: "media",
      id: imageFile,
    });

    if (typeof media?.url === "string") data.uploadedImageURL = media.url;
  }

  return data;
};
