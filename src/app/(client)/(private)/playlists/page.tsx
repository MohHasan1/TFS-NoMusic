import type { Metadata } from "next";
import { PlaylistsView } from "#features/playlists/components/views/PlaylistsView";

export const metadata: Metadata = {
  title: "Playlists",
  description: "Create and manage playlists in your private NoMusic space.",
};

export default function PlaylistsPage() {
  return <PlaylistsView />;
}
