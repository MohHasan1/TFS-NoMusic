// import { RiArrowDownSLine } from "@remixicon/react";

// import { Button } from "@/components/ui/button";

// type NowPlayingHeaderProps = {
//   source?: string;
//   onClose: () => void;
// };

// const DEFAULT_SOURCE = "Your Collection";

// export function NowPlayingHeader({ source, onClose }: NowPlayingHeaderProps) {
//   return (
//     <header className="grid shrink-0 grid-cols-[auto_1fr_auto] items-center gap-2 px-2 pt-2 pb-1 md:px-3 md:pt-3 md:pb-2">
//       <Button
//         type="button"
//         variant="ghost"
//         size="icon"
//         onClick={onClose}
//         aria-label="Close now playing"
//         className="rounded-full text-muted-foreground hover:text-foreground"
//       >
//         <RiArrowDownSLine className="size-6" />
//       </Button>

//       <div className="flex flex-col items-center gap-0.5 text-center">
//         <span className="text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
//           Playing from
//         </span>
//         <span className="max-w-[60vw] truncate text-sm font-bold tracking-tight text-foreground md:max-w-xs">
//           {source || DEFAULT_SOURCE}
//         </span>
//       </div>

//       <div aria-hidden className="size-9" />
//     </header>
//   );
// }
