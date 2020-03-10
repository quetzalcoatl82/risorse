// calcolo la data unix e il giorno della settimana attuale
let unixtime = Math.round(+new Date()/1000);
let today = new Date().getDay();

const cors = 'https://cors-anywhere.herokuapp.com/';
let url = 'https://mondadori.pellegrinicloud.it/menu/'+ unixtime + '/0/368/3';
// inizializzo l'array che conterrà il menu
let menu = [];

console.log(url);

fetch(cors + url, {
        method: 'GET'
    })
    .then(response => response.text())
    .then(function(data) {
        // console.log(data);
        getinfo(data);
        // arrivati a questo punto abbiamo tutto il menu del giorno
        console.log(menu);

        // stampo i risultati
        const home = document.querySelector('#home');
        let html = document.createElement('div');
        let string = '';
        menu.forEach(function(piatto) {
            string += '<a href="' + piatto.url + '">';
            string += piatto.nome;
            string += '<img src="' + piatto.img + '"/>';
            string += piatto.tipo;
            string += '</br>';
        })
        html.innerHTML = string;
        home.appendChild(html);
    })
    .catch(function(err) {
        console.log(err);
    });

// console.log(cors);

function getinfo(body) {
    // creo html virtuale dalla chiamata GET per cercare nel dom
    let cachedEl = document.createElement('html');
    cachedEl.innerHTML = body;
    // isolo le portate
    let portate = cachedEl.querySelectorAll(".tabella_menu_settimanale td");    
    portate.forEach(portata);
    function portata(index) {
        let piatti = index.querySelectorAll(".piatto_inline");
        index.dataset.giorno;
        index.dataset["tipo-piatto"];
        let tipopiatto = index.getAttribute("data-tipo-piatto");
        let giornopiatto = index.dataset.giorno;
        // isolo i singoli piatti
        piatti.forEach(singolopiatto);
        function singolopiatto(index, value) {
            if (giornopiatto == today) {
                // prendo solo i piatti del giorno
                piatto = {};
                piatto.nome = index.querySelector("a.cbp-singlePage img").alt;
                piatto.tipo = tipopiatto;
                piatto.giorno = giornopiatto;
                piatto.url = index.querySelector("a.cbp-singlePage").href;
                piatto.img = index.querySelector("a.cbp-singlePage img").src;
                // console.log(piatto);
                // salvo tutto come un array di oggetti
                menu.push(piatto);
            }
        }
    }
}

