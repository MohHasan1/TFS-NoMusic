import OfflineHomeContentSection from "#components/offline/home/sections/OfflineHomeContentSection";
import OfflineHomeHeaderSection from "#components/offline/home/sections/OfflineHomeHeaderSection";

export default function OfflinePage() {
  return (
    <div className="flex-1 pt-24 pb-32 max-w-7xl mx-auto w-full px-4 lg:px-8 space-y-10">
      <OfflineHomeHeaderSection />
      <OfflineHomeContentSection />
    </div>
  );
}
