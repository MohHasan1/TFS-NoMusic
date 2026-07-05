import { connection } from "next/server";

import { listLibraries } from "#services/libraries/libraries.ports";
import { PRIVATE_ROUTES } from "#constants/routes";
import { LibEmptyBox } from "./LibEmptyBox";
import { TLibrary } from "#types/library";
import { LibCard } from "./LibCard";

export async function LibSectionFrame({ title, description, type }: TProps) {
  await connection();
  const res = await listLibraries(type);
  const libs = res.isSuccess ? res.data.docs : [];

  return (
    <section className="space-y-6">
      <div className="space-y-1.5">
        <h2 className="text-lg font-semibold tracking-tight text-primary-200 md:text-xl">
          {title}
        </h2>
        {description ? <p className="text-sm text-foreground/80">{description}</p> : null}
      </div>

      {libs.length === 0 ? (
        <LibEmptyBox />
      ) : (
        <div className={"grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4"}>
          {libs.map((lib) => (
            <LibCard
              key={lib.id}
              href={PRIVATE_ROUTES.LIBRARY(lib.id)}
              name={lib.name}
              author={lib.author}
              trackCount={lib.trackCount}
              imageURL={lib.uploadedImageURL}
            />
          ))}
        </div>
      )}
    </section>
  );
}

type TProps = {
  type: TLibrary["type"];
  title: string;
  description?: string;
};
