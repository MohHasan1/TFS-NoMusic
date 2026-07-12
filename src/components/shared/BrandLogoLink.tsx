import Link from "next/link";

export function BrandLogoLink({ link, prefetch = true }: TProps) {
  return (
    <Link
      href={link}
      prefetch={prefetch}
      className="group font-semibold uppercase transition-colors duration-300"
      data-ph-capture-attribute-action="brand_logo_pressed"
      data-ph-capture-attribute-link={link}
    >
      <span className="text-white/80 group-hover:text-white/60">No</span>
      <span
        className="bg-linear-to-br from-primary-400 to-primary-600 bg-clip-text text-transparent 
        group-hover:from-primary-400/80 group-hover:to-primary-600/80 transition-all duration-300"
      >
        Music
      </span>
    </Link>
  );
}

type TProps = {
  link: string;
  prefetch?: boolean;
};
