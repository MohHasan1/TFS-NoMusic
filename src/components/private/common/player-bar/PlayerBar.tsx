"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useNoMusicEngineSubscriptions } from "@/modules/hooks/useNoMusicEngineSubscriptions";
import { useNowPlaying } from "@/modules/nowPlaying/hook.nowPlaying";
import { store } from "@/store";
import DesktopPlayerBar from "./DesktopPlayerBar";
import PlayerArtwork from "./elements/PlayerArtwork";
// import { PlayerControls } from "./elements/PlayerControls";
import { PlayerSeekBar } from "./elements/PlayerSeekBar";
import PlayerTrackInfo from "./elements/PlayerTrackInfo";
import { useTrackMetadata } from "@/modules/player/hooks/useTrackMetadata";

const PlayerBar = () => {
  // Mount the global background subscriptions for the player engine
  // useNoMusicEngineSubscriptions();

  const { track } = useTrackMetadata();
  if (!track) return null;

  return (
    <>
      <DesktopPlayerBar />
      {/* <MobilePlayerBar /> */}
    </>
  );
};

export default PlayerBar;

// function MobilePlayerBar() {
//   const { open: openNowPlaying } = useNowPlaying();

//   return (
//     <div className="fixed right-0 bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] left-0 z-50 px-4 md:hidden">
//       <div className="mx-auto max-w-xl">
//         <Card className="space-y-3 rounded-3xl bg-card/95 p-3 shadow-2xl backdrop-blur-md">
//           <div className="flex items-center justify-between gap-3">
//             <ExpandTarget
//               onExpand={openNowPlaying}
//               className="flex min-w-0 flex-1 items-center gap-3"
//             >
//               <PlayerArtwork />
//               <PlayerTrackInfo />
//             </ExpandTarget>

//             <PlayerControls />
//           </div>

//           <PlayerSeekBar />
//         </Card>
//       </div>
//     </div>
//   );
// }

// type ExpandTargetProps = {
//   className?: string;
//   children: React.ReactNode;
//   onExpand: () => void;
// };

// function ExpandTarget({ className, children, onExpand }: ExpandTargetProps) {
//   return (
//     <button
//       type="button"
//       onClick={onExpand}
//       aria-label="Open now playing view"
//       className={cn(
//         "min-w-0 cursor-pointer rounded-xl text-left outline-none transition-colors",
//         "focus-visible:ring-2 focus-visible:ring-ring/50",
//         className,
//       )}
//     >
//       {children}
//     </button>
//   );
// }
