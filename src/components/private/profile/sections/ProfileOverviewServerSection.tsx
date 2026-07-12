import { redirect } from "next/navigation";
import { connection } from "next/server";
import { PUBLIC_ROUTES } from "#constants/routes";
import { getCurrentUser } from "#services/auth/auth.ports";
import { ProfileOverviewSection } from "./ProfileOverviewSection";

export async function ProfileOverviewServerSection() {
  await connection();
  const response = await getCurrentUser();

  if (!response.isSuccess) {
    redirect(PUBLIC_ROUTES.LOGOUT);
  }

  return <ProfileOverviewSection createdAt={response.data.createdAt} email={response.data.email} isVerified={response.data._verified} name={response.data.name} preferredAudioLang={response.data.prefAudioLang} userAvatarUrl={response.data.uploadedImageURL} />;
}
