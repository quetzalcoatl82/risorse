import type { Env } from "../config";
import {
  comparePageWeeks,
  getPageStats,
  getQueryStats,
  getTopPages,
  getTopQueries,
  getTrendingQueries,
} from "../gsc/analytics";
import {
  compareMessage,
  errorMessage,
  helpMessage,
  keywordsMessage,
  pageStatsMessage,
  postDelayedResponse,
  queryStatsMessage,
  topPagesMessage,
  trendMessage,
  type SlackMessage,
} from "./messages";

export interface ParsedCommand {
  subcommand: string;
  args: string[];
}

export function parseCommandText(text: string): ParsedCommand {
  const parts = text.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return { subcommand: "help", args: [] };
  return { subcommand: parts[0].toLowerCase(), args: parts.slice(1) };
}

export async function handleCommand(env: Env, text: string): Promise<SlackMessage> {
  const { subcommand, args } = parseCommandText(text);

  try {
    switch (subcommand) {
      case "help":
      case "aiuto":
        return helpMessage();

      case "top": {
        let appearance: "all" | "discover" | "search" = "all";
        let days = 7;
        for (const arg of args) {
          if (arg === "discover" || arg === "search") appearance = arg;
          else if (arg === "7" || arg === "28") days = Number(arg);
        }
        const pages = await getTopPages(env, days, appearance, 10);
        return topPagesMessage(pages, appearance, days);
      }

      case "pagina": {
        if (!args.length) return errorMessage("Specifica un URL: `/gsc pagina /mio-articolo`");
        const url = args.join(" ");
        const stats = await getPageStats(env, url, 7);
        if (!stats) return errorMessage(`Nessun dato per \`${url}\` negli ultimi 7 giorni.`, false);
        return pageStatsMessage(stats, 7);
      }

      case "query": {
        if (!args.length) return errorMessage("Specifica una keyword: `/gsc query nintendo switch 2`");
        const query = args.join(" ");
        const { stats, topPages } = await getQueryStats(env, query, 7);
        return queryStatsMessage(query, stats, topPages);
      }

      case "keyword":
      case "keywords": {
        const queries = await getTopQueries(env, 7, 15);
        return keywordsMessage(queries);
      }

      case "trend": {
        const direction = args[0] === "giù" || args[0] === "giu" || args[0] === "down" ? "down" : "up";
        const items = await getTrendingQueries(env, direction, 10);
        return trendMessage(items, direction);
      }

      case "discover": {
        const pages = await getTopPages(env, 7, "discover", 10);
        return topPagesMessage(pages, "discover", 7);
      }

      case "confronto": {
        if (!args.length) return errorMessage("Specifica un URL: `/gsc confronto /mio-articolo`");
        const url = args.join(" ");
        const comparison = await comparePageWeeks(env, url);
        if (!comparison) return errorMessage(`Nessun dato per \`${url}\`.`, false);
        return compareMessage(comparison);
      }

      default:
        return errorMessage(
          `Comando sconosciuto: \`${subcommand}\`. Usa \`/gsc help\` per la lista completa.`
        );
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Errore imprevisto";
    console.error(JSON.stringify({ event: "command_error", subcommand, error: message }));
    return errorMessage(message, false);
  }
}

export async function processSlashCommand(
  env: Env,
  text: string,
  responseUrl: string,
  ctx: ExecutionContext
): Promise<Response> {
  const ack = helpMessage();
  ack.text = "⏳ Elaborazione in corso…";
  ack.blocks = [
    {
      type: "section",
      text: { type: "mrkdwn", text: "⏳ Recupero dati da Search Console…" },
    },
  ];
  ack.response_type = "ephemeral";

  const work = handleCommand(env, text)
    .then((message) => postDelayedResponse(responseUrl, message))
    .catch((err) => {
      const message = err instanceof Error ? err.message : "Errore imprevisto";
      return postDelayedResponse(responseUrl, errorMessage(message, false));
    });

  ctx.waitUntil(work);

  return new Response("", { status: 200 });
}
