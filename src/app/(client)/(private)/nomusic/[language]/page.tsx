import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { NoMusicView } from "#components/private/nomusic/views/NoMusicView";
import { isLanguage, LANGUAGES_VALUES } from "#constants/private/nomusic-language";
import { PRIVATE_ROUTES } from "#constants/routes";
import { capitalizeFirstLetter } from "#lib/utils";
import { findAudioBySearchQuery } from "#services/nomusic/no-music.ports";

export async function generateMetadata({ params, searchParams }: TProps): Promise<Metadata> {
  const [{ language }, { q }] = await Promise.all([params, searchParams]);

  // Unknown language
  if (!isLanguage(language)) {
    return {
      title: "Unknown NoMusic",
      description: "Explore private NoMusic vocals in one clean collection.",
    };
  }

  const languageLabel = capitalizeFirstLetter(language);
  const search = typeof q === "string" ? q.trim() : "";

  // No ?q=
  if (!search) {
    return {
      title: `${languageLabel} NoMusic`,
      description: `Explore private ${languageLabel} NoMusic vocals in one clean collection.`,
    };
  }

  // Not found
  const response = await findAudioBySearchQuery(search, language);

  if (!response.isSuccess || !response.data) {
    return {
      title: `Search: ${search}`,
      description: `Browse ${languageLabel} NoMusic results for “${search}”.`,
    };
  }

  // Found
  const track = response.data;
  const artist = track.artist || "Unknown artist";
  const title = `${track.name} — ${artist}`;
  const description = `Listen to “${track.name}” by ${artist}, vocals-only on NoMusic.`;

  return {
    title,
    description,
    ...(track.coverImage
      ? {
          openGraph: {
            title,
            description,
            images: [track.coverImage],
          },
        }
      : {}),
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
  searchParams: Promise<{ q?: string | string[] }>;
};
