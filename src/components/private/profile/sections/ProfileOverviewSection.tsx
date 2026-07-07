import { ProfileHeroCard } from "../elements/ProfileHeroCard";

export function ProfileOverviewSection({
  createdAt,
  email,
  isVerified,
  name,
  preferredAudioLang,
  userAvatarUrl,
}: TProps) {
  return (
    <section>
      <ProfileHeroCard
        createdAt={createdAt}
        email={email}
        isVerified={isVerified}
        name={name}
        preferredAudioLang={preferredAudioLang}
        userAvatarUrl={userAvatarUrl}
      />
    </section>
  );
}

type TProps = {
  createdAt: string;
  email: string;
  isVerified?: boolean | null;
  name: string;
  preferredAudioLang?: string | null;
  userAvatarUrl?: string | null;
};
