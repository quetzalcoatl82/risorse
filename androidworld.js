// JavaScript Document
//questo serve per far apparire la personalizzazione
var tagAdv;
var sezioneTag;
var nomeSito = 'androidworld';
var sezioneSito;
var statusStrip = true;
var statusPersonalizzazioni = false;
var statusPersonalizzazioniWeb = false;
var statusSeedTag = true;
var idSitoDfp = '26339897';
//
var status300x100 = true;
var status300x100Pag = true;
var personalizzazione_manuale = 0;
var statusRichMedia = true;

var SitoHp = window.location.href;
//per personalizzare le varie sezioni
var arrayUrlSkin = new Array();
arrayUrlSkin = SitoHp.split('/');
/*controllo per togliere la skin momentaneamente*/
var arrayUrlSkinControllo = new Array();
arrayUrlSkinControllo = SitoHp.split('?');
var larghezzaSitoAdv = document.body.clientWidth;
var MMdatiSkin = new Array();
var MMstatusStrip = true;
var MMstatusRichMedia = true;
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
//console.log('===>urlSetTargheting:'+urlSetTargheting);
//
var cssTemplateSkin = 1;
var MMPosition = 'init';
/* varibile per il canale della tag*/
var MMsezioneTag;
function sendAdUnit(canaleSito){
	MMsezioneTag = '/4758/'+canaleSito;
}
//
if(MMarrayUrlSkin[2] == 'www.androidworld.it'){
	if(MMarrayUrlSkin[3] == '' || VerificaSottocanale == '?'){
		sendAdUnit('pianetatech/androidworld_hp');
	}else if(MMarrayUrlSkin[3] == 'forum'){
		sendAdUnit('pianetatech/androidworld_forum');
	}else if(MMarrayUrlSkin[3] == 'recensioni'){
		sendAdUnit('pianetatech/androidworld_video');
	}else if(MMarrayUrlSkin[3] == 'video'){
		sendAdUnit('pianetatech/androidworld_video');
	}else{
		sendAdUnit('pianetatech/androidworld');
	}
}else{
	sendAdUnit('pianetatech/androidworld');
}

 if(MMarrayUrlSkin[3] == 'schede' && (MMarrayUrlSkin[4] == '' || MMarrayUrlSkin[4] == undefined )){
        status300x100Pag = false;
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
	//console.log('===>mediamondTag:'+mediamondTag[r]);
	//console.log('===>statusPubbli:'+MMstatusPubbli);
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
//
var campaignIdBox;
var creativeIdBox;
var lineItemIdBox;
var sizeBox;

var OggiHp = new Date;
var GiornoHp = OggiHp.getDate();

var MeseHp = OggiHp.getMonth()+1;
//
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
//

function initTagGpt(){
	//console.log('===> chiata tag gpt in modalità SRA');
	//
	keywordGlobal = mediamondTag.concat(sezionePaginaKey);
	//
    if(status300x100Pag == true){
        $('<div style="margin: 0 auto; display:block; width: 300px;"><div id="'+divslotpromobox1+'"></div></div>').insertAfter(rifDivslotnameBox);
        if(MMsezioneTag != '/4758/pianetatech/androidworld_hp' && status300x100 == true){
            $('<div style="margin: 0 auto; display:block; width: 300px;"><div id="'+divslotpromobox2+'"></div></div>').insertAfter(rifDivslotnameBox);
            $('<div style="margin: 0 auto; display:block; width: 300px;"><div id="'+divslotpromobox3+'"></div></div>').insertAfter(rifDivslotnameBox);
            $('<div style="margin: 0 auto; display:block; width: 300px;"><div id="'+divslotpromobox4+'"></div></div>').insertAfter(rifDivslotnameBox);
        }
        $('<div id="container_promobox" class="container_promobox_class"></div>' ).insertAfter(rifDivslotnameBox);
    }
	//

	//
	var lipHpsponsor = document.createElement("script");
	lipHpsponsor.async = false;
	lipHpsponsor.type = "text/javascript";
	lipHpsponsor.src = "//adv.mediamond.it/hp_sponsor_androidworld/hpsponsor_androidworld_new.js";
	var node = document.getElementsByTagName("body")[0];
	node.parentNode.insertBefore(lipHpsponsor, node);
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
	newdiv.setAttribute('id', 'gpt-inread-gpt');
	newdiv.setAttribute("style", "position:absolute;width:1px;height:1px;overflow:hidden;");
	var node = document.getElementsByTagName("body")[0];
	node.appendChild(newdiv);
	//creo un div in cui erogaqre la tag della skin
	var newdiv = document.createElement('div');
	newdiv.setAttribute('id', 'div-gpt-skin');
	newdiv.setAttribute("style", "position:fixed;top:0;left:0;width:1px;height:1px;overflow:hidden;");
	var node = document.getElementsByTagName("body")[0];
	node.appendChild(newdiv);

	//console.log('[mediamond]===> nuovo codice header3');
	//$('#strip_adv').append("<div id='adv-strip' style='margin: 0 auto'><div id='adv-gpt-masthead-leaderboard-container1'></div></div>");
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

		if(MMstatusRichMedia == true){
			richmedia = googletag.defineOutOfPageSlot(MMsezioneTag,'adv-gpt-outofpage').addService(googletag.pubads());
		}

			var mappingStrip = googletag.sizeMapping().
			addSize([0, 0], [[320,1],[320, 50],[320, 100],[720,240]]).
			addSize([401, 499], [720,240]).
			addSize([971, 500], [[728,90],[980,50],[970,250],[980,323]]).
			build();


		if(adv_listing == 'listati'){//i listati sono la home e le home di canale
			var mappingBox = googletag.sizeMapping().
			addSize([0, 0], [300,250]).
			build();
		}else{
			var mappingBox = googletag.sizeMapping().
			addSize([0, 0], [[300,250],[300,600]]).
			build();
		}

		//strip
		if (document.getElementById(divslotnameStrip)) {
			mm_stript1 = googletag.defineSlot(MMsezioneTag,[970,250],divslotnameStrip)
				.defineSizeMapping(mappingStrip)
				.setTargeting("pos","1")
				.setTargeting("test","2")
				.setCollapseEmptyDiv(true)
				.addService(googletag.pubads());
		}


		var pushInitTime = parseInt(performance.now() - startPageTimes.performanceNow) / 1000;
    if(MMlarghezzaSitoAdv <= 670 && Math.round(pushInitTime) <= 60){
      window.dataLayer.push({
        'event': 'Pushdown',
        'PD_eventAction': 'Pushdown_init_gpt',
        'PD_eventCategory': 'Pushdown_mobile',
        'PD_eventValue': Math.round(pushInitTime),
        'PD_eventLabel': 'diff: ' + Math.round(pushInitTime)
      });
      console.log('[push FE] Pushdown_init_gpt event: '+parseInt(performance.now() - startPageTimes.performanceNow));
    }

		//box
		if (document.getElementById(divslotnameBox)) {
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

		inread = googletag.defineSlot(MMsezioneTag, [640,5], 'gpt-inread-gpt').addService(googletag.pubads());




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
                console.log('[push FE] slotOnload gpt_strip: '+parseInt(performance.now() - startPageTimes.performanceNow));
                strip_animation();
                //comscore
                if(sizeStrip == '728,90'){
					initComscore(campaignIdStrip,creativeIdStrip,lineItemIdStrip,sizeCompletaStrip,1,'mm_stript1',1,divslotnameStrip);
				}
                  if(sizeStrip == '970,250'){
                    initIAS(campaignIdStrip,creativeIdStrip,lineItemIdStrip,sizeStrip,1,divslotnameStrip);
                }
                if(sizeStrip == '720,240'){
                    initIAS(campaignIdStrip,creativeIdStrip,lineItemIdStrip,sizeStrip,1,divslotnameStrip);
                }
              }
            if(event.slot===mm_box1) {

				initComscore(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,1,'mm_box1',1,divslotnameBox);
                initIAS(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,1,divslotnameBox);

			}
			if(event.slot===promobox1) {
				//console.log('[mediamond]===>promobox1 slotOnload');
				//per la home e le home di canale
				if((MMarrayUrlSkin[4] == '' || MMarrayUrlSkin[4] == undefined || MMarrayUrlSkin[3] == 'tag') && MMlarghezzaSitoAdv>=970){
					//console.log('[mediamond]===>promobox1 androidworld_hp');
					document.getElementById('infinite-adslot-1').style.paddingTop = '0px';
					document.getElementById('infinite-adslot-1').style.height = '250px';
					document.getElementById('infinite-adslot-1').style.paddingBottom = '5px';
					document.getElementById('infinite-adslot-1').style.marginBottom = '10px';
					document.getElementById('infinite-adslot-1').style.marginTop = '-50px';
					//document.getElementById('adv-gpt-promobox-container1').style.padding = '5px';
					/*document.getElementsByClassName('container-300x100').style.width = '100%';
					document.getElementsByClassName('container-300x100').style.maxWidth = '360px';
					document.getElementsByClassName('container-300x100').style.marginBottom = '40px';
					document.getElementsByClassName('container-300x100').style.padding = '5px';	*/

					//document.getElementsByClassName('b-adv').style.paddingTop = '0px';
					//jQuery('.b-adv').css('paddingTop','0px');
					//jQuery('.b-adv').addClass('300x100Padding');
				}
			}
		});
		googletag.pubads().addEventListener('slotRenderEnded', function(event) {
			if(event.slot===mm_stript1) {
        if(event.size[0] != "970" && event.size[1] != "250"){
            $("#strip_adv").removeClass("advCollapse");
        }
				console.log('[push FE] slotRenderEnded gpt_strip: '+parseInt(performance.now() - startPageTimes.performanceNow));
        isAnimationAllowed = isStripAnimationAllowed(event);
				//console.log('===> slot strip renderizzato');
				campaignIdStrip = event.campaignId;
				creativeIdStrip = event.creativeId;
				lineItemIdStrip = event.lineItemId;
				sizeStrip = event.size;
                sizeCompletaStrip = event.size;
				//console.log('===>sizeCompleta[0]:'+sizeCompletaStrip);
				if(event.size == '100,100'){
					document.getElementById(divslotnameStrip).style.height = '1px';
					document.getElementById(divslotnameStrip).style.display = 'none';
					//console.log('===>skin');
				}else{
					//console.log('===> no skin');
				}

				if(sizeCompletaStrip == '100,100'){
					document.getElementById(divslotnameStrip).style.height = '1px';
					document.getElementById(divslotnameStrip).style.display = 'none';
				}
				idCampagnaMastHead=event.campaignId;
				if(MMlarghezzaSitoAdv <= 970 && sizeCompletaStrip == '720,240'){
					//console.log('chiamata resize iframe2');
					ResizeIframe3();
				}
				if(MMlarghezzaSitoAdv <= 970 && sizeCompletaStrip == '320,50'){
					//console.log('chiamata resize iframe2');
					ChangePositionStrip();
				}
				if(MMlarghezzaSitoAdv >= 970 && sizeCompletaStrip == '720,240'){
					//mi serve per centrare il minimasthead quando la risoluzione è superiore ai 970
					//CenterMinimasthead();
				}
				if(MMlarghezzaSitoAdv >= 970 && sizeCompletaStrip == '970,250'){
					//document.getElementById('adv-gpt-masthead-leaderboard-container1').style.marginBottom = '5px';
					//document.getElementById('adv-gpt-masthead-leaderboard-container1').style.textAlign = 'center';
				}

			}
			if(event.slot===mm_box1) {
                campaignIdBox = event.campaignId;
				creativeIdBox = event.creativeId;
				lineItemIdBox = event.lineItemId;
				sizeBox = event.size;
				//console.log('===> slot box renderizzato');
				idCampagnaBox=event.campaignId;
			}
		});
		//out of page
		if(MMstatusRichMedia == true){
			googletag.display("adv-gpt-outofpage");
		}

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

		googletag.display('gpt-inread-gpt');

		if ((document.getElementById("adv-gpt-promobox-container1") && MMlarghezzaSitoAdv >= 970) || (document.getElementById("adv-gpt-promobox-mobile-container1") && MMlarghezzaSitoAdv < 970) ) {
			googletag.display(divslotpromobox1);
		}

		if ((document.getElementById("adv-gpt-promobox-container2") && MMlarghezzaSitoAdv >= 970) || (document.getElementById("adv-gpt-promobox-mobile-container2") && MMlarghezzaSitoAdv < 970) ) {
			googletag.display(divslotpromobox2);
		}
		if ((document.getElementById("adv-gpt-promobox-container3") && MMlarghezzaSitoAdv >= 970) || (document.getElementById("adv-gpt-promobox-mobile-container3") && MMlarghezzaSitoAdv < 970) ) {
			googletag.display(divslotpromobox3);
		}
		if ((document.getElementById("adv-gpt-promobox-container4") && MMlarghezzaSitoAdv >= 970) || (document.getElementById("adv-gpt-promobox-mobile-container4") && MMlarghezzaSitoAdv < 970) ) {
			googletag.display(divslotpromobox4);
		}

		if(MMstatusRichMedia == true){
		googletag.display('adv-gpt-outofpage2x2');
		}

	});

}//initTagGpt
/*
var checkUtenteInteraction = false;
var adxLoad = false;
var timerCheckPage = setInterval(function(){checkPageAdv();},100);
function checkPageAdv(){
		//controllo se l'utente ha interaggito con la pagina prima di far caricare l'adv, rimosso per richiesta di alfredo
		if(MMarrayUrlSkinControllo[1] != 'noadv' && (document.getElementById(divslotnameBox) || document.getElementById(divslotnameStrip) )){
			initTagGpt();
			checkUtenteInteraction = true;
			clearInterval(timerCheckPage);
		}
}	*/
//
function ResizeIframe3() {
	console.log('===> Resize iframe3');
	//===> prende come punto di riferimento il div #adv-gpt-masthead-leaderboard-container1 sempre presente in pagina
	//console.log('[mediamond]===>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
	//console.log('[mediamond]===>ResizeIframe3');
	var rifPointIframeMinimasthead = jQuery("#"+divslotnameStrip).find("iframe");
	var rifPointDivMinimasthead = jQuery("#"+divslotnameStrip).find("div");
	//console.log('[mediamond]===>rifPointIframeMinimasthead:'+rifPointIframeMinimasthead.length);
	//console.log('[mediamond]===>rifPointDivMinimasthead:'+rifPointDivMinimasthead.length);
	var iFrameGptMastHeadWidth = rifPointIframeMinimasthead[0].offsetWidth;

		rifPointIframeMinimasthead[0].style.width = MMlarghezzaSitoAdv+'px';
		rifPointDivMinimasthead[0].style.width = MMlarghezzaSitoAdv+'px';
		var divGptMastHeadHeightValNew = Math.ceil(((MMlarghezzaSitoAdv*720)/240)/9);
		rifPointDivMinimasthead[0].style.height = divGptMastHeadHeightValNew+'px';
		rifPointIframeMinimasthead[0].style.height = divGptMastHeadHeightValNew+'px';

}
//
function ChangePositionStrip(){
	//console.log('===>ChangePosition');
	//jQuery('.expanding div').attr('style','background:none;');
	jQuery('.advstrip').attr('style','left: 0; position:fixed; bottom:0;z-index:999999;text-align:center;width:100%;background-color:#fff;');

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// FINE STRUTTURA SRA ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var arraySlot = new Array();
var posNew=1;
//
$(window).scroll(function() {
	for (n=2;n<20;n++){
		if( $("#infinite-adslot-"+n).length  ) {
		  if( arraySlot[n] == undefined ){
			    if(adv_listing != 'listati'){
			  		generaGpt(n);
				}
		  }
		}
	}
});
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
			window['mm_mobile_box' + posNew] = googletag.defineSlot(MMsezioneTag,[300,250],divslotnameNew).addService(googletag.pubads())		.setTargeting("pos",""+posNew+"").defineSizeMapping(mappingBox).setCollapseEmptyDiv(true);

		}else{

			window['mm_box' + posNew];
			window['mm_box' + posNew] = googletag.defineSlot(MMsezioneTag,[300,250],divslotnameNew).addService(googletag.pubads())		.setTargeting("pos",""+posNew+"").defineSizeMapping(mappingBox).setCollapseEmptyDiv(true);

		}

		googletag.pubads().setTargeting("idcampagna",""+idCampagnaBox+"");
		googletag.pubads().setTargeting("purl",""+urlSetTargheting+"");
		googletag.pubads().setTargeting("sezionePagina",[""+sezionePaginaKey+""]);
		googletag.pubads().setTargeting("tagWordpress",[""+keywordGlobal+""]);
		googletag.pubads().setTargeting("adx",ADX_label);
		googletag.pubads().setTargeting("ksg",KruxSegments);
		googletag.pubads().setTargeting("kuid",KruxUser);
		googletag.pubads().setFetchAdsSerially(true);
		googletag.enableServices();

		googletag.pubads().addEventListener('slotRenderEnded', function(event) {
			if(event.slot===window['mm_box' + posNew] || event.slot===window['mm_mobile_box' + posNew]) {
				sizeCompletaBox = event.size;
                //checkSizeBox(nSlot,sizeCompletaBox[1]);
                campaignIdBox = event.campaignId;
				creativeIdBox = event.creativeId;
				lineItemIdBox = event.lineItemId;
				sizeBox = event.size;
				//console.log('===> slot box renderizzato');
				idCampagnaBox=event.campaignId;
			}
		});

		googletag.pubads().addEventListener('slotOnload', function(event) {
      if(event.slot===mm_stript1) {
  			console.log('===> slot strip caricato');
  			strip_animation();
  		}
      if(event.slot===window['mm_box' + posNew]) {
				initComscore(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,posNew,window['mm_box' + posNew],nSlot,divslotnameNew);
			}
      if(event.slot===window['mm_mobile_box' + posNew]) {
				initComscore(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,posNew,window['mm_mobile_box' + posNew],nSlot,divslotnameNew);
			}
            initIAS(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,posNew,divslotnameNew);
		});

	});
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


//è lanciato dall'editore
function initSeedTag(){

	if(statusSeedTag && mediamondTag.length > 0){//mediamondTag.length è maggiore di 0 quando è in un'alticolo

		//console.log('[mediamond]===>init seedtag');
		//if(MMarrayUrlSkinControllo[1]=='testseedtag'){
		var cookieSeedtag = getCookieSeedTag('mediamond');
			//console.log('[mediamond]===>cookie:'+cookieSeedtag);
		//setCookie('mediamond','seedtag',0); per cancellarlo
		if (cookieSeedtag == ""  || cookieSeedtag == null) {
			if(cookieSeedtag != 'seedtag_'+nomeSito){
				//console.log('[mediamond]===>erogazione codice seedtag');
				//
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
