import LibContentSection from "#components/private/libraries/sections/LibContentSection";
import LibHeaderSection from "#components/private/libraries/sections/LibHeaderSection";

const LibrariesPage = () => {
  return (
    <div className="flex-1 pt-24 pb-32 max-w-7xl mx-auto w-full px-4 lg:px-8 space-y-10">
      <LibHeaderSection />
      <LibContentSection />
    </div>
  );
};
export default LibrariesPage;
