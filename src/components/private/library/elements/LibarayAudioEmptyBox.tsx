import Link from "next/link";
import { RiMusic2Line } from "@remixicon/react";

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

export function LibarayAudioEmptyBox() {
  return (
    <Empty className="rounded-2xl border border-dashed bg-card">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <RiMusic2Line />
        </EmptyMedia>
        <EmptyTitle>No NoMusic in this library yet</EmptyTitle>
        <EmptyDescription>
          Add NoMusic to this library and it will appear here once it is linked.
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
