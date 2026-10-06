import type { Metadata } from "next";
import { NoMusicView } from "#components/private/nomusic/views/NoMusicView";

export const metadata: Metadata = {
  title: "Browse",
  description: "Explore private NoMusic vocals in one clean collection.",
};

export default function NoMusicPage() {
  return <NoMusicView />;
}
