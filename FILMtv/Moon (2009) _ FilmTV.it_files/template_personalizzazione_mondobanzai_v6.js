// JavaScript Document
console.log('===>erogazione skin v6.1');
//test
var urlVideo;
var tagType = "normale";
var erogazioneSkin = false;
if(typeof(nomeSito) != 'undefined'){
	//la variabile esiste
}else{
	//la variabile non esiste
	var nomeSito = '';
}
if(typeof(sezioneSito) != 'undefined'){
	//la variabile esiste
}else{
	//la variabile non esiste
	var sezioneSito = '';
}

if(typeof(gruppoSito) != 'undefined'){
	//la variabile esiste
}else{
	//la variabile non esiste
	var gruppoSito = '';
}
//variabile per le nuove pagine del post
if(typeof(homedress_new) != 'undefined'){
	//la variabile esiste
}else{
	//la variabile non esiste
	var homedress_new = '';
}
//variabile per le nuove pagine del post
if(typeof(altezza_testata_invidia) != 'undefined'){
	//la variabile esiste
}else{
	//la variabile non esiste
	var altezza_testata_invidia = '';
}
if(typeof(bNoMenu) != 'undefined'){
	//la variabile esiste
	sottoMenuSitoAssente = true;
}else{
	//la variabile non esiste
	sottoMenuSitoAssente = false;
}
if(typeof(personalizzazione_dinamica) != 'undefined'){
	//la variabile esiste
}else{
	//la variabile non esiste
	var personalizzazione_dinamica = 'false';
}

if(typeof(statusStrip) != 'undefined'){
	//la variabile esiste
}else{
	//la variabile non esiste
	var statusStrip = 'true';
}
if(typeof(status300x100) != 'undefined'){
	//la variabile esiste
}else{
	//la variabile non esiste
	var status300x100 = 'false';
}
if(typeof(statusRichMedia) != 'undefined'){
	//la variabile esiste
}else{
	//la variabile non esiste
	var statusRichMedia = 'false';
}

//console.log('[mediamond] ===> larghezza sito:'+parent.MMlarghezzaSitoAdv);
if(typeof(bgBassaRisoluzione) != 'undefined' && typeof(bgBassaRisoluzione) != undefined){
	//la variabile esiste
	//console.log('[mediamond] ===> bgBassaRisoluzione1 esiste');
	//console.log('[mediamond] ===> bgBassaRisoluzione1:'+bgBassaRisoluzione);
	if(bgBassaRisoluzione != '' && bgBassaRisoluzione != undefined && parent.MMlarghezzaSitoAdv < 1370){
		//console.log('[mediamond] ===> bgBassaRisoluzione attivato');
		img_web = bgBassaRisoluzione;
	}else{
		//console.log('[mediamond] ===> bgBassaRisoluzione disattivato');
	}
}else{
	//la variabile non esiste
	//console.log('[mediamond] ===> bgBassaRisoluzione1 non esiste');
}

//questo serve per gestire i sitetab quando c'è una personalizzazione
statusPersonalizzazioni = true;
//variabile per o2o di gerbaz
shouldTheBanneDie = true;
//estraggo la url
var SitoUrl = window.location.href;
var arraySitoUrlSkin = new Array();
arraySitoUrlSkin = SitoUrl.split('/');
//
var SitoUrl2 = parent.location.href;
var arraySitoUrlSkin2 = new Array();
arraySitoUrlSkin2 = SitoUrl2.split('/');
//console.log('====>arraySitoUrlSkin2:'+arraySitoUrlSkin2);
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//GENERICO xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
var nLoopSkin = 0;


	
	
function initSkin(){	
	
	//console.log('erogazioneSkin:'+erogazioneSkin);
	
	if(erogazioneSkin == false){
	
	//per l'header espanso video
	if(typeof(fileVideo) != 'undefined'){
		//console.log('chiamata loadHeaderEspanso');
		/*loadHeaderEspanso(fileVideo);*/
		urlVideo = fileVideo;
	}else{
		urlVideo = '';
	}
	
	//console.log('-->video skin:'+urlVideo);
	
	var tipologia;

	nLoopSkin++;
	stile = 'skin_web,'+colore_sfondo+','+img_web+','+posizione+','+altezza_testata+','+url_puntamento_personalizzazione+','+statusStrip+','+status300x100+','+statusRichMedia+','+urlVideo+','+sottoMenuSitoAssente;

		/*console.log('===>sito:'+arraySitoUrlSkin[2]);	
		console.log('===>sito2:'+arraySitoUrlSkin2[2]);	*/
		console.log('===>stile:'+stile);
	
	switch(arraySitoUrlSkin[2]) {
		
		//skuola.net -----------------------------------------------------------------
		case 'www.skuola.net':
		parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);

			break;
			
			//donnamoderna stage -----------------------------------------------------------------
		case 'www.donnamoderna.com':	
			
		
			//parent.window.onload = function(){ 
				//parent.$(function() {
				console.log('===>chiamata funzione skin donnamoderna...');	parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				//});
			//}	
			break;
		
		//dev	
		case 'cucina.donnamoderna.com':
			
					parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
			
			break;
			//
		case 'ricette.donnamoderna.com':
			
					parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			break;
			
		case 'video.donnamoderna.com':
			
					parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
			
			break;
			
		case 'blog.donnamoderna.com':	
					 parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			break;
			
		case 'sognipossibili.donnamoderna.com':	
					     		parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			break;
			
		case 'www.confidenze.com':	
					     		parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			break;	
			
		case 'casting.donnamoderna.com':	
				     		parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
					
			break;
			
		
			
			
		//icon stage -----------------------------------------------------------------
		case 'www.icon.panorama.it':
			parent.window.addEventListener("load", function (){			     		parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
			});		
			break;
			
			
		case 'ondadurso.it':
			parent.window.addEventListener("load", function (){			     		parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
			});		
			break;
		
		case 'www.tgcom24.mediaset.it':
			//parent.window.addEventListener("load", function (){	
			parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
			
			//});		
			break;
			
		case 'www.sportmediaset.mediaset.it':
			//parent.window.addEventListener("load", function (){			     		
			parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
			
	//});		
			break;
			
		//
			
			
			
		//studenti ------------------------------------------------------------------
		case 'www.studenti.it':
		
			//carico il file con il css e i comendi per far apparire la skin
			
		

					parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);

			break;
			
		case 'doc.studenti.it':
			//parent.postMessage(stile,"http://doc.studenti.it");
			parent.$(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
			});
			break;
		case 'doc.dev.studenti.it':
			//parent.postMessage(stile,"http://doc.studenti.it");
			parent.$(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
			});
			break;
		case 'enciclopedia.studenti.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
		case 'vocabolario.studenti.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
		case 'lavoro.studenti.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
		case 'orientamento.studenti.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
		case 'www.proveinvalsi.net':
			parent.$(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
			});
			break;
			
		case 'www.giovani.it':
			parent.$(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
			});
				break;
		//games
		case 'www.games.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
			
		//mondo tech
		case 'www.androidworld.it':
			parent.$(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
			});
				break;
		case 'www.smartworld.it':
			parent.$(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
			});
			break;
		case 'www.mobileworld.it':
			parent.$(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
			});
			break;
			
		//farmaco e cura
		case 'www.farmacoecura.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			tagType = 'gpt';
			break;	
		case 'www.valorinormali.com':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			tagType = 'gpt';
			break;
			
		//mondo donne
		case 'www.pianetadonna.it':
			parent.$(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
			});
				break;
		case 'miseparo.pianetadonna.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
		case 'ricette.pianetadonna.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
		case 'guide.pianetadonna.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
		case 'www.pianetamamma.it':
			parent.$(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
			});
			break;
		case 'www.girlpower.it':
			parent.$(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
			});
			break;
		case 'invidia.pianetadonna.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
		case 'ricette-per-bambini.pianetamamma.it':
			parent.$(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
			});
			break;
			
		case 'www.filmtv.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			tagType = 'gpt';
			break;
			
			
		//giallozafferano
		case 'www.giallozafferano.it':
			//parent.postMessage(stile,"http://www.giallozafferano.it");
			parent.$(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
			});
			break;
		case 'speciali.giallozafferano.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
		case 'ricette.giallozafferano.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;	
			
		//cookaround
		case 'www.cookaround.com':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
		case 'speciali.cookaround.com':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
		
		
			
		//zingarate
		case 'www.zingarate.com':
			//parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			//});
			break;
		case 'voli-lowcost.zingarate.com':
			//parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			//});
			break;
		case 'blog.zingarate.com':
			//parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			//});
			break;
		case 'foto-viaggi.zingarate.com':
			//parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			//});
			break;	
		case 'ideeviaggi.zingarate.com':
			//parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			//});
			break;
			
		//mondo soldionline
		case 'www.soldionline.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;	
		case 'abcrisparmio.soldionline.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
		case 'soldielavoro.soldionline.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;	
			
		case 'www.my-personaltrainer.it':
			//parent.jQuery(function() {
			console.log('[mediamond]===>chiamata loadSkinWeb my');	parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
			//});
			break;	
			
		case 'm.my-personaltrainer.it':
			//parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
			//});
			break;		
			
		//blog altervista	
		case 'blog.giallozafferano.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
		case 'blog.pianetamamma.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
		case 'blog.pianetadonna.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
		case 'blog.soldionline.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
		case 'blog.cookaround.com':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;		
		case 'passioneperigatti.altervista.org':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
		//maestramary.altervista.org	
		case 'maestramary.altervista.org':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
		case 'ydogislegend.altervista.org':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
		case 'www.hovogliadidolce.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
		case 'significatosogni.altervista.org':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;

			
		case 'www.lezpop.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
			
		case 'www.nonsprecare.it':
			//parent.postMessage(stile,"http://www.nonsprecare.it");
			
			parent.$(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
			});
			
			break;
		
		case 'www.gadlerner.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
			
		case 'www.primaonline.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
			
			
			
		case 'www.soluzionidicasa.com':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;	
				
		//o2o new
		case 'guidecucina.pianetadonna.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
		case 'mammaebambino.pianetadonna.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
		case 'faidatemania.pianetadonna.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
		case 'tuttopercasa.pianetadonna.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
		case 'beauty.pianetadonna.it':
			//parent.postMessage(stile,"http://beauty.pianetadonna.it");
			parent.$(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
			});
			break;
		case 'odiami.pianetadonna.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
		case 'esseresani.pianetadonna.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
		case 'animalidalmondo.pianetadonna.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
		case 'nonsolocultura.studenti.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
		case 'vivalascuola.studenti.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
		case 'iogames.studenti.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
			
		//BLOG VECCHI
		//pianetatech blog
		case 'verytech.smartworld.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
		case 'iomobile.smartworld.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
		//zingarate
		case 'ideeviaggi.zingarate.com':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
		//liquida blog
		case 'pianetamotori.liquida.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
		case 'www.pianetamotori.it':
			parent.$(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
			});
			break;
		case 'pianetagreen.liquida.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
		case 'sportpower.liquida.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
		//
		case 'lavoroefinanza.soldionline.it':
			parent.jQuery(function() {
				parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
				
			});
			break;
			
		default:
			console.log('===>nessun sito configurato');
			//parent.window.addEventListener("load", function (){
			parent.loadSkinWeb(colore_sfondo,img_web,posizione,altezza_testata,url_puntamento_personalizzazione,statusStrip,status300x100,statusRichMedia,urlVideo,sottoMenuSitoAssente);
			
			//});	
		
		
		
	}//switch(arraySitoUrlSkin[2]) {
		
	}//if(erogazioneSkin == false){
		
		erogazioneSkin = true;
	
}

setTimeout(function(){ initSkin(); }, 500);