"use client";

import { useSearchParams } from "next/navigation";
import OfflineHomeView from "../home/views/OfflineHomeView";
import OfflineLibrariesView from "../libraries/views/OfflineLibrariesView";
import OfflineLibraryView from "../library/views/OfflineLibraryView";
import OfflineNomusicView from "../nomusic/views/OfflineNomusicView";

const OfflineShellPage = () => {
  const searchParams = useSearchParams();
  const view = searchParams.get("view") ?? "home";

  switch (view) {
    case "nomusic":
      return <OfflineNomusicView />;

    case "libraries":
      return <OfflineLibrariesView />;

    case "library":
      return <OfflineLibraryView />;

    default:
      return <OfflineHomeView />;
  }
};

export default OfflineShellPage;
