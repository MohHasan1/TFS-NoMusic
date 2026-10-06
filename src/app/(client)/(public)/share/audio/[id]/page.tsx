import type { Metadata } from "next";
import { Suspense } from "react";
import { NoMusicShareFallback } from "#components/public/share/elements/NoMusicShareFallback";
import { getSharedTrack, NoMusicShareView } from "#components/public/share/views/NoMusicShareView";

export async function generateMetadata({ params }: TProps): Promise<Metadata> {
  const { id } = await params;
  const response = await getSharedTrack(id);

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
    <Suspense fallback={<NoMusicShareFallback />}>
      <NoMusicShareView params={params} />
    </Suspense>
  );
}

type TProps = {
  params: Promise<{ id: string }>;
};
