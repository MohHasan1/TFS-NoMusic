"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { Button, buttonVariants } from "#components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#components/ui/card";
import { OFFLINE_ROUTES } from "#constants/routes";
import { cn } from "#lib/utils";
import { dummyLibrary } from "#offline/data/dummy-library";
import { dummyLibraryNomusic, dummyNomusic } from "#offline/data/dummy-nomusic";
import { createLibraryCoverCacheKey, createNomusicCoverCacheKey } from "#offline/lib/cache-keys";
import { getOfflineLibraries } from "#offline/repositories/libraries";
import { hasCachedMedia } from "#offline/repositories/media";
import { getOfflineNomusic } from "#offline/repositories/nomusic";
import { downloadLibrary, removeLibraryDownloadWithNomusic } from "#offline/services/libraries";
import { downloadNomusic, removeNomusicDownload } from "#offline/services/nomusic";

type TSnapshot = {
  hasDummyLibrary: boolean;
  hasDummyLibraryCover: boolean;
  hasDummySong: boolean;
  hasDummySongCover: boolean;
  libraryCount: number;
  nomusicCount: number;
};

const initialSnapshot: TSnapshot = {
  hasDummyLibrary: false,
  hasDummyLibraryCover: false,
  hasDummySong: false,
  hasDummySongCover: false,
  libraryCount: 0,
  nomusicCount: 0,
};

export default function OfflineTestPage() {
  const [snapshot, setSnapshot] = useState<TSnapshot>(initialSnapshot);
  const [status, setStatus] = useState("Ready to test offline storage.");
  const [busyAction, setBusyAction] = useState<string | null>(null);

  const refreshSnapshot = useCallback(async () => {
    const [nomusic, libraries, hasDummySongCover, hasDummyLibraryCover] = await Promise.all([getOfflineNomusic(), getOfflineLibraries(), hasCachedMedia(createNomusicCoverCacheKey(dummyNomusic.id)), hasCachedMedia(createLibraryCoverCacheKey(dummyLibrary.id))]);

    setSnapshot({
      hasDummySong: nomusic.some((record) => record.id === dummyNomusic.id),
      hasDummyLibrary: libraries.some((record) => record.id === dummyLibrary.id),
      hasDummySongCover,
      hasDummyLibraryCover,
      nomusicCount: nomusic.length,
      libraryCount: libraries.length,
    });
  }, []);

  async function runAction(actionLabel: string, action: () => Promise<void>) {
    try {
      setBusyAction(actionLabel);
      setStatus(`${actionLabel}...`);
      await action();
      await refreshSnapshot();
      setStatus(`${actionLabel} complete.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : `${actionLabel} failed.`);
    } finally {
      setBusyAction(null);
    }
  }

  useEffect(() => {
    void refreshSnapshot();
  }, [refreshSnapshot]);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 pt-24 pb-32 lg:px-8">
      <header className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary-400">Offline mode</p>
        <h1 className="text-xl font-semibold uppercase sm:text-2xl md:text-3xl">NoMusic Test</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">Use these temporary buttons to save and remove dummy offline data, then verify the results inside the NoMusic and Libraries pages.</p>
      </header>

      <Card className="border-border/70 bg-card/70 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-base">Dummy downloads</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <Button onClick={() => runAction("Downloading dummy song", () => downloadNomusic(dummyNomusic).then(() => undefined))} disabled={busyAction !== null}>
            Download dummy song
          </Button>

          <Button onClick={() => runAction("Downloading dummy library", () => downloadLibrary(dummyLibrary, dummyLibraryNomusic).then(() => undefined))} disabled={busyAction !== null}>
            Download dummy library
          </Button>

          <Button variant="outline" onClick={() => runAction("Removing dummy song", () => removeNomusicDownload(dummyNomusic.id))} disabled={busyAction !== null}>
            Remove dummy song
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              runAction("Removing dummy library", () =>
                removeLibraryDownloadWithNomusic(
                  dummyLibrary.id,
                  dummyLibraryNomusic.map((record) => record.id),
                ),
              )
            }
            disabled={busyAction !== null}
          >
            Remove dummy library
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border/70 bg-card/70 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-base">Storage snapshot</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          <p>NoMusic records: {snapshot.nomusicCount}</p>
          <p>Library records: {snapshot.libraryCount}</p>
          <p>Dummy song saved: {snapshot.hasDummySong ? "Yes" : "No"}</p>
          <p>Dummy library saved: {snapshot.hasDummyLibrary ? "Yes" : "No"}</p>
          <p>Dummy song cover cached: {snapshot.hasDummySongCover ? "Yes" : "No"}</p>
          <p>Dummy library cover cached: {snapshot.hasDummyLibraryCover ? "Yes" : "No"}</p>
        </CardContent>
      </Card>

      <Card className="border-border/70 bg-card/70 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-base">Next step</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row">
          <Link href={OFFLINE_ROUTES.NOMUSIC} prefetch={false} className={cn(buttonVariants({ size: "sm" }))}>
            Open Offline NoMusic
          </Link>
          <Link href={OFFLINE_ROUTES.LIBRARIES} prefetch={false} className={cn(buttonVariants({ size: "sm", variant: "outline" }))}>
            Open Offline Libraries
          </Link>
          <Button variant="ghost" size="sm" onClick={() => runAction("Refreshing snapshot", refreshSnapshot)} disabled={busyAction !== null}>
            Refresh snapshot
          </Button>
        </CardContent>
      </Card>

      <p className="text-center text-sm text-muted-foreground">{status}</p>
    </div>
  );
}
