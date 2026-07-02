export function navigateOffline(href: string) {
  const nextURL = new URL(href, window.location.origin);
  const currentURL = new URL(window.location.href);

  // Skip the history update when the user is already on this offline view.
  if (nextURL.pathname === currentURL.pathname && nextURL.search === currentURL.search) {
    return;
  }

  window.history.pushState(null, "", nextURL);
}
