import { Suspense } from "react";

import ProfileHeaderSection from "#components/private/profile/sections/ProfileHeaderSection";
import { ProfileOverviewFallback } from "#components/private/profile/sections/ProfileOverviewFallback";
import { ProfileOverviewServerSection } from "#components/private/profile/sections/ProfileOverviewServerSection";
import { PrivatePageShell } from "#components/private/shared/PrivatePageShell";

export const unstable_instant = {
  prefetch: "static",
};

export default function ProfilePage() {
  return (
    <PrivatePageShell>
      <ProfileHeaderSection />
      <Suspense fallback={<ProfileOverviewFallback />}>
        <ProfileOverviewServerSection />
      </Suspense>
    </PrivatePageShell>
  );
}
