import { PrivateNavbar } from "@/components/_layout/private/PrivateNavbar";
import { GlowOrb } from "@/components/shared/GlowOrb";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PrivateNavbar />
      <GlowOrb />
      <main>{children}</main>
    </>
  );
}
