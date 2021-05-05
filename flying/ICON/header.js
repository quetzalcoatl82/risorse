// MEDIAMOND LOADER
function mediamondLoader(objAttr, chainId = null, elementType = "script", target = document.body) {
	return new Promise(function (resolve, reject) {
		let element = document.createElement(elementType);

		for (const property in objAttr) {
			element.setAttribute(property, objAttr[property]);
		}
		let path = objAttr.src || objAttr.href;
		element.onload = () => {
			resolve(element);
			console.log(`[mediamondLoader] ${path} caricato!`, "chainId_" + chainId + " Time: " + performance.now());
		};
		element.onerror = e => {
			reject(
				new Error(`[mediamondLoader] Errore sul caricamento di ${path}`)
			);
			console.log(e);
		};

		target.appendChild(element);
	});
}

function wait(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
// END MEDIAMOND LOADER

let startStripMobile = (initiator) => {
	if (typeof startStripMobileCheck !== 'undefined') return false;
	if (window.innerWidth > 480) return false;
	console.log('[strip mobile 2021] initiator', initiator)
	window.startStripMobileCheck = 1;
	googletag.cmd.push(function () {
		if (document.getElementById('gpt_stripmobile') && MMstatusStrip) {
			window.stripmobile = googletag.defineSlot(MMsezioneTag, [[320, 50], [320, 100]], 'gpt_stripmobile').
				setTargeting("pos", "1").
				setCollapseEmptyDiv(true, true).
				addService(googletag.pubads());

			googletag.display('gpt_stripmobile');
			googletag.pubads().refresh([stripmobile]);

			AmeMh.callbackStripMobile();
		}
	})
}
// JavaScript Document
//vengono definite delle variabili che poi verranno utilizzate nei js per l'erogazione dei formati
var MMdatiSkin = new Array();
var nomeSito = 'icon';
//
var MMstatusStrip = true;
var MMstatusRichMedia = true;
var MMstatusSkin = true;
var MMstatusBox = true;
var statusInread = true;
var statusSeedTag = false;
var MMstatusPromoBox = true;
var MMstatusNativePromoBox = true;
var MMstatusAdv = true;
//
var MMPosition = 'init';
var idSitoDfp = '244169177';
var KruxSegments;	
var KruxUser;
//per differenziare le varie sezioni
var MMSitoHp = window.location.href;
var MMarrayUrlSkin = new Array();
MMarrayUrlSkin = MMSitoHp.split('/');
/*controllo per togliere la skin momentaneamente*/
var MMarrayUrlSkinControllo = new Array();
MMarrayUrlSkinControllo = MMSitoHp.split('?');
//
var urlSetTargheting = MMarrayUrlSkinControllo[0].replace('http://','').replace('https://','').replace('www.','').replace('?refresh','').replace('?utm_source=Zemanta&utm_medium=referral','').replace(/\//gi,'_').replace('=','_','ig').replace('!','_','ig').replace('+','_','ig').replace('*','_','ig').replace('#','_','ig').replace('^','_','ig').replace('~','_','ig').replace(';','_','ig').replace('(','_','ig').replace(')','_','ig').replace('[','_','ig').replace(']','_','ig').replace('"','_','ig').replace("'","_","ig").replace('<','_','ig').replace('>','_');
var VerificaSottocanale = MMarrayUrlSkin[3].substr(0, 1);
/* varibile per il canale della tag*/
var MMsezioneTag;
//permette di assegnare la adunit alla pagina
function sendAdUnit(canaleSito){
	MMsezioneTag = '/4758/'+canaleSito;
}
/*valorizzo la tag*/
if((MMarrayUrlSkin[2] == 'icon.panorama.it' || MMarrayUrlSkin[2] == 'www.iconmagazine.it') && (MMarrayUrlSkin[3] == '' || VerificaSottocanale == '?')){//home
	sendAdUnit('ame_icon/home');
}else{
	sendAdUnit('ame_icon/altre');
}
//*----- eccezioni su pagine -----------------------------------------------------------------------------------------------//

//Panasonic - Men Care 
if(MMSitoHp =='https://www.iconmagazine.it/beauty/panasonic-ishaper-shaving-revolution/' || MMSitoHp =='https://www.iconmagazine.it/beauty/panasonic-ishaper-shaving-revolution'){
    statusSeedTag = false;
}

/* fine eccezione speciali */

//cerco la sotto stringa sulle url dei pubbliredazionali dalla url principale per poi poter settare una adunit pubbli
var MMurlPubbli = new Array();
var MMstatusPubbli;
MMurlPubbli.push("nessuno");
for(t=0; t<MMurlPubbli.length; t++){
	MMstatusPubbli = MMSitoHp.indexOf(MMurlPubbli[t]);
	//console.log('===>MMurlPubbli:'+MMurlPubbli[t]);
	//console.log('===>statusPubbli:'+MMstatusPubbli);
	if(MMstatusPubbli>0){
		sendAdUnit('ame_confidenze/publi');
		/*if(MMurlPubbli[t]=='back-to-school'){
			sendAdUnit('ame_confidenze/publi/backtoschool');
		}*/
	}
}
//variabile passata da editore e che include le tag di worldpress
if(typeof(mediamondTag) == undefined || typeof(mediamondTag) == 'undefined'){
//usando le tag di wordpress settate nell'array mediamondTag
mediamondTag = new Array();
}

if(typeof(mediamondTag) != undefined && typeof(mediamondTag) != 'undefined'){
//usando le tag di wordpress settate nell'array mediamondTag
for(r=0; r<mediamondTag.length; r++){
	//console.log('===>mediamondTag:'+mediamondTag[r]);
	//console.log('===>statusPubbli:'+MMstatusPubbli);
	if(mediamondTag[r] == 'sanremo-style'){
		sendAdUnit('ame_starbene/publi');
	}
}
}

/*controllo della funzione di webtrak ---------------------------------------------------------------------------------------*/
function getTagPfx(){
    if (typeof(MMsezioneTag) == 'undefined' || typeof(MMsezioneTag) == 'undefined' || MMsezioneTag == null || MMsezioneTag == '')
        return 'undefined';
    else
        return MMsezioneTag;
};



///----------------------------------------------------------------------------------------------------------------------


var sezionePaginaKey = new Array();
var keywordURL = '';
function cercaSezioneUrl() {
	//ciclo tutte le parole dell'array
		var numeroMMarrayUrlSkin = MMarrayUrlSkin.length;
		for (u=3; u<(MMarrayUrlSkin.length-1);u++){ 
			 sezionePaginaKey.push(MMarrayUrlSkin[u].toLowerCase()); 
		}
		var urlFinaleArticolo = MMarrayUrlSkin[(numeroMMarrayUrlSkin-1)].split('-');
		var urlArrayArticoloCompleto = sezionePaginaKey.concat(urlFinaleArticolo);
		for(i=0;i<urlArrayArticoloCompleto.length;i++){
			keywordURL += urlArrayArticoloCompleto[i]+',';
		}
}
cercaSezioneUrl();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// STRUTTURA SRA ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var idCampagnaBox;
var idCampagnaMastHead;
var MMlarghezzaSitoAdv = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var MMerogazioneSkin = false;
//
var campaignIdStrip;
var creativeIdStrip;
var lineItemIdStrip;
var sizeStrip;
//
var campaignIdBox;
var creativeIdBox;
var lineItemIdBox;
var sizeBox;
//
//
if(MMlarghezzaSitoAdv < 970) {
	//mobile
    divslotnameStrip = 'adv-gpt-masthead-leaderboard-container1';
	divslotnameBox = 'adv-gpt-box-mobile-container1';
	divslotpromobox1 = 'adv-gpt-promobox-mobile-container1';
	divslotpromobox2 = 'adv-gpt-promobox-mobile-container2';
	divslotpromobox3 = 'adv-gpt-promobox-mobile-container3';
	divslotpromobox4 = 'adv-gpt-promobox-mobile-container4';
}else{
	//desktop
    divslotnameStrip = 'adv-gpt-masthead-leaderboard-container1';
	divslotnameBox = 'adv-gpt-box-container1';
	divslotpromobox1 = 'adv-gpt-promobox-container1';
	divslotpromobox2 = 'adv-gpt-promobox-container2';
	divslotpromobox3 = 'adv-gpt-promobox-container3';
	divslotpromobox4 = 'adv-gpt-promobox-container4';
}
//
function initTagGpt(){
	//console.log('===> chiamata tag gpt in modalitÃ  SRA');
	//unifico le tag di wqordpress e quelle generate dalla url
	keywordGlobal = mediamondTag.concat(sezionePaginaKey);
	//creo un div in cui erogare la tag del out of page
	var newdiv = document.createElement('div');
	newdiv.setAttribute('id', 'adv-gpt-outofpage');
	newdiv.setAttribute("style", "position:absolute;width:1px;height:1px;overflow:hidden;");
	var node = document.getElementsByTagName("body")[0];
	node.appendChild(newdiv);
	//ci permetterebbe di gestire unâ€™offerta in programmatic guaranteed anche con i formati out of page
    var newdiv = document.createElement('div');
    newdiv.setAttribute('id', 'adv-gpt-outofpage2x2');
    newdiv.setAttribute("style", "position:absolute;width:1px;height:1px;overflow:hidden;");
    var node = document.getElementsByTagName("body")[0];
    node.appendChild(newdiv);
	//creo un div in cui erogaqre la tag della skin
	var newdiv = document.createElement('div');
	newdiv.setAttribute('id', 'div-gpt-skin');
	newdiv.setAttribute("style", "position:absolute;width:1px;height:1px;overflow:hidden;");
	var node = document.getElementsByTagName("body")[0];
	node.appendChild(newdiv);
	
	if(typeof(ADX_label) != undefined && typeof(ADX_label) != 'undefined'){
		//console.log('===>ADX_label definita');
		//console.log('===>ADX_label:'+ADX_label);
	}else{
		//console.log('===>ADX_label NON definita');
		ADX_label = '';
	}
	
	if(typeof(Krux) != undefined && typeof(Krux) != 'undefined'){
		KruxSegments = Krux.segments;
		KruxUser = Krux.user;
	}else{
		KruxSegments = '';
		KruxUser = '';
	}
	
	
	
	

	googletag.cmd.push(function() {
        
        if(document.getElementById(divslotnameStrip) && MMstatusStrip){
            document.getElementById(divslotnameStrip).style.textAlign = 'center';
            document.getElementById(divslotnameStrip).style.display = 'none';
        }

		if(MMstatusRichMedia){
			richmedia = googletag.defineOutOfPageSlot(MMsezioneTag,'adv-gpt-outofpage').addService(googletag.pubads());	
		}
		
		
		if(devTypeUtility == "mobile_web_ipad" || devTypeUtility == "mobile_web_android_tablet"){
		      var mappingStrip = googletag.sizeMapping().
            addSize([0, 0], [[320, 50],[320, 100],[720, 240]]).		
            addSize([600, 499], [720, 240]).
            addSize([971, 500], [[970, 250],[728, 90]]).
            build();
        }else{
              var mappingStrip = googletag.sizeMapping().
            addSize([0, 0], [[320, 50],[320, 100],[720, 240]]).		
            addSize([971, 500], [[970, 250],[728, 90]]).
            build();
        }
		
			
		//strip 
		if (document.getElementById(divslotnameStrip) && MMstatusStrip){
			mm_stript1 = googletag.defineSlot(MMsezioneTag,[970,250],divslotnameStrip)
				.defineSizeMapping(mappingStrip)
				.setTargeting("pos","1")
				.setCollapseEmptyDiv(true)
				.addService(googletag.pubads());
		}
		//box
		if (document.getElementById(divslotnameBox) && MMstatusBox) {
			mm_box1 = googletag.defineSlot(MMsezioneTag,[[300,250],[300,600]],divslotnameBox)
				.setTargeting("pos","1")
				.setCollapseEmptyDiv(true)
				.addService(googletag.pubads());
		}
		
		if(MMstatusPromoBox){
			if (document.getElementById("adv-gpt-promobox-container1") || document.getElementById("adv-gpt-promobox-mobile-container1")) {

				//promobox
				promobox1 = googletag.defineSlot(MMsezioneTag, [300, 100], divslotpromobox1)
					.addService(googletag.pubads())
					.setCollapseEmptyDiv(true)
					.setTargeting("pos", "1");

			}

			if (document.getElementById("adv-gpt-promobox-container2") || document.getElementById("adv-gpt-promobox-mobile-container2")) {

				promobox2 = googletag.defineSlot(MMsezioneTag, [300, 100], divslotpromobox2)
					.addService(googletag.pubads())
					.setCollapseEmptyDiv(true)
					.setTargeting("pos", "2");

			}

			if (document.getElementById("adv-gpt-promobox-container3") || document.getElementById("adv-gpt-promobox-mobile-container3")) {	

				promobox3 = googletag.defineSlot(MMsezioneTag, [300, 100], divslotpromobox3)
					.addService(googletag.pubads())
					.setCollapseEmptyDiv(true)
					.setTargeting("pos", "3");

			}

			if (document.getElementById("adv-gpt-promobox-container4") || document.getElementById("adv-gpt-promobox-mobile-container4")) {

				promobox4 = googletag.defineSlot(MMsezioneTag, [300, 100], divslotpromobox4)
					.addService(googletag.pubads())
					.setCollapseEmptyDiv(true)
					.setTargeting("pos", "4");

			}
		}
		
		if(MMstatusRichMedia){
		richmedia2x2 = googletag.defineSlot(MMsezioneTag, [2,2], 'adv-gpt-outofpage2x2').addService(googletag.pubads());
		}

		googletag.pubads().setTargeting("purl",""+urlSetTargheting+"");	
		googletag.pubads().setTargeting("keywordURL",[""+keywordURL+""]);
		googletag.pubads().setTargeting("sezionePagina",[""+sezionePaginaKey+""]);
		googletag.pubads().setTargeting("tagWordpress",[""+keywordGlobal+""]);
		googletag.pubads().setTargeting("adx",ADX_label);
        if(statusPolicy==0){
		googletag.pubads().setTargeting("ksg",KruxSegments);
		googletag.pubads().setTargeting("kuid",KruxUser);
        }
		googletag.pubads().enableSingleRequest();
        googletag.pubads().disableInitialLoad();
		googletag.enableServices();
		
		googletag.pubads().addEventListener('slotOnload', function(event) {
            if (document.getElementById(divslotnameStrip) && MMstatusStrip){
			if(event.slot===mm_stript1) {
                document.getElementById(divslotnameStrip).style.display = 'block';
				if(sizeStrip != '320,1' && sizeStrip != '320,50' && sizeStrip != '320,100' && sizeStrip != '375,100'){
					strip_animation();
					}
				if(MMlarghezzaSitoAdv <= 970 && sizeCompleta == '720,240'){
					//console.log('chiamata resize iframe2');
					ResizeIframe4();
				}
                if(sizeStrip == '728,90'){
                   initComscore(campaignIdStrip,creativeIdStrip,lineItemIdStrip,sizeStrip,1,'mm_stript1',1,divslotnameStrip);
                }
                if(sizeStrip == '970,250'){
                    initIAS(campaignIdStrip,creativeIdStrip,lineItemIdStrip,sizeStrip,1,divslotnameStrip);
                }
                if(sizeStrip == '720,240'){
                    initIAS(campaignIdStrip,creativeIdStrip,lineItemIdStrip,sizeStrip,1,divslotnameStrip);
                }
				
			}
            }
            if (document.getElementById(divslotnameBox) && MMstatusBox) {
				if(event.slot===mm_box1) {
					initComscore(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,1,'mm_box1',1,divslotnameBox);
					//initIAS(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,1,divslotnameBox);
					initIAS2(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,1,divslotnameBox,mm_box1);
				}
            }
		});
		googletag.pubads().addEventListener('slotRenderEnded', function(event) {
            if (document.getElementById(divslotnameStrip) && MMstatusStrip){
			if(event.slot===mm_stript1) {                
				campaignIdStrip = event.campaignId;
				creativeIdStrip = event.creativeId;
				lineItemIdStrip = event.lineItemId;
				sizeStrip = event.size;
				sizeCompleta = event.size;				
				idCampagnaMastHead=event.campaignId;
               if(sizeStrip != "970,250"){
                    jQuery("#strip_adv").removeClass("advCollapse");
                }
				if(MMlarghezzaSitoAdv <= 970 && sizeCompleta == '720,240'){
					ChangePositionInitial();
					ResizeIframe4();
				}
				if(MMlarghezzaSitoAdv <= 970 && (sizeStrip == '320,1' || sizeStrip == '320,50' || sizeStrip == '320,100' || sizeStrip == '375,100')){
					//console.log('chiamata resize iframe2');
					ChangePosition();
				}
				//piccola modifica x un cliente
				if( campaignIdStrip == '2648687753'){
					document.getElementById('gpt_strip').style.backgroundColor = "white";
				}
			}
            }
            if (document.getElementById(divslotnameBox) && MMstatusBox) {
				if(event.slot===mm_box1) {
					campaignIdBox = event.campaignId;
					creativeIdBox = event.creativeId;
					lineItemIdBox = event.lineItemId;
					sizeBox = event.size;
					//console.log('===> slot box renderizzato');
					idCampagnaBox=event.campaignId;
				}
            }
		}); 
		

	});
    
    /*configurazione ias per ottimizzazione --------------------------------------------------------------------------------------------------- */

        
        // The following lines provide an example of how you can encapsulate the call to
            // DFP in a function that ensures the ads are requested only once. If you use
            // lazy loading and need to call DFP multiple times for the same page, we can
            // provide a different example that manages such a case (ensuring that only
            // new ad slots are refreshed).
            var adserverRequestSent = false;
            function requestAds() {
                if (adserverRequestSent) return;
                clearTimeout(IASPET_TIMEOUT);
                googletag.pubads().refresh(); // Display the ads
                adserverRequestSent = true;
            }
            // Initial IAS setup
            var iasDataHandler;
            window.__iasPET = window.__iasPET || {};


            window.__iasPET.queue = window.__iasPET.queue || [];
            window.__iasPET.pubId = '929824'; // constant for your account
            var IASPET_TIMEOUT = 2000; // max milliseconds to wait for a PET response
            var __iasPETTimeoutRequestAds = setTimeout(requestAds, IASPET_TIMEOUT);
            var iasDataHandler = function (adSlotData) {
                clearTimeout(__iasPETTimeoutRequestAds);
                window.__iasPET.setTargetingForGPT();
                requestAds();
            };

            // make the PET request
            googletag.cmd.push(function () {
                // read the currently defined GPT ad slots for sending to the PET endpoint
                // defined all GPT ad slots before calling PET
                var gptSlots = googletag.pubads().getSlots();
                var iasPETSlots = [];
                for (var i = 0; i < gptSlots.length; i++) {
                    var sizes = gptSlots[i].getSizes().map(function (size) {
                        if (size.getWidth && size.getHeight)
                            return [size.getWidth(), size.getHeight()];
                        else
                            return [1, 1];
                    });
                    iasPETSlots.push({
                        adSlotId: gptSlots[i].getSlotElementId(),
                        //size: can either be a single size (for example, [728, 90])
                        // or an array of sizes (for example, [[728, 90], [970, 90]])
                        size: sizes,
                        adUnitPath: gptSlots[i].getAdUnitPath()
                    });
                }
                // make the request to PET. if your page makes multiple ad requests to DFP
                // (for example, lazily loaded ads, infinite scrolling pages, etc.), make
                // a request to PET before every request to DFP
                window.__iasPET.queue.push({
                    adSlots: iasPETSlots,
                    dataHandler: iasDataHandler
                });
            });
        
    
    /* fine configurazione ias -------------------------------------------------------------------------------------------- */

}//initTagGpt


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///----------------------------------------------------------------------------------------------------------------------------------------/////

						
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// FINE STRUTTURA SRA ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
function ChangePosition(){
	//console.log('===>ChangePosition');
	document.querySelector('#'+divslotnameStrip).setAttribute('style','left: 0; position:fixed; bottom:0;z-index:999999;text-align:center;width:100%;background-color:#fff;');
}
function ChangePositionInitial(){
	document.querySelector('#'+divslotnameStrip).setAttribute("style", "position:initial;"); 
}
/////-----------------------------------------------------------------------------------
var nRefresh = 1;

//funzione per il refresh
function MediamondTagRefresh(){
	//console.log('refresh tag');
	//googletag.pubads().refresh([window.mm_box1]);
	//viene fatto il refresh della tag dopo la 4Â° chiamata
	googletag.pubads().refresh([mm_box1]);
	/*if(nRefresh == 3){
		//googletag.pubads().refresh();
		googletag.pubads().refresh([mm_box1]);
		nRefresh = 1;
	}else{
		nRefresh ++;
	}*/
}
var arraySlotBox = new Array();
var posNew=1;
//controllo lo scrol della pagina
window.addEventListener("load", function (){
	window.addEventListener('scroll', function() {
		//mediamondAdGpt.getAds('true', data);
			//console.log('windows scroll');
			for (n=2;n<20;n++){
				if( jQuery("#adv-gpt-box-container"+n).length && MMlarghezzaSitoAdv >= 970 && MMstatusBox ) {
				  //console.log('--> adv-gpt-box-container'+n+' esiste');
				  //console.log('array:'+arraySlot[4]);
				  if( arraySlotBox[n] == undefined ){
						generaGpt(n);
					//console.log('div vuoto' );
				  }
				}
				if( jQuery("#adv-gpt-box-mobile-container"+n).length && MMlarghezzaSitoAdv < 970 && MMstatusBox ) {
				  //console.log('--> adv-gpt-box-container'+n+' esiste');
				  //console.log('array:'+arraySlot[4]);
				  if( arraySlotBox[n] == undefined ){
						generaGpt(n);
					//console.log('div vuoto' );
				  }
				}
			}
	});
});
//questa funzione genera le tag gpt
function generaGpt(nSlot){
	//console.log('-----> generare slot gpt:'+nSlot);
	posNew = nSlot;
	if(MMlarghezzaSitoAdv < 970) {
		//mobile
		divslotnameNew = 'adv-gpt-box-mobile-container' + nSlot;
		window['mm_mobile_box' + posNew];
		//tag gpt
		googletag.cmd.push(function() {
		window['mm_mobile_box' + posNew] = googletag.defineSlot(MMsezioneTag,[[300,250],[300,600]],divslotnameNew).addService(googletag.pubads()).setTargeting("pos",""+posNew+"").setCollapseEmptyDiv(true).setTargeting("idcampagna",""+idCampagnaBox+"").setTargeting("purl",""+urlSetTargheting+"").setTargeting("tagWordpress",[""+keywordGlobal+""]);
		googletag.enableServices();
		});
	}else{
		//desktop
		divslotnameNew = 'adv-gpt-box-container' + nSlot;
		window['mm_box' + posNew];	
		//tag gpt
		googletag.cmd.push(function() {
		window['mm_box' + posNew] = googletag.defineSlot(MMsezioneTag,[[300,250],[300,600]],divslotnameNew).addService(googletag.pubads())
		.setTargeting("pos",""+posNew+"").setCollapseEmptyDiv(true).setTargeting("idcampagna",""+idCampagnaBox+"").setTargeting("purl",""+urlSetTargheting+"").setTargeting("tagWordpress",[""+keywordGlobal+""]);
		googletag.enableServices();
		});
	}
    
     googletag.pubads().addEventListener('slotOnload', function(event) {
				if(event.slot===window['mm_mobile_box' + posNew]) {
                    initComscore(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,posNew,window['mm_mobile_box' + posNew],nSlot,divslotnameNew);
                    initIAS(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,posNew,divslotnameNew);
				}
         if(event.slot===window['mm_box' + posNew]) {
                    initComscore(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,posNew,window['mm_box' + posNew],nSlot,divslotnameNew);
                    initIAS(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,posNew,divslotnameNew);
				}
         
			});
    
    
	googletag.pubads().addEventListener('slotRenderEnded', function(event) {
			campaignIdBox = event.campaignId;
				creativeIdBox = event.creativeId;
				lineItemIdBox = event.lineItemId;
				sizeBox = event.size;
			if(event.slot===window['mm_mobile_box' + posNew]) {
				//reloadLayout();
			}
			if(event.slot===window['mm_box' + posNew]) {
				//reloadLayout();
			}
		
	});
    
    
	arraySlotBox[nSlot] = "pieno";
	googletag.cmd.push(function() { googletag.display(divslotnameNew); });
    if(MMlarghezzaSitoAdv<970){
        googletag.pubads().refresh([window['mm_mobile_box' + posNew]]);
    }else{
        googletag.pubads().refresh([window['mm_box' + posNew]]);
    }
}


//Refresh aut. 15 sec

//var TimerRefreshTag = setInterval(function() { googletag.pubads().refresh(); console.log("MM refresh")}, 15000);


/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
///+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// seedtag


function setCookieSeedTag(name, value, last) {
	//console.log('[mediamond]===>set cookie');
	if (last) {
		var now = new Date() ;
		var expires = new Date() ;
		expires.setTime(now.getTime()+(parseInt(last)*60*1000)) ;
		document.cookie=name+'='+escape(value)+'; expires='+
		expires.toGMTString()+'; path=/';
	} else {
		document.cookie=name+'='+escape(value)+'; expires= ; path=/';
	}
}

function getCookieSeedTag(name) {
	console.log('[mediamond]===>get cookie');
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}


//Ã¨ lanciato dall'editore
function initSeedTag(){

	if(statusSeedTag){	

		console.log('[mediamond]===>init seedtag');
		//if(MMarrayUrlSkinControllo[1]=='testseedtag'){
		var cookieSeedtag = getCookieSeedTag('mediamond');
			console.log('[mediamond]===>cookie:'+cookieSeedtag);
		//setCookie('mediamond','seedtag',0); per cancellarlo
		if (cookieSeedtag == ""  || cookieSeedtag == null) {
			if(cookieSeedtag != 'seedtag_'+nomeSito){
				console.log('[mediamond]===>erogazione codice seedtag');
				//
				window._seedtagq = window._seedtagq || [];
				window._seedtagq.push(['_setId', '7160-1009-01']);
				window._seedtagq.push(['iframe_mode']);
				(function () {
				  var st = document.createElement('script');
				  st.type = 'text/javascript';
				  st.async = true;
				  st.src = ('https:' == document.location.protocol
					? 'https'
					: 'http') + '://config.seedtag.com/loader.js?v=' + Math.random();
				  var s = document.getElementsByTagName('script')[0];
				  s.parentNode.insertBefore(st, s);
				})();

				//
			setCookieSeedTag('mediamond','seedtag_'+nomeSito,60);//espresso in minuti	
			}//if(cookieSeedtag != 'seedtag_'+nomeSito){
		}//if (userOvl != ""  && userOvl != null) {
		//}//if(MMarrayUrlSkinControllo=='testseedtag'){	

	}//statusSeedTag

}//function initSeedTag(){

//fine seedtag /////////////////////////////////////////////////////////////////////////////////////////////
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//js utility ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var lipHpsponsor = document.createElement("script");
lipHpsponsor.async = false;
lipHpsponsor.type = "text/javascript";
var useSSL = "https:" == document.location.protocol;
lipHpsponsor.src = (useSSL ? "https:" : "http:") + "//adv.mediamond.it/hp_sponsor/utility_mediamond.js";
var node = document.getElementsByTagName("script")[0];
node.parentNode.insertBefore(lipHpsponsor, node);