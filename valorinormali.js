//header
document.write('<sc'+'ript src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></scr'+'ipt>');

var crtg_nid = '2972';
var crtg_cookiename = 'crtg_rta_bnzm';
var crtg_varname = 'crtg_content_bnzm';
function crtg_getCookie(c_name){ var i,x,y,ARRCookies=document.cookie.split(";");for(i=0;i<ARRCookies.length;i++){x=ARRCookies[i].substr(0,ARRCookies[i].indexOf("="));y=ARRCookies[i].substr(ARRCookies[i].indexOf("=")+1);x=x.replace(/^\s+|\s+$/g,"");if(x==c_name){return unescape(y);} }return'';}
var crtg_content_bnzm = crtg_getCookie(crtg_cookiename);
var crtg_rnd=Math.floor(Math.random()*99999999999);
(function(){
var crtg_url=location.protocol+'//rtax.criteo.com/delivery/rta/rta.js?netId='+escape(crtg_nid);
crtg_url +='&cookieName='+escape(crtg_cookiename);
crtg_url +='&rnd='+crtg_rnd;
crtg_url +='&varName=' + escape(crtg_varname);
var crtg_script=document.createElement('script');crtg_script.type='text/javascript';crtg_script.src=crtg_url;crtg_script.async=true;
if(document.getElementsByTagName("head").length>0)document.getElementsByTagName("head")[0].appendChild(crtg_script);
else if(document.getElementsByTagName("body").length>0)document.getElementsByTagName("body")[0].appendChild(crtg_script);
})();


///
var crtg_nid="281";
var crtg_cookiename="bnz_rtt";
var crtg_varname="crtg_content";
function crtg_getCookie(c_name){ var i,x,y,ARRCookies=document.cookie.split(";");for(i=0;i<ARRCookies.length;i++){x=ARRCookies[i].substr(0,ARRCookies[i].indexOf("="));y=ARRCookies[i].substr(ARRCookies[i].indexOf("=")+1);x=x.replace(/^\s+|\s+$/g,"");if(x==c_name){return unescape(y);}}return'';}
var crtg_content = crtg_getCookie(crtg_cookiename);var crtg_rnd=Math.floor(Math.random()*99999999999);
var crtg_url=location.protocol+'//rtax.criteo.com/delivery/rta/rta.js?netId='+escape(crtg_nid);crtg_url+='&cookieName='+escape(crtg_cookiename);crtg_url+='&rnd='+crtg_rnd;crtg_url+='&varName=' + escape(crtg_varname);
var crtg_script=document.createElement('script');crtg_script.type='text/javascript';crtg_script.src=crtg_url;crtg_script.async=true;
if(document.getElementsByTagName("head").length>0)document.getElementsByTagName("head")[0].appendChild(crtg_script);else if(document.getElementsByTagName("body").length>0)document.getElementsByTagName("body")[0].appendChild(crtg_script);



//krux per tag dart
  window.Krux||((Krux=function(){Krux.q.push(arguments);}).q=[]);
  (function(){

    function retrieve(n){
      var m, k='kx'+n;
      if (window.localStorage) {
    return window.localStorage[k] || "";
      } else if (navigator.cookieEnabled) {
    m = document.cookie.match(k+'=([^;]*)');
    return (m && unescape(m[1])) || "";
      } else {
    return '';
      }
    }

    Krux.user = retrieve('user');
    /* nuova variabile */
    Krux.kxkuid = retrieve('kuid');
    /* fine nuova variabile */
    Krux.segments = retrieve('segs') ? retrieve('segs').split(',') : [];

    // DFP Premium Interchange
    var dfpp = [];
    if (Krux.user) {
      dfpp.push('kuid=' + Krux.user);
    }
    for (var i = 0; i < Krux.segments.length; i++ ) {
      dfpp.push('ksg=' + Krux.segments[i]);
    }
    Krux.dfppKeyValues = dfpp.length ? dfpp.join(';') + ';' : '';

  })();


// krux per tag gpt
window.Krux||((Krux=function(){Krux.q.push(arguments);}).q=[]);
(function(){
  function retrieve(n){
    var m, k='kx'+n;
    if (window.localStorage) {
      return window.localStorage[k] || "";
    } else if (navigator.cookieEnabled) {
      m = document.cookie.match(k+'=([^;]*)');
      return (m && unescape(m[1])) || "";
    } else {
       return '';
    }
  }
  Krux.user = retrieve('user');
  /* nuova variabile */
  Krux.kxkuid = retrieve('kuid');
  /* fine nuova variabile */
  Krux.segments = retrieve('segs') && retrieve('segs').split(',') || [];
})();



// BEGIN Krux Control Tag for "Farmaco e Cura"
// Source: /snippet/controltag?confid=KKMkcIv2&site=Valorei%20Normali&edit=1
  window.Krux||((Krux=function(){Krux.q.push(arguments)}).q=[]);
  (function(){
    var k=document.createElement('script');k.type='text/javascript';k.async=true;
    var m,src=(m=location.href.match(/\bkxsrc=([^&]+)/))&&decodeURIComponent(m[1]);
    k.src = /^https?:\/\/([a-z0-9_\-\.]+\.)?krxd\.net(:\d{1,5})?\//i.test(src) ? src : src === "disable" ? "" :
      (location.protocol==="https:"?"https:":"http:")+"//cdn.krxd.net/controltag?confid=KKMkg9h3"
  ;
    var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(k,s);
  }());
// END Krux Controltag

document.write('<s' + 'cript src="//euasync01.admantx.com/admantx/service?request={%20tag%3A%22%22%2C%20key%3A%220c98897dbc164f908b46da9a579a5a66f545cbc906646befd32bfc20fa9c0dd7%22%2Cmethod%3A%22descriptor%22%2Cfilter%3A%22default%22%2Cdecorator%3A%22template.valorinormali%22%2Ctype%3A%22URL%22%2Cmode%3A%22async%22%2Cbody:\'' + escape(document.location.href) + '\'%2Ccustom2%3A%22'+Krux.kxkuid+'%22}"></s' +'cript>');


//vengono definite delle variabili che poi verranno utilizzate nei js per l'erogazione dei formati
var MMdatiSkin = new Array();
var nomeSito = 'valorinormali';
var MediapointDot = '';
var MMstatusStrip = true;
var MMstatusRichMedia = true;
var MMCanaleSito;
var statusPersonalizzazioniWeb = false;
var MMlarghezzaSitoAdv = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
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


if(MMarrayUrlSkin[2] == 'www.valorinormali.com'){
	if(MMarrayUrlSkin[3] == '' || VerificaSottocanale == '?'){
		sendAdUnit('valorinormali');
	}else if(MMarrayUrlSkin[3] == 'colesterolo'){
		sendAdUnit('valorinormali');
	}else if(MMarrayUrlSkin[3] == 'cuore'){
		sendAdUnit('valorinormali');
	}else if(MMarrayUrlSkin[3] == 'elettroliti'){
		sendAdUnit('valorinormali');
	}else if(MMarrayUrlSkin[3] == 'fegato'){
		sendAdUnit('valorinormali');
	}else if(MMarrayUrlSkin[3] == 'fertilita'){
		sendAdUnit('valorinormali');
	}else if(MMarrayUrlSkin[3] == 'rene'){
		sendAdUnit('valorinormali');
	}else if(MMarrayUrlSkin[3] == 'tiroide'){
		sendAdUnit('valorinormali');
	}else if(MMarrayUrlSkin[3] == 'tumori'){
		sendAdUnit('valorinormali');
	}else{
		sendAdUnit('valorinormali');
	}
}else{
	sendAdUnit('valorinormali');
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
//
if(typeof(mediamondTag) == undefined || typeof(mediamondTag) == 'undefined'){
//usando le tag di wordpress settate nell'array mediamondTag
mediamondTag = new Array();
}

if(typeof(mediamondTag) != undefined && typeof(mediamondTag) != 'undefined'){
//usando le tag di wordpress settate nell'array mediamondTag
for(r=0; r<mediamondTag.length; r++){
	console.log('===>mediamondTag:'+mediamondTag[r]);
	//console.log('===>statusPubbli:'+MMstatusPubbli);
	if(mediamondTag[r] == 'sanremo-style'){
		sendAdUnit('pianetatech/publi/speciale_sanremo18');
	}
}
}
///----------------------------------------------------------------------------------------------------------------------
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



if(MMlarghezzaSitoAdv < 970) {
	//mobile
	divslotnameBox = 'adv-gpt-box-container1';
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
jQuery('<div id="adv-skin"></div>').insertAfter('#page');

function initTagGpt(){
	//
	keywordGlobal = mediamondTag.concat(sezionePaginaKey);
	//
	var lipHpsponsor = document.createElement("script");
	lipHpsponsor.async = false;
	lipHpsponsor.type = "text/javascript";
	var useSSL = "https:" == document.location.protocol;
	lipHpsponsor.src = (useSSL ? "https:" : "http:") + "//adv.mediamond.it/hp_sponsor_valorinormali/hpsponsor_valorinormali.js";
	var node = document.getElementsByTagName("body")[0];
	node.parentNode.insertBefore(lipHpsponsor, node);
	//creo un div in cui erogare la tag del out of page
	var newdiv = document.createElement('div');
	newdiv.setAttribute('id', 'adv-gpt-outofpage');
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



	googletag.cmd.push(function() {

		var mappingStrip = googletag.sizeMapping().
		addSize([0, 0], [[320, 50], [320, 1]]).
		addSize([401, 400], [728,90]).
		addSize([980, 500], [[728,90],[980,50],[970,250],[980,250],[980,323]]).
		build();

		var mappingBox = googletag.sizeMapping().
		addSize([0, 0], [[300, 250],[300, 600]]).
		build();

		if(MMstatusRichMedia == true){
			richmedia = googletag.defineOutOfPageSlot(MMsezioneTag,'adv-gpt-outofpage').addService(googletag.pubads());
		}

		if (document.getElementById("div-gpt-ad-1234567891234-strip")){
			mm_stript1 = googletag.defineSlot(MMsezioneTag,[970,250],'div-gpt-ad-1234567891234-strip')
				.defineSizeMapping(mappingStrip)
				.setTargeting("pos","1")
				.setTargeting("test","2")
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

		mm_inread = googletag.defineSlot(MMsezioneTag, [640,5], 'gpt-inread').addService(googletag.pubads());

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
			}
		});
		googletag.pubads().addEventListener('slotRenderEnded', function(event) {
			if(event.slot===mm_stript1) {

				if((event.size[0] != "970" && event.size[1] != "250") && (event.size[0] != "320" && event.size[1] != "1")){
            $("#strip_adv").removeClass("advCollapse");
        }
        console.log('[push FE] slotRenderEnded gpt_strip: '+parseInt(performance.now() - startPageTimes.performanceNow));
        isAnimationAllowed = isStripAnimationAllowed(event);

				console.log('===> slot strip renderizzato');
				sizeCompleta = event.size;
				idCampagnaMastHead=event.campaignId;
				if(MMlarghezzaSitoAdv <= 970 && sizeCompleta[0] == 720){
					console.log('===> chiamata resize iframe2');
					ResizeIframe2();
				}

				//checkInvendutoStrip(posStrip);
			}
		});

		if(MMstatusRichMedia == true){
			googletag.display("adv-gpt-outofpage");
		}

		if (document.getElementById("div-gpt-ad-1234567891234-strip")) {
			googletag.display("div-gpt-ad-1234567891234-strip");
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

		googletag.display('gpt-inread');

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
	//metto 1 perchè lo 0 è preso dal 1x1 che non è gestito con il load windows
	console.log('===> Resize iframe2');
	if (document.getElementById("google_ads_iframe_"+MMsezioneTag+"_"+MMnIframeGoogle)) {
		//console.log('gogogo');
		//alert(iFrameGptMastHead);
		var iFrameGptMastHead = document.getElementById("google_ads_iframe_"+MMsezioneTag+"_"+MMnIframeGoogle);
		iFrameGptMastHead.style.width = '100%';
		var divGptMastHead = document.getElementById("google_ads_iframe_"+MMsezioneTag+"_"+MMnIframeGoogle+"__container__");
		divGptMastHead.style.width = '100%';
		var divGptMastHeadHeightVal = document.getElementById("google_ads_iframe_"+MMsezioneTag+"_"+MMnIframeGoogle).offsetHeight;
		var divGptMastHeadWidthVal = document.getElementById("google_ads_iframe_"+MMsezioneTag+"_"+MMnIframeGoogle).offsetWidth;
		var divGptMastHeadHeightValNew = Math.ceil(((divGptMastHeadWidthVal*970)/250)/10);
		divGptMastHead.style.height = divGptMastHeadHeightValNew+'px';
		iFrameGptMastHead.style.height = divGptMastHeadHeightValNew+'px';
	}else{
		ResizeIframe2()
	}

}
var nRefresh = 0;
function MediamondTagRefresh(){
	console.log('===> chiamata refresh tag');
	googletag.pubads().refresh([mm_box1]);
}
function ChangePositionStrip(){
	console.log('===>ChangePosition');
	//jQuery('.strip_adv' ).addClass( "minimasthead" );
	jQuery('.strip_adv').attr('style','position: initial; box-shadow: none;transform: initial;background:none;');
	jQuery('#gpt_strip').attr('style','height: 125px;margin-top:100px;background:none;width:100%;');
	jQuery('#adv-strip').attr('style','background:none;');
	jQuery('#strip_adv').attr('style','background:none;');
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
			console.log('===> initTag load');
		}
	//clearInterval(timerGpt);
});


//var timerGpt = setInterval(function(){searchAdxLabel();},100);

function searchAdxLabel(){
//if(typeof(ADX_label) != 'undefined'){
	//if(ADX_label != ''){
	//console.log('===>adx per SRA TIMER2 label definita:'+ADX_label);
	//console.log('===>timer m:'+m);
		if(adxLoad == false && (document.getElementById(divslotnameBox) || document.getElementById("div-gpt-ad-1234567891234-strip") && MMarrayUrlSkinControllo[1] != 'noadv') ){
			adxLoad = true;
			console.log('===> initTag timer');
			initTagGpt();
			clearInterval(timerGpt);
		}
	//}
//}
}


//codice che stampa il video in article
function loadVideoArticle(){

	var script = document.createElement('script');
    script.setAttribute('language', 'javascript');
    script.setAttribute('src', '//ptp.stbm.it//banner/video-in-article/fcir.js');

	document.getElementsByTagName('body')[0].appendChild(script);

}

console.log('vn override');
