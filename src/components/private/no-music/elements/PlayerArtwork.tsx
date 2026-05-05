import { RiMusic2Line } from "@remixicon/react";
import Image from "next/image";

export function PlayerArtwork({ isPlaying = false, imageURL }: PlayerArtworkProps) {
  return (
    <div className="relative shrink-0">
      {imageURL ? (
        <div className="relative size-11 overflow-hidden rounded-xl bg-muted shadow-lg md:size-12">
          <Image src={imageURL} alt="Current track artwork" fill unoptimized sizes="48px" className="object-cover" />
        </div>
      ) : (
        <div className="flex size-11 items-center justify-center rounded-xl bg-muted text-muted-foreground shadow-lg md:size-12">
          <RiMusic2Line className="size-5" />
        </div>
      )}

      {isPlaying ? <span className="-top-1 -right-1 absolute size-3 rounded-full border-2 border-card bg-primary" /> : null}
    </div>
  );
}

type PlayerArtworkProps = {
  isPlaying?: boolean;
  imageURL?: string;
};
