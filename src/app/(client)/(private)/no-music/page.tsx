import { redirect } from "next/navigation";

import { getCurrentUser } from "@/services/auth/auth.ports";
import NoMusicHeader from "@/components/private/no-music/sections/NoMusicHeader";
import { NoMusicBrowser } from "@/components/private/no-music/sections/NoMusicBrowser";
import { listNomusic } from "@/services/no-music/no-music.ports";
import { NoMusicPlayer } from "@/components/private/no-music/sections/NoMusicPlayer";

export default async function NoMusicPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const noMusic = await listNomusic();

  return (
    <div className="grow pt-24 pb-32 max-w-7xl mx-auto w-full px-4 lg:px-8 space-y-10">
      <NoMusicHeader />
      <NoMusicBrowser noMusic={noMusic} />
      <NoMusicPlayer />
    </div>
  );
}
