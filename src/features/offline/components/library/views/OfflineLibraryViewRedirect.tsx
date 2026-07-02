"use client";

import { redirect, useSearchParams } from "next/navigation";
import { OFFLINE_ROUTES } from "#constants/routes";

export function OfflineLibraryViewRedirect() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return redirect(OFFLINE_ROUTES.LIBRARY(id!));
}
