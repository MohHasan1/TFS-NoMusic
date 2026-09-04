import { PlaylistView } from "#features/playlists/components/views/PlaylistView";
import { getCurrentUser } from "#services/auth/auth.ports";

export default async function PlaylistPage({ params }: TProps) {
  const { id } = await params;

  const userRes = await getCurrentUser();
  const currentUserId = userRes.isSuccess ? userRes.data.id : null;

  return <PlaylistView id={id} currentUserId={currentUserId} />;
}

type TProps = {
  params: Promise<{ id: string }>;
};
