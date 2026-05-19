import { RiMusic2Line } from "@remixicon/react";
import Link from "next/link";
import { Button } from "#components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "#components/ui/empty";
import { PRIVATE_ROUTES } from "#constants/routes";

export function NoMusicEmptyCard() {
  return (
    <Empty className="border border-dashed bg-card rounded-2xl">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <RiMusic2Line />
        </EmptyMedia>
        <EmptyTitle>No NoMusic available yet</EmptyTitle>
        <EmptyDescription>Request a track and it will show up here once it is added.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button nativeButton={false} render={<Link href={PRIVATE_ROUTES.REQUEST_NOMUSIC}>Request NoMusic</Link>} variant="outline" size="sm" />
      </EmptyContent>
    </Empty>
  );
}
