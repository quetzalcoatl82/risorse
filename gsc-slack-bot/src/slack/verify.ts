import { timingSafeEqual } from "./crypto";

export async function verifySlackSignature(
  signingSecret: string,
  request: Request,
  rawBody: string
): Promise<boolean> {
  const timestamp = request.headers.get("X-Slack-Request-Timestamp");
  const signature = request.headers.get("X-Slack-Signature");

  if (!timestamp || !signature) return false;

  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (age > 60 * 5) return false;

  const base = `v0:${timestamp}:${rawBody}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(signingSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(base));
  const hex = [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, "0")).join("");
  const expected = `v0=${hex}`;

  return timingSafeEqual(expected, signature);
}

export function parseSlashCommand(body: string): {
  command: string;
  text: string;
  responseUrl: string;
  userName: string;
} {
  const params = new URLSearchParams(body);
  return {
    command: params.get("command") ?? "",
    text: (params.get("text") ?? "").trim(),
    responseUrl: params.get("response_url") ?? "",
    userName: params.get("user_name") ?? "utente",
  };
}
