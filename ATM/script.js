var cors = 'https://cors-anywhere.console-tribe.workers.dev/?';
var corsFS = 'https://no-cors-single.console-tribe.workers.dev/?';

// chiamo file delle fermate
    // se c'è posso aprire il menu e la ricerca

// vedo se il localstorage è attivo
    // se c'è posso salvare in locale le stazioni e recuperarle
    // altrimenti uso la url

var APIurl = {};
APIurl.ATM = 'https://giromilano.atm.it/proxy.ashx';
APIurl.FFSS = 'http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/';

var searchParams = new URLSearchParams(window.location.search);
var fermate = [];
var stazioni = [];

var elencostazioni;
fetch('https://quetzalcoatl82.github.io/risorse/ATM/stazioni.json')
    .then(data => data.json())
    .then(success => elencostazioni = success);

// mi segno l'ora della chiamata
var time = ora();

const home = document.querySelector('#home');
const loader = document.querySelector('.loader');
const stazionicont = document.querySelector('#stazioni');
const fermatecont = document.querySelector('#fermate');

if (searchParams.has('martina')) {
    // preimpostato per martina
    fermate.push(10335, 10332, 11176);
    stazioni.push('S01630:SARONNO','S01326:ALBAIRATE');
}
if (searchParams.has('quetz')) {
    // preimpostato per quetz
    // fermate.push(11175, 11176, 10890, 10893, 10887);
    // fermate.push(10335, 10332, 10326);
    fermate.push(10335, 10332, 11176);
    //stazioni.push('S01630:saronno;seregno');
    if (time.hr > 12 && time.hr < 19) {
        // ritorno
        stazioni.push('S01715:VARESE;NOVARA','S01492:ALBAIRATE');
    } else {
        stazioni.push('S01630:SARONNO');
    }
}
if (searchParams.has('fermate')) {
    // se ci sono delle fermate specificate le tiro fuori
    // il formato delle fermate è di 5 numeri - filtro solo i numeri dalla query
    let filter = searchParams.get('fermate').split(',');
    filter = filter.map(el => {
        let n = parseInt(el);
        return isNaN(n) ? null : n;
    }).filter(function(el) {
        return el != null;
    });
    // unisco la query pulita alle eventuali fermate già raccolte
    fermate = fermate.concat(filter);
}
if (searchParams.has('stazioni')) {
    // se ci sono delle stazioni specificate le tiro fuori
    // il formato delle stazioni è questo - S01630
    let filter = searchParams.get('stazioni').split(',');

    filter = filter.filter(function(el) {
        return el != '';
    });

    // unisco la query pulita alle eventuali fermate già raccolte
    stazioni = stazioni.concat(filter);
}

fermate.sort((a, b) => a - b);
stazioni.sort();

if (typeof Storage !== "undefined") {
    // sposto le variabili nel localstorage
    console.log('storage ok');
} else {
    // Sorry! No web storage support..
    console.log('storage inesistente');
}

// console.log(fermate);
// console.log(stazioni);

if (fermate.length == 0 && stazioni.length == 0) {
    // se dopo tutto sto giro non ci sono comunque fermate e stazioni creo la home con le info
    let html = document.createElement('div');
    html.classList.add("home");

    html.innerHTML = "<h1>Recupero orari bus, tram e treni</h1>";
    html.innerHTML += "<div class='bg'><img class='tram-albero' src='img/albero.svg'><img class='tram-banchina' src='img/banchina.svg'><div class='tram-strada'></div><div class='tram'><img class='tram-body vibrate-1' src='img/tram-body.svg'><img class='tram-bg' src='img/tram-bg.svg'></div><div class='tram-filo'></div><img class='tram-albero front' src='img/albero.svg'><div class='tram-erba front'></div></div>";
    html.innerHTML += "<h2>Come funziona per le fermate ATM</h2>";
    html.innerHTML += '<p>Questo tool serve a recuperare i tempi di attesa delle fermate ATM specificate, per usarlo basta inserire nella url le fermate richieste usando la stringa "<strong>?fermate=10000,20000,30000</strong>" sostituendo i numeri con le fermate preferite, sempre separate da una virgola come questo link di esempio:</p>';
    html.innerHTML += '<p><strong><a href="?fermate=14187,14188">?fermate=14187,14188</a></strong></p>';
    html.innerHTML += '<blockquote>Il codice per le fermate ATM è di cinque cifre ed è sempre mostrato sulle banchine e sulle fermate, le metro non sono incluse</blockquote>';
    html.innerHTML += "<h2>Come funziona per le stazioni Trenitalia e Trenord</h2>";
    html.innerHTML += '<p>È possibile anche visualizzare il tabellone dei treni in partenza per le stazioni Trenitalia e Trenord, inserendo il codice univoco nella url usando questa stringa "<strong>?stazioni=S10000,S20000,S30000</strong>", si possono filtrare i risultati inserendo le destinazioni preferite dopo il codice stazione usando i due punti, gli ulteriori filtri aggiuntivi vanno separati dal punto e virgola "<strong>?stazioni=S10000:roma,S20000:torino;parma,S30000</strong>":</p>';
    html.innerHTML += '<p><strong><a href="?stazioni=S01630:saronno,S01700:torino;roma">?stazioni=S01630:saronno,S01700:torino;roma</a></strong></p>';
    html.innerHTML += '<p>Ovviamente le due informazioni possono essere unite nella url usando il carattere <strong>&</strong> in modo da separare fermate e stazioni: "<strong>?fermate=10000,20000&stazioni=S10000:roma;bologna,S20000:torino,S30000</strong>": </p>';
    html.innerHTML += '<p><strong><a href="?fermate=14187,14188&stazioni=S01630,S01700:torino;roma">?fermate=14187,14188&stazioni=S01630,S01700:torino;roma</a></strong></p>';
    html.innerHTML += '<blockquote>Il codice per le stazioni dei treni inizia sempre con una lettera (S o N) seguita da 5 cifre e può essere recuperato <a target="_blank" href="https://github.com/sabas/trenitalia/blob/master/stazioni.tsv">in questo documento</a></blockquote>';

    home.appendChild(html);

} else {
    // prima di tutto mostro il loader
    loader.classList.add("show");
    // se ci sono fermate le chiamo in ordine
    if (fermate) {
        fermatecont.setAttribute("data-time", time.time);
        fermate.forEach(function(fermata) {
            chiamafermata(fermata, 'stops');
        });
    }
    if (stazioni) {
        stazionicont.setAttribute("data-time", time.time);
        stazioni.forEach(function(stazione) {
            let stazionefiltro = [];
            if (stazione.includes(":")) {
                let stazionefiltrostr = stazione.split(":").pop();
                stazionefiltro = stazionefiltrostr.split(";");
                stazione = stazione.split(":").shift();
            }
            chiamaregione(stazione, time, stazionefiltro);
        });
    }
}

function chiamafermata(fermataid, tipo) {
    // per aggiungere correttamente i form data alla richiesta
    let fd = new FormData();
    fd.append("url", "tpPortal/geodata/pois/" + tipo + "/" + fermataid);
    // creo i div per ospitare le fermate in ordine

    let html = document.createElement('table');
    html.classList.add("fermata")
    html.setAttribute("data-id", fermataid);

    fermatecont.appendChild(html);

    fetch(cors + APIurl.ATM, {
            method: 'POST',
            body: fd
        })
        .then(response => response.json())
        .then(function(data) {
            if (data['Lines'].length > 0) {
                // alla prima risposta tolgo il loader
                loader.classList.remove("show");
                fermatecont.classList.add("ready");
                // do something with server response data
                creafermata(fermataid, data);
            }
        })
        .catch(function(err) {
            loader.classList.remove("show");

            let html = document.createElement('div');
            html.classList.add("home");
            if (err.status == 404) {
                // fermata non raggiungibile
                html.innerHTML = '<p>La fermata richiesta <b>' + fermataid + '</b> non è raggiungibile, controlla che il numero sia corretto prima di ricaricare la pagina</p>';
                console.log(err);
            } else {
                // errore generico
                html.innerHTML = '<p>Qualcosa è andato storto, prova a ricaricare e ad incrociare le dita. Giuro che di solito funziona!</p>';
                console.log(err);
            }
            home.appendChild(html);
            // handle your error logic here
        });
}

function chiamaregione(stazioneid, date, filtro) {
    fetch(corsFS + APIurl.FFSS + 'regione/' + stazioneid, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(function(data) {
            
            // do something with server response data
            chiamastazione(stazioneid, date, filtro, data);
        })
        .catch(function(err) {
            if (stazioneid == 'S01492') { // eccezione per forlanini
                chiamastazione(stazioneid, date, filtro, 1);
            } else {
                loader.classList.remove("show");

                let html = document.createElement('div');
                html.classList.add("home");
                if (err.status == 404) {
                    // fermata non raggiungibile
                    html.innerHTML = '<p>La stazione richiesta <b>' + stazioneid + '</b> non è raggiungibile, controlla che il numero sia corretto prima di ricaricare la pagina</p>';
                    console.log(err);
                } else {
                    // errore generico
                    html.innerHTML = '<p>Qualcosa è andato storto, prova a ricaricare e ad incrociare le dita. Giuro che di solito funziona!</p>';
                    console.log(err);
                }
                home.appendChild(html);
                // handle your error logic here
            }

        });
}

function chiamastazione(stazioneid, date, filtro, regione) {
    let html = document.createElement('table');
    html.classList.add("stazione")
    html.setAttribute("data-id", stazioneid);

    stazionicont.appendChild(html);
    console.log(corsFS + APIurl.FFSS + 'dettaglioStazione/' + stazioneid + '/' + regione);
    fetch(corsFS + APIurl.FFSS + 'dettaglioStazione/' + stazioneid + '/' + regione, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(function(data) {
            // do something with server response data
            chiamapartenze(stazioneid, date, data, filtro);
        })
        .catch(function(err) {
            if (stazioneid == 'S01492') { // eccezione per forlanini
                // stampo dati finti per Forlanini perché l'API non me li dà
                infostazione = {"codReg":1,"tipoStazione":3,"dettZoomStaz":[],"pstaz":[],"mappaCitta":{"urlImagePinpoint":"","urlImageBaloon":""},"codiceStazione":"S01492","codStazione":"S01630","lat":45.442404,"lon":9.130258,"latMappaCitta":0.0,"lonMappaCitta":0.0,"localita":{"nomeLungo":"MILANO FORLANINI","nomeBreve":"MI Forlanini","label":"","id":"S01492"},"esterno":false,"offsetX":0,"offsetY":0,"nomeCitta":"A"}
                chiamapartenze(stazioneid, date, infostazione, filtro);
            } else {
                loader.classList.remove("show");

                let html = document.createElement('div');
                html.classList.add("home");
                if (err.status == 404) {
                    // fermata non raggiungibile
                    html.innerHTML = '<p>La stazione richiesta <b>' + stazioneid + '</b> non è raggiungibile, controlla che il numero sia corretto prima di ricaricare la pagina</p>';
                    console.log(err);
                } else {
                    // errore generico
                    html.innerHTML = '<p>Qualcosa è andato storto, prova a ricaricare e ad incrociare le dita. Giuro che di solito funziona!</p>';
                    console.log(err);
                }
                home.appendChild(html);
                // handle your error logic here
            }
        });
}

function chiamapartenze(stazioneid, date, infostazione, filtro) {
    fetch(corsFS + APIurl.FFSS + 'partenze/' + stazioneid + '/' + date.full, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(function(data) {
            if (data.length > 0) {
                // alla prima risposta tolgo il loader
                loader.classList.remove("show");
                stazionicont.classList.add("ready");
                // do something with server response data
                creastazione(stazioneid, data, infostazione, filtro);
            }
        })
        .catch(function(err) {
            loader.classList.remove("show");

            let html = document.createElement('div');
            html.classList.add("home");
            if (err.status == 404) {
                // fermata non raggiungibile
                html.innerHTML = '<p>La stazione richiesta <b>' + stazioneid + '</b> non è raggiungibile, controlla che il numero sia corretto prima di ricaricare la pagina</p>';
                console.log(err);
            } else {
                // errore generico
                html.innerHTML = '<p>Qualcosa è andato storto, prova a ricaricare e ad incrociare le dita. Giuro che di solito funziona!</p>';
                console.log(err);
            }
            home.appendChild(html);
            // handle your error logic here
        });
}

function ora() {
    let date = {};
    date.full = new Date();
    date.hr = date.full.getHours();
    date.min = date.full.getMinutes();
    if (date.min < 10) {
        date.min = "0" + date.min;
    }

    date.time = date.hr + ':' + date.min;

    return date;
}

function creafermata(id, info) {

    let singlefermata = document.querySelector('.fermata[data-id="' + id + '"]');

    let html = document.createElement('thead');

    html.innerHTML += "<th colspan='3' class='fermata-title'>" + id + " - " + info['Description'] + "</th>";
    html.innerHTML += "<tr><th class='numero'>#</th><th class='direzione'>Direzione</th><th class='orario'>Orario</th></tr>";

    singlefermata.appendChild(html);

    let html2 = document.createElement('tbody');
    let string = '';

    info['Lines'].forEach(function(linea) {
        string += "<tr class='linea'>";
        string += "<td class='numero'>" + linea['Line']['LineCode'] + "</td>";
        string += "<td class='direzione'>" + linea['Line']['LineDescription'].split(" - ").pop() + "</td>";
        string += "<td class='orario'>" + linea['WaitMessage'] + "</td>";
        string += "</tr>";
        html2.innerHTML = string;
    });

    singlefermata.appendChild(html2);

}

function creastazione(id, info, infostazione, filtro) {
    if (info[0]) { // se c'e' almeno una linea

        let singlestazione = document.querySelector('.stazione[data-id="' + id + '"]');

        let html = document.createElement('thead');

        html.innerHTML += "<th colspan='6' class='stazione-title'>" + id + " - " + infostazione.localita.nomeBreve + "</th>";
        html.innerHTML += "<tr><th class='numero'>#</th><th class='direzione'>Direzione</th><th class='orario'>Orario</th><th class='bin'>Bin</th><th class='ritardo'>Ritardo</th><th class='stato'>Stato</th></tr>";

        singlestazione.appendChild(html);

        let html2 = document.createElement('tbody');
        let string = '';

        info.forEach(function(linea) {
            if (linea.binarioEffettivoPartenzaDescrizione == null) linea.binarioEffettivoPartenzaDescrizione = '';

            if (filtro.length == 0 || filtro.some(filtrino => linea.destinazione.includes(filtrino.toUpperCase()))) {
                string += "<tr class='linea'>";
                string += "<td class='numero'>" + linea.categoria + ' ' + linea.numeroTreno + "</td>";
                string += "<td class='direzione'>" + linea.destinazione + "</td>";
                string += "<td class='orario'>" + linea.compOrarioPartenzaZeroEffettivo + "</td>";
                string += "<td class='binario'>" + linea.binarioEffettivoPartenzaDescrizione + "</td>";
                string += "<td class='ritardo'>" + linea.ritardo + " MIN</td>";
                string += "<td class='stato'>" + linea.compInStazionePartenza[0] + "</td>";
                string += "</tr>";
                html2.innerHTML = string;
            }
        });

        singlestazione.appendChild(html2);

    }
}

// API Treni
// http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/partenze/S01630/Mon%20Nov%2025%202019%2023:04:42%20GMT+0100%20(Ora%20standard%20dell%E2%80%99Europa%20centrale)
// http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/partenze/S01630/Mon Nov 25 2019 23:14:42 GMT+0100 (Ora standard dell%E2%80%99Europa centrale)
// http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/partenze/S01630/Tue Dec 17 2019 15:36:42 GMT+0100 (Ora standard dell'Europa centrale)

const search = document.querySelector('#search');
const tendina = document.querySelector('#tendina');

const escapeRegExp = (str) => // or better use 'escape-string-regexp' package
  str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")

const filterBy = (term) => {
    const re = new RegExp(escapeRegExp(term), 'i')
    return person => {
        for (let prop in person) {
            if (!person.hasOwnProperty(prop)) {
                continue;
            }
            if (re.test(person[prop])) {
                return true;
            }
        }
        return false;        
    }
}

function search_stazione() {
    var inputVal = this.value;
    
    if (inputVal.length > 2) {
        tendina.classList.remove("disable");
        // filtro in base all'input
        const search = elencostazioni.filter(filterBy(inputVal));
        console.log(search);
        // elimino tutta la tendina ad ogni nuova ricerca
        while( tendina.firstChild ){
            tendina.removeChild( tendina.firstChild );
        }
        // per ogni oggetto stampo id e nome stazione
        search.forEach(function(risultato) {
            let html = document.createElement('li');
            html.setAttribute("data-id", risultato.id);
            html.setAttribute("data-stazione", risultato.stazione);
            let string = risultato.stazione + ' - ';
            string += risultato.id;
            html.innerHTML = string;
            tendina.appendChild(html);
        })
        
    } else {
        tendina.classList.add("disable");
        // while( tendina.firstChild ){
        //     tendina.removeChild( tendina.firstChild );
        // }
    }

}

search.addEventListener("keyup", search_stazione);


// console.log('find: ', findIn(elencostazioni, '12345'));



setTimeout(() => {


}, 500);
