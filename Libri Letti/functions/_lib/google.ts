// Accesso al foglio con un service account: la chiave privata sta nei secret
// del progetto, mai nel browser, e non c'e' nessun consenso da rinnovare.

export interface Ambiente {
  readonly GOOGLE_SA_EMAIL: string;
  readonly GOOGLE_SA_KEY: string;
  readonly GOOGLE_BOOKS_KEY: string;
  readonly SPREADSHEET_ID: string;
  readonly SHEET_NAME: string;
}

let cache: { token: string; scadenza: number } | null = null;

function base64url(dati: ArrayBuffer | string): string {
  const bytes = typeof dati === "string" ? new TextEncoder().encode(dati) : new Uint8Array(dati);
  let binario = "";
  bytes.forEach((b) => (binario += String.fromCharCode(b)));
  return btoa(binario).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** La chiave del service account arriva in PEM PKCS#8. */
function pemInBuffer(pem: string): ArrayBuffer {
  const corpo = pem
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace(/\s+/g, "");
  const binario = atob(corpo);
  const buffer = new Uint8Array(binario.length);
  for (let i = 0; i < binario.length; i++) buffer[i] = binario.charCodeAt(i);
  return buffer.buffer;
}

async function nuovoToken(env: Ambiente): Promise<string> {
  const adesso = Math.floor(Date.now() / 1000);
  const intestazione = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const corpo = base64url(JSON.stringify({
    iss: env.GOOGLE_SA_EMAIL,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    iat: adesso,
    exp: adesso + 3600,
  }));

  const chiave = await crypto.subtle.importKey(
    "pkcs8",
    pemInBuffer(env.GOOGLE_SA_KEY.replace(/\\n/g, "\n")),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const firma = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    chiave,
    new TextEncoder().encode(intestazione + "." + corpo),
  );

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: intestazione + "." + corpo + "." + base64url(firma),
    }),
  });
  if (!res.ok) throw new Error("Token rifiutato da Google: " + res.status + " " + (await res.text()));

  const dati = (await res.json()) as { access_token: string; expires_in: number };
  cache = { token: dati.access_token, scadenza: Date.now() + (dati.expires_in - 60) * 1000 };
  return dati.access_token;
}

export async function tokenGoogle(env: Ambiente): Promise<string> {
  if (cache && cache.scadenza > Date.now()) return cache.token;
  return nuovoToken(env);
}

export function ambienteIncompleto(env: Partial<Ambiente>, chiavi: readonly string[]): string[] {
  return chiavi.filter((c) => !(env as Record<string, string | undefined>)[c]);
}

export function risposta(dati: unknown, stato = 200): Response {
  return new Response(JSON.stringify(dati), {
    status: stato,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

/** Chi ha superato Access: l'header lo mette Cloudflare, non il browser. */
export function utenteDaAccess(request: Request): string {
  return request.headers.get("cf-access-authenticated-user-email") || "";
}
