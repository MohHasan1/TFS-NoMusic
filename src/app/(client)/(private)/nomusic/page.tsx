import type { Metadata } from "next";
import { NoMusicView } from "#components/private/nomusic/views/NoMusicView";
import { findAudioBySearchQuery } from "#services/nomusic/no-music.ports";

export async function generateMetadata({ searchParams }: TProps): Promise<Metadata> {
  const { q } = await searchParams;
  const search = typeof q === "string" ? q.trim() : "";

  // No ?q=
  if (!search) {
    return {
      title: "Browse",
      description: "Explore private NoMusic vocals in one clean collection.",
    };
  }

  // Not found
  const response = await findAudioBySearchQuery(search);
  if (!response.isSuccess || !response.data) {
    return {
      title: `Search: ${search}`,
      description: `Browse NoMusic results for “${search}”.`,
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
        }
      : {}),
  };
}

export default function NoMusicPage() {
  return <NoMusicView />;
}

type TProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};
