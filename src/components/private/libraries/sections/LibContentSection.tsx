import { Suspense } from "react";

import { LibSectionSkeleton } from "../elements/LibSectionSkeleton";
import { LIBRARY_SECTIONS } from "../constants/librarySections";
import { LibSectionFrame } from "../elements/LibSectionFrame";

export default function LibContentSection() {
  return (
    <div className="space-y-10">
      {LIBRARY_SECTIONS.map((section) => (
        <Suspense
          key={section.type}
          fallback={<LibSectionSkeleton title={section.title} description={section.description} />}
        >
          <LibSectionFrame
            type={section.type}
            title={section.title}
            description={section.description}
          />
        </Suspense>
      ))}
    </div>
  );
}
