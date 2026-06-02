import { BrandLogo } from "#components/shared/BrandLogo";
import { GlowOrb } from "#components/shared/GlowOrb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#components/ui/card";

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-16"
    >
      <GlowOrb position="left" isNeonGlow hideForPhone />
      <GlowOrb position="right" isNeonGlow hideForPhone />

      <Card className="relative w-full max-w-md overflow-hidden rounded-4xl p-5 backdrop-blur-xl md:max-w-4xl md:p-8">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/12 via-transparent to-primary-600/10" />
        <div className="pointer-events-none absolute -left-10 top-10 size-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 bottom-0 size-44 rounded-full bg-primary-400/10 blur-3xl" />

        <div className="relative flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <CardHeader className="min-w-0 max-w-2xl flex-1 items-center gap-2 p-0 text-center md:items-start md:text-left">
            <BrandLogo className="text-lg hidden md:flex" />

            <CardTitle className="text-2xl tracking-tight md:text-3xl">
              Getting NoMusic ready
            </CardTitle>

            <CardDescription>Server cat is warming things up.</CardDescription>
          </CardHeader>

          <CardContent className="mx-auto w-full max-w-sm p-0 md:mx-0 md:w-96 md:max-w-none md:shrink-0">
            <LoadingCatTablet />
          </CardContent>
        </div>

        <span className="sr-only">Loading NoMusic page...</span>
      </Card>
    </div>
  );
}

function LoadingCatTablet() {
  return (
    <div className="relative w-full overflow-visible pt-4">
      <div className="pointer-events-none absolute left-8 top-3 size-7 rotate-45 rounded-md bg-primary/30" />
      <div className="pointer-events-none absolute right-8 top-3 size-7 rotate-45 rounded-md bg-primary/30" />

      <div className="relative mt-3 rounded-[2rem] border border-primary/20 bg-background/85 p-5 shadow-inner">
        <div className="pointer-events-none absolute left-6 top-6 size-2.5 rounded-full bg-primary/60" />
        <div className="pointer-events-none absolute right-6 top-6 size-2.5 rounded-full bg-primary/60" />

        <div className="flex min-h-44 flex-col items-center justify-center gap-4 rounded-[1.5rem] bg-linear-to-br from-primary/8 via-transparent to-primary-600/8">
          <div className="size-14 rounded-full border-4 border-primary/15 border-t-primary motion-safe:animate-spin" />
        </div>
      </div>
    </div>
  );
}
