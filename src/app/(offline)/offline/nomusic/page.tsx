import NoMusicContentSection from "#features/offline/components/nomusic/sections/NoMusicContentSection";
import NoMusicHeaderSection from "#features/offline/components/nomusic/sections/NoMusicHeaderSection";
import { NoMusicLanguageFilterSection } from "#features/offline/components/nomusic/sections/NoMusicLanguageFilterSection";

export default function OfflineNoMusicPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col space-y-10 px-4 pt-24 pb-32 lg:px-8">
      <NoMusicHeaderSection />
      <NoMusicLanguageFilterSection />
      <NoMusicContentSection />
    </div>
  );
}
