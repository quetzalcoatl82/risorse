// JavaScript Document
//console.log('===>tag_adv_mediamond....');
//vengono definite delle variabili che poi verranno utilizzate nei js per l'erogazione dei formati
var MMdatiSkin = new Array();
var nomeSito = 'farmacoecura';
var MediapointDot = '';
var MMstatusStrip = true;
var MMstatusRichMedia = true;
var statusSeedTag = true;
var MMCanaleSito;
var statusPersonalizzazioniWeb = false;
var MMlarghezzaSitoAdv = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var MMaltezzaSitoAdv = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
//varibile per controllare l'erogazione dei promobox autopromo
var MMpromoboxCliente = 0;
//per differenziare le varie sezioni
var MMSitoHp = window.location.href;
var MMarrayUrlSkin = new Array();
MMarrayUrlSkin = MMSitoHp.split('/');
var keywordGlobal = new Array();
/*controllo per togliere la skin momentaneamente*/
var MMarrayUrlSkinControllo = new Array();
MMarrayUrlSkinControllo = MMSitoHp.split('?');
var VerificaSottocanale = MMarrayUrlSkin[3].substr(0, 1);
var MMPosition = 'init';
var urlSetTargheting = MMSitoHp.replace('http://','').replace('https://','').replace('www.','').replace('?refresh','').replace('?utm_source=Zemanta&utm_medium=referral','').replace(/\//gi,'_').replace('=','_','ig').replace('!','_','ig').replace('+','_','ig').replace('*','_','ig').replace('#','_','ig').replace('^','_','ig').replace('~','_','ig').replace(';','_','ig').replace('(','_','ig').replace(')','_','ig').replace('[','_','ig').replace(']','_','ig').replace('"','_','ig').replace("'","_","ig").replace('<','_','ig').replace('>','_');
/* varibile per il canale della tag*/
var MMsezioneTag;
function sendAdUnit(canaleSito){
	MMsezioneTag = '/4758/'+canaleSito;
}

if(MMarrayUrlSkin[2] == 'www.farmacoecura.it'){
	if(MMarrayUrlSkin[3] == '' || VerificaSottocanale == '?'){
		sendAdUnit('farmacoecura/home');
	}else if(MMarrayUrlSkin[3] == 'gravidanza'){
		sendAdUnit('farmacoecura/mamme');
	}else if(MMarrayUrlSkin[3] == 'donna'){
		sendAdUnit('farmacoecura/donna');
	}else if(MMarrayUrlSkin[3] == 'uomo-e-benessere-maschile'){
		sendAdUnit('farmacoecura/uomo');
	}else{
		sendAdUnit('farmacoecura/ros');
	}
}else{
	sendAdUnit('farmacoecura/ros');
}


//cerco la sotto stringa sulle url dei pubbliredazionali dalla url principale per poi poter settare una adunit pubbli
var MMurlPubbli = new Array();
var MMstatusPubbli;
MMurlPubbli.push("speciale-test");
for(t=0; t<MMurlPubbli.length; t++){
	MMstatusPubbli = MMSitoHp.indexOf(MMurlPubbli[t]);
	if(MMstatusPubbli>0){
		sendAdUnit('valorinormali');
		if(MMurlPubbli[t]=='speciale-test'){
			sendAdUnit('valorinormali');
		}
	}
}
//
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
		sendAdUnit('pianetatech/publi/speciale_sanremo18');
	}
}
}
//
var sezionePaginaKey = new Array();
var keywordURL = '';
function cercaSezioneUrl() {
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

//300x100
jQuery( '<div style="margin: 0 auto; display:block; height:1px;"><div id="'+divslotpromobox1+'"></div></div>' ).insertAfter("#"+divslotnameBox );
jQuery( '<div style="margin: 0 auto; display:block; height:1px;"><div id="'+divslotpromobox2+'"></div></div>' ).insertAfter("#"+divslotnameBox );
jQuery( '<div style="margin: 0 auto; display:block; height:1px;"><div id="'+divslotpromobox3+'"></div></div>' ).insertAfter("#"+divslotnameBox );
jQuery( '<div style="margin: 0 auto; display:block; height:1px;"><div id="'+divslotpromobox4+'"></div></div>' ).insertAfter("#"+divslotnameBox );
jQuery( '<div id="container_promobox" class="container_promobox_class"></div>' ).insertAfter("#"+divslotnameBox);
//per il programmatic
jQuery('<div id="adv-skin"></div>').insertAfter('#main');

function initTagGpt(){
	if(MMlarghezzaSitoAdv <= 970){
	document.getElementById("adv-gpt-masthead-leaderboard-container1").style.display = 'none';
	}
	//
	keywordGlobal = mediamondTag.concat(sezionePaginaKey);
	//
	var style300x100 = document.createElement('link');
	style300x100.setAttribute('rel', 'stylesheet');
	style300x100.setAttribute('type', 'text/css');
	style300x100.setAttribute('href', '//adv.mediamond.it/hpsponsor/famacoecura/style_300x100_new.css');
	jQuery('body').append(style300x100);
	//
	var lipHpsponsor = document.createElement("script");
	lipHpsponsor.async = false;
	lipHpsponsor.type = "text/javascript";
	var useSSL = "https:" == document.location.protocol;
	lipHpsponsor.src = (useSSL ? "https:" : "http:") + "//adv.mediamond.it/hpsponsor/famacoecura/hpsponsor_dinamic.js";
	var node = document.getElementsByTagName("body")[0];
	node.appendChild(lipHpsponsor);
	//creo un div in cui erogare la tag del out of page
	var newdiv = document.createElement('div');
	newdiv.setAttribute('id', 'adv-gpt-outofpage');
	newdiv.setAttribute("style", "position:absolute;width:1px;height:1px;overflow:hidden;");
	var node = document.getElementsByTagName("body")[0];
	node.appendChild(newdiv);
	//ci permetterebbe di gestire un’offerta in programmatic guaranteed anche con i formati out of page
var newdiv = document.createElement('div');
newdiv.setAttribute('id', 'adv-gpt-outofpage2x2');
newdiv.setAttribute("style", "position:absolute;width:1px;height:1px;overflow:hidden;");
var node = document.getElementsByTagName("body")[0];
node.appendChild(newdiv);
	//inread
	var newdiv = document.createElement('div');
	newdiv.setAttribute('id', 'gpt-inread');
	newdiv.setAttribute("style", "position:absolute;width:1px;height:1px;overflow:hidden;");
	var node = document.getElementsByTagName("body")[0];
	node.appendChild(newdiv);

	//creo un div in cui erogaqre la tag della skin
	var newdiv = document.createElement('div');
	newdiv.setAttribute('id', 'div-gpt-skin');
	newdiv.setAttribute("style", "position:fixed;top:0;left:0;width:1px;height:1px;overflow:hidden;");
	var node = document.getElementsByTagName("body")[0];
	node.appendChild(newdiv);
	//creo e inserisco il div che serve per il box
	var newdiv = document.createElement('div');
	newdiv.setAttribute('id', 'adv-gpt-box-mobile-container1');
	document.getElementById('adv_mob').appendChild(newdiv);


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

	//serve per far uscire solo il 300x250 sulla gallery
	if(typeof(mmsezione) != undefined && typeof(mmsezione) != 'undefined'){
		if(mmsezione == 'gallery'){
			var typeBox300x600 = false;
		}else{
			var typeBox300x600 = true;
		}
	}else{
		var typeBox300x600 = true;
	}


	googletag.cmd.push(function() {

		/*if(MMarrayUrlSkinControllo[1]=='minimasthead'){
			var mappingStrip = googletag.sizeMapping().
			addSize([0, 0], [[320, 50],[720,240]]).
			addSize([401, 400], [728,90]).
			addSize([980, 500], [[728,90],[980,50],[970,250],[980,250],[980,323]]).
			build();
		}else{
			var mappingStrip = googletag.sizeMapping().
			addSize([0, 0], [320, 50]).
			addSize([401, 400], [728,90]).
			addSize([980, 500], [[728,90],[980,50],[970,250],[980,250],[980,323]]).
			build();
		}*/

		var mappingStrip = googletag.sizeMapping().
			addSize([0, 0], [[320,1],[320, 50],[320, 100],[720,240]]).
			addSize([401, 400], [728,90]).
			addSize([980, 500], [[728,90],[980,50],[970,250],[980,250],[980,323]]).
			build();

		if(typeBox300x600){
			var mappingBox = googletag.sizeMapping().
			addSize([0, 0], [[300, 250],[300, 600]]).
			build();
		}else{
			var mappingBox = googletag.sizeMapping().
			addSize([0, 0], [300, 250]).
			build();
		}

		if(MMstatusRichMedia == true){
			richmedia = googletag.defineOutOfPageSlot(MMsezioneTag,'adv-gpt-outofpage').addService(googletag.pubads());
		}

		if (document.getElementById("adv-gpt-masthead-leaderboard-container1")){
			mm_stript1 = googletag.defineSlot(MMsezioneTag,[970,250],'adv-gpt-masthead-leaderboard-container1')
				.defineSizeMapping(mappingStrip)
				.setTargeting("pos","1")
				.setTargeting('test', '2')
				.setCollapseEmptyDiv(true)
				.addService(googletag.pubads());
		}

		if (document.getElementById(divslotnameBox)){
			mm_box1 = googletag.defineSlot(MMsezioneTag,[300,250],divslotnameBox)
				.defineSizeMapping(mappingBox)
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

		if (document.getElementById(divslotpromobox1)){
			promobox1 = googletag.defineSlot(MMsezioneTag, [300, 100], divslotpromobox1)
				.addService(googletag.pubads())
				.setCollapseEmptyDiv(true)
				.setTargeting("pos", "1");
		}

		if (document.getElementById(divslotpromobox2)){
			promobox2 = googletag.defineSlot(MMsezioneTag, [300, 100], divslotpromobox2)
				.addService(googletag.pubads())
				.setCollapseEmptyDiv(true)
				.setTargeting("pos", "2");
		}
		if (document.getElementById(divslotpromobox3)){
		promobox3 = googletag.defineSlot(MMsezioneTag, [300, 100], divslotpromobox3)
			.addService(googletag.pubads())
			.setCollapseEmptyDiv(true)
			.setTargeting("pos", "3");
		}
		if (document.getElementById(divslotpromobox4)){
		promobox4 = googletag.defineSlot(MMsezioneTag, [300, 100], divslotpromobox4)
			.addService(googletag.pubads())
			.setCollapseEmptyDiv(true)
			.setTargeting("pos", "4");
		}

		if (document.getElementById("gpt-inread") ) {
			mm_inread = googletag.defineSlot(MMsezioneTag, [640,5], 'gpt-inread').addService(googletag.pubads());
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
				if(MMlarghezzaSitoAdv <= 970){
				document.getElementById("adv-gpt-masthead-leaderboard-container1").style.display = 'block';
				}
				//console.log('===> slot strip caricato');
				 strip_animation();
			}
		});
		googletag.pubads().addEventListener('slotRenderEnded', function(event) {
			if(event.slot===mm_stript1) {


				if((event.size[0] != "970" && event.size[1] != "250") && (event.size[0] != "320" && event.size[1] != "1")){
            $("#strip_adv").removeClass("advCollapse");
        }
        //console.log('[push FE] slotRenderEnded gpt_strip: '+parseInt(performance.now() - startPageTimes.performanceNow));
        isAnimationAllowed = isStripAnimationAllowed(event);
				//console.log('===> slot strip renderizzato');
				sizeCompleta = event.size;
				idCampagnaMastHead=event.campaignId;
				if(MMlarghezzaSitoAdv <= 970 && sizeCompleta[0] == 320){
					//console.log('===> chiamata resize iframe2');
					ChangePositionStrip();
					//ResizeIframe2();
				}
				if(MMlarghezzaSitoAdv <= 970 && sizeCompleta[0] == 720){
					//console.log('===> chiamata resize iframe2');
					//ChangePositionStrip();
					ResizeIframe2();
				}
				if(sizeCompleta[0] == 100){
					//console.log('chiamata resize iframe2');
					document.getElementById('adv-gpt-masthead-leaderboard-container1').style.position = 'absolute';
				}
			}
		});

		if(MMstatusRichMedia == true){
			googletag.display("adv-gpt-outofpage");
		}

		if (document.getElementById("adv-gpt-masthead-leaderboard-container1")) {
			googletag.display("adv-gpt-masthead-leaderboard-container1");
		}
		//il box è stato tolto perchè viene richiamato in un secondo tempo in displayTagGpt();
		if (document.getElementById(divslotnameBox)) {
			googletag.display(divslotnameBox);
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

		if (document.getElementById("gpt-inread") ) {
			googletag.display('gpt-inread');
		}

		if(MMstatusRichMedia == true){
		googletag.display('adv-gpt-outofpage2x2');
		}

	});

}//initTagGpt

var MMnIframeGoogle;
//if(MMerogazioneSkin){ MMnIframeGoogle=1 }else{ MMnIframeGoogle=0 };
MMnIframeGoogle=1;
//console.log('MMnIframeGoogle:'+MMnIframeGoogle);
	//modifico la dimensione dell'iframe
function ResizeIframe2() {

	//console.log('===> Resize iframe2');
	if (document.getElementById("google_ads_iframe_"+MMsezioneTag+"_"+MMnIframeGoogle)) {
		//console.log('gogogo');
		//alert(iFrameGptMastHead);
		//console.log('===>MMarrayUrlSkinControllo[1]:'+MMarrayUrlSkinControllo[1]);


		var iFrameGptMastHead = document.getElementById("google_ads_iframe_"+MMsezioneTag+"_"+MMnIframeGoogle);
		iFrameGptMastHead.style.width = MMlarghezzaSitoAdv+'px';
		var divGptMastHead = document.getElementById("google_ads_iframe_"+MMsezioneTag+"_"+MMnIframeGoogle+"__container__");
		divGptMastHead.style.width = MMlarghezzaSitoAdv+'px';
		var divGptMastHeadHeightVal = document.getElementById("google_ads_iframe_"+MMsezioneTag+"_"+MMnIframeGoogle).offsetHeight;
		var divGptMastHeadWidthVal = document.getElementById("google_ads_iframe_"+MMsezioneTag+"_"+MMnIframeGoogle).offsetWidth;
		var divGptMastHeadHeightValNew = Math.ceil(((MMlarghezzaSitoAdv*720)/240)/9);
		divGptMastHead.style.height = divGptMastHeadHeightValNew+'px';
		iFrameGptMastHead.style.height = divGptMastHeadHeightValNew+'px';



	}else{
		ResizeIframe2()
	}

}
var nRefresh = 0;
function MediamondTagRefresh(){
	//console.log('===> chiamata refresh tag');
	googletag.pubads().refresh([mm_box1]);
}
function ChangePositionStrip(){
	//console.log('===>ChangePosition');
	//jQuery('.strip_adv' ).addClass( "minimasthead" );
	jQuery('.strip_adv').attr('style','position: fixed; box-shadow: 0px 1px 0px 0px #888888;background:#fff; z-index: 110;');
	//jQuery('.expanding div').attr('style','background:none;');

}


//----------------------------------------------------------------------------------------------------------///
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
var m=0;
//var timer = setInterval(function(){m++},10);
var adxLoad = false;


window.addEventListener('load', function() {
		if(adxLoad == false && MMarrayUrlSkinControllo[1] != 'noadv'){
			adxLoad = true;
			initTagGpt();
			//console.log('===> initTag load');

		}
	clearInterval(timerGpt);
});


var timerGpt = setInterval(function(){searchAdxLabel();},100);

function searchAdxLabel(){
	if(typeof(ADX_label) != 'undefined'){
		if(ADX_label != ''){
		//console.log('===>adx per SRA TIMER2 label definita:'+ADX_label);
		//console.log('===>timer m:'+m);
		clearInterval(timerGpt);
			if(adxLoad == false && document.getElementById(divslotnameBox) && document.getElementById("adv-gpt-masthead-leaderboard-container1") && MMarrayUrlSkinControllo[1] != 'noadv'){
				adxLoad = true;
				//console.log('===> initTag timer');
				initTagGpt();
			}
		}
	}else{
		//console.log('===>adx PER SRA TIMER label NON definita');
	}
}

//
//codice che stampa il video in article
function loadVideoArticle(){

	var script = document.createElement('script');
    script.setAttribute('language', 'javascript');
    script.setAttribute('src', 'http://ptp.stbm.it//banner/video-in-article/fcir.js');

	document.getElementsByTagName('body')[0].appendChild(script);

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
				window._seedtagq.push(['_setId', '9076-2582-01']);
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
