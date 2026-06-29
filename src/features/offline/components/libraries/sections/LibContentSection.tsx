"use client";

import { RiAlbumFill, RiMusic2Line, RiTimeLine, RiUser3Line } from "@remixicon/react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader } from "#components/ui/card";
import { OFFLINE_MEDIA_PATH } from "#features/offline/constants";
import { getOfflineLibraries } from "#offline/repositories/libraries";
import { getCachedMediaBlob } from "#offline/repositories/media";
import type { TLibraryOffline } from "#offline/types";
import LibEmptyBox from "../elements/LibEmptyBox";

type TLibraryCardRecord = TLibraryOffline & {
  resolvedCoverImage: string | null;
};

async function resolveCachedCoverImage(cacheKey: string | null | undefined) {
  if (!cacheKey) return null;
  if (!cacheKey.startsWith(OFFLINE_MEDIA_PATH)) return cacheKey;

  const blob = await getCachedMediaBlob(cacheKey);
  if (!blob) return null;

  return URL.createObjectURL(blob);
}

export default function LibContentSection() {
  const [libraries, setLibraries] = useState<TLibraryCardRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;
    const objectUrls: string[] = [];

    async function loadOfflineLibraries() {
      try {
        setIsLoading(true);
        setError(null);

        const records = await getOfflineLibraries();
        const recordsWithCovers = await Promise.all(
          records.map(async (record) => {
            const resolvedCoverImage = await resolveCachedCoverImage(record.uploadedImageURL);

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

        setLibraries(recordsWithCovers);
      } catch (loadError) {
        if (!isActive) return;

        setError(loadError instanceof Error ? loadError.message : "Failed to load offline libraries.");
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void loadOfflineLibraries();

    return () => {
      isActive = false;
      objectUrls.forEach((objectUrl) => {
        URL.revokeObjectURL(objectUrl);
      });
    };
  }, []);

  if (isLoading) {
    return <section className="mx-auto w-full max-w-3xl rounded-3xl border border-border/70 bg-card/70 p-6 text-sm text-muted-foreground backdrop-blur-xl sm:p-8">Loading offline libraries...</section>;
  }

  if (error) {
    return <section className="mx-auto w-full max-w-3xl rounded-3xl border border-destructive/30 bg-card/70 p-6 text-sm text-muted-foreground backdrop-blur-xl sm:p-8">{error}</section>;
  }

  if (libraries.length === 0) {
    return <LibEmptyBox />;
  }

  return (
    <section className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {libraries.map((library) => (
        <Card key={library.id} className="overflow-hidden bg-card/90">
          <CardHeader className="relative aspect-square overflow-hidden bg-muted p-0">
            {library.resolvedCoverImage ? (
              <Image src={library.resolvedCoverImage} alt={`${library.name} cover`} fill unoptimized className="object-cover" />
            ) : (
              <div className="flex size-full items-center justify-center bg-linear-to-br from-primary/20 to-background text-primary-400">
                <RiAlbumFill className="size-10" />
              </div>
            )}

            <span className="absolute right-2 bottom-2 rounded-md bg-black/65 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-primary-300 backdrop-blur-md">Library</span>
          </CardHeader>

          <CardContent className="space-y-2 p-3 md:p-4">
            <h3 className="truncate text-xs font-semibold text-primary-200 md:text-sm" title={library.name}>
              {library.name}
            </h3>

            <div className="flex items-center gap-2 text-[10px] text-muted-foreground md:text-xs">
              <RiUser3Line className="size-3 shrink-0 text-primary-400" />
              <span className="truncate">{library.author || "-"}</span>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-muted-foreground md:text-xs">
              <RiMusic2Line className="size-3 shrink-0 text-primary-400" />
              <span className="truncate">{library.trackCount ?? library.nomusicIds.length} NoMusic</span>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-muted-foreground md:text-xs">
              <RiTimeLine className="size-3 shrink-0 text-primary-400" />
              <span className="truncate">Downloaded {new Date(library.downloadedAt).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
