import { revalidateTag } from "next/cache";
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import { isID } from "#lib/utils";
import type { Library, NomusicLibrary } from "#payload-types";
import { tryCatchResponse } from "#trycatch-response";

export const syncLibraryTrackCountAfterChange: CollectionAfterChangeHook<NomusicLibrary> = async ({
  doc,
  operation,
  previousDoc,
  req,
}) => {
  const affectedLibraryIds = new Set<string | number>();

  const currentLibraryId = resolveLibraryId(doc.library);
  if (currentLibraryId) {
    affectedLibraryIds.add(currentLibraryId);
  }

  if (operation === "update") {
    const previousLibraryId = resolveLibraryId(previousDoc.library);
    if (previousLibraryId) {
      affectedLibraryIds.add(previousLibraryId);
    }
  }

  await Promise.all(
    Array.from(affectedLibraryIds).map((libraryId) => syncLibraryTrackCount(req, libraryId)),
  );

  for (const libraryId of affectedLibraryIds) {
    revalidateTag(`library-audio:${libraryId}`, "max");
  }
};

export const syncLibraryTrackCountAfterDelete: CollectionAfterDeleteHook<NomusicLibrary> = async ({
  doc,
  req,
}) => {
  const libraryId = resolveLibraryId(doc.library);

  if (!libraryId) return;

  await syncLibraryTrackCount(req, libraryId);
  revalidateTag(`library-audio:${libraryId}`, "max");
};

// --- Helpers
function resolveLibraryId(value: NomusicLibrary["library"] | null | undefined) {
  if (isID(value)) {
    return value;
  }

  if (value && typeof value === "object" && "id" in value && isID(value.id)) {
    return value.id;
  }

  return null;
}

async function syncLibraryTrackCount(
  req: Parameters<CollectionAfterChangeHook<NomusicLibrary>>[0]["req"],
  libraryId: string | number,
) {
  await tryCatchResponse(async () => {
    const { totalDocs } = await req.payload.count({
      collection: "nomusic-libraries",
      overrideAccess: true,
      where: {
        library: {
          equals: libraryId,
        },
      },
    });

    await req.payload.update({
      collection: "libraries",
      id: libraryId,
      overrideAccess: true,
      select: {},
      data: {
        trackCount: totalDocs,
      } satisfies Partial<Library>,
    });
  });
}
