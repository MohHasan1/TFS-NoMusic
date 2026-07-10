// import { connection } from "next/server";
import { notFound } from "next/navigation";
import { RiMusic2Line, RiUser3Line } from "@remixicon/react";

import { getLibrary, getLibraryAudio } from "#services/libraries/libraries.ports";
import { LibraryDownloadButton } from "../elements/LibraryDownloadButton";
import { LibraryCover } from "../elements/LibraryCover";
import type { Library } from "#payload-types";

// TODO: REFATOR - use zustand - for double fetch of getLibraryAudio
export async function LibraryHeroSection({ libId }: TProps) {
  // await connection();
  const [response, tracksResponse] = await Promise.all([getLibrary(libId), getLibraryAudio(libId)]);

  if (!response.isSuccess) {
    notFound();
  }

  const library = response.data;
  const tracks = tracksResponse.isSuccess ? tracksResponse.data : [];

  const trackCount = library.trackCount;
  const count = trackCount ? (trackCount > 50 ? 50 : trackCount) : 0;
  const trackLabel = `${count} NoMusic`;

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

          <div className="flex justify-between items-center max-w-2xl">
            <div className="space-x-4 ">
              <div className="inline-flex items-center gap-2 text-sm text-white/60">
                <RiMusic2Line className="size-4 shrink-0 text-primary-400" />
                <span className="font-medium">{trackLabel}</span>
              </div>

              <div className="inline-flex items-center gap-2 text-sm text-white/60">
                <RiUser3Line className="size-4 shrink-0 text-primary-400" />
                <span className="font-medium">{libAuthor}</span>
              </div>
            </div>

            <LibraryDownloadButton library={library} tracks={tracks} />
          </div>
        </div>
      </div>
    </section>
  );
}

type TProps = {
  libId: Library["id"];
};
