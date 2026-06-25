import "server-only";

import { LIBRARIES_DEFAULT_SELECT } from "#collection-default-select/libraries";
import { mapNomusic } from "#services/nomusic/no-music.mapper";
import { mapLibraries, mapLibrary } from "#services/libraries/libraries.mapper";
import { tryCatchResponse } from "#trycatch-response";
import { getPayloadClient } from "#payload-client";
import type { Library, Nomusic, NomusicLibrary } from "#payload-types";


export async function listLibrariesAdapter(type?: Library["type"]) {
  const payload = await getPayloadClient();

  return tryCatchResponse(async () => {
    const result = await payload.find({
      collection: "libraries",
      depth: 0,
      pagination: false,
      sort: "-updatedAt",
      select: LIBRARIES_DEFAULT_SELECT,
      where: type
        ? {
            type: {
              equals: type,
            },
          }
        : undefined,
    });

    return {
      ...result,
      docs: mapLibraries(result.docs as Library[]),
    };
  });
}

export async function getLibraryAdapter(id: Library["id"]) {
  const payload = await getPayloadClient();

  return tryCatchResponse(async () => {
    const library = await payload.findByID({
      collection: "libraries",
      id,
      depth: 0,
      select: LIBRARIES_DEFAULT_SELECT,
    });

    return mapLibrary(library as Library);
  });
}

export async function getLibraryAudioAdapter(id: Library["id"]) {
  const payload = await getPayloadClient();

  return tryCatchResponse(async () => {
    const relations = await payload.find({
      collection: "nomusic-libraries",
      depth: 1,
      pagination: false,
      sort: "sortOrder",
      where: {
        library: {
          equals: id,
        },
      },
    });

    const noMusicDocs = relations.docs.flatMap((doc) => {
      const relation = (doc as NomusicLibrary).nomusic;
      return relation && typeof relation === "object" ? [relation as Nomusic] : [];
    });

    return mapNomusic(noMusicDocs);
  });
}
