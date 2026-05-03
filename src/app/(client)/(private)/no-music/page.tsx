import { redirect } from "next/navigation";

import { TrackBrowser } from "@/components/private/TrackBrowser";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getCurrentUser } from "@/services/auth/session";
import { listBrowsableTracks } from "@/services/tracks/payload-tracks";

export default async function NoMusicPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const tracks = await listBrowsableTracks();

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Header />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-8 sm:py-10">
        <TrackBrowser tracks={tracks} />
      </main>

      <Footer />
    </div>
  );
}
