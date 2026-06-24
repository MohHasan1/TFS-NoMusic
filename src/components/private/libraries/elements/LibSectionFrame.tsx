import { LibCard } from "./LibCard";

const cardGridClassName = "grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4";

export function LibSectionFrame({ title, description, cards }: TProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold tracking-tight text-white/90 md:text-xl">{title}</h2>
        {description ? <p className="text-sm text-white/55">{description}</p> : null}
      </div>

      <div className={cardGridClassName}>
        {cards.map((card) => (
          <LibCard
            key={card.name}
            name={card.name}
            description={card.description}
            trackCount={card.trackCount}
          />
        ))}
      </div>
    </section>
  );
}

type TProps = {
  title: string;
  description?: string;
  cards: ReadonlyArray<TLibCardData>;
};

type TLibCardData = {
  name: string;
  description: string;
  trackCount: number;
};
