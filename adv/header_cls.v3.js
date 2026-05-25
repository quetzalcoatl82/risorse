/* prebid amazon -------------------------------------------------------------------*/
let amzDatiPush;
!function (a9, a, p, s, t, A, g) {
	if (a[a9]) return;
	function q(c, r) {
		a[a9]._Q.push([c, r])
	} a[a9] = { init: function () { q("i", arguments) }, fetchBids: function () { q("f", arguments) }, setDisplayBids: function () { }, targetingKeys: function () { return [] }, _Q: [] }; A = p.createElement(s); A.async = !0; A.src = t; g = p.getElementsByTagName(s)[0]; g.parentNode.insertBefore(A, g)
}("apstag", window, document, "script", "//c.amazon-adsystem.com/aax2/apstag.js");

// initialize apstag and have apstag set bids on the googletag slots when they are returned to the page
apstag.init({
	pubID: '3651',
	adServer: 'googletag',
	bidTimeout: 2e3,
	videoAdServer: 'freeWheel',
	deals: true
});


window.apstag = window.apstag || {
	init: function () {
		apstag._Q.push(["i", arguments, (new Date).getTime()])
	},
	fetchBids: function () {
		apstag._Q.push(["f", arguments, (new Date).getTime()])
	},
	setDisplayBids: function () { },
	_Q: []
};
// request the bids for the four googletag slots
apstag.fetchBids({
	slots: [
		{
			//video
			slotID: 'videoSlot', //Slot name, IE 'preroll'. Must be predefined with your account manager
			mediaType: 'video'
		}]
}, function (bids) {

	handleVideoBids(bids);
});


//Handle Video Bids 
function handleVideoBids(bids) {

	try {
		amzDatiPush = bids[0].targeting;
		console.log('[mediamond][amazon]===>bids:', amzDatiPush);
	} catch {
		console.log('[mediamond][amazon]===amzDatiPush non definito');
	}


	try {


		playPrerollWithAmazon(bids[0].targeting);

	} catch {

		console.log('[mediamond][amazon]===>playPrerollWithAmazon errore');

	}
}

//fine prebid amazon

let startStripMobile = (initiator) => {
	if (typeof startStripMobileCheck !== 'undefined') return false;
	if (window.innerWidth > 480) return false;
	console.log('[strip mobile 2021] initiator', initiator)
	window.startStripMobileCheck = 1;
	googletag.cmd.push(function () {
		if (document.getElementById('gpt_stripmobile') && MMstatusStrip) {
			window.stripmobile = googletag.defineSlot(MMsezioneTag, [[320, 50], [320, 100]], 'gpt_stripmobile').addService(googletag.pubads());

			window.stripmobile.setConfig(
				{
					targeting: {
						"pos": "1"
					}
				},
				{
					collapseDiv: "BEFORE_FETCH",
				}
			);

			googletag.display('gpt_stripmobile');
			googletag.pubads().refresh([stripmobile]);

			AmeMh.callbackStripMobile();
		}
	})
}

// JavaScript Document
//data in millisecondi per non avere la cache
var dateToday = new Date();
var dateUTC = Date.parse(dateToday.toUTCString());//restituisce i millisecondi
console.log('dateUTC estesa:' + dateUTC);
//questo serve per far apparire la personalizzazione
var datiSkin = new Array();
var idSitoDfp = '26337617';
var nomeSito = 'soldionline';
var ppid = '';
//per personalizzare le varie sezioni
var SitoHp = window.location.href;
var arrayUrlSkin = new Array();
arrayUrlSkin = SitoHp.split('/');
/*controllo per togliere la skin momentaneamente*/
var arrayUrlSkinControllo = new Array();
arrayUrlSkinControllo = SitoHp.split('?');
var tagAdv = '';
var sezioneTag;
var datiSkin = new Array();
//mi serve per i nuovi richmedia mobile
var sitoResponsive = false;
//serve per far visualizzare la strip o no nelle personalizzazioni
var MMstatusStrip = true;
var MMstatusRichMedia = true;
var MMstatusSkin = true;
var MMstatusBox = true;
var statusInread = true;
var statusSeedTag = true;
var MMstatusPromoBox = true;
var MMstatusNativePromoBox = true;
var MMstatusAdv = true;
let catecoriePermutiveWatson = '';//tassonomia permutive
//
var personalizzazione_manuale = 0;
var canaleAdv = '';
var tagCanaleAdv = '';
/*---------------------------------------*/
var statusPersonalizzazioniWeb = false;
var statusPersonalizzazioni = false;
var MMdatiSkin = new Array();
//per differenziare le varie sezioni
var MMSitoHp = window.location.href;
var MMarrayUrlSkin = new Array();
MMarrayUrlSkin = MMSitoHp.split('/');
/*controllo per togliere la skin momentaneamente*/
var MMarrayUrlSkinControllo = new Array();
MMarrayUrlSkinControllo = MMSitoHp.split('?');
var VerificaSottocanale = MMarrayUrlSkin[3].substr(0, 1);
//url modificata per passarla nel settargheting
var urlSetTargheting = MMarrayUrlSkinControllo[0].replace('http://', '').replace('https://', '').replace('www.', '').replace('?refresh', '').replace('?utm_source=Zemanta&utm_medium=referral', '').replace(/\//gi, '_').replace('=', '_', 'ig').replace('!', '_', 'ig').replace('+', '_', 'ig').replace('*', '_', 'ig').replace('#', '_', 'ig').replace('^', '_', 'ig').replace('~', '_', 'ig').replace(';', '_', 'ig').replace('(', '_', 'ig').replace(')', '_', 'ig').replace('[', '_', 'ig').replace(']', '_', 'ig').replace('"', '_', 'ig').replace("'", "_", "ig").replace('<', '_', 'ig').replace('>', '_');
//console.log('===>urlSetTargheting:'+urlSetTargheting);
//
var cssTemplateSkin = 1;
var MMPosition = 'init';
/* varibile per il canale della tag*/
var MMsezioneTag;
function sendAdUnit(canaleSito) {
	MMsezioneTag = '/4758/' + canaleSito;
}
//
if (MMarrayUrlSkin[2] == 'www.soldionline.it') {
	if (MMarrayUrlSkin[3] == '' || VerificaSottocanale == '?') {
		sendAdUnit('soldionline/home');
	} else if (MMarrayUrlSkin[3] == 'quotazioni') {
		sendAdUnit('soldionline/quotazioninotizieindici');
	} else if (MMarrayUrlSkin[3] == 'notizie') {
		sendAdUnit('soldionline/quotazioninotizieindici');
	} else if (MMarrayUrlSkin[3] == 'video') {
		sendAdUnit('soldionline/video');
	} else if (MMarrayUrlSkin[3] == 'strumenti') {
		sendAdUnit('soldionline/ros');
	} else {
		sendAdUnit('soldionline/ros');
	}
} else if (MMarrayUrlSkin[2] == 'abcrisparmio.soldionline.it') {
	sendAdUnit('soldionline/abcrisparmio');
} else if (MMarrayUrlSkin[2] == 'soldielavoro.soldionline.it') {
	sendAdUnit('soldionline/soldielavoro');
} else {
	sendAdUnit('soldionline/ros');
}

sezioneTag == MMsezioneTag;
//cerco la sotto stringa sulle url dei pubbliredazionali dalla url principale per poi poter settare una adunit pubbli
var MMurlPubbli = new Array();
var MMstatusPubbli;
MMurlPubbli.push("speciale-nessuno");
for (t = 0; t < MMurlPubbli.length; t++) {
	MMstatusPubbli = MMSitoHp.indexOf(MMurlPubbli[t]);
	if (MMstatusPubbli > 0) {
		sendAdUnit('soldionline/publi');
	}
}
//url per gli speciali +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//fine url per gli speciali +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//variabile preso da wordpress
if (typeof (mediamondTag) == undefined || typeof (mediamondTag) == 'undefined') {
	//usando le tag di wordpress settate nell'array mediamondTag
	console.log('[mediamond]===>mediamondTag non valorizzata');
	mediamondTag = '';
}

///////////////////////////////////////////////////////////
var sezionePaginaKey = new Array();
var keywordURL = '';
function cercaSezioneUrl() {
	//ciclo tutte le parole dell'array
	var numeroMMarrayUrlSkin = MMarrayUrlSkin.length;
	for (u = 3; u < (MMarrayUrlSkin.length - 1); u++) {
		sezionePaginaKey.push(MMarrayUrlSkin[u].toLowerCase());

	}
	var urlFinaleArticolo = MMarrayUrlSkin[(numeroMMarrayUrlSkin - 1)].split('-');
	var urlArrayArticoloCompleto = sezionePaginaKey.concat(urlFinaleArticolo);
	for (i = 0; i < urlArrayArticoloCompleto.length; i++) {
		keywordURL += urlArrayArticoloCompleto[i] + ',';
	}
	//aggiungo alle kw anche quello che sta oltre il ?
	if (MMarrayUrlSkinControllo[1] != undefined && MMarrayUrlSkinControllo[1] != '') {
		keywordURL += MMarrayUrlSkinControllo[1] + ',';
	}
	//aggiungo alle kw anche quello che viene passato dalla varibile advSpeciale per gli speciali
	if (typeof (advSpeciale) != undefined && typeof (advSpeciale) != 'undefined') {
		keywordURL += advSpeciale + ',';
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

var OggiHp = new Date;
var GiornoHp = OggiHp.getDate();

var MeseHp = OggiHp.getMonth() + 1;
//
// if (MMlarghezzaSitoAdv < 970) {
// 	//mobile
// 	divslotnameStrip = 'adv-gpt-masthead-leaderboard-container1';
// 	divslotnameBox = 'adv-gpt-box-container1';
// 	rifDivslotnameBox = '#adv-gpt-box-container1';
// 	divslotpromobox1 = 'adv-gpt-promobox-mobile-container1';
// 	divslotpromobox2 = 'adv-gpt-promobox-mobile-container2';
// 	divslotpromobox3 = 'adv-gpt-promobox-mobile-container3';
// 	divslotpromobox4 = 'adv-gpt-promobox-mobile-container4';
// } else {
// 	//desktop
// 	divslotnameStrip = 'adv-gpt-masthead-leaderboard-container1';
// 	divslotnameBox = 'adv-gpt-box-container1';
// 	rifDivslotnameBox = '#adv-gpt-box-container1';
// 	divslotpromobox1 = 'adv-gpt-promobox-container1';
// 	divslotpromobox2 = 'adv-gpt-promobox-container2';
// 	divslotpromobox3 = 'adv-gpt-promobox-container3';
// 	divslotpromobox4 = 'adv-gpt-promobox-container4';
// }
divslotnameStrip = 'adv-gpt-masthead-leaderboard-container1';
divslotnameBox = 'adv-gpt-box-container1';
rifDivslotnameBox = '#adv-gpt-box-container1';
divslotpromobox1 = 'adv-gpt-promobox-container1';
divslotpromobox2 = 'adv-gpt-promobox-container2';
divslotpromobox3 = 'adv-gpt-promobox-container3';
divslotpromobox4 = 'adv-gpt-promobox-container4';
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
function initTagGpt() {

	try {

		catecoriePermutiveWatson = catPermutive();
		console.log('[mediamond]===>catecoriePermutiveWatson', catecoriePermutiveWatson);

		// catPermutive();

	} catch (error) {

		console.log('[mediamond]===>catecoriePermutiveWatson', error);

	}

	try {
		//il valore Ã¨ preso da Analitics, suggerimento di AME
		ppid = getGaClientId();
	} catch (error) {
		console.log('[mediamond]===>MMpublisher_id', error)
	}

	let rifPointPromobox = document.querySelector(rifDivslotnameBox);
	if (rifPointPromobox) {
		let divPromobox1 = document.createElement("div");
		divPromobox1.id = divslotpromobox1;
		divPromobox1.style = "margin-top:20px";
		rifPointPromobox.insertAdjacentElement('afterend', divPromobox1);
		let divPromobox2 = document.createElement("div");
		divPromobox2.id = divslotpromobox2;
		divPromobox2.style = "margin-top:20px";
		rifPointPromobox.insertAdjacentElement('afterend', divPromobox2);
		let divPromobox3 = document.createElement("div");
		divPromobox3.id = divslotpromobox3;
		divPromobox3.style = "margin-top:20px";
		rifPointPromobox.insertAdjacentElement('afterend', divPromobox3);
		let divPromobox4 = document.createElement("div");
		divPromobox4.id = divslotpromobox4;
		divPromobox4.style = "margin-top:20px";
		rifPointPromobox.insertAdjacentElement('afterend', divPromobox4);
	}
	//
	//
	var style300x100 = document.createElement('link');
	style300x100.setAttribute('rel', 'stylesheet');
	style300x100.setAttribute('type', 'text/css');
	style300x100.setAttribute('href', '//adv.mediamond.it/300x100_soldionline/style_300x100_new2.css');
	//jQuery(rifDivslotnameBox).append(style300x100);
	var node = document.getElementsByTagName("body")[0];
	node.parentNode.insertBefore(style300x100, node);
	//
	if (MMlarghezzaSitoAdv > 970) {
		var lipHpsponsor = document.createElement("script");
		lipHpsponsor.async = false;
		lipHpsponsor.type = "text/javascript";
		lipHpsponsor.src = "//quetzalcoatl82.github.io/risorse/adv/hpsponsor.v3.js";
		//lipHpsponsor.src = "//adv.mediamond.it/hpsponsor/soldionline/hpsponsor.v2.js?"+dateUTC;
		var node = document.getElementsByTagName("body")[0];
		node.parentNode.insertBefore(lipHpsponsor, node);
	}

	//creo un div in cui erogare la tag del out of page
	let stOop = document.createElement('style');

	let cssOop = '#adv-gpt-outofpage  {\n';
	cssOop += '   position: fixed;\n';
	cssOop += '   height: 100%;\n';
	cssOop += '   width: 100%;\n';
	cssOop += '   overflow:hidden;\n';
	cssOop += '   top:0;\n';
	cssOop += '   left:0;\n';
	cssOop += '   z-index:-1;\n';
	cssOop += '}\n';

	cssOop += '@media screen and (max-width: 999px) {\n';

	cssOop += '		#adv-gpt-outofpage > div[id^="google_ads_iframe"] {\n';
	cssOop += '  		margin-top: 30vw;\n';
	cssOop += '  		min-height: 600px;\n';
	cssOop += '		}\n';

	cssOop += '}\n';

	document.head.appendChild(stOop);
	stOop.appendChild(document.createTextNode(cssOop));

	//creo un div in cui erogare la tag del out of page
	if (!document.getElementById('adv-gpt-outofpage')) {
		var oopDiv = document.createElement('div');
		oopDiv.setAttribute('id', 'adv-gpt-outofpage');
		document.body.appendChild(oopDiv);
	}

	document.getElementById("adv-gpt-outofpage").innerHTML = "<img src='//static.mediamond.it/img_generiche/20x20.png' style='width:25px;height:25px'>";//per iasÃƒÂ¹

	//inread
	var newdiv = document.createElement('div');
	newdiv.setAttribute('id', 'gpt-inread');
	newdiv.setAttribute("style", "position:absolute;width:1px;height:1px;overflow:hidden;");
	var node = document.getElementsByTagName("body")[0];
	node.appendChild(newdiv);


	let rifPointInread = document.querySelector('.corpo-art > p:nth-of-type(4)');
	if (rifPointInread) {
		let divInread = document.createElement("div");
		divInread.id = "adv-video-article";
		rifPointInread.insertAdjacentElement('afterend', divInread);
	}

	googletag.cmd.push(function () {


		var mappingStrip = googletag.sizeMapping().
			addSize([0, 0], [[720, 240]]).
			addSize([600, 499], [[728, 90], [720, 240]]).
			addSize([971, 500], [[728, 90], [970, 250]]).
			build();



		var mappingBox = googletag.sizeMapping().
			addSize([0, 0], [[300, 250], [300, 600]]).
			build();




		//strip
		if (document.getElementById(divslotnameStrip) && MMstatusStrip) {
			mm_stript1 = googletag.defineSlot(MMsezioneTag, [970, 250], divslotnameStrip).defineSizeMapping(mappingStrip).addService(googletag.companionAds()).addService(googletag.pubads());

			mm_stript1.setConfig(
				{
					targeting: {
						"pos": "1"
					}
				},
				{
					collapseDiv: "BEFORE_FETCH",
				}
			);
		}
		//box
		if (document.getElementById(divslotnameBox) && MMstatusBox) {
			mm_box1 = googletag.defineSlot(MMsezioneTag, [300, 250], divslotnameBox).defineSizeMapping(mappingBox).addService(googletag.companionAds()).addService(googletag.pubads());

			mm_box1.setConfig(
				{
					targeting: {
						"pos": "1"
					}
				},
				{
					collapseDiv: "BEFORE_FETCH",
				}
			);

		}

		if (MMlarghezzaSitoAdv > 970 && MMarrayUrlSkinControllo[1] != 'noskin' && MMstatusSkin) {
			//skin
			mm_skin1 = googletag.defineSlot(MMsezioneTag, [100, 100], 'div-gpt-skin').addService(googletag.companionAds()).addService(googletag.pubads());

			mm_skin1.setConfig(
				{
					targeting: {
						"pos": "1"
					}
				},
				{
					collapseDiv: "BEFORE_FETCH",
				}
			);

			MMerogazioneSkin = true;
		}

		//strip sponsor e-toro
		//strip
		var mappingStrip_sponsor = googletag.sizeMapping().
			addSize([0, 0], [320, 80]).
			addSize([971, 500], [960, 80]).
			build();
		//strip sponsor e-toro
		if (document.getElementById('adv-gpt-leaderboard-sponsor')) {
			mm_stript_sponsor = googletag.defineSlot(MMsezioneTag, [960, 80], 'adv-gpt-leaderboard-sponsor').defineSizeMapping(mappingStrip_sponsor).addService(googletag.pubads());


			mm_stript_sponsor.setConfig(
				{
					targeting: {
						"pos": "1"
					}
				},
				{
					collapseDiv: "BEFORE_FETCH",
				}
			);

		}

		if (MMstatusPromoBox) {

			if ((document.getElementById("adv-gpt-promobox-container1") && MMlarghezzaSitoAdv >= 970)) {// || (document.getElementById("adv-gpt-promobox-mobile-container1") && MMlarghezzaSitoAdv < 970)

				//promobox
				promobox1 = googletag.defineSlot(MMsezioneTag, [301, 101], divslotpromobox1).addService(googletag.pubads());

				promobox1.setConfig(
					{
						targeting: {
							"pos": "1"
						}
					},
					{
						collapseDiv: "BEFORE_FETCH",
					}
				);

			}

			if ((document.getElementById("adv-gpt-promobox-container2") && MMlarghezzaSitoAdv >= 970) || (document.getElementById("adv-gpt-promobox-mobile-container2") && MMlarghezzaSitoAdv < 970)) {

				document.getElementById(divslotpromobox2).style.marginTop = '20px';
				promobox2 = googletag.defineSlot(MMsezioneTag, [[301, 101], 'fluid'], divslotpromobox2).addService(googletag.pubads());

				promobox2.setConfig(
					{
						targeting: {
							"pos": "2"
						}
					},
					{
						collapseDiv: "BEFORE_FETCH",
					}
				);

			}

			if ((document.getElementById("adv-gpt-promobox-container3") && MMlarghezzaSitoAdv >= 970)) {	//|| (document.getElementById("adv-gpt-promobox-mobile-container3") && MMlarghezzaSitoAdv < 970)

				promobox3 = googletag.defineSlot(MMsezioneTag, [301, 101], divslotpromobox3).addService(googletag.pubads())

				promobox3.setConfig(
					{
						targeting: {
							"pos": "3"
						}
					},
					{
						collapseDiv: "BEFORE_FETCH",
					}
				);

			}

			if ((document.getElementById("adv-gpt-promobox-container4") && MMlarghezzaSitoAdv >= 970)) {//|| (document.getElementById("adv-gpt-promobox-mobile-container4") && MMlarghezzaSitoAdv < 970)

				promobox4 = googletag.defineSlot(MMsezioneTag, [301, 101], divslotpromobox4).addService(googletag.pubads());

				promobox4.setConfig(
					{
						targeting: {
							"pos": "4"
						}
					},
					{
						collapseDiv: "BEFORE_FETCH",
					}
				);

			}
		}

		if (rifPointInread && statusInread) {
			mm_inread = googletag.defineSlot(MMsezioneTag, [640, 5], 'gpt-inread').addService(googletag.pubads());

			mm_inread.setConfig(
				{
					collapseDiv: "BEFORE_FETCH",
				}
			);
		}

		// googletag.pubads().setTargeting("purl",""+urlSetTargheting+"");	
		// googletag.pubads().setTargeting("keywordURL",[""+keywordURL+""]);
		// googletag.pubads().setTargeting("sezionePagina",[""+sezionePaginaKey+""]);
		// googletag.pubads().setTargeting("publisher_id", ppid);
		// googletag.pubads().setTargeting("tassonomia", catecoriePermutiveWatson);
		googletag.setConfig({
			targeting: {
				"purl": "" + urlSetTargheting + "",
				"sezionePagina": ["" + sezionePaginaKey + ""],
				"keywordURL": ["" + keywordURL + ""],
				"publisher_id": ppid,
				"tassonomia": catecoriePermutiveWatson
			}
		});
		var pubads = googletag.pubads();
		// Il PPID rimane un metodo dedicato
		if (ppid) {
			pubads.setPublisherProvidedId(ppid);
		}

		googletag.companionAds().setRefreshUnfilledSlots(true);
		googletag.pubads().enableVideoAds();

		googletag.pubads().enableSingleRequest();

		googletag.setConfig(

			{ disableInitialLoad: true }
		);

		googletag.enableServices();

		googletag.pubads().addEventListener('slotOnload', function (event) {
			if (document.getElementById(divslotnameStrip) && MMstatusStrip) {
				if (event.slot === mm_stript1) {
					//console.log('===> slot '+divslotnameStrip+' caricato');			

				}
			}
			if (document.getElementById(divslotnameBox) && MMstatusBox) {
				if (event.slot === mm_box1) {
					console.log('[Mediamond][Box] slot caricato');
				}
			}
		});
		googletag.pubads().addEventListener('slotRenderEnded', function (event) {
			console.log('[TagGpt] slotRenderEnded', event.slot.getSlotElementId());
			if (document.getElementById(divslotnameStrip) && MMstatusStrip) {
				if (event.slot === mm_stript1) {
					//console.log('===> slot strip renderizzato');
					campaignIdStrip = event.campaignId;
					creativeIdStrip = event.creativeId;
					lineItemIdStrip = event.lineItemId;
					sizeStrip = event.size;
					sizeCompletaStrip = event.size;
					idCampagnaMastHead = event.campaignId;
					if (sizeStrip != '3,1' && sizeStrip != '320,50' && sizeStrip != '320,100' && sizeStrip != '375,100') {
						AmeMh.strip_animation();
					}
					// pushdown PAMELA
					if (sizeStrip != "970,250") {
						// $("#strip_adv").removeClass("advCollapse");
						if (document.querySelector("#strip_adv")) {
							document.querySelector("#strip_adv").classList.remove("advCollapse");
						}
					}
					if (sizeStrip != '3,1' && sizeStrip != '320,50' && sizeStrip != '320,100' && sizeStrip != '375,100') {
						console.log('[push FE] slotRenderEnded gpt_strip: ' + parseInt(performance.now() - startPageTimes.performanceNow));
						// isAnimationAllowed = isStripAnimationAllowed(event);
						// end pushdown PAMELA
					}
					if (MMlarghezzaSitoAdv <= 720 && sizeCompletaStrip == '720,240' && !event.isEmpty) {
						//console.log('chiamata resize iframe2');
						ResizeIframe4();
					}
				}
			}
			if (document.getElementById(divslotnameBox) && MMstatusBox) {
				if (event.slot === mm_box1) {
					console.log('[Mediamond][Box] slot rendirizzato');
					//console.log('===> slot box renderizzato');
					campaignIdBox = event.campaignId;
					creativeIdBox = event.creativeId;
					lineItemIdBox = event.lineItemId;
					sizeBox = event.size;
					idCampagnaBox = event.campaignId;
					//scrolltest();
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

	prebitAmazonInit = function () {

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
				sizes: [[970, 250], [728, 90], [320, 50]]
			}]
		}, function (bids) {
			// set apstag bids, then trigger the first request to DFP
			googletag.cmd.push(function () {
				apstag.setDisplayBids();
				googletag.pubads().refresh();
			});
		});

	};

	//prebitAmazonInit();

	/*fine prebid amazon --------------------*/

}//initTagGpt

//funzione per richiamre il formato intro, questa funzione Ã¨ richiamata da AME con un controllo sulla pushdown
initIntro = () => {
	console.log('[TagGpt] initIntro call ');
	if (MMstatusRichMedia) {
		googletag.cmd.push(function () {
			richmedia = googletag.defineOutOfPageSlot(MMsezioneTag, 'adv-gpt-outofpage').addService(googletag.pubads());

			// googletag.display('adv-gpt-outofpage');
			// googletag.pubads().refresh([richmedia]);
		});
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// FINE STRUTTURA SRA ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////----------------------------------------------------------------------------------------------------------------------------
var arraySlot = new Array();
var posNew = 1;
//window.addEventListener('load', function() {
window.addEventListener("scroll", function () {
	for (n = 2; n < 20; n++) {
		if (document.querySelector("#adv-gpt-box-container" + n) && MMlarghezzaSitoAdv >= 769 && MMstatusBox) {
			if (arraySlot[n] == undefined) {
				generaGpt(n);
			}
		}
		if (document.querySelector("#adv-gpt-box-mobile-container" + n) && MMlarghezzaSitoAdv < 769 && MMstatusBox) {
			if (arraySlot[n] == undefined) {
				generaGpt(n);
			}
		}
	}
});
//});
function generaGpt(nSlot) {
	posNew = nSlot;
	if (MMlarghezzaSitoAdv >= 769)
		divslotnameNew = 'adv-gpt-box-container' + posNew;
	if (MMlarghezzaSitoAdv < 769)
		divslotnameNew = 'adv-gpt-box-mobile-container' + posNew;
	arraySlot[nSlot] = "pieno";

	googletag.cmd.push(function () {


		var mappingBox = googletag.sizeMapping().
			addSize([0, 0], [[300, 250], [300, 600]]).
			build();


		if (MMlarghezzaSitoAdv < 768) {

			window['mm_mobile_box' + posNew];
			window['mm_mobile_box' + posNew] = googletag.defineSlot(MMsezioneTag, [300, 250], divslotnameNew).addService(googletag.pubads()).defineSizeMapping(mappingBox);

			// Setting multiple targeting key-values at once.
			window['mm_mobile_box' + posNew].setConfig(
				{
					targeting: {
						"pos": "" + posNew + "",
						"idcampagna": "" + idCampagnaBox + ""
					}
				},
				{
					collapseDiv: "BEFORE_FETCH",
				}
			);

		} else {

			window['mm_box' + posNew];
			window['mm_box' + posNew] = googletag.defineSlot(MMsezioneTag, [300, 250], divslotnameNew).addService(googletag.pubads()).defineSizeMapping(mappingBox);

			// Setting multiple targeting key-values at once.
			window['mm_box' + posNew].setConfig(
				{
					targeting: {
						"pos": "" + posNew + "",
						"idcampagna": "" + idCampagnaBox + ""
					}
				},
				{
					collapseDiv: "BEFORE_FETCH",
				}
			);

		}

		// googletag.pubads().setTargeting("idcampagna",""+idCampagnaBox+"");

		googletag.enableServices();

		googletag.pubads().addEventListener('slotRenderEnded', function (event) {
			if (event.slot === window['mm_box' + posNew] || event.slot === window['mm_mobile_box' + posNew]) {
				campaignIdBox = event.campaignId;
				creativeIdBox = event.creativeId;
				lineItemIdBox = event.lineItemId;
				sizeBox = event.size;
				sizeCompletaBox = event.size;
			}
		});

		googletag.pubads().addEventListener('slotOnload', function (event) {
			if (event.slot === window['mm_box' + posNew]) {
			}
			if (event.slot === window['mm_mobile_box' + posNew]) {
			}
		});

	});


	googletag.cmd.push(function () { googletag.display(divslotnameNew); });
	if (MMlarghezzaSitoAdv < 768) {
		googletag.pubads().refresh([window['mm_mobile_box' + posNew]]);
	} else {
		googletag.pubads().refresh([window['mm_box' + posNew]]);
	}

}

//script per la nuova strip dinamica
// window.addEventListener('load', function() {
// 	//creo un intervallo di 100 millisecondi per controllare il cambiamento del css della strip
// 	var refreshId = setInterval(function(){
// 		var flyingPosition = $('#flying-container').css('position');//leggo il css della posizione
// 		var flyingHeight = $('#flying-container').css('height');//leggo la 
// 		console.log('==>flyingPosition:'+flyingPosition);
// 		//console.log('==>flyingHeight:'+flyingHeight);
// 		$('body').css("cssText", "background-position: center "+flyingHeight+" !important;");
// 		//fermo il loop se la posizione della strip diventa statica
// 		if(flyingPosition == 'static'){
// 			StopRefreshId()
// 		}
// 	}, 100);
// 	//funzione per stoppare l'intervallo
// 	function StopRefreshId() {
// 		$('body').css("cssText", "background-position: center top !important;");
//     	clearInterval(refreshId);
// 	}
// });

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
///+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// seedtag


function setCookieSeedTag(name, value, last) {
	//console.log('[mediamond]===>set cookie');
	if (last) {
		var now = new Date();
		var expires = new Date();
		expires.setTime(now.getTime() + (parseInt(last) * 60 * 1000));
		document.cookie = name + '=' + escape(value) + '; expires=' +
			expires.toGMTString() + '; path=/';
	} else {
		document.cookie = name + '=' + escape(value) + '; expires= ; path=/';
	}
}

function getCookieSeedTag(name) {
	console.log('[mediamond]===>get cookie');
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}


//lanciato dall'editore
function initSeedTag() {

	if (statusSeedTag) {

		console.log('[mediamond]===>init seedtag');
		//if(MMarrayUrlSkinControllo[1]=='testseedtag'){
		var cookieSeedtag = getCookieSeedTag('mediamond');
		console.log('[mediamond]===>cookie:' + cookieSeedtag);
		//setCookie('mediamond','seedtag',0); per cancellarlo
		if (cookieSeedtag == "" || cookieSeedtag == null) {
			if (cookieSeedtag != 'seedtag_' + nomeSito) {
				console.log('[mediamond]===>erogazione codice seedtag');
				//nuovo codice ++++++++++++++++++++++++++

				(function () {
					var st = document.createElement('script');
					st.type = 'text/javascript';
					st.async = true;
					st.src = ('https:' == document.location.protocol
						? 'https'
						: 'http') + '://t.seedtag.com/t/8828-9610-01.js?v=' + Math.random();
					var s = document.getElementsByTagName('script')[0];
					s.parentNode.insertBefore(st, s);
				})();

				//fine nuovo codice ++++++++++++++++++++++

				//vecchio codice +++++++++++++++++++++++++++++++++
				// window._seedtagq = window._seedtagq || [];
				// window._seedtagq.push(['_setId', '8828-9610-01']);
				// window._seedtagq.push(['iframe_mode']);
				// (function () {
				//   var st = document.createElement('script');
				//   st.type = 'text/javascript';
				//   st.async = true;
				//   st.src = ('https:' == document.location.protocol
				// 	? 'https'
				// 	: 'http') + '://config.seedtag.com/loader.js?v=' + Math.random();
				//   var s = document.getElementsByTagName('script')[0];
				//   s.parentNode.insertBefore(st, s);
				// })();
				//fine vecchio codice +++++++++++++++++++++++++++++

				//
				setCookieSeedTag('mediamond', 'seedtag_' + nomeSito, 60);//espresso in minuti	
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
/*libreria di brandmatrics su singola url ---------------------------------*/
var lipBrandmetrics = document.createElement("script");
lipBrandmetrics.async = true;
lipBrandmetrics.type = "text/javascript";
var useSSL = "https:" == document.location.protocol;
lipBrandmetrics.src = (useSSL ? "https:" : "http:") + "//cdn.brandmetrics.com/survey/script/cc23a26c2ae74fcd938432d00ef2d963.js";
var node = document.getElementsByTagName("script")[0];
node.parentNode.insertBefore(lipBrandmetrics, node);
/* libreria di brandmatrics -------------------------------------*/