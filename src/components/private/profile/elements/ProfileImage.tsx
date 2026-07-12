import { isDevEnv } from "#lib/env";
import Image from "next/image";

export function ProfileImage({ name, userAvatarUrl }: TProps) {
  const initials = getInitials(name);

  return (
    <div className="relative size-64 shrink-0 overflow-hidden rounded-4xl border border-primary/20 bg-card shadow-[0_18px_45px_-30px_rgba(0,0,0,0.9)] sm:size-72">
      {userAvatarUrl ? (
        <Image
          src={userAvatarUrl}
          alt={`${name} profile image`}
          fill
          priority
          sizes="(max-width: 640px) 256px, 288px"
          className="object-cover"
          unoptimized={isDevEnv()}
        />
      ) : (
        <div className="flex size-full items-center justify-center bg-linear-to-br from-primary to-primary/70 text-7xl font-semibold text-primary-foreground sm:text-8xl">
          {initials}
        </div>
      )}
    </div>
  );
}

function getInitials(name: string) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return initials || "U";
}

type TProps = {
  name: string;
  userAvatarUrl?: string | null;
};
