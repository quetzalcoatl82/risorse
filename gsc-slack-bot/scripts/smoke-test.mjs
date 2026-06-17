/**
 * Smoke test locale — non committare output con dati sensibili.
 * Uso: node scripts/smoke-test.mjs
 */
import fs from "node:fs";
import http from "node:http";
import crypto from "node:crypto";

const WORKER_URL = "https://gsc-slack-bot.console-tribe.workers.dev";
const env = Object.fromEntries(
  fs
    .readFileSync(".dev.vars", "utf8")
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i), l.slice(i + 1)];
    })
);

const results = [];

function pass(name, detail = "") {
  results.push({ name, ok: true, detail });
  console.log(`✓ ${name}${detail ? ` — ${detail}` : ""}`);
}

function fail(name, detail = "") {
  results.push({ name, ok: false, detail });
  console.error(`✗ ${name}${detail ? ` — ${detail}` : ""}`);
}

async function signedCommand(text, responseUrl) {
  const body = new URLSearchParams({
    command: "/gsc",
    text,
    response_url: responseUrl,
    user_name: "smoke-test",
  }).toString();
  const ts = Math.floor(Date.now() / 1000).toString();
  const base = `v0:${ts}:${body}`;
  const sig =
    "v0=" +
    crypto.createHmac("sha256", env.SLACK_SIGNING_SECRET).update(base).digest("hex");
  return fetch(`${WORKER_URL}/slack/commands`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Slack-Request-Timestamp": ts,
      "X-Slack-Signature": sig,
    },
    body,
  });
}

function waitForResponse(port, timeoutMs = 25000) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      let data = "";
      req.on("data", (chunk) => (data += chunk));
      req.on("end", () => {
        res.writeHead(200);
        res.end("ok");
        server.close();
        try {
          resolve(JSON.parse(data));
        } catch {
          resolve({ raw: data });
        }
      });
    });
    server.listen(port, () => {});
    setTimeout(() => {
      server.close();
      reject(new Error("timeout"));
    }, timeoutMs);
  });
}

function b64url(s) {
  return Buffer.from(s)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function testGsc(type) {
  const sa = JSON.parse(env.GOOGLE_SERVICE_ACCOUNT_JSON);
  const now = Math.floor(Date.now() / 1000);
  const input =
    b64url(JSON.stringify({ alg: "RS256", typ: "JWT" })) +
    "." +
    b64url(
      JSON.stringify({
        iss: sa.client_email,
        scope: "https://www.googleapis.com/auth/webmasters.readonly",
        aud: "https://oauth2.googleapis.com/token",
        iat: now,
        exp: now + 3600,
      })
    );
  const sign = crypto
    .createSign("RSA-SHA256")
    .update(input)
    .sign(sa.private_key, "base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  const token = await (
    await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: `${input}.${sign}`,
      }),
    })
  ).json();
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - 3);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 6);
  const fmt = (d) => d.toISOString().slice(0, 10);
  const res = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(env.GSC_SITE_URL)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate: fmt(start),
        endDate: fmt(end),
        dimensions: ["page"],
        rowLimit: 1,
        type,
      }),
    }
  );
  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data));
  return data.rows?.[0]?.clicks ?? 0;
}

const commands = ["help", "keyword", "discover", "top search 7", "top discover 7", "trend su"];

// 1. Health
try {
  const res = await fetch(WORKER_URL);
  const body = await res.json();
  if (res.ok && body.status === "ok") pass("Health endpoint");
  else fail("Health endpoint", JSON.stringify(body));
} catch (e) {
  fail("Health endpoint", e.message);
}

// 2. Firma invalida
try {
  const res = await fetch(`${WORKER_URL}/slack/commands`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "command=/gsc&text=help",
  });
  if (res.status === 401) pass("Rifiuto firma invalida");
  else fail("Rifiuto firma invalida", `status ${res.status}`);
} catch (e) {
  fail("Rifiuto firma invalida", e.message);
}

// 3. GSC API
try {
  const web = await testGsc("web");
  pass("GSC API web", `${web} click top page`);
} catch (e) {
  fail("GSC API web", e.message);
}

try {
  const discover = await testGsc("discover");
  pass("GSC API discover", `${discover} click top page`);
} catch (e) {
  fail("GSC API discover", e.message);
}

// 4. Slack bot
try {
  const auth = await (
    await fetch("https://slack.com/api/auth.test", {
      headers: { Authorization: `Bearer ${env.SLACK_BOT_TOKEN}` },
    })
  ).json();
  if (auth.ok) pass("Slack auth", `@${auth.user}`);
  else fail("Slack auth", auth.error);
} catch (e) {
  fail("Slack auth", e.message);
}

try {
  const join = await (
    await fetch("https://slack.com/api/conversations.info", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.SLACK_BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ channel: env.SLACK_CHANNEL_ID }),
    })
  ).json();
  if (join.ok && join.channel?.is_member) pass("Bot nel canale", join.channel.name);
  else if (join.ok) fail("Bot nel canale", "non membro — esegui /invite @search_console");
  else fail("Bot nel canale", join.error);
} catch (e) {
  fail("Bot nel canale", e.message);
}

// 5. Slash commands (risposta differita)
for (const cmd of commands) {
  try {
    const port = 18080 + Math.floor(Math.random() * 1000);
    const responsePromise = waitForResponse(port);
    const ack = await signedCommand(cmd, `http://127.0.0.1:${port}/slack`);
    if (ack.status !== 200) {
      fail(`Comando /gsc ${cmd}`, `ack status ${ack.status}`);
      continue;
    }
    const message = await responsePromise;
    const text = JSON.stringify(message);
    if (text.includes("Cannot read properties") || text.includes("❌")) {
      fail(`Comando /gsc ${cmd}`, message.blocks?.[0]?.text?.text ?? text.slice(0, 120));
    } else if (message.blocks?.length || message.text) {
      pass(`Comando /gsc ${cmd}`, (message.text ?? "").slice(0, 60));
    } else {
      fail(`Comando /gsc ${cmd}`, "risposta vuota");
    }
  } catch (e) {
    fail(`Comando /gsc ${cmd}`, e.message);
  }
}

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} test passati`);
process.exit(failed.length ? 1 : 0);
