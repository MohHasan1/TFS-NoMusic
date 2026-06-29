import "./(client)/globals.css";
import ClientNotFound from "./(client)/not-found";

export const metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`dark h-full min-h-dvh antialiased bg-background`}>
      <body>
        <ClientNotFound />
      </body>
    </html>
  );
}
