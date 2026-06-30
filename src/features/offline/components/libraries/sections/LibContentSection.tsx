import { LIBRARY_SECTIONS } from "#components/private/libraries/constants/librarySections";
import { OfflineLibSectionFrame } from "../elements/OfflineLibSectionFrame";

export default function LibContentSection() {
  return (
    <div className="space-y-10">
      {LIBRARY_SECTIONS.map((section) => (
        <OfflineLibSectionFrame
          key={section.type}
          type={section.type}
          title={section.title}
          description={section.description}
        />
      ))}
    </div>
  );
}
