const ALLOWED_IMAGE_HOSTS = ["images.unsplash.com", "example.com"];

export function getSafeImageUrl(url: string | null | undefined): string {
  if (!url) return "/placeholder-gear.png";

  try {
    const parsed = new URL(url);
    if (ALLOWED_IMAGE_HOSTS.includes(parsed.hostname)) {
      return url;
    }
  } catch {
    // not even a valid absolute URL, e.g. "www.gasedr.com/..."
  }

  return "/placeholder-gear.png";
}
