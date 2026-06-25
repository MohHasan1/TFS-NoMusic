import type { Library } from "#payload-types";
import { getLibraryAudio } from "#services/libraries/libraries.ports";
import { connection } from "next/server";

import { LibraryAudioBrowser } from "../elements/LibraryAudioBrowser";
import { LibarayAudioEmptyBox } from "../elements/LibarayAudioEmptyBox";

export async function LibarayAudioSection({ libId }: TProps) {
  await connection();
  const response = await getLibraryAudio(libId);
  const tracks = response.isSuccess ? response.data : [];

  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <div className="grid grid-cols-[22px_minmax(0,1fr)_44px] items-center gap-3 px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35 md:grid-cols-[40px_minmax(0,1fr)_minmax(90px,130px)_56px] md:gap-4 md:px-4">
          <span>#</span>
          <span>Title</span>
          <span className="hidden md:block">Language</span>
          <span className="text-right">Time</span>
        </div>
        {tracks.length === 0 ? (
          <LibarayAudioEmptyBox />
        ) : (
          <LibraryAudioBrowser libId={libId} tracks={tracks} />
        )}
      </div>
    </section>
  );
}

type TProps = {
  libId: Library["id"];
};
