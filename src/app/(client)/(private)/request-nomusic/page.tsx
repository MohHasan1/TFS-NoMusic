import { redirect } from "next/navigation";

import { RequestNoMusicForm } from "@/components/private/requests/RequestNoMusicForm";
import { getCurrentUser } from "@/services/auth/auth.ports";

export default async function RequestSongsPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="grow pt-24 pb-32 max-w-3xl mx-auto w-full px-4 lg:px-8">
      <RequestNoMusicForm />
    </div>
  );
}
