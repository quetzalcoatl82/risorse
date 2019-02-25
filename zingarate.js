// JavaScript Document
//questo serve per far apparire la personalizzazione
document.write('<div id="adv-skin"></div>');
//
var MMdatiSkin = new Array();
var nomeSito = 'zingarate';
var MediapointDot = '';
var MMstatusStrip = true;
var statusStrip = true;
var status300x100 = true;
var idSitoDfp = '26338217';
var MMstatusRichMedia = true;
var MMPosition = 'init';
var cssTemplateSkin = 1;
var MMerogazioneSkin = false;
var statusInread = true;
var statusSeedTag = true;
var KruxSegments;
var KruxUser;
var statusPersonalizzazioniWeb = false;
var larghezzaSitoAdv=window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;
//per differenziare le varie sezioni
var MMSitoHp = window.location.href;
var MMarrayUrlSkin = new Array();
MMarrayUrlSkin = MMSitoHp.split('/');
var arrayUrlSkin = new Array();
arrayUrlSkin = MMSitoHp.split('/');
/*controllo per togliere la skin momentaneamente*/
var MMarrayUrlSkinControllo = new Array();
MMarrayUrlSkinControllo = MMSitoHp.split('?');
var VerificaSottocanale = MMarrayUrlSkin[3].substr(0, 1);
//url modificata per passarla nel settargheting
if (MMSitoHp.slice(-1) == '/') {
    var MMSitoHp= MMSitoHp.slice(0, -1);
}
var urlSetTargheting = MMSitoHp.replace('http://','').replace('https://','').replace('www.','').replace('?refresh','').replace('?utm_source=Zemanta&utm_medium=referral','').replace(/\//gi,'_').replace('=','_','ig').replace('!','_','ig').replace('+','_','ig').replace('*','_','ig').replace('#','_','ig').replace('^','_','ig').replace('~','_','ig').replace(';','_','ig').replace('(','_','ig').replace(')','_','ig').replace('[','_','ig').replace(']','_','ig').replace('"','_','ig').replace("'","_","ig").replace('<','_','ig').replace('>','_');
/* varibile per il canale della tag*/
var MMsezioneTag;
//permette di assegnare la adunit alla pagina

function sendAdUnit(canaleSito){
	MMsezioneTag = '/4758/'+canaleSito;
	sezioneTag = '/4758/'+canaleSito;
}


if(MMarrayUrlSkin[2] == 'www.zingarate.com'){
	if(MMarrayUrlSkin[3] == '' || VerificaSottocanale == '?'){//home
		sendAdUnit('zingarate/home');
		cssTemplateSkin = 5;
	}else if(MMarrayUrlSkin[3] == 'destinazioni'){
		sendAdUnit('zingarate/ros');
		cssTemplateSkin = 5;
	}else if(MMarrayUrlSkin[3] == 'cerca-hotel'){
		sendAdUnit('zingarate/offerte');
		cssTemplateSkin = 2;
	}
	else if(MMarrayUrlSkin[3] == 'offerte'){//home
		sendAdUnit('zingarate/offerte');
		cssTemplateSkin = 5;
	}else if(MMarrayUrlSkin[3] == 'foto'){//home
		sendAdUnit('zingarate/gallery');
		cssTemplateSkin = 2;
	}else{
		sendAdUnit('zingarate/ros');
		cssTemplateSkin = 1;
	}
}else if(arrayUrlSkin[2] == 'foto-viaggi.zingarate.com' ){

	sendAdUnit('zingarate/gallery');
		cssTemplateSkin = 1;;

}else if(arrayUrlSkin[2] == 'voli-lowcost.zingarate.com' ){

	sendAdUnit('zingarate/voli');
		cssTemplateSkin = 1;

}else if(arrayUrlSkin[2] == 'forum.zingarate.com' ){

	sendAdUnit('zingarate/forum');
		cssTemplateSkin = 1;

}else{
	sendAdUnit('zingarate/ros');
	cssTemplateSkin = 1;
}


//cerco la sotto stringa sulle url dei pubbliredazionali dalla url principale per poi poter settare una adunit pubbli
var MMurlPubbli = new Array();
var MMstatusPubbli;
var MMstatusSpeciali = false;
MMurlPubbli.push("nessuno");
MMurlPubbli.push("speciale");
for(t=0; t<MMurlPubbli.length; t++){
	MMstatusPubbli = MMSitoHp.indexOf(MMurlPubbli[t]);
	console.log('===>MMurlPubbli:'+MMurlPubbli[t]);
	console.log('===>statusPubbli:'+MMstatusPubbli);
	if(MMstatusPubbli>0){
		//sendAdUnit('ame_donnamoderna/publi');
		if(MMurlPubbli[t]=='scopri-le-passioni-che-cancellano-gli-anni-di-troppo'){
			//sendAdUnit('ame_donnamoderna/publi/backtoschool');
			cssTemplateSkin = 4;
		}
		if(MMurlPubbli[t]=='speciale'){
			MMstatusSpeciali=true;
		}
	}
}


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

//fine head tag gpt /////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// STRUTTURA SRA ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var idCampagnaBox;
var idCampagnaMastHead;
var MMlarghezzaSitoAdv = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var MMerogazioneSkin = false;
var sizeCompletaBox;
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
    divslotnameStrip = 'gpt_strip';
	divslotnameBox = 'adv-gpt-box-mobile-container1';
	divslotpromobox1 = 'adv-gpt-promobox-container1';
	divslotpromobox2 = 'adv-gpt-promobox-container2';
	divslotpromobox3 = 'adv-gpt-promobox-container3';
	divslotpromobox4 = 'adv-gpt-promobox-container4';
}else{
	//desktop
    divslotnameStrip = 'gpt_strip';
	divslotnameBox = 'adv-gpt-box-container1';
	divslotpromobox1 = 'adv-gpt-promobox-container1';
	divslotpromobox2 = 'adv-gpt-promobox-container2';
	divslotpromobox3 = 'adv-gpt-promobox-container3';
	divslotpromobox4 = 'adv-gpt-promobox-container4';
}
//
function initTagGpt(){
	//console.log('===> chiamata tag gpt in modalità SRA');
	//carico il file con il css e i comendi per far apparire la skin
	document.getElementById(divslotnameStrip).style.display = 'none';
    //
	var lipHpsponsor = document.createElement("script");
	lipHpsponsor.async = false;
	lipHpsponsor.type = "text/javascript";
	var useSSL = "https:" == document.location.protocol;
	lipHpsponsor.src = (useSSL ? "https:" : "http:") + "//adv.mediamond.it/hp_sponsor_zingarate/hpsponsor_zingarate_new.js";
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
	newdiv.setAttribute("style", "position:fixed;top:0;left:0;width:1px;height:1px;overflow:hidden;");
	var node = document.getElementsByTagName("body")[0];
	node.appendChild(newdiv);

	var style300x100 = document.createElement('link');
	style300x100.setAttribute('rel', 'stylesheet');
	style300x100.setAttribute('type', 'text/css');
	style300x100.setAttribute('href', '//adv.mediamond.it/300x100_zingarate/style_300x100_new2.css');
	$( "body").append( style300x100 );
	
	//ci permetterebbe di gestire un’offerta in programmatic guaranteed anche con i formati out of page
	var newdiv = document.createElement('div');
	newdiv.setAttribute('id', 'adv-gpt-outofpage2x2');
	newdiv.setAttribute("style", "position:absolute;width:1px;height:1px;overflow:hidden;");
	var node = document.getElementsByTagName("body")[0];
	node.appendChild(newdiv);


	/*$( '<div style="margin: 0 auto; display:block; height:1px;"><div id="'+divslotpromobox1+'"></div></div>' ).insertAfter( "#adv-gpt-box-container1" );
	$( '<div style="margin: 0 auto; display:block; height:1px;"><div id="'+divslotpromobox2+'"></div></div>' ).insertAfter( "#adv-gpt-box-container1" );
	$( '<div style="margin: 0 auto; display:block; height:1px;"><div id="'+divslotpromobox3+'"></div></div>' ).insertAfter( "#adv-gpt-box-container1" );
	$( '<div style="margin: 0 auto; display:block; height:1px;"><div id="'+divslotpromobox4+'"></div></div>' ).insertAfter( "#adv-gpt-box-container1" );*/
	$( '<div id="container_promobox" class="container_promobox_class"></div>' ).insertAfter( "#adv-gpt-box-container1" );

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
		addSize([0, 0], [[320,1],[320, 50],[320, 100],[720, 240]]).
		//addSize([401, 499], [720, 240]).
		addSize([971, 500], [[728,90],[980,50],[970,250],[980,250],[980,323]]).
		build();

        var pushInitTime = parseInt(performance.now() - startPageTimes.performanceNow) / 1000;

    	if(MMlarghezzaSitoAdv <= 670 && Math.round(pushInitTime) <= 60){
            gtag('event', 'Pushdown', {
                'event_action': 'Pushdown_init_gpt',
                'event_label': 'diff: ' + Math.round(pushInitTime),
                'event_category': 'Pushdown_mobile',
                'value': pushInitTime.toFixed(2),
                'non_interaction': true
            });

    		//console.log('[push FE] Pushdown_init_gpt event: '+parseInt(performance.now() - startPageTimes.performanceNow));
    	}

		//strip
		if (document.getElementById(divslotnameStrip)){
			mm_stript1 = googletag.defineSlot(MMsezioneTag,[[970,250],[320,1]],divslotnameStrip)
				.defineSizeMapping(mappingStrip)
				.setTargeting("pos","1")
				.setCollapseEmptyDiv(true)
				.addService(googletag.pubads());
		}
		//box
		if (document.getElementById(divslotnameBox)) {
			mm_box1 = googletag.defineSlot(MMsezioneTag,[[300,250],[300,600]],divslotnameBox)
				.setTargeting("pos","1")
				.setCollapseEmptyDiv(true)
				.addService(googletag.pubads());
		}

		if (document.getElementById('adv-gpt-box-container-fotosingola')) {
			mm_box_foto_singola = googletag.defineSlot(MMsezioneTag,[300,250],'adv-gpt-box-container-fotosingola')
				.setTargeting("pos","1")
				.setCollapseEmptyDiv(true)
				.addService(googletag.pubads());
		}

		if(MMlarghezzaSitoAdv > 970 && MMarrayUrlSkinControllo[1] != 'noskin'){
			//skin
			mm_skin1 = googletag.defineSlot(MMsezioneTag,[100,100],'div-gpt-skin')
				.setTargeting("pos","1")
				.setCollapseEmptyDiv(true)
				.addService(googletag.pubads());

			MMerogazioneSkin = true;
		}




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
		
		if(MMstatusRichMedia == true){
		richmedia2x2 = googletag.defineSlot(MMsezioneTag, [2,2], 'adv-gpt-outofpage2x2').addService(googletag.pubads());
		}

		googletag.pubads().setTargeting("purl",""+urlSetTargheting+"");
		googletag.pubads().setTargeting("keywordURL",[""+keywordURL+""]);
		googletag.pubads().setTargeting("sezionePagina",[""+sezionePaginaKey+""]);
		googletag.pubads().setTargeting("adx",ADX_label);
		googletag.pubads().setTargeting("ksg",KruxSegments);
		googletag.pubads().setTargeting("kuid",KruxUser);
		googletag.pubads().enableSingleRequest();
		googletag.enableServices();

		googletag.pubads().addEventListener('slotOnload', function(event) {
			if(event.slot===mm_stript1) {
				//console.log('===> slot strip caricato');
                //console.log('[push FE] slotOnload gpt_strip: '+parseInt(performance.now() - startPageTimes.performanceNow));
                if(event.isEmpty == false){
					document.getElementById(divslotnameStrip).style.display = 'display';
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
                //
				strip_animation();
                //
				if(MMlarghezzaSitoAdv <= 970 && sizeCompleta == '720,240'){
					//console.log('chiamata resize iframe2');
					ResizeIframe4();
				}
			}
			if(event.slot===mm_box1) {
				initComscore(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,1,'mm_box1',1,divslotnameBox);
                initIAS(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,1,divslotnameBox);
			}
		});
		googletag.pubads().addEventListener('slotRenderEnded', function(event) {
			if(event.slot===mm_stript1) {
                if(event.size[0] != "970" && event.size[1] != "250"){
                    $("#strip_adv").removeClass("advCollapse");
                }
				campaignIdStrip = event.campaignId;
				creativeIdStrip = event.creativeId;
				lineItemIdStrip = event.lineItemId;
				sizeStrip = event.size;
				sizeCompleta = event.size;
				idCampagnaMastHead=event.campaignId;

                console.log('[push FE] slotRenderEnded gpt_strip: '+parseInt(performance.now() - startPageTimes.performanceNow));
                isAnimationAllowed = isStripAnimationAllowed(event);

				if(MMlarghezzaSitoAdv <= 970 && sizeCompleta == '720,240'){
					//console.log('chiamata resize iframe2');
					ResizeIframe4();
				}
				if(MMlarghezzaSitoAdv <= 970 && (sizeCompleta == '320,50' || sizeCompleta == '320,100')){
					//console.log('chiamata resize iframe2');
					ChangePosition();
				}

			}
			if(event.slot===mm_box1) {
				campaignIdBox = event.campaignId;
                creativeIdBox = event.creativeId;
                lineItemIdBox = event.lineItemId;
                sizeBox = event.size;
				idCampagnaBox=event.campaignId;
				sizeCompletaBox = event.size;
			}
		});
		//
		if(MMstatusRichMedia == true){
			googletag.display("adv-gpt-outofpage");
		}
		if (document.getElementById(divslotnameStrip)) {
			googletag.display(divslotnameStrip);
		}
		if (document.getElementById(divslotnameBox)) {
			googletag.display(divslotnameBox);
		}
		if (document.getElementById('adv-gpt-box-container-fotosingola')) {
			googletag.display('adv-gpt-box-container-fotosingola');
		}
		if(MMlarghezzaSitoAdv > 970 && MMarrayUrlSkinControllo[1] != 'noskin'){
			googletag.display('div-gpt-skin');
		}




		if (document.getElementById("adv-gpt-promobox-container1") || document.getElementById("adv-gpt-promobox-mobile-container1")) {
			googletag.display(divslotpromobox1);
		}
		if (document.getElementById("adv-gpt-promobox-container2") || document.getElementById("adv-gpt-promobox-mobile-container2")) {
			googletag.display(divslotpromobox2);
		}
		if (document.getElementById("adv-gpt-promobox-container3") || document.getElementById("adv-gpt-promobox-mobile-container3")) {
			googletag.display(divslotpromobox3);
		}
		if (document.getElementById("adv-gpt-promobox-container4") || document.getElementById("adv-gpt-promobox-mobile-container4")) {
			googletag.display(divslotpromobox4);
		}

		/*if (document.getElementById("newsstand") && MMlarghezzaSitoAdv < 480) {
			googletag.display('newsstand');
		}*/
		
		if(MMstatusRichMedia == true){
		googletag.display('adv-gpt-outofpage2x2');
		}




	});

}//initTagGpt

////////////////---------------------------------------------------------------------------------------
var MMnIframeGoogle;
//if(MMerogazioneSkin){ MMnIframeGoogle=1 }else{ MMnIframeGoogle=0 };
MMnIframeGoogle=1
//console.log('MMnIframeGoogle:'+MMnIframeGoogle);
	//modifico la dimensione dell'iframe
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
function ChangePosition(){
	//console.log('===>ChangePosition');
	jQuery('#gpt_strip').attr('style','left: 0; position:fixed; bottom:0;z-index:999999;text-align:center;width:100%;background-color:#fff;');
}

///-------------------------------------------------------------------
var arraySlot = new Array();
var posNew=1;
//controllo lo scrol della pagina
window.addEventListener('load', function() {
	window.addEventListener('scroll', function() {
		//console.log('windows scroll');
		for (n=2;n<20;n++){
			//desktop
			if($("#adv-gpt-box-container"+n).length && MMlarghezzaSitoAdv >= 970) {
				console.log('adv-gpt-box-container'+n+':'+$("#adv-gpt-box-container"+n).length);
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
	posNew ++;
	if(MMlarghezzaSitoAdv < 970) {
		//mobile
		divslotnameNew = 'adv-gpt-box-mobile-container' + nSlot;
		window['mm_mobile_box' + posNew];
		//tag gpt
		googletag.cmd.push(function() {
		window['mm_mobile_box' + posNew] = googletag.defineSlot(MMsezioneTag,[[300,250],[300,600]],divslotnameNew).addService(googletag.pubads())
		googletag.pubads().setTargeting("pos",""+posNew+"");
			googletag.pubads().setTargeting("adx",ADX_label);
		googletag.pubads().setTargeting("ksg",KruxSegments);
		googletag.pubads().setTargeting("kuid",KruxUser);
		googletag.pubads().setTargeting("idcampagna",""+idCampagnaBox+"");
			googletag.pubads().setTargeting("purl",""+urlSetTargheting+"");
		googletag.enableServices();
            
            
            googletag.pubads().addEventListener('slotRenderEnded', function(event) {
				if(event.slot===window['mm_mobile_box' + posNew]) {
                    campaignIdBox = event.campaignId;
				creativeIdBox = event.creativeId;
				lineItemIdBox = event.lineItemId;
				sizeBox = event.size;
					sizeCompletaBox = event.size;
				}
			});

			googletag.pubads().addEventListener('slotOnload', function(event) {
				if(event.slot===window['mm_mobile_box' + posNew]) {
					checkSizeBox(nSlot,sizeCompletaBox[1]);
                    initComscore(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,posNew,window['mm_mobile_box' + posNew],nSlot,divslotnameNew);
                    initIAS(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,posNew,divslotnameNew);
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
		googletag.pubads().setTargeting("pos","'"+posNew+"'");
			googletag.pubads().setTargeting("adx",ADX_label);
		googletag.pubads().setTargeting("ksg",KruxSegments);
		googletag.pubads().setTargeting("kuid",KruxUser);
		googletag.pubads().setTargeting("idcampagna","'"+idCampagnaBox+"");
			googletag.pubads().setTargeting("purl",""+urlSetTargheting+"");
		googletag.enableServices();
            
            
            googletag.pubads().addEventListener('slotRenderEnded', function(event) {
				if(event.slot===window['mm_box' + posNew]) {
                    campaignIdBox = event.campaignId;
				creativeIdBox = event.creativeId;
				lineItemIdBox = event.lineItemId;
				sizeBox = event.size;
					sizeCompletaBox = event.size;
				}
			});

			googletag.pubads().addEventListener('slotOnload', function(event) {
				if(event.slot===window['mm_box' + posNew]) {
					checkSizeBox(nSlot,sizeCompletaBox[1]);
                    initComscore(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,posNew,window['mm_box' + posNew],nSlot,divslotnameNew);
                    initIAS(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,posNew,divslotnameNew);
				}
			});
            
            
		});
	}
	arraySlot[nSlot] = "pieno";
	googletag.cmd.push(function() { googletag.display(divslotnameNew); });
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//inread
window.addEventListener('load', function() {
	//var endUrl = MMarrayUrlSkin[3].indexOf(".html");
	//console.log('[mediamond]===>endUrl:'+endUrl);
	//console.log('[mediamond]===>MMarrayUrlSkin[5]:'+MMarrayUrlSkin[5]);


	if(statusInread == true ){

		var rifPointInread =  jQuery(".zg-main-text").find("p");
		var ancoraPointInread = Math.ceil(parseInt(rifPointInread.length)/3);

		console.log('[mediamond]===>ancoraPointInread:'+ancoraPointInread);

		if(rifPointInread.length > ancoraPointInread){
			//console.log('[mediamond]===>rifPointInread esiste');
			jQuery( "<div id='adv-video-article'></div>" ).insertBefore(rifPointInread[ancoraPointInread]);


		//$('#gpt-inread').append('<div id="#adv-video-article"></div>' );
		//genero la tag inread dopo che ho creto il div

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

	}//if(rifPointInread.length > ancoraPointInread){
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
				window._seedtagq.push(['_setId', '0481-9004-01']);
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