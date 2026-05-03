import { PrivateNavbar } from "@/components/layout/private/PrivateNavbar";

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
