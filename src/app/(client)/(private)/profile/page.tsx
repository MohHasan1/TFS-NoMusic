import type { Metadata } from "next";
import { Suspense } from "react";

import ProfileHeaderSection from "#components/private/profile/sections/ProfileHeaderSection";
import { ProfileOverviewFallback } from "#components/private/profile/sections/ProfileOverviewFallback";
import { ProfileOverviewServerSection } from "#components/private/profile/sections/ProfileOverviewServerSection";
import { PrivatePageShell } from "#components/private/shared/PrivatePageShell";

export const metadata: Metadata = {
  title: "Profile",
  description: "View your NoMusic account details and preferences.",
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
