import type { Env } from "./config";
import { runWeeklyDigest } from "./jobs/weekly-digest";
import { processSlashCommand } from "./slack/commands";
import { parseSlashCommand, verifySlackSignature } from "./slack/verify";

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/") {
      return new Response(
        JSON.stringify({ status: "ok", service: "gsc-slack-bot" }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    if (request.method === "POST" && url.pathname === "/slack/commands") {
      const rawBody = await request.text();
      const valid = await verifySlackSignature(env.SLACK_SIGNING_SECRET, request, rawBody);
      if (!valid) {
        return new Response("Firma Slack non valida", { status: 401 });
      }

      const { text, responseUrl } = parseSlashCommand(rawBody);
      return processSlashCommand(env, text, responseUrl, ctx);
    }

    return new Response("Not found", { status: 404 });
  },

  async scheduled(_event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    ctx.waitUntil(
      runWeeklyDigest(env).catch((err) => {
        const message = err instanceof Error ? err.message : "Errore imprevisto";
        console.error(JSON.stringify({ event: "weekly_digest_error", error: message }));
      })
    );
  },
};
