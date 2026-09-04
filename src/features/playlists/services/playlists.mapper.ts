import { getCoverImageURL } from "#media-helpers";
import type { Playlist } from "#payload-types";
import type { TPlaylist } from "../types/playlist";

export function mapPlaylist(doc: Playlist): TPlaylist {
  return {
    id: doc.id,
    name: doc.name,
    author: doc.author,
    description: doc.description,
    visibility: doc.visibility,
    trackCount: doc.trackCount,
    updatedAt: doc.updatedAt,
    coverImage: doc.uploadedImageURL || getCoverImageURL(doc.imageFile),
  };
}

export function mapPlaylists(docs: Playlist[]): TPlaylist[] {
  return docs.map(mapPlaylist);
}
