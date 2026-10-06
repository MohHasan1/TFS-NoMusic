import type { Metadata } from "next";
import RequestNomusicHeaderSection from "#components/private/request-nomusic/sections/RequestNomusicHeaderSection";
import RequestNomusicSection from "#components/private/request-nomusic/sections/RequestNomusicSection";
import { PrivatePageShell } from "#components/private/shared/PrivatePageShell";

export const metadata: Metadata = {
  title: "Request",
  description: "Request a vocals-only track for your private NoMusic collection.",
};

export default async function RequestSongsPage() {
  return (
    <PrivatePageShell>
      <RequestNomusicHeaderSection />
      <RequestNomusicSection />
    </PrivatePageShell>
  );
}
