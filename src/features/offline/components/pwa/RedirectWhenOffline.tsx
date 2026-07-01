// "use client";

// import { OFFLINE_ROUTES } from "#constants/routes";
// import { useEffect } from "react";

// const OFFLINE_PATH = OFFLINE_ROUTES.HOME;

// export function RedirectWhenOffline() {
//   useEffect(() => {
//     const redirectToOffline = () => {
//       const isAlreadyOfflineRoute =
//         window.location.pathname === OFFLINE_PATH ||
//         window.location.pathname.startsWith(`${OFFLINE_PATH}/`);

//       if (!navigator.onLine && !isAlreadyOfflineRoute) {
//         window.location.replace(OFFLINE_PATH);
//       }
//     };

//     // Handle opening/loading the app while already offline.
//     redirectToOffline();

//     // Handle losing the connection while using the app.
//     window.addEventListener("offline", redirectToOffline);

//     return () => {
//       window.removeEventListener("offline", redirectToOffline);
//     };
//   }, []);

//   return null;
// }
