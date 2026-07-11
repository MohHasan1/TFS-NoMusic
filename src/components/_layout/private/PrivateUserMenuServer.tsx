import { redirect } from "next/navigation";
import { connection } from "next/server";
import { PUBLIC_ROUTES } from "#constants/routes";
import { getCurrentUser } from "#services/auth/auth.ports";
import { PrivateUserMenu } from "./PrivateUserMenu";

export async function PrivateUserMenuServer() {
  await connection();

  const response = await getCurrentUser();
  if (!response.isSuccess) {
    // return <PrivateUserMenu userEmail="---" userName="--" />;
    redirect(PUBLIC_ROUTES.SIGNIN);
  }

  return <PrivateUserMenu userEmail={response.data.email} userName={response.data.name} userAvatarUrl={response.data.uploadedImageURL} />;
}
