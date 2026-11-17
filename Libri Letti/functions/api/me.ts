// GET /api/me -> dice alla pagina se chi guarda puo' salvare.
// L'header lo scrive Cloudflare Access dopo il login: il browser non puo' fingerlo.
import { risposta, utenteDaAccess } from "../_lib/google";

interface AmbienteMe {
  readonly DEV_UTENTE?: string;
}

/** In produzione l'host e' *.pages.dev: la scorciatoia di sviluppo non si attiva. */
function inSviluppo(request: Request): boolean {
  const host = new URL(request.url).hostname;
  return host === "localhost" || host === "127.0.0.1" || host === "[::1]";
}

export const onRequestGet: PagesFunction<AmbienteMe> = async ({ request, env }) => {
  const email = utenteDaAccess(request);
  if (email) return risposta({ autenticato: true, email });

  if (inSviluppo(request) && env.DEV_UTENTE) {
    return risposta({ autenticato: true, email: env.DEV_UTENTE, sviluppo: true });
  }
  return risposta({ autenticato: false, email: "" });
};
