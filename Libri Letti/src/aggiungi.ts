// Rotta #/aggiungi: inquadri il codice a barre, controlli l'anteprima, salvi.
// La scrittura passa da /api/libri, protetta da Cloudflare Access: qui dentro
// non c'e' nessun segreto, e una pagina senza sessione valida non salva niente.

interface Anteprima {
  readonly trovato: boolean;
  readonly isbn: string;
  readonly titolo: string;
  readonly autore: string;
  readonly anno: number | null;
  readonly pagine: number | null;
  readonly copertina: string;
  readonly descrizione: string;
  readonly categorie: readonly string[];
}

interface StatoAggiungi {
  autenticato: boolean | null;
  isbn: string;
  anteprima: Anteprima | null;
  messaggio: string;
  errore: boolean;
  inCorso: boolean;
  scansione: boolean;
  salvato: string;
}

const statoAggiungi: StatoAggiungi = {
  autenticato: null,
  isbn: "",
  anteprima: null,
  messaggio: "",
  errore: false,
  inCorso: false,
  scansione: false,
  salvato: "",
};

let flusso: MediaStream | null = null;
let fermaScansione: (() => void) | null = null;

function oggi(): string {
  const adesso = new Date();
  const mese = String(adesso.getMonth() + 1).padStart(2, "0");
  const giorno = String(adesso.getDate()).padStart(2, "0");
  return `${adesso.getFullYear()}-${mese}-${giorno}`;
}

function scannerDisponibile(): boolean {
  return "BarcodeDetector" in window && typeof navigator.mediaDevices?.getUserMedia === "function";
}

/* ------------------------------------------------------------------ rete */

async function chiediAnteprima(isbn: string): Promise<void> {
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
    } else if (!res.ok) {
      const dettaglio = (await res.json().catch(() => ({}))) as { errore?: string };
      throw new Error(dettaglio.errore || `Errore ${res.status}`);
    } else {
      statoAggiungi.anteprima = (await res.json()) as Anteprima;
      statoAggiungi.messaggio = "";
    }
  } catch (err) {
    statoAggiungi.anteprima = null;
    statoAggiungi.messaggio = err instanceof Error ? err.message : String(err);
    statoAggiungi.errore = true;
  } finally {
    statoAggiungi.inCorso = false;
    renderAggiungi();
  }
}

async function salva(): Promise<void> {
  const dataEl = document.getElementById("data-fine") as HTMLInputElement | null;
  const noteEl = document.getElementById("note") as HTMLTextAreaElement | null;
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
    if (res.status === 401) throw new Error("Sessione scaduta: ricarica la pagina per rientrare.");
    if (!res.ok) {
      const dettaglio = (await res.json().catch(() => ({}))) as { errore?: string };
      throw new Error(dettaglio.errore || `Errore ${res.status}`);
    }
    statoAggiungi.salvato = a?.titolo || statoAggiungi.isbn;
    statoAggiungi.anteprima = null;
    statoAggiungi.isbn = "";
    statoAggiungi.messaggio = "";
    sessionStorage.clear(); // l'elenco deve rileggere il foglio
  } catch (err) {
    statoAggiungi.messaggio = err instanceof Error ? err.message : String(err);
    statoAggiungi.errore = true;
  } finally {
    statoAggiungi.inCorso = false;
    renderAggiungi();
  }
}

async function controllaAccesso(): Promise<void> {
  try {
    const res = await fetch("/api/me");
    const dati = (await res.json()) as { autenticato?: boolean };
    statoAggiungi.autenticato = dati.autenticato === true;
  } catch {
    statoAggiungi.autenticato = false;
  }
  renderAggiungi();
}

/* -------------------------------------------------------------- scanner */

interface CodiceLetto {
  readonly rawValue: string;
}
interface Rilevatore {
  detect(sorgente: CanvasImageSource): Promise<readonly CodiceLetto[]>;
}
type CostruttoreRilevatore = new (opzioni: { formats: string[] }) => Rilevatore;

async function avviaScansione(): Promise<void> {
  const video = document.getElementById("video") as HTMLVideoElement | null;
  if (!video) return;

  try {
    flusso = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
      audio: false,
    });
  } catch {
    statoAggiungi.scansione = false;
    statoAggiungi.messaggio = "Fotocamera non disponibile: scrivi l'ISBN a mano.";
    statoAggiungi.errore = true;
    renderAggiungi();
    return;
  }

  video.srcObject = flusso;
  await video.play().catch(() => undefined);

  const globali = window as unknown as { BarcodeDetector: CostruttoreRilevatore };
  // EAN-13 e' il codice a barre dei libri: l'ISBN-13 e' quel numero.
  const rilevatore = new globali.BarcodeDetector({ formats: ["ean_13", "ean_8", "isbn" ] });

  let attivo = true;
  fermaScansione = (): void => {
    attivo = false;
    if (flusso) flusso.getTracks().forEach((t) => t.stop());
    flusso = null;
  };

  const cerca = async (): Promise<void> => {
    if (!attivo) return;
    try {
      const codici = await rilevatore.detect(video);
      const primo = codici[0];
      if (primo && /^\d{10,13}$/.test(primo.rawValue)) {
        if (navigator.vibrate) navigator.vibrate(60);
        fermaScansione?.();
        statoAggiungi.scansione = false;
        statoAggiungi.isbn = primo.rawValue;
        renderAggiungi();
        void chiediAnteprima(primo.rawValue);
        return;
      }
    } catch {
      // un fotogramma illeggibile non e' un errore: si riprova col prossimo
    }
    requestAnimationFrame(() => void cerca());
  };
  void cerca();
}

/* --------------------------------------------------------------- render */

function renderAnteprima(a: Anteprima): string {
  const meta: string[] = [];
  if (a.anno !== null) meta.push(String(a.anno));
  if (a.pagine !== null) meta.push(`${a.pagine} pagine`);
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

function renderAggiungi(): void {
  const app = document.getElementById("app");
  if (!app) return;

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

function agganciaAggiungi(): void {
  const isbnEl = document.getElementById("isbn") as HTMLInputElement | null;
  isbnEl?.addEventListener("input", () => {
    statoAggiungi.isbn = isbnEl.value.replace(/[^0-9Xx]/g, "").toUpperCase();
  });

  document.getElementById("cerca")?.addEventListener("click", () => {
    if (statoAggiungi.isbn) void chiediAnteprima(statoAggiungi.isbn);
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

function apriAggiungi(): void {
  statoAggiungi.salvato = "";
  renderAggiungi();
  if (statoAggiungi.autenticato === null) void controllaAccesso();
}

function chiudiAggiungi(): void {
  fermaScansione?.();
  statoAggiungi.scansione = false;
}
