import posthog from "posthog-js";

import type { TAnalyticsEventName, TAnalyticsEvents } from "./events";

export function track<Event extends TAnalyticsEventName>(
  event: Event,
  properties: TAnalyticsEvents[Event],
): void {
  posthog.capture(event, properties);
}
