import { redirect } from "next/navigation";
import { OFFLINE_ROUTES } from "#constants/routes";

export default function OfflineLibrariesPage() {
  redirect(OFFLINE_ROUTES.LIBRARIES);
}
