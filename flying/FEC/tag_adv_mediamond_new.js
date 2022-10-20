// JavaScript Document

//vengono definite delle variabili che poi verranno utilizzate nei js per l'erogazione dei formati
var MMdatiSkin = new Array();
var nomeSito = 'farmacoecura';
var MMstatusStrip = true;
var MMstatusRichMedia = true;
var MMstatusSkin = true;
var MMstatusBox = true;
var statusInread = true;
var statusSeedTag = true;
var MMstatusPromoBox = true;
var MMstatusNativePromoBox = true;
var MMstatusAdv = true;
var MMCanaleSito;
var idSitoDfp = '68640857';
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
var urlSetTargheting = MMarrayUrlSkinControllo[0].replace('http://','').replace('https://','').replace('www.','').replace('?refresh','').replace('?utm_source=Zemanta&utm_medium=referral','').replace(/\//gi,'_').replace('=','_','ig').replace('!','_','ig').replace('+','_','ig').replace('*','_','ig').replace('#','_','ig').replace('^','_','ig').replace('~','_','ig').replace(';','_','ig').replace('(','_','ig').replace(')','_','ig').replace('[','_','ig').replace(']','_','ig').replace('"','_','ig').replace("'","_","ig").replace('<','_','ig').replace('>','_');
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
		sendAdUnit('farmacoecura/ros');
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

//300x100
jQuery( '<div id="'+divslotpromobox1+'" style="margin:10px 0 10px 0;"></div>' ).insertAfter("#adv_mob");
jQuery( '<div id="'+divslotpromobox2+'" style="margin:10px 0 10px 0;"></div>' ).insertAfter("#adv_mob");
jQuery( '<div id="'+divslotpromobox3+'" style="margin:10px 0 10px 0;"></div>' ).insertAfter("#adv_mob");
jQuery( '<div id="'+divslotpromobox4+'" style="margin:10px 0 10px 0;"></div>' ).insertAfter("#adv_mob");
//per il programmatic
jQuery('<div id="adv-skin"></div>').insertAfter('#main');
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
var sizeCompleta = [];
//
function initTagGpt(){
	keywordGlobal = mediamondTag.concat(sezionePaginaKey);
	if(MMlarghezzaSitoAdv > 970) {
		var lipHpsponsor = document.createElement("script");
		lipHpsponsor.async = false;
		lipHpsponsor.type = "text/javascript";
		var useSSL = "https:" == document.location.protocol;
		lipHpsponsor.src = (useSSL ? "https:" : "http:") + "//adv.mediamond.it/hpsponsor/famacoecura/hpsponsor_dinamic_new.js";
		var node = document.getElementsByTagName("body")[0];
		node.appendChild(lipHpsponsor);
	}
	//creo un div in cui erogare la tag del out of page
	var newdiv = document.createElement('div');
	newdiv.setAttribute('id', 'adv-gpt-outofpage');
	newdiv.setAttribute("style", "position:absolute;width:25px;height:25px;overflow:hidden;top:0;left:0;");//25x25 per ias
	var node = document.getElementsByTagName("body")[0];
	node.appendChild(newdiv);
	document.getElementById("adv-gpt-outofpage").innerHTML = "<img src='//static.mediamond.it/img_generiche/20x20.png' style='width:25px;height:25px'>";//per ias
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

	googletag.cmd.push(function() {	
		if(devTypeUtility == "mobile_web_ipad" || devTypeUtility == "mobile_web_android_tablet"){
		      var mappingStrip = googletag.sizeMapping().
            addSize([0, 0], [[3,1],[320, 50],[320, 100],[720,240]]).		
            addSize([600, 499], [[3,1],[720, 240],[728,90]]).
            addSize([980, 500], [[3,1],[728,90],[980,50],[970,250],[980,250],[980,323]]).
            build();
        }else{
              var mappingStrip = googletag.sizeMapping().
            addSize([0, 0], [[3,1],[320, 50],[320, 100],[720,240]]).	
            addSize([980, 500], [[3,1],[728,90],[980,50],[970,250],[980,250],[980,323]]).
            build();
        }	
		var mappingBox = googletag.sizeMapping().
		addSize([0, 0], [[300, 250],[300, 600]]).
		build();
		if(MMstatusRichMedia){
			richmedia = googletag.defineOutOfPageSlot(MMsezioneTag,'adv-gpt-outofpage').addService(googletag.pubads());
		}
		if (document.getElementById(divslotnameStrip) && MMstatusStrip){
			mm_stript1 = googletag.defineSlot(MMsezioneTag,[970,250],divslotnameStrip)
				.defineSizeMapping(mappingStrip)
				.setTargeting("pos","1")
				.setTargeting('test', '2')
				.setCollapseEmptyDiv(true,true)
				.addService(googletag.pubads());
		}
		if (document.getElementById(divslotnameBox) && MMstatusBox){
			mm_box1 = googletag.defineSlot(MMsezioneTag,[300,250],divslotnameBox)
				.defineSizeMapping(mappingBox)
				.setTargeting("pos","1")
				.setCollapseEmptyDiv(true,true)
				.addService(googletag.pubads());
		}
		if(MMlarghezzaSitoAdv > 970 && MMarrayUrlSkinControllo[1] != 'noskin' && MMstatusSkin){
			//skin
			mm_skin1 = googletag.defineSlot(MMsezioneTag,[100,100],'div-gpt-skin')
				.setTargeting("pos","1")
				.setCollapseEmptyDiv(true)
				.addService(googletag.pubads());
			MMerogazioneSkin = true;
		}
		if(MMstatusPromoBox){
			if (document.getElementById(divslotpromobox1)){
				promobox1 = googletag.defineSlot(MMsezioneTag, [[300, 100]], divslotpromobox1)
					.addService(googletag.pubads())
					.setCollapseEmptyDiv(true)
					.setTargeting("pos", "1");
			}
			if (document.getElementById(divslotpromobox2)){
				promobox2 = googletag.defineSlot(MMsezioneTag, [[300, 100],'fluid'], divslotpromobox2)
					.addService(googletag.pubads())
					.setCollapseEmptyDiv(true)
					.setTargeting("pos", "2");
			}
			if (document.getElementById(divslotpromobox3)){
			promobox3 = googletag.defineSlot(MMsezioneTag, [[300, 100]], divslotpromobox3)
				.addService(googletag.pubads())
				.setCollapseEmptyDiv(true)
				.setTargeting("pos", "3");
			}
			if (document.getElementById(divslotpromobox4)){
			promobox4 = googletag.defineSlot(MMsezioneTag, [[300, 100]], divslotpromobox4)
				.addService(googletag.pubads())
				.setCollapseEmptyDiv(true)
				.setTargeting("pos", "4");
			}
		}
		if (document.getElementById("gpt-inread") && statusInread) {
			mm_inread = googletag.defineSlot(MMsezioneTag, [640,5], 'gpt-inread').addService(googletag.pubads());
		}
		if(MMstatusRichMedia){
			richmedia2x2 = googletag.defineSlot(MMsezioneTag, [2,2], 'adv-gpt-outofpage2x2').addService(googletag.pubads());
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
			if (document.getElementById(divslotnameStrip) && MMstatusStrip){
				if(event.slot===mm_stript1) {
					if(sizeStrip != '3,1' && sizeStrip != '320,50' && sizeStrip != '320,100' && sizeStrip != '375,100'){
					 	strip_animation();
					 }
					if(sizeStrip == '728,90'){
					   initComscore(campaignIdStrip,creativeIdStrip,lineItemIdStrip,sizeStrip,1,'mm_stript1',1,divslotnameStrip);
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
				}
			}
			if (document.getElementById(divslotnameBox) && MMstatusBox){
				if(event.slot===mm_box1) {
					initComscore(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,1,'mm_box1',1,divslotnameBox);
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
					if(sizeCompleta != "970,250"){
						jQuery("#strip_adv").removeClass("advCollapse");
					}
					if(MMlarghezzaSitoAdv <= 970 && (sizeStrip == '3,1' || sizeStrip == '320,50' || sizeStrip == '320,100' || sizeStrip == '375,100')){
						ChangePositionStrip();
					}
					if(MMlarghezzaSitoAdv <= 970 && sizeCompleta == '720,240'){
						ChangePositionInitial();
						ResizeIframe4();
					}
				}
			}
			if (document.getElementById(divslotnameBox) && MMstatusBox){
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
				if(MMarrayUrlSkinControllo[0]=='https://www.farmacoecura.it/farmaci/lasix-furosemide-compresse-e-fiale/'){//test
					console.log('[mediamond][amazon bid]===>test');
               		prebitAmazonInit();
				}else{
					googletag.pubads().refresh(); // Display the ads
				}
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
		}],
		slots: [{
			slotID: divslotnameStrip,
			slotName: MMsezioneTag,
			//sizes: [[970, 250]]
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
var nRefresh = 0;
function MediamondTagRefresh(){
	googletag.pubads().refresh([mm_box1]);
}
function ChangePositionStrip(){
	document.querySelector('.strip_adv').setAttribute('style','position: fixed; box-shadow: 0px 1px 0px 0px #888888;background:#fff; z-index: 110;bottom:0;width: 100%');
}

function ChangePositionInitial(){
	document.querySelector('.strip_adv').setAttribute("style", "position:initial;"); 
}

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
console.log('[mediamond][seedtag]===>init');
	if(statusSeedTag){
		var cookieSeedtag = getCookieSeedTag('mediamond');
		console.log('[mediamond]===>cookie:'+cookieSeedtag);
		if (cookieSeedtag == ""  || cookieSeedtag == null) {
			if(cookieSeedtag != 'seedtag_'+nomeSito){
				console.log('[mediamond][seedtag]===>erogazione codice');
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