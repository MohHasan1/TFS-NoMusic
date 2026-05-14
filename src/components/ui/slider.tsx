import { Slider as SliderPrimitive } from "@base-ui/react/slider";

import { cn } from "@/lib/utils";

type SliderProps = SliderPrimitive.Root.Props<number> & {
  // Slot class hooks keep call sites simple while still allowing player-specific styling.
  controlClassName?: string;
  trackClassName?: string;
  indicatorClassName?: string;
  thumbClassName?: string;
};

function Slider({
  className,
  controlClassName,
  trackClassName,
  indicatorClassName,
  thumbClassName,
  ...props
}: SliderProps) {
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn(
        "relative flex touch-none select-none",
        "data-[orientation=horizontal]:w-full data-[orientation=horizontal]:items-center",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-center",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Control
        data-slot="slider-control"
        className={cn(
          "group relative flex grow",
          "data-[orientation=horizontal]:h-5 data-[orientation=horizontal]:w-full data-[orientation=horizontal]:items-center",
          "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-5 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-center data-[orientation=vertical]:justify-center",
          controlClassName,
        )}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={cn(
            "relative grow overflow-hidden rounded-full bg-muted",
            "data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full",
            "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
            trackClassName,
          )}
        >
          <SliderPrimitive.Indicator
            data-slot="slider-indicator"
            className={cn(
              "absolute rounded-full bg-primary transition-colors group-hover:bg-primary/90",
              "data-[orientation=horizontal]:left-0 data-[orientation=horizontal]:h-full",
              "data-[orientation=vertical]:bottom-0 data-[orientation=vertical]:w-full",
              indicatorClassName,
            )}
          />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          className={cn(
            "block size-3.5 rounded-full border-2 border-primary bg-background shadow-sm outline-none transition-transform duration-150",
            "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "data-dragging:scale-110",
            thumbClassName,
          )}
        />
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

export { Slider };
