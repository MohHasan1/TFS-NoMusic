import { OfflineLibraryAudioSection } from "#features/offline/components/library/sections/OfflineLibraryAudioSection";
import { OfflineLibraryHeroSection } from "#features/offline/components/library/sections/OfflineLibraryHeroSection";

export default async function OfflineLibraryPage({ params }: TProps) {
  const { id } = await params;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 px-4 pt-24 pb-32 lg:px-8">
      <OfflineLibraryHeroSection libId={id} />
      <OfflineLibraryAudioSection libId={id} />
    </div>
  );
}

type TProps = {
  params: Promise<{ id: string }>;
};
