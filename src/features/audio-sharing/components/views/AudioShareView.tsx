import { notFound } from "next/navigation";
import { cache } from "react";
import { findPublicAudioShareById } from "../../services/audio-sharing.ports";
import { AudioShareCard } from "../elements/AudioShareCard";

export const getSharedAudio = cache(findPublicAudioShareById);

export async function AudioShareView({ params }: TProps) {
  const { id } = await params;
  const response = await getSharedAudio(id);

  if (!response.isSuccess || !response.data) {
    notFound();
  }

  return <AudioShareCard track={response.data} />;
}

type TProps = {
  params: Promise<{ id: string }>;
};
