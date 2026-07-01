// "use client";

// import { useCallback } from "react";
// import { toast } from "sonner";

// import { useTrackPlayback } from "#modules/hooks/useTrackPlayback";
// import { OFFLINE_STORAGE } from "#offline/constants";
// import { MediaRepo } from "#offline/repositories/media";
// import type { TNoMusic } from "#types/nomusic";

// const mediaUrlCache = new Map<string, string>();

// export function useOfflineTrackPlayback(sourceKey: string) {
//   const { start: startPlayback } = useTrackPlayback(sourceKey);

//   const start = useCallback(
//     async (tracks: TNoMusic[], selectedTrack: TNoMusic) => {
//       const playableTracks = (
//         await Promise.all(tracks.map((track) => toPlayableTrack(track)))
//       ).filter(isPlayableTrack);

//       if (playableTracks.length === 0) {
//         toast.error("No offline audio is available yet.");
//         return;
//       }

//       const playableSelectedTrack = playableTracks.find((track) => track.id === selectedTrack.id);
//       if (!playableSelectedTrack) {
//         toast.error("This offline track is not available on this device.");
//         return;
//       }

//       startPlayback(playableTracks, playableSelectedTrack);
//     },
//     [startPlayback],
//   );

//   return {
//     start,
//   };
// }

// async function toPlayableTrack(track: TNoMusic): Promise<TNoMusic | null> {
//   const audioStreamUrl = await resolveCachedMediaUrl(track.audioStreamUrl);
//   if (!audioStreamUrl) {
//     return null;
//   }

//   const coverImage = await resolveCachedMediaUrl(track.coverImage);

//   return {
//     ...track,
//     audioStreamUrl,
//     coverImage,
//   };
// }

// function isPlayableTrack(track: TNoMusic | null): track is TNoMusic {
//   return track !== null;
// }

// async function resolveCachedMediaUrl(src?: string | null) {
//   if (!src) return null;
//   if (!isOfflineCacheKey(src)) return src;

//   const cachedUrl = mediaUrlCache.get(src);
//   if (cachedUrl) {
//     return cachedUrl;
//   }

//   const result = await MediaRepo.getBlob(src);
//   if (!result.isSuccess || !result.data) {
//     return null;
//   }

//   const objectUrl = URL.createObjectURL(result.data);
//   mediaUrlCache.set(src, objectUrl);

//   return objectUrl;
// }

// function isOfflineCacheKey(src: string) {
//   return src.startsWith(OFFLINE_STORAGE.ROOT_PATH);
// }
