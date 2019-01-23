// JavaScript Document
//vengono definite delle variabili che poi verranno utilizzate nei js per l'erogazione dei formati
var MMdatiSkin = [];
var nomeSito = 'starbene';
var MediapointDot = 'ame_sh_vid_all';
var MMstatusStrip = true;
var MMstatusRichMedia = true;
var statusInread = true;
var statusSeedTag = true;
var KruxSegments;
var KruxUser;
//per differenziare le varie sezioni
var MMSitoHp = window.location.href;
var MMarrayUrlSkin = new Array();
MMarrayUrlSkin = MMSitoHp.split('/');
/*controllo per togliere la skin momentaneamente*/
var MMarrayUrlSkinControllo = new Array();
MMarrayUrlSkinControllo = MMSitoHp.split('?');
var VerificaSottocanale = MMarrayUrlSkin[3].substr(0, 1);
//url modificata per passarla nel settargheting
if (MMSitoHp.slice(-1) == '/') {
    var MMSitoHp= MMSitoHp.slice(0, -1);
}
var urlSetTargheting = MMarrayUrlSkinControllo[0].replace('http://','').replace('https://','').replace('www.','').replace('?refresh','').replace('?utm_source=Zemanta&utm_medium=referral','').replace(/\//gi,'_').replace('=','_','ig').replace('!','_','ig').replace('+','_','ig').replace('*','_','ig').replace('#','_','ig').replace('^','_','ig').replace('~','_','ig').replace(';','_','ig').replace('(','_','ig').replace(')','_','ig').replace('[','_','ig').replace(']','_','ig').replace('"','_','ig').replace("'","_","ig").replace('<','_','ig').replace('>','_');
//console.log('===>urlSetTargheting:'+urlSetTargheting);
var cssTemplateSkin = 1;
var MMPosition = 'init';
/* varibile per il canale della tag*/
var MMsezioneTag;
//permette di assegnare la adunit alla pagina

function sendAdUnit(canaleSito){
	MMsezioneTag = '/4758/'+canaleSito;
}

/*valorizzo la tag*/
if(MMarrayUrlSkin[2] == 'www.starbene.it' && (MMarrayUrlSkin[3] == '' || VerificaSottocanale == '?')){//home
	sendAdUnit('ame_starbene/home');
	cssTemplateSkin = 1;
}else if(MMarrayUrlSkin[3] == 'medicina-a-z'){//home
	sendAdUnit('ame_starbene/altre');
	cssTemplateSkin = 3;
}else if(MMarrayUrlSkin[3] == 'oroscopo'){//home
	sendAdUnit('ame_starbene/altre');
	cssTemplateSkin = 2;
}else if(MMarrayUrlSkin[4] == 'diete'){//home
	sendAdUnit('ame_starbene/altre');
	cssTemplateSkin = 2;
}else if(MMarrayUrlSkin[3] == 'bellezza' && MMarrayUrlSkin[4] != ''){//home
	sendAdUnit('ame_starbene/altre');
	cssTemplateSkin = 2;
}else{
	sendAdUnit('ame_starbene/altre');
	cssTemplateSkin = 1;
}


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

if(MMarrayUrlSkinControllo[1]=='testComscore'){
	console.log('[mediamond]===>cambio tag')
	sendAdUnit('test_mediamond/test_comscore');
}else{
	console.log('[mediamond]===>NON cambio tag')
}



//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//cerco la sotto stringa sulle url dei pubbliredazionali dalla url principale per poi poter settare una adunit pubbli
var MMurlPubbli = new Array();
var MMstatusPubbli;
MMurlPubbli.push("tornano-su-sky-le-intense-emozioni-di-intreatment");
for(t=0; t<MMurlPubbli.length; t++){
	MMstatusPubbli = MMSitoHp.indexOf(MMurlPubbli[t]);
	//console.log('===>MMurlPubbli:'+MMurlPubbli[t]);
	//console.log('===>statusPubbli:'+MMstatusPubbli);
	if(MMstatusPubbli>0){
		MMsezioneTag = '/4758/ame_starbene/publi';
	}
}
// file gpt di google /////////////////////////
var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];
(function() {
var gads = document.createElement("script");
gads.async = true;
gads.type = "text/javascript";
var useSSL = "https:" == document.location.protocol;
gads.src = (useSSL ? "https:" : "http:") + "//www.googletagservices.com/tag/js/gpt.js";
var node =document.getElementsByTagName("script")[0];
node.parentNode.insertBefore(gads, node);
})();


/*controllo della funzione di webtrak ---------------------------------------------------------------------------------------*/
function getTagPfx(){
    if (typeof(MMsezioneTag) == 'undefined' || typeof(MMsezioneTag) == 'undefined' || MMsezioneTag == null || MMsezioneTag == '')
        return 'undefined';
    else
        return MMsezioneTag;
};



var sezionePaginaKey = new Array();
var keywordURL = '';
function cercaParolaUrl() {
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
cercaParolaUrl();
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
if(MMlarghezzaSitoAdv < 970) {
	//mobile
	divslotnameBox = 'adv-gpt-box-mobile-container1';
	divslotpromobox1 = 'adv-gpt-promobox-mobile-container1';
	divslotpromobox2 = 'adv-gpt-promobox-mobile-container2';
	divslotpromobox3 = 'adv-gpt-promobox-mobile-container3';
	divslotpromobox4 = 'adv-gpt-promobox-mobile-container4';
}else{
	//desktop
	divslotnameBox = 'adv-gpt-box-container1';
	divslotpromobox1 = 'adv-gpt-promobox-container1';
	divslotpromobox2 = 'adv-gpt-promobox-container2';
	divslotpromobox3 = 'adv-gpt-promobox-container3';
	divslotpromobox4 = 'adv-gpt-promobox-container4';
}
//
function initTagGpt(){
	console.log('[mediamond]===>init gpt');
	//js comscore
	var lipHpsponsor = document.createElement("script");
	lipHpsponsor.async = false;
	lipHpsponsor.type = "text/javascript";
	var useSSL = "https:" == document.location.protocol;
	lipHpsponsor.src = (useSSL ? "https:" : "http:") + "//adv.mediamond.it/hp_sponsor/sezsito_comscore.js";
	var node = document.getElementsByTagName("body")[0];
	node.parentNode.insertBefore(lipHpsponsor, node);


	//console.log('===> chiata tag gpt in modalità SRA');
	//unifico le tag di wqordpress e quelle generate dalla url
	keywordGlobal = mediamondTag.concat(sezionePaginaKey);
	//
	var lipHpsponsor = document.createElement("script");
	lipHpsponsor.async = false;
	lipHpsponsor.type = "text/javascript";
	var useSSL = "https:" == document.location.protocol;
	if(MMarrayUrlSkin[2] == 'blog.donnamoderna.com' && MMarrayUrlSkin[3] == 'salutehitech'){
		lipHpsponsor.src = (useSSL ? "https:" : "http:") + "//adv.mediamond.it/hpsponsor/starbene/hpsponsor_dinamic_blog.js";
	}else{
		lipHpsponsor.src = (useSSL ? "https:" : "http:") + "//adv.mediamond.it/hpsponsor/starbene/hpsponsor_dinamic.js";
	}
	var node = document.getElementsByTagName("body")[0];
	node.parentNode.insertBefore(lipHpsponsor, node);
	//creo un div in cui erogare la tag del out of page
	var newdiv = document.createElement('div');
	newdiv.setAttribute('id', 'adv-gpt-outofpage');
	newdiv.setAttribute("style", "position:absolute;width:1px;height:1px;overflow:hidden;");
	var node = document.getElementsByTagName("body")[0];
	node.appendChild(newdiv);

	//creo un div in cui erogaqre la tag della skin
	var newdiv = document.createElement('div');
	newdiv.setAttribute('id', 'div-gpt-skin');
	newdiv.setAttribute("style", "position:fixed;top:0;left:0;width:1px;height:1px;overflow:hidden;");
	var node = document.getElementsByTagName("body")[0];
	node.appendChild(newdiv);

	var newdiv = document.createElement('div');
	newdiv.setAttribute('id', 'gpt-inread');
	newdiv.setAttribute("style", "position:absolute;width:1px;height:1px;overflow:hidden;");
	var node = document.getElementsByTagName("body")[0];
	node.appendChild(newdiv);

	//ci permetterebbe di gestire un’offerta in programmatic guaranteed anche con i formati out of page
var newdiv = document.createElement('div');
newdiv.setAttribute('id', 'adv-gpt-outofpage2x2');
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

	var sw = document.documentElement.clientWidth,
	  sidebarSlotName1 = (sw<=767) ? 'native-sidebar-mobile-1' : 'native-sidebar-1',
	  sidebarSlotName2 = (sw<=767) ? 'native-sidebar-mobile-2' : 'native-sidebar-2',
	  sidebarSlotName3 = (sw<=767) ? 'native-sidebar-mobile-3' : 'native-sidebar-3';



	googletag.cmd.push(function() {

		if(MMstatusRichMedia == true){
			richmedia = googletag.defineOutOfPageSlot(MMsezioneTag,'adv-gpt-outofpage').addService(googletag.pubads());
		}


		var mappingStrip = googletag.sizeMapping().
		addSize([0, 0], [[320,1],[320, 50],[320, 100],[720, 240]]).
		addSize([401, 499], [720, 240]).
		addSize([971, 500], [[970, 250],[728, 90]]).
		build();

		//strip
		mm_stript1 = googletag.defineSlot(MMsezioneTag,[970,250],'adv-gpt-masthead-leaderboard-container1')
			.defineSizeMapping(mappingStrip)
		  .setTargeting('test',2)
			.setTargeting("pos","1")
			.setCollapseEmptyDiv(true)
			.addService(googletag.pubads());


		var pushInitTime = parseInt(performance.now() - startPageTimes.performanceNow) / 1000;

    if(MMlarghezzaSitoAdv <= 670 && Math.round(pushInitTime) <= 60) {
        ga('send', 'event', 'Pushdown_mobile', 'Pushdown_init_gpt', 'diff: ' + Math.round(pushInitTime), Math.round(pushInitTime), {
           nonInteraction: true
        });
        console.log('[push FE] Pushdown_init_gpt event: '+parseInt(performance.now() - startPageTimes.performanceNow));
    }

		var mappingBox = googletag.sizeMapping().
		addSize([0, 0], [[300, 250],[300, 600]]).
		addSize([971, 500], [300, 250]).
		build();

		//box
		mm_box1 = googletag.defineSlot(MMsezioneTag,[300,250],divslotnameBox)
			.defineSizeMapping(mappingBox)
			.setTargeting("pos","1")
			.setCollapseEmptyDiv(true)
			.addService(googletag.pubads());

		if(MMlarghezzaSitoAdv > 970 && MMarrayUrlSkinControllo[1] != 'noskin'){
			//skin
			mm_skin1 = googletag.defineSlot(MMsezioneTag,[100,100],'div-gpt-skin')
				.setTargeting("pos","1")
				.setCollapseEmptyDiv(true)
				.addService(googletag.pubads());

			MMerogazioneSkin = true;
		}

		if ((document.getElementById("adv-gpt-promobox-container1") && MMlarghezzaSitoAdv >= 970) || (document.getElementById("adv-gpt-promobox-mobile-container1") && MMlarghezzaSitoAdv < 970) ) {

			//promobox
			promobox1 = googletag.defineSlot(MMsezioneTag, [300, 100], divslotpromobox1)
				.addService(googletag.pubads())
				.setCollapseEmptyDiv(true)
				.setTargeting("pos", "1");

		}

		if ((document.getElementById("adv-gpt-promobox-container2") && MMlarghezzaSitoAdv >= 970) || (document.getElementById("adv-gpt-promobox-mobile-container2") && MMlarghezzaSitoAdv < 970) ) {

			promobox2 = googletag.defineSlot(MMsezioneTag, [300, 100], divslotpromobox2)
				.addService(googletag.pubads())
				.setCollapseEmptyDiv(true)
				.setTargeting("pos", "2");

		}
		if (document.getElementById("native-home-1") ){
			var nativehome1 = googletag.defineSlot(MMsezioneTag, [[90,100]], 'native-home-1')
			.setTargeting('pos','null')
			.setTargeting('spazio','null')
			.setTargeting('native','home1')
			.setTargeting('tipo_pagina','homepage')
			.setTargeting("cssIndex", "1")
			.setTargeting('sigla_sito','sb')
			.setTargeting('dvc',device)
			.setCollapseEmptyDiv(true)
			.addService(googletag.pubads());
		}
		if (document.getElementById("native-home-2") ){
			var nativehome2 = googletag.defineSlot(MMsezioneTag, [[90,100]], 'native-home-2')
			.setTargeting('pos','null')
			.setTargeting('spazio','null')
			.setTargeting('native','home2')
			.setTargeting('tipo_pagina','homepage')
			.setTargeting("cssIndex", "1")
			.setTargeting('sigla_sito','sb')
			.setTargeting('dvc',device)
			.setCollapseEmptyDiv(true)
			.addService(googletag.pubads());
		}
		if (document.getElementById("native-home-3") ){
			var nativehome3 = googletag.defineSlot(MMsezioneTag, [[90,100]], 'native-home-3')
			.setTargeting('pos','null')
			.setTargeting('spazio','null')
			.setTargeting('native','home3')
			.setTargeting('tipo_pagina','homepage')
			.setTargeting("cssIndex", "1")
			.setTargeting('sigla_sito','sb')
			.setTargeting('dvc',device)
			.setCollapseEmptyDiv(true)
			.addService(googletag.pubads());
		}


		if (document.getElementById("native-list-1") ){
			var nativehome1 = googletag.defineSlot(MMsezioneTag, [[90,100]], 'native-list-1')
			.setTargeting('pos','null')
			.setTargeting('spazio','null')
			.setTargeting('native','home1')
			.setTargeting('tipo_pagina','homepage')
			.setTargeting("cssIndex", "1")
			.setTargeting('sigla_sito','sb')
			.setTargeting('dvc',device)
			.setCollapseEmptyDiv(true)
			.addService(googletag.pubads());
		}

		if (document.getElementById("native-list-2") ){
			var nativehome1 = googletag.defineSlot(MMsezioneTag, [[90,100]], 'native-list-2')
			.setTargeting('pos','null')
			.setTargeting('spazio','null')
			.setTargeting('native','home2')
			.setTargeting('tipo_pagina','homepage')
			.setTargeting("cssIndex", "1")
			.setTargeting('sigla_sito','sb')
			.setTargeting('dvc',device)
			.setCollapseEmptyDiv(true)
			.addService(googletag.pubads());
		}

		if (document.getElementById("native-list-3") ){
			var nativehome1 = googletag.defineSlot(MMsezioneTag, [[90,100]], 'native-list-3')
			.setTargeting('pos','null')
			.setTargeting('spazio','null')
			.setTargeting('native','home3')
			.setTargeting('tipo_pagina','homepage')
			.setTargeting("cssIndex", "1")
			.setTargeting('sigla_sito','sb')
			.setTargeting('dvc',device)
			.setCollapseEmptyDiv(true)
			.addService(googletag.pubads());
		}

		if (document.getElementById(sidebarSlotName1) ){
			var nativesidebar1 = googletag.defineSlot(MMsezioneTag, [[80,100]], sidebarSlotName1)
			.setTargeting('pos','null')
			.setTargeting('spazio','null')
			.setTargeting('native','sidebar1')
			.setTargeting('tipo_pagina','homepage')
			.setTargeting("cssIndex", "2")
			.setTargeting('sigla_sito','sb')
			.setTargeting('dvc',device)
			.setCollapseEmptyDiv(true)
			.addService(googletag.pubads());
		}
		if (document.getElementById(sidebarSlotName2) ){
			var nativesidebar2 = googletag.defineSlot(MMsezioneTag, [[80,100]], sidebarSlotName2)
			.setTargeting('pos','null')
			.setTargeting('spazio','null')
			.setTargeting('native','sidebar2')
			.setTargeting('tipo_pagina','homepage')
			.setTargeting("cssIndex", "2")
			.setTargeting('sigla_sito','sb')
			.setTargeting('dvc',device)
			.setCollapseEmptyDiv(true)
			.addService(googletag.pubads());
		}

		if (document.getElementById(sidebarSlotName3) ){
			var nativesidebar3 = googletag.defineSlot(MMsezioneTag, [[80,100]], sidebarSlotName3)
			.setTargeting('pos','null')
			.setTargeting('spazio','null')
			.setTargeting('native','sidebar3')
			.setTargeting('tipo_pagina','homepage')
			.setTargeting("cssIndex", "2")
			.setTargeting('sigla_sito','sb')
			.setTargeting('dvc',device)
			.setCollapseEmptyDiv(true)
			.addService(googletag.pubads());
		}




		if(MMstatusRichMedia == true){
		richmedia2x2 = googletag.defineSlot(MMsezioneTag, [2,2], 'adv-gpt-outofpage2x2').addService(googletag.pubads());
		}

		googletag.pubads().setTargeting("purl",""+urlSetTargheting+"");
		googletag.pubads().setTargeting("keywordURL",[""+keywordURL+""]);
		googletag.pubads().setTargeting("sezionePagina",[""+sezionePaginaKey+""]);
		googletag.pubads().setTargeting("tagWordpress",[""+keywordGlobal+""]);
		googletag.pubads().setTargeting("adx",ADX_label);
		googletag.pubads().setTargeting("ksg",KruxSegments);
		googletag.pubads().setTargeting("kuid",KruxUser);
		googletag.pubads().enableSingleRequest();
		googletag.enableServices();

		googletag.pubads().addEventListener('slotOnload', function(event) {
			if(event.slot===mm_stript1) {
        console.log('===> slot strip caricato');
         strip_animation();
				//console.log('===> slot strip caricato');
				console.log('[mediamond]===> sizeStrip:'+sizeStrip);
				//funzione richiesta da Nicola: in questo modo dovremmo avere il masthead che si incolla in alto nei siti con il nuovo header, su tutte le pagine tranne che la homepage
				if (jQuery(".ameheader_header").hasClass("ameheader_topstrip")) {
					if (typeof AMEheader!=="undefined") {
						AMEheader.topstrip()
					}
				}
				if(sizeStrip == '728,90'){
					initComscore(campaignIdStrip,creativeIdStrip,lineItemIdStrip,sizeStrip,1,'mm_stript1',1,'adv-gpt-masthead-leaderboard-container1');
				}
			}
			if(event.slot===mm_box1) {
				console.log('[mediamond]===>slotOnload....');
				//setInterval(function(){ initComscore(event.campaignId,event.creativeId,event.lineItemId,event.size,1,'mm_box1'); }, 3000);
				//if(MMarrayUrlSkinControllo[1]=='testComscore'){
					initComscore(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,1,'mm_box1',1,divslotnameBox);
				//}
			}
		});
		googletag.pubads().addEventListener('slotRenderEnded', function(event) {
			//var path = event.slot.getAdUnitPath();
				//console.log('[mediamond]===>path:'+path);
			if(event.slot===mm_stript1) {

        if((event.size[0] != "970" && event.size[1] != "250")){
            $("#strip_adv").removeClass("advCollapse");
        }
        console.log('[push FE] slotRenderEnded gpt_strip: '+parseInt(performance.now() - startPageTimes.performanceNow));
        isAnimationAllowed = isStripAnimationAllowed(event);

				campaignIdStrip = event.campaignId;
				creativeIdStrip = event.creativeId;
				lineItemIdStrip = event.lineItemId;
				sizeStrip = event.size;

				//console.log('===> slot strip renderizzato');
				sizeCompleta = event.size;
				idCampagnaMastHead=event.campaignId;
				if(MMlarghezzaSitoAdv <= 970 && sizeCompleta[0] == 720){
					//console.log('chiamata resize iframe2');
					ResizeIframe3();
				}
				if(MMlarghezzaSitoAdv <= 970 && sizeCompleta[0] == 320){
					//console.log('chiamata resize iframe2');
					ChangePosition();
				}
				//initComscore(event.campaignId,event.creativeId,event.lineItemId,event.size,1,'mm_stript1');
			}
			if(event.slot===mm_box1) {
				console.log('[mediamond]===>slotRenderEnded....');
				campaignIdBox = event.campaignId;
				creativeIdBox = event.creativeId;
				lineItemIdBox = event.lineItemId;
				sizeBox = event.size;
				//console.log('===> slot box renderizzato');
				idCampagnaBox=event.campaignId;
				//console.log('[mediamond]===>campaignIdBox:'+campaignIdBox+',creativeIdBox:'+creativeIdBox+',lineItemIdBox:'+lineItemIdBox);
				//setInterval(function(){ initComscore(event.campaignId,event.creativeId,event.lineItemId,event.size,1,'mm_box1'); }, 3000);
				//initComscore(event.campaignId,event.creativeId,event.lineItemId,event.size,1,'mm_box1');
			}


		});
		//
		if(MMstatusRichMedia == true){
			googletag.display("adv-gpt-outofpage");
		}


		googletag.display("adv-gpt-masthead-leaderboard-container1");
		googletag.display(divslotnameBox);

		if(MMlarghezzaSitoAdv > 970 && MMarrayUrlSkinControllo[1] != 'noskin'){
			googletag.display('div-gpt-skin');
		}

		if ((document.getElementById("adv-gpt-promobox-container1") && MMlarghezzaSitoAdv >= 970) || (document.getElementById("adv-gpt-promobox-mobile-container1") && MMlarghezzaSitoAdv < 970) ) {
			googletag.display(divslotpromobox1);
		}

		if ((document.getElementById("adv-gpt-promobox-container2") && MMlarghezzaSitoAdv >= 970) || (document.getElementById("adv-gpt-promobox-mobile-container2") && MMlarghezzaSitoAdv < 970) ) {
			googletag.display(divslotpromobox2);
		}
		///native dafne
		if (document.getElementById("native-home-1") ){
			googletag.display('native-home-1');
		}
		if (document.getElementById("native-home-2") ){
			googletag.display('native-home-2');
		}
		if (document.getElementById("native-home-3") ){
    		googletag.display('native-home-3');
		}
		if (document.getElementById("native-list-1") ){
			googletag.display('native-list-1');
		}
		if (document.getElementById("native-list-2") ){
			googletag.display('native-list-2');
		}
		if (document.getElementById("native-list-3") ){
    		googletag.display('native-list-3');
		}
		if (document.getElementById(sidebarSlotName1) ){
			googletag.display(sidebarSlotName1);
		}
		if (document.getElementById(sidebarSlotName2) ){
			googletag.display(sidebarSlotName2);
		}
		if (document.getElementById(sidebarSlotName3) ){
			googletag.display(sidebarSlotName3);
		}
		if(MMstatusRichMedia == true){
			googletag.display('adv-gpt-outofpage2x2');
		}
	});

}//initTagGpt

var adxLoad = false;
var timerCheckPage = setInterval(function(){checkPageAdv();},100);
var statusLoadGpt = false;
function checkPageAdv(){
	if(typeof(ADX_label) != 'undefined' && !statusLoadGpt){
			if(/*valoreCookie && */MMarrayUrlSkinControllo[1] != 'noadv' && (document.getElementById(divslotnameBox) || document.getElementById("adv-gpt-masthead-leaderboard-container1"))){
				initTagGpt();
				clearInterval(timerCheckPage);
				statusLoadGpt = true;
			}
		}
}
window.addEventListener('load', function() {
		//controllo se l'utente ha interaggito con la pagina prima di far caricare l'adv
		if(MMarrayUrlSkinControllo[1] != 'noadv' && !statusLoadGpt){
			initTagGpt();
			clearInterval(timerCheckPage);
			statusLoadGpt = false;
		}
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// FINE STRUTTURA SRA ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ResizeIframe3() {
	//===> prende come punto di riferimento il div #adv-gpt-masthead-leaderboard-container1 sempre presente in pagina
	//console.log('[mediamond]===>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
	//console.log('[mediamond]===>ResizeIframe3');
	var rifPointIframeMinimasthead = jQuery("#adv-gpt-masthead-leaderboard-container1").find("iframe");
	var rifPointDivMinimasthead = jQuery("#adv-gpt-masthead-leaderboard-container1").find("div");
	//console.log('[mediamond]===>rifPointIframeMinimasthead:'+rifPointIframeMinimasthead.length);
	//console.log('[mediamond]===>rifPointDivMinimasthead:'+rifPointDivMinimasthead.length);
	var iFrameGptMastHeadWidth = rifPointIframeMinimasthead[0].offsetWidth;
	//if(iFrameGptMastHeadWidth >= 720){
		rifPointIframeMinimasthead[0].style.width = MMlarghezzaSitoAdv+'px';
		rifPointDivMinimasthead[0].style.width = MMlarghezzaSitoAdv+'px';
		var divGptMastHeadHeightValNew = Math.ceil(((MMlarghezzaSitoAdv*720)/240)/9);
		rifPointDivMinimasthead[0].style.height = divGptMastHeadHeightValNew+'px';
		rifPointIframeMinimasthead[0].style.height = divGptMastHeadHeightValNew+'px';
	//}
}
//
function ChangePosition(){
	//console.log('===>ChangePosition');
	jQuery('#adv-gpt-masthead-leaderboard-container1').attr('style','left: 0; position:fixed; bottom:0;z-index:999999;text-align:center;width:100%;background-color:#fff;');
}
///---------------------------------------------------------------------------------------------------------------------------------
var nRefresh = 0;
//funzione per il refresh
function MediamondTagRefresh(){
	//console.log('refresh tag');
	//viene fatto il refresh della tag dopo la 4° chiamata
	if(nRefresh == 4){
		googletag.pubads().refresh([window.mm_box1]);
		nRefresh = 0;
	}else{
		nRefresh ++;
	}
}
var arraySlot = new Array();
var posNew=1;
//controllo lo scrol della pagina
window.addEventListener('load', function() {
	window.addEventListener('scroll', function() {
		//console.log('windows scroll');
		for (n=2;n<20;n++){
			if( jQuery("#adv-gpt-box-container"+n).length && MMlarghezzaSitoAdv >= 970 ) {
			  //console.log('--> adv-gpt-box-container'+n+' esiste');
			  //console.log('array:'+arraySlot[4]);
			  if( arraySlot[n] == undefined ){
					generaGpt(n);
				//console.log('div vuoto' );
			  }
			}
			if(jQuery("#adv-gpt-box-mobile-container"+n).length && MMlarghezzaSitoAdv < 970 ) {
			  //console.log('--> adv-gpt-box-container'+n+' esiste');
			  //console.log('array:'+arraySlot[4]);
			  if( arraySlot[n] == undefined ){
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
	posNew == nSlot;
	if(MMlarghezzaSitoAdv < 970) {
		//mobile
		divslotnameNew = 'adv-gpt-box-mobile-container' + nSlot;
		window['mm_mobile_box' + posNew];
		//tag gpt
		googletag.cmd.push(function() {
		window['mm_mobile_box' + posNew] = googletag.defineSlot(MMsezioneTag,[[300,250],[300,600]],divslotnameNew).addService(googletag.pubads())
		.setTargeting("pos",""+posNew+"").setCollapseEmptyDiv(true);
		googletag.pubads().setTargeting("idcampagna",""+idCampagnaBox+"");
		googletag.pubads().setTargeting("purl",""+urlSetTargheting+"");
		googletag.pubads().setTargeting("adx",""+ADX_label+"");
			googletag.pubads().setTargeting("ksg",KruxSegments);
		googletag.pubads().setTargeting("kuid",KruxUser);
			googletag.pubads().setTargeting("tagWordpress",[""+keywordGlobal+""]);
		googletag.enableServices();

			googletag.pubads().addEventListener('slotRenderEnded', function(event) {
				if(event.slot===window['mm_mobile_box' + posNew]) {
					//leggo l'id label: https://developers.google.com/doubleclick-gpt/reference#googletagresponseinformation
					idCampagnaBox=event.campaignId;
					//checkInvendutoBox(nSlot);
				}
			});

		});
	}else{
		//desktop
		divslotnameNew = 'adv-gpt-box-container' + nSlot;
		window['mm_box' + posNew];
		//tag gpt
		googletag.cmd.push(function() {
		window['mm_box' + posNew] = googletag.defineSlot(MMsezioneTag,[300,250],divslotnameNew).addService(googletag.pubads())
		.setTargeting("pos",""+posNew+"").setCollapseEmptyDiv(true);
		googletag.pubads().setTargeting("idcampagna",""+idCampagnaBox+"");
		googletag.pubads().setTargeting("purl",""+urlSetTargheting+"");
		googletag.pubads().setTargeting("adx",""+ADX_label+"");
		googletag.pubads().setTargeting("ksg",KruxSegments);
		googletag.pubads().setTargeting("kuid",KruxUser);
			googletag.pubads().setTargeting("tagWordpress",[""+keywordGlobal+""]);
		googletag.enableServices();
		});
	}
	arraySlot[nSlot] = "pieno";
	googletag.cmd.push(function() { googletag.display(divslotnameNew); });
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//inread
window.addEventListener('load', function() {
	//var endUrl = MMarrayUrlSkin[3].indexOf(".html");
	//console.log('[mediamond]===>endUrl:'+endUrl);
	//console.log('[mediamond]===>MMarrayUrlSkin[5]:'+MMarrayUrlSkin[5]);
	if(statusInread == true ){
		//console.log('[mediamond]===>div inread inserito');
		//var presPointInread = jQuery(".inread");
		var rifPointInread =  jQuery(".article-content").find("p");
		//console.log('[mediamond]===>rifPointInread:'+rifPointInread);
		//console.log('[mediamond]===>rifPointInread2:'+rifPointInread2);
		if(rifPointInread != undefined){
			//console.log('[mediamond]===>rifPointInread esiste');
			jQuery( "<div id='adv-video-article'></div>" ).insertBefore(rifPointInread[2]);
		}
		//genero la tag inread dopo che ho creto il div
		if(rifPointInread != undefined){
			googletag.cmd.push(function() {
				mm_inread = googletag.defineSlot(MMsezioneTag, [640,5], 'gpt-inread').addService(googletag.pubads()).setTargeting("idcampagna",""+idCampagnaBox+"").setTargeting("purl",""+urlSetTargheting+"").setTargeting("adx",ADX_label).setTargeting("ksg",KruxSegments).setTargeting("kuid",KruxUser).setCollapseEmptyDiv(true);
				googletag.enableServices();
				googletag.pubads().addEventListener('slotRenderEnded', function(event) {
					if(event.slot===mm_inread){
						//console.log('[mediamond]===>inread renderizzato');
					}
				});
				googletag.display('gpt-inread');
			});
		}
	}//if statusInread
});


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
//la funzione è lanciata dall'editore
function initSeedTag(){
	//controllo se siamo in un articolo, cercando il tag 'article'
	var rifPointSeed = jQuery("body").find("article");
    //console.log('[mediamond]===>rifPointSeed:'+rifPointSeed.length);
	//faccio eseguire la chiamata solo se siamo in un articolo rifPointSeed.length>0
	if(statusSeedTag && rifPointSeed.length>0){
		console.log('[mediamond]===>init seedtag');
		var cookieSeedtag = getCookieSeedTag('mediamond');
		if (cookieSeedtag == ""  || cookieSeedtag == null) {
			if(cookieSeedtag != 'seedtag_'+nomeSito){
				console.log('[mediamond]===>erogazione codice seedtag');
				window._seedtagq = window._seedtagq || [];
				window._seedtagq.push(['_setId', '0525-5450-01']);
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
/// Comscore ////////////////////////////////////////////////////////////////////////////////////////////
function initComscore(campaignId,creativeId,lineItemId,size,pos,slot,nslot,divslot){

	console.log('[mediamond]====>sezioneMMcmsc:'+sezioneMMcmsc);

	console.log('[mediamond]===>dati codice Comscore:campaignId='+campaignId+',creativeId='+creativeId+',lineItemId:'+lineItemId+',size='+size+',pos='+pos+',slot='+slot+',nslot='+nslot+',divslot='+divslot);

	var idSitoDfp = '244175897';

	var sitoMM = document.location.hostname.replace("www.","").split(".")[0];

	//console.log('[mediamond]===>MMarrayUrlSkin[3].charAt(0):'+MMarrayUrlSkin[3].charAt(0));

	if (MMarrayUrlSkin[3] != "" && MMarrayUrlSkin[3] != undefined && MMarrayUrlSkin[3].charAt(0) != '?') {
		sezioneMMComscore = "_"+MMarrayUrlSkin[3];
	}else{
		sezioneMMComscore = '';
	}

	var urlPag = sezioneMMcmsc;//sitoMM+sezioneMMComscore;

	var devType = "_desk";
	if(navigator.userAgent.indexOf('iPhone') != -1)   { devType = "_mob_iPh"; } else if( navigator.userAgent.indexOf('iPad') != -1 )   { devType = "_mob_iPa"; } else if( navigator.userAgent.indexOf('Android') != -1 && navigator.userAgent.indexOf('Mobile') != -1 )   { devType = "_mob_AnS"; } else if( navigator.userAgent.indexOf('Android') != -1 && !navigator.userAgent.indexOf('Mobile') != -1  )   { devType = "_mob_AnT"; }

	//rifPointComscore non si popolava in caso di iframe di adex per problemi di cross domain (perchè se eroga adex l'iframe di dfp non è presente), quindi l'ho dichiarata prima come nuovo array
	var rifPointComscore = new Array();
	rifPointComscore = jQuery('script#tealium-tag-3005');

	//---------------------------------------------------------------------------------------------------------------------------------------------

	var sizeMod = size[0]+'x'+size[1];

	console.log('[mediamond]===>sizeMod:'+sizeMod);

	var iframeAdvSrc = jQuery('#'+divslot+' > div >iframe').attr('src');
	console.log('[mediamond]===>iframeAdvSrc:'+iframeAdvSrc);

	if((iframeAdvSrc == null || iframeAdvSrc == undefined) && lineItemId != null){


		rifPointComscore = jQuery('#'+divslot+' > div >iframe').contents().find('#scriptComscore');

		console.log('[mediamond]===>xxxx rifPointComscore:'+rifPointComscore.length);

		if(rifPointComscore.length == 0){
			console.log('[mediamond]===>inserimento codice Comscore mm_stript1...');

			var st = document.createElement('script');
			st.id="scriptComscore"+slot;
			st.type = 'text/javascript';
			st.async = true;
			st.src = "//sb.voicefive.com/c2/12315081/rs.js#c1=3&c3="+campaignId+"_"+lineItemId+"&c4="+sizeMod+"_"+pos+"_"+creativeId+devType+"&c5="+urlPag+devType+"&c11="+idSitoDfp+"&c12=&c13="+sizeMod+"&c16=dfp";
			document.getElementById(divslot).appendChild(st);


		}

	}else{

		var st = document.createElement('script');
		st.id="scriptComscore"+slot;
		st.type = 'text/javascript';
		st.async = true;
		st.src = "//sb.voicefive.com/c2/12315081/rs.js#c1=3&c3=programmatic&c4="+sizeMod+"_"+pos+devType+"&c5="+urlPag+devType+"&c11="+idSitoDfp+"&c12=&c13="+sizeMod+"&c16=dfp";
		document.getElementById(divslot).appendChild(st);

	}//if(iframeAdvBoxSrc == null || iframeAdvBoxSrc == undefined){






	//----------------------------------------------------------------------------------------------------------------------------------------------




/*

	//300x250/600, 728x90

	//strip
	if(slot == 'mm_stript1' && (size[0] == '728' && size[0] == '90')){
		console.log('[mediamond]===>slot mm_stript1 ------------------------------------------------------------------------');

		var sizeMod = size[0]+'x'+size[1];

		console.log('[mediamond]===>sizeMod:'+sizeMod);

		var iframeAdvStripSrc = jQuery('#adv-gpt-masthead-leaderboard-container1 > div >iframe').attr('src');
		console.log('[mediamond]===>iframeAdvStripSrc:'+iframeAdvStripSrc);

		if(iframeAdvStripSrc == null || iframeAdvStripSrc == undefined){


			rifPointComscore = jQuery('#adv-gpt-masthead-leaderboard-container1 > div >iframe').contents().find('#scriptComscore');

			console.log('[mediamond]===>xxxx rifPointComscore:'+rifPointComscore.length);

			if(rifPointComscore.length == 0){
				console.log('[mediamond]===>inserimento codice Comscore mm_stript1...');

				var st = document.createElement('script');
				st.id="scriptComscore"+slot;
				st.type = 'text/javascript';
				st.async = true;
				st.src = "//sb.voicefive.com/c2/12315081/rs.js#c1=3&c3="+campaignId+"_"+lineItemId+"&c4="+sizeMod+"_"+pos+"_"+creativeId+devType+"&c5="+urlPag+devType+"&c11="+idSitoDfp+"&c12=&c13="+sizeMod+"&c16=dfp";
				document.getElementById('adv-gpt-masthead-leaderboard-container1').appendChild(st);


			}

		}else{

			var st = document.createElement('script');
			st.id="scriptComscore"+slot;
			st.type = 'text/javascript';
			st.async = true;
			st.src = "//sb.voicefive.com/c2/12315081/rs.js#c1=3&c3=programmatic&c4="+sizeMod+"_"+pos+devType+"&c5="+urlPag+devType+"&c11="+idSitoDfp+"&c12=&c13="+sizeMod+"&c16=dfp";
			document.getElementById('adv-gpt-masthead-leaderboard-container1').appendChild(st);

		}//if(iframeAdvBoxSrc == null || iframeAdvBoxSrc == undefined){
	}


	//box
	if(slot == 'mm_box1'){
		console.log('[mediamond]===>slot mm_box1 v1.0 -'+divslotnameBox+' -------------------------------------------------------------------------');
		var sizeMod = size[0]+'x'+size[1];
		//var sizeMod = size.replace(',','x');
		console.log('[mediamond]===>sizeMod:'+sizeMod);

		var iframeAdvBoxSrc = jQuery('#adv-gpt-box-container1 > div >iframe').attr('src');
			console.log('[mediamond]===>iframeAdvBoxSrc:'+iframeAdvBoxSrc);

		if(iframeAdvBoxSrc == null || iframeAdvBoxSrc == undefined){
			rifPointComscore = jQuery('#adv-gpt-box-container1 > div >iframe').contents().find('#scriptComscore');

			console.log('[mediamond]===>xxxx rifPointComscore:'+rifPointComscore.length);


			if(rifPointComscore.length == 0){
				console.log('[mediamond]===>inserimento codice Comscore mm_box1...');

				var st = document.createElement('script');
				st.id="scriptComscore"+slot;
				st.type = 'text/javascript';
				st.async = true;
				st.src = "//sb.voicefive.com/c2/12315081/rs.js#c1=3&c3="+campaignId+"_"+lineItemId+"&c4="+sizeMod+"_"+pos+devType+"_"+creativeId+"&c5="+urlPag+devType+"&c11="+idSitoDfp+"&c12=&c13="+sizeMod+"&c16=dfp";
				//document.body.appendChild(st);
				document.getElementById('adv-gpt-box-container1').appendChild(st);


			}

		}else{

			var st = document.createElement('script');
				st.id="scriptComscore"+slot;
				st.type = 'text/javascript';
				st.async = true;
				st.src = "//sb.voicefive.com/c2/12315081/rs.js#c1=3&c3=programmatic&c4="+sizeMod+"_"+pos+devType+"&c5="+urlPag+devType+"&c11="+idSitoDfp+"&c12=&c13="+sizeMod+"&c16=dfp";
				//document.body.appendChild(st);
				document.getElementById('adv-gpt-box-container1').appendChild(st);


		}


	}*/

}
//initComscore();
//setInterval(function(){ initComscore(); }, 5000);

/// fine comscore /////////////////////////////////////////////////////////////////////////////////////
