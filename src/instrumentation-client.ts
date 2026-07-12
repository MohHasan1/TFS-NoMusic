import { initAnalytics } from "#analytics/lib/init";

// Don't track the Payload admin panel.
if (!window.location.pathname.startsWith("/admin")) {
  initAnalytics();
}
