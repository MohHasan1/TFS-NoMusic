import { redirect } from "next/navigation";
import { OFFLINE_ROUTES } from "#constants/routes";

export default function OfflineStoragePage() {
  redirect(OFFLINE_ROUTES.STORAGE);
}
