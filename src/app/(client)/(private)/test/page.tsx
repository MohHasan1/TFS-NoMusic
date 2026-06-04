import { NOMUSIC_PAGINATION } from "#constants/private/pagination";
import NoMusicHeader from "#components/private/nomusic/sections/NoMusicHeaderSection";
import { listNomusicPaginated } from "#services/nomusic/no-music.ports";
import { NoMusicContent } from "./test";

export default async function NoMusicPage() {
  const res = await listNomusicPaginated({
    page: NOMUSIC_PAGINATION.PAGE,
    limit: NOMUSIC_PAGINATION.LIMIT,
  });
  if (!res.isSuccess) return <></>;

  return (
    <div className="flex-1 pt-24 pb-32 max-w-7xl mx-auto w-full px-4 lg:px-8 space-y-10">
      <NoMusicHeader />
      <NoMusicContent initialData={res.data} />
    </div>
  );
}
