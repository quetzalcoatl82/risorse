export const ARTICLE_SITE_ORIGIN = "https://console-tribe.com";

/** URL assoluta con dominio console-tribe.com */
export function articleUrl(url: string): string {
  try {
    const path = url.startsWith("http://") || url.startsWith("https://")
      ? new URL(url).pathname
      : url.startsWith("/")
        ? url
        : `/${url}`;
    const normalized = path.endsWith("/") ? path : `${path}/`;
    return `${ARTICLE_SITE_ORIGIN}${normalized}`;
  } catch {
    return url.startsWith("http") ? url : `${ARTICLE_SITE_ORIGIN}/${url}`;
  }
}

/** Slug finale senza ID numerico sequenziale (-346052, ecc.) */
export function articleSlug(url: string): string {
  let path: string;
  try {
    path =
      url.startsWith("http://") || url.startsWith("https://")
        ? new URL(url).pathname
        : url.startsWith("/")
          ? url
          : `/${url}`;
  } catch {
    path = url;
  }
  const segments = path.split("/").filter(Boolean);
  const last = segments[segments.length - 1] ?? "";
  return last.replace(/-\d+$/, "");
}

/** Titolo leggibile dallo slug (es. gothic-1-remake → Gothic 1 Remake) */
export function articleTitle(url: string): string {
  const slug = articleSlug(url);
  if (!slug) return url;
  return slug
    .split("-")
    .map((word) => (/^\d+$/.test(word) ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join(" ");
}

/** Link Slack mrkdwn: <url|titolo> */
export function articleLink(url: string): string {
  return `<${articleUrl(url)}|${articleTitle(url)}>`;
}
