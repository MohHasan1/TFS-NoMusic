"use client";

import { RiArrowDownSLine, RiMusic2Line, RiShuffleLine } from "@remixicon/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

type RepeatMode = "off" | "one" | "all";

const NoMusicHeader = () => {
  const [isShuffleEnabled, setIsShuffleEnabled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>("off");

  return (
    <header className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div className="space-y-2">
        <h1 className="flex items-center gap-3 text-4xl font-extrabold tracking-tight text-white">
          <RiMusic2Line className="h-10 w-10 text-primary" />
          NoMusic Collection
        </h1>
        <p className="max-w-2xl text-zinc-400">Browse and play your private catalog.</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" variant={isShuffleEnabled ? "secondary" : "outline"} onClick={() => setIsShuffleEnabled((value) => !value)} aria-pressed={isShuffleEnabled} className="rounded-full">
          <RiShuffleLine className="size-4" />
          Shuffle {isShuffleEnabled ? "On" : "Off"}
        </Button>

        <div className="relative">
          <select
            value={repeatMode}
            onChange={(event) => setRepeatMode(event.target.value as RepeatMode)}
            className="h-9 appearance-none rounded-full border border-border bg-card pl-4 pr-10 text-sm text-foreground outline-none transition-colors hover:border-muted-foreground/40 focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Repeat mode"
          >
            <option value="off">Repeat Off</option>
            <option value="one">Repeat One</option>
            <option value="all">Repeat All</option>
          </select>
          <RiArrowDownSLine className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
};

export default NoMusicHeader;
