import { getCoverImageURL } from "#media-helpers";
import type { Library } from "#payload-types";
import type { TLibrary } from "#types/library";

export function mapLibrary(doc: Library): TLibrary {
  return {
    id: doc.id,
    name: doc.name,
    slug: doc.slug,
    type: doc.type,
    author: doc.author,
    updatedAt: doc.updatedAt,
    trackCount: doc.trackCount,
    description: doc.description,
    uploadedImageURL: doc.uploadedImageURL || getCoverImageURL(doc.imageFile),
  };
}

export function mapLibraries(docs: Library[]) {
  return docs.map(mapLibrary);
}
