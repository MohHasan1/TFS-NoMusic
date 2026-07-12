import posthog from "posthog-js";

export function initAnalytics() {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    defaults: "2026-05-30",

    // Disable automatic click/form/input events
    autocapture: false,

    // Automatically track Next.js page visits
    capture_pageview: "history_change",
    capture_pageleave: true,

    // Do not record user screens
    disable_session_recording: true,

    person_profiles: "identified_only",
  });
}
