import { ViewContainer } from "#offline/components/shared/container/ViewContainer";
import OfflineStorageContentSection from "../sections/OfflineStorageContentSection";
import OfflineStorageHeaderSection from "../sections/OfflineStorageHeaderSection";

const OfflineStorageView = () => {
  return (
    <ViewContainer>
      <OfflineStorageHeaderSection />
      <OfflineStorageContentSection />
    </ViewContainer>
  );
};

export default OfflineStorageView;
