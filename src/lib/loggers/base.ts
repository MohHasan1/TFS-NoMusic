/*
  Basic log functions for info, warning, and error logs.
*/

export function logError(...errors: unknown[]) {
  if (process.env.NODE_ENV !== "production") {
    const callLocation = new Error().stack?.split("\n")[2];

    // ANSI escape codes //
    const redBgBlackText = "\x1b[41;30m";
    const reset = "\x1b[0m";

    console.error(`\n${redBgBlackText} DEBUG-ERROR: ${reset}\n`, ...errors);

    if (callLocation) {
      console.error(`${redBgBlackText} CALLED FROM: ${reset}\n`, callLocation.trim(), `\n`);
    }
  }
}

export function logInfo(...info: unknown[]) {
  if (process.env.NODE_ENV !== "production") {
    const callLocation = new Error().stack?.split("\n")[2];

    // ANSI escape codes //
    const lightBlueBgBlackText = "\x1b[44;30m";
    const reset = "\x1b[0m";

    console.info(`\n${lightBlueBgBlackText} DEBUG-INFO: ${reset}\n`, ...info);

    if (callLocation) {
      console.info(`${lightBlueBgBlackText} CALLED FROM: ${reset}\n`, callLocation.trim(), `\n`);
    }
  }
}

export function logWarn(...warnings: unknown[]) {
  if (process.env.NODE_ENV !== "production") {
    const callLocation = new Error().stack?.split("\n")[2];

    const orangeBgRedText = "\x1b[43;30m";
    const reset = "\x1b[0m";

    console.warn(`\n${orangeBgRedText} DEBUG-WARN: ${reset}\n`, ...warnings);

    if (callLocation) {
      console.warn(`${orangeBgRedText} CALLED FROM: ${reset}\n`, callLocation.trim(), `\n`);
    }
  }
}

/* 
  NOTE-1:LOG STRUCTURE:
    DEBUG-INFO:
      hello (your log)
    CALLED FROM:
      at Home (webpack-internal:///(rsc)/./src/app/page.tsx:11:56) (the file it was called from)

  NOTE-2: DEBUG-INFO: This is the log type. There are 3 types: Info, Error, Warn.

  NOTE-3: CALLED FROM: This is the path the specific logger was called from.
*/