import Link from "next/link";

export function BrandLogo({ link }: TProps) {
  return (
    <Link href={link} className="group font-semibold uppercase transition-colors duration-300">
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
};
