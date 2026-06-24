import { connection } from "next/server";
import NoMusicContent from "../elements/NoMusicContent";
import { NOMUSIC_PAGINATION } from "#constants/private/pagination";
import { listNomusicPaginated } from "#services/nomusic/no-music.ports";

const NoMusicContentSection = async () => {
  // so connection() there makes only the NoMusicContentSection island request-time (dynamic)
  await connection();

  const res = await listNomusicPaginated({
    page: NOMUSIC_PAGINATION.PAGE,
    limit: NOMUSIC_PAGINATION.LIMIT,
  });

  return <NoMusicContent initialNomusic={res} />;
};

export default NoMusicContentSection;
