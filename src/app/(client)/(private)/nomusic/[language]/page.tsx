import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { NoMusicView } from "#components/private/nomusic/views/NoMusicView";
import { isLanguage, LANGUAGES_VALUES } from "#constants/private/nomusic-language";
import { PRIVATE_ROUTES } from "#constants/routes";
import { capitalizeFirstLetter } from "#lib/utils";

export async function generateMetadata({ params }: TProps): Promise<Metadata> {
  const { language } = await params;

  let languageLabel = "Unknown";

  if (isLanguage(language)) {
    languageLabel = capitalizeFirstLetter(language);
  }

  return {
    title: `${languageLabel} NoMusic`,
    description: `Explore private ${languageLabel} NoMusic vocals in one clean collection.`,
  };
}

export function generateStaticParams() {
  return LANGUAGES_VALUES.map((language) => ({ language }));
}

export default async function NoMusicLanguagePage({ params }: TProps) {
  const { language } = await params;

  if (!isLanguage(language)) {
    redirect(PRIVATE_ROUTES.NOMUSIC);
  }

  return <NoMusicView language={language} />;
}

type TProps = {
  params: Promise<{ language: string }>;
};
