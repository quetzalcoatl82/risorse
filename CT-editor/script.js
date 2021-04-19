// const cors = 'https://api.codetabs.com/v1/proxy?quest=';
const cors = 'https://cors-anywhere.console-tribe.workers.dev/?';

var insta_share = {};
var feed = {};

var canvasfinal = '';

var form = document.querySelector('.campi-aggiuntivi');
var form_cat = document.querySelector('.cat');
var form_gioco = document.querySelector('.gioco');
var form_voto = document.querySelector('.voto');
var form_titolo = document.querySelector('.titolo');
var form_image = document.querySelector('.img');
var form_button = document.querySelector('.submit');
var save_button = document.querySelector('.savebutton');

document.querySelector('.cat-select').addEventListener('change', function() {
    // ogni volta che cambio value faccio partire la catena di ricerca post dal feed e svuoto la seconda tendina
    let secondSelect = document.querySelector('.second-select');
    secondSelect.innerHTML = '';
    form.classList.add("hide");
    if (this.value) {
        let feedvar = '';
        if (this.value != 'last') {
            feedvar = this.value + '/';
        }
        var feedlink = 'https://console-tribe.com/' + feedvar + 'feed/';
        do_fetch(feedlink, 'text', createHtml);
    }
});

function do_fetch(url, type='json', then_function=log) {
    // funzione generica per fare fetch
    fetch(cors + url,{
        method: 'POST',
        })
        .then(response => response[type]())
        .then(data => then_function(data))
        .catch(err => console.warn('Something went wrong.', err))
}  

function log(log) {
    console.log(log);
}

function createHtml(html) {
    // funzione generica per generare pagine virtuali dopo che le ho fetchate
    if (html) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');
        getPostData(doc);
    }
}

function getPostData(doc) {
    // qui elaboro le pagine virtuali in modi diversi se vengono dal feed o dal sito normale
    log(doc);
    feed.present = doc.querySelector('body rss');
    if (feed.present) {
        feed.link = {};
        feed.title = {};
        feed.list = doc.querySelectorAll('item link');
        feed.listtit = doc.querySelectorAll('item title');
        Object.entries(feed.list).forEach( 
            ([key, value]) => feed.link[key] = value.nextSibling.data
        )
        Object.entries(feed.listtit).forEach( 
            ([key, value]) => feed.title[key] = value.innerText
        )
        listAllLink(feed);
    } else {
        insta_share.imageurl = doc.querySelector('.featured-image figure img').src;
        insta_share.cat = doc.querySelector('.tag-related a[rel="category tag"]').textContent;
        insta_share.game = doc.querySelector('.tag-related a:not([rel])');
        if (insta_share.game) {
            insta_share.game = doc.querySelector('.tag-related a:not([rel])').textContent;
        } else {
            insta_share.game = '';
        }
        insta_share.voto = doc.querySelector('.box-cont .cover-voto');
        insta_share.title = doc.querySelector('.entry-title.single-title').textContent;
        
        if (insta_share.voto) {
            insta_share.voto = doc.querySelector('.box-cont .cover-voto').textContent;
        }
        // qui ho tutto per creare un canvas con le info
        log(insta_share );
        populateField(insta_share);
    }
}

function listAllLink(feed) {
    // elaboro la lista di titoli e link provenienti dal feed per fare la seconda tendina
    if (feed.link) {
        let secondSelect = document.querySelector('.second-select');
        let cont = document.createElement("select");
        secondSelect.appendChild(cont);
        secondSelect = document.querySelector('.second-select select');
        // creo option vuota iniziale
        let node = document.createElement("option");                 
        secondSelect.appendChild(node);
        Object.entries(feed.link).forEach(
            ([key, value]) => {
                node = document.createElement("option");
                node.setAttribute("value", value);
                textnode = document.createTextNode(feed.title[key]);
                node.appendChild(textnode);
                secondSelect.appendChild(node);
            }
        )
        document.querySelector('.second-select select').addEventListener('change', function() {
            form.classList.add("hide");
            // arrivati a questo punto possiamo selezionare un articolo dalla seconda tendina
            if (this.value) {
                do_fetch(this.value, 'text', createHtml);
            }
        });
    }
}

function populateField(insta_share) {
    // mostro il canvas
    form.classList.remove("hide");
    // popolo i valori recuperati
    form_cat.value = insta_share.cat;
    form_gioco.value = insta_share.game;
    form_voto.value = insta_share.voto;
    form_titolo.value = insta_share.title;
    form_image.value = insta_share.imageurl;
    // mando un evento di submit coi valori presi automaticamente
    form_button.click(); // Click on the checkbox
}

function handleForm(event) {
    // a ogni submit faccio il canvas così posso cambiare i valori dopo la prima volta
    event.preventDefault();
    let newobject =  {imageurl: form_image.value, cat: form_cat.value, game: form_gioco.value, voto: form_voto.value, title: form_titolo.value}
    initCanvas(newobject);
}
// mi attacco all'evento per disegnare il canvas
form.addEventListener('submit', handleForm);

var fakeobject =  {imageurl: "https://console-tribe.com/wp-content/uploads/2020/12/Cyberpunk-2077-is-here.png", cat: "Recensione", game: "Titolo lunghissimo che guarda non so neanche se i giochi Capcom hanno dei titoli così lunghi", voto: "80", title: "Atelier Ryza 2: Lost Legends & The Secret Fairy Atelier Ryza 2: Lost Legends & The Secret Fairy - Recensione"}

// parte canvas

function initCanvas(postData) {
    // creo il canvas finale    
    canvasfinal = document.querySelector('.final-canvas');
    var ctxfinal = canvasfinal.getContext('2d');

    let margin = 50;
    let logosize = 120;
    let fontsize = 60;
    let fontsizegame = 60;
    let fontsizetitle = 60;
    let fontstylegame = 'Open Sans Condensed';
    let fontstyletitle = 'Open Sans';
    let safewidthgame = canvasfinal.width - (margin * 2) - (logosize * 2) - (logosize / 2);
    let safewidthtitle = canvasfinal.width - (margin * 2);
    let titlemarginbottom = 0;

    ctxfinal.font = "700 " + fontsize + "px Open Sans Condensed";
    
    let textHeight = ctxfinal.measureText('Pq');
    textHeight = textHeight.actualBoundingBoxAscent + textHeight.actualBoundingBoxDescent + (margin / 2);

    // carico l'immagine bg
    var img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');

    img.addEventListener("load", function(){

        // mostro il canvas finale con il bg ridimensionato
        drowImageFill(canvasfinal, ctxfinal, img);

        // Creo il gradiente
        var grd = ctxfinal.createLinearGradient(0, canvasfinal.height * 1.1, 0, canvasfinal.height/5);
        grd.addColorStop(0, "black");
        grd.addColorStop(1, "transparent");

        // inserisco il gradiente nel canvas
        ctxfinal.fillStyle = grd;
        ctxfinal.fillRect(0, 0, canvasfinal.width, canvasfinal.height);

        let imglogo = new Image();
        imglogo.setAttribute('crossOrigin', 'anonymous');
        // misuro il nome del gioco e se non ci sta abbasso la font size in un ciclo for fino a che non riesco a mettercelo

        let gametitle = twolines(postData.game, safewidthgame, fontsizegame, fontstylegame);        
        let realtitle = twolines(postData.title, safewidthtitle, fontsizetitle, fontstyletitle);

        imglogo.addEventListener("load", function(){
            // style font generico
            ctxfinal.textAlign = "center";
            ctxfinal.fillStyle = '#FFF';
            ctxfinal.font = "700 " + realtitle.fontsize + "px Open Sans";

            if (postData.title && !postData.voto) {
                // faccio il titolo solo se non c'è il voto
                titlemarginbottom = textHeight + (margin / 3);
                // se c'è un titolo
                ctxfinal.fillText(
                    realtitle.string,
                    canvasfinal.width / 2,
                    canvasfinal.height - margin - realtitle.textheight
                );
                if (realtitle.string2) {
                    titlemarginbottom = (realtitle.textheight * 2) + (margin / 3);
                    // se siamo andati a capo scrivo 
                    ctxfinal.fillText(
                        realtitle.string2,
                        canvasfinal.width / 2,
                        canvasfinal.height - margin
                    );
                }
            }

            // mi assicuro che si sia caricato il logo
            ctxfinal.drawImage(
                imglogo,
                margin,
                canvasfinal.height - margin - logosize - titlemarginbottom,
                logosize,
                logosize
            );

            // titolo gioco

            ctxfinal.font = "700 " + gametitle.fontsize + "px Open Sans Condensed";
            if (gametitle.string2) {
            // se siamo andati a capo scrivo 
                ctxfinal.fillText(
                    gametitle.string2,
                    canvasfinal.width / 2,
                    canvasfinal.height - margin - titlemarginbottom
                );
            }
            ctxfinal.fillText(
                gametitle.string,
                canvasfinal.width / 2,
                canvasfinal.height - margin - gametitle.textheight - titlemarginbottom
            );

            if (gametitle.string2) {
                gametitle.textheight = gametitle.textheight * 2;
            } else {
                gametitle.textheight = textHeight;
            }
            // categoria
            ctxfinal.font = "700 50px Open Sans Condensed";
            ctxfinal.fillText(
                postData.cat.toUpperCase(),
                canvasfinal.width / 2,
                canvasfinal.height - margin - gametitle.textheight - (margin / 8) - titlemarginbottom
            );


            if (postData.voto) {
                // cerchio del voto
                ctxfinal.beginPath();
                ctxfinal.arc(
                    canvasfinal.width - logosize / 2 - margin,
                    canvasfinal.height - margin - (logosize / 2) - titlemarginbottom,
                    logosize / 2, 0, 2 * Math.PI
                );

                ctxfinal.strokeStyle = '#f18f2a';
                ctxfinal.lineWidth = 10;
                ctxfinal.stroke();

                // scrivo il voto
                ctxfinal.textAlign = "left";
                ctxfinal.font = "700 85px Open Sans Condensed";
                if (postData.voto == 100) {
                    ctxfinal.font = "700 65px Open Sans Condensed";
                } 
                let metrics = ctxfinal.measureText(postData.voto);
                let actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
                ctxfinal.fillText(  postData.voto,
                                    canvasfinal.width - margin - metrics.width/2 - logosize/2, 
                                    canvasfinal.height - margin - (logosize/2 - actualHeight/2) - titlemarginbottom
                                );                
            }
            

            // per il salvataggio automatico

            // var link = document.createElement('a');
            // var currentTime = new Date();
            // link.download = 'Social Share Insta ' + currentTime;
            // link.href = canvasfinal.toDataURL("image/jpeg",0.80);
            // link.click();

            save_button.classList.remove("hide");

        })
        imglogo.src = 'img/logo-flat.png';
    })
    // https://images.console-tribe.com/wp-content/uploads/2020/09/Tony-hawks-pro-skater-1-and-2-1280x720.jpg
    // https://console-tribe-wp.s3.eu-central-003.backblazeb2.com/wp-content/uploads/2020/09/Tony-hawks-pro-skater-1-and-2-1280x720.jpg
    postData.imageurl = postData.imageurl.replace("https://images.console-tribe.com", "https://console-tribe-wp.s3.eu-central-003.backblazeb2.com");

    img.src = cors + postData.imageurl;
    // img.src = cors + 'https://upload.wikimedia.org/wikipedia/commons/9/91/F-15_vertical_deploy.jpg';

    function twolines(string, safewidth, font, style) {
        // da questa funzione ricavo una o due linee, conseguente altezza del testo e fontsize da stampare
        let obj = {
            string : string,
            fontsize: font,
            textheight: 0
        };
        // funzione ripetibile per mettere su due righe le cose
        ctxfinal.font = "700 " + font + "px " + style;
        let textwidth = ctxfinal.measureText(string).width;
    
        if (textwidth > safewidth) {
            // prima di tutto spezzo la frase in due
            let arraysplit = splitter(string);
            log(arraysplit);
            let textwidth1 = ctxfinal.measureText(arraysplit[0]);
            let height = textwidth1.actualBoundingBoxAscent + textwidth1.actualBoundingBoxDescent + (margin / 5);
            textwidth1 = textwidth1.width;
            let textwidth2 = ctxfinal.measureText(arraysplit[1]).width;
    
            for (let index = 0; (textwidth1 > safewidth || textwidth2 > safewidth); index++) {
                // diminuisco il font size fino a che non ci sta
                font--;
                ctxfinal.font = "700 " + font + "px " + style;
                textwidth1 = ctxfinal.measureText(arraysplit[0]);
                height = textwidth1.actualBoundingBoxAscent + textwidth1.actualBoundingBoxDescent + (margin / 4);
                textwidth1 = textwidth1.width;
                textwidth2 = ctxfinal.measureText(arraysplit[1]).width;
            }
            obj.string = arraysplit[0];
            obj.string2 = arraysplit[1];
            obj.fontsize = font;
            obj.textheight = height;
        }
        return obj;
    }

    save_button.addEventListener('click', savebutton);

    function savebutton(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        let link = document.createElement('a');
        let currentTime = new Date();
        link.download = 'Social Share Insta ' + currentTime;
        link.href = canvasfinal.toDataURL("image/jpeg",0.80);
        link.click();
        link = '';
    }
}

function splitter(string) {

    let middle = Math.floor(string.length / 2);
    let before = string.lastIndexOf(' ', middle);
    let after = string.indexOf(' ', middle + 1);

    if (before == -1 || (after != -1 && middle - before >= after - middle)) {
        middle = after;
    } else {
        middle = before;
    }

    let string1 = string.substr(0, middle);
    let string2 = string.substr(middle + 1);

    return arraystring = [string1, string2];

    // $('.t1').text(s1);
    // $('.t2').text(s2);
}

function drowImageFill(canvas, ctx, img){
    // calcola la ratio della foto e forza un resize delle dimensioni del canvas mettendola al centro
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //detect closet value to canvas edges
    if( img.height / img.width * canvas.width > canvas.height) {
    	// fill based on less image section loss if width matched
        var width = canvas.width;
        var height = img.height / img.width * width;
        offset = (height - canvas.height) / 2;
        ctx.drawImage(img, 0, -offset, width, height);
    } else {
        // fill based on less image section loss if height matched
        var height = canvas.height;
        var width = img.width / img.height * height;
        offset = (width - canvas.width) / 2;
        ctx.drawImage(img, -offset , 0, width, height);
    }
}

