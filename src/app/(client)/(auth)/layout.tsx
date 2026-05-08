import { GlowOrb } from "@/components/shared/GlowOrb";

export default function PrivateLayout({ children }: TProps) {
  return (
    <>
      <GlowOrb />
      <main>{children}</main>
    </>
  );
}

type TProps = Readonly<{ children: React.ReactNode }>;
