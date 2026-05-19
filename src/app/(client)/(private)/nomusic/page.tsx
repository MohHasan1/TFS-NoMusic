import { redirect } from "next/navigation";

import { PUBLIC_ROUTES } from "#constants/routes";
import NoMusicHeader from "#components/private/common/sections/NoMusicHeader";
import { NoMusicBrowser } from "#components/private/nomusic/sections/NoMusicBrowser";

import { listNomusic } from "#services/no-music/no-music.ports";
import { getCurrentUser } from "#services/auth/auth.ports";

export default async function NoMusicPage() {
  const user = await getCurrentUser();
  if (!user.isSuccess) {
    redirect(PUBLIC_ROUTES.SIGNIN);
  }

  const noMusic = await listNomusic();

  return (
    <div className="flex-1 pt-24 pb-32 max-w-7xl mx-auto w-full px-4 lg:px-8 space-y-10">
      <NoMusicHeader />
      <NoMusicBrowser noMusic={noMusic} />
    </div>
  );
}
