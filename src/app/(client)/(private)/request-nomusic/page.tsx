import RequestNomusicHeaderSection from "#components/private/request-nomusic/sections/RequestNomusicHeaderSection";
import RequestNomusicSection from "#components/private/request-nomusic/sections/RequestNomusicSection";
import { PrivatePageShell } from "#components/private/shared/PrivatePageShell";

export default async function RequestSongsPage() {
  return (
    <PrivatePageShell>
      <RequestNomusicHeaderSection />
      <RequestNomusicSection />
    </PrivatePageShell>
  );
}
