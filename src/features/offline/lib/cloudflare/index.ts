const OFFLINE_IMAGE_WIDTH = 512;
const OFFLINE_IMAGE_QUALITY = 70;

function normalizeSrc(src: string): string {
  return src.startsWith("/") ? src.slice(1) : src;
}

export function buildOfflineCloudflareImageUrl(src: string): string {
  if (process.env.NODE_ENV === "development") {
    return src;
  }

  const params = [
    `width=${OFFLINE_IMAGE_WIDTH}`,
    `quality=${OFFLINE_IMAGE_QUALITY}`,
    "format=auto",
    "fit=scale-down",
  ];

  const host = (
    process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGE_HOST ?? "https://thefamilysuite.org"
  ).replace(/\/$/, "");

  return `${host}/cdn-cgi/image/${params.join(",")}/${normalizeSrc(src)}`;
}
