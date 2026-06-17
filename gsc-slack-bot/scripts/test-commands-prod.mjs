import fs from "node:fs";
import crypto from "node:crypto";

const WORKER = process.env.WORKER_URL ?? "https://gsc-slack-bot.console-tribe.workers.dev";
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

async function signedPost(text, responseUrl) {
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
  return fetch(`${WORKER}/slack/commands`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Slack-Request-Timestamp": ts,
      "X-Slack-Signature": sig,
    },
    body,
  });
}

async function testCommand(text) {
  const wh = await (
    await fetch("https://webhook.site/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}",
    })
  ).json();
  const responseUrl = `https://webhook.site/${wh.uuid}`;
  const ack = await signedPost(text, responseUrl);
  if (ack.status !== 200) throw new Error(`ack ${ack.status}`);

  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 1500));
    const reqs = await (
      await fetch(`https://webhook.site/token/${wh.uuid}/requests?sorting=newest`)
    ).json();
    if (!reqs.data?.length) continue;
    const msg = JSON.parse(reqs.data[0].content);
    const flat = JSON.stringify(msg);
    if (flat.includes("Cannot read properties") || msg.blocks?.[0]?.text?.text?.startsWith("❌")) {
      throw new Error(msg.blocks?.[0]?.text?.text ?? flat.slice(0, 200));
    }
    return (msg.text ?? "ok").slice(0, 80);
  }
  throw new Error("timeout");
}

const commands = ["help", "keyword", "discover", "top search 7", "top discover 7", "trend su"];
let ok = 0;
for (const cmd of commands) {
  try {
    const detail = await testCommand(cmd);
    console.log(`✓ /gsc ${cmd} — ${detail}`);
    ok++;
  } catch (e) {
    console.error(`✗ /gsc ${cmd} — ${e.message}`);
  }
}
process.exit(ok === commands.length ? 0 : 1);
