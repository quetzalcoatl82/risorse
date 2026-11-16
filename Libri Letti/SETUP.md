# Libri letti — come si mette in piedi

Pagina statica che legge una scheda di un foglio Google e la mostra.
Niente framework, niente dipendenze: `index.html` + `style.css` + `app.js`
(compilato da `src/app.ts`).

## Il foglio

Foglio: `1y_3XOn0N7LnZ0r1bW-X74S71ngEUSQIH15gVKYkhNq0`, scheda `Letture`.

Colonne, in quest'ordine:

| isbn | data_fine | titolo | autore | anno | pagine | copertina | descrizione | categoria | note | stato | aggiornato |
|---|---|---|---|---|---|---|---|---|---|---|---|

`isbn`, `data_fine` e `note` arrivano dal Form. Dal titolo alla categoria le
riempie lo script. `note` sono tue e lo script non le tocca mai.

Le prime due le scrivi tu (o il Form). Dalla terza in poi le riempie l'Apps Script.
Quello che e' gia' scritto non viene sovrascritto: le correzioni a mano restano.

Il foglio dev'essere **condiviso in lettura col link** ("Chiunque abbia il link:
Visualizzatore"), altrimenti la pagina non lo vede. Di conseguenza il documento e'
pubblico tutto intero: non metterci altre schede con roba privata. Se un giorno
servisse una colonna privata, si separa in due fogli (master privato + vetrina
condivisa, scritta dallo script).

## L'Apps Script

`apps-script/Codice.js` va incollato in Estensioni -> Apps Script del foglio.
Poi, dal foglio, menu **Libri letti**:

1. *Prepara le intestazioni* — crea la scheda e la riga 1 se mancano
2. *Installa i trigger* — `onFormSubmit` + una passata giornaliera alle 5
3. *Completa i libri mancanti* — la prima passata sui libri gia' presenti

Alla prima esecuzione Google chiede l'autorizzazione per `UrlFetchApp` e per il
foglio: e' normale, e' il tuo script che chiede accesso a se stesso.

**Non va deployato come Web App.** Non espone nessun endpoint, lavora solo sui
trigger: e' il motivo per cui non c'e' niente da proteggere.

### La chiave di Google Books serve

Google Books **non risponde piu' alle richieste senza API key**: restituisce 429
con `quota_limit: defaultPerDayPerProject`, `quota_limit_value: 0`. Verificato il
16/11/2026 sia da browser sia da shell, stesso progetto consumer anonimo: non e'
un limite superato, e' quota zero per chi non si identifica.

Senza chiave lo script ripiega su Open Library, che pero' conosce pochi libri
italiani: nei test, 3 ISBN su 10, e di quei 3 uno senza autore.

Come ottenerla (gratis, qualche minuto):

1. console.cloud.google.com -> crea un progetto (o usane uno tuo)
2. API e servizi -> Abilita API -> *Books API*
3. Credenziali -> Crea credenziali -> Chiave API
4. nel foglio: Estensioni -> Apps Script -> Impostazioni progetto ->
   Proprieta' script -> `GOOGLE_BOOKS_KEY` = la chiave

Lo script la usa da solo se la trova. Conviene limitare la chiave alla sola
Books API dalla console, cosi' non serve ad altro se finisce in giro.

### La ricerca per ISBN non basta

`volumes?q=isbn:` restituisce una **scheda ridotta**: titolo e autore ci sono,
descrizione e categorie quasi mai (verificato: ricerca `description=ASSENTE`,
dettaglio dello stesso volume `description=1594 caratteri`). Per questo, quando
dalla ricerca manca qualcosa, lo script chiede il dettaglio `volumes/{id}` e
riempie solo i buchi. Sono due chiamate per libro invece di una: con la quota di
1000 al giorno non e' un problema.

Le categorie arrivano in inglese (`Fiction`, `Biography & Autobiography`) anche
per le edizioni italiane: e' lo schema BISAC di Google. Lo script tiene le prime
due voci, ripulite dalle barre, e le traduce con la mappa `GENERI` (~95 voci).

Le voci fuori mappa **restano in inglese**, cosi' si notano: quando ne vedi una,
aggiungila a `GENERI` e lancia *Libri letti -> Traduci i generi*, che riscrive la
colonna `categoria` di tutte le righe senza chiamare le API (quindi senza
consumare quota).

Attenzione a un dettaglio: certe voci BISAC contengono gia' una virgola
(`Body, Mind & Spirit`), che e' anche il separatore fra due categorie. Per questo
la traduzione prova prima la stringa intera, poi le coppie, poi i singoli pezzi.

La classificazione resta quella di Google, con le sue stranezze: un fumetto
autobiografico finisce sotto `Biografie`.

### Il parametro country

Le chiamate partono dai server di Apps Script, non dal tuo computer: Google Books
non riesce a dedurre il paese e risponde `403 unknownLocation`. Per questo l'URL
porta `country=IT`. Senza quel parametro la chiave e' corretta ma ogni richiesta
fallisce — sintomo tipico: la colonna `stato` resta su `openlibrary` o
`non trovato` per tutti i libri.

Se serve capire cosa succede, nell'editor c'e' la funzione `diagnostica`: la
esegui a mano e nel log trovi se la chiave e' presente, il codice HTTP e la
risposta. La chiave non viene mai stampata.

## Il Form

Lo crea lo script: menu *Libri letti -> Crea il Form di inserimento*. Tre domande
(ISBN, Finito il, Note) e l'indirizzo pubblico finisce nel log di esecuzione, da
copiare in `CONFIG.formUrl` dentro `src/app.ts`. Se `formUrl` e' vuoto, il
bottone "Aggiungi" resta nascosto.

Il Form **non e' collegato al foglio** come destinazione: scriverebbe in una sua
scheda di risposte con colonne sue. La riga in `Letture` la scrive il trigger
`alSubmitDelForm`, che poi arricchisce subito quel libro.

*Allinea le domande del Form* aggiunge a un Form gia' esistente cio' che manca,
senza ricrearlo: ricrearlo cambierebbe l'indirizzo e butterebbe via il trigger.

### Chi puo' inserire libri

Il link del Form sta nella pagina pubblica, quindi chiunque la apra lo vede. Per
questo il Form raccoglie l'email verificata (chi risponde deve essere loggato) e
`alSubmitDelForm` scarta le risposte che non arrivano da un indirizzo ammesso.

Gli indirizzi ammessi stanno in `EMAIL_AUTORIZZATE` fra le proprieta' dello
script, separati da virgola. **Finche' quella proprieta' e' vuota il filtro non
esiste**: lo script accetta chiunque e lo scrive nel log.

Non si ricava il proprietario con `Session.getEffectiveUser()`: richiede lo scope
`userinfo.email`, che questo script non ha, e dentro il trigger solleva
un'eccezione che impedisce di scrivere la riga (successo davvero: una risposta
del Form e' rimasta fuori dal foglio per questo motivo).

### Quando una risposta non diventa una riga

Le risposte restano comunque registrate nel Form. Menu *Libri letti -> Recupera
risposte non entrate*: rilegge tutte le risposte e inserisce quelle il cui ISBN
non e' gia' nel foglio.

## Le copertine

Si usano i link che l'API restituisce (`books.google.com/books/content?...&
source=gbs_api`), senza scaricare le immagini: non consumano la quota del
progetto, che vive su `googleapis.com`, e rispondono con
`cache-control: private, max-age=86400`.

**Lo `zoom=1` non e' una svista.** Per questi volumi Google ha solo la
miniatura da 128px: con `zoom=0`, `zoom=2`, `zoom=3` o `w=400` risponde 200 ma
serve il segnaposto grigio "image not available", identico byte per byte fra
libri diversi (9103 byte). Chi volesse "alzare la risoluzione" otterrebbe solo
di cancellare tutte le copertine: verificato sul campo, aprendo le immagini.
Menu *Aggiorna le copertine* rimette in riga gli URL gia' salvati, senza
chiamare le API.

Nella pagina le `<img>` hanno `referrerpolicy="no-referrer"`, cosi' Google non
riceve anche l'indirizzo della pagina di chi guarda, e un gestore di `error`
che al posto di un'immagine morta rimette il riquadro con il titolo.

## Lo script dal repo, con clasp

`apps-script/Codice.js` e' la copia buona: si carica nel foglio con clasp, la CLI
ufficiale di Apps Script. `.clasp.json` punta allo scriptId del progetto legato
al foglio, con `rootDir: apps-script`.

Una volta sola:

1. abilita l'Apps Script API su <https://script.google.com/home/usersettings>
2. `npm run gas:login` — OAuth nel browser, con l'account del foglio

Poi:

```sh
npm run gas:pull     # scarica dal foglio: la PRIMA volta serve per appsscript.json
npm run gas:push     # carica quello che c'e' nel repo
npm run gas:watch    # carica a ogni salvataggio
```

**Il primo comando dev'essere `pull`**, non `push`: porta giu' `appsscript.json`,
il manifest del progetto, che prima esisteva solo lato Google. Dentro ci sono
fuso orario (`Europe/Rome`), runtime (`V8`) e logging; **non** gli scope OAuth,
che Apps Script continua a dedurre dal codice a ogni autorizzazione.

Due avvertenze:

- `clasp push` **sovrascrive** il progetto remoto, non fa merge: se modifichi
  dall'editor web, fai `pull` prima di ripushare o perdi quelle modifiche.
- clasp 3 **non transpila piu' TypeScript** (lo faceva la 2.x). Lo script resta
  JavaScript; il TypeScript del sito e' un'altra cosa e non passa da clasp.
- clasp salva il codice come `Codice.js`, non `.gs`: e' il nome che usa lui e
  che il repo deve tenere. Nell'editor web lo vedrai sempre come `Codice.gs`.

## Build

```sh
npx -y -p typescript@5.9.2 tsc -p .
```

Genera `app.js` dalla cartella `src/`. `app.js` sta nel repo apposta: cosi'
`index.html` si apre anche con un doppio clic, senza build e senza server.

## Note

- La pagina tiene i dati in `sessionStorage` per un'ora (`CONFIG.cacheTtlMs`),
  quindi dopo una modifica al foglio puo' volerci quel tempo, o una scheda nuova.
- Se il foglio non risponde, la pagina ripiega su un fetch JSONP (serve per
  `file://`) e, se fallisce anche quello, mostra dei libri di esempio con un
  avviso in cima.
