import { connection } from "next/server";
import { RiUserLine } from "@remixicon/react";

import { PrivateEmptyState } from "#components/private/shared/PrivateEmptyState";
import { PRIVATE_ROUTES } from "#constants/routes";
import { getCurrentUser } from "#services/auth/auth.ports";
import { ProfileOverviewSection } from "./ProfileOverviewSection";

export async function ProfileOverviewServerSection() {
  await connection();
  const response = await getCurrentUser();

  if (!response.isSuccess) {
    return (
      <PrivateEmptyState
        title="Profile unavailable"
        description="We could not load your account details right now. Jump back to your NoMusic collection and try again in a moment."
        icon={RiUserLine}
        ctaHref={PRIVATE_ROUTES.NOMUSIC}
        ctaLabel="Back to NoMusic"
      />
    );
  }

  return (
    <ProfileOverviewSection
      createdAt={response.data.createdAt}
      email={response.data.email}
      isVerified={response.data._verified}
      name={response.data.name}
      preferredAudioLang={response.data.prefAudioLang}
      userAvatarUrl={response.data.uploadedImageURL}
    />
  );
}
