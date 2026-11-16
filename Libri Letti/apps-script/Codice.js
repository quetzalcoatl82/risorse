/**
 * Libri letti — arricchimento del foglio.
 *
 * Gira dentro il foglio, a nome del proprietario. Non va deployato come Web App:
 * non espone nessun endpoint, lavora solo sui trigger.
 *
 * Trigger da creare (menu "Libri letti" → Installa i trigger):
 *   - onFormSubmit: risolve l'ISBN appena inserito dal Form
 *   - giornaliero:  ripassa le righe rimaste senza dati
 */

var SHEET = 'Letture';

// L'ordine conta: e' l'ordine delle colonne nel foglio.
var COLONNE = [
  'isbn', 'data_fine', 'titolo', 'autore',
  'anno', 'pagine', 'copertina', 'descrizione',
  'categoria', 'note', 'stato', 'aggiornato'
];

/* -------------------------------------------------------------------- menu */

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Libri letti')
    .addItem('Completa i libri mancanti', 'completaMancanti')
    .addItem('Rileggi tutto da capo', 'completaTutto')
    .addItem('Traduci i generi', 'traduciGeneri')
    .addItem('Aggiorna le copertine', 'aggiornaCopertine')
    .addSeparator()
    .addItem('Prepara le intestazioni', 'preparaIntestazioni')
    .addItem('Crea il Form di inserimento', 'creaForm')
    .addItem('Allinea le domande del Form', 'aggiornaForm')
    .addItem('Recupera risposte non entrate', 'recuperaRisposte')
    .addItem('Installa i trigger', 'installaTrigger')
    .addToUi();
}

/* ------------------------------------------------------------------ foglio */

function foglio_() {
  var sh = SpreadsheetApp.getActive().getSheetByName(SHEET);
  if (!sh) throw new Error('Manca la scheda "' + SHEET + '": lancia "Prepara le intestazioni"');
  return sh;
}

/** Crea la scheda se non c'e' e ci scrive la riga di intestazione. */
function preparaIntestazioni() {
  var ss = SpreadsheetApp.getActive();
  var sh = ss.getSheetByName(SHEET) || ss.insertSheet(SHEET);
  sh.getRange(1, 1, 1, COLONNE.length).setValues([COLONNE]).setFontWeight('bold');
  sh.setFrozenRows(1);
  ss.setActiveSheet(sh);
}

function indiceColonne_(sh) {
  var intestazioni = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  var indici = {};
  for (var i = 0; i < intestazioni.length; i++) {
    var nome = String(intestazioni[i]).trim().toLowerCase();
    if (nome) indici[nome] = i + 1;
  }
  for (var j = 0; j < COLONNE.length; j++) {
    if (!indici[COLONNE[j]]) throw new Error('Manca la colonna "' + COLONNE[j] + '"');
  }
  return indici;
}

/* ---------------------------------------------------------------- trigger */

/** Solo la passata giornaliera: il trigger del Form nasce con creaForm(). */
function installaTrigger() {
  rimuoviTrigger_('completaMancanti');
  ScriptApp.newTrigger('completaMancanti').timeBased().everyDays(1).atHour(5).create();
  SpreadsheetApp.getUi().alert('Passata giornaliera installata (ogni notte alle 5).');
}

function rimuoviTrigger_(nomeFunzione) {
  var esistenti = ScriptApp.getProjectTriggers();
  for (var i = 0; i < esistenti.length; i++) {
    if (esistenti[i].getHandlerFunction() === nomeFunzione) ScriptApp.deleteTrigger(esistenti[i]);
  }
}

/**
 * Crea il Form di inserimento e lo aggancia a questo foglio con un trigger.
 * Il Form NON e' collegato al foglio come destinazione: scriverebbe in una sua
 * scheda di risposte con colonne sue. Scriviamo noi la riga in 'Letture'.
 */
function creaForm() {
  var props = PropertiesService.getScriptProperties();
  var form = FormApp.create('Libri letti - nuovo libro');
  form.setDescription('ISBN e data di fine lettura. Il resto lo trova lo script.');
  form.addTextItem().setTitle('ISBN').setHelpText('Anche con i trattini').setRequired(true);
  form.addDateItem().setTitle('Finito il').setRequired(true);
  form.addParagraphTextItem().setTitle('Note').setHelpText('Facoltative, le tue').setRequired(false);
  raccogliEmail_(form);

  props.setProperty('FORM_ID', form.getId());
  rimuoviTrigger_('alSubmitDelForm');
  ScriptApp.newTrigger('alSubmitDelForm').forForm(form).onFormSubmit().create();

  Logger.log('Form da compilare: ' + form.getPublishedUrl());
  Logger.log('Form da modificare: ' + form.getEditUrl());
  SpreadsheetApp.getUi().alert('Form creato. Trovi i due link nel log di esecuzione.');
}

/**
 * Aggiunge al Form gia' esistente le domande che mancano, senza ricrearlo:
 * ricrearlo cambierebbe l'indirizzo e butterebbe via il trigger.
 */
function aggiornaForm() {
  var id = PropertiesService.getScriptProperties().getProperty('FORM_ID');
  if (!id) throw new Error('Nessun Form: lancia prima "Crea il Form di inserimento"');
  var form = FormApp.openById(id);

  var presenti = {};
  var items = form.getItems();
  for (var i = 0; i < items.length; i++) presenti[items[i].getTitle()] = true;

  if (!presenti['Note']) {
    form.addParagraphTextItem().setTitle('Note').setHelpText('Facoltative, le tue').setRequired(false);
  }
  raccogliEmail_(form);
  SpreadsheetApp.getUi().alert('Form allineato: ' + form.getPublishedUrl());
}

/**
 * Il link del Form e' pubblico (sta nella pagina): senza email verificata
 * chiunque potrebbe scrivere nel foglio. Chi risponde deve essere loggato.
 */
function raccogliEmail_(form) {
  try {
    if (FormApp.EmailCollectionType && form.setEmailCollectionType) {
      form.setEmailCollectionType(FormApp.EmailCollectionType.VERIFIED);
      return;
    }
  } catch (err) {
    // versione vecchia dell'API: si ripiega sotto
  }
  form.setCollectEmail(true);
}

/**
 * Chi puo' inserire libri: gli indirizzi in EMAIL_AUTORIZZATE (separati da
 * virgola) fra le proprieta' dello script.
 * Niente Session.getEffectiveUser(): richiede lo scope userinfo.email, che
 * questo script non ha, e dentro il trigger fa fallire tutto.
 * Lista vuota = nessun filtro, e lo diciamo nel log.
 */
function emailAutorizzate_() {
  var extra = PropertiesService.getScriptProperties().getProperty('EMAIL_AUTORIZZATE') || '';
  var lista = [];
  var pezzi = extra.split(',');
  for (var i = 0; i < pezzi.length; i++) {
    var voce = pezzi[i].trim().toLowerCase();
    if (voce) lista.push(voce);
  }
  return lista;
}

function mittenteAmmesso_(mittente) {
  var ammessi = emailAutorizzate_();
  if (!ammessi.length) {
    console.log('EMAIL_AUTORIZZATE non impostata: accetto chiunque.');
    return true;
  }
  return ammessi.indexOf(String(mittente || '').toLowerCase()) >= 0;
}

/** Legge una risposta del Form e ne tira fuori i campi che ci servono. */
function datiDallaRisposta_(risposta) {
  var dati = { isbn: '', data: '', note: '', mittente: '' };
  try {
    dati.mittente = String(risposta.getRespondentEmail() || '').toLowerCase();
  } catch (err) {
    dati.mittente = '';
  }
  var risposte = risposta.getItemResponses();
  for (var i = 0; i < risposte.length; i++) {
    var titolo = risposte[i].getItem().getTitle();
    if (titolo === 'ISBN') dati.isbn = normalizzaIsbn_(risposte[i].getResponse());
    if (titolo === 'Finito il') dati.data = risposte[i].getResponse();
    if (titolo === 'Note') dati.note = String(risposte[i].getResponse() || '').trim();
  }
  return dati;
}

/** Scrive la riga e la arricchisce. Torna il numero di riga, 0 se saltata. */
function inserisciLibro_(dati) {
  if (!dati.isbn) return 0;
  if (!mittenteAmmesso_(dati.mittente)) {
    console.log('Risposta ignorata, mittente non autorizzato: ' + (dati.mittente || 'anonimo'));
    return 0;
  }
  var sh = foglio_();
  var col = indiceColonne_(sh);
  var riga = sh.getLastRow() + 1;
  sh.getRange(riga, col['isbn']).setValue(dati.isbn);
  if (dati.data) sh.getRange(riga, col['data_fine']).setValue(dati.data);
  if (dati.note) sh.getRange(riga, col['note']).setValue(dati.note);
  completaRighe_([riga], false);
  return riga;
}

/** Gli ISBN gia' presenti nel foglio. */
function isbnPresenti_() {
  var sh = foglio_();
  var col = indiceColonne_(sh);
  var ultima = sh.getLastRow();
  var presenti = {};
  if (ultima < 2) return presenti;
  var valori = sh.getRange(2, col['isbn'], ultima - 1, 1).getValues();
  for (var i = 0; i < valori.length; i++) {
    var isbn = normalizzaIsbn_(valori[i][0]);
    if (isbn) presenti[isbn] = true;
  }
  return presenti;
}

/**
 * Ripesca dal Form le risposte che non sono mai diventate righe, per esempio
 * perche' il trigger e' fallito. Salta gli ISBN gia' presenti.
 */
function recuperaRisposte() {
  var id = PropertiesService.getScriptProperties().getProperty('FORM_ID');
  if (!id) throw new Error('Nessun Form: lancia prima "Crea il Form di inserimento"');

  var presenti = isbnPresenti_();
  var risposte = FormApp.openById(id).getResponses();
  var aggiunti = 0;
  for (var i = 0; i < risposte.length; i++) {
    var dati = datiDallaRisposta_(risposte[i]);
    if (!dati.isbn || presenti[dati.isbn]) continue;
    if (inserisciLibro_(dati)) {
      presenti[dati.isbn] = true;
      aggiunti++;
    }
  }
  SpreadsheetApp.getUi().alert(aggiunti ? 'Libri recuperati: ' + aggiunti : 'Niente da recuperare.');
}

/** Scrive la riga nel foglio e la arricchisce subito. */
function alSubmitDelForm(e) {
  if (!e || !e.response) return;
  inserisciLibro_(datiDallaRisposta_(e.response));
}

function completaMancanti() {
  completaTutte_(false);
}

function completaTutto() {
  completaTutte_(true);
}

function completaTutte_(forza) {
  var sh = foglio_();
  var ultima = sh.getLastRow();
  var righe = [];
  for (var r = 2; r <= ultima; r++) righe.push(r);
  completaRighe_(righe, forza);
}

/**
 * Riempie le colonne vuote delle righe indicate.
 * Quello che e' gia' scritto non si tocca: le correzioni a mano restano.
 */
function completaRighe_(righe, forza) {
  var sh = foglio_();
  var col = indiceColonne_(sh);
  var scritte = 0;

  for (var i = 0; i < righe.length; i++) {
    var r = righe[i];
    if (r < 2) continue;

    var isbn = normalizzaIsbn_(sh.getRange(r, col['isbn']).getValue());
    if (!isbn) continue;
    sh.getRange(r, col['isbn']).setValue(isbn);

    var haTitolo = String(sh.getRange(r, col['titolo']).getValue()).trim() !== '';
    if (haTitolo && !forza) continue;

    var dati = risolviIsbn_(isbn);
    if (!dati) {
      sh.getRange(r, col['stato']).setValue('non trovato');
      sh.getRange(r, col['aggiornato']).setValue(new Date());
      continue;
    }

    scriviSeVuoto_(sh, r, col['titolo'], dati.titolo, forza);
    scriviSeVuoto_(sh, r, col['autore'], dati.autore, forza);
    scriviSeVuoto_(sh, r, col['anno'], dati.anno, forza);
    scriviSeVuoto_(sh, r, col['pagine'], dati.pagine, forza);
    scriviSeVuoto_(sh, r, col['copertina'], dati.copertina, forza);
    scriviSeVuoto_(sh, r, col['descrizione'], dati.descrizione, forza);
    scriviSeVuoto_(sh, r, col['categoria'], dati.categoria, forza);
    sh.getRange(r, col['stato']).setValue(dati.fonte);
    sh.getRange(r, col['aggiornato']).setValue(new Date());
    scritte++;

    Utilities.sleep(250); // le API gratuite non amano le raffiche
  }
  return scritte;
}

function scriviSeVuoto_(sh, riga, colonna, valore, forza) {
  if (valore === '' || valore === null || valore === undefined) return;
  var cella = sh.getRange(riga, colonna);
  if (!forza && String(cella.getValue()).trim() !== '') return;
  cella.setValue(valore);
}

function normalizzaIsbn_(valore) {
  return String(valore).replace(/[^0-9Xx]/g, '').toUpperCase();
}

/* ---------------------------------------------------------------- lookup */

/** Prima Google Books, poi Open Library: la prima che risponde vince, campo per campo. */
function risolviIsbn_(isbn) {
  var gb = daGoogleBooks_(isbn);
  var ol = daOpenLibrary_(isbn);
  if (!gb && !ol) return null;

  var base = gb || ol;
  var altro = gb ? ol : null;
  if (altro) {
    if (!base.copertina) base.copertina = altro.copertina;
    if (!base.descrizione) base.descrizione = altro.descrizione;
    if (!base.pagine) base.pagine = altro.pagine;
    if (!base.anno) base.anno = altro.anno;
    if (!base.categoria) base.categoria = altro.categoria;
  }
  base.fonte = gb ? (ol ? 'google+openlibrary' : 'google') : 'openlibrary';
  return base;
}

function chiamaJson_(url) {
  try {
    var res = UrlFetchApp.fetch(url, { muteHttpExceptions: true, followRedirects: true });
    if (res.getResponseCode() !== 200) return null;
    return JSON.parse(res.getContentText());
  } catch (err) {
    return null;
  }
}

/**
 * Senza chiave Google Books risponde 429: la quota giornaliera per le richieste
 * anonime e' zero. Senza GOOGLE_BOOKS_KEY resta solo Open Library, che sui libri
 * italiani copre poco. Vedi SETUP.md per come ottenerla.
 */
function chiaveGoogleBooks_() {
  return PropertiesService.getScriptProperties().getProperty('GOOGLE_BOOKS_KEY') || '';
}

function daGoogleBooks_(isbn) {
  var chiave = chiaveGoogleBooks_();
  var suffisso = chiave ? '&key=' + encodeURIComponent(chiave) : '';
  // country serve: chiamando dai server di Apps Script, Google Books non deduce
  // il paese e risponde 403 unknownLocation.
  var json = chiamaJson_('https://www.googleapis.com/books/v1/volumes?country=IT&q=isbn:' +
    encodeURIComponent(isbn) + suffisso);
  if (!json || !json.items || !json.items.length) return null;

  var item = json.items[0];
  var info = item.volumeInfo || {};
  // La ricerca restituisce una scheda ridotta: descrizione, pagine e copertina
  // spesso esistono solo nel dettaglio del volume. Lo chiediamo solo se serve.
  if (!info.description || !info.pageCount || !info.categories || !(info.imageLinks || {}).thumbnail) {
    info = completaDaDettaglio_(info, item.id, suffisso);
  }
  var img = info.imageLinks || {};
  var copertina = img.thumbnail || img.smallThumbnail || '';

  return {
    titolo: info.title ? (info.subtitle ? info.title + '. ' + info.subtitle : info.title) : '',
    autore: (info.authors || []).join(', '),
    anno: annoDa_(info.publishedDate),
    pagine: info.pageCount || '',
    copertina: normalizzaCopertina_(copertina),
    descrizione: ripulisci_(info.description || ''),
    categoria: categorie_(info.categories),
    fonte: 'google'
  };
}

/**
 * Normalizza l'URL della copertina: https e via il ricciolo d'angolo.
 * Lo zoom resta 1 ed e' una scelta obbligata, non una svista: per questi
 * volumi Google ha solo la miniatura (128px). Con zoom=2, zoom=3, zoom=0 o
 * w=400 risponde 200 ma serve il segnaposto grigio "image not available",
 * identico byte per byte fra libri diversi. Verificato guardando le immagini.
 */
function normalizzaCopertina_(url) {
  var pulito = String(url || '').replace(/^http:/, 'https:').replace(/&edge=curl/, '');
  if (pulito.indexOf('books.google.') < 0) return pulito;
  if (/[?&]zoom=\d/.test(pulito)) return pulito.replace(/([?&]zoom=)\d/, '$11');
  return pulito;
}

/** Riempie i buchi della scheda ridotta con il dettaglio del volume. */
function completaDaDettaglio_(info, id, suffisso) {
  var dettaglio = chiamaJson_('https://www.googleapis.com/books/v1/volumes/' +
    encodeURIComponent(id) + '?country=IT' + suffisso);
  var pieno = (dettaglio && dettaglio.volumeInfo) || null;
  if (!pieno) return info;

  var campi = ['description', 'pageCount', 'imageLinks', 'publishedDate', 'authors', 'subtitle', 'categories'];
  for (var i = 0; i < campi.length; i++) {
    var campo = campi[i];
    if (!info[campo] && pieno[campo]) info[campo] = pieno[campo];
  }
  return info;
}

function daOpenLibrary_(isbn) {
  var json = chiamaJson_('https://openlibrary.org/api/books?bibkeys=ISBN:' + encodeURIComponent(isbn) + '&format=json&jscmd=data');
  if (!json) return null;
  var libro = json['ISBN:' + isbn];
  if (!libro) return null;

  var autori = [];
  for (var i = 0; i < (libro.authors || []).length; i++) autori.push(libro.authors[i].name);
  var cover = libro.cover || {};

  return {
    titolo: libro.title ? (libro.subtitle ? libro.title + '. ' + libro.subtitle : libro.title) : '',
    autore: autori.join(', '),
    anno: annoDa_(libro.publish_date),
    pagine: libro.number_of_pages || '',
    copertina: cover.large || cover.medium || '',
    descrizione: ripulisci_(typeof libro.notes === 'string' ? libro.notes : ''),
    categoria: soggetti_(libro.subjects),
    fonte: 'openlibrary'
  };
}


/* ------------------------------------------------------------------ generi */

/**
 * Google Books classifica con lo schema BISAC, in inglese anche per le edizioni
 * italiane. Qui le voci che capitano davvero; quelle fuori mappa restano
 * com'erano, cosi' si notano e si aggiungono.
 */
var GENERI = {
  // grandi aree
  'fiction': 'Narrativa',
  'juvenile fiction': 'Narrativa per ragazzi',
  'juvenile nonfiction': 'Divulgazione per ragazzi',
  'young adult fiction': 'Narrativa young adult',
  'young adult nonfiction': 'Divulgazione young adult',
  'biography & autobiography': 'Biografie',
  'history': 'Storia',
  'philosophy': 'Filosofia',
  'psychology': 'Psicologia',
  'religion': 'Religione',
  'science': 'Scienze',
  'social science': 'Scienze sociali',
  'political science': 'Politica',
  'business & economics': 'Economia',
  'self-help': 'Crescita personale',
  'health & fitness': 'Salute e benessere',
  'body, mind & spirit': 'Mente e corpo',
  'travel': 'Viaggi',
  'cooking': 'Cucina',
  'art': 'Arte',
  'photography': 'Fotografia',
  'music': 'Musica',
  'performing arts': 'Arti performative',
  'literary criticism': 'Critica letteraria',
  'literary collections': 'Raccolte letterarie',
  'poetry': 'Poesia',
  'drama': 'Teatro',
  'comics & graphic novels': 'Fumetti',
  'humor': 'Umorismo',
  'true crime': 'Cronaca nera',
  'sports & recreation': 'Sport',
  'nature': 'Natura',
  'mathematics': 'Matematica',
  'computers': 'Informatica',
  'technology & engineering': 'Tecnologia',
  'medical': 'Medicina',
  'law': 'Diritto',
  'education': 'Istruzione',
  'family & relationships': 'Famiglia e relazioni',
  'house & home': 'Casa',
  'gardening': 'Giardinaggio',
  'crafts & hobbies': 'Hobby e fai da te',
  'games & activities': 'Giochi',
  'pets': 'Animali',
  'reference': 'Consultazione',
  'language arts & disciplines': 'Lingua e linguistica',
  'foreign language study': 'Studio delle lingue',
  'antiques & collectibles': 'Antiquariato',
  'architecture': 'Architettura',
  'design': 'Design',
  'transportation': 'Trasporti',
  'study aids': 'Materiali di studio',
  'bibles': 'Bibbia',

  // sottogeneri della narrativa
  'literary': 'Letteratura',
  'classics': 'Classici',
  'thrillers': 'Thriller',
  'suspense': 'Suspense',
  'mystery & detective': 'Giallo',
  'crime': 'Crime',
  'science fiction': 'Fantascienza',
  'fantasy': 'Fantasy',
  'horror': 'Horror',
  'romance': 'Rosa',
  'historical': 'Storico',
  'dystopian': 'Distopia',
  'adventure': 'Avventura',
  'action & adventure': 'Avventura',
  'short stories': 'Racconti',
  'short stories (single author)': 'Racconti',
  'coming of age': 'Romanzo di formazione',
  'psychological': 'Psicologico',
  'satire': 'Satira',
  'war & military': 'Guerra',
  'espionage': 'Spionaggio',
  'noir': 'Noir',
  'fairy tales, folk tales, legends & mythology': 'Fiabe e mitologia',
  'graphic novels': 'Graphic novel',
  'essays': 'Saggi',
  'memoirs': 'Memorie',
  'personal memoirs': 'Memorie',
  'personal growth': 'Crescita personale',
  'motivational & inspirational': 'Motivazionale',

  // seconde voci che tornano spesso
  'regional & ethnic': 'Cucina regionale',
  'italy': 'Italia',
  'europe': 'Europa',
  'united states': 'Stati Uniti',
  'modern': 'Moderna',
  'contemporary': 'Contemporanea',
  'contemporary women': 'Narrativa femminile',
  'women': 'Donne',
  '20th century': 'Novecento',
  '21st century': 'Anni Duemila',
  'anthologies': 'Antologie',
  'anthologies (multiple authors)': 'Antologie',
  'world': 'Mondo',
  'general': ''
};

/**
 * Traduce una categoria, anche composta ("Fiction, Literary").
 * Attenzione: certe voci BISAC contengono gia' una virgola
 * ("Body, Mind & Spirit"), quindi prima si prova la stringa intera e poi,
 * scorrendo i pezzi, le coppie prima dei singoli.
 */
function traduciCategoria_(testo) {
  var intero = String(testo || '').trim();
  if (!intero) return '';

  var diretta = GENERI[intero.toLowerCase()];
  if (diretta !== undefined) return diretta;

  var pezzi = intero.split(',');
  var fuori = [];
  var i = 0;
  while (i < pezzi.length) {
    var voce = pezzi[i].trim();
    var consumati = 1;
    var tradotta;

    if (i + 1 < pezzi.length) {
      var coppia = (voce + ', ' + pezzi[i + 1].trim()).trim();
      var dallaCoppia = GENERI[coppia.toLowerCase()];
      if (dallaCoppia !== undefined) {
        tradotta = dallaCoppia;
        voce = coppia;
        consumati = 2;
      }
    }
    if (tradotta === undefined) tradotta = GENERI[voce.toLowerCase()];

    var finale = tradotta === undefined ? voce : tradotta;
    if (finale && fuori.indexOf(finale) < 0) fuori.push(finale);
    i += consumati;
  }
  return fuori.join(', ');
}

/** Rimette in riga le copertine gia' salvate. Nessuna chiamata API. */
function aggiornaCopertine() {
  var sh = foglio_();
  var col = indiceColonne_(sh);
  var ultima = sh.getLastRow();
  if (ultima < 2) return;

  var intervallo = sh.getRange(2, col['copertina'], ultima - 1, 1);
  var valori = intervallo.getValues();
  var cambiate = 0;
  for (var i = 0; i < valori.length; i++) {
    var prima = String(valori[i][0] || '');
    if (!prima) continue;
    var dopo = normalizzaCopertina_(prima);
    if (dopo !== prima) {
      valori[i][0] = dopo;
      cambiate++;
    }
  }
  intervallo.setValues(valori);
  SpreadsheetApp.getUi().alert(cambiate ? 'Copertine aggiornate: ' + cambiate : 'Erano gia\' a posto.');
}

/** Riscrive la colonna categoria con la mappa, senza chiamare le API. */
function traduciGeneri() {
  var sh = foglio_();
  var col = indiceColonne_(sh);
  var ultima = sh.getLastRow();
  if (ultima < 2) return;

  var intervallo = sh.getRange(2, col['categoria'], ultima - 1, 1);
  var valori = intervallo.getValues();
  var cambiate = 0;
  for (var i = 0; i < valori.length; i++) {
    var prima = String(valori[i][0] || '');
    var dopo = traduciCategoria_(prima);
    if (dopo !== prima) {
      valori[i][0] = dopo;
      cambiate++;
    }
  }
  intervallo.setValues(valori);
  SpreadsheetApp.getUi().alert(cambiate ? 'Generi tradotti: ' + cambiate : 'Erano gia\' tutti a posto.');
}

/** Google Books le da' come 'Fiction / Literary': teniamo le prime due, ripulite. */
function categorie_(lista) {
  if (!lista || !lista.length) return '';
  var pezzi = [];
  for (var i = 0; i < lista.length && pezzi.length < 2; i++) {
    var voci = String(lista[i]).split('/');
    for (var j = 0; j < voci.length; j++) {
      var voce = voci[j].trim();
      if (voce && pezzi.indexOf(voce) < 0) pezzi.push(voce);
    }
  }
  return traduciCategoria_(pezzi.slice(0, 2).join(', '));
}

/** Open Library: i subject sono oggetti {name}, e sono tanti. */
function soggetti_(lista) {
  if (!lista || !lista.length) return '';
  var pezzi = [];
  for (var i = 0; i < lista.length && i < 2; i++) {
    var nome = lista[i] && lista[i].name ? String(lista[i].name).trim() : '';
    if (nome) pezzi.push(nome);
  }
  return traduciCategoria_(pezzi.join(', '));
}

function annoDa_(testo) {
  var m = /(\d{4})/.exec(String(testo || ''));
  return m ? Number(m[1]) : '';
}

function ripulisci_(html) {
  return String(html)
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/* --------------------------------------------------------------- diagnostica */

/**
 * Da lanciare a mano quando l'arricchimento non pesca nulla da Google Books.
 * Non stampa mai la chiave: solo se c'e', quanto e' lunga e cosa risponde l'API.
 * Confronta la ricerca per ISBN con il dettaglio del volume.
 */
function diagnostica() {
  var isbn = '9791259674777'; // cambia l'ISBN per provarne un altro
  var chiave = chiaveGoogleBooks_();
  Logger.log('GOOGLE_BOOKS_KEY: ' + (chiave ? 'presente, ' + chiave.length + ' caratteri' : 'ASSENTE'));

  var ammessi = emailAutorizzate_();
  Logger.log('EMAIL_AUTORIZZATE: ' + (ammessi.length
    ? ammessi.length + ' indirizzo/i, filtro attivo'
    : 'VUOTA, il Form accetta chiunque'));
  var suffisso = chiave ? '&key=' + encodeURIComponent(chiave) : '';

  var ricerca = chiamaJson_('https://www.googleapis.com/books/v1/volumes?country=IT&q=isbn:' + isbn + suffisso);
  var primo = ricerca && ricerca.items && ricerca.items[0];
  if (!primo) {
    Logger.log('RICERCA: nessun risultato');
    return;
  }
  var vi = primo.volumeInfo || {};
  Logger.log('RICERCA  id=' + primo.id + ' titolo=' + vi.title +
    ' description=' + (vi.description ? vi.description.length + ' caratteri' : 'ASSENTE'));

  var dettaglio = chiamaJson_('https://www.googleapis.com/books/v1/volumes/' + primo.id + '?country=IT' + suffisso);
  var vd = (dettaglio && dettaglio.volumeInfo) || {};
  Logger.log('DETTAGLIO titolo=' + vd.title +
    ' description=' + (vd.description ? vd.description.length + ' caratteri' : 'ASSENTE'));
  if (vd.description) Logger.log('estratto: ' + vd.description.slice(0, 200));
}
