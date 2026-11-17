// GET /api/libro?isbn=... -> anteprima del libro, senza esporre la chiave.
import { ambienteIncompleto, risposta, type Ambiente } from "../_lib/google";

interface VolumeInfo {
  title?: string;
  subtitle?: string;
  authors?: string[];
  publishedDate?: string;
  pageCount?: number;
  description?: string;
  categories?: string[];
  imageLinks?: { thumbnail?: string; smallThumbnail?: string };
}

function annoDa(testo: string | undefined): number | null {
  const m = /(\d{4})/.exec(testo || "");
  return m && m[1] ? Number(m[1]) : null;
}

function ripulisci(html: string): string {
  return html.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

/** Lo zoom resta 1: le altre taglie servono il segnaposto "image not available". */
function copertina(info: VolumeInfo): string {
  const url = (info.imageLinks || {}).thumbnail || (info.imageLinks || {}).smallThumbnail || "";
  return url.replace(/^http:/, "https:").replace("&edge=curl", "");
}

async function json(url: string): Promise<Record<string, unknown> | null> {
  const res = await fetch(url, { cf: { cacheTtl: 3600, cacheEverything: true } });
  if (!res.ok) return null;
  return (await res.json()) as Record<string, unknown>;
}

export const onRequestGet: PagesFunction<Ambiente> = async ({ request, env }) => {
  const isbn = (new URL(request.url).searchParams.get("isbn") || "").replace(/[^0-9Xx]/g, "").toUpperCase();
  if (!isbn) return risposta({ errore: "ISBN mancante" }, 400);

  const mancanti = ambienteIncompleto(env, ["GOOGLE_BOOKS_KEY"]);
  if (mancanti.length) return risposta({ errore: "Configurazione incompleta: " + mancanti.join(", ") }, 500);

  // country: dai server di Cloudflare Google non deduce il paese e risponde 403.
  const ricerca = await json(
    "https://www.googleapis.com/books/v1/volumes?country=IT&q=isbn:" + isbn +
    "&key=" + encodeURIComponent(env.GOOGLE_BOOKS_KEY),
  );
  const items = (ricerca?.["items"] as Array<{ id: string; volumeInfo: VolumeInfo }> | undefined) || [];
  if (!items.length) return risposta({ trovato: false, isbn }, 404);

  const primo = items[0]!;
  let info = primo.volumeInfo || {};
  // La ricerca torna una scheda ridotta: descrizione e categorie stanno nel dettaglio.
  if (!info.description || !info.pageCount || !info.categories) {
    const dettaglio = await json(
      "https://www.googleapis.com/books/v1/volumes/" + encodeURIComponent(primo.id) +
      "?country=IT&key=" + encodeURIComponent(env.GOOGLE_BOOKS_KEY),
    );
    const pieno = dettaglio?.["volumeInfo"] as VolumeInfo | undefined;
    if (pieno) info = { ...pieno, ...info, ...{
      description: info.description || pieno.description,
      pageCount: info.pageCount || pieno.pageCount,
      categories: info.categories || pieno.categories,
      imageLinks: info.imageLinks || pieno.imageLinks,
    } };
  }

  return risposta({
    trovato: true,
    isbn,
    titolo: info.subtitle ? `${info.title}. ${info.subtitle}` : (info.title || ""),
    autore: (info.authors || []).join(", "),
    anno: annoDa(info.publishedDate),
    pagine: info.pageCount || null,
    copertina: copertina(info),
    descrizione: ripulisci(info.description || ""),
    categorie: info.categories || [],
  });
};
