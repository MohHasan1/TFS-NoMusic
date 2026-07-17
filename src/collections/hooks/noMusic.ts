import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionBeforeValidateHook,
  Payload,
} from "payload";
import { revalidateTag } from "next/cache";
import { getLibraryIdByLanguage } from "../helpers/library";
import type { Nomusic, NomusicLibrary } from "@/payload-types";
import { parseBuffer } from "music-metadata";
import { isID } from "#lib/utils";
import { tryCatchResponse } from "#trycatch-response";

// TODO: make it better
export const syncUploadAudioURLBeforeValidate: CollectionBeforeValidateHook<Nomusic> = async ({
  data,
  req,
}) => {
  if (!data?.audioFile) return data;
  // If uploadedAudioURL exist then already synced - To update clear uploadedAudioURL and then update.
  if (data?.uploadedAudioURL) return data;

  const audioFile = data.audioFile;

  // -- If the relation is populated, read the media URL directly.
  if (typeof audioFile === "object" && audioFile !== null && "url" in audioFile) {
    const mediaURL = typeof audioFile.url === "string" ? audioFile.url : undefined;
    if (!mediaURL) return data;

    // context.uploadedAudioURL = mediaURL;

    return {
      ...data,
      uploadedAudioURL: mediaURL,
    };
  }

  // -- If the relation is an ID, fetch media first, then copy its URL. (id can be num or string)
  if (isID(audioFile)) {
    const media = await req.payload.findByID({
      collection: "media",
      id: audioFile,
    });

    if (typeof media?.url !== "string") return data;

    // context.uploadedAudioURL = media.url;

    return {
      ...data,
      uploadedAudioURL: media.url,
    };
  }

  return data;
};

// NOTE: must run after syncUploadAudioURLBeforeValidate
export const syncAudioDurationBeforeValidate: CollectionBeforeValidateHook<Nomusic> = async ({
  data,
}) => {
  // -- If duration exists, do not calculate again.
  if (data?.duration) return data;

  // -- Only works when uploadedAudioURL is populated and has a URL.
  if (!data?.uploadedAudioURL) return data;
  const uploadedAudioURL = data.uploadedAudioURL;

  const response = await fetch(uploadedAudioURL);
  if (!response.ok) return data;

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const metadata = await parseBuffer(buffer);

  const durationInSeconds = metadata.format.duration;
  if (!durationInSeconds) return data;

  return {
    ...data,
    duration: Math.floor(durationInSeconds),
  };
};

export const syncUploadImageURLBeforeValidate: CollectionBeforeValidateHook<Nomusic> = async ({
  data,
  req,
}) => {
  if (!data?.imageFile) return data;
  // If uploadedImageURL exist then already synced - To update clear uploadedImageURL and then update.
  if (data?.uploadedImageURL) return data;

  const imageFile = data.imageFile;

  // -- If the relation is populated, read the media URL directly.
  if (typeof imageFile === "object" && imageFile !== null && "url" in imageFile) {
    const mediaURL = typeof imageFile.url === "string" ? imageFile.url : undefined;
    if (!mediaURL) return data;

    return {
      ...data,
      uploadedImageURL: mediaURL,
    };
  }

  // -- If the relation is an ID, fetch media first, then copy its URL.
  if (isID(imageFile)) {
    const media = await req.payload.findByID({
      collection: "media",
      id: imageFile,
    });

    if (typeof media?.url !== "string") return data;

    return {
      ...data,
      uploadedImageURL: media.url,
    };
  }

  return data;
};

// TODO: optimize itor updates
export const assignNomusicLibraryAfterChange: CollectionAfterChangeHook<Nomusic> = async ({
  doc,
  operation,
  req,
}) => {
  if (operation === "update") return;

  if (!doc.language) return;

  const libraryId = await getLibraryIdByLanguage(req.payload, doc.language);

  await req.payload.create({
    collection: "nomusic-libraries",
    overrideAccess: true,
    select: {},
    data: {
      nomusic: doc.id,
      library: libraryId,
    },
  });

  // TODO: if smt failed push to queue
};

export const revalidateNomusicAfterChange: CollectionAfterChangeHook<Nomusic> = async ({
  doc,
  previousDoc,
  operation,
  req,
}) => {
  revalidateTag(`nomusic:${doc.language}`, "max");
  revalidateTag("nomusic:all", "max");

  if (operation === "update" && previousDoc.language !== doc.language) {
    revalidateTag(`nomusic:${previousDoc.language}`, "max");
  }

  await revalidateLinkedLibraryAudio(req.payload, doc.id);
};

export const revalidateNomusicAfterDelete: CollectionAfterDeleteHook<Nomusic> = async ({
  doc,
  req,
}) => {
  revalidateTag(`nomusic:${doc.language}`, "max");
  revalidateTag("nomusic:all", "max");

  const links = await revalidateLinkedLibraryAudio(req.payload, doc.id);

  // Song is gone — clean up its now-orphaned nomusic-libraries rows. Deleting
  // each by id (not a bulk `where` delete) fires that collection's own
  // afterDelete hook per row, which recomputes trackCount and revalidates
  // library-audio:<id> again via syncLibraryTrackCountAfterDelete. Wrapped so
  // one failed delete doesn't reject the others or throw out of this hook.
  await Promise.all(
    links.map((link) =>
      tryCatchResponse(() =>
        req.payload.delete({
          collection: "nomusic-libraries",
          id: link.id,
          overrideAccess: true,
        }),
      ),
    ),
  );
};

// -- A song can belong to many libraries (language, album, user), so revalidate all of them.
async function revalidateLinkedLibraryAudio(payload: Payload, nomusicId: Nomusic["id"]) {
  const res = await tryCatchResponse(() =>
    payload.find({
      collection: "nomusic-libraries",
      limit: 100,
      depth: 0,
      pagination: false,
      select: { library: true },
      where: {
        nomusic: { equals: nomusicId },
      },
    }),
  );

  if (!res.isSuccess) return [];

  const links = res.data.docs as NomusicLibrary[];

  for (const link of links) {
    const libraryId = isID(link.library) ? link.library : link.library.id;
    revalidateTag(`library-audio:${libraryId}`, "max");
  }

  return links;
}
