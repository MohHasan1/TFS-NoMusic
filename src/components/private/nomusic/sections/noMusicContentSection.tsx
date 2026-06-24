import NoMusicContent from "../elements/NoMusicContent";
import { NOMUSIC_PAGINATION } from "#constants/private/pagination";
import { listNomusicPaginated } from "#services/nomusic/no-music.ports";

const NoMusicContentSection = async () => {
  const res = await listNomusicPaginated({
    page: NOMUSIC_PAGINATION.PAGE,
    limit: NOMUSIC_PAGINATION.LIMIT,
  });

  return <NoMusicContent initialNomusic={res} />;
};

export default NoMusicContentSection;
