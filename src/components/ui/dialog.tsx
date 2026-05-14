import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { RiCloseLine } from "@remixicon/react";
import type * as React from "react";

import { cn } from "@/lib/utils";

function Dialog(props: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root {...props} />;
}

function DialogTrigger({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" className={className} {...props} />;
}

function DialogClose({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" className={className} {...props} />;
}

function DialogBackdrop({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Backdrop>) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-backdrop"
      className={cn(
        "fixed inset-0 z-50 bg-background/70 backdrop-blur-md transition-opacity duration-300",
        "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

function DialogPopup({ className, children, ...props }: React.ComponentProps<typeof DialogPrimitive.Popup>) {
  return (
    <DialogPrimitive.Popup
      data-slot="dialog-popup"
      className={cn(
        "fixed top-1/2 left-1/2 z-50 flex max-h-[92dvh] w-[min(92vw,520px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl outline-none",
        "transition-all duration-300",
        "data-[starting-style]:translate-y-[calc(-50%+12px)] data-[starting-style]:opacity-0 data-[starting-style]:scale-95",
        "data-[ending-style]:translate-y-[calc(-50%+12px)] data-[ending-style]:opacity-0 data-[ending-style]:scale-95",
        className,
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Popup>
  );
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-base font-semibold tracking-tight", className)}
      {...props}
    />
  );
}

function DialogDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function DialogCloseIcon({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return (
    <DialogPrimitive.Close
      data-slot="dialog-close-icon"
      aria-label="Close"
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors",
        "hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        className,
      )}
      {...props}
    >
      <RiCloseLine className="size-5" />
    </DialogPrimitive.Close>
  );
}

export {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogCloseIcon,
  DialogDescription,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
};

export const DialogPortal = DialogPrimitive.Portal;
