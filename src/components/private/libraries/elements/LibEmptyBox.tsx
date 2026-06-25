import Link from "next/link";
import { RiAlbumLine } from "@remixicon/react";

import { Button } from "#components/ui/button";
import { PRIVATE_ROUTES } from "#constants/routes";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "#components/ui/empty";

export function LibEmptyBox() {
  return (
    <Empty className="rounded-2xl border border-dashed bg-card">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <RiAlbumLine />
        </EmptyMedia>
        <EmptyTitle>No libraries available yet</EmptyTitle>
        <EmptyDescription>
          This section will appear once NoMusic items are grouped into libraries.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button
          nativeButton={false}
          render={<Link href={PRIVATE_ROUTES.NOMUSIC}>Browse NoMusic</Link>}
          variant="outline"
          size="sm"
        />
      </EmptyContent>
    </Empty>
  );
}
