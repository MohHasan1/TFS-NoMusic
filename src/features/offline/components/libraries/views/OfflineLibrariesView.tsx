import { ViewContainer } from "#offline/components/shared/container/ViewContainer";

import LibContentSection from "../sections/LibContentSection";
import LibHeaderSection from "../sections/LibHeaderSection";

const OfflineLibrariesView = () => {
  return (
    <ViewContainer>
      <LibHeaderSection />
      <LibContentSection />
    </ViewContainer>
  );
};

export default OfflineLibrariesView;
