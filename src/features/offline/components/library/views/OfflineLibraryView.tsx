import { Suspense } from "react";

import { ViewContainer } from "#offline/components/shared/container/ViewContainer";
import { OfflineLibraryContentSkeleton } from "../elements/OfflineLibraryContentSkeleton";
import { OfflineLibraryContent } from "../sections/OfflineLibraryContent";

const OfflineLibraryView = () => {
  return (
    <ViewContainer>
      <Suspense fallback={<OfflineLibraryContentSkeleton />}>
        <OfflineLibraryContent />
      </Suspense>
    </ViewContainer>
  );
};

export default OfflineLibraryView;
