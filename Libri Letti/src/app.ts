// Libri letti — legge una scheda di un foglio Google via gviz e la mostra.
// Il foglio e' riempito dal Form e arricchito dall'Apps Script: qui si legge e basta.

interface Config {
  /** ID del foglio, la parte tra /d/ e /edit. Vuoto = libri di esempio. */
  readonly spreadsheetId: string;
  /** Nome della scheda da leggere. */
  readonly sheet: string;
  /** Link al Google Form di inserimento. Vuoto = bottone nascosto. */
  readonly formUrl: string;
  /** sessionStorage non ha scadenza nativa: la simuliamo con savedAt + questo TTL. */
  readonly cacheTtlMs: number;
}

const CONFIG: Config = {
  spreadsheetId: "1y_3XOn0N7LnZ0r1bW-X74S71ngEUSQIH15gVKYkhNq0",
  sheet: "Letture",
  formUrl: "https://docs.google.com/forms/d/e/1FAIpQLScC3KU5ZA6DFfBbS1g6B9t2h1ZHBUonDm9_iGj0TCZqoTPVEA/viewform",
  cacheTtlMs: 60 * 60 * 1000,
};

interface Libro {
  readonly isbn: string;
  readonly titolo: string;
  readonly autore: string;
  readonly anno: number | null;
  readonly pagine: number | null;
  readonly copertina: string;
  readonly descrizione: string;
  readonly categoria: string;
  readonly note: string;
  /** Data di fine lettura, ISO yyyy-mm-dd. */
  readonly dataFine: string;
}

const MOCK_LIBRI: readonly Libro[] = [
  {
    isbn: "9788804668237",
    titolo: "1984",
    autore: "George Orwell",
    anno: 2016,
    pagine: 321,
    copertina: "https://covers.openlibrary.org/b/isbn/9788804668237-L.jpg",
    descrizione: "Winston Smith lavora al Ministero della Verita' e riscrive il passato.",
    categoria: "Fiction, Dystopian",
    note: "Riletto dopo vent'anni, fa un altro effetto.",
    dataFine: "2026-02-03",
  },
  {
    isbn: "9788806219581",
    titolo: "Educazione siberiana",
    autore: "Nicolai Lilin",
    anno: 2014,
    pagine: 343,
    copertina: "https://covers.openlibrary.org/b/isbn/9788806219581-L.jpg",
    descrizione: "La comunita' degli Urka in Transnistria raccontata da dentro.",
    categoria: "Biography & Autobiography",
    note: "",
    dataFine: "2026-01-18",
  },
  {
    isbn: "9788817158565",
    titolo: "Il nome della rosa",
    autore: "Umberto Eco",
    anno: 1980,
    pagine: 528,
    copertina: "",
    descrizione: "Un'abbazia benedettina, sette giorni di morti e una biblioteca proibita.",
    categoria: "Fiction, Historical",
    note: "",
    dataFine: "2025-11-22",
  },
  {
    isbn: "9788807880569",
    titolo: "Il barone rampante",
    autore: "Italo Calvino",
    anno: 1957,
    pagine: 272,
    copertina: "",
    descrizione: "Cosimo Piovasco di Rondo' sale su un albero a dodici anni e non scende piu'.",
    categoria: "Fiction",
    note: "",
    dataFine: "2025-08-09",
  },
  {
    isbn: "9788845920981",
    titolo: "Il deserto dei Tartari",
    autore: "Dino Buzzati",
    anno: 1940,
    pagine: 232,
    copertina: "",
    descrizione: "Giovanni Drogo aspetta alla Fortezza Bastiani un nemico che non arriva.",
    categoria: "Fiction",
    note: "",
    dataFine: "2024-04-14",
  },
];

interface State {
  libri: readonly Libro[];
  query: string;
  anno: string;
  /** ISBN del libro aperto in scheda, vuoto in elenco. */
  aperto: string;
}

const state: State = { libri: [], query: "", anno: "", aperto: "" };

/* ------------------------------------------------------------------ utility */

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function num(value: string): number | null {
  const n = Number(String(value).replace(",", ".").trim());
  return Number.isFinite(n) && n > 0 ? n : null;
}

function annoDi(dataFine: string): string {
  return /^\d{4}/.test(dataFine) ? dataFine.slice(0, 4) : "";
}

function dataItaliana(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  const mesi = [
    "gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno",
    "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre",
  ];
  const mese = mesi[Number(m[2]) - 1];
  return mese ? `${Number(m[3])} ${mese} ${m[1]}` : iso;
}

function setStatus(message: string, isError: boolean): void {
  const el = document.getElementById("status");
  if (!el) return;
  el.hidden = message === "";
  el.className = isError ? "status is-error" : "status";
  el.textContent = message;
}

/* --------------------------------------------------------------------- gviz */

interface GvizCell {
  readonly v?: unknown;
  readonly f?: string;
}
interface GvizRow {
  readonly c?: readonly (GvizCell | null)[];
}
interface GvizCol {
  readonly label?: string;
  readonly id?: string;
}
interface GvizError {
  readonly message?: string;
  readonly detailed_message?: string;
}
interface GvizResponse {
  readonly status?: string;
  readonly errors?: readonly GvizError[];
  readonly table?: { readonly cols?: readonly GvizCol[]; readonly rows?: readonly GvizRow[] };
}

type Row = Readonly<Record<string, string>>;

/** Le date arrivano come "Date(2026,0,18)": le normalizziamo in ISO. */
function parseGvizDate(value: unknown, formatted: string | undefined): string {
  if (typeof value === "string") {
    const m = /^Date\((\d+),(\d+),(\d+)/.exec(value);
    if (m) {
      const mese = String(Number(m[2]) + 1).padStart(2, "0");
      const giorno = String(Number(m[3])).padStart(2, "0");
      return `${m[1]}-${mese}-${giorno}`;
    }
    if (/^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 10);
  }
  if (typeof formatted === "string" && /^\d{4}-\d{2}-\d{2}/.test(formatted)) {
    return formatted.slice(0, 10);
  }
  return typeof value === "string" ? value : "";
}

function rowsFromGviz(json: GvizResponse): readonly Row[] {
  if (!json || json.status === "error") {
    const first = json && json.errors && json.errors[0];
    throw new Error((first && (first.detailed_message || first.message)) || "Errore foglio");
  }
  const table = json.table || {};
  const cols = (table.cols || []).map((c) => (c.label || c.id || "").trim().toLowerCase());
  return (table.rows || []).map((row) => {
    const obj: Record<string, string> = {};
    cols.forEach((col, i) => {
      const cell = (row.c && row.c[i]) || null;
      const raw = cell && cell.v != null ? cell.v : "";
      obj[col] = col === "data_fine"
        ? parseGvizDate(raw, cell ? cell.f : undefined)
        : String(raw);
    });
    return obj;
  });
}

function gvizUrl(handler: string): string {
  const sheet = encodeURIComponent(CONFIG.sheet);
  const tqx = handler ? `out:json;responseHandler:${handler}` : "out:json";
  return `https://docs.google.com/spreadsheets/d/${CONFIG.spreadsheetId}/gviz/tq?tqx=${encodeURIComponent(tqx)}&sheet=${sheet}`;
}

let gvizSeq = 0;

/** Fallback per quando il fetch CORS non passa (es. pagina aperta da file://). */
function fetchSheetJsonp(): Promise<readonly Row[]> {
  return new Promise((resolve, reject) => {
    const cb = `gvizCb${++gvizSeq}`;
    const script = document.createElement("script");
    const globals = window as unknown as Record<string, unknown>;
    let done = false;

    const timer = window.setTimeout(() => finish(new Error("Timeout sul foglio")), 15000);

    function finish(err: Error | null, data?: readonly Row[]): void {
      if (done) return;
      done = true;
      window.clearTimeout(timer);
      delete globals[cb];
      if (script.parentNode) script.parentNode.removeChild(script);
      if (err) reject(err);
      else resolve(data || []);
    }

    globals[cb] = (json: GvizResponse): void => {
      try {
        finish(null, rowsFromGviz(json));
      } catch (err) {
        finish(err instanceof Error ? err : new Error(String(err)));
      }
    };
    script.onerror = (): void => finish(new Error("Impossibile caricare il foglio"));
    script.src = gvizUrl(cb);
    document.head.appendChild(script);
  });
}

async function fetchSheet(): Promise<readonly Row[]> {
  try {
    const res = await fetch(gvizUrl(""), { credentials: "omit", mode: "cors" });
    if (!res.ok) throw new Error(`HTTP ${res.status} sul foglio`);
    const text = await res.text();
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start < 0 || end < 0) throw new Error("Risposta foglio non valida");
    return rowsFromGviz(JSON.parse(text.slice(start, end + 1)) as GvizResponse);
  } catch {
    return fetchSheetJsonp();
  }
}

/* -------------------------------------------------------------------- cache */

interface CacheEntry {
  readonly savedAt: number;
  readonly libri: readonly Libro[];
}

function cacheKey(): string {
  return `libri-letti:${CONFIG.spreadsheetId}:${CONFIG.sheet}`;
}

function readCache(): CacheEntry | null {
  try {
    const raw = sessionStorage.getItem(cacheKey());
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CacheEntry>;
    if (!parsed || !Array.isArray(parsed.libri) || typeof parsed.savedAt !== "number") return null;
    return { savedAt: parsed.savedAt, libri: parsed.libri };
  } catch {
    return null;
  }
}

function writeCache(libri: readonly Libro[]): void {
  try {
    sessionStorage.setItem(cacheKey(), JSON.stringify({ savedAt: Date.now(), libri }));
  } catch {
    // quota piena o storage negato: si ricarica dal foglio, pazienza.
  }
}

/* ------------------------------------------------------------- normalizzazione */

function normalizzaLibro(row: Row): Libro | null {
  const isbn = (row["isbn"] || "").replace(/[^0-9Xx]/g, "").toUpperCase();
  if (!isbn) return null;
  const titolo = (row["titolo"] || "").trim();
  return {
    isbn,
    titolo: titolo || `ISBN ${isbn}`,
    autore: (row["autore"] || "").trim(),
    anno: num(row["anno"] || ""),
    pagine: num(row["pagine"] || ""),
    copertina: (row["copertina"] || "").trim(),
    descrizione: (row["descrizione"] || "").trim(),
    categoria: (row["categoria"] || "").trim(),
    note: (row["note"] || "").trim(),
    dataFine: (row["data_fine"] || "").trim(),
  };
}

/** Piu' recenti in cima; i libri senza data in fondo. */
function ordina(libri: readonly Libro[]): readonly Libro[] {
  return [...libri].sort((a, b) => {
    if (!a.dataFine) return b.dataFine ? 1 : 0;
    if (!b.dataFine) return -1;
    return b.dataFine.localeCompare(a.dataFine);
  });
}

/* ------------------------------------------------------------------- filtri */

function filtra(libri: readonly Libro[]): readonly Libro[] {
  const q = state.query.trim().toLowerCase();
  return libri.filter((libro) => {
    if (state.anno && annoDi(libro.dataFine) !== state.anno) return false;
    if (!q) return true;
    return `${libro.titolo} ${libro.autore}`.toLowerCase().includes(q);
  });
}

function anniDisponibili(libri: readonly Libro[]): readonly string[] {
  const anni = new Set<string>();
  for (const libro of libri) {
    const anno = annoDi(libro.dataFine);
    if (anno) anni.add(anno);
  }
  return [...anni].sort((a, b) => b.localeCompare(a));
}

/* -------------------------------------------------------------------- render */

function placeholderCopertina(titolo: string, grande: boolean): string {
  const classe = grande ? "cover cover-big" : "cover";
  return `<div class="${classe} cover-empty" aria-hidden="true"><span>${esc(titolo)}</span></div>`;
}

function renderCopertina(libro: Libro, grande: boolean): string {
  if (!libro.copertina) return placeholderCopertina(libro.titolo, grande);
  const classe = grande ? "cover cover-big" : "cover";
  // referrerpolicy: la pagina e' pubblica e le immagini stanno su Google, non
  // gli mandiamo anche l'indirizzo della pagina di chi guarda.
  return `<img class="${classe}" src="${esc(libro.copertina)}" alt="Copertina di ${esc(libro.titolo)}"
    data-titolo="${esc(libro.titolo)}" loading="lazy" decoding="async" referrerpolicy="no-referrer">`;
}

/** Se un URL muore, al suo posto torna il riquadro con il titolo. */
function agganciaCopertine(root: HTMLElement): void {
  const immagini = root.querySelectorAll<HTMLImageElement>("img.cover");
  immagini.forEach((img) => {
    img.addEventListener("error", () => {
      const titolo = img.dataset["titolo"] || "";
      const grande = img.classList.contains("cover-big");
      const sostituto = document.createElement("div");
      sostituto.innerHTML = placeholderCopertina(titolo, grande);
      const nuovo = sostituto.firstElementChild;
      if (nuovo && img.parentNode) img.parentNode.replaceChild(nuovo, img);
    }, { once: true });
  });
}

function renderElenco(libri: readonly Libro[]): string {
  if (libri.length === 0) {
    return state.libri.length === 0
      ? `<p class="empty">Il foglio non contiene ancora nessun libro.</p>`
      : `<p class="empty">Nessun libro corrisponde alla ricerca.</p>`;
  }
  const card = libri.map((libro) => `
    <li class="card">
      <a href="#/libro/${encodeURIComponent(libro.isbn)}">
        ${renderCopertina(libro, false)}
        <span class="card-titolo">${esc(libro.titolo)}</span>
        <span class="card-autore">${esc(libro.autore)}</span>
        <span class="card-data">${esc(annoDi(libro.dataFine))}</span>
      </a>
    </li>`).join("");
  return `<ul class="griglia">${card}</ul>`;
}

function renderScheda(libro: Libro): string {
  const meta: string[] = [];
  if (libro.anno !== null) meta.push(`${libro.anno}`);
  if (libro.pagine !== null) meta.push(`${libro.pagine} pagine`);
  const letto = libro.dataFine ? `Finito il ${dataItaliana(libro.dataFine)}` : "Data di lettura non indicata";
  return `
    <article class="scheda">
      <a class="indietro" href="#/">&larr; Tutti i libri</a>
      <div class="scheda-corpo">
        ${renderCopertina(libro, true)}
        <div class="scheda-testo">
          <h2>${esc(libro.titolo)}</h2>
          ${libro.autore ? `<p class="scheda-autore">${esc(libro.autore)}</p>` : ""}
          ${meta.length ? `<p class="scheda-meta">${esc(meta.join(" \u00b7 "))}</p>` : ""}
          <p class="scheda-letto">${esc(letto)}</p>
          ${libro.categoria ? `<p class="scheda-categoria">${esc(libro.categoria)}</p>` : ""}
          ${libro.note ? `<p class="scheda-note">${esc(libro.note)}</p>` : ""}
          ${libro.descrizione ? `<p class="scheda-descrizione">${esc(libro.descrizione)}</p>` : ""}
          <p class="scheda-isbn">ISBN ${esc(libro.isbn)}</p>
        </div>
      </div>
    </article>`;
}

function renderBarra(libri: readonly Libro[]): void {
  const barra = document.getElementById("barra");
  const ricerca = document.getElementById("ricerca") as HTMLInputElement | null;
  const select = document.getElementById("anno") as HTMLSelectElement | null;
  if (!barra || !ricerca || !select) return;

  barra.hidden = state.aperto !== "";
  if (select.dataset["popolato"] !== "si") {
    const opzioni = anniDisponibili(libri)
      .map((anno) => `<option value="${esc(anno)}">${esc(anno)}</option>`)
      .join("");
    select.innerHTML = `<option value="">Tutti gli anni</option>${opzioni}`;
    select.dataset["popolato"] = "si";
  }
  if (ricerca.value !== state.query) ricerca.value = state.query;
  if (select.value !== state.anno) select.value = state.anno;
}

function render(): void {
  const app = document.getElementById("app");
  if (!app) return;

  renderBarra(state.libri);

  if (state.aperto) {
    const libro = state.libri.find((l) => l.isbn === state.aperto);
    app.innerHTML = libro
      ? renderScheda(libro)
      : `<p class="empty">Libro non trovato. <a href="#/">Torna all'elenco</a></p>`;
    agganciaCopertine(app);
    document.title = libro ? `${libro.titolo} — Libri letti` : "Libri letti";
    window.scrollTo(0, 0);
    return;
  }

  const visibili = filtra(state.libri);
  const conteggio = document.getElementById("conteggio");
  if (conteggio) {
    const totale = state.libri.length;
    conteggio.textContent = visibili.length === totale
      ? `${totale} libri`
      : `${visibili.length} di ${totale} libri`;
  }
  app.innerHTML = renderElenco(visibili);
  agganciaCopertine(app);
  document.title = "Libri letti";
}

/* ------------------------------------------------------------------ routing */

function leggiHash(): void {
  const m = /^#\/libro\/(.+)$/.exec(window.location.hash);
  state.aperto = m && m[1] ? decodeURIComponent(m[1]) : "";
}

/* ---------------------------------------------------------------- caricamento */

async function caricaDalFoglio(): Promise<readonly Libro[]> {
  const rows = await fetchSheet();
  const libri: Libro[] = [];
  for (const row of rows) {
    const libro = normalizzaLibro(row);
    if (libro) libri.push(libro);
  }
  return ordina(libri);
}

async function carica(): Promise<void> {
  if (!CONFIG.spreadsheetId) {
    state.libri = ordina(MOCK_LIBRI);
    setStatus("Foglio non configurato: stai vedendo dei libri di esempio.", false);
    render();
    return;
  }

  const cache = readCache();
  if (cache) {
    state.libri = cache.libri;
    render();
    if (Date.now() - cache.savedAt < CONFIG.cacheTtlMs) return;
  } else {
    setStatus("Carico i libri…", false);
  }

  try {
    const libri = await caricaDalFoglio();
    state.libri = libri;
    writeCache(libri);
    setStatus("", false);
    const select = document.getElementById("anno");
    if (select) delete (select as HTMLSelectElement).dataset["popolato"];
    render();
  } catch (err) {
    const messaggio = err instanceof Error ? err.message : String(err);
    if (state.libri.length === 0) {
      state.libri = ordina(MOCK_LIBRI);
      setStatus(`${messaggio} — mostro dei libri di esempio.`, true);
      render();
    } else {
      setStatus(`${messaggio} — i dati potrebbero non essere aggiornati.`, true);
    }
  }
}

function init(): void {
  const ricerca = document.getElementById("ricerca") as HTMLInputElement | null;
  const select = document.getElementById("anno") as HTMLSelectElement | null;
  const aggiungi = document.getElementById("aggiungi") as HTMLAnchorElement | null;

  if (ricerca) {
    ricerca.addEventListener("input", () => {
      state.query = ricerca.value;
      render();
    });
  }
  if (select) {
    select.addEventListener("change", () => {
      state.anno = select.value;
      render();
    });
  }
  if (aggiungi) {
    if (CONFIG.formUrl) aggiungi.href = CONFIG.formUrl;
    else aggiungi.hidden = true;
  }

  window.addEventListener("hashchange", () => {
    leggiHash();
    render();
  });

  leggiHash();
  void carica();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
