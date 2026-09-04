import { PrivatePageShell } from "#components/private/shared/PrivatePageShell";
import PlaylistsContentSection from "../sections/PlaylistsContentSection";
import PlaylistsHeaderSection from "../sections/PlaylistsHeaderSection";

export function PlaylistsView() {
  return (
    <PrivatePageShell>
      <PlaylistsHeaderSection />
      <PlaylistsContentSection />
    </PrivatePageShell>
  );
}
