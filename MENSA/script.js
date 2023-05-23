// calcolo la data unix e il giorno della settimana attuale
let unixtime = Math.round(+new Date()/1000);
let today = new Date().getDay();

const cors = 'https://thingproxy.freeboard.io/fetch/';
let url = 'https://mondadori.pellegrinicloud.it/menu/'+ unixtime + '/0/368';
let welnessurl = 'https://mondadori.pellegrinicloud.it/menu/'+ unixtime + '/0/370';
// inizializzo l'array che conterrà il menu

console.log(url);
// recupero i menù

chiamatamenu(url);
chiamatamenu(welnessurl);

function chiamatamenu(link) {
    let menu = [];
    // chiamo la pagina e faccio scraping delle info
    // stampa a schermo direttamente in menu
    fetch(cors + link, {
            method: 'GET'
        })
        .then(response => response.text())
        .then(function(data) {
            // console.log(data);
            getinfo(data);
            // arrivati a questo punto abbiamo tutto il menu del giorno
            // console.log(menu);
            // console.log(menuwelness);
            stampomenu(menu);
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

    function stampomenu(menu) {
        // menu è un array che contiene un oggetto per ogni piatto
        // stampo i risultati
        const home = document.querySelector('#home');
        let html = document.createElement('div');
        html.classList.add('home');

        let string = '';
        menu.forEach(function(piatto) {
            string += '<a class="piatto" href="' + piatto.url + '" data-nome="' + piatto.nome + '" data-tipo="' + piatto.tipo + '">';
            string += piatto.nome;
            string += '<img src="' + piatto.img + '"/>';
            string += '</a>';
        })
        html.innerHTML = string;
        home.appendChild(html);
    }
}


