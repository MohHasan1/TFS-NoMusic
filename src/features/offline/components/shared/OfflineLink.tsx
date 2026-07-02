"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { navigateOffline } from "#offline/utils/navigation";

export function OfflineLink({ href, ...props }: TProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // Let the browser handle modified clicks, non-left clicks, and new-tab links.
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      props.target === "_blank"
    ) {
      return;
    }

    // Keep the offline shell mounted while the URL still reflects the current view.
    event.preventDefault();
    navigateOffline(href);
  };

  return <a {...props} href={href} onClick={handleClick} />;
}

type TProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};
