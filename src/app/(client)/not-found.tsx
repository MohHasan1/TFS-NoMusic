import { RiMusic2Fill } from "@remixicon/react";
import Link from "next/link";

import { PRIVATE_ROUTES } from "#constants/routes";
import { Button } from "#components/ui/button";

const NotFound = () => {
  return (
    <main className="relative min-h-dvh bg-linear-to-br from-background to-background via-primary/10 flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      {/* Large 404 with bouncing "0" */}
      <div className="relative flex items-center justify-center">
        <h1 className="text-[100px] sm:text-[180px] md:text-[250px] lg:text-[300px] font-extrabold text-primary-200 leading-none select-none flex items-baseline">
          <span>4</span>
          <span className="animate-[bounce_1.5s_infinite] text-primary-400">0</span>
          <span>4</span>
        </h1>
      </div>

      {/* Content */}
      <div className="text-center mt-2 sm:mt-4 text-primary-200">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Page Not Found</h2>

        <p className="text-sm sm:text-base max-w-sm text-muted-foreground  mx-auto mb-8 leading-relaxed">
          We couldn&apos;t find the page you were looking for.
          <br />
          It might have been moved or doesn&apos;t exist.
        </p>

        <Button
          nativeButton={false}
          render={
            <Link href={PRIVATE_ROUTES.NOMUSIC}>
              <RiMusic2Fill className="size-5 mr-2" />
              Back to NoMusic
            </Link>
          }
          className="px-5 py-4 md:px-7 md:py-6"
        />
      </div>
    </main>
  );
};

export default NotFound;
