"use client";

import { PrivatePageHeader } from "#components/private/shared/PrivatePageHeader";
import { useSearchParams } from "next/navigation";

const NoMusicHeaderSection = () => {
  const searchParams = useSearchParams();
  const lang = searchParams.get("language");
  return (
    <PrivatePageHeader
      title={`${lang ?? ""} Collection`}
      description="Browse your private collection of vocals-only tracks."
    />
  );
};

export default NoMusicHeaderSection;
