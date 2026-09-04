import Image from "next/image";

import { getGradientFromText } from "#components/private/_utils/helpers";

const isDev = process.env.NODE_ENV === "development";

export function PlaylistCover({ src, alt, name }: TProps) {
  const gradient = getGradientFromText(name);

  return (
    <div className="relative aspect-square overflow-hidden rounded-[1.75rem] border border-white/8 bg-card-secondary shadow-[0_24px_60px_-30px_color-mix(in_oklab,var(--primary-600)_55%,transparent)]">
      <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-br from-primary-400/10 via-transparent to-primary-600/12" />

      {src ? <Image src={src} alt={alt} fill priority unoptimized={isDev} sizes="(min-width: 1280px) 360px, (min-width: 1040px) 32vw, 100vw" className="object-cover" /> : <div className={`size-full bg-linear-to-br ${gradient}`} />}
    </div>
  );
}

type TProps = {
  src?: string | null;
  alt: string;
  name: string;
};
