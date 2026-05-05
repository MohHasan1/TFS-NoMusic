"use client";

import { RiMusic2Line, RiShuffleLine } from "@remixicon/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

        <Select value={repeatMode} onValueChange={(value) => setRepeatMode(value as RepeatMode)}>
          <SelectTrigger className="min-w-38">
            <SelectValue placeholder="Repeat mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="off">Repeat Off</SelectItem>
            <SelectItem value="one">Repeat One</SelectItem>
            <SelectItem value="all">Repeat All</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </header>
  );
};

export default NoMusicHeader;
