"use client";

import { Progress } from "#components/ui/progress";
import { Skeleton } from "#components/ui/skeleton";
import { formatBytes } from "#lib/helpers/storage";
import { useOfflineStorage } from "#offline/hooks";

export default function OfflineStorageContentSection() {
  const { usage, quota, available, percentage, isSupported, isLoading } = useOfflineStorage();

  return (
    <section className="mx-auto w-full max-w-2xl space-y-6 rounded-3xl border border-border/70 bg-card/70 p-6 backdrop-blur-xl md:p-8">
      {!isSupported ? (
        <p className="text-center text-sm text-primary-200">
          Storage usage isn't available in this browser.
        </p>
      ) : isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-2 w-full" />
        </div>
      ) : (
        <>
          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-semibold text-primary-200">{formatBytes(usage)}</span>
              <span className="text-sm text-primary-200">of {formatBytes(quota)} used</span>
            </div>

            <Progress value={percentage} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-background/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-400">
                Used
              </p>
              <p className="mt-1 text-lg font-semibold text-primary-200">{formatBytes(usage)}</p>
            </div>

            <div className="rounded-2xl bg-background/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-400">
                Available
              </p>
              <p className="mt-1 text-lg font-semibold text-primary-200">
                {formatBytes(available)}
              </p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
