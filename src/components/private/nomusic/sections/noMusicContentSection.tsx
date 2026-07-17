import { cacheLife, cacheTag } from "next/cache";
import NoMusicContent from "../elements/NoMusicContent";
import { NOMUSIC_PAGINATION } from "#constants/private/pagination";
import { listNomusicPaginated } from "#services/nomusic/no-music.ports";
import type { TLANGUAGES_VALUES } from "#constants/private/nomusic-language";
import { CACHE_TAG } from "#constants/cache-tags";

const NoMusicContentSection = async ({ language }: TProps) => {
  "use cache";

  cacheLife("weeks");
  cacheTag(language ? CACHE_TAG.NOMUSIC.LIST(language) : CACHE_TAG.NOMUSIC.ALL);

  const res = await listNomusicPaginated({
    page: NOMUSIC_PAGINATION.PAGE,
    limit: NOMUSIC_PAGINATION.LIMIT,
    language,
  });

  return <NoMusicContent initialNomusic={res} language={language} />;
};

export default NoMusicContentSection;

type TProps = {
  language?: TLANGUAGES_VALUES;
};
