import { getCoverImageURL } from "#media-helpers";
import type { Nomusic, Playlist } from "#payload-types";
import { mapNomusic } from "#services/nomusic/no-music.mapper";
import type { TPlaylist, TPlaylistDetail } from "../types/playlist";

export function mapPlaylists(docs: Playlist[]): TPlaylist[] {
  return docs.map(mapPlaylist);
}

export function mapPlaylistDetail(doc: Playlist): TPlaylistDetail {
  const trackDocs = (doc.tracks ?? []).flatMap((track) =>
    track && typeof track === "object" ? [track as Nomusic] : [],
  );

  return {
    ...mapPlaylist(doc),
    tracks: mapNomusic(trackDocs),
  };
}

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
