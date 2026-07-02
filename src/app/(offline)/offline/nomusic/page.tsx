import { redirect } from "next/navigation";
import { OFFLINE_ROUTES } from "#constants/routes";

export default function OfflineNoMusicPage() {
  redirect(OFFLINE_ROUTES.NOMUSIC);
}
