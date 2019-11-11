
let cors = 'https://cors-anywhere.herokuapp.com/';
let url = 'https://giromilano.atm.it/proxy.ashx';
let searchParams = new URLSearchParams(window.location.search);
let fermate = [];

if (searchParams.has('martina')) {
    // preimpostato per martina
    fermate.push(10204,10335,10337,10332,10326);
}
if (searchParams.has('quetz')) {
    // preimpostato per quetz
    fermate.push(11175,11176,10890,10893);
}
if (searchParams.has('fermate')) {
    // se ci sono le fermate specificate le tiro fuori
    // filtro solo i numeri dalla query
    let filter = searchParams.get('fermate').split(',');
    filter = filter.map(el => {
        let n = Number(el);
        return  isNaN(n) ? null : n;
    }).filter(function (el) {
        return el != null;
    });
    // unisco la query pulita alle eventuali fermate già raccolte
    fermate = fermate.concat(filter);
}

fermate.sort((a, b) => a - b);
console.log(fermate);

if (fermate.length == 0) {
    // se dopo tutto sto giro non ci sono comunque fermate creo la home vuota
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
    // se ci sono fermate le chiamo in ordine
    fermate.forEach(function(element) {
        console.log(element);
        chiamafermata(element, 'stops');
    });
}

function chiamafermata(fermataid, tipo) {
    // per aggiungere correttamente i form data alla richiesta
    var fd = new FormData();
    fd.append("url", "tpPortal/geodata/pois/" + tipo + "/" + fermataid);
    // creo i div per ospitare le fermate in ordine
    html = "<div class='fermata' data-id='" + fermataid + "'></div>";
    $('#fermate').append(html);
    $.ajax({
        type: "POST",
        url: cors + url,
        crossDomain: true,
        contentType: false,
        processData: false,
        data: fd,
        success: function (data) {
            // alla prima risposta tolgo il loader
            $('.loader').removeClass('show');
            // do something with server response data
            console.log(data);
            creafermata(fermataid, data);
        },
        error: function (err) {
            console.log(err);
            $('.loader').removeClass('show');            
            html = "<div class='home'>";
                html+= '<p>Qualcosa è andato storto, prova a ricaricare o a controllare che il numero delle fermate sia corretto</p>';
            html+= "</div>";
            $('#home').append(html);
            // handle your error logic here
        }
    });
}

function creafermata(id, info) {
    if (info['Lines'][0]) { // se c'e' almeno una linea
        html = "<span class='fermata-title'>" + info['Description'] + "</span>";
        info['Lines'].forEach(function(linea) {
            console.log(linea);
            html+= "<div class='linea'>";
            html+= "<span class='numero'>" + linea['Line']['LineCode'] + "</span> - ";
            html+= "<span class='direzione'>Direzione: " + linea['Line']['LineDescription'].split(" - ").pop() + "</span> - ";
            html+= "<span class='orario'>" + linea['WaitMessage'] + "</span>";
            html+= "</div>"
        });
        $('.fermata[data-id=' + id + ']').append(html);
    }
}