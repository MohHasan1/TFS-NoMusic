import { ViewContainer } from "#offline/components/shared/container/ViewContainer";
import NoMusicContentSection from "../sections/NoMusicContentSection";
import NoMusicHeaderSection from "../sections/NoMusicHeaderSection";

const OfflineNomusicView = () => {
  return (
    <ViewContainer>
      <NoMusicHeaderSection />
      <NoMusicContentSection />
    </ViewContainer>
  );
};

export default OfflineNomusicView;
