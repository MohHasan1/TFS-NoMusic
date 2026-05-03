import { RiMusic2Line } from "@remixicon/react";

const NoMusicHeader = () => {
  return (
    <header className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div className="space-y-2">
        <h1 className="flex items-center gap-3 text-4xl font-extrabold tracking-tight text-white">
          <RiMusic2Line className="h-10 w-10 text-primary" />
          NoMusic Collection
        </h1>
        <p className="max-w-2xl text-zinc-400">
          Browse and play your private catalog.
        </p>
      </div>
    </header>
  );
};

export default NoMusicHeader;
