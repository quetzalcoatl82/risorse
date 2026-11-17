// GET /api/login -> porta al login di Access e poi riporta alla pagina.
// Sta sotto /api/*, quindi Access lo intercetta: dopo il PIN si arriva qui e
// questa funzione rimanda all'inserimento. Nessun indirizzo di Access scritto
// a mano nel codice.
export const onRequestGet: PagesFunction = async ({ request }) => {
  const destinazione = new URL("/#/aggiungi", request.url);
  return Response.redirect(destinazione.toString(), 302);
};
