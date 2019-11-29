let cors = 'https://cors-anywhere.herokuapp.com/';
let APIurl = {};
    APIurl.ATM = 'https://giromilano.atm.it/proxy.ashx';
    APIurl.FFSS = 'http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/';
let searchParams = new URLSearchParams(window.location.search);
let fermate = [];
let stazioni = [];

if (searchParams.has('martina')) {
    // preimpostato per martina
    fermate.push(10204,10335,10337,10332,10326);
}
if (searchParams.has('quetz')) {
    // preimpostato per quetz
    fermate.push(11175,11176,10890,10893);
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

console.log(fermate);
console.log(stazioni);

if (fermate.length == 0 && stazioni.length == 0) {
    // se dopo tutto sto giro non ci sono comunque fermate e stazioni creo la home vuota
    html = "<div class='home'>";
        html+= "<h1>Fermate ATM</h1>";
        html+= "<h2>Come funziona</h2>";
        html+= '<p>Questo tool serve a recuperare i tempi di attesa nelle fermate specificate, per usarlo basta inserire nella url le fermate richieste usando la stringa "?fermate=10000,20000,30000" sostituendo i numeri con le fermate preferite, sempre separate da una virgola come questo link di esempio:</p>';
        html+= '<p><a href="?fermate=14187,14188">?fermate=14187,14188</a></p>';
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
        console.log('stazioni');
        stazioni.forEach(function(stazione) {
            chiamastazione(stazione, time);
        });
    }
}

function chiamafermata(fermataid, tipo) {
    // per aggiungere correttamente i form data alla richiesta
    let fd = new FormData();
    fd.append("url", "tpPortal/geodata/pois/" + tipo + "/" + fermataid);
    // creo i div per ospitare le fermate in ordine
    html = "<div class='fermata' data-id='" + fermataid + "'></div>";
    $('#fermate').append(html);
    $.ajax({
        type: "POST",
        url: cors + APIurl.ATM,
        crossDomain: true,
        contentType: false,
        processData: false,
        data: fd,
        success: function (data) {
            // alla prima risposta tolgo il loader
            $('.loader').removeClass('show');
            $('#fermate').addClass('ready');
            // do something with server response data
            creafermata(fermataid, data);
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
function chiamastazione(stazioneid, date) {
    html = "<div class='stazione' data-id='" + stazioneid + "'></div>";
    $('#stazioni').append(html);
    // http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/dettaglioStazione/S01700/1
    $.ajax({
        type: "GET",
        url: cors + APIurl.FFSS + 'dettaglioStazione/' + stazioneid + '/1',
        success: function (data) {
            // do something with server response data
            chiamapartenze(stazioneid, date, data);
            console.log(data);
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
function chiamapartenze(stazioneid, date, infostazione) {
    $.ajax({
        type: "GET",
        url: cors + APIurl.FFSS + 'partenze/' + stazioneid + '/' + date.full,
        success: function (data) {
            // alla prima risposta tolgo il loader
            $('.loader').removeClass('show');
            $('#stazioni').addClass('ready');
            // do something with server response data
            creastazione(stazioneid, data, infostazione);
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
    if (info['Lines'][0]) { // se c'e' almeno una linea
        html = "<span class='fermata-title'>" + info['Description'] + "</span>";
        info['Lines'].forEach(function(linea) {
            html+= "<div class='linea'>";
            html+= "<span class='numero'>" + linea['Line']['LineCode'] + "</span> - ";
            html+= "<span class='direzione'>Direzione: " + linea['Line']['LineDescription'].split(" - ").pop() + "</span> - ";
            html+= "<span class='orario'>" + linea['WaitMessage'] + "</span>";
            html+= "</div>"
        });
        $('.fermata[data-id=' + id + ']').append(html);
    }
}

function creastazione(id, info, infostazione) {
    console.log(info);
    console.log(infostazione.localita.nomeBreve);
    
    if (info[0]) { // se c'e' almeno una linea
        html = "<span class='stazione-title'>" + infostazione.localita.nomeBreve + "</span>";
        info.forEach(function(linea) {
            html+= "<div class='linea'>";
            html+= "<span class='numero'>" + linea.categoria + ' ' +  linea.numeroTreno + "</span> - ";
            html+= "<span class='direzione'>Direzione: " + linea.destinazione + "</span> - ";
            html+= "<span class='orario'>" + linea.compOrarioPartenzaZeroEffettivo + "</span> - ";
            html+= "<span class='orario'>Ritardo: " + linea.ritardo + " MIN</span> - ";
            html+= "<span class='orario'>" + linea.compInStazionePartenza[0] + "</span>";
            html+= "</div>"
        });
        $('.stazione[data-id=' + id + ']').append(html);
    }
}

function chiamatreno(stazioneid) {
    
}

// API Treni
// http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/partenze/S01630/Mon%20Nov%2025%202019%2023:04:42%20GMT+0100%20(Ora%20standard%20dell%E2%80%99Europa%20centrale)
// http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/partenze/S01630/Mon Nov 25 2019 23:14:42 GMT+0100 (Ora standard dell%E2%80%99Europa centrale)