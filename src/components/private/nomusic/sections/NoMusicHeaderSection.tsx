"use client";

import { useSearchParams } from "next/navigation";

import { PrivatePageHeader } from "#components/private/shared/PrivatePageHeader";
import { isLanguage } from "#constants/private/nomusic-language";
import { QUERY } from "#constants/private/query";
import { capitalizeFirstLetter } from "#lib/utils";

const NoMusicHeaderSection = () => {
  const searchParams = useSearchParams();
  const rawLanguage = searchParams.get(QUERY.LANGUAGE)?.trim();
  const language = isLanguage(rawLanguage) ? rawLanguage : undefined;

  return (
    <PrivatePageHeader
      title={language ? `${capitalizeFirstLetter(language)} Collection` : "Collection"}
      description={
        language
          ? `Explore private ${capitalizeFirstLetter(language)} NoMusic vocals in one clean collection.`
          : "Explore private NoMusic vocals in one clean collection."
      }
    />
  );
};

export default NoMusicHeaderSection;
