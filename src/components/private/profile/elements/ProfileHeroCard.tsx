import { RiCheckLine, RiMailLine, RiTimeLine, RiTranslate2 } from "@remixicon/react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#components/ui/card";
import { capitalizeFirstLetter } from "#lib/utils";
import { ProfileImage } from "./ProfileImage";
import { ProfileInfoTile } from "./ProfileInfoTile";

export function ProfileHeroCard({
  createdAt,
  email,
  isVerified,
  name,
  preferredAudioLang,
  userAvatarUrl,
}: TProps) {
  const memberSince = formatDate(createdAt);
  const firstName = name.trim().split(/\s+/)[0] || name;
  const preferredLanguage = preferredAudioLang
    ? capitalizeFirstLetter(preferredAudioLang)
    : "Not set";

  return (
    <Card className="overflow-hidden rounded-4xl border-primary/15 bg-linear-to-br from-card via-card-secondary/70 to-primary/10 shadow-[0_30px_100px_-55px_var(--color-primary)]">
      <CardHeader className="relative gap-6 p-6 sm:p-8">
        <div className="absolute inset-x-0 top-0 h-28 bg-linear-to-r from-primary/18 via-primary/10 to-transparent" />

        <div className="relative flex flex-col gap-10 sm:flex-row sm:items-start">
          <ProfileImage name={name} userAvatarUrl={userAvatarUrl} />

          <div className="min-w-0 space-y-3">
            <div className="space-y-2">
              <CardDescription className="text-sm text-primary-300">
                Your private account
              </CardDescription>
              <CardTitle className="truncate text-3xl text-primary-200 sm:text-4xl">
                Hi, {firstName.toUpperCase()}
              </CardTitle>
              <p className="text-sm leading-relaxed text-foreground/80 sm:text-base">
                Your profile photo and email are part of how your private NoMusic space feels like
                yours.
              </p>
            </div>

            {isVerified ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/12 px-3 py-1.5 text-sm font-medium text-primary-200">
                <RiCheckLine className="size-4" />
                Verified account
              </span>
            ) : null}
          </div>
        </div>
      </CardHeader>

      <CardContent className="grid gap-3 p-6 pt-0 sm:grid-cols-2 lg:grid-cols-3 sm:p-8 sm:pt-0">
        <ProfileInfoTile
          icon={RiMailLine}
          label="Signed-in email"
          value={email}
          helper="This is the email tied to your private account."
        />
        <ProfileInfoTile
          icon={RiTranslate2}
          label="Preferred audio"
          value={preferredLanguage}
          helper="This is the language we use as your default NoMusic collection."
        />
        <ProfileInfoTile
          icon={RiTimeLine}
          label="Member since"
          value={memberSince}
          helper="Your account has been part of NoMusic since this date."
        />
      </CardContent>
    </Card>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}

type TProps = {
  createdAt: string;
  email: string;
  isVerified?: boolean | null;
  name: string;
  preferredAudioLang?: string | null;
  userAvatarUrl?: string | null;
};
