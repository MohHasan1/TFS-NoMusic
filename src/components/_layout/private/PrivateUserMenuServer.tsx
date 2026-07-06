import { getCurrentUser } from "#services/auth/auth.ports";
import { PrivateUserMenu } from "./PrivateUserMenu";

export async function PrivateUserMenuServer() {
  const response = await getCurrentUser();

  if (!response.isSuccess) {
    return <PrivateUserMenu userEmail="" userName="Account" />;
  }

  return <PrivateUserMenu userEmail={response.data.email} userName={response.data.name} />;
}
