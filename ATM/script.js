const cors = 'https://cors-anywhere.herokuapp.com/';
var APIurl = {};
    APIurl.ATM = 'https://giromilano.atm.it/proxy.ashx';
    APIurl.FFSS = 'http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/';
var searchParams = new URLSearchParams(window.location.search);
var fermate = [];
var stazioni = [];

if (searchParams.has('martina')) {
    // preimpostato per martina
    fermate.push(10204,10335,10337,10332,10326);
    stazioni.push('S01630');
}
if (searchParams.has('quetz')) {
    // preimpostato per quetz
    fermate.push(11175,11176,10890,10893);
    //stazioni.push('S01630:saronno');
}
if (searchParams.has('fermate')) {
    // se ci sono delle fermate specificate le tiro fuori
    // il formato delle fermate è di 5 numeri - filtro solo i numeri dalla query
    let filter = searchParams.get('fermate').split(',');
    filter = filter.map(el => {
        let n = parseInt(el);
        return  isNaN(n) ? null : n;
    }).filter(function (el) {
        return el != null;
    });
    // unisco la query pulita alle eventuali fermate già raccolte
    fermate = fermate.concat(filter);
}
if (searchParams.has('stazioni')) {
    // se ci sono delle stazioni specificate le tiro fuori
    // il formato delle stazioni è questo - S01630
    let filter = searchParams.get('stazioni').split(',');
    
    filter = filter.filter(function (el) {
        return el != '';
    });

    // unisco la query pulita alle eventuali fermate già raccolte
    stazioni = stazioni.concat(filter);
}

fermate.sort((a, b) => a - b);
stazioni.sort();

// console.log(fermate);
// console.log(stazioni);

if (fermate.length == 0 && stazioni.length == 0) {
    // se dopo tutto sto giro non ci sono comunque fermate e stazioni creo la home vuota
    html = "<div class='home'>";
        html+= "<h1>Recupero orari bus, tram e treni</h1>";
        html+= "<div class='bg'><img class='tram-albero' src='img/albero.svg'><img class='tram-banchina' src='img/banchina.svg'><div class='tram-strada'></div><div class='tram'><img class='tram-body vibrate-1' src='img/tram-body.svg'><img class='tram-bg' src='img/tram-bg.svg'></div><div class='tram-filo'></div><img class='tram-albero front' src='img/albero.svg'><div class='tram-erba front'></div></div>";
        html+= "<h2>Come funziona per le fermate ATM</h2>";
        html+= '<p>Questo tool serve a recuperare i tempi di attesa delle fermate ATM specificate, per usarlo basta inserire nella url le fermate richieste usando la stringa "?fermate=10000,20000,30000" sostituendo i numeri con le fermate preferite, sempre separate da una virgola come questo link di esempio:</p>';
        html+= '<p><a href="?fermate=14187,14188">?fermate=14187,14188</a></p>';
        html+= '<blockquote>Il codice per le fermate ATM è sempre mostrato sulle banchine e sulle fermate, le metro non sono incluse</blockquote>';
        html+= "<h2>Come funziona per le stazioni Trenitalia e Trenord</h2>";
        html+= '<p>È possibile anche visualizzare il tabellone dei treni in partenza per le stazioni Trenitalia e Trenord, inserendo il codice univoco nella url usando questa stringa "?stazioni=10000,20000,30000", si possono filtrare ulteriormente i risultati inserendo la destinazione preferita dopo il codice della stazione in questo modo "?stazioni=10000:roma,20000:torino,30000":</p>';
        html+= '<p><a href="?stazioni=S01630,S01700:torino">?stazioni=S01630,S01700:torino</a></p>';
        html+= '<p>Ovviamente le due informazioni possono essere unite nella url usando il carattere & in questo modo "?fermate=10000,20000&stazioni=10000:roma,20000:torino,30000": </p>';
        html+= '<p><a href="?fermate=14187,14188&stazioni=S01630,S01700:torino">?fermate=14187,14188&stazioni=S01630,S01700:torino</a></p>';
        html+= '<blockquote>Il codice per le stazioni dei treni può essere recuperato <a target="_blank" href="https://github.com/sabas/trenitalia/blob/master/stazioni.tsv">in questo documento</a></blockquote>';
    html+= "</div>";
    $('#home').append(html);
} else {
    // prima di tutto mostro il loader
    $('.loader').addClass('show');
    // mi segno l'ora della chiamata
    let time = ora();
    // se ci sono fermate le chiamo in ordine
    if (fermate) {
        $('#fermate').attr("data-time",time.time);
        fermate.forEach(function(fermata) {
            chiamafermata(fermata, 'stops');
        });
    }
    if (stazioni) {
        $('#stazioni').attr("data-time",time.time);
        stazioni.forEach(function(stazione) {
            if (stazione.includes(":")) {
                var stazionefiltro = stazione.split(":").pop();
                stazione = stazione.split(":").shift();
            }
            chiamastazione(stazione, time, stazionefiltro);
        });
    }
}

function chiamafermata(fermataid, tipo) {
    // per aggiungere correttamente i form data alla richiesta
    let fd = new FormData();
    fd.append("url", "tpPortal/geodata/pois/" + tipo + "/" + fermataid);
    // creo i div per ospitare le fermate in ordine
    html = "<table class='fermata' data-id='" + fermataid + "'></table>";
    $('#fermate').append(html);
    $.ajax({
        type: "POST",
        url: cors + APIurl.ATM,
        crossDomain: true,
        contentType: false,
        processData: false,
        data: fd,
        success: function (data) {
            if (data['Lines'].length > 0) {
                // alla prima risposta tolgo il loader
                $('.loader').removeClass('show');
                $('#fermate').addClass('ready');
                // do something with server response data
                creafermata(fermataid, data);
            }

        },
        error: function (err) {
            $('.loader').removeClass('show');
            html = "<div class='home'>";
            if(err.status == 404) {
                // fermata non raggiungibile
                html+= '<p>La fermata richiesta <b>' + fermataid + '</b> non è raggiungibile, controlla che il numero sia corretto prima di ricaricare la pagina</p>';
            } else {
                // errore generico
                html+= '<p>Qualcosa è andato storto, prova a ricaricare e ad incrociare le dita. Giuro che di solito funziona!</p>';
            }
            html+= "</div>";
            $('#home').append(html);
            // handle your error logic here
        }
    });
}
function chiamastazione(stazioneid, date, filtro) {
    html = "<table class='stazione' data-id='" + stazioneid + "'></tables>";
    $('#stazioni').append(html);
    // http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/dettaglioStazione/S01700/1
    $.ajax({
        type: "GET",
        url: cors + APIurl.FFSS + 'dettaglioStazione/' + stazioneid + '/1',
        success: function (data) {
            // do something with server response data
            chiamapartenze(stazioneid, date, data, filtro);
        },
        error: function (err) {
            $('.loader').removeClass('show');
            html = "<div class='home'>";
            if(err.status == 404) {
                // fermata non raggiungibile
                html+= '<p>La stazione richiesta <b>' + stazioneid + '</b> non è raggiungibile, controlla che il numero sia corretto prima di ricaricare la pagina</p>';
            } else {
                // errore generico
                html+= '<p>Qualcosa è andato storto, prova a ricaricare e ad incrociare le dita. Giuro che di solito funziona!</p>';
            }
            html+= "</div>";
            $('#home').append(html);
            // handle your error logic here
        }
    });
}
function chiamapartenze(stazioneid, date, infostazione, filtro) {
    $.ajax({
        type: "GET",
        url: cors + APIurl.FFSS + 'partenze/' + stazioneid + '/' + date.full,
        success: function (data) {
            if (data.length > 0) {
                // alla prima risposta tolgo il loader
                $('.loader').removeClass('show');
                $('#stazioni').addClass('ready');
                // do something with server response data
                creastazione(stazioneid, data, infostazione, filtro);
            }
        },
        error: function (err) {
            $('.loader').removeClass('show');
            html = "<div class='home'>";
            if(err.status == 404) {
                // fermata non raggiungibile
                html+= '<p>La stazione richiesta <b>' + stazioneid + '</b> non è raggiungibile, controlla che il numero sia corretto prima di ricaricare la pagina</p>';
            } else {
                // errore generico
                html+= '<p>Qualcosa è andato storto, prova a ricaricare e ad incrociare le dita. Giuro che di solito funziona!</p>';
            }
            html+= "</div>";
            $('#home').append(html);
            // handle your error logic here
        }
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
    html = "<thead>";
    html += "<th colspan='3' class='fermata-title'>" + id + " - " + info['Description'] + "</th>";
    html += "<tr><th class='numero'>#</th><th class='direzione'>Direzione</th><th class='orario'>Orario</th></tr>";
    html += "</thead>";
    html += "<tbody>";
    info['Lines'].forEach(function(linea) {
        html+= "<tr class='linea'>";
        html+= "<td class='numero'>" + linea['Line']['LineCode'] + "</td>";
        html+= "<td class='direzione'>" + linea['Line']['LineDescription'].split(" - ").pop() + "</td>";
        html+= "<td class='orario'>" + linea['WaitMessage'] + "</td>";
        html+= "</tr>";
    });
    html+= "</tbody>";
    $('.fermata[data-id=' + id + ']').append(html);
}

function creastazione(id, info, infostazione, filtro) {
    if (info[0]) { // se c'e' almeno una linea
        html = "<thead>";
        html += "<th colspan='6' class='stazione-title'>" + id + " - " + infostazione.localita.nomeBreve + "</th>";
        html += "<tr><th class='numero'>#</th><th class='direzione'>Direzione</th><th class='orario'>Orario</th><th class='ritardo'>Ritardo</th><th class='stato'>Stato</th></tr>";
        html += "</thead>";
        html += "<tbody>";
        info.forEach(function(linea) {

            if (!filtro) {
                // scrivo un filtro vuoto se è undefined
                filtro = '';
            }

            if (linea.destinazione.includes(filtro.toUpperCase())) {
                html+= "<tr class='linea'>";
                html+= "<td class='numero'>" + linea.categoria + ' ' +  linea.numeroTreno + "</td>";
                html+= "<td class='direzione'>" + linea.destinazione + "</td>";
                html+= "<td class='orario'>" + linea.compOrarioPartenzaZeroEffettivo + "</td>";
                html+= "<td class='ritardo'>" + linea.ritardo + " MIN</td>";
                html+= "<td class='stato'>" + linea.compInStazionePartenza[0] + "</td>";
                html+= "</tr>";
            }
        });
        html+= "</tbody>";
        $('.stazione[data-id=' + id + ']').append(html);
    }
}

function chiamatreno(stazioneid) {
    
}

// API Treni
// http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/partenze/S01630/Mon%20Nov%2025%202019%2023:04:42%20GMT+0100%20(Ora%20standard%20dell%E2%80%99Europa%20centrale)
// http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/partenze/S01630/Mon Nov 25 2019 23:14:42 GMT+0100 (Ora standard dell%E2%80%99Europa centrale)