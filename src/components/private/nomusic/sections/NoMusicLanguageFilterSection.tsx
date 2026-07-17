import { NomusicLanguageFilter } from "../elements/NomusicLanguageFilter";
import type { TLANGUAGES_VALUES } from "#constants/private/nomusic-language";

export function NoMusicLanguageFilterSection({ language }: TProps) {
  return (
    <section className="flex justify-center">
      <NomusicLanguageFilter language={language} />
    </section>
  );
}

type TProps = {
  language?: TLANGUAGES_VALUES;
};
