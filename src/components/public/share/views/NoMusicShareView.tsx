import { notFound } from "next/navigation";
import { cache } from "react";
import { findPublicAudioShareById } from "#services/nomusic/no-music.ports";
import { NoMusicShareCard } from "../elements/NoMusicShareCard";

export const getSharedTrack = cache(findPublicAudioShareById);

export async function NoMusicShareView({ params }: TProps) {
  const { id } = await params;
  const response = await getSharedTrack(id);

  if (!response.isSuccess || !response.data) {
    notFound();
  }

  return <NoMusicShareCard track={response.data} />;
}

type TProps = {
  params: Promise<{ id: string }>;
};
