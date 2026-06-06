import { redirect } from "next/navigation";

import { NoMusicContentSection } from "#components/private/nomusic/sections/noMusicContentSection";
import NoMusicHeaderSection from "#components/private/nomusic/sections/NoMusicHeaderSection";
import { listNomusicPaginated } from "#services/nomusic/no-music.ports";
import { NOMUSIC_PAGINATION } from "#constants/private/pagination";
import { getCurrentUser } from "#services/auth/auth.ports";
import { PUBLIC_ROUTES } from "#constants/routes";

export default async function NoMusicPage() {
  const user = await getCurrentUser();
  if (!user.isSuccess) {
    redirect(PUBLIC_ROUTES.SIGNIN);
  }

  const res = await listNomusicPaginated({
    page: NOMUSIC_PAGINATION.PAGE,
    limit: NOMUSIC_PAGINATION.LIMIT,
  });

  return (
    <div className="flex-1 pt-24 pb-32 max-w-7xl mx-auto w-full px-4 lg:px-8 space-y-10">
      <NoMusicHeaderSection />
      <NoMusicContentSection res={res} />
    </div>
  );
}
