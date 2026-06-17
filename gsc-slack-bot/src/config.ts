export interface Env {
  SLACK_BOT_TOKEN: string;
  SLACK_SIGNING_SECRET: string;
  GOOGLE_SERVICE_ACCOUNT_JSON: string;
  GSC_SITE_URL: string;
  SLACK_CHANNEL_ID: string;
  GSC_CACHE: KVNamespace;
}

export const GSC_SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";
export const GSC_API_BASE = "https://www.googleapis.com/webmasters/v3";
export const CACHE_TTL_SECONDS = 6 * 60 * 60;
export const GSC_DATA_LAG_DAYS = 3;

export type SearchAppearance = "all" | "discover" | "search";

export interface DateRange {
  startDate: string;
  endDate: string;
}

export function formatDateIT(date: Date): string {
  return date.toLocaleDateString("it-IT", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateISO(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function getDateRange(days: number, lagDays = GSC_DATA_LAG_DAYS): DateRange {
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - lagDays);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - (days - 1));
  return {
    startDate: formatDateISO(start),
    endDate: formatDateISO(end),
  };
}

export function getPreviousDateRange(days: number, lagDays = GSC_DATA_LAG_DAYS): DateRange {
  const current = getDateRange(days, lagDays);
  const end = new Date(current.startDate + "T00:00:00Z");
  end.setUTCDate(end.getUTCDate() - 1);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - (days - 1));
  return {
    startDate: formatDateISO(start),
    endDate: formatDateISO(end),
  };
}

export function getWeekLabel(days: number): string {
  const range = getDateRange(days);
  const start = new Date(range.startDate + "T00:00:00Z");
  const end = new Date(range.endDate + "T00:00:00Z");
  return `${formatDateIT(start)} – ${formatDateIT(end)}`;
}
