import { ProfileHeroCard } from "../elements/ProfileHeroCard";

export function ProfileOverviewSection({
  createdAt,
  email,
  isVerified,
  name,
  userAvatarUrl,
}: TProps) {
  return (
    <section>
      <ProfileHeroCard
        createdAt={createdAt}
        email={email}
        isVerified={isVerified}
        name={name}
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
  userAvatarUrl?: string | null;
};
