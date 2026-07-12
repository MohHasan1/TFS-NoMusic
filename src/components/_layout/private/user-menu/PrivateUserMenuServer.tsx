import { redirect } from "next/navigation";
import { connection } from "next/server";
import { PUBLIC_ROUTES } from "#constants/routes";
import { OfflineUserPrecache } from "#offline/components/user/OfflineUserPrecache";
import { getCurrentUser } from "#services/auth/auth.ports";
import { PrivateUserMenu } from "./PrivateUserMenu";

export async function PrivateUserMenuServer() {
  await connection();

  const res = await getCurrentUser();
  if (!res.isSuccess) {
    redirect(`${PUBLIC_ROUTES.SIGNIN}?sessionExpired=1`);
  }

  return (
    <>
      <OfflineUserPrecache
        user={{
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
          createdAt: res.data.createdAt,
          isApproved: res.data.isApproved,
          prefAudioLang: res.data.prefAudioLang,
          uploadedImageURL: res.data.uploadedImageURL,
        }}
      />
      <PrivateUserMenu
        userEmail={res.data.email}
        userName={res.data.name}
        userAvatarUrl={res.data.uploadedImageURL}
      />
    </>
  );
}
