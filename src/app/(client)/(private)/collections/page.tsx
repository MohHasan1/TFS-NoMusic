import { redirect } from "next/navigation";
import { RiMusic2Line } from "@remixicon/react";

import { CollectionsGrid } from "@/components/private/CollectionsGrid";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getCurrentUser } from "@/services/auth/session";
import { listBrowsableTracks } from "@/services/tracks/payload-tracks";

export default async function CollectiosnPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const tracks = await listBrowsableTracks();

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Header />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-8 sm:py-10">
        <div className="space-y-10">
          <header className="space-y-2">
            <h1 className="flex items-center gap-3 text-4xl font-extrabold tracking-tight text-white">
              <RiMusic2Line className="h-10 w-10 text-white/80" />
              Music Room
            </h1>
            <p className="max-w-2xl text-white/55">
              Our shared music collection. Everything here is ready to play.
            </p>
          </header>

          <section>
            <CollectionsGrid tracks={tracks} />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
