import { OfflineLibSectionFrame } from "../elements/OfflineLibSectionFrame";
import { OFFLINE_LIBRARY_SECTIONS } from "../constants";

export default function LibContentSection() {
  return (
    <div className="space-y-10">
      {OFFLINE_LIBRARY_SECTIONS.map((section) => (
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
