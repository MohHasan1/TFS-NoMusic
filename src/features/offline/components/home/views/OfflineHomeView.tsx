import { ViewContainer } from "#offline/components/shared/container/ViewContainer";

import OfflineHomeContentSection from "../sections/OfflineHomeContentSection";
import OfflineHomeHeaderSection from "../sections/OfflineHomeHeaderSection";
import OfflineHomeRecentLibrariesSection from "../sections/OfflineHomeRecentLibrariesSection";
import OfflineHomeRecentNoMusicSection from "../sections/OfflineHomeRecentNoMusicSection";

const OfflineHomeView = () => {
  return (
    <ViewContainer>
      <OfflineHomeHeaderSection />
      <OfflineHomeContentSection />
      <OfflineHomeRecentNoMusicSection />
      <OfflineHomeRecentLibrariesSection />
    </ViewContainer>
  );
};

export default OfflineHomeView;
