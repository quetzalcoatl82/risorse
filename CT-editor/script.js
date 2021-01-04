// const cors = 'https://cors-anywhere.herokuapp.com/';
// const cors = 'https://test.cors.workers.dev/?';
const cors = 'https://api.codetabs.com/v1/proxy?quest=';
var insta_share = {};
var feed = {};

document.querySelector('.cat-select').addEventListener('change', function() {
    // ogni volta che cambio value faccio partire la catena di ricerca post dal feed e svuoto la seconda tendina
    let secondSelect = document.querySelector('.second-select');
    secondSelect.innerHTML = '';
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
    fetch('https://no-cors-single.console-tribe.workers.dev/?' + url,{
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
        insta_share.game = doc.querySelector('.tag-related a:not([rel])').textContent;
        insta_share.voto = doc.querySelector('.box-cont .cover-voto');
        insta_share.title = doc.querySelector('.entry-title.single-title').textContent;
        
        if (insta_share.voto) {
            insta_share.voto = doc.querySelector('.box-cont .cover-voto').textContent;
        }
        // qui ho tutto per creare un canvas con le info
        log(insta_share );
        initCanvas(insta_share);
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
            // arrivati a questo punto possiamo selezionare un articolo dalla seconda tendina
            if (this.value) {
                do_fetch(this.value, 'text', createHtml);
            }
        });
    }
}

var fakeobject =  {imageurl: "https://console-tribe.com/wp-content/uploads/2020/12/Cyberpunk-2077-is-here.png", cat: "Recensione", game: "Cyberpunk 2077", voto: "80", title: "Cyberpunk 2077 - Recensione"}

// parte canvas

function initCanvas(postData) {
    // creo il canvas finale    
    var canvasfinal = document.querySelector('.final-canvas');
    var ctxfinal = canvasfinal.getContext('2d');
    // carico l'immagine bg
    var img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');

    img.addEventListener("load", function(){
        let margin = 50;
        let logosize = 120;
        let fontsize = 60;
        let safewidthgame = canvasfinal.width - (margin * 2) - (logosize * 2) - (logosize / 2);

        ctxfinal.font = "700 " + fontsize + "px Open Sans Condensed";

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
        // misuro il nome del gioco in un ciclo for e abbasso la font size fino a che non riesco a mettercelo
        let textwidth = ctxfinal.measureText(postData.game).width;

            for (let index = 0; textwidth > safewidthgame; index++) {
                fontsize--;
                ctxfinal.font = "700 " + fontsize + "px Open Sans Condensed";
                textwidth = ctxfinal.measureText(postData.game).width;
            }

        imglogo.addEventListener("load", function(){
            // mi assicuro che si sia caricato il logo
            ctxfinal.drawImage(imglogo, margin, canvasfinal.height - margin - logosize, logosize, logosize);
            // dopo il logo faccio il cerchio del voto
            ctxfinal.beginPath();
            ctxfinal.arc(canvasfinal.width - logosize / 2 - margin, canvasfinal.height - margin - logosize / 2, logosize / 2, 0, 2 * Math.PI);

            ctxfinal.strokeStyle = '#f18f2a';
            ctxfinal.lineWidth = 10;
            ctxfinal.stroke();

            // titolo
            ctxfinal.fillStyle = '#FFF';
            ctxfinal.fillText(postData.game, margin + logosize + logosize / 4, canvasfinal.height - margin);
            // categoria
            ctxfinal.font = "700 50px Open Sans Condensed";
            ctxfinal.fillText(postData.cat.toUpperCase(), margin + logosize + logosize / 4, canvasfinal.height - margin - logosize + logosize / 3);
            // voto
            ctxfinal.font = "700 85px Open Sans Condensed";
            if (postData.voto == 100) {
                ctxfinal.font = "700 65px Open Sans Condensed";
            } 
            let metrics = ctxfinal.measureText(postData.voto);
            let actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
            ctxfinal.fillText(  postData.voto,
                                canvasfinal.width - margin - metrics.width/2 - logosize/2, 
                                canvasfinal.height - margin - (logosize/2 - actualHeight/2)
                            );
            // per il salvataggio
            var link = document.createElement('a');
            var currentTime = new Date();
            link.download = 'Social Share Insta ' + currentTime;
            link.href = canvasfinal.toDataURL("image/jpeg",0.80);
            link.click();
            // link.touchstart();
        })
        imglogo.src = 'img/logo-flat.png';
    })

    img.src = cors + postData.imageurl;
    // img.src = cors + 'https://upload.wikimedia.org/wikipedia/commons/9/91/F-15_vertical_deploy.jpg';
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



// // global
// var margintop = 0;
// var marginbottom = 0;
// // text options
// var textcolor = '#FFF';
// var textlinejoin = 'bevel';
// var textstroke = '#000';
// var textstrokewidth = 15; // il valore per cui dividere la size per calcolare l'ampiezza dello stroke
// var textsize = 50;
// var bgcolor = "#f18f2a";
// var fontweight = '700';
// var fontstyle = 'Open Sans Condensed';
// // Logo
// var bglogocolor = '#3d3c3f';
// // la lineheight è la larghezza di un carattere standard, di solito M o Mi per i font più condensati
// var lineheightchar = 'Nii';

// var imageLoader = document.getElementById('image');
//     imageLoader.addEventListener('change', loadImagePC, false);

// var imageLoader2 = document.getElementById('image-button');
//     imageLoader2.addEventListener('click', getImage, false);

// var canvas = document.getElementById('image-upload-canvas');
// var ctx = canvas.getContext('2d');
// // canvas con l'immagine da sola
// var canvasimg = document.createElement('canvas');
// var ctximg = canvasimg.getContext('2d');
// // canvas con il logo
// var logocanvas = document.getElementById('logo-canvas');
// var logoctx = logocanvas.getContext('2d');
// // canvas di testo
// // http://stackoverflow.com/questions/22296699/jaggies-text-when-filltext-in-canvas-in-chrome
// var canvas2 = document.getElementById('text-canvas');
// var ctx2 = canvas2.getContext('2d');

// var canvas3 = document.getElementById('text-canvas-bottom');
// var ctx3 = canvas3.getContext('2d');

// var canvasfinal = document.getElementById('result');
// var ctxfinal = canvasfinal.getContext('2d');

// // CANVAS DI TESTO CHE SI AGGIORNA SCRIVENDO

// var fontsizediv = document.getElementById('fontsize');

// fontsizediv.onchange=function(){
//   console.log('cambaito');
//   // riscrivo fontsize
//   textsize = fontsizediv.options[fontsizediv.selectedIndex].value;
//   $('#top-content').keyup();
//   $('#bottom-content').keyup();

// };

// function resizec1(h, lineHeight, pos){
//   // canvas temporaneo dove mettere l'immagine modificata con la nuova altezza
//   if (pos == 'bottom') { // definisco le globali per i margini sopra e sotto
//     marginbottom = h + (lineHeight / 3); 
//   } else if (pos == 'top') { // metto in conto l'altezza del logo
//     margintop = h + (lineHeight / 3);
//   }
//   var temp_cnvs = document.createElement('canvas');
//   var temp_cntx = temp_cnvs.getContext('2d');
//   // cambio l'altezza in base al testo
//   //temp_cnvs.height = canvasimg.height + h + (lineHeight / 3);  
//   temp_cnvs.height = canvasimg.height + margintop + marginbottom;
//   temp_cnvs.width = canvas.width;

//   // prendo sempre canvasimg dove viene salvata la foto originale caricata e mai modificata
//   temp_cntx.drawImage(canvasimg, 0, margintop);
//   // modifico le dimensioni del primo canvas e del terzo (quello del print)
//   canvas.height = temp_cnvs.height;
//   canvasfinal.height = canvas.height;
//   ctx.fillStyle = bgcolor; // colore di sfondo
//   ctx.fillRect(0, 0, canvas.width, canvas.height);
//   ctx.drawImage(temp_cnvs, 0, 0, canvas.width, canvas.height);
// }

// function wrapText(context, text, x, y, maxWidth, lineHeight, pos) {
//   var expand = 2; // scrivo un canvas tot volte maggiore per far venire il testo con meno aliasing
//   var currentcxt = context; // mi salvo il context
//   // creo un canvas temporaneo
//   var temp_cnvs_txt = document.createElement('canvas');
//   var temp_cntx_txt = temp_cnvs_txt.getContext('2d');
//   // raddoppio il canvas
//   temp_cnvs_txt.height = canvasimg.height * expand;
//   temp_cnvs_txt.width = canvas.width * expand;
//   // sovrascrivo il context
//   context = temp_cntx_txt;
//   // raddoppio tutti i valori del testo
//   context.fillStyle = textcolor;
//   context.font = fontweight +' '+ textsize * expand + 'px ' + fontstyle;
//   context.textAlign="center"; 
//   // stroke
//   context.lineWidth = textsize * expand / textstrokewidth;
//   context.lineJoin = textlinejoin;
//   context.strokeStyle = textstroke;
//   maxWidth = maxWidth * expand;
//   lineHeight = lineHeight * expand;
//   x = x * expand;
//   y = y * expand;
  
//   var words = text.split(' ');
//   var line = '';
//   for(var n = 0; n < words.length; n++) {
//     var testLine = line + words[n] + ' ';
//     var metrics = context.measureText(testLine);
//     var testWidth = metrics.width;
//     if (testWidth > maxWidth && n > 0) {
//       context.strokeText(line, x, y);
//       context.fillText(line, x, y);
//       line = words[n] + ' ';
//       y += lineHeight;
//     }
//     else {
//       line = testLine;
//     }
//   }
//   context.strokeText(line, x, y);
//   context.fillText(line, x, y);
//   if (line.length == 1) { // azzero i valori da passare al resizer nel caso il testo sia vuoto
//     y = 0;
//     lineHeight = 0;
//   }
//   currentcxt.drawImage(temp_cnvs_txt, 0, 0, canvas.width, canvasimg.height);
//   y = y / expand;
//   lineHeight = lineHeight / expand;
//   resizec1(y, lineHeight, pos);
// }

// $( "#top-content" ).keyup(function() {
//   console.log ('keyup');
// //document.getElementById('top-content').addEventListener('keyup', function (){
    
//   text1 = this.value;
//   //ctx2.clearRect(0, 0, 0, 0);
//   ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  
//   canvas2.width = canvas.width;
//   //canvas2.height = canvas.height;
  
//   // da impostare per calcolare la larghezza giusta
//   ctx2.fillStyle = textcolor;
//   ctx2.font = fontweight +' '+ textsize + 'px ' + fontstyle;
//   ctx2.lineWidth = textsize / textstrokewidth;
//   ctx2.lineJoin = textlinejoin;
//   ctx2.strokeStyle = textstroke;
  
//   var textwidth = ctx2.measureText(this.value).width;
//   var textheight = ctx2.measureText(lineheightchar).width;
    
//   // trasformo l'input per andare a capo automaticamente
//   var text1 = this.value;
//   text1 = text1.trim().replace(/\s\s+/g, ' '); // tolgo spazi iniziali, finali e in mezzo alla stringa
  
//   wrapText(ctx2, text1, canvas.width / 2, textheight, canvas.width - 20, textheight, 'top');
  
//   canvas3.setAttribute('style', 'margin-top: '+ (margintop + canvasimg.height) +'px;');

// //}, false);
// });

// $( "#bottom-content" ).keyup(function( event ) {
// //document.getElementById('bottom-content').addEventListener('keyup', function (){
    
//   text1 = this.value;
//   //ctx2.clearRect(0, 0, 0, 0);
//   ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
  
//   canvas3.width = canvas.width;
//   //canvas2.height = canvas.height;
//   // da impostare per calcolare la larghezza giusta
  
//   ctx3.fillStyle = textcolor;
//   ctx3.font = fontweight +' '+ textsize + 'px ' + fontstyle;
//   ctx3.lineWidth = textsize / textstrokewidth;
//   ctx3.lineJoin = textlinejoin;
//   ctx3.strokeStyle = textstroke;
  
//   var textwidth = ctx3.measureText(this.value).width;
//   var textheight = ctx3.measureText(lineheightchar).width;
  
//   //console.log(textwidth);
//   //console.log(textheight);
  
//   // trasformo l'input per andare a capo automaticamente
//   var text1 = this.value;
//   text1 = text1.trim().replace(/\s\s+/g, ' '); // tolgo spazi iniziali, finali e in mezzo alla stringa
  
//   wrapText(ctx3, text1, canvas.width / 2, textheight, canvas.width - 20, textheight, 'bottom');
    
//   canvas3.setAttribute('style', 'margin-top: '+ (margintop + canvasimg.height) +'px;');

// //}, false);
// });

// function getImage(e) { // per caricare immagini dal web
//   var img=new Image();
  
//   var alert = document.getElementById('image-alert');
//   alert.innerHTML = 'img loading';
  
//   var extimg = document.getElementById("load-image").value;
//   // img dummy
//   // extimg = "https://i.imgur.com/m2LaNP1.jpg";
//   // img dummy
//   if (extimg && checkURL(extimg)) { // cerco di capire se 
    
//     img.src= extimg;
//     img.setAttribute('crossOrigin', 'anonymous');
    
//     img.tainted = true;
    
//     if (img.tainted || img.src.indexOf('imgur') !== -1) { // se l'immagine non è CORS o se siamo su imgur (403 forbidden) provo a usare un proxy
//         console.log('immagine tainted');
//         //http://stackoverflow.com/a/38283491
//         img.src= 'https://crossorigin.me/' + extimg; // uso un proxy cors      
//     }
    
//     img.onload = function() {
//       alert.innerHTML = 'img loaded';
//       loadImage(img);
//     };
//     img.onerror = function() {
      
//       alert.innerHTML = 'Mannaggia al pupazzo, something went wrong';
//     };
//   } else {
//     alert.innerHTML = 'That\'s not an image (accepted files: jpeg, jpg, gif, png)';
//   }
  
// }

// function loadImagePC(e){ // per caricare immagini locali
//     var reader = new FileReader();
//     reader.onload = function(event){
//         var img = new Image();
      
//         img.onload = function(){
//           loadImage(img);
//         };
        
//         img.src = event.target.result;
        
//     };
//     reader.readAsDataURL(e.target.files[0]);
    
// }

// function checkURL(url) {
//   return(url.match(/\.(jpeg|jpg|gif|png)$/) !== null);
// }

// function loadImage(img) {

//   var latocorto = 800;

//   canvas.width = img.width;
//   canvas.height = img.height;

//   if (img.width > latocorto || img.height > latocorto) { // calcolo il rapporto solo se una delle due dimensioni supera il lato corto
//     var rapporto = calculateAspectRatioFit(img.width,img.height,latocorto,latocorto);
//     //console.log(rapporto);
//     canvas.width = rapporto.width;
//     canvas.height = rapporto.height;            
//   }
  
//   canvasimg.width = canvas.width;
//   canvasimg.height = canvas.height;

//   logocanvas.width = canvas.width;
//   logocanvas.height = imglogo.height / 2; 
  
//   canvas2.width = canvas.width;
//   canvas2.height = canvas.height;
  
//   canvas3.width = canvas.width;
//   canvas3.height = canvas.height;  

//   canvasfinal.width = canvas.width;
//   canvasfinal.height = canvas.height +  imglogo.height / 2;
  
//   ctx.drawImage(img,0,0,canvas.width,canvas.height);
//   // aggiungo il logo nel suo canvas
//   logoctx.fillStyle = bglogocolor; // colore di sfondo
//   logoctx.fillRect(0, 0, canvas.width, imglogo.height / 2);
//   logoctx.drawImage(imglogo, canvas.width / 2 - imglogo.width / 4, 0, imglogo.width / 2, imglogo.height / 2);
  
//   ctximg.drawImage(img,0,0,canvas.width,canvas.height);

//   document.getElementById('canvas-container').style.height = canvas.height;           
  
//   document.getElementById('download').style.display = "inline-block";
// }

// function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {

//     var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

//     return { width: srcWidth*ratio, height: srcHeight*ratio };
//  }

// function downloadCanvas(link, canvasId, filename) {
  
//   canvasfinal.height = canvas.height +  imglogo.height / 2;
  
//   ctxfinal.drawImage(logocanvas, 0, 0, canvas.width,  imglogo.height / 2);

//   ctxfinal.drawImage(canvas, 0,  imglogo.height / 2, canvas.width, canvas.height);
//   ctxfinal.drawImage(canvas2, 0,  imglogo.height / 2); // rimane della sua altezza altrimenti si slarga in altezza
//   ctxfinal.drawImage(canvas3, 0, margintop + canvasimg.height + imglogo.height / 2); // lo stampo prendendo in considerazione altezza di immagine e della prima scritta

  
//   //link.href = document.getElementById(canvasId).toDataURL("image/jpeg",0.50);
//   // http://stackoverflow.com/a/11113329 per non usare todataurl
//   link.href = canvasfinal.toDataURL("image/jpeg",0.80);
  
  
//   //canvasfinal.toBlob(function(blob) { // per salvare diretta
    
//     //link.href = URL.createObjectURL(blob);
//     //console.log(link.href);  
    
//   //});
  
//   link.download = filename;
// }

// document.getElementById('download').addEventListener('click', function() {
//   var currentTime = new Date();
//   downloadCanvas(this, 'image-upload-canvas', 'Download '+ currentTime +'.jpg');
// }, false);

// // Logo in base64 per non importare un'altra foto
// var imglogo = new Image();
// imglogo.src = 'data:image/png;base64,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647777//ib59+174zTff/AIARqPRhPpoXQ/APWvWrPMA1O065BFJsp42bdqXn3322bdQAEACQoco0xXOEeRHP3v27P8sWLBge0JCQkS3MQDMnDlzfLAd4AygOoA1ceLEgUajUbUAHOHZYDBg6tSpX2zfvn1jcBDpEMoDoQs6xgNotWjRoi+ee+659XFxcZphR7vdjoyMDPPIkSP7QlG8vDMcPb169WoviqLqog0oldkXLVp06MCBAwcBdEConowaEQvOAAUkdgGQ8OGHH37eu3fv61evXr02ISGBKGcW7BsA2G+++eZxZrNZrK2tVe0Xg8EAi8WCBx98cMU777zzabBPyTEkHuZCsN+sc+fOXTBnzpx1cXFx0Os1T+0AANxyyy2jBUFoF7wvLxmysUnuWsYPPTdru3btOviCCy44S83IkGWZhEjlsWPHLqqpqakMjie1QU0Wg1QAuPfee3+SZTmsAj9NDocDSUlJhmHDhnVH+HZynheOl3tFairZBcC2bkr2vJE9Ejq2LLjSY8bnhR++u7vmPYTAVbS7BdUS2on3igZX1mXXtJl70YCk7hVnPKphQa2BQEDW6F4JXddObvda8DllwVe2bAMdPiQLI2kTnfgemPxt0b8WbSzfkZRlhlEUGl3CoaTGB/hkfD+l3exJnetAFpEFXZKGBoSNmRchuQgC7RmnPeTsZ2yxW9az501OTk7r2LFjRiSngdlsxvvvv7/z2LFju6Aky9O62MdcHoTyjXgnewjRlqTgnE/K2yRQ72fR3JsY8uvWrSt46aWXPoMy52WEH5bNHpxN3rc6duzYtueff35NpGPciDfqkksu6R+UD28DmPPiiy8ebLPZdLW1tar8WiwWvPfee/v37NmzFyHvJO2ZpGVAe3CtAGpWrVp1Qm3dIJ/37NmzHUIFm3mbjrg3UPNg8cIx9MJW06lTp8GXX375AI/HoxkaFAQBNpsNn3/++R/jx49/Oj8/vxDKYDQg5LolF3sUCDlgN+f48eOnLrvssut///33nX379m2H+vFrjyiKba+44oohtGB4HZKQkICffvrp2AcffPAlQkd8sIssPXBcUCZGwsyZM989efJkjc1m0zzh3eVyYdCgQW379OlzNpRFhgZWBFzpAFiGDx/eHVA/MV6WZSQkJGDbtm3FixcvXgXlyCAycXkVsz1B+aQ8+uij3545c8ZF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';