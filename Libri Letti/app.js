"use strict";
// Rotta #/aggiungi: inquadri il codice a barre, controlli l'anteprima, salvi.
// La scrittura passa da /api/libri, protetta da Cloudflare Access: qui dentro
// non c'e' nessun segreto, e una pagina senza sessione valida non salva niente.
const statoAggiungi = {
    autenticato: null,
    isbn: "",
    anteprima: null,
    messaggio: "",
    errore: false,
    inCorso: false,
    scansione: false,
    salvato: "",
};
let flusso = null;
let fermaScansione = null;
function oggi() {
    const adesso = new Date();
    const mese = String(adesso.getMonth() + 1).padStart(2, "0");
    const giorno = String(adesso.getDate()).padStart(2, "0");
    return `${adesso.getFullYear()}-${mese}-${giorno}`;
}
function scannerDisponibile() {
    return "BarcodeDetector" in window && typeof navigator.mediaDevices?.getUserMedia === "function";
}
/* ------------------------------------------------------------------ rete */
async function chiediAnteprima(isbn) {
    statoAggiungi.inCorso = true;
    statoAggiungi.messaggio = "Cerco il libro…";
    statoAggiungi.errore = false;
    renderAggiungi();
    try {
        const res = await fetch(`/api/libro?isbn=${encodeURIComponent(isbn)}`);
        if (res.status === 404) {
            statoAggiungi.anteprima = null;
            statoAggiungi.messaggio = "Nessun libro con questo ISBN. Puoi salvarlo lo stesso: lo completa la passata notturna.";
            statoAggiungi.errore = false;
        }
        else if (!res.ok) {
            const dettaglio = (await res.json().catch(() => ({})));
            throw new Error(dettaglio.errore || `Errore ${res.status}`);
        }
        else {
            statoAggiungi.anteprima = (await res.json());
            statoAggiungi.messaggio = "";
        }
    }
    catch (err) {
        statoAggiungi.anteprima = null;
        statoAggiungi.messaggio = err instanceof Error ? err.message : String(err);
        statoAggiungi.errore = true;
    }
    finally {
        statoAggiungi.inCorso = false;
        renderAggiungi();
    }
}
async function salva() {
    const dataEl = document.getElementById("data-fine");
    const noteEl = document.getElementById("note");
    const a = statoAggiungi.anteprima;
    statoAggiungi.inCorso = true;
    statoAggiungi.messaggio = "Salvo…";
    statoAggiungi.errore = false;
    renderAggiungi();
    try {
        const res = await fetch("/api/libri", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                isbn: statoAggiungi.isbn,
                data_fine: dataEl?.value || oggi(),
                note: noteEl?.value || "",
                titolo: a?.titolo || "",
                autore: a?.autore || "",
                anno: a?.anno ?? null,
                pagine: a?.pagine ?? null,
                copertina: a?.copertina || "",
                descrizione: a?.descrizione || "",
                categoria: (a?.categorie || []).slice(0, 2).join(", "),
            }),
        });
        if (res.status === 401)
            throw new Error("Sessione scaduta: ricarica la pagina per rientrare.");
        if (!res.ok) {
            const dettaglio = (await res.json().catch(() => ({})));
            throw new Error(dettaglio.errore || `Errore ${res.status}`);
        }
        statoAggiungi.salvato = a?.titolo || statoAggiungi.isbn;
        statoAggiungi.anteprima = null;
        statoAggiungi.isbn = "";
        statoAggiungi.messaggio = "";
        sessionStorage.clear(); // l'elenco deve rileggere il foglio
    }
    catch (err) {
        statoAggiungi.messaggio = err instanceof Error ? err.message : String(err);
        statoAggiungi.errore = true;
    }
    finally {
        statoAggiungi.inCorso = false;
        renderAggiungi();
    }
}
async function controllaAccesso() {
    try {
        const res = await fetch("/api/me");
        const dati = (await res.json());
        statoAggiungi.autenticato = dati.autenticato === true;
    }
    catch {
        statoAggiungi.autenticato = false;
    }
    renderAggiungi();
}
async function avviaScansione() {
    const video = document.getElementById("video");
    if (!video)
        return;
    try {
        flusso = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" },
            audio: false,
        });
    }
    catch {
        statoAggiungi.scansione = false;
        statoAggiungi.messaggio = "Fotocamera non disponibile: scrivi l'ISBN a mano.";
        statoAggiungi.errore = true;
        renderAggiungi();
        return;
    }
    video.srcObject = flusso;
    await video.play().catch(() => undefined);
    const globali = window;
    // EAN-13 e' il codice a barre dei libri: l'ISBN-13 e' quel numero.
    const rilevatore = new globali.BarcodeDetector({ formats: ["ean_13", "ean_8", "isbn"] });
    let attivo = true;
    fermaScansione = () => {
        attivo = false;
        if (flusso)
            flusso.getTracks().forEach((t) => t.stop());
        flusso = null;
    };
    const cerca = async () => {
        if (!attivo)
            return;
        try {
            const codici = await rilevatore.detect(video);
            const primo = codici[0];
            if (primo && /^\d{10,13}$/.test(primo.rawValue)) {
                if (navigator.vibrate)
                    navigator.vibrate(60);
                fermaScansione?.();
                statoAggiungi.scansione = false;
                statoAggiungi.isbn = primo.rawValue;
                renderAggiungi();
                void chiediAnteprima(primo.rawValue);
                return;
            }
        }
        catch {
            // un fotogramma illeggibile non e' un errore: si riprova col prossimo
        }
        requestAnimationFrame(() => void cerca());
    };
    void cerca();
}
/* --------------------------------------------------------------- render */
function renderAnteprima(a) {
    const meta = [];
    if (a.anno !== null)
        meta.push(String(a.anno));
    if (a.pagine !== null)
        meta.push(`${a.pagine} pagine`);
    const copertina = a.copertina
        ? `<img class="cover" src="${esc(a.copertina)}" alt="" referrerpolicy="no-referrer">`
        : `<div class="cover cover-empty"><span>${esc(a.titolo)}</span></div>`;
    return `
    <div class="anteprima">
      ${copertina}
      <div>
        <h3>${esc(a.titolo)}</h3>
        ${a.autore ? `<p class="scheda-autore">${esc(a.autore)}</p>` : ""}
        ${meta.length ? `<p class="scheda-meta">${esc(meta.join(" · "))}</p>` : ""}
        ${a.categorie.length ? `<p class="scheda-categoria">${esc(a.categorie.slice(0, 2).join(", "))}</p>` : ""}
      </div>
    </div>`;
}
function renderAggiungi() {
    const app = document.getElementById("app");
    if (!app)
        return;
    if (statoAggiungi.autenticato === null) {
        app.innerHTML = `<p class="empty">Controllo l'accesso…</p>`;
        return;
    }
    if (!statoAggiungi.autenticato) {
        app.innerHTML = `
      <article class="scheda">
        <a class="indietro" href="#/">&larr; Tutti i libri</a>
        <p class="empty">Da qui aggiungo i libri solo io.
        ${CONFIG.formUrl ? `<br><a href="${esc(CONFIG.formUrl)}" target="_blank" rel="noopener">C'è il modulo, se serve.</a>` : ""}</p>
      </article>`;
        return;
    }
    const a = statoAggiungi.anteprima;
    app.innerHTML = `
    <article class="scheda inserimento">
      <a class="indietro" href="#/">&larr; Tutti i libri</a>
      <h2>Aggiungi un libro</h2>

      ${statoAggiungi.salvato
        ? `<p class="esito">Salvato: ${esc(statoAggiungi.salvato)}.</p>`
        : ""}

      ${statoAggiungi.scansione
        ? `<div class="scanner"><video id="video" playsinline muted></video>
             <button class="bottone" id="stop">Annulla</button></div>`
        : `<div class="riga-isbn">
             <input class="ricerca" id="isbn" type="text" inputmode="numeric" placeholder="ISBN"
               value="${esc(statoAggiungi.isbn)}" autocomplete="off">
             <button class="bottone" id="cerca">Cerca</button>
             ${scannerDisponibile() ? `<button class="bottone bottone-primario" id="scansiona">Inquadra</button>` : ""}
           </div>`}

      ${statoAggiungi.messaggio
        ? `<p class="${statoAggiungi.errore ? "avviso is-error" : "avviso"}">${esc(statoAggiungi.messaggio)}</p>`
        : ""}

      ${a ? renderAnteprima(a) : ""}

      ${statoAggiungi.isbn && !statoAggiungi.scansione ? `
        <div class="campi">
          <label>Finito il
            <input class="ricerca" id="data-fine" type="date" value="${oggi()}">
          </label>
          <label>Note
            <textarea class="ricerca" id="note" rows="3" placeholder="Facoltative"></textarea>
          </label>
          <button class="bottone bottone-primario" id="salva" ${statoAggiungi.inCorso ? "disabled" : ""}>
            Salva nel foglio
          </button>
        </div>` : ""}
    </article>`;
    agganciaAggiungi();
}
function agganciaAggiungi() {
    const isbnEl = document.getElementById("isbn");
    isbnEl?.addEventListener("input", () => {
        statoAggiungi.isbn = isbnEl.value.replace(/[^0-9Xx]/g, "").toUpperCase();
    });
    document.getElementById("cerca")?.addEventListener("click", () => {
        if (statoAggiungi.isbn)
            void chiediAnteprima(statoAggiungi.isbn);
    });
    document.getElementById("scansiona")?.addEventListener("click", () => {
        statoAggiungi.scansione = true;
        statoAggiungi.messaggio = "";
        statoAggiungi.salvato = "";
        renderAggiungi();
        void avviaScansione();
    });
    document.getElementById("stop")?.addEventListener("click", () => {
        fermaScansione?.();
        statoAggiungi.scansione = false;
        renderAggiungi();
    });
    document.getElementById("salva")?.addEventListener("click", () => void salva());
}
function apriAggiungi() {
    statoAggiungi.salvato = "";
    renderAggiungi();
    if (statoAggiungi.autenticato === null)
        void controllaAccesso();
}
function chiudiAggiungi() {
    fermaScansione?.();
    statoAggiungi.scansione = false;
}
// Libri letti — legge una scheda di un foglio Google via gviz e la mostra.
// Il foglio e' riempito dal Form e arricchito dall'Apps Script: qui si legge e basta.
const CONFIG = {
    spreadsheetId: "1y_3XOn0N7LnZ0r1bW-X74S71ngEUSQIH15gVKYkhNq0",
    sheet: "Letture",
    formUrl: "https://docs.google.com/forms/d/e/1FAIpQLScC3KU5ZA6DFfBbS1g6B9t2h1ZHBUonDm9_iGj0TCZqoTPVEA/viewform",
    cacheTtlMs: 60 * 60 * 1000,
};
const MOCK_LIBRI = [
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
const state = { libri: [], query: "", anno: "", aperto: "", inserimento: false };
/* ------------------------------------------------------------------ utility */
function esc(value) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}
function num(value) {
    const n = Number(String(value).replace(",", ".").trim());
    return Number.isFinite(n) && n > 0 ? n : null;
}
function annoDi(dataFine) {
    return /^\d{4}/.test(dataFine) ? dataFine.slice(0, 4) : "";
}
function dataItaliana(iso) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
    if (!m)
        return iso;
    const mesi = [
        "gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno",
        "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre",
    ];
    const mese = mesi[Number(m[2]) - 1];
    return mese ? `${Number(m[3])} ${mese} ${m[1]}` : iso;
}
function setStatus(message, isError) {
    const el = document.getElementById("status");
    if (!el)
        return;
    el.hidden = message === "";
    el.className = isError ? "status is-error" : "status";
    el.textContent = message;
}
/** Le date arrivano come "Date(2026,0,18)": le normalizziamo in ISO. */
function parseGvizDate(value, formatted) {
    if (typeof value === "string") {
        const m = /^Date\((\d+),(\d+),(\d+)/.exec(value);
        if (m) {
            const mese = String(Number(m[2]) + 1).padStart(2, "0");
            const giorno = String(Number(m[3])).padStart(2, "0");
            return `${m[1]}-${mese}-${giorno}`;
        }
        if (/^\d{4}-\d{2}-\d{2}/.test(value))
            return value.slice(0, 10);
    }
    if (typeof formatted === "string" && /^\d{4}-\d{2}-\d{2}/.test(formatted)) {
        return formatted.slice(0, 10);
    }
    return typeof value === "string" ? value : "";
}
function rowsFromGviz(json) {
    if (!json || json.status === "error") {
        const first = json && json.errors && json.errors[0];
        throw new Error((first && (first.detailed_message || first.message)) || "Errore foglio");
    }
    const table = json.table || {};
    const cols = (table.cols || []).map((c) => (c.label || c.id || "").trim().toLowerCase());
    return (table.rows || []).map((row) => {
        const obj = {};
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
function gvizUrl(handler) {
    const sheet = encodeURIComponent(CONFIG.sheet);
    const tqx = handler ? `out:json;responseHandler:${handler}` : "out:json";
    return `https://docs.google.com/spreadsheets/d/${CONFIG.spreadsheetId}/gviz/tq?tqx=${encodeURIComponent(tqx)}&sheet=${sheet}`;
}
let gvizSeq = 0;
/** Fallback per quando il fetch CORS non passa (es. pagina aperta da file://). */
function fetchSheetJsonp() {
    return new Promise((resolve, reject) => {
        const cb = `gvizCb${++gvizSeq}`;
        const script = document.createElement("script");
        const globals = window;
        let done = false;
        const timer = window.setTimeout(() => finish(new Error("Timeout sul foglio")), 15000);
        function finish(err, data) {
            if (done)
                return;
            done = true;
            window.clearTimeout(timer);
            delete globals[cb];
            if (script.parentNode)
                script.parentNode.removeChild(script);
            if (err)
                reject(err);
            else
                resolve(data || []);
        }
        globals[cb] = (json) => {
            try {
                finish(null, rowsFromGviz(json));
            }
            catch (err) {
                finish(err instanceof Error ? err : new Error(String(err)));
            }
        };
        script.onerror = () => finish(new Error("Impossibile caricare il foglio"));
        script.src = gvizUrl(cb);
        document.head.appendChild(script);
    });
}
async function fetchSheet() {
    try {
        const res = await fetch(gvizUrl(""), { credentials: "omit", mode: "cors" });
        if (!res.ok)
            throw new Error(`HTTP ${res.status} sul foglio`);
        const text = await res.text();
        const start = text.indexOf("{");
        const end = text.lastIndexOf("}");
        if (start < 0 || end < 0)
            throw new Error("Risposta foglio non valida");
        return rowsFromGviz(JSON.parse(text.slice(start, end + 1)));
    }
    catch {
        return fetchSheetJsonp();
    }
}
function cacheKey() {
    return `libri-letti:${CONFIG.spreadsheetId}:${CONFIG.sheet}`;
}
function readCache() {
    try {
        const raw = sessionStorage.getItem(cacheKey());
        if (!raw)
            return null;
        const parsed = JSON.parse(raw);
        if (!parsed || !Array.isArray(parsed.libri) || typeof parsed.savedAt !== "number")
            return null;
        return { savedAt: parsed.savedAt, libri: parsed.libri };
    }
    catch {
        return null;
    }
}
function writeCache(libri) {
    try {
        sessionStorage.setItem(cacheKey(), JSON.stringify({ savedAt: Date.now(), libri }));
    }
    catch {
        // quota piena o storage negato: si ricarica dal foglio, pazienza.
    }
}
/* ------------------------------------------------------------- normalizzazione */
function normalizzaLibro(row) {
    const isbn = (row["isbn"] || "").replace(/[^0-9Xx]/g, "").toUpperCase();
    if (!isbn)
        return null;
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
function ordina(libri) {
    return [...libri].sort((a, b) => {
        if (!a.dataFine)
            return b.dataFine ? 1 : 0;
        if (!b.dataFine)
            return -1;
        return b.dataFine.localeCompare(a.dataFine);
    });
}
/* ------------------------------------------------------------------- filtri */
function filtra(libri) {
    const q = state.query.trim().toLowerCase();
    return libri.filter((libro) => {
        if (state.anno && annoDi(libro.dataFine) !== state.anno)
            return false;
        if (!q)
            return true;
        return `${libro.titolo} ${libro.autore}`.toLowerCase().includes(q);
    });
}
function anniDisponibili(libri) {
    const anni = new Set();
    for (const libro of libri) {
        const anno = annoDi(libro.dataFine);
        if (anno)
            anni.add(anno);
    }
    return [...anni].sort((a, b) => b.localeCompare(a));
}
/* -------------------------------------------------------------------- render */
function placeholderCopertina(titolo, grande) {
    const classe = grande ? "cover cover-big" : "cover";
    return `<div class="${classe} cover-empty" aria-hidden="true"><span>${esc(titolo)}</span></div>`;
}
function renderCopertina(libro, grande) {
    if (!libro.copertina)
        return placeholderCopertina(libro.titolo, grande);
    const classe = grande ? "cover cover-big" : "cover";
    // referrerpolicy: la pagina e' pubblica e le immagini stanno su Google, non
    // gli mandiamo anche l'indirizzo della pagina di chi guarda.
    return `<img class="${classe}" src="${esc(libro.copertina)}" alt="Copertina di ${esc(libro.titolo)}"
    data-titolo="${esc(libro.titolo)}" loading="lazy" decoding="async" referrerpolicy="no-referrer">`;
}
/** Se un URL muore, al suo posto torna il riquadro con il titolo. */
function agganciaCopertine(root) {
    const immagini = root.querySelectorAll("img.cover");
    immagini.forEach((img) => {
        img.addEventListener("error", () => {
            const titolo = img.dataset["titolo"] || "";
            const grande = img.classList.contains("cover-big");
            const sostituto = document.createElement("div");
            sostituto.innerHTML = placeholderCopertina(titolo, grande);
            const nuovo = sostituto.firstElementChild;
            if (nuovo && img.parentNode)
                img.parentNode.replaceChild(nuovo, img);
        }, { once: true });
    });
}
function renderElenco(libri) {
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
function renderScheda(libro) {
    const meta = [];
    if (libro.anno !== null)
        meta.push(`${libro.anno}`);
    if (libro.pagine !== null)
        meta.push(`${libro.pagine} pagine`);
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
function renderBarra(libri) {
    const barra = document.getElementById("barra");
    const ricerca = document.getElementById("ricerca");
    const select = document.getElementById("anno");
    if (!barra || !ricerca || !select)
        return;
    barra.hidden = state.aperto !== "";
    if (select.dataset["popolato"] !== "si") {
        const opzioni = anniDisponibili(libri)
            .map((anno) => `<option value="${esc(anno)}">${esc(anno)}</option>`)
            .join("");
        select.innerHTML = `<option value="">Tutti gli anni</option>${opzioni}`;
        select.dataset["popolato"] = "si";
    }
    if (ricerca.value !== state.query)
        ricerca.value = state.query;
    if (select.value !== state.anno)
        select.value = state.anno;
}
function render() {
    const app = document.getElementById("app");
    if (!app)
        return;
    renderBarra(state.libri);
    if (state.inserimento) {
        const barra = document.getElementById("barra");
        if (barra)
            barra.hidden = true;
        document.title = "Aggiungi un libro — Libri letti";
        apriAggiungi();
        return;
    }
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
function leggiHash() {
    const hash = window.location.hash;
    const m = /^#\/libro\/(.+)$/.exec(hash);
    state.aperto = m && m[1] ? decodeURIComponent(m[1]) : "";
    state.inserimento = hash === "#/aggiungi";
}
/* ---------------------------------------------------------------- caricamento */
async function caricaDalFoglio() {
    const rows = await fetchSheet();
    const libri = [];
    for (const row of rows) {
        const libro = normalizzaLibro(row);
        if (libro)
            libri.push(libro);
    }
    return ordina(libri);
}
async function carica() {
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
        if (Date.now() - cache.savedAt < CONFIG.cacheTtlMs)
            return;
    }
    else {
        setStatus("Carico i libri…", false);
    }
    try {
        const libri = await caricaDalFoglio();
        state.libri = libri;
        writeCache(libri);
        setStatus("", false);
        const select = document.getElementById("anno");
        if (select)
            delete select.dataset["popolato"];
        render();
    }
    catch (err) {
        const messaggio = err instanceof Error ? err.message : String(err);
        if (state.libri.length === 0) {
            state.libri = ordina(MOCK_LIBRI);
            setStatus(`${messaggio} — mostro dei libri di esempio.`, true);
            render();
        }
        else {
            setStatus(`${messaggio} — i dati potrebbero non essere aggiornati.`, true);
        }
    }
}
function init() {
    const ricerca = document.getElementById("ricerca");
    const select = document.getElementById("anno");
    const aggiungi = document.getElementById("aggiungi");
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
        // in locale (file://) non c'e' nessuna API: si ripiega sul modulo
        const conApi = window.location.protocol.startsWith("http");
        if (conApi) {
            aggiungi.href = "#/aggiungi";
            aggiungi.removeAttribute("target");
            aggiungi.removeAttribute("rel");
        }
        else if (CONFIG.formUrl) {
            aggiungi.href = CONFIG.formUrl;
        }
        else {
            aggiungi.hidden = true;
        }
    }
    window.addEventListener("hashchange", () => {
        const eraInserimento = state.inserimento;
        leggiHash();
        if (eraInserimento && !state.inserimento)
            chiudiAggiungi();
        render();
    });
    leggiHash();
    void carica();
}
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
}
else {
    init();
}
