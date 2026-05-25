import { redirect } from "next/navigation";
import { PUBLIC_ROUTES } from "#constants/routes";
import { getCurrentUser } from "#services/auth/auth.ports";
import RequestNomusicSection from "#components/private/request-nomusic/sections/RequestNomusicSection";

export default async function RequestSongsPage() {
  const user = await getCurrentUser();
  if (!user.isSuccess) {
    redirect(PUBLIC_ROUTES.SIGNIN);
  }

  return <RequestNomusicSection />;
}
