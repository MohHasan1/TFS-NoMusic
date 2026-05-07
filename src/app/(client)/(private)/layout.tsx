import { PrivateNavbar } from "@/components/_layout/private/PrivateNavbar";
import { GlowOrb } from "@/components/public/home/GlowOrb";

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
