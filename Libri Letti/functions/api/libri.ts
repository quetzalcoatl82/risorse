// POST /api/libri -> aggiunge una riga al foglio.
// Protetto da Cloudflare Access: senza l'header di Access non si scrive niente.
import { ambienteIncompleto, risposta, tokenGoogle, utenteDaAccess, type Ambiente } from "../_lib/google";

interface Richiesta {
  isbn?: string;
  data_fine?: string;
  note?: string;
  titolo?: string;
  autore?: string;
  anno?: number | null;
  pagine?: number | null;
  copertina?: string;
  descrizione?: string;
  categoria?: string;
}

/** L'ordine delle colonne nel foglio. Deve restare allineato ad apps-script. */
const COLONNE = [
  "isbn", "data_fine", "titolo", "autore", "anno", "pagine",
  "copertina", "descrizione", "categoria", "note", "stato", "aggiornato",
] as const;

function oggiIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export const onRequestPost: PagesFunction<Ambiente> = async ({ request, env }) => {
  const utente = utenteDaAccess(request);
  if (!utente) return risposta({ errore: "Non autenticato" }, 401);

  const mancanti = ambienteIncompleto(env, ["GOOGLE_SA_EMAIL", "GOOGLE_SA_KEY", "SPREADSHEET_ID"]);
  if (mancanti.length) return risposta({ errore: "Configurazione incompleta: " + mancanti.join(", ") }, 500);

  let corpo: Richiesta;
  try {
    corpo = (await request.json()) as Richiesta;
  } catch {
    return risposta({ errore: "JSON non valido" }, 400);
  }

  const isbn = (corpo.isbn || "").replace(/[^0-9Xx]/g, "").toUpperCase();
  if (!isbn) return risposta({ errore: "ISBN mancante" }, 400);

  const valori: Record<(typeof COLONNE)[number], string | number> = {
    isbn,
    data_fine: corpo.data_fine || oggiIso(),
    titolo: corpo.titolo || "",
    autore: corpo.autore || "",
    anno: corpo.anno ?? "",
    pagine: corpo.pagine ?? "",
    copertina: corpo.copertina || "",
    descrizione: corpo.descrizione || "",
    categoria: corpo.categoria || "",
    note: corpo.note || "",
    stato: corpo.titolo ? "pagina" : "da completare",
    aggiornato: oggiIso(),
  };

  const foglio = env.SHEET_NAME || "Letture";
  const url = "https://sheets.googleapis.com/v4/spreadsheets/" +
    encodeURIComponent(env.SPREADSHEET_ID) + "/values/" +
    encodeURIComponent(foglio + "!A:L") +
    ":append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS";

  const res = await fetch(url, {
    method: "POST",
    headers: {
      authorization: "Bearer " + (await tokenGoogle(env)),
      "content-type": "application/json",
    },
    body: JSON.stringify({ values: [COLONNE.map((c) => valori[c])] }),
  });

  if (!res.ok) {
    return risposta({ errore: "Il foglio ha rifiutato la scrittura", dettaglio: await res.text() }, 502);
  }
  const esito = (await res.json()) as { updates?: { updatedRange?: string } };
  return risposta({ salvato: true, isbn, riga: esito.updates?.updatedRange || "", da: utente });
};
