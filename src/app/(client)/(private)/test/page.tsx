import { redirect } from "next/navigation";

import { listNomusicPaginated } from "#services/no-music/no-music.ports";
import NoMusicHeader from "#components/private/nomusic/elements/NoMusicHeader";
import { getCurrentUser } from "#services/auth/auth.ports";
import { PUBLIC_ROUTES } from "#constants/routes";
import { NoMusicBrowser } from "./child";

export default async function NoMusicPage() {
  const user = await getCurrentUser();
  if (!user.isSuccess) {
    redirect(PUBLIC_ROUTES.SIGNIN);
  }

  const res = await listNomusicPaginated({ page: 1, limit: 1 });

  const initialData = res.isSuccess
    ? res.data
    : {
        docs: [],
        page: 1,
        limit: 1,
        totalDocs: 0,
        totalPages: 1,
        pagingCounter: 1,
        hasNextPage: false,
        hasPrevPage: false,
        nextPage: null,
        prevPage: null,
      };

  return (
    <div className="border mx-auto flex-1 max-w-7xl w-full space-y-10 px-4 pt-24 pb-32 lg:px-8">
      <NoMusicHeader />
      <NoMusicBrowser initialData={initialData} />
    </div>
  );
}
