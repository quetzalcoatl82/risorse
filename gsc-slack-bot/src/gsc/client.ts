import { GSC_API_BASE, GSC_SCOPE } from "../config";

interface ServiceAccountKey {
  client_email: string;
  private_key: string;
}

interface TokenCache {
  token: string;
  expiresAt: number;
}

let tokenCache: TokenCache | null = null;

function base64UrlEncode(data: ArrayBuffer | Uint8Array | string): string {
  let bytes: Uint8Array;
  if (typeof data === "string") {
    bytes = new TextEncoder().encode(data);
  } else if (data instanceof ArrayBuffer) {
    bytes = new Uint8Array(data);
  } else {
    bytes = data;
  }
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function pemToArrayBuffer(pem: string): ArrayBuffer {
  const base64 = pem
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s/g, "");
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

async function signJwt(
  header: Record<string, string>,
  payload: Record<string, unknown>,
  privateKeyPem: string
): Promise<string> {
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signingInput = `${encodedHeader}.${encodedPayload}`;

  const key = await crypto.subtle.importKey(
    "pkcs8",
    pemToArrayBuffer(privateKeyPem),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(signingInput)
  );

  return `${signingInput}.${base64UrlEncode(signature)}`;
}

export async function getAccessToken(env: Env): Promise<string> {
  if (tokenCache && tokenCache.expiresAt > Date.now() + 60_000) {
    return tokenCache.token;
  }

  const sa: ServiceAccountKey = JSON.parse(env.GOOGLE_SERVICE_ACCOUNT_JSON);
  const now = Math.floor(Date.now() / 1000);

  const jwt = await signJwt(
    { alg: "RS256", typ: "JWT" },
    {
      iss: sa.client_email,
      scope: GSC_SCOPE,
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    },
    sa.private_key
  );

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Token Google fallito (${response.status}): ${body}`);
  }

  const data = (await response.json()) as { access_token: string; expires_in: number };
  tokenCache = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
  return data.access_token;
}

export async function gscFetch<T>(
  env: Env,
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await getAccessToken(env);
  const siteUrl = encodeURIComponent(env.GSC_SITE_URL);
  const url = `${GSC_API_BASE}/sites/${siteUrl}${path}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    if (response.status === 403) {
      throw new Error(
        "Accesso GSC negato: verifica che il Service Account sia aggiunto come utente nella proprietà Search Console."
      );
    }
    if (response.status === 429) {
      throw new Error("Quota API Google Search Console superata. Riprova tra qualche minuto.");
    }
    throw new Error(`API GSC errore (${response.status}): ${body}`);
  }

  return response.json() as Promise<T>;
}

export async function withCache<T>(
  env: Env,
  cacheKey: string,
  fetcher: () => Promise<T>
): Promise<T> {
  const cached = await env.GSC_CACHE.get(cacheKey);
  if (cached) {
    return JSON.parse(cached) as T;
  }

  const result = await fetcher();
  await env.GSC_CACHE.put(cacheKey, JSON.stringify(result), {
    expirationTtl: 6 * 60 * 60,
  });
  return result;
}
