import LibContentSection from "#components/private/libraries/sections/LibContentSection";
import LibHeaderSection from "#components/private/libraries/sections/LibHeaderSection";
import { PrivatePageShell } from "#components/private/shared/PrivatePageShell";

const LibrariesPage = () => {
  return (
    <PrivatePageShell>
      <LibHeaderSection />
      <LibContentSection />
    </PrivatePageShell>
  );
};
export default LibrariesPage;
