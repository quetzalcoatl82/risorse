import type { PageStats, QueryStats, TrendItem, WeekComparison } from "../gsc/analytics";
import { getDataThroughDate } from "../gsc/analytics";
import { getWeekLabel } from "../config";

export interface SlackMessage {
  response_type?: "in_channel" | "ephemeral";
  text: string;
  blocks?: SlackBlock[];
}

export interface SlackBlock {
  type: string;
  text?: { type: string; text: string; emoji?: boolean };
  fields?: Array<{ type: string; text: string }>;
  elements?: Array<{ type: string; text: string }>;
}

function footer(): SlackBlock {
  return {
    type: "context",
    elements: [
      {
        type: "mrkdwn",
        text: `⚠️ Dati GSC aggiornati fino al *${getDataThroughDate()}* · <https://search.google.com/search-console|Apri Search Console>`,
      },
    ],
  };
}

function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

function formatPct(n: number): string {
  return `${(n * 100).toFixed(1)}%`;
}

function formatDelta(delta: number, pct: number | null): string {
  const arrow = delta > 0 ? "↑" : delta < 0 ? "↓" : "→";
  const pctStr = pct !== null ? ` (${pct > 0 ? "+" : ""}${pct.toFixed(0)}%)` : "";
  return `${arrow} ${formatNumber(Math.abs(delta))}${pctStr}`;
}

function displayUrl(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.pathname || url;
  } catch {
    return url;
  }
}

export function helpMessage(): SlackMessage {
  return {
    response_type: "in_channel",
    text: "Comandi GSC disponibili",
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "📊 Bot Search Console — Guida comandi", emoji: true },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: [
            "`/gsc help` — questa guida",
            "`/gsc top [search|discover] [7|28]` — top articoli per click",
            "`/gsc pagina <url>` — statistiche di un articolo (ultimi 7 gg)",
            "`/gsc query <parola>` — performance keyword + top pagine",
            "`/gsc keyword` — top 15 keyword per click",
            "`/gsc trend [su|giù]` — query in crescita o calo vs settimana precedente",
            "`/gsc discover` — top 10 articoli su Discover",
            "`/gsc confronto <url>` — confronto settimanale di un articolo",
          ].join("\n"),
        },
      },
      footer(),
    ],
  };
}

export function errorMessage(text: string, ephemeral = true): SlackMessage {
  return {
    response_type: ephemeral ? "ephemeral" : "in_channel",
    text,
    blocks: [
      { type: "section", text: { type: "mrkdwn", text: `❌ ${text}` } },
      footer(),
    ],
  };
}

export function topPagesMessage(
  pages: PageStats[],
  appearance: string,
  days: number
): SlackMessage {
  const label =
    appearance === "discover"
      ? "Discover"
      : appearance === "search"
        ? "Search (web)"
        : "tutti i canali";

  const lines =
    pages.length === 0
      ? ["_Nessun dato nel periodo selezionato._"]
      : pages.map(
          (p, i) =>
            `${i + 1}. *${displayUrl(p.url)}* — ${formatNumber(p.clicks)} click · CTR ${formatPct(p.ctr)} · pos. ${p.position.toFixed(1)}`
        );

  return {
    response_type: "in_channel",
    text: `Top articoli ${label}`,
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: `📊 Top articoli ${label} — ultimi ${days} giorni`,
          emoji: true,
        },
      },
      { type: "section", text: { type: "mrkdwn", text: lines.join("\n") } },
      footer(),
    ],
  };
}

export function pageStatsMessage(stats: PageStats, days: number): SlackMessage {
  return {
    response_type: "in_channel",
    text: `Statistiche ${displayUrl(stats.url)}`,
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: `📄 ${displayUrl(stats.url)}`,
          emoji: true,
        },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*Click*\n${formatNumber(stats.clicks)}` },
          { type: "mrkdwn", text: `*Impressioni*\n${formatNumber(stats.impressions)}` },
          { type: "mrkdwn", text: `*CTR*\n${formatPct(stats.ctr)}` },
          { type: "mrkdwn", text: `*Posizione media*\n${stats.position.toFixed(1)}` },
        ],
      },
      {
        type: "context",
        elements: [{ type: "mrkdwn", text: `Periodo: ultimi ${days} giorni` }],
      },
      footer(),
    ],
  };
}

export function queryStatsMessage(
  query: string,
  stats: QueryStats | null,
  topPages: PageStats[]
): SlackMessage {
  const statsBlock = stats
    ? `*${stats.query}*\n${formatNumber(stats.clicks)} click · ${formatNumber(stats.impressions)} impressioni · CTR ${formatPct(stats.ctr)} · pos. ${stats.position.toFixed(1)}`
    : `_Nessun dato per «${query}» negli ultimi 7 giorni._`;

  const pagesBlock =
    topPages.length > 0
      ? topPages
          .map((p, i) => `${i + 1}. ${displayUrl(p.url)} — ${formatNumber(p.clicks)} click`)
          .join("\n")
      : "";

  const blocks: SlackBlock[] = [
    {
      type: "header",
      text: { type: "plain_text", text: `🔍 Keyword: ${query}`, emoji: true },
    },
    { type: "section", text: { type: "mrkdwn", text: statsBlock } },
  ];

  if (pagesBlock) {
    blocks.push({
      type: "section",
      text: { type: "mrkdwn", text: `*Top pagine:*\n${pagesBlock}` },
    });
  }

  blocks.push(footer());

  return {
    response_type: "in_channel",
    text: `Query ${query}`,
    blocks,
  };
}

export function keywordsMessage(queries: QueryStats[]): SlackMessage {
  const lines =
    queries.length === 0
      ? ["_Nessun dato._"]
      : queries.map(
          (q, i) =>
            `${i + 1}. *${q.query}* — ${formatNumber(q.clicks)} click · pos. ${q.position.toFixed(1)}`
        );

  return {
    response_type: "in_channel",
    text: "Top keyword",
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "🔑 Top 15 keyword — ultimi 7 giorni", emoji: true },
      },
      { type: "section", text: { type: "mrkdwn", text: lines.join("\n") } },
      footer(),
    ],
  };
}

export function trendMessage(items: TrendItem[], direction: "up" | "down"): SlackMessage {
  const title = direction === "up" ? "Query in crescita" : "Query in calo";
  const lines =
    items.length === 0
      ? ["_Nessun trend significativo nel periodo._"]
      : items.map(
          (t, i) =>
            `${i + 1}. *${t.key}* — ${formatNumber(t.currentClicks)} click ${formatDelta(t.delta, t.deltaPct)}`
        );

  return {
    response_type: "in_channel",
    text: title,
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: `📈 ${title}`, emoji: true },
      },
      { type: "section", text: { type: "mrkdwn", text: lines.join("\n") } },
      footer(),
    ],
  };
}

export function compareMessage(comparison: WeekComparison): SlackMessage {
  const { current, previous, clicksDelta, clicksDeltaPct, positionDelta } = comparison;
  const posArrow = positionDelta < 0 ? "↑ migliorata" : positionDelta > 0 ? "↓ peggiorata" : "→ stabile";

  return {
    response_type: "in_channel",
    text: `Confronto ${displayUrl(current.url)}`,
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: `📊 Confronto settimanale — ${displayUrl(current.url)}`,
          emoji: true,
        },
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Settimana corrente*\n${formatNumber(current.clicks)} click · pos. ${current.position.toFixed(1)}`,
          },
          {
            type: "mrkdwn",
            text: `*Settimana precedente*\n${formatNumber(previous.clicks)} click · pos. ${previous.position.toFixed(1)}`,
          },
        ],
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Variazione click:* ${formatDelta(clicksDelta, clicksDeltaPct)}\n*Posizione:* ${posArrow} (${Math.abs(positionDelta).toFixed(1)} punti)`,
        },
      },
      footer(),
    ],
  };
}

export function weeklyDigestMessage(data: {
  discoverTop: PageStats[];
  searchTop: PageStats[];
  keywords: QueryStats[];
  rising: TrendItem[];
  surprise: PageStats | null;
  attention: TrendItem[];
}): SlackMessage {
  const week = getWeekLabel(7);
  const blocks: SlackBlock[] = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: `📊 Riepilogo Search Console · ${week}`,
        emoji: true,
      },
    },
    { type: "divider" },
  ];

  blocks.push(sectionList("🟣 Top 5 Discover", data.discoverTop, 5));
  blocks.push({ type: "divider" });
  blocks.push(sectionList("🔵 Top 5 Search (web)", data.searchTop, 5));
  blocks.push({ type: "divider" });

  const kwLines = data.keywords
    .slice(0, 10)
    .map(
      (q, i) =>
        `${i + 1}. *${q.query}* — ${formatNumber(q.clicks)} click · pos. ${q.position.toFixed(1)}`
    )
    .join("\n");
  blocks.push({
    type: "section",
    text: { type: "mrkdwn", text: `*🔑 Top 10 keyword*\n${kwLines || "_Nessun dato_"}` },
  });
  blocks.push({ type: "divider" });

  const highlights: string[] = [];
  if (data.rising.length) {
    highlights.push(
      `*Keyword in crescita:*\n${data.rising.map((r) => `• *${r.key}* ${formatDelta(r.delta, r.deltaPct)}`).join("\n")}`
    );
  }
  if (data.surprise) {
    highlights.push(
      `*Articolo sorpresa:* ${displayUrl(data.surprise.url)} — ${formatNumber(data.surprise.clicks)} click (nuovo in top 5 Search)`
    );
  }
  if (data.attention.length) {
    highlights.push(
      `*Attenzione:*\n${data.attention.map((a) => `• ${displayUrl(a.key)} ${formatDelta(a.delta, a.deltaPct)}`).join("\n")}`
    );
  }
  if (highlights.length) {
    blocks.push({
      type: "section",
      text: { type: "mrkdwn", text: `*✨ In evidenza editoriale*\n\n${highlights.join("\n\n")}` },
    });
  }

  blocks.push(footer());

  return {
    text: `Riepilogo Search Console · ${week}`,
    blocks,
  };
}

function sectionList(title: string, pages: PageStats[], max: number): SlackBlock {
  const lines = pages
    .slice(0, max)
    .map(
      (p, i) =>
        `${i + 1}. *${displayUrl(p.url)}* — ${formatNumber(p.clicks)} click · CTR ${formatPct(p.ctr)}`
    )
    .join("\n");
  return {
    type: "section",
    text: { type: "mrkdwn", text: `*${title}*\n${lines || "_Nessun dato_"}` },
  };
}

export async function postToSlack(
  token: string,
  channel: string,
  message: SlackMessage
): Promise<void> {
  const response = await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      channel,
      text: message.text,
      blocks: message.blocks,
    }),
  });

  const data = (await response.json()) as { ok: boolean; error?: string };
  if (!data.ok) {
    throw new Error(`Slack API errore: ${data.error ?? "sconosciuto"}`);
  }
}

export async function postDelayedResponse(responseUrl: string, message: SlackMessage): Promise<void> {
  const response = await fetch(responseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Risposta differita fallita: ${body}`);
  }
}
