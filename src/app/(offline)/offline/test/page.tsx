"use client";

import { useCallback, useEffect, useState } from "react";

import { Button } from "#components/ui/button";
import { dummyLibrary } from "#offline/data/dummy-library";
import { dummyLibraryNomusic, dummyNomusic } from "#offline/data/dummy-nomusic";
import { CacheKey } from "#offline/lib/cacheStorage/keys";
import { OfflineLibraries } from "#offline/repositories/libraries";
import { MediaRepo } from "#offline/repositories/media";
import { OfflineNomusic } from "#offline/repositories/nomusic";
import { LibrariesDownloadService } from "#offline/services/libraries-download";
import { NomusicDownloadService } from "#offline/services/nomusic-download";
import type { TLibraryOffline, TNomusicOffline } from "#offline/types";
import type { TResponse } from "#responses";

type TSnapshot = {
  cache: {
    libraryCover: boolean;
    librarySongAudio: boolean[];
    librarySongCovers: boolean[];
    nomusicAudio: boolean;
    nomusicCover: boolean;
  };
  libraries: TLibraryOffline[];
  nomusic: TNomusicOffline[];
};

const EMPTY_SNAPSHOT: TSnapshot = {
  nomusic: [],
  libraries: [],
  cache: {
    nomusicAudio: false,
    nomusicCover: false,
    libraryCover: false,
    librarySongAudio: [],
    librarySongCovers: [],
  },
};

export default function OfflineTestPage() {
  const [snapshot, setSnapshot] = useState<TSnapshot>(EMPTY_SNAPSHOT);
  const [status, setStatus] = useState("Ready.");
  const [isPending, setIsPending] = useState(false);

  const refreshSnapshot = useCallback(async () => {
    const nextSnapshot = await readSnapshot();
    setSnapshot(nextSnapshot);
  }, []);

  useEffect(() => {
    void refreshSnapshot();
  }, [refreshSnapshot]);

  // Keep the page dumb: run one service action, then re-read IndexedDB and Cache Storage.
  async function runAction(label: string, action: () => Promise<TResponse<unknown>>) {
    setIsPending(true);

    try {
      const result = await action();
      setStatus(formatResult(label, result));
      await refreshSnapshot();
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 pt-24 pb-32 lg:px-8">
      <header className="space-y-3 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-400">
          Offline mode.
        </p>

        <h1 className="text-2xl font-semibold uppercase text-white/92 sm:text-3xl">
          NoMusic Test Page
        </h1>

        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Use this page to add or remove temporary offline NoMusic and Library data, then confirm
          that IndexedDB records and cached media were updated.
        </p>
      </header>

      <section className="grid gap-4 rounded-3xl border border-border/70 bg-card/70 p-4 backdrop-blur-xl sm:grid-cols-2 sm:p-6">
        <Button
          type="button"
          onClick={() =>
            runAction("Download dummy song", () => NomusicDownloadService.download(dummyNomusic))
          }
          disabled={isPending}
        >
          Download Dummy Song
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() =>
            runAction("Remove dummy song", () => NomusicDownloadService.remove(dummyNomusic.id))
          }
          disabled={isPending}
        >
          Remove Dummy Song
        </Button>

        <Button
          type="button"
          onClick={() =>
            runAction("Download dummy library", () =>
              LibrariesDownloadService.download(dummyLibrary, [...dummyLibraryNomusic]),
            )
          }
          disabled={isPending}
        >
          Download Dummy Library
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() =>
            runAction("Remove dummy library", () =>
              LibrariesDownloadService.remove(dummyLibrary.id),
            )
          }
          disabled={isPending}
        >
          Remove Dummy Library
        </Button>

        <Button
          type="button"
          variant="secondary"
          className="sm:col-span-2"
          onClick={() =>
            runAction("Refresh snapshot", async () => ({ isSuccess: true, data: null }))
          }
          disabled={isPending}
        >
          Refresh Status
        </Button>
      </section>

      <section className="rounded-3xl border border-border/70 bg-card/70 p-4 backdrop-blur-xl sm:p-6">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-300">
          Status
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">{isPending ? "Working..." : status}</p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-border/70 bg-card/70 p-4 backdrop-blur-xl sm:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-300">
            IndexedDB
          </h2>

          <div className="mt-4 space-y-4 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-white/88">NoMusic</p>
              <p className="mt-1">{snapshot.nomusic.length} record(s)</p>
              <pre className="mt-2 overflow-x-auto rounded-2xl bg-background/60 p-3 text-xs text-white/70">
                {JSON.stringify(
                  snapshot.nomusic.map((item) => ({
                    id: item.id,
                    name: item.name,
                    audioStreamUrl: item.audioStreamUrl,
                    coverImage: item.coverImage,
                  })),
                  null,
                  2,
                )}
              </pre>
            </div>

            <div>
              <p className="font-medium text-white/88">Libraries</p>
              <p className="mt-1">{snapshot.libraries.length} record(s)</p>
              <pre className="mt-2 overflow-x-auto rounded-2xl bg-background/60 p-3 text-xs text-white/70">
                {JSON.stringify(
                  snapshot.libraries.map((item) => ({
                    id: item.id,
                    name: item.name,
                    uploadedImageURL: item.uploadedImageURL,
                    nomusicIds: item.nomusicIds,
                  })),
                  null,
                  2,
                )}
              </pre>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border/70 bg-card/70 p-4 backdrop-blur-xl sm:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-300">
            Cache Storage
          </h2>

          <pre className="mt-4 overflow-x-auto rounded-2xl bg-background/60 p-3 text-xs text-white/70">
            {JSON.stringify(snapshot.cache, null, 2)}
          </pre>
        </div>
      </section>
    </div>
  );
}

async function readSnapshot(): Promise<TSnapshot> {
  const [
    nomusicRes,
    librariesRes,
    nomusicAudioRes,
    nomusicCoverRes,
    libraryCoverRes,
    librarySongAudioRes,
    librarySongCoverRes,
  ] = await Promise.all([
    OfflineNomusic.getAll(),
    OfflineLibraries.getAll(),
    MediaRepo.has(CacheKey.nomusic.audio(dummyNomusic.id)),
    MediaRepo.has(CacheKey.nomusic.cover(dummyNomusic.id)),
    MediaRepo.has(CacheKey.library.cover(dummyLibrary.id)),
    Promise.all(dummyLibraryNomusic.map((item) => MediaRepo.has(CacheKey.nomusic.audio(item.id)))),
    Promise.all(dummyLibraryNomusic.map((item) => MediaRepo.has(CacheKey.nomusic.cover(item.id)))),
  ]);

  return {
    nomusic: nomusicRes.isSuccess ? nomusicRes.data : [],
    libraries: librariesRes.isSuccess ? librariesRes.data : [],
    cache: {
      nomusicAudio: nomusicAudioRes.isSuccess ? nomusicAudioRes.data : false,
      nomusicCover: nomusicCoverRes.isSuccess ? nomusicCoverRes.data : false,
      libraryCover: libraryCoverRes.isSuccess ? libraryCoverRes.data : false,
      librarySongAudio: librarySongAudioRes.map((result) =>
        result.isSuccess ? result.data : false,
      ),
      librarySongCovers: librarySongCoverRes.map((result) =>
        result.isSuccess ? result.data : false,
      ),
    },
  };
}

function formatResult(label: string, result: TResponse<unknown>) {
  if (result.isSuccess) {
    return `${label} succeeded.`;
  }

  return `${label} failed: ${result.message}`;
}
