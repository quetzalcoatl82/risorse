// JavaScript Document
/* per camtare il dispositivo */
var larghezzaSitoAdv = window.innerWidth;
////----------------------------------------------------------------------------------------------------------------------//
var riferimentoLarghezza = 1300; 
var marginTopSidebarSkin;
var maginTopContenitore;

if(document.querySelector(".sol-page")){//home cucina
	eefPoint = document.querySelector("main");
}
//contenitore
var contenitoreSkinGpt = document.createElement('div');                
contenitoreSkinGpt.setAttribute('id', 'contenitore-sito-x-adv');   
contenitoreSkinGpt.setAttribute('style', 'height:1px;');
document.querySelector('.sol-page').insertBefore(contenitoreSkinGpt, eefPoint);

//link
var linkSkinGpt = document.createElement('a');       
linkSkinGpt.setAttribute('class', 'adv_esterno');            
linkSkinGpt.setAttribute('id', 'adv_esterno');
linkSkinGpt.setAttribute('style', 'display:none;');
linkSkinGpt.setAttribute('target', '_blank');   
//document.body.appendChild(linkSkinGpt);
document.querySelector(".sol-page").appendChild(linkSkinGpt);



if(MMlarghezzaSitoAdv>riferimentoLarghezza){
    document.getElementById("adv_esterno").innerHTML = "<div class='skin-viewability' id='div-gpt-skin'><img src='//static.mediamond.it/img_generiche/20x20.png'></a></div>";
}else{
    document.getElementById("contenitore-sito-x-adv").innerHTML = "<div class='skin-viewability' id='div-gpt-skin'><img src='//static.mediamond.it/img_generiche/20x20.png'></a></div>";
}


// Get current location's distance from the top of the page
var position = window.pageYOffset;

// Get an element's distance from the top of the page
var getElemDistance = function ( elem ) {
    var location = 0;
    if (elem.offsetParent) {
        do {
            location += elem.offsetTop;
            elem = elem.offsetParent;
        } while (elem);
    }
    return location >= 0 ? location : 0;
};

window.googletag = window.googletag || {};
googletag.cmd = googletag.cmd || [];
googletag.cmd.push(function () {
	googletag.pubads().addEventListener('slotRenderEnded', function (event) {
		let slotId = event.slot.getSlotElementId();
		if (slotId == 'adv-gpt-masthead-leaderboard-container1') {
            console.log('slotId:',slotId);
            // prendi l'altezza dell'elemento con id slotId
            let elemento = document.getElementById(slotId);
            let altezzaElemento = elemento.offsetHeight;
            document.documentElement.style.setProperty('--mm-mh-height', altezzaElemento + 'px');
		}
	})
})


//C0DICE PER LA SKIN WEB ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/** Custom properties su :root — riusabili anche dal CSS del tema (es. soldionline) */
function setSkinRootVars(vars) {
	var root = document.documentElement;
	Object.keys(vars).forEach(function (key) {
		if (vars[key] === '' || vars[key] == null) {
			root.style.removeProperty(key);
		} else {
			root.style.setProperty(key, vars[key]);
		}
	});
}

function loadSkinWeb(colore_sfondo_w,img_web_w,posizione_w,altezza_testata_w,url_puntamento_personalizzazione_w,statusStrip_w,status300x100_w,statusRichMedia_w){
	console.log('--> skin web 2.2');

    // check sul colore predominante dell'immagine in modo da mettere un colore che si adatti meglio
	if(colore_sfondo_w == '#fdfaf9'){
		bgcolor = '';
	}else{
		bgcolor = 'background-color: ' + colore_sfondo_w + ' !important;';
	}

	document.body.classList.add("sol-skin-visible");
	
	maginTopContenitore = (parseInt(altezza_testata_w) + 17);
	let maginTopContenitoreLow = (parseInt(altezza_testata_w));
	if(MMlarghezzaSitoAdv<=1440)
	maginTopContenitore = (parseInt(altezza_testata_w));

	document.getElementById('adv_esterno').style.display = 'block';

    var scrollPosInitial = document.body.scrollTop || document.documentElement.scrollTop;
    console.log('[mediamond][skin]==>scrollPosInitial:',scrollPosInitial);

    let sizeStripVal;
    try{
    	sizeStripVal = sizeStrip[1];
    }catch (error) {
	  console.log('[mediamond][warning]===>',error);
	  sizeStripVal = 0;
	}

    console.log('parseInt(sizeStrip[1]):'+parseInt(sizeStripVal));
// 	var topMarginSkin = parseInt(getElemDistance( document.querySelector('#contenitore-sito-x-adv'))+sizeStripVal);
	var topMarginSkin = getElemDistance( document.querySelector('#contenitore-sito-x-adv'));
	console.log('[mediamond][skin]==>topMarginSkin init:',getElemDistance( document.querySelector('#contenitore-sito-x-adv')));
	console.log('[mediamond][skin]==>topMarginSkin:',topMarginSkin);

	let gapHeight = topMarginSkin + maginTopContenitore;
    console.log('[mediamond][skin]==>gapHeight:',gapHeight);

	setSkinRootVars({
		'--mm-skin-top-margin': topMarginSkin + 'px',
		'--mm-skin-content-offset': maginTopContenitore + 'px',
		'--mm-skin-content-offset-low': maginTopContenitoreLow + 'px',
		'--mm-skin-bg-size': '1764px auto',
		'--mm-skin-bg-size-md': '1471px auto'
	});

	console.log('--> skin web 2.2');

	

	var urlLinkAdvEsterno = document.getElementById("adv_esterno");
	urlLinkAdvEsterno.setAttribute("href", url_puntamento_personalizzazione_w);
	
	var cssSkinWebObj = document.createElement('style');

	
	cssSkinWeb = 'a.adv_esterno{display:block;width:100%;height:1000px;z-index:0;color:#000; margin-top:0;position:absolute;top:0;}';
	
	if(gapHeight>=scrollPosInitial) // non faccio espandere il container se l'utente ha scrollato
	cssSkinWeb += '#contenitore-sito-x-adv{width:1200px; margin:0 auto;}';
	
	cssSkinWeb += '.mh2021Page {background-image: url(' + img_web_w + ')!important; '+bgcolor+' background-repeat: no-repeat !important;background-position-x: center !important;background-position-y: var(--mm-skin-top-margin)!important;background-size:var(--mm-skin-bg-size) !important;}';
	
	cssSkinWeb += '@media only screen and (max-width: 1440px) and (min-width: 1025px) { body,.mh2021Page{background-size:var(--mm-skin-bg-size-md) !important;}}';
		
	cssSkinWeb += '.skinPositionScrollBody{background-position: center top !important;background-attachment: fixed !important;}';
	
	cssSkinWeb += '.skinPositionScrollLink{position: fixed !important;}';

	cssSkinWeb += '.skinPositionScrollContainer + .mm-skin-main, .skinPositionScrollContainer + .mm-skin-main ~ * {transform: translateY(var(--mm-skin-content-offset)); transition: transform 0.5s ease-out;}';

	cssSkinWeb += 'nav#main-navigation,.sub-header{position: relative;z-index: 1;}.advstrip {position: relative;z-index: 1;}';
	cssSkinWeb += '.leaf .content article .content-leaf{margin-top:0px;}';
	
	cssSkinWebObj.innerHTML = cssSkinWeb;
	///blocco variabili	
	statusPersonalizzazioniWeb = true;
	statusStrip = statusStrip_w;
  	status300x100 = status300x100_w;
  	statusRichMedia = statusRichMedia_w;
  	MMPosition = posizione_w;

  	MMstatusPersonalizzazioniWeb = true;
	MMstatusStrip = statusStrip_w;
	MMstatus300x100 = status300x100_w;
	MMstatusRichMedia = statusRichMedia_w;
	
	
	//css
	document.body.appendChild(cssSkinWebObj);
	
	//richiesto da robberto bon il 04-03-2021
	var skinSet = new CustomEvent("skinData", {
    "detail": {"url":img_web_w,"color":colore_sfondo_w }
	});

	window.dispatchEvent(skinSet); 

	
	
	if(typeof(sizeStrip) == undefined || typeof(sizeStrip) == 'undefined'){
		sizeStrip = [0,0];
		 //console.log('[mediamond][skin]===>sizeStrip undefined');
	}else if(sizeStrip == null){
		sizeStrip = [0,0];
		 //console.log('[mediamond][skin]===>sizeStrip null');
	}
    
    marginTopSidebarSkin = sizeStrip[1]+70+50;
	
	var mediamondSkinIas = {topMarginSkin: topMarginSkin, larghezzaSito: 1200, idDiv: 'div-gpt-skin'};
	initDivIasSkin(topMarginSkin);
	//initDivIasSkinGlobal(topMarginSkin);
	
		//
}//function loadSkinWeb()

function loadSkinWeb2(configSkin){
	console.log('mediamond][skin]===>skin web 3.0');

    // check sul colore predominante dell'immagine in modo da mettere un colore che si adatti meglio
	if(colore_sfondo_w == '#fdfaf9'){
		bgcolor = '';
	}else{
		bgcolor = 'background-color: ' + colore_sfondo_w + ' !important;';
	}

	document.body.classList.add("sol-skin-visible");
	
	maginTopContenitore = (parseInt(configSkin.altezza_testata) + 17);
	let maginTopContenitoreLow = (parseInt(configSkin.altezza_testata));
	if(MMlarghezzaSitoAdv<=1440)
	maginTopContenitore = (parseInt(configSkin.altezza_testata));

	document.getElementById('adv_esterno').style.display = 'block';

    var scrollPosInitial = document.body.scrollTop || document.documentElement.scrollTop;
    console.log('[mediamond][skin]==>scrollPosInitial:',scrollPosInitial);

    let sizeStripVal;
    try{
    	sizeStripVal = sizeStrip[1];
    }catch (error) {
	  console.log('[mediamond][warning]===>',error);
	  sizeStripVal = 0;
	}

    console.log('parseInt(sizeStrip[1]):'+parseInt(sizeStripVal));
// 	var topMarginSkin = parseInt(getElemDistance( document.querySelector('#contenitore-sito-x-adv'))+sizeStripVal);
	var topMarginSkin = getElemDistance( document.querySelector('#contenitore-sito-x-adv'));
	console.log('[mediamond][skin]==>topMarginSkin init:',getElemDistance( document.querySelector('#contenitore-sito-x-adv')));
	console.log('[mediamond][skin]==>topMarginSkin:',topMarginSkin);

	let gapHeight = topMarginSkin + maginTopContenitore;
    console.log('[mediamond][skin]==>gapHeight:',gapHeight);

	setSkinRootVars({
		'--mm-skin-top-margin': topMarginSkin + 'px',
		'--mm-skin-content-offset': maginTopContenitore + 'px',
		'--mm-skin-content-offset-low': maginTopContenitoreLow + 'px',
		'--mm-skin-bg-size': '1764px auto',
		'--mm-skin-bg-size-md': '1471px auto'
	});

	var urlLinkAdvEsterno = document.getElementById("adv_esterno");
	urlLinkAdvEsterno.setAttribute("href", configSkin.url_puntamento_personalizzazione);
	
	var cssSkinWebObj = document.createElement('style');

	cssSkinWeb = 'a.adv_esterno{display:block;width:100%;height:100%;z-index:0;color:#000; margin-top:0;position:absolute;top:0;}';
	
	if(gapHeight>=scrollPosInitial) // non faccio espandere il container se l'utente ha scrollato
	cssSkinWeb += '#contenitore-sito-x-adv{height:var(--mm-skin-content-offset) !important;width:1200px;margin:0 auto;-webkit-transition:height 0.5s ease-out;-moz-transition:height 0.5s ease-out;-o-transition:height 0.5s ease-out;transition:height 0.5s ease-out;}';
	
	cssSkinWeb += '.mh2021Page {background-image:url(' + img_web_w + ')!important; '+bgcolor+' background-repeat:no-repeat !important;background-position-x:center !important;background-position-y:var(--mm-skin-top-margin) !important;background-size:var(--mm-skin-bg-size) !important;}';
	
	cssSkinWeb += '@media only screen and (max-width: 1440px) and (min-width: 1025px) { body,.mh2021Page{background-size:var(--mm-skin-bg-size-md) !important;}#contenitore-sito-x-adv{height:var(--mm-skin-content-offset-low)}}';
		
	cssSkinWeb += '.skinPositionScrollBody{background-position: center top !important;background-attachment: fixed !important;}';
	
	cssSkinWeb += '.skinPositionScrollLink{position: fixed !important;}';

	cssSkinWeb += '.skinPositionScrollContainer + .mm-skin-main, .skinPositionScrollContainer + .mm-skin-main ~ * {transform:translateY(var(--mm-skin-content-offset));transition:transform 0.5s ease-out;}';


	cssSkinWeb += 'nav#main-navigation,.sub-header{position: relative;z-index: 1;}.advstrip {position: relative;z-index: 1;}';
	cssSkinWeb += '.leaf .content article .content-leaf{margin-top:0px;}';
	
	
	
	cssSkinWebObj.innerHTML = cssSkinWeb;
	///blocco variabili	
	statusPersonalizzazioniWeb = true;
	statusStrip = configSkin.statusStrip;
  	status300x100 = configSkin.status300x100;
  	statusRichMedia = configSkin.statusRichMedia;
  	MMPosition = configSkin.posizione;

  	MMstatusPersonalizzazioniWeb = true;
	MMstatusStrip = configSkin.statusStrip;
	MMstatus300x100 = configSkin.status300x100;
	MMstatusRichMedia = configSkin.statusRichMedia;
	
	
	//css
	document.body.appendChild(cssSkinWebObj);
	
	//richiesto da robberto bon il 04-03-2021
	var skinSet = new CustomEvent("skinData", {
    "detail": {"url":configSkin.img_web,"color":configSkin.colore_sfondo}
	});

	window.dispatchEvent(skinSet); 

	
	
	if(typeof(sizeStrip) == undefined || typeof(sizeStrip) == 'undefined'){
		sizeStrip = [0,0];
		 //console.log('[mediamond][skin]===>sizeStrip undefined');
	}else if(sizeStrip == null){
		sizeStrip = [0,0];
		 //console.log('[mediamond][skin]===>sizeStrip null');
	}
    
    marginTopSidebarSkin = sizeStrip[1]+70+50;
	
	var mediamondSkinIas = {topMarginSkin: topMarginSkin, larghezzaSito: 1200, idDiv: 'div-gpt-skin'};
	//initDivIasSkin(topMarginSkin); dismesso
	initDivIasSkinGlobal(mediamondSkinIas);
	
	
}//function loadSkinWeb()

// per controllare lo scroll ed aggiungere una classe che mi permette di cambiare la posizione del background
window.addEventListener("scroll", function () {
    checkSkinPosition();
});


//controllo della posizione della skin allo scrollTop
checkSkinPosition = () => {
	if (MMPosition == 'fixed') {
		var scrollPos = document.body.scrollTop || document.documentElement.scrollTop
		if (MMstatusPersonalizzazioniWeb == true) {
			//da popolare
			if (scrollPos >= (marginTopSidebarSkin + marginTopSidebarSkin)) {
				document.body.classList.add("skinPositionScrollBody");
				document.querySelector(".mh2021Page").classList.add("skinPositionScrollBody");
				document.querySelector("#adv_esterno").classList.add("skinPositionScrollLink");
			} else {
				document.body.classList.remove("skinPositionScrollBody");
				document.querySelector(".mh2021Page").classList.remove("skinPositionScrollBody");
				document.querySelector("#contenitore-sito-x-adv").classList.add("skinPositionScrollContainer");
				document.querySelector("#adv_esterno").classList.remove("skinPositionScrollLink");
			}
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////
//********************** IAS per la skin *******************************************
var MMaltezzaSitoAdv = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
//inserisco i div per la viewability di ias
function initDivIasSkin(altezza_testata_w){
    //console.log('[mediamond][skin]===>initDivIasSkin');
    var larghezzaSito = 1200;//in px
    var spazioSidebarSkin = ((MMlarghezzaSitoAdv - larghezzaSito)/2)-10;//il (MMlarghezzaSitoAdv-10) camcolo la larghezza tolta la barra di scorrimento
    var larghezzaDivSkinSidebar = 150;
    var altezzaTestataMh = altezza_testata_w;
    
    /*console.log('[mediamond][skin]===>spazioSidebarSkin:'+spazioSidebarSkin);
    console.log('[mediamond][skin]===>sizeStrip:'+sizeStrip);*/
    console.log('[mediamond][skin]===>altezzaTestataMh:'+altezzaTestataMh);
    console.log('[mediamond][skin]===>MMaltezzaSitoAdv:'+MMaltezzaSitoAdv)
	if(typeof(sizeStrip) == undefined || typeof(sizeStrip) == 'undefined'){
		sizeStrip = [0,0];
		 //console.log('[mediamond][skin]===>sizeStrip undefined');
	}else if(sizeStrip == null){
		sizeStrip = [0,0];
		 //console.log('[mediamond][skin]===>sizeStrip null');
	}
    

	var marginTopSidebarSkin = sizeStrip[1]+40;
	if(altezzaTestataMh != 0){
		var altezzaDivSkinSidebar = MMaltezzaSitoAdv-altezzaTestataMh;
	}else{
		var altezzaDivSkinSidebar = MMaltezzaSitoAdv-sizeStrip[1];
	}
   //console.log('[mediamond][skin]===>marginTopSidebarSkin:'+marginTopSidebarSkin);
   //console.log('[mediamond][skin]===>altezzaTestataMh:'+altezzaTestataMh);
   //console.log('[mediamond][skin]===>sizeStrip[1]:'+sizeStrip[1]);
    
    var cssSkinWebObjIas = document.createElement('style');
    
    
    if(MMlarghezzaSitoAdv>riferimentoLarghezza){
        //barre laterali
		cssSkinWebIas = '#div-gpt-skin{width:'+spazioSidebarSkin+'px; height:732px; position:absolute; transform:translateY('+marginTopSidebarSkin+'px);}';//SETTAGGIO
		cssSkinWebIas += '#div-gpt-skin{left:0px;}';
		cssSkinWebIas += '#div-gpt-skin{height:'+altezzaDivSkinSidebar+'px;}'
       //safe area sopra 1370 = 138 e sotto i 1370 = 81 taratura sulla safe area
		//il calcolo Ã¨ stato fatto
		if(MMlarghezzaSitoAdv > 1370){
			var widthMin = '138';
		}else{
			var widthMin = '81';
		}
		cssSkinWebIas += '#div-gpt-skin{min-width:'+widthMin+'px;}';
		
		if(spazioSidebarSkin < widthMin){
			document.getElementById('div-gpt-skin').style.left =  (spazioSidebarSkin-widthMin)+'px';
		}

		//ridimensiono il div di ias in base alla larghezza
		window.addEventListener("resize", function() {
			var MMlarghezzaSitoAdvNew = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			if(MMlarghezzaSitoAdvNew<1600){
			 larghezzaSito = 1000;//in px
			 }
			//console.log('[mediamond][skin]=========================================');
			//console.log('[mediamond][skin]===>resize:'+MMlarghezzaSitoAdvNew);
			spazioSidebarSkin = ((MMlarghezzaSitoAdvNew - larghezzaSito)/2)-10;//il (MMlarghezzaSitoAdv-10) camcolo la larghezza tolta la barra di scorrimento
			//console.log('[mediamond][skin]===>spazioSidebarSkin:'+spazioSidebarSkin);
			if(MMlarghezzaSitoAdvNew > 1370){
				widthMin = '138';
			}else{
				widthMin = '81';
			}
			console.log('[mediamond][skin]===>widthMin:'+widthMin);
			if(spazioSidebarSkin > widthMin){
				//console.log('[mediamond][skin]===>stato1');
				document.getElementById('div-gpt-skin').style.width = spazioSidebarSkin+'px';
				document.getElementById('div-gpt-skin').style.transform =  "translateX(0px)";
			}else{
				//console.log('[mediamond][skin]===>stato2');
				document.getElementById('div-gpt-skin').style.width = spazioSidebarSkin+'px';
				document.getElementById('div-gpt-skin').style.transform =  "translateX("+(spazioSidebarSkin-widthMin)+"px)";
			}
			document.getElementById('div-gpt-skin').style.minWidth = widthMin+'px';
		});
		
		

        
    }else{
        //testata
       cssSkinWebIas = '#div-gpt-skin{width:'+MMlarghezzaSitoAdv+'px; height:'+(parseInt(altezza_testata_w)+16)+'px;margin:0 auto}';
    }
	
	
    cssSkinWebIas += '#div-gpt-skin > div { width:100%; height:100%;} #div-gpt-skin > div > iframe { width:100%; height:100%; }';
    cssSkinWebIas += '.divSidebarPosScroll{height:732px !important;transform: translateY(0px) !important;}';//SETTAGGIO
    
    
	document.getElementById('div-gpt-skin').style.transform = "translateY("+marginTopSidebarSkin+"px)";
  
    cssSkinWebObjIas.innerHTML = cssSkinWebIas;
	document.body.appendChild(cssSkinWebObjIas);

	var intervalloIas = setInterval(function(){ 
		//console.log('[mediamond][skin]===intervallo');
		var newMarginTop = document.getElementById('contenitore-sito-x-adv').offsetTop;
		//console.log('[mediamond][skin]===newMarginTop:'+newMarginTop);
		document.getElementById('div-gpt-skin').style.transform = "translateY("+newMarginTop+"px)";
	}, 500);

	//mi serve per spostare il div allo scroll
        if(MMlarghezzaSitoAdv>riferimentoLarghezza){
            //console.log('[mediamond][skin][ias]===>controllo >1300');
           	window.addEventListener("scroll", function() {
                var scrollPosIas =  document.body.scrollTop  || document.documentElement.scrollTop
                //per ias
                //console.log('[mediamond][skin][ias]===>scrollPosIas:'+scrollPosIas);
                if(scrollPosIas >= (marginTopSidebarSkin + marginTopSidebarSkin)){
					document.getElementById('div-gpt-skin').classList.add("divSidebarPosScroll");
                }else{
					document.getElementById('div-gpt-skin').classList.remove("divSidebarPosScroll");
                }
            });
        }
}