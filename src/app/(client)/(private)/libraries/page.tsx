import type { Metadata } from "next";
import LibContentSection from "#components/private/libraries/sections/LibContentSection";
import LibHeaderSection from "#components/private/libraries/sections/LibHeaderSection";
import { PrivatePageShell } from "#components/private/shared/PrivatePageShell";

export const metadata: Metadata = {
  title: "Libraries",
  description: "Browse albums, custom libraries, and language libraries in your private NoMusic space.",
};

const LibrariesPage = () => {
  return (
    <PrivatePageShell>
      <LibHeaderSection />
      <LibContentSection />
    </PrivatePageShell>
  );
};
export default LibrariesPage;
