# Bot Slack + Google Search Console

Worker Cloudflare che espone slash command Slack e un digest settimanale automatico, collegato a Google Search Console via Service Account.

## Funzionalità

### Comandi slash (`/gsc`)

| Comando | Descrizione |
|---------|-------------|
| `/gsc help` | Guida comandi |
| `/gsc top [search\|discover] [7\|28]` | Top 10 articoli per click |
| `/gsc pagina <url>` | Statistiche articolo (7 gg) |
| `/gsc query <parola>` | Performance keyword + top pagine |
| `/gsc keyword` | Top 15 keyword |
| `/gsc trend [su\|giù]` | Query in crescita o calo |
| `/gsc discover` | Top 10 articoli Discover |
| `/gsc confronto <url>` | Confronto settimanale articolo |

### Digest settimanale

Ogni **lunedì alle 09:00** (ora italiana, ~08:00 UTC) il bot pubblica nel canale configurato:

- Top 5 articoli Discover
- Top 5 articoli Search (web)
- Top 10 keyword
- Keyword in crescita, articolo sorpresa, alert su cali >30%

## Prerequisiti

- Account Cloudflare con Workers attivo
- Workspace Slack con permessi per creare app
- Proprietà Google Search Console con accesso admin

## 1. Google Cloud + Search Console

1. Vai su [Google Cloud Console](https://console.cloud.google.com/) e crea un progetto (o usane uno esistente).
2. Abilita **Google Search Console API** (API & Services → Library).
3. Crea un **Service Account** (IAM → Service Accounts → Create).
4. Genera una chiave JSON e conservala in modo sicuro.
5. In [Search Console](https://search.google.com/search-console), apri la proprietà del sito → **Impostazioni** → **Utenti e autorizzazioni** → aggiungi l'email del Service Account con permesso **Limitato** (o Completo).

Annota il formato URL della proprietà:
- Dominio: `sc-domain:esempio.com`
- Prefisso URL: `https://www.esempio.com/`

## 2. Slack App

1. Crea un'app su [api.slack.com/apps](https://api.slack.com/apps) → **From scratch**.
2. In **OAuth & Permissions**, aggiungi scope bot: `chat:write`, `commands`.
3. Installa l'app nel workspace e copia il **Bot User OAuth Token** (`xoxb-...`).
4. In **Basic Information**, copia il **Signing Secret**.
5. In **Slash Commands**, crea `/gsc`:
   - Request URL: `https://gsc-slack-bot.<tuo-subdomain>.workers.dev/slack/commands`
   - Short description: `Dati Search Console per la redazione`
6. Invita il bot nel canale dedicato (es. `#seo-editoriale`).
7. Ottieni l'ID del canale: clic destro sul canale → **View channel details** → in fondo c'è l'ID (`C...`).

## 3. Deploy su Cloudflare

```bash
cd gsc-slack-bot
npm install
npm run login    # una tantum, se non autenticato
npm run whoami   # verifica account
npm run types    # rigenera worker-configuration.d.ts dopo modifiche a wrangler.toml
```

KV namespace (già configurato in `wrangler.toml`; per ricrearli):

```bash
npm run kv:create
```

Configura i secrets (uno alla volta, Wrangler chiede il valore):

```bash
npx wrangler secret put SLACK_BOT_TOKEN
npx wrangler secret put SLACK_SIGNING_SECRET
npx wrangler secret put GOOGLE_SERVICE_ACCOUNT_JSON
npx wrangler secret put GSC_SITE_URL
npx wrangler secret put SLACK_CHANNEL_ID
```

Per `GOOGLE_SERVICE_ACCOUNT_JSON`, incolla l'intero contenuto del file JSON della chiave Service Account.

Deploy:

```bash
npm run deploy
```

Verifica: `GET https://gsc-slack-bot.console-tribe.workers.dev/` deve rispondere `{"status":"ok"}`.

## Sviluppo locale

Crea `.dev.vars` partendo da `.dev.vars.example` (non committare):

```
SLACK_BOT_TOKEN=xoxb-...
SLACK_SIGNING_SECRET=...
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account",...}
GSC_SITE_URL=sc-domain:esempio.com
SLACK_CHANNEL_ID=C...
```

```bash
npm run dev
```

Per testare gli slash command da Slack in locale, usa un tunnel (es. `cloudflared tunnel` o ngrok) verso la porta di `wrangler dev`.

## Test digest manuale

Dalla dashboard Cloudflare → Workers → `gsc-slack-bot` → **Triggers** → esegui il Cron Trigger manualmente, oppure:

```bash
npx wrangler dev --test-scheduled
```

## Note

- I dati GSC hanno un ritardo di **2–3 giorni**; il bot lo segnala in ogni risposta.
- La cache KV dura **6 ore** per ridurre le chiamate API.
- Il cron `0 8 * * mon` corrisponde alle 09:00 in Italia (ora solare); con ora legale sarà alle 10:00.
- Su Cloudflare i giorni della settimana vanno da **1 = domenica** a **7 = sabato** (non come cron Unix). Usa `mon` o `2` per il lunedì.
