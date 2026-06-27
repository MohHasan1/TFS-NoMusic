import { notFound } from "next/navigation";
import { RiMusic2Line, RiUser3Line } from "@remixicon/react";

import type { Library } from "#payload-types";
import { getLibrary } from "#services/libraries/libraries.ports";
import { LibraryCover } from "../elements/LibraryCover";
import { connection } from "next/server";

export async function LibraryHeroSection({ libId }: TProps) {
  await connection();
  const response = await getLibrary(libId);

  if (!response.isSuccess) {
    notFound();
  }

  const library = response.data;
  const noMusicLabel = `${library.trackCount ?? 0} NoMusic`;
  const libAuthor = library.author || "NoMusic";

  return (
    <section className="relative">
      <div className="grid gap-6 lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)] lg:items-center lg:gap-8">
        <LibraryCover
          src={library.uploadedImageURL}
          alt={`${library.name} cover`}
          name={library.name}
        />

        <div className="space-y-4 lg:space-y-5 space-x-4">

          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-white/95 sm:text-4xl lg:text-5xl">
              {library.name}
            </h1>

            <p className="max-w-2xl text-sm leading-7 text-white/62 sm:text-base">
              {library.description || "Private library collection."}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 text-sm text-white/60">
            <RiMusic2Line className="size-4 shrink-0 text-primary-400" />
            <span className="font-medium">{noMusicLabel}</span>
          </div>

          <div className="inline-flex items-center gap-2 text-sm text-white/60">
            <RiUser3Line className="size-4 shrink-0 text-primary-400" />
            <span className="font-medium">{libAuthor}</span>
          </div>
          
        </div>
      </div>
    </section>
  );
}

type TProps = {
  libId: Library["id"];
};
