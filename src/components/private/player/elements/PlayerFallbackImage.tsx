import { RiMusic2Line } from "@remixicon/react";

import { getGradientFromText } from "#components/private/_utils/helpers";
import { usePlayerTrack } from "#playback-player/hooks/usePlayerTrack";
import { cn } from "#lib/utils";

const PlayerFallbackImage = ({ iconClassname }: TProps) => {
  const { track } = usePlayerTrack();
  const color_gradient = getGradientFromText(`${track?.name ?? ""}-${track?.artist ?? ""}`);

  return (
    <div
      className={`size-full flex items-center justify-center text-primary-200/50 rounded-xl bg-linear-to-bl ${color_gradient}`}
    >
      <RiMusic2Line className={cn("size-4", iconClassname)} />
    </div>
  );
};

export default PlayerFallbackImage;

type TProps = {
  iconClassname?: string;
};
