import {
  getDateRange,
  getPreviousDateRange,
  type Env,
  type SearchAppearance,
} from "../config";
import { gscFetch, withCache } from "./client";

export interface GscRow {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface GscResponse {
  rows?: GscRow[];
  responseAggregationType?: string;
}

export interface PageStats {
  url: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position?: number;
}

export interface QueryStats {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position?: number;
}

export interface WeekComparison {
  current: PageStats;
  previous: PageStats;
  clicksDelta: number;
  clicksDeltaPct: number | null;
  positionDelta?: number;
}

export interface TrendItem {
  key: string;
  currentClicks: number;
  previousClicks: number;
  delta: number;
  deltaPct: number | null;
}

interface SearchAnalyticsBody {
  startDate: string;
  endDate: string;
  dimensions: string[];
  rowLimit: number;
  type?: "web" | "discover";
  dimensionFilterGroups?: Array<{
    filters: Array<{
      dimension: string;
      operator: string;
      expression: string;
    }>;
  }>;
  dimensionFilterGroupsOperator?: string;
}

function withSearchType(
  body: Omit<SearchAnalyticsBody, "type">,
  appearance: SearchAppearance
): SearchAnalyticsBody {
  if (appearance === "discover") {
    return { ...body, type: "discover" };
  }
  // "web" = tab Ricerca (esclude Discover); default API
  return { ...body, type: "web" };
}

async function queryAnalytics(
  env: Env,
  body: SearchAnalyticsBody
): Promise<GscRow[]> {
  const cacheKey = `gsc:${JSON.stringify(body)}`;
  return withCache(env, cacheKey, async () => {
    const data = await gscFetch<GscResponse>(env, "/searchAnalytics/query", {
      method: "POST",
      body: JSON.stringify(body),
    });
    return data.rows ?? [];
  });
}

function rowToPage(row: GscRow): PageStats {
  return {
    url: row.keys[0],
    clicks: row.clicks ?? 0,
    impressions: row.impressions ?? 0,
    ctr: row.ctr ?? 0,
    position: row.position,
  };
}

function rowToQuery(row: GscRow): QueryStats {
  return {
    query: row.keys[0],
    clicks: row.clicks ?? 0,
    impressions: row.impressions ?? 0,
    ctr: row.ctr ?? 0,
    position: row.position,
  };
}

export async function getTopPages(
  env: Env,
  days: number,
  appearance: SearchAppearance,
  limit = 10
): Promise<PageStats[]> {
  const range = getDateRange(days);
  const rows = await queryAnalytics(
    env,
    withSearchType(
      {
        ...range,
        dimensions: ["page"],
        rowLimit: limit,
      },
      appearance
    )
  );
  return rows.map(rowToPage);
}

export async function getTopQueries(
  env: Env,
  days: number,
  limit = 15
): Promise<QueryStats[]> {
  const range = getDateRange(days);
  const rows = await queryAnalytics(env, {
    ...range,
    dimensions: ["query"],
    rowLimit: limit,
  });
  return rows.map(rowToQuery);
}

export async function getPageStats(
  env: Env,
  pageUrl: string,
  days: number
): Promise<PageStats | null> {
  const range = getDateRange(days);
  const normalized = normalizePageUrl(pageUrl, env.GSC_SITE_URL);
  const rows = await queryAnalytics(env, {
    ...range,
    dimensions: ["page"],
    rowLimit: 1,
    dimensionFilterGroups: [
      {
        filters: [{ dimension: "page", operator: "equals", expression: normalized }],
      },
    ],
  });
  if (!rows.length) return null;
  return rowToPage(rows[0]);
}

export async function getQueryStats(
  env: Env,
  query: string,
  days: number
): Promise<{ stats: QueryStats | null; topPages: PageStats[] }> {
  const range = getDateRange(days);
  const [queryRows, pageRows] = await Promise.all([
    queryAnalytics(env, {
      ...range,
      dimensions: ["query"],
      rowLimit: 1,
      dimensionFilterGroups: [
        {
          filters: [{ dimension: "query", operator: "contains", expression: query }],
        },
      ],
    }),
    queryAnalytics(env, {
      ...range,
      dimensions: ["page", "query"],
      rowLimit: 50,
      dimensionFilterGroups: [
        {
          filters: [{ dimension: "query", operator: "contains", expression: query }],
        },
      ],
    }),
  ]);

  const pageMap = new Map<string, PageStats>();
  for (const row of pageRows) {
    const url = row.keys[0];
    const existing = pageMap.get(url);
    if (!existing || row.clicks > existing.clicks) {
      pageMap.set(url, {
        url,
        clicks: row.clicks,
        impressions: row.impressions,
        ctr: row.ctr,
        position: row.position,
      });
    }
  }

  const topPages = [...pageMap.values()]
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 5);

  return {
    stats: queryRows.length ? rowToQuery(queryRows[0]) : null,
    topPages,
  };
}

export async function comparePageWeeks(
  env: Env,
  pageUrl: string
): Promise<WeekComparison | null> {
  const normalized = normalizePageUrl(pageUrl, env.GSC_SITE_URL);
  const currentRange = getDateRange(7);
  const previousRange = getPreviousDateRange(7);

  const filter = [
    {
      filters: [{ dimension: "page", operator: "equals", expression: normalized }],
    },
  ];

  const [currentRows, previousRows] = await Promise.all([
    queryAnalytics(env, {
      ...currentRange,
      dimensions: ["page"],
      rowLimit: 1,
      dimensionFilterGroups: filter,
    }),
    queryAnalytics(env, {
      ...previousRange,
      dimensions: ["page"],
      rowLimit: 1,
      dimensionFilterGroups: filter,
    }),
  ]);

  const empty: PageStats = {
    url: normalized,
    clicks: 0,
    impressions: 0,
    ctr: 0,
  };

  const current = currentRows.length ? rowToPage(currentRows[0]) : empty;
  const previous = previousRows.length ? rowToPage(previousRows[0]) : empty;
  const clicksDelta = current.clicks - previous.clicks;
  const clicksDeltaPct =
    previous.clicks > 0 ? ((clicksDelta / previous.clicks) * 100) : null;

  return {
    current,
    previous,
    clicksDelta,
    clicksDeltaPct,
    positionDelta:
      current.position != null && previous.position != null
        ? current.position - previous.position
        : undefined,
  };
}

export async function getTrendingQueries(
  env: Env,
  direction: "up" | "down",
  limit = 10
): Promise<TrendItem[]> {
  const currentRange = getDateRange(7);
  const previousRange = getPreviousDateRange(7);

  const [currentRows, previousRows] = await Promise.all([
    queryAnalytics(env, { ...currentRange, dimensions: ["query"], rowLimit: 100 }),
    queryAnalytics(env, { ...previousRange, dimensions: ["query"], rowLimit: 100 }),
  ]);

  const previousMap = new Map(previousRows.map((r) => [r.keys[0], r.clicks]));
  const trends: TrendItem[] = [];

  for (const row of currentRows) {
    const key = row.keys[0];
    const prev = previousMap.get(key) ?? 0;
    const delta = row.clicks - prev;
    if (direction === "up" && delta <= 0) continue;
    if (direction === "down" && delta >= 0) continue;
    trends.push({
      key,
      currentClicks: row.clicks,
      previousClicks: prev,
      delta,
      deltaPct: prev > 0 ? (delta / prev) * 100 : null,
    });
  }

  trends.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
  return trends.slice(0, limit);
}

export async function getRisingKeywords(env: Env, limit = 3): Promise<TrendItem[]> {
  return getTrendingQueries(env, "up", limit);
}

export async function getSurpriseArticle(env: Env): Promise<PageStats | null> {
  const currentRange = getDateRange(7);
  const previousRange = getPreviousDateRange(7);

  const [currentTop, previousAll] = await Promise.all([
    queryAnalytics(
      env,
      withSearchType(
        { ...currentRange, dimensions: ["page"], rowLimit: 5 },
        "search"
      )
    ),
    queryAnalytics(
      env,
      withSearchType(
        { ...previousRange, dimensions: ["page"], rowLimit: 20 },
        "search"
      )
    ),
  ]);

  const previousUrls = new Set(previousAll.map((r) => r.keys[0]));
  const surprise = currentTop.find((r) => !previousUrls.has(r.keys[0]));
  return surprise ? rowToPage(surprise) : null;
}

export async function getAttentionPages(env: Env, limit = 3): Promise<TrendItem[]> {
  const currentRange = getDateRange(7);
  const previousRange = getPreviousDateRange(7);

  const [currentRows, previousRows] = await Promise.all([
    queryAnalytics(
      env,
      withSearchType(
        { ...currentRange, dimensions: ["page"], rowLimit: 10 },
        "search"
      )
    ),
    queryAnalytics(
      env,
      withSearchType(
        { ...previousRange, dimensions: ["page"], rowLimit: 50 },
        "search"
      )
    ),
  ]);

  const previousMap = new Map(previousRows.map((r) => [r.keys[0], r.clicks]));
  const alerts: TrendItem[] = [];

  for (const row of currentRows) {
    const url = row.keys[0];
    const prev = previousMap.get(url) ?? 0;
    if (prev === 0) continue;
    const delta = row.clicks - prev;
    const deltaPct = (delta / prev) * 100;
    if (deltaPct <= -30) {
      alerts.push({
        key: url,
        currentClicks: row.clicks,
        previousClicks: prev,
        delta,
        deltaPct,
      });
    }
  }

  alerts.sort((a, b) => (a.deltaPct ?? 0) - (b.deltaPct ?? 0));
  return alerts.slice(0, limit);
}

function normalizePageUrl(input: string, siteUrl: string): string {
  const trimmed = input.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  const base = siteUrl.startsWith("sc-domain:")
    ? `https://${siteUrl.replace("sc-domain:", "")}`
    : siteUrl.endsWith("/")
      ? siteUrl.slice(0, -1)
      : siteUrl;
  const path = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return `${base}${path}`;
}

export function getDataThroughDate(): string {
  const end = getDateRange(1).endDate;
  return new Date(end + "T00:00:00Z").toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
