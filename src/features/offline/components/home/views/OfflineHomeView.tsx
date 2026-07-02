import { ViewContainer } from "#offline/components/shared/container/ViewContainer";

import OfflineHomeContentSection from "../sections/OfflineHomeContentSection";
import OfflineHomeHeaderSection from "../sections/OfflineHomeHeaderSection";

const OfflineHomeView = () => {
  return (
    <ViewContainer>
      <OfflineHomeHeaderSection />
      <OfflineHomeContentSection />
    </ViewContainer>
  );
};

export default OfflineHomeView;
