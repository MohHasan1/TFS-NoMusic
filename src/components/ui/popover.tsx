import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import type * as React from "react";

import { cn } from "@/lib/utils";

function Popover(props: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root {...props} />;
}

function PopoverTrigger({ className, ...props }: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" className={className} {...props} />;
}

function PopoverPositioner({ className, sideOffset = 8, ...props }: React.ComponentProps<typeof PopoverPrimitive.Positioner>) {
  return (
    <PopoverPrimitive.Positioner
      data-slot="popover-positioner"
      sideOffset={sideOffset}
      className={cn("z-50 outline-none", className)}
      {...props}
    />
  );
}

function PopoverPopup({ className, ...props }: React.ComponentProps<typeof PopoverPrimitive.Popup>) {
  return (
    <PopoverPrimitive.Popup
      data-slot="popover-popup"
      className={cn(
        "rounded-2xl border border-border bg-card p-3 text-card-foreground shadow-2xl outline-none",
        "transition-all duration-150",
        "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
        "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

export { Popover, PopoverPopup, PopoverPositioner, PopoverTrigger };
export const PopoverPortal = PopoverPrimitive.Portal;
