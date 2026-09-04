import { PlaylistView } from "#features/playlists/components/views/PlaylistView";

export default async function PlaylistPage({ params }: TProps) {
  const { id } = await params;

  return <PlaylistView id={id} />;
}

type TProps = {
  params: Promise<{ id: string }>;
};
