import Link from "next/link";
import { Button } from "#components/ui/button";

type TestLayoutProps = {
  children: React.ReactNode;
};

export default function TestLayout({ children }: TestLayoutProps) {
  return (
    <div className="mx-auto pt-28 flex w-full max-w-5xl flex-col gap-6 px-4 py-10">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button render={<Link href="/test" />}>Test home</Button>
        <Button render={<Link href="/test/old" />}>Old dialog</Button>
        <Button render={<Link href="/test/new" />}>New dialog</Button>
      </div>

      {children}
    </div>
  );
}
