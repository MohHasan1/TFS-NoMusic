import posthog from "posthog-js";
import { isDevEnv } from "#lib/env";

export function initAnalytics() {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    defaults: "2026-05-30",

    // Only capture clicks on elements we've explicitly tagged with
    // data-ph-capture-attribute-action (see docs/ANALYTICS.md)
    autocapture: {
      css_selector_allowlist: ["[data-ph-capture-attribute-action]"],
    },

    // Automatically track Next.js page visits
    capture_pageview: "history_change",
    capture_pageleave: true,

    // Do not record user screens
    disable_session_recording: true,

    person_profiles: "identified_only",

    // Keep the SDK fully initialized in dev (identify/track/reset stay
    // safe no-ops) but send nothing to PostHog, including the very first
    // pageview — read synchronously at init, before any capturing starts.
    opt_out_capturing_by_default: isDevEnv(),
  });
}
