import { PrivateNavbar } from "@/components/_layout/private/PrivateNavbar";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PrivateNavbar />
      <main>{children}</main>
    </>
  );
}
