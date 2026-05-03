import { getPayloadClient } from "@/lib/payload-client"

export type BrowsableTrack = {
  id: number
  title: string
  artist?: string
  album?: string
  duration?: number
  genre?: string
  language?: string
  streamURL: string
  coverURL?: string
}

function getMediaType(value: unknown) {
  if (!value || typeof value !== "object") return undefined
  const media = value as Record<string, unknown>
  return typeof media.type === "string" ? media.type : undefined
}

export async function listBrowsableTracks(): Promise<BrowsableTrack[]> {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: "nomusic",
    depth: 1,
    limit: 100,
    sort: "-createdAt",
    pagination: false,
  })

  const tracks: BrowsableTrack[] = []

  for (const doc of result.docs as unknown as Array<Record<string, unknown>>) {
    const audioFile = doc.audioFile

    // Only show tracks backed by audio media.
    if (getMediaType(audioFile) !== "audio") {
      continue
    }

    if (typeof doc.streamURL !== "string" || !doc.streamURL) {
      continue
    }

    const coverImage = (doc.coverImage as Record<string, unknown> | undefined) ?? {}
    const coverUpload = coverImage.upload as Record<string, unknown> | undefined

    const coverURLFromUpload =
      getMediaType(coverUpload) === "image" && typeof coverUpload?.url === "string"
        ? coverUpload.url
        : undefined

    const coverURLFromField =
      typeof coverImage.url === "string" && coverImage.url ? coverImage.url : undefined

    const coverURL = coverURLFromField || coverURLFromUpload

    tracks.push({
      id: Number(doc.id),
      title: typeof doc.title === "string" && doc.title ? doc.title : "Untitled",
      artist: typeof doc.artist === "string" ? doc.artist : undefined,
      album: typeof doc.album === "string" ? doc.album : undefined,
      duration: typeof doc.duration === "number" ? doc.duration : undefined,
      genre: typeof doc.genre === "string" ? doc.genre : undefined,
      language: typeof doc.language === "string" ? doc.language : undefined,
      streamURL: doc.streamURL,
      coverURL,
    })
  }

  return tracks
}
