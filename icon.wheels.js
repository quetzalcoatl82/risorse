// JavaScript Document
//vengono definite delle variabili che poi verranno utilizzate nei js per l'erogazione dei formati
var MMdatiSkin = new Array();
var nomeSito = 'panoramaauto';
var MediapointDot = 'ame_na_vid_all';
var MMstatusStrip = true;
var MMstatusRichMedia = true;
var idSitoDfp = '244172057';
var statusSeedTag = true;
var MMPosition = 'init';
var KruxSegments;	
var statusInread = true;
var KruxUser;
//per differenziare le varie sezioni
var MMSitoHp = window.location.href;
var MMarrayUrlSkin = new Array();
MMarrayUrlSkin = MMSitoHp.split('/');
/*controllo per togliere la skin momentaneamente*/
var MMarrayUrlSkinControllo = new Array();
MMarrayUrlSkinControllo = MMSitoHp.split('?');
var VerificaSottocanale = MMarrayUrlSkin[3].substr(0, 1);
var urlSetTargheting = MMarrayUrlSkinControllo[0].replace('http://','').replace('https://','').replace('www.','').replace('?refresh','').replace('?utm_source=Zemanta&utm_medium=referral','').replace(/\//gi,'_').replace('=','_','ig').replace('!','_','ig').replace('+','_','ig').replace('*','_','ig').replace('#','_','ig').replace('^','_','ig').replace('~','_','ig').replace(';','_','ig').replace('(','_','ig').replace(')','_','ig').replace('[','_','ig').replace(']','_','ig').replace('"','_','ig').replace("'","_","ig").replace('<','_','ig').replace('>','_');
/* varibile per il canale della tag*/
var MMsezioneTag;
var cssTemplateSkin = 1;

function sendAdUnit(canaleSito){
	MMsezioneTag = '/4758/'+canaleSito;
}
/*valorizzo la funzione*/
if(MMarrayUrlSkin[2] == 'www.panorama-auto.it'){
	if(MMarrayUrlSkin[3] == '' || VerificaSottocanale == '?'){//home
		sendAdUnit('ame_panoauto/home');
	}else if(MMarrayUrlSkin[3] == 'auto-usate'){//home
		sendAdUnit('ame_panoauto/listinousato');
	}else{
		sendAdUnit('ame_panoauto/altre');
	}
	cssTemplateSkin = 1;
}else if(MMarrayUrlSkin[2]=='listino.panorama-auto.it' || MMarrayUrlSkin[2] == 'panoramaauto-drivek-com.dk4p.staging.wpengine.com'){
	sendAdUnit('ame_panoauto/listinonuovo');
	cssTemplateSkin = 2;
}else if(MMarrayUrlSkin[2]=='shop.panorama-auto.it'){
	sendAdUnit('ame_panoauto/altre');
	cssTemplateSkin = 3;
}else if(MMarrayUrlSkin[2]=='blog.panorama-auto.it'){
	sendAdUnit('ame_panoauto/altre');
	cssTemplateSkin = 4;
}else{
	sendAdUnit('ame_panoauto/altre');
}



/*controllo della funzione di webtrak ---------------------------------------------------------------------------------------*/
function getTagPfx(){
    if (typeof(MMsezioneTag) == 'undefined' || typeof(MMsezioneTag) == 'undefined' || MMsezioneTag == null || MMsezioneTag == '')
        return 'undefined';
    else
        return MMsezioneTag;
};


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
    divslotnameStrip = 'adv-gpt-masthead-leaderboard-container1';
	divslotnameBox = 'adv-gpt-box-mobile-container1';
}else{
	//desktop
    divslotnameStrip = 'adv-gpt-masthead-leaderboard-container1';
	divslotnameBox = 'adv-gpt-box-container1';
}
//
function initTagGpt(){
	//console.log('===> chiata tag gpt in modalità SRA');
	//unifico le tag di wqordpress e quelle generate dalla url
	keywordGlobal = mediamondTag.concat(sezionePaginaKey);
    //
	var lipHpsponsor = document.createElement("script");
	lipHpsponsor.async = false;
	lipHpsponsor.type = "text/javascript";
	var useSSL = "https:" == document.location.protocol;
	lipHpsponsor.src = (useSSL ? "https:" : "http:") + "//adv.mediamond.it/hpsponsor/panoramaauto/hpsponsor_dinamic.js";
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

	/*native dafne*/
	var sw = document.documentElement.clientWidth,
	sidebarSlotName1 = (sw<=630) ? 'native-sidebar-mobile-1' : 'native-sidebar-1',
	sidebarSlotName2 = (sw<=630) ? 'native-sidebar-mobile-2' : 'native-sidebar-2',
	sidebarSlotName3 = (sw<=630) ? 'native-sidebar-mobile-3' : 'native-sidebar-3';

	
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

		if(MMstatusRichMedia == true){
			richmedia = googletag.defineOutOfPageSlot(MMsezioneTag,'adv-gpt-outofpage').addService(googletag.pubads());	
		}
		
				
		var mappingStrip = googletag.sizeMapping().
		addSize([0, 0], [[320, 1],[320, 100],[720, 240]]).
		//addSize([0, 0], [[320, 50],[720, 240]]).
		//addSize([401, 499], [720, 240]).
		addSize([971, 500], [[970, 250],[728, 90]]).
		build();
		

		var mappingBox = googletag.sizeMapping().
		addSize([0, 0], [[300,250],[300,600]]).
		build();
			
		//strip
		if (document.getElementById(divslotnameStrip)) {
			mm_stript1 = googletag.defineSlot(MMsezioneTag,[[320,1],[970,250]],divslotnameStrip)
				.defineSizeMapping(mappingStrip)
				.setTargeting('test',2)
				.setTargeting("pos","1")
				.setCollapseEmptyDiv(true)
				.addService(googletag.pubads());

	    var pushInitTime = parseInt(performance.now() - startPageTimes.performanceNow) / 1000;

	    if(MMlarghezzaSitoAdv <= 670 && Math.round(pushInitTime) <= 60) {
	        _gaq.push(['_trackEvent', 'Pushdown_mobile', 'Pushdown_init_gpt', 'diff: ' + Math.round(pushInitTime), Math.round(pushInitTime), 'true']);
	        console.log('[push FE] Pushdown_init_gpt event: '+parseInt(performance.now() - startPageTimes.performanceNow));
	    }
		}
		//box
		if (document.getElementById(divslotnameBox)) {
			mm_box1 = googletag.defineSlot(MMsezioneTag,[300,250],divslotnameBox)
				.defineSizeMapping(mappingBox)
				.setTargeting("pos","1")
				.setCollapseEmptyDiv(true)
				.addService(googletag.pubads());
		}
		
		//skin
		if(MMlarghezzaSitoAdv > 970 && MMarrayUrlSkinControllo[1] !== 'noskin'){
			mm_skin1 = googletag.defineSlot(MMsezioneTag,[100,100],'div-gpt-skin')
				.setTargeting("pos","1")
				.setCollapseEmptyDiv(true)
				.addService(googletag.pubads());
			MMerogazioneSkin = true;
		}
		
		if (document.getElementById('native-home-1')) {
			var nativehome1 = googletag.defineSlot(MMsezioneTag, [[90,100]], 'native-home-1')
			.setTargeting('pos','null')
			.setTargeting('spazio','null')
			.setTargeting('native','home1')
			.setTargeting('tipo_pagina','homepage')
			.setTargeting("cssIndex", "1")
			.setTargeting('sigla_sito','pa')
			.setTargeting('dvc',device)
			.addService(googletag.pubads());
		}
		
		if (document.getElementById('native-home-2')) {
			var nativehome2 = googletag.defineSlot(MMsezioneTag, [[90,100]], 'native-home-2')
			.setTargeting('pos','null')
			.setTargeting('spazio','null')
			.setTargeting('native','home2')
			.setTargeting('tipo_pagina','homepage')
			.setTargeting("cssIndex", "1")
			.setTargeting('sigla_sito','pa')
			.setTargeting('dvc',device)
			.addService(googletag.pubads());
		}
		
			
		if (document.getElementById('native-home-3')) {	
			var nativehome3 = googletag.defineSlot(MMsezioneTag, [[90,100]], 'native-home-3')
			.setTargeting('pos','null')
			.setTargeting('spazio','null')
			.setTargeting('native','home3')
			.setTargeting('tipo_pagina','homepage')
			.setTargeting("cssIndex", "1")
			.setTargeting('sigla_sito','pa')
			.setTargeting('dvc',device)
			.addService(googletag.pubads());
		}
		
		if (document.getElementById(sidebarSlotName1)) {	
			var nativesidebar1 = googletag.defineSlot(MMsezioneTag, [[80,100]], sidebarSlotName1)
			.setTargeting('pos','null')
			.setTargeting('spazio','null')
			.setTargeting('native','sidebar1')
			.setTargeting('tipo_pagina','homepage')
			.setTargeting("cssIndex", "2")
			.setTargeting('sigla_sito','pa')
			.setTargeting('dvc',device)
			.addService(googletag.pubads());
		}
			
		if (document.getElementById(sidebarSlotName2)) {	
			var nativesidebar2 = googletag.defineSlot(MMsezioneTag, [[80,100]], sidebarSlotName2)
			.setTargeting('pos','null')
			.setTargeting('spazio','null')
			.setTargeting('native','sidebar2')
			.setTargeting('tipo_pagina','homepage')
			.setTargeting("cssIndex", "2")
			.setTargeting('sigla_sito','pa')
			.setTargeting('dvc',device)
			.addService(googletag.pubads());
		}
		
		if (document.getElementById(sidebarSlotName3)) {	
			var nativesidebar3 = googletag.defineSlot(MMsezioneTag, [[80,100]], sidebarSlotName3)
			.setTargeting('pos','null')
			.setTargeting('spazio','null')
			.setTargeting('native','sidebar3')
			.setTargeting('tipo_pagina','homepage')
			.setTargeting("cssIndex", "2")
			.setTargeting('sigla_sito','pa')
			.setTargeting('dvc',device)
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
				//console.log('===> slot strip caricato');
                console.log('[push FE] slotOnload gpt_strip: '+parseInt(performance.now() - startPageTimes.performanceNow));
                strip_animation();
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
            if(event.slot===mm_box1) {
				//console.log('===> slot box renderizzato');
				idCampagnaBox=event.campaignId;
                initComscore(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,1,'mm_box1',1,divslotnameBox);
                initIAS(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,1,divslotnameBox);
			}
		});
		googletag.pubads().addEventListener('slotRenderEnded', function(event) {
			if(event.slot===mm_stript1) {
                campaignIdStrip = event.campaignId;
				creativeIdStrip = event.creativeId;
				lineItemIdStrip = event.lineItemId;
				sizeStrip = event.size;
				//console.log('===> slot strip renderizzato');
				sizeCompleta = event.size;				
                idCampagnaMastHead=event.campaignId;
                if((event.size[0] != "970" && event.size[1] != "250")){
                    $("#strip_adv").removeClass("advCollapse");
                }
				if(MMlarghezzaSitoAdv <= 970 && sizeCompleta == '720,240'){
					//console.log('chiamata resize iframe2');
					ResizeIframe4();
				}
				if(MMlarghezzaSitoAdv <= 970 && sizeCompleta == '320,50' && sizeCompleta[1] != 1){
					//console.log('chiamata resize iframe2');
					ChangePosition();
				}
				if(MMlarghezzaSitoAdv >= 970 && sizeCompleta == '720,240'){
					//mi serve per centrare il minimasthead quando la risoluzione è superiore ai 970
					//CenterMinimasthead();
				}
				if(sizeCompleta == '100,100'){
					//console.log('chiamata resize iframe2');
					//document.getElementById('adv-gpt-masthead-skin-container1').style.position = 'absolute';
				}
				if(MMlarghezzaSitoAdv >= 970){
					document.getElementById(divslotnameStrip).style.textAlign = "center";
				}
				isAnimationAllowed = isStripAnimationAllowed(event);
                
			}
            if(event.slot===mm_box1) {
				console.log('===> slot box renderizzato');
                campaignIdBox = event.campaignId;
                creativeIdBox = event.creativeId;
                lineItemIdBox = event.lineItemId;
                sizeBox = event.size;
				idCampagnaBox=event.campaignId;
				//reloadLayout();
			}
			
		}); 
		//out of page
		if(MMstatusRichMedia == true){
			googletag.display("adv-gpt-outofpage");
		}
		//skin
		if (document.getElementById(divslotnameStrip)) {
			googletag.display(divslotnameStrip);
		}
		//box
		if (document.getElementById(divslotnameBox)) {
			googletag.display(divslotnameBox);
		}
		
		if(MMlarghezzaSitoAdv > 970 && MMarrayUrlSkinControllo[1] != 'noskin'){
			googletag.display('div-gpt-skin');
		}
		
		
		if (document.getElementById('native-home-1')) {
			googletag.display('native-home-1');
		}
		if (document.getElementById('native-home-2')) {
			googletag.display('native-home-2');
		}
		if (document.getElementById('native-home-3')) {
			googletag.display('native-home-3');
		}

		
		if (document.getElementById(sidebarSlotName1)) {
			googletag.display(sidebarSlotName1);
		}
		if (document.getElementById(sidebarSlotName2)) {
			googletag.display(sidebarSlotName2);
		}
		if (document.getElementById(sidebarSlotName3)) {
			googletag.display(sidebarSlotName3);
		}
		
		
		if(MMstatusRichMedia == true){
		googletag.display('adv-gpt-outofpage2x2');
		}
		

	});

}//initTagGpt




/*
var adxLoad = false;
window.addEventListener('load', function() {
	if(typeof(ADX_label) != 'undefined'){
		//console.log('===>adx per SRA WINDOWS LOAD label definita:'+ADX_label);
		//console.log('===>load m:'+m);
		if(adxLoad == false){
			adxLoad = true;
			if(MMarrayUrlSkinControllo[1] != 'noadv'){
				initTagGpt();
			}
			//console.log('===> initTag load');
			clearInterval(timer2);
		}
	}else{
		//console.log('===>adx PER SRA WINDOWS LOAD label NON definita');
	}
	
});
var timer2 = setInterval(function(){searchAdxLabel();},100);
function searchAdxLabel(){
	if(typeof(ADX_label) != 'undefined'){
	clearInterval(timer2);
	if(adxLoad == false && document.getElementById(divslotnameBox) && document.getElementById("adv-gpt-masthead-leaderboard-container1") ){
		adxLoad = true;
		if(MMarrayUrlSkinControllo[1] != 'noadv'){
			//console.log('===> initTag timer');
			initTagGpt();
		}
	}
}
}
		*/				
						
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// FINE STRUTTURA SRA ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//
var MMnIframeGoogle;
MMnIframeGoogle=1;
function ResizeIframe2() {
	//metto 1 perchè lo 0 è preso dal 1x1 che non è gestito con il load windows
	//console.log('===>esecuzione resize iframe2');
	if (document.getElementById("google_ads_iframe_"+MMsezioneTag+"_"+MMnIframeGoogle)) {
		
		//console.log('===>iframe masthead width:'+document.getElementById("google_ads_iframe_"+MMsezioneTag+"_"+MMnIframeGoogle).offsetWidth);
		
		var iFrameGptMastHead = document.getElementById("google_ads_iframe_"+MMsezioneTag+"_"+MMnIframeGoogle);
		var divGptMastHead = document.getElementById("google_ads_iframe_"+MMsezioneTag+"_"+MMnIframeGoogle+"__container__");
		var iFrameGptMastHeadWidth = document.getElementById("google_ads_iframe_"+MMsezioneTag+"_"+MMnIframeGoogle).offsetWidth;
		
		if(iFrameGptMastHeadWidth >= 720){
			
			
		iFrameGptMastHead.style.width = MMlarghezzaSitoAdv+'px';
		divGptMastHead.style.width = MMlarghezzaSitoAdv+'px';
		var divGptMastHeadHeightVal = document.getElementById("google_ads_iframe_"+MMsezioneTag+"_"+MMnIframeGoogle).offsetHeight;
		var divGptMastHeadWidthVal = document.getElementById("google_ads_iframe_"+MMsezioneTag+"_"+MMnIframeGoogle).offsetWidth;
		var divGptMastHeadHeightValNew = Math.ceil(((MMlarghezzaSitoAdv*720)/240)/9);
		divGptMastHead.style.height = divGptMastHeadHeightValNew+'px';
		iFrameGptMastHead.style.height = divGptMastHeadHeightValNew+'px';
		
		}
		
	}else{
		ResizeIframe2() 
	}

}

function ResizeIframe3() {
	//===> prende come punto di riferimento il div #adv-gpt-masthead-leaderboard-container1 sempre presente in pagina
	//console.log('[mediamond]===>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
	//console.log('[mediamond]===>ResizeIframe3');
	var rifPointIframeMinimasthead = jQuery("#adv-gpt-masthead-leaderboard-container1").find("iframe");
	var rifPointDivMinimasthead = jQuery("#adv-gpt-masthead-leaderboard-container1").find("div");
	//console.log('[mediamond]===>rifPointIframeMinimasthead:'+rifPointIframeMinimasthead.length);
	//console.log('[mediamond]===>rifPointDivMinimasthead:'+rifPointDivMinimasthead.length);
	var iFrameGptMastHeadWidth = rifPointIframeMinimasthead[0].offsetWidth;
	if(iFrameGptMastHeadWidth >= 720){
		rifPointIframeMinimasthead[0].style.width = MMlarghezzaSitoAdv+'px';
		rifPointDivMinimasthead[0].style.width = MMlarghezzaSitoAdv+'px';
		var divGptMastHeadHeightValNew = Math.ceil(((MMlarghezzaSitoAdv*720)/240)/9);
		rifPointDivMinimasthead[0].style.height = divGptMastHeadHeightValNew+'px';
		rifPointIframeMinimasthead[0].style.height = divGptMastHeadHeightValNew+'px';
	}
}
///----------------------------------------------------------------------------------------------------------------------------
var nRefresh = 0;
//funzione per il refresh
function MediamondTagRefresh(){
	//console.log('refresh tag');
	googletag.pubads().refresh([mm_box1]);
}
var arraySlot = new Array();
var posNew=1;
//controllo lo scrol della pagina
window.addEventListener("load", function (){
window.addEventListener('scroll', function() {
	//console.log('windows scroll');
	for (n=2;n<20;n++){
		//desktop
		if($("#adv-gpt-box-container"+n).length && MMlarghezzaSitoAdv >= 970) {
			//console.log('adv-gpt-box-container'+n+':'+$("#adv-gpt-box-container"+n).length);
		 // console.log('--> adv-gpt-box-container'+n+' esiste');
		  //console.log('array:'+arraySlot[4]);
		  if( arraySlot[n] == undefined ){
			  	generaGpt(n);
		  }
		}
		//mobile
		if($("#adv-gpt-box-mobile-container"+n).length && MMlarghezzaSitoAdv < 970) {
		 // console.log('--> adv-gpt-box-container'+n+' esiste');
		  //console.log('array:'+arraySlot[4]);
		  if( arraySlot[n] == undefined ){
			  	generaGpt(n);
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
		window['mm_mobile_box' + posNew] = googletag.defineSlot(MMsezioneTag,[[300,250],[300,600]],divslotnameNew).addService(googletag.pubads())
		.setTargeting("pos",""+posNew+"").setTargeting("ksg",KruxSegments).setTargeting("kuid",KruxUser);
		googletag.pubads().setTargeting("idcampagna",""+idCampagnaBox+"");
			googletag.pubads().setTargeting("purl",""+urlSetTargheting+"");	
			googletag.pubads().setTargeting("tagWordpress",[""+keywordGlobal+""]);
		googletag.enableServices();
            
            
             googletag.pubads().addEventListener('slotOnload', function(event) {
				if(event.slot===window['mm_mobile_box' + posNew]) {
                    initComscore(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,posNew,window['mm_mobile_box' + posNew],nSlot,divslotnameNew);
                    initIAS(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,posNew,divslotnameNew);
				}

			});
    
    
	googletag.pubads().addEventListener('slotRenderEnded', function(event) {
			campaignIdBox = event.campaignId;
				creativeIdBox = event.creativeId;
				lineItemIdBox = event.lineItemId;
				sizeBox = event.size;
			
		
	});
            
            
            
		});
	}else{
		//desktop
		divslotnameNew = 'adv-gpt-box-container' + nSlot;
		window['mm_box' + posNew];	
		//tag gpt
		googletag.cmd.push(function() {
		window['mm_box' + posNew] = googletag.defineSlot(MMsezioneTag,[300,250],divslotnameNew).addService(googletag.pubads())
		.setTargeting("pos",""+posNew+"").setTargeting("ksg",KruxSegments).setTargeting("kuid",KruxUser);
		googletag.pubads().setTargeting("idcampagna",""+idCampagnaBox+"");
		googletag.pubads().setTargeting("purl",""+urlSetTargheting+"");	
			googletag.pubads().setTargeting("tagWordpress",[""+keywordGlobal+""]);
		googletag.enableServices();
            
            
             googletag.pubads().addEventListener('slotOnload', function(event) {

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
	});
            
            
            
		});
	}
	arraySlot[nSlot] = "pieno";
	googletag.cmd.push(function() { googletag.display(divslotnameNew); });
}
//
window.addEventListener('load', function() {
	//var endUrl = MMarrayUrlSkin[3].indexOf(".html");
	//console.log('[mediamond]===>endUrl:'+endUrl);
	//console.log('[mediamond]===>MMarrayUrlSkin[5]:'+MMarrayUrlSkin[5]);
	
	
	if(statusInread == true && MMarrayUrlSkin[4] != '' && MMarrayUrlSkin[4] != undefined ){
	

		//var rifPointInread =  jQuery(".main-foglia").find("h2");
		//var rifPointInread2 = jQuery(".main-foglia").find("p");
		
		var rifPointInread =  jQuery(".article-content").find("h2");
		var rifPointInread2 = jQuery(".article-content").find("p");
		
		
		
		//console.log('[mediamond]===>rifPointInread:'+rifPointInread);
		//console.log('[mediamond]===>rifPointInread2:'+rifPointInread2);
		if(rifPointInread.length >= 2){
			//console.log('[mediamond]===>rifPointInread esiste');
			jQuery( "<div id='adv-video-article'></div>" ).insertBefore(rifPointInread[1]);
		}else if(rifPointInread2.length >= 3){
			jQuery( "<div id='adv-video-article'></div>" ).insertBefore(rifPointInread2[2]);
		}
		//genero la tag inread dopo che ho creto il div
		if(rifPointInread != undefined && rifPointInread2 != undefined){
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


//è lanciato dall'editore
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
				window._seedtagq.push(['_setId', '8339-7929-01']);
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