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
//questo serve per far apparire la personalizzazione
var tagAdv;
var sezioneTag;
var nomeSito = 'androidworld';
var sezioneSito;
var statusPersonalizzazioni = false;
var statusPersonalizzazioniWeb = false;
var idSitoDfp = '26339897';
var status300x100 = true;
var MMstatusStrip = true;
var MMstatusRichMedia = true;
var MMstatusSkin = true;
var MMstatusBox = true;
var statusInread = true;
var statusSeedTag = true;
let MMstatusRefresh300x250 = false; //mi serve per gestire il refres del box
var MMstatusPromoBox = true;
var MMstatusNativePromoBox = true;
var MMstatusAdv = true;
var statusLoadAdvScroll = false;//questa mi serve per non far erogare l'adv prima del consenso della policy
var SitoHp = window.location.href;
//per personalizzare le varie sezioni
var arrayUrlSkin = new Array();
arrayUrlSkin = SitoHp.split('/');
/*controllo per togliere la skin momentaneamente*/
var arrayUrlSkinControllo = new Array();
arrayUrlSkinControllo = SitoHp.split('?');
var larghezzaSitoAdv = document.body.clientWidth;
var MMdatiSkin = new Array();
var keywordGlobal = new Array();
var KruxSegments;
var KruxUser;
var statusInread = true;
//per differenziare le varie sezioni
var MMSitoHp = window.location.href;
var MMarrayUrlSkin = new Array();
MMarrayUrlSkin = MMSitoHp.split('/');
/*controllo per togliere la skin momentaneamente*/
var MMarrayUrlSkinControllo = new Array();
MMarrayUrlSkinControllo = MMSitoHp.split('?');
var VerificaSottocanale = MMarrayUrlSkin[3].substr(0, 1);
//url modificata per passarla nel settargheting
var urlSetTargheting = MMarrayUrlSkinControllo[0].replace('http://','').replace('https://','').replace('www.','').replace('?refresh','').replace('?utm_source=Zemanta&utm_medium=referral','').replace(/\//gi,'_').replace('=','_','ig').replace('!','_','ig').replace('+','_','ig').replace('*','_','ig').replace('#','_','ig').replace('^','_','ig').replace('~','_','ig').replace(';','_','ig').replace('(','_','ig').replace(')','_','ig').replace('[','_','ig').replace(']','_','ig').replace('"','_','ig').replace("'","_","ig").replace('<','_','ig').replace('>','_');
var cssTemplateSkin = 1;
var MMPosition = 'init';
/* varibile per il canale della tag*/
var MMsezioneTag;
function sendAdUnit(canaleSito){
	MMsezioneTag = '/4758/'+canaleSito;
}
if(MMarrayUrlSkin[2] == 'www.androidworld.it'){
	if(MMarrayUrlSkin[3] == '' || VerificaSottocanale == '?'){
		sendAdUnit('pianetatech/androidworld_hp');
	}else if(MMarrayUrlSkin[3] == 'forum'){
		sendAdUnit('pianetatech/androidworld_forum');
	}else if(MMarrayUrlSkin[3] == 'recensioni'){
		sendAdUnit('pianetatech/androidworld_video');
		MMstatusRefresh300x250 = true;
	}else if(MMarrayUrlSkin[3] == 'video'){
		sendAdUnit('pianetatech/androidworld_video');
		MMstatusRefresh300x250 = true;
	}else{
		sendAdUnit('pianetatech/androidworld');
		MMstatusRefresh300x250 = true;
	}
}else{
	sendAdUnit('pianetatech/androidworld');
	MMstatusRefresh300x250 = true;
}
if(MMarrayUrlSkin[3] == 'schede' && (MMarrayUrlSkin[4] == '' || MMarrayUrlSkin[4] == undefined )){
	MMstatusPromoBox = false;
	console.log('[mediamond][300x100]===>disattivati');
}else{
	console.log('[mediamond][300x100]===>attivati');
}
sezioneTag == MMsezioneTag;
//cerco la sotto stringa sulle url dei pubbliredazionali dalla url principale per poi poter settare una adunit pubbli
var MMurlPubbli = new Array();
var MMstatusPubbli;
MMurlPubbli.push("speciale-nessuno");
for(t=0; t<MMurlPubbli.length; t++){
	MMstatusPubbli = MMSitoHp.indexOf(MMurlPubbli[t]);
	if(MMstatusPubbli>0){
		sendAdUnit('altri_ilgiornale/publi');
	}
}
if(typeof(mediamondTag) == undefined || typeof(mediamondTag) == 'undefined'){
//usando le tag di wordpress settate nell'array mediamondTag
mediamondTag = new Array();
}
if(typeof(mediamondTag) != undefined && typeof(mediamondTag) != 'undefined'){
	//usando le tag di wordpress settate nell'array mediamondTag
	for(r=0; r<mediamondTag.length; r++){
		if(mediamondTag[r] == 'sanremo-style'){
			sendAdUnit('pianetatech/publi/speciale_sanremo18');
		}
	}
}
///////////////////////////////////////////////////////////
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
	//aggiungo alle kw anche quello che sta oltre il ?
	if(MMarrayUrlSkinControllo[1] != undefined && MMarrayUrlSkinControllo[1] != ''){
		keywordURL += MMarrayUrlSkinControllo[1];
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
var campaignIdStrip;
var creativeIdStrip;
var lineItemIdStrip;
var sizeStrip;
var campaignIdBox;
var creativeIdBox;
var lineItemIdBox;
var sizeBox;
var OggiHp = new Date;
var GiornoHp = OggiHp.getDate();
var MeseHp = OggiHp.getMonth()+1;
if(MMlarghezzaSitoAdv < 970) {
	//mobile
	divslotnameStrip = 'adv-gpt-masthead-leaderboard-container1';
	divslotnameBox = 'mobile-infinite-adslot-1';
	rifDivslotnameBox = '#mobile-infinite-adslot-1';
	divslotpromobox1 = 'adv-gpt-promobox-mobile-container1';
	divslotpromobox2 = 'adv-gpt-promobox-mobile-container2';
	divslotpromobox3 = 'adv-gpt-promobox-mobile-container3';
	divslotpromobox4 = 'adv-gpt-promobox-mobile-container4';
}else{
	//desktop
	divslotnameStrip = 'adv-gpt-masthead-leaderboard-container1';
	divslotnameBox = 'infinite-adslot-1';
	rifDivslotnameBox = '#infinite-adslot-1';
	divslotpromobox1 = 'adv-gpt-promobox-container1';
	divslotpromobox2 = 'adv-gpt-promobox-container2';
	divslotpromobox3 = 'adv-gpt-promobox-container3';
	divslotpromobox4 = 'adv-gpt-promobox-container4';
}
var sw = document.documentElement.clientWidth,
sidebarSlotName1 = (sw<=767) ? 'native-sidebar-mobile-1' : 'native-sidebar-1',
sidebarSlotName2 = (sw<=767) ? 'native-sidebar-mobile-2' : 'native-sidebar-2',
sidebarSlotName3 = (sw<=767) ? 'native-sidebar-mobile-3' : 'native-sidebar-3';

if(SitoHp.indexOf('black-friday') > 0){
	keywordURL += ',black-friday';
}
//
if (MMlarghezzaSitoAdv < 970) {//il refresh deve essere attivo solo su desktop
	MMstatusRefresh300x250 = false;
}
//
function initTagGpt(){

//script per escludere l'inread quando c'Ã¨ un'altro video in pagina AC-515
if(document.querySelector('body').getAttribute('data-video') == "1"){
	console.log('[mediamond][inread]===>escluso per variabile editore');
	statusInread = false;
}

	statusLoadAdvScroll = true;
	keywordGlobal = mediamondTag.concat(sezionePaginaKey);
    if(MMstatusPromoBox == true){
        $('<div style="margin: 0 auto; display:block; width: 300px;"><div id="'+divslotpromobox1+'"></div></div>').insertAfter(rifDivslotnameBox);
        if(MMsezioneTag != '/4758/pianetatech/androidworld_hp' && status300x100 == true){
            $('<div style="margin: 0 auto; display:block; width: 300px;"><div id="'+divslotpromobox2+'"></div></div>').insertAfter(rifDivslotnameBox);
            $('<div style="margin: 0 auto; display:block; width: 300px;"><div id="'+divslotpromobox3+'"></div></div>').insertAfter(rifDivslotnameBox);
            $('<div style="margin: 0 auto; display:block; width: 300px;"><div id="'+divslotpromobox4+'"></div></div>').insertAfter(rifDivslotnameBox);
        }
        $('<div id="container_promobox" class="container_promobox_class"></div>' ).insertAfter(rifDivslotnameBox);
    }
	if(MMlarghezzaSitoAdv > 970) {
		var lipHpsponsor = document.createElement("script");
		lipHpsponsor.async = false;
		lipHpsponsor.type = "text/javascript";
		lipHpsponsor.src = "//adv.mediamond.it/hpsponsor/androidworld/hpsponsor_androidworld.js";
		var node = document.getElementsByTagName("body")[0];
		node.parentNode.insertBefore(lipHpsponsor, node);
	}
	var newdiv = document.createElement('div');
	newdiv.setAttribute('id', 'adv-gpt-outofpage');
	newdiv.setAttribute("style", "position:fixed;width:25px;height:25px;overflow:hidden;top:0;left:0;");//25x25 per ias
	var node = document.getElementsByTagName("body")[0];
	node.appendChild(newdiv);
	document.getElementById("adv-gpt-outofpage").innerHTML = "<img src='//static.mediamond.it/img_generiche/20x20.png' style='width:25px;height:25px'>";//per ias
	//inread
	var newdiv = document.createElement('div');
	newdiv.setAttribute('id', 'gpt-inread-gpt');
	newdiv.setAttribute("style", "position:absolute;width:1px;height:1px;overflow:hidden;");
	var node = document.getElementsByTagName("body")[0];
	node.appendChild(newdiv);
	$('#gpt_strip').append("<div id='"+divslotnameStrip+"'></div>");
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
		if(devTypeUtility == "mobile_web_ipad" || devTypeUtility == "mobile_web_android_tablet"){
			var mappingStrip = googletag.sizeMapping().
			addSize([0, 0], [[3,1],[720,240]]).	
			addSize([600, 499], [[3,1],[720, 240]]).
			addSize([971, 500], [[3,1],[728,90],[980,50],[970,250],[980,323]]).
			build();
		}else{
			var mappingStrip = googletag.sizeMapping().
			addSize([0, 0], [[3,1],[720,240]]).	
			addSize([971, 500], [[3,1],[728,90],[980,50],[970,250],[980,323]]).
			build();
		}
		if(adv_listing == 'listati' || adv_section == 'androidworld_gallery' || MMstatusRefresh300x250){//i listati sono la home e le home di canale
			var mappingBox = googletag.sizeMapping().
			addSize([0, 0], [[300,250]]).
			build();
		}else{
			var mappingBox = googletag.sizeMapping().
			addSize([0, 0], [[300,250],[300,600]]).
			build();
		}
		//strip
		if (document.getElementById(divslotnameStrip) && MMstatusStrip) {
			mm_stript1 = googletag.defineSlot(MMsezioneTag,[970,250],divslotnameStrip)
				.defineSizeMapping(mappingStrip)
				.setTargeting("pos","1")
				.setTargeting("test","2")
				.setCollapseEmptyDiv(true,true)
				.addService(googletag.pubads());
		}
		var pushInitTime = parseInt(performance.now() - startPageTimes.performanceNow) / 1000;
		//box
		if (document.getElementById(divslotnameBox) && MMstatusBox) {
			mm_box1 = googletag.defineSlot(MMsezioneTag,[300,250],divslotnameBox)
				.defineSizeMapping(mappingBox)
				.setTargeting("pos","1")
				.setCollapseEmptyDiv(true)
				.addService(googletag.pubads());
		}
		if(MMlarghezzaSitoAdv > 970 && MMarrayUrlSkinControllo[1] != 'noskin' && adv_section != 'gallery' && MMstatusSkin){
			//skin
			mm_skin1 = googletag.defineSlot(MMsezioneTag,[100,100],'div-gpt-skin')
				.setTargeting("pos","1")
				.setCollapseEmptyDiv(true)
				.addService(googletag.pubads());
			MMerogazioneSkin = true;
		}
		if(MMstatusRichMedia){
			richmedia = googletag.defineOutOfPageSlot(MMsezioneTag,'adv-gpt-outofpage').addService(googletag.pubads());
		}
		if(statusInread){
			inread = googletag.defineSlot(MMsezioneTag, [640,5], 'gpt-inread-gpt').addService(googletag.pubads());
		}
		if(MMstatusPromoBox){
            if ((document.getElementById("adv-gpt-promobox-container1") && MMlarghezzaSitoAdv >= 970) || (document.getElementById("adv-gpt-promobox-mobile-container1") && MMlarghezzaSitoAdv < 970) ) {
                //promobox
                promobox1 = googletag.defineSlot(MMsezioneTag, [300, 100], divslotpromobox1)
                    .addService(googletag.pubads())
                    .setCollapseEmptyDiv(true)
                    .setTargeting("pos", "1");
            }
            if ((document.getElementById("adv-gpt-promobox-container2") && MMlarghezzaSitoAdv >= 970) || (document.getElementById("adv-gpt-promobox-mobile-container2") && MMlarghezzaSitoAdv < 970) ) {
                promobox2 = googletag.defineSlot(MMsezioneTag, [[300, 100],'fluid'], divslotpromobox2)
                    .addService(googletag.pubads())
                    .setCollapseEmptyDiv(true)
                    .setTargeting("pos", "2");

            }
            if ((document.getElementById("adv-gpt-promobox-container3") && MMlarghezzaSitoAdv >= 970) || (document.getElementById("adv-gpt-promobox-mobile-container3") && MMlarghezzaSitoAdv < 970) ) {
                promobox3 = googletag.defineSlot(MMsezioneTag, [300, 100], divslotpromobox3)
                    .addService(googletag.pubads())
                    .setCollapseEmptyDiv(true)
                    .setTargeting("pos", "3");
            }
            if ((document.getElementById("adv-gpt-promobox-container4") && MMlarghezzaSitoAdv >= 970) || (document.getElementById("adv-gpt-promobox-mobile-container4") && MMlarghezzaSitoAdv < 970) ) {
                promobox4 = googletag.defineSlot(MMsezioneTag, [300, 100], divslotpromobox4)
                    .addService(googletag.pubads())
                    .setCollapseEmptyDiv(true)
                    .setTargeting("pos", "4");
            }
		}
		if(MMstatusNativePromoBox){
			//native
			if(document.getElementById('native-home-1')){
				var nativehome1 = googletag.defineSlot(MMsezioneTag, [[90,100]], 'native-home-1')
				.setTargeting('pos','1')
				.setTargeting('spazio','null')
				.setTargeting('native','home1')
				.setTargeting('tipo_pagina','homepage')
				.setTargeting("cssIndex", "5")
				.setTargeting('sigla_sito','aw')
				.setTargeting('dvc',device)
				.setCollapseEmptyDiv(true,true)
				.addService(googletag.pubads());
			}
    
			if(document.getElementById('native-home-2')){
				var nativehome2 = googletag.defineSlot(MMsezioneTag, [[90,100]], 'native-home-2')
				.setTargeting('pos','2')
				.setTargeting('spazio','null')
				.setTargeting('native','home2')
				.setTargeting('tipo_pagina','homepage')
				.setTargeting("cssIndex", "5")
				.setTargeting('sigla_sito','aw')
				.setTargeting('dvc',device)
				.setCollapseEmptyDiv(true,true)
				.addService(googletag.pubads());
			}

			if(document.getElementById('native-home-3')){
				var nativehome3 = googletag.defineSlot(MMsezioneTag, [[90,100]], 'native-home-3')
				.setTargeting('pos','3')
				.setTargeting('spazio','null')
				.setTargeting('native','home3')
				.setTargeting('tipo_pagina','homepage')
				.setTargeting("cssIndex", "5")
				.setTargeting('sigla_sito','aw')
				.setTargeting('dvc',device)
				.setCollapseEmptyDiv(true,true)
				.addService(googletag.pubads());
			}


			if(document.getElementById('native-list-1')){
				var nativelist1 = googletag.defineSlot(MMsezioneTag, [[90,100]], 'native-list-1')
				.setTargeting('pos','1')
				.setTargeting('spazio','null')
				.setTargeting('native','home1')
				.setTargeting('tipo_pagina','homepage')
				.setTargeting("cssIndex", "5")
				.setTargeting('sigla_sito','aw')
				.setTargeting('dvc',device)
				.setCollapseEmptyDiv(true,true)
				.addService(googletag.pubads());
			}

			if(document.getElementById('native-list-2')){
				var nativelist2 = googletag.defineSlot(MMsezioneTag, [[90,100]], 'native-list-2')
				.setTargeting('pos','2')
				.setTargeting('spazio','null')
				.setTargeting('native','home2')
				.setTargeting('tipo_pagina','homepage')
				.setTargeting("cssIndex", "5")
				.setTargeting('sigla_sito','aw')
				.setTargeting('dvc',device)
				.setCollapseEmptyDiv(true,true)
				.addService(googletag.pubads());
			}

			if(document.getElementById('native-list-3')){
				var nativelist3 = googletag.defineSlot(MMsezioneTag, [[90,100]], 'native-list-3')
				.setTargeting('pos','3')
				.setTargeting('spazio','null')
				.setTargeting('native','home3')
				.setTargeting('tipo_pagina','homepage')
				.setTargeting("cssIndex", "5")
				.setTargeting('sigla_sito','aw')
				.setTargeting('dvc',device)
				.setCollapseEmptyDiv(true,true)
				.addService(googletag.pubads());
			}

			if(document.getElementById(sidebarSlotName1)){
				var nativesidebar1 = googletag.defineSlot(MMsezioneTag, [[80,100]], sidebarSlotName1)
				.setTargeting('pos','1')
				.setTargeting('spazio','null')
				.setTargeting('native','sidebar1')
				.setTargeting('tipo_pagina','homepage')
				.setTargeting("cssIndex", "6")
				.setTargeting('sigla_sito','aw')
				.setTargeting('dvc',device)
				.setCollapseEmptyDiv(true,true)
				.addService(googletag.pubads());
			}

			if(document.getElementById(sidebarSlotName2)){
				var nativesidebar2 = googletag.defineSlot(MMsezioneTag, [[80,100]], sidebarSlotName2)
				.setTargeting('pos','2')
				.setTargeting('spazio','null')
				.setTargeting('native','sidebar2')
				.setTargeting('tipo_pagina','homepage')
				.setTargeting("cssIndex", "6")
				.setTargeting('sigla_sito','aw')
				.setTargeting('dvc',device)
				.setCollapseEmptyDiv(true,true)
				.addService(googletag.pubads());
			}

			if(document.getElementById(sidebarSlotName3)){
				var nativesidebar3 = googletag.defineSlot(MMsezioneTag, [[80,100]], sidebarSlotName3)
				.setTargeting('pos','3')
				.setTargeting('spazio','null')
				.setTargeting('native','sidebar3')
				.setTargeting('tipo_pagina','homepage')
				.setTargeting("cssIndex", "6")
				.setTargeting('sigla_sito','aw')
				.setTargeting('dvc',device)
				.setCollapseEmptyDiv(true,true)
				.addService(googletag.pubads());
			}
		}

		googletag.pubads().setTargeting("purl",""+urlSetTargheting+"");
		googletag.pubads().setTargeting("keywordURL",[""+keywordURL+""]);
		googletag.pubads().setTargeting("sezionePagina",[""+sezionePaginaKey+""]);
		googletag.pubads().setTargeting("tagWordpress",[""+keywordGlobal+""]);
		googletag.pubads().setTargeting("adx",ADX_label);
        if(statusPolicy == 0){
            googletag.pubads().setTargeting("ksg",KruxSegments);
            googletag.pubads().setTargeting("kuid",KruxUser);
        }
		googletag.pubads().enableSingleRequest();
        googletag.pubads().disableInitialLoad();
		googletag.enableServices();

		googletag.pubads().addEventListener('slotOnload', function(event) {
			if (document.getElementById(divslotnameStrip) && MMstatusStrip) { 
            if(event.slot===mm_stript1) {
                if(sizeStrip != '3,1' && sizeStrip != '320,50' && sizeStrip != '320,100' && sizeStrip != '375,100'){
					console.log('[push FE] slotOnload gpt_strip: '+parseInt(performance.now() - startPageTimes.performanceNow));
					AmeMh.strip_animation();
				}
                //comscore
                if(sizeStrip == '728,90'){
					initComscore(campaignIdStrip,creativeIdStrip,lineItemIdStrip,sizeCompletaStrip,1,'mm_stript1',1,divslotnameStrip);
				}
                  if(sizeStrip == '970,250'){
                    initIAS(campaignIdStrip,creativeIdStrip,lineItemIdStrip,sizeStrip,1,divslotnameStrip);
                }
                if(sizeStrip == '720,240'){
                    initIAS(campaignIdStrip,creativeIdStrip,lineItemIdStrip,sizeStrip,1,divslotnameStrip);
					//mi serve per adform che forza l'iframe del 720 e non lo fa ridurre
					ResizeIframe4();
					setTimeout(function(){ ResizeIframe4(); }, 1000);
                }
				if(MMlarghezzaSitoAdv <= 970 && (sizeStrip == '320,50' || sizeStrip == '320,100' || sizeStrip == '375,100')){
					$("#strip_adv").removeClass("advCollapse");
				}
              }
            }
			if (document.getElementById(divslotnameBox) && MMstatusBox) {
				if(event.slot===mm_box1) {
					initComscore(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,1,'mm_box1',1,divslotnameBox);
					initIAS2(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,1,divslotnameBox,mm_box1);

				}
			}
			if(MMstatusNativePromoBox){
				if(event.slot===promobox1) {
					//per la home e le home di canale
					if((MMarrayUrlSkin[4] == '' || MMarrayUrlSkin[4] == undefined || MMarrayUrlSkin[3] == 'tag') && MMlarghezzaSitoAdv>=970){
						document.getElementById('infinite-adslot-1').style.paddingTop = '0px';
						document.getElementById('infinite-adslot-1').style.height = '250px';
						document.getElementById('infinite-adslot-1').style.paddingBottom = '5px';
						document.getElementById('infinite-adslot-1').style.marginBottom = '10px';
						if(larghezzaSitoAdv>970){
						   document.getElementById('infinite-adslot-1').style.marginTop = '-50px'; 
						}else{
						  document.getElementById('infinite-adslot-1').style.marginTop = '-10px';   
						}
					}
				}
			}
		});
		googletag.pubads().addEventListener('slotRenderEnded', function(event) {
            if (document.getElementById(divslotnameStrip) && MMstatusStrip) {
				if(event.slot===mm_stript1) {
					campaignIdStrip = event.campaignId;
					creativeIdStrip = event.creativeId;
					lineItemIdStrip = event.lineItemId;
					sizeStrip = event.size;
					sizeCompletaStrip = event.size;
					idCampagnaMastHead=event.campaignId;
					if(sizeStrip != "3,1" && sizeStrip != "970,250"){
						$("#strip_adv").removeClass("advCollapse");
					}
					if(sizeStrip != '3,1' && sizeStrip != '320,50' && sizeStrip != '320,100' && sizeStrip != '375,100'){
						console.log('[push FE] slotRenderEnded gpt_strip: '+parseInt(performance.now() - startPageTimes.performanceNow));
						isAnimationAllowed = isStripAnimationAllowed(event);
					}
					if(sizeStrip == '100,100'){
						document.getElementById(divslotnameStrip).style.height = '1px';
						document.getElementById(divslotnameStrip).style.display = 'none';
					}
					if(MMlarghezzaSitoAdv <= 970 && sizeCompletaStrip == '720,240'){
						ResizeIframe4();
					}
					if(MMlarghezzaSitoAdv <= 970 && (sizeStrip == '3,1' || sizeStrip == '320,50' || sizeStrip == '320,100' || sizeStrip == '375,100')){
					}
				}
            }
			if (document.getElementById(divslotnameBox) && MMstatusBox) {
				if(event.slot===mm_box1) {
					campaignIdBox = event.campaignId;
					creativeIdBox = event.creativeId;
					lineItemIdBox = event.lineItemId;
					sizeBox = event.size;
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
                //googletag.pubads().refresh(); // Display the ads
				prebitAmazonInit();//header bidding di amazon
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
    
    /* prebid amazon -------------------------------------------------------------------*/ 
    !function(a9,a,p,s,t,A,g){if(a[a9])return;function q(c,r){a[a9]._Q.push([c,r])}a[a9]={init:function(){q("i",arguments)},fetchBids:function(){q("f",arguments)},setDisplayBids:function(){},targetingKeys:function(){return[]},_Q:[]};A=p.createElement(s);A.async=!0;A.src=t;g=p.getElementsByTagName(s)[0];g.parentNode.insertBefore(A,g)}("apstag",window,document,"script","//c.amazon-adsystem.com/aax2/apstag.js");

  // initialize apstag and have apstag set bids on the googletag slots when they are returned to the page
  apstag.init({
     pubID: '3651',
    adServer: 'googletag',
    bidTimeout: 2e3
  });

	
	
	prebitAmazonInit = function(){

	  // request the bids for the four googletag slots
	  apstag.fetchBids({
		slots: [{
			slotID: divslotnameBox,
			slotName: MMsezioneTag,
			sizes: [[300, 250], [300, 600]]
		},
		{
			slotID: divslotnameStrip,
			slotName: MMsezioneTag,
			sizes: [[970, 250], [728, 90], [300, 100], [320, 50]]
		}]	
	  }, function(bids) {
		// set apstag bids, then trigger the first request to DFP
		googletag.cmd.push(function() {
		  apstag.setDisplayBids();
		  googletag.pubads().refresh();    
		});
	  });
		
	};

	//prebitAmazonInit();

/*fine prebid amazon --------------------*/

}//initTagGpt
//

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// FINE STRUTTURA SRA ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var nRefresh = 0;

//funzione per il refresh
function MediamondTagRefresh(){
	//console.log('refresh tag');
	//viene fatto il refresh della tag dopo la 4Â° chiamata
	if(nRefresh == 4){
		googletag.pubads().refresh([mm_box1]);
		nRefresh = 0;
	}else{
		nRefresh ++;
	}
}

var arraySlot = new Array();
var posNew=1;
//
//window.addEventListener("load", function() {
    window.addEventListener("scroll", function() {
        for (n=2;n<20;n++){
            if( document.querySelector("#infinite-adslot-"+n) && statusLoadAdvScroll  ) {
              if( arraySlot[n] == undefined && MMstatusBox ){
                    if(adv_listing != 'listati'){
                        generaGpt(n);
                    }
              }
            }
        }
    });
// });
function generaGpt(nSlot){
	posNew = nSlot;
	if(MMlarghezzaSitoAdv >= 769)
	divslotnameNew = 'infinite-adslot-' + posNew;
	if(MMlarghezzaSitoAdv < 769)
	divslotnameNew = 'mobile-infinite-adslot-' + posNew;
	arraySlot[nSlot] = "pieno";
	googletag.cmd.push(function() {
		if(adv_listing == 'listati'){//i listati sono la home e le home di canale
			var mappingBox = googletag.sizeMapping().
			addSize([0, 0], [300,250]).
			build();
		}else{
			var mappingBox = googletag.sizeMapping().
			addSize([0, 0], [[300,250],[300,600]]).
			build();
		}
		if(MMlarghezzaSitoAdv<768){
			window['mm_mobile_box' + posNew];
			window['mm_mobile_box' + posNew] = googletag.defineSlot(MMsezioneTag,[300,250],divslotnameNew).addService(googletag.pubads()).setTargeting("pos",""+posNew+"").defineSizeMapping(mappingBox).setCollapseEmptyDiv(true).setTargeting("idcampagna",""+idCampagnaBox+"");
		}else{
			window['mm_box' + posNew];
			window['mm_box' + posNew] = googletag.defineSlot(MMsezioneTag,[300,250],divslotnameNew).addService(googletag.pubads()).setTargeting("pos",""+posNew+"").defineSizeMapping(mappingBox).setCollapseEmptyDiv(true).setTargeting("idcampagna",""+idCampagnaBox+"");
        }
		googletag.enableServices();
		googletag.pubads().addEventListener('slotRenderEnded', function(event) {
			if(event.slot===window['mm_box' + posNew] || event.slot===window['mm_mobile_box' + posNew]) {
				sizeCompletaBox = event.size;
                campaignIdBox = event.campaignId;
				creativeIdBox = event.creativeId;
				lineItemIdBox = event.lineItemId;
				sizeBox = event.size;
				idCampagnaBox=event.campaignId;
			}
		});
		googletag.pubads().addEventListener('slotOnload', function(event) {
			if(event.slot===mm_stript1) {
				strip_animation();
			}
			if(event.slot===window['mm_box' + posNew]) {
				initComscore(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,posNew,window['mm_box' + posNew],nSlot,divslotnameNew);
				initIAS(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,posNew,divslotnameNew);
			}
			if(event.slot===window['mm_mobile_box' + posNew]) {
				initComscore(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,posNew,window['mm_mobile_box' + posNew],nSlot,divslotnameNew);
				initIAS(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,posNew,divslotnameNew);
			}
		});

	});
	googletag.cmd.push(function() { googletag.display(divslotnameNew); });
	if(MMlarghezzaSitoAdv<768){
        googletag.pubads().refresh([window['mm_mobile_box' + posNew]]);
    }else{
        googletag.pubads().refresh([window['mm_box' + posNew]]);
    }

}


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
	//console.log('[mediamond]===>get cookie');
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
	if(statusSeedTag && (mediamondTag.length > 0 || adv_section == 'androidworld_gallery')){//mediamondTag.length Ã¨ maggiore di 0 quando Ã¨ in un'alticolo, adv_section == 'androidworld_gallery' Ã¨ presente solo nelle gallery
		console.log('[mediamond][seedtag]===>esecuzione codice');
		var cookieSeedtag = getCookieSeedTag('mediamond');
		if (cookieSeedtag == ""  || cookieSeedtag == null) {
			if(cookieSeedtag != 'seedtag_'+nomeSito){
				window._seedtagq = window._seedtagq || [];
				window._seedtagq.push(['_setId', '1390-8297-01']);
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
			setCookieSeedTag('mediamond','seedtag_'+nomeSito,60);//espresso in minuti
			}//if(cookieSeedtag != 'seedtag_'+nomeSito){
		}//if (userOvl != ""  && userOvl != null) {
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
