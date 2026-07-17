import { PrivatePageHeader } from "#components/private/shared/PrivatePageHeader";
import type { TLANGUAGES_VALUES } from "#constants/private/nomusic-language";
import { capitalizeFirstLetter } from "#lib/utils";

const NoMusicHeaderSection = ({ language }: TProps) => {
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

type TProps = {
  language?: TLANGUAGES_VALUES;
};
