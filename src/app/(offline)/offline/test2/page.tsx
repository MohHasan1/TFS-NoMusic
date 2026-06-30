"use client";

import { useCallback, useEffect, useState } from "react";

import { Button } from "#components/ui/button";
import { dummyLibrary } from "#offline/data/dummy-library";
import { dummyLibraryNomusic, dummyNomusic } from "#offline/data/dummy-nomusic";
import { useLibraries, useLibrariesDownload, useNomusic, useNomusicDownload } from "#offline/hooks";
import { CacheKey } from "#offline/lib/cacheStorage/keys";
import { MediaRepo } from "#offline/repositories/media";
import type { TResponse } from "#responses";

type TState = {
  hasLibraryCover: boolean;
  hasSongAudio: boolean;
  librariesCount: number;
  nomusicCount: number;
};

const EMPTY_STATE: TState = {
  hasSongAudio: false,
  hasLibraryCover: false,
  nomusicCount: 0,
  librariesCount: 0,
};

export default function OfflineTestTwoPage() {
  const { nomusic, refresh: refreshNomusic } = useNomusic();
  const { libraries, refresh: refreshLibraries } = useLibraries();
  const {
    download: downloadNomusic,
    remove: removeNomusic,
    pendingIds: pendingNomusicIds,
    error: nomusicDownloadError,
  } = useNomusicDownload();
  const {
    download: downloadLibrary,
    remove: removeLibrary,
    pendingIds: pendingLibraryIds,
    error: librariesDownloadError,
  } = useLibrariesDownload();

  const [state, setState] = useState<TState>(EMPTY_STATE);
  const [status, setStatus] = useState("Ready.");

  const refreshCache = useCallback(async () => {
    const [songAudioRes, libraryCoverRes] = await Promise.all([
      MediaRepo.has(CacheKey.nomusic.audio(dummyNomusic.id)),
      MediaRepo.has(CacheKey.library.cover(dummyLibrary.id)),
    ]);

    setState({
      nomusicCount: nomusic.length,
      librariesCount: libraries.length,
      hasSongAudio: songAudioRes.isSuccess ? songAudioRes.data : false,
      hasLibraryCover: libraryCoverRes.isSuccess ? libraryCoverRes.data : false,
    });
  }, [libraries.length, nomusic.length]);

  useEffect(() => {
    void refreshCache();
  }, [refreshCache]);

  async function run(label: string, action: () => Promise<TResponse<unknown>>) {
    const result = await action();

    setStatus(result.isSuccess ? `${label} worked.` : `${label} failed: ${result.message}`);

    await Promise.all([refreshNomusic(), refreshLibraries()]);
    await refreshCache();
  }

  const isPending = pendingNomusicIds.length > 0 || pendingLibraryIds.length > 0;
  const hookError = nomusicDownloadError ?? librariesDownloadError;

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-4 pt-24 pb-32 lg:px-8">
      <header className="space-y-3 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-400">
          Offline mode.
        </p>

        <h1 className="text-2xl font-semibold uppercase text-white/92 sm:text-3xl">
          NoMusic Test 2
        </h1>

        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Simple test page using the offline hooks.
        </p>
      </header>

      <section className="grid gap-3 rounded-3xl border border-border/70 bg-card/70 p-4 backdrop-blur-xl sm:grid-cols-2 sm:p-6">
        <Button
          type="button"
          onClick={() => run("Download song", () => downloadNomusic(dummyNomusic))}
          disabled={isPending}
        >
          Download Song
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => run("Remove song", () => removeNomusic(dummyNomusic.id))}
          disabled={isPending}
        >
          Remove Song
        </Button>

        <Button
          type="button"
          onClick={() =>
            run("Download library", () => downloadLibrary(dummyLibrary, [...dummyLibraryNomusic]))
          }
          disabled={isPending}
        >
          Download Library
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => run("Remove library", () => removeLibrary(dummyLibrary.id))}
          disabled={isPending}
        >
          Remove Library
        </Button>

        <Button
          type="button"
          variant="secondary"
          className="sm:col-span-2"
          onClick={async () => {
            setStatus("Refreshed.");
            await Promise.all([refreshNomusic(), refreshLibraries()]);
            await refreshCache();
          }}
          disabled={isPending}
        >
          Refresh
        </Button>
      </section>

      <section className="rounded-3xl border border-border/70 bg-card/70 p-4 backdrop-blur-xl sm:p-6">
        <p className="text-sm text-muted-foreground">
          {isPending ? "Working..." : (hookError ?? status)}
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-background/60 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-primary-300">IndexedDB</p>
            <p className="mt-2 text-sm text-white/88">NoMusic: {state.nomusicCount}</p>
            <p className="mt-1 text-sm text-white/88">Libraries: {state.librariesCount}</p>
          </div>

          <div className="rounded-2xl bg-background/60 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-primary-300">Cache Storage</p>
            <p className="mt-2 text-sm text-white/88">
              Song audio: {state.hasSongAudio ? "yes" : "no"}
            </p>
            <p className="mt-1 text-sm text-white/88">
              Library cover: {state.hasLibraryCover ? "yes" : "no"}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
