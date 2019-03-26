// JavaScript Document
//questo serve per far apparire la personalizzazione
var tagAdv;
var sezioneTag;
//
var nomeSito = 'filmtv';
var statusStrip = true;
var statusSeedTag = true;
/*var personalizzazioneFilmtv = new Object();
personalizzazioneFilmtv.status = false;*/
var statusPersonalizzazioniWeb = false;
var cssTemplateSkin = 1;
var idSitoDfp = '26338097';
/*var personalizzazioneMondodonna = new Object();
  personalizzazioneMondodonna.status = false;*/
/*---------------------------------------*/
var statusPersonalizzazioni = false;
var status300x100 = false;
var personalizzazione_manuale = 0;
var statusRichMedia = true;
var sezioneSito = '';
//
//var larghezzaSitoAdv = document.body.clientWidth;
var larghezzaSitoAdv = $(window).width();
//
var SitoHp = window.location.href;
//per personalizzare le varie sezioni
var arrayUrlSkin = new Array();
arrayUrlSkin = SitoHp.split('/');
/*controllo per togliere la skin momentaneamente*/
var arrayUrlSkinControllo = new Array();
arrayUrlSkinControllo = SitoHp.split('?');

var gadsAdsenceOverlayer = document.createElement("script");
gadsAdsenceOverlayer.async = true;
gadsAdsenceOverlayer.type = "text/javascript";
var useSSL = "https:" == document.location.protocol;
gadsAdsenceOverlayer.src = (useSSL ? "https:" : "http:") + "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
var node =document.getElementsByTagName("script")[0];
node.parentNode.insertBefore(gadsAdsenceOverlayer, node);
//
var MMlarghezzaSitoAdv = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
//varibile per controllare l'erogazione dei promobox autopromo
var MMpromoboxCliente = 0;
//per differenziare le varie sezioni
var MMSitoHp = window.location.href;
var MMarrayUrlSkin = new Array();
MMarrayUrlSkin = MMSitoHp.split('/');
var MMstatusRichMedia = true;
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

if(MMarrayUrlSkin[2] == 'www.filmtv.it'){
	if(MMarrayUrlSkin[3] == '' || VerificaSottocanale == '?'){
		sendAdUnit('filmtv/home');
		cssTemplateSkin = 2;
		sezioneSito = 'home';
	}else if(MMarrayUrlSkin[3] == 'cinema'){
		sendAdUnit('filmtv/sala');
	}else if(MMarrayUrlSkin[3] == 'film'){
		sendAdUnit('filmtv/film');
	}else if(MMarrayUrlSkin[3] == 'programmi-tv'){
		sendAdUnit('filmtv/tv');
	}else if(MMarrayUrlSkin[3] == 'trailer'){
		sendAdUnit('filmtv/video');
	}else{
		sendAdUnit('filmtv/ros');
	}
}else{
	sendAdUnit('filmtv/ros');
}



//cerco la sotto stringa sulle url dei pubbliredazionali dalla url principale per poi poter settare una adunit pubbli
var MMurlPubbli = new Array();
var MMstatusPubbli;
MMurlPubbli.push("speciale-test");
for(t=0; t<MMurlPubbli.length; t++){
	MMstatusPubbli = MMSitoHp.indexOf(MMurlPubbli[t]);
	if(MMstatusPubbli>0){
		sendAdUnit('filmtv/ros');
		if(MMurlPubbli[t]=='speciale-test'){
			sendAdUnit('filmtv/ros');
		}
	}
}

if(MMlarghezzaSitoAdv < 970) {
	//mobile
    divslotnameStrip = 'adv-gpt-masthead-leaderboard-container1';
	divslotnameBox = 'adv-gpt-box-container1';
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
function initTagGpt(){
    if(document.getElementById(divslotnameStrip)){
	   document.getElementById(divslotnameStrip).style.display = 'none';
    }
	//
	var lipHpsponsor = document.createElement("script");
	lipHpsponsor.async = false;
	lipHpsponsor.type = "text/javascript";
	var useSSL = "https:" == document.location.protocol;
	lipHpsponsor.src = (useSSL ? "https:" : "http:") + "//adv.mediamond.it/hp_sponsor_filmtv/hpsponsor_dinamic.js";
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
			addSize([0, 0], [[320,1],[320, 50],[320, 100],[720, 240]]).
			addSize([400, 400], [[728,90],[980,323]]).
			addSize([980, 500], [[728,90],[980,50],[970,250],[980,250],[980,323]]).
			build();

		if (sezioneSito != 'home' && document.getElementById(divslotnameStrip)){
		
			var pushInitTime = parseInt(performance.now() - startPageTimes.performanceNow) / 1000;

			if(MMlarghezzaSitoAdv <= 670 && Math.round(pushInitTime) <= 60){
				ga('send', 'event', 'Pushdown_mobile', 'Pushdown_init_gpt', 'diff: ' + Math.round(pushInitTime), Math.round(pushInitTime), {
					nonInteraction: true
				});

				console.log('[push FE] Pushdown_init_gpt event: '+parseInt(performance.now() - startPageTimes.performanceNow));
			}
			
		}

		var mappingBox = googletag.sizeMapping().
		addSize([0, 0], [300, 250]).
		build();

		if(MMstatusRichMedia == true){
			richmedia = googletag.defineOutOfPageSlot(MMsezioneTag,'adv-gpt-outofpage').addService(googletag.pubads());
		}

		if (document.getElementById(divslotnameStrip)){
			mm_stript1 = googletag.defineSlot(MMsezioneTag,[[970,250],[320,1]],divslotnameStrip)
				.defineSizeMapping(mappingStrip)
				.setTargeting("pos","1")
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

		if(MMlarghezzaSitoAdv > 970 && MMarrayUrlSkinControllo[1] != 'noskin' && arrayUrlSkin[3] != 'community'){
			//skin
			mm_skin1 = googletag.defineSlot(MMsezioneTag,[100,100],'div-gpt-skin')
				.setTargeting("pos","1")
				.setCollapseEmptyDiv(true)
				.addService(googletag.pubads());

			MMerogazioneSkin = true;
		}



		if (document.getElementById("gpt-inread") ) {
			mm_inread = googletag.defineSlot(MMsezioneTag, [640,5], 'gpt-inread').addService(googletag.pubads());
		}

		if(MMstatusRichMedia == true){
		richmedia2x2 = googletag.defineSlot(MMsezioneTag, [2,2], 'adv-gpt-outofpage2x2').addService(googletag.pubads());
		}


		googletag.pubads().setTargeting("purl",""+urlSetTargheting+"");
		googletag.pubads().setTargeting("adx",ADX_label);
		googletag.pubads().setTargeting("ksg",KruxSegments);
		googletag.pubads().setTargeting("kuid",KruxUser);
		googletag.pubads().enableSingleRequest();
		googletag.enableServices();

		googletag.pubads().addEventListener('slotOnload', function(event) {
             if(document.getElementById("adv-gpt-masthead-leaderboard-container1")){
                if(event.slot===mm_stript1) {
                    //console.log('===> slot strip caricato');
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
                
             }
            if(event.slot===mm_box1) {
				initComscore(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,1,'mm_box1',1,divslotnameBox);
                initIAS(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,1,divslotnameBox);
			}
		});
		googletag.pubads().addEventListener('slotRenderEnded', function(event) {
            if(document.getElementById(divslotnameStrip)){
                if(event.slot===mm_stript1) {
					if(event.size[0] != "970" && event.size[1] != "250"){
						$("#strip_adv").removeClass("advCollapse");
					}
					console.log('[push FE] slotRenderEnded gpt_strip: '+parseInt(performance.now() - startPageTimes.performanceNow));
					
                    console.log('===> slot strip renderizzato');

                    document.getElementById(divslotnameStrip).style.display = 'block';
                    campaignIdStrip = event.campaignId;
                    creativeIdStrip = event.creativeId;
                    lineItemIdStrip = event.lineItemId;
                    sizeStrip = event.size;
                    sizeCompleta = event.size;
                    idCampagnaMastHead=event.campaignId;

                    if(MMlarghezzaSitoAdv <= 970 && sizeCompleta[0] == 720){
                        console.log('===> chiamata resize iframe3');
                        ResizeIframe4();
                        ChangePositionStrip();
                    }
                    
                    console.log('[push FE] slotRenderEnded gpt_strip: '+parseInt(performance.now() - startPageTimes.performanceNow));
                    isAnimationAllowed = isStripAnimationAllowed(event);
                    //checkInvendutoStrip(posStrip);
                }
            }
            if(event.slot===mm_box1) {
				 campaignIdBox = event.campaignId;
                creativeIdBox = event.creativeId;
                lineItemIdBox = event.lineItemId;
                sizeBox = event.size;
			}
		});

		if(MMstatusRichMedia == true){
			googletag.display("adv-gpt-outofpage");
		}

		if (document.getElementById(divslotnameStrip)) {
			googletag.display(divslotnameStrip);
		}
		//il box è stato tolto perchè viene richiamato in un secondo tempo in displayTagGpt();
		if (document.getElementById(divslotnameBox)) {
			googletag.display(divslotnameBox);
		}
		if(MMlarghezzaSitoAdv > 970 && MMarrayUrlSkinControllo[1] != 'noskin'){
			googletag.display('div-gpt-skin');
		}


		if (document.getElementById("gpt-inread") ) {
			googletag.display('gpt-inread');
		}

		if(MMstatusRichMedia == true){
		googletag.display('adv-gpt-outofpage2x2');
		}

	});

};//initTagGpt

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

var nRefresh = 0;
function MediamondTagRefresh(){
	//console.log('===> chiamata refresh tag');
	googletag.pubads().refresh([mm_box1]);
}
function ChangePositionStrip(){
	//console.log('===>ChangePosition');
	//jQuery('.strip_adv' ).addClass( "minimasthead" );
	jQuery('.bannerStrip').attr('style','position: initial; box-shadow: none;transform: initial;background:none;');
	//jQuery('#gpt_strip').attr('style','height: 125px;margin-top:100px;background:none;width:100%;');
	//jQuery('#adv-strip').attr('style','background:none;');
	//jQuery('#strip_adv').attr('style','background:none;');
	//jQuery('.expanding div').attr('style','background:none;');

}


//----------------------------------------------------------------------------------------------------------///
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*var m=0;
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
		//console.log('===>adx per SRA TIMER2 label definita:'+ADX_label);
		//console.log('===>timer m:'+m);
		clearInterval(timerGpt);
			if(adxLoad == false && (document.getElementById(divslotnameBox) || document.getElementById("adv-gpt-masthead-leaderboard-container1")) && MMarrayUrlSkinControllo[1] != 'noadv'){
				adxLoad = true;
				//console.log('===> initTag timer');
				initTagGpt();
			}
	}else{
		//console.log('===>adx PER SRA TIMER label NON definita');
	}
}*/

//////++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//////+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++///


/* non toccare */
document.write('<div id="adv-skin"></div>');
/*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx*/
/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx*/

function chiudiOverlayerBottomFixed(){
	document.getElementById('primarOverlayerBottomFixed').style.display = "none";
	var elementoOverlayerBottomFixed = document.getElementById('primarOverlayerBottomFixed');
	elementoOverlayerBottomFixed.parentNode.removeChild(elementoOverlayerBottomFixed);
}
// OVERLAYER ADSENCE BOTTON FIXED
function loadAdsenceOverlaver(){
			//console.log('--> loadAdsenceOverlaver ...');
			var snippetString = "";

			snippetString += '<link rel="stylesheet" type="text/css" media="all" href="//adv.mediamond.it/modelli_adv/overlayer_bottom_fixed/style.css" />';
			//snippetString += '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></scr'+'ipt>';
			snippetString += '<div id="primarOverlayerBottomFixed">';
			snippetString += '<a class="chiudiOverlayerBottomFixed" onClick="chiudiOverlayerBottomFixed();" ><img src="//adv.mediamond.it/modelli_adv/overlayer_bottom_fixed/img_chiudi.png" /></a>';
			//banner grande
			snippetString +='<div id="banner_container"><div id="banner_grande" >';
			snippetString += '<ins class="adsbygoogle" style="display:block;min-width:728px;max-width:970px;width:100%;height:90px" data-ad-client="ca-pub-0820544532937748"    data-ad-slot="5482506965"></ins>';

			snippetString += '<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>';

			//(adsbygoogle = window.adsbygoogle || []).push({});
			snippetString +='</div></div></div>';
		$('body').append(snippetString);
}
/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx*/
var arraySlotBox = new Array();
//controllo lo scrol della pagina
window.addEventListener('load', function() {
	window.addEventListener('scroll', function() {
		//mediamondAdGpt.getAds('true', data);
			//console.log('windows box scroll');
			for (n=2;n<20;n++){
				if( jQuery("#adv-gpt-box-container"+n).length ) {
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

		//desktop
		divslotnameNew = 'adv-gpt-box-container' + nSlot;
		window['mm_box' + posNew];
		//tag gpt
		googletag.cmd.push(function() {
		window['mm_box' + posNew] = googletag.defineSlot(MMsezioneTag,[300,250],divslotnameNew).addService(googletag.pubads())
		.setTargeting("pos",""+posNew+"").setCollapseEmptyDiv(true);

		googletag.pubads().setTargeting("purl",""+urlSetTargheting+"");
		googletag.pubads().setTargeting("adx",ADX_label);
		googletag.pubads().setTargeting("ksg",KruxSegments);
		googletag.pubads().setTargeting("kuid",KruxUser);
		googletag.pubads().setFetchAdsSerially(true);
		googletag.enableServices();
			googletag.pubads().addEventListener('slotRenderEnded', function(event) {
				if(event.slot===window['mm_box' + posNew]) {
					campaignIdBox = event.campaignId;
                    creativeIdBox = event.creativeId;
                    lineItemIdBox = event.lineItemId;
                    sizeBox = event.size;
				}
			});
			googletag.pubads().addEventListener('slotOnload', function(event) {
				if(event.slot===window['mm_box' + posNew]) {
					initComscore(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,posNew,window['mm_mobile' + posNew],nSlot,divslotnameNew);
                    initIAS(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,posNew,divslotnameNew);
				}
			});
		});

	arraySlotBox[nSlot] = "pieno";
	googletag.cmd.push(function() { googletag.display(divslotnameNew); });
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
				window._seedtagq.push(['_setId', '8978-4413-01']);
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