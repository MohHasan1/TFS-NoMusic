"use client";

import { RiGlobalLine, RiMusic2Line, RiTimeLine, RiUser3Line } from "@remixicon/react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader } from "#components/ui/card";
import { OFFLINE_MEDIA_PATH } from "#features/offline/constants";
import { getCachedMediaBlob } from "#offline/repositories/media";
import { getOfflineNomusic } from "#offline/repositories/nomusic";
import type { TNomusicOffline } from "#offline/types";
import NoMusicEmptyBox from "../elements/NoMusicEmptyBox";

type TNomusicCardRecord = TNomusicOffline & {
  resolvedCoverImage: string | null;
};

function formatPlaybackTime(seconds: number | null | undefined) {
  const safeSeconds = Math.max(0, Math.floor(seconds ?? 0));
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

async function resolveCachedCoverImage(cacheKey: string | null | undefined) {
  if (!cacheKey) return null;
  if (!cacheKey.startsWith(OFFLINE_MEDIA_PATH)) return cacheKey;

  const blob = await getCachedMediaBlob(cacheKey);
  if (!blob) return null;

  return URL.createObjectURL(blob);
}

export default function NoMusicContentSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nomusic, setNomusic] = useState<TNomusicCardRecord[]>([]);

  useEffect(() => {
    let isActive = true;
    const objectUrls: string[] = [];

    async function loadOfflineNomusic() {
      try {
        setIsLoading(true);
        setError(null);

        const records = await getOfflineNomusic();
        const recordsWithCovers = await Promise.all(
          records.map(async (record) => {
            const resolvedCoverImage = await resolveCachedCoverImage(record.coverImage);

            if (resolvedCoverImage?.startsWith("blob:")) {
              objectUrls.push(resolvedCoverImage);
            }

            return {
              ...record,
              resolvedCoverImage,
            };
          }),
        );

        if (!isActive) {
          objectUrls.forEach((objectUrl) => {
            URL.revokeObjectURL(objectUrl);
          });
          return;
        }

        setNomusic(recordsWithCovers);
      } catch (loadError) {
        if (!isActive) return;

        setError(
          loadError instanceof Error ? loadError.message : "Failed to load offline NoMusic.",
        );
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void loadOfflineNomusic();

    return () => {
      isActive = false;
      objectUrls.forEach((objectUrl) => {
        URL.revokeObjectURL(objectUrl);
      });
    };
  }, []);

  if (isLoading) {
    return (
      <section className="mx-auto w-full max-w-3xl rounded-3xl border border-border/70 bg-card/70 p-6 text-sm text-muted-foreground backdrop-blur-xl sm:p-8">
        Loading offline NoMusic...
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto w-full max-w-3xl rounded-3xl border border-destructive/30 bg-card/70 p-6 text-sm text-muted-foreground backdrop-blur-xl sm:p-8">
        {error}
      </section>
    );
  }

  if (nomusic.length === 0) {
    return <NoMusicEmptyBox />;
  }

  return (
    <section className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {nomusic.map((record) => (
        <Card key={record.id} className="overflow-hidden bg-card/90">
          <CardHeader className="relative aspect-square overflow-hidden bg-muted p-0">
            {record.resolvedCoverImage ? (
              <Image
                src={record.resolvedCoverImage}
                alt={record.name || "Offline NoMusic cover"}
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center bg-linear-to-br from-primary/20 to-background text-primary-400">
                <RiMusic2Line className="size-10" />
              </div>
            )}

            <span className="absolute right-2 bottom-2 rounded-md bg-card-secondary/70 px-1.5 py-0.5 text-xs tabular-nums text-white">
              {formatPlaybackTime(record.duration)}
            </span>
          </CardHeader>

          <CardContent className="space-y-2 p-3 md:p-4">
            <h3
              className="truncate text-xs font-semibold text-primary-200 md:text-sm"
              title={record.name}
            >
              {record.name}
            </h3>

            <div className="flex items-center gap-2 text-[10px] text-muted-foreground md:text-xs">
              <RiUser3Line className="size-3 shrink-0 text-primary-400" />
              <span className="truncate">{record.artist || "Unknown Artist"}</span>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-muted-foreground md:text-xs">
              <RiGlobalLine className="size-3 shrink-0 text-primary-400" />
              <span className="truncate capitalize">{record.language}</span>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-muted-foreground md:text-xs">
              <RiTimeLine className="size-3 shrink-0 text-primary-400" />
              <span className="truncate">
                Downloaded {new Date(record.downloadedAt).toLocaleDateString()}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
