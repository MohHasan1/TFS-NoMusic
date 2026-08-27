import type { TLANGUAGES_VALUES } from "#constants/private/nomusic-language";
import { NomusicLanguageFilter } from "../elements/NomusicLanguageFilter";
import { NomusicSearchInput } from "../elements/NomusicSearchInput";

export function NoMusicFiltersSection({ language }: TProps) {
  return (
    <section className="flex items-center justify-between gap-3">
      <NomusicLanguageFilter language={language} />
      <NomusicSearchInput />
    </section>
  );
}

type TProps = {
  language?: TLANGUAGES_VALUES;
};
