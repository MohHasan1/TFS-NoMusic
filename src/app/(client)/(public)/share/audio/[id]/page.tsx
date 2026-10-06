import type { Metadata } from "next";
import { Suspense } from "react";
import { AudioShareFallback } from "#features/audio-sharing/components/elements/AudioShareFallback";
import { AudioShareView, getSharedAudio } from "#features/audio-sharing/components/views/AudioShareView";

export async function generateMetadata({ params }: TProps): Promise<Metadata> {
  const { id } = await params;
  const response = await getSharedAudio(id);

  // Not found
  if (!response.isSuccess || !response.data) {
    return {
      title: "Track Unavailable",
      description: "This shared NoMusic track is unavailable.",
    };
  }

  // Found
  const track = response.data;
  const artist = track.artist || "Unknown artist";
  const title = `${track.name} — ${artist}`;
  const description = `Listen to “${track.name}” by ${artist}, vocals-only on NoMusic.`;

  return {
    title,
    description,
    ...(track.coverImage
      ? {
          openGraph: {
            title,
            description,
            images: [track.coverImage],
          },
          twitter: {
            card: "summary_large_image" as const,
            title,
            description,
            images: [track.coverImage],
          },
        }
      : {}),
  };
}

export default function AudioSharePage({ params }: TProps) {
  return (
    <Suspense fallback={<AudioShareFallback />}>
      <AudioShareView params={params} />
    </Suspense>
  );
}

type TProps = {
  params: Promise<{ id: string }>;
};
