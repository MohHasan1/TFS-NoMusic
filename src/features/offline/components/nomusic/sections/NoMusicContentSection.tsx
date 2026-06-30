import { OFFLINE_NOMUSIC_UI_ITEMS } from "#features/offline/components/shared/mock-data";
import { OfflineNoMusicCard } from "../elements/OfflineNoMusicCard";

export default function NoMusicContentSection() {
  return (
    <section className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {OFFLINE_NOMUSIC_UI_ITEMS.map((noMusic) => (
        <OfflineNoMusicCard key={noMusic.id} noMusic={noMusic} />
      ))}
    </section>
  );
}
