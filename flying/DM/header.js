// JavaScript Document
//vengono definite delle variabili che poi verranno utilizzate nei js per l'erogazione dei formati
var MMdatiSkin = [];
var nomeSito = 'donnamoderna';
var MMstatusStrip = true;
var MMstatusMh = true;//questo serve per bloccare l'erogazione del 970x20 e del 720x240
var MMstatusSkin = true;
var MMstatusRichMedia = true;
var MMstatusBox = true;
var statusAdv = true;
var statusInitAdv = true;
var statusInread = true;
var MMstatusSkin = true;
var MMPosition = 'init';
var cssTemplateSkin = 1;
var MMerogazioneSkin = false;
var statusSeedTag = true;
var MMstatusPromoBox = true;
var MMstatusNativePromoBox = true;
var MMstatusAdv = true;
var KruxSegments;
var KruxUser;
var keyFiltro;
var statusSeedTag = true;
var idSitoDfp = '244161377';
var dataOggi = new Date();
var giornoOggi = dataOggi.getDate();
var meseOggi = dataOggi.getMonth()+1;
var sezionePaginaKey = new Array();
var keywordURL = '';
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
/* varibile per il canale della tag*/
var MMsezioneTag;
//permette di assegnare la adunit alla pagina
function sendAdUnit(canaleSito){
	MMsezioneTag = '/4758/'+canaleSito;
}
if(MMarrayUrlSkin[2] == 'www.donnamoderna.com' || MMarrayUrlSkin[2] == 'm.donnamoderna.com'){
	if(MMarrayUrlSkin[3] == '' || VerificaSottocanale == '?'){//home
		sendAdUnit('ame_donnamoderna/home');
		cssTemplateSkin = 5;	
	}else if(MMarrayUrlSkin[3] == 'news' && MMarrayUrlSkin[4] == undefined){
		sendAdUnit('ame_donnamoderna/news');
		cssTemplateSkin = 5;
	}else if(MMarrayUrlSkin[3] == 'news'){
		sendAdUnit('ame_donnamoderna/news');
		cssTemplateSkin = 2;
	}else if(MMarrayUrlSkin[3] == 'bellezza'  && MMarrayUrlSkin[4] == undefined){
		sendAdUnit('ame_donnamoderna/beauty');
		cssTemplateSkin = 5;
	}else if(MMarrayUrlSkin[3] == 'bellezza'){
		sendAdUnit('ame_donnamoderna/beauty');
		cssTemplateSkin = 2;
	}else if(MMarrayUrlSkin[3] == 'moda'  && MMarrayUrlSkin[4] == undefined){
		sendAdUnit('ame_donnamoderna/style');
		cssTemplateSkin = 5;
	}else if(MMarrayUrlSkin[3] == 'moda'){
		sendAdUnit('ame_donnamoderna/style');
		cssTemplateSkin = 2;
	}else if(MMarrayUrlSkin[3] == 'ambiente'  && MMarrayUrlSkin[4] == undefined){
		sendAdUnit('ame_donnamoderna/green');
		cssTemplateSkin = 5;
	}else if(MMarrayUrlSkin[3] == 'ambiente'){
		sendAdUnit('ame_donnamoderna/green');
		cssTemplateSkin = 2;
	}else if(MMarrayUrlSkin[3] == 'amore-relazioni'  && MMarrayUrlSkin[4] == undefined){
		sendAdUnit('ame_donnamoderna/love');
		cssTemplateSkin = 5;
	}else if(MMarrayUrlSkin[3] == 'amore-relazioni'){
		sendAdUnit('ame_donnamoderna/love');
		cssTemplateSkin = 2;
	}else if(MMarrayUrlSkin[3] == 'benessere-mente'  && MMarrayUrlSkin[4] == undefined){
		sendAdUnit('ame_donnamoderna/mind');
		cssTemplateSkin = 5;
	}else if(MMarrayUrlSkin[3] == 'benessere-mente'){
		sendAdUnit('ame_donnamoderna/mind');
		cssTemplateSkin = 2;
	}else if(MMarrayUrlSkin[3] == 'sfilate'){
		sendAdUnit('ame_donnamoderna/sfilate');
		cssTemplateSkin = 1;
	}else if(MMarrayUrlSkin[3] == 'cucina' && MMarrayUrlSkin[4] == 'ricette'){//home
		sendAdUnit('ame_donnamoderna/cucina');
		cssTemplateSkin = 2;
	}else if(MMarrayUrlSkin[3] == 'cucina' && MMarrayUrlSkin[4] == undefined){//home
		sendAdUnit('ame_donnamoderna/cucina');
		cssTemplateSkin = 5;
	}else if(MMarrayUrlSkin[3] == 'cucina'){//home
		sendAdUnit('ame_donnamoderna/cucina');
		cssTemplateSkin = 2;
	}else if(MMarrayUrlSkin[3] == 'mamme'  && MMarrayUrlSkin[4] == undefined){
		sendAdUnit('ame_donnamoderna/mamme');
		cssTemplateSkin = 5;
	}else if(MMarrayUrlSkin[3] == 'mamme'){
		sendAdUnit('ame_donnamoderna/mamme');
		cssTemplateSkin = 2;
	}else if(MMarrayUrlSkin[3] == 'salute'  && MMarrayUrlSkin[4] == undefined){//home
		sendAdUnit('ame_donnamoderna/salute');
		cssTemplateSkin = 5;
	}else if(MMarrayUrlSkin[3] == 'salute'){//home
		sendAdUnit('ame_donnamoderna/salute');
		cssTemplateSkin = 2;
	}else if(MMarrayUrlSkin[3] == 'storie'  && MMarrayUrlSkin[4] == undefined){//home
		sendAdUnit('ame_donnamoderna/altre');
		cssTemplateSkin = 5;
	}else if(MMarrayUrlSkin[3] == 'storie'){//home
		sendAdUnit('ame_donnamoderna/altre');
		cssTemplateSkin = 2;
	}else if(MMarrayUrlSkin[3] == 'casa'  && MMarrayUrlSkin[4] == undefined){//home
		sendAdUnit('ame_donnamoderna/casa');
		cssTemplateSkin = 5;
	}else if(MMarrayUrlSkin[3] == 'casa'){//home
		sendAdUnit('ame_donnamoderna/casa');
		cssTemplateSkin = 2;
	}else if(MMarrayUrlSkin[3] == 'ambiente'  && MMarrayUrlSkin[4] == undefined){//home
		sendAdUnit('ame_donnamoderna/casa');
		cssTemplateSkin = 5;
	}else if(MMarrayUrlSkin[3] == 'ambiente'){//home
		sendAdUnit('ame_donnamoderna/casa');
		cssTemplateSkin = 2;
	}else if(MMarrayUrlSkin[3] == 'matrimonio'){//home
		sendAdUnit('ame_donnamoderna/casa');
		cssTemplateSkin = 1;
	}else if(MMarrayUrlSkin[3] == 'lifestyle'  && MMarrayUrlSkin[4] == undefined){
		sendAdUnit('ame_donnamoderna/lifestyle');
		cssTemplateSkin = 5;
	}else if(MMarrayUrlSkin[3] == 'lifestyle'){//home
		sendAdUnit('ame_donnamoderna/lifestyle');
		cssTemplateSkin = 2;
	}else if(MMarrayUrlSkin[3] == 'fitness'  && MMarrayUrlSkin[4] == undefined){
		sendAdUnit('ame_donnamoderna/fit');
		cssTemplateSkin = 5;
	}else if(MMarrayUrlSkin[3] == 'fitness'){//home
		sendAdUnit('ame_donnamoderna/fit');
		cssTemplateSkin = 2;
	}else if(MMarrayUrlSkin[3] == 'video'){//home
		sendAdUnit('ame_donnamoderna/video');
		cssTemplateSkin = 2;
	}else{
		sendAdUnit('ame_donnamoderna/altre');
		cssTemplateSkin = 1;
	}
}else if(MMarrayUrlSkin[2] == 'ricette.donnamoderna.com' || MMarrayUrlSkin[2] == 'cucina.donnamoderna.com' || MMarrayUrlSkin[2] == 'sta-cucina.donnamoderna.com' || MMarrayUrlSkin[2] == 'sta-ricette.donnamoderna.com'){
	sendAdUnit('ame_donnamoderna/cucina');
	cssTemplateSkin = 2;
}else if(MMarrayUrlSkin[2] == 'donnevere.donnamoderna.com' || MMarrayUrlSkin[2] == 'sognipossibili.donnamoderna.com'){
	sendAdUnit('ame_donnamoderna/blog');
	cssTemplateSkin = 2;
}else if(MMarrayUrlSkin[2] == 'live.donnamoderna.com'){
	sendAdUnit('ame_donnamoderna/live');
	cssTemplateSkin = 2;
}else if(MMarrayUrlSkin[2] == 'blog.donnamoderna.com' || MMarrayUrlSkin[2] == 'casting.donnamoderna.com' || MMarrayUrlSkin[2] == 'bambino.donnamoderna.com' || MMarrayUrlSkin[2] == 'dibattiti.donnamoderna.com' || MMarrayUrlSkin[2] == 'www.diretta.donnamoderna.com'){
	sendAdUnit('ame_donnamoderna/blog');
	cssTemplateSkin = 1;
}else if(MMarrayUrlSkin[2] == 'comefare.donnamoderna.com'){
	sendAdUnit('ame_donnamoderna/comefare');
	cssTemplateSkin = 1;
}else if(MMarrayUrlSkin[2] == 'video.donnamoderna.com'){
	sendAdUnit('ame_donnamoderna/donnamodernatv');
	cssTemplateSkin = 1;
}else if(MMarrayUrlSkin[2] == 'www.oroscopo.it'){
	sendAdUnit('ame_donnamoderna/oroscopo');
	cssTemplateSkin = 3;
}else if(MMarrayUrlSkin[2]=='luoghideccezione.donnamoderna.com'){
		sendAdUnit('ame_donnamoderna/altre');
		cssTemplateSkin = 4;
}
/*tag di test*/
//MMsezioneTag = '/4758/test_mediamond/test2';
/*blocco di funzioni------------------------------------------------------------------------*/
mediamondAdGpt = new mediamondAdGpt();
function mediamondAdGpt() {
	var me = this;
	//mi permette di vambiare adunit passando una nuova url
	me.getAds = function(async, data){
		console.log('[mediamond][adv]===>cambio nodo');
		MMarrayUrlChange = (data.pUrl).split('/');
		//MMsezioneTag = '/4758/test_mediamond/test1';
		//console.log('url:'+data.pUrl);
		//console.log('MMarrayUrlChange:'+MMarrayUrlChange[3]);
		//sendAdUnit(MMarrayUrlChange[3]);
	}
}
//cerco la sotto stringa sulle url dei pubbliredazionali dalla url principale per poi poter settare una adunit pubbli
var MMurlPubbli = new Array();
var MMstatusPubbli;
var MMstatusSpeciali = false;
MMurlPubbli.push("nessuno");
MMurlPubbli.push("speciale");
MMurlPubbli.push("atlete");
MMurlPubbli.push("negev-adventure-corri-con-noi");
MMurlPubbli.push("corri-con-noi");
MMurlPubbli.push("back-to-school-2020");
for(t=0; t<MMurlPubbli.length; t++){
	MMstatusPubbli = MMSitoHp.indexOf(MMurlPubbli[t]);
	if(MMstatusPubbli>0){
		if(MMurlPubbli[t]=='scopri-le-passioni-che-cancellano-gli-anni-di-troppo'){
			cssTemplateSkin = 4;
		}
		if(MMurlPubbli[t]=='speciale'){
			MMstatusSpeciali=true;
		}
		if(MMurlPubbli[t]=='atlete'){
			//statusAdv=false;//per togliere l'adv
		}
		
		if(MMurlPubbli[t]=='back-to-school-2020'){
			sezionePaginaKey.push('back-to-school-2020');
		}

		if(MMurlPubbli[t]=='negev-adventure-corri-con-noi'){
			sezionePaginaKey.push('negev-adventure-corri-con-noi');
		}
		if(MMurlPubbli[t]=='corri-con-noi'){
			sendAdUnit('ame_donnamoderna/publi/corri_con_noi');
		}
	}
}
/*js per la gestione degli speciali ---------------------------------------*/
var specialgads = document.createElement("script");
specialgads.async = true;
specialgads.type = "text/javascript";
var useSSL = "https:" == document.location.protocol;
specialgads.src = (useSSL ? "https:" : "http:") + "//adv.mediamond.it/native/donnamoderna/setting_native_dm.js";
var node =document.getElementsByTagName("script")[0];
node.parentNode.insertBefore(specialgads, node);
//fine js
/*---------------------------------------------------
/*controllo della funzione di webtrak ---------------------------------------------------------------------------------------*/
function cercaSezioneUrl() {
	//ciclo tutte le parole dell'array
	var numeroMMarrayUrlSkin = MMarrayUrlSkin.length;
	for (u=2; u<(MMarrayUrlSkin.length-1);u++){//lo faccio partire da 2 cosi prendo anche il dominio
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
/*controllo della funzione di webtrak ---------------------------------------------------------------------------------------*/
function getTagPfx(){
    if (typeof(MMsezioneTag) == 'undefined' || typeof(MMsezioneTag) == 'undefined' || MMsezioneTag == null || MMsezioneTag == '')
        return 'undefined';
    else
        return MMsezioneTag;
};
//script per escludere l'inread quando c'è un'altro video in pagina AC-515
if(document.querySelector('body').getAttribute('data-video') == "1"){
	console.log('[mediamond][inread]===>escluso per variabile editore');
	statusInread = false;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// STRUTTURA SRA ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var idCampagnaBox;
var idCampagnaMastHead;
var MMlarghezzaSitoAdv = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var MMaltezzaSitoAdv = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
var MMerogazioneSkin = false;
var sizeCompletaBox;
var esclusioneTagGpt = false;
var campaignIdStrip;
var creativeIdStrip;
var lineItemIdStrip;
var sizeStrip;
var campaignIdBox;
var creativeIdBox;
var lineItemIdBox;
var sizeBox;
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//eclusione di alcune tag dalle hp e hp sottocanale di moda, bellezza: jira AC-131
var splitCanale = MMarrayUrlSkin[3].split('?');
if( (MMarrayUrlSkin[2] == 'www.donnamoderna.com' && (MMarrayUrlSkin[3] == '' || VerificaSottocanale == '?')) ){
	console.log('[mediamond]===> no skin e mh su hp');
	MMstatusSkin = false;
	MMstatusMh = true;
}
if( MMarrayUrlSkin[3] == 'bellezza' && MMarrayUrlSkin[4] == undefined ){
	console.log('[mediamond]===> no skin in hp');
	MMstatusSkin = false;
	MMstatusMh = true;
}
if(MMarrayUrlSkinControllo[1]=='testskin'){
	MMstatusSkin = true;
}
if((MMarrayUrlSkin[3] == 'moda') || (MMarrayUrlSkin[3] == 'bellezza') ){
	statusSeedTag = false;
}
if(isclassi == true) {//sezione https://www.donnamoderna.com/classi richiesto da ame il 17/09/2020
	MMstatusMh = false;
	MMstatusSkin = false;
}
//tolgo il mh dalla hp e hp di canale //richiesto da ame 28-05-2020 la variabile homecanali è passata dall'editore
if(homecanali == true){
	/*if(MMlarghezzaSitoAdv < 970 ){
		MMstatusMh = true;//attivato solo per la campagna amazon 13-14 ottobre
		//console.log('[mediamond][masthead]===>escluso');
	}else{
		MMstatusMh = false;//richiesto da ame 28-05-2020
	}*/
	MMstatusMh = false;//richiesto da ame 28-05-2020
}
//**********************************************************************************************************
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
//native nuovi
var sw = document.documentElement.clientWidth;
var sidebarSlotName1 = (sw<=999) ? 'native-sidebar-mobile-1' : 'native-sidebar-1',
sidebarSlotName2 = (sw<=999) ? 'native-sidebar-mobile-2' : 'native-sidebar-2',
sidebarSlotName3 = (sw<=999) ? 'native-sidebar-mobile-3' : 'native-sidebar-3';
function initTagGpt(){
	
	if(statusInitAdv){//mi serve per non far ricaricare l'adv se venisse fatta un'altra chiamata sullo scroll infinito
		statusInitAdv = false;
		//console.log('===> chiamata tag gpt in modalità SRA');
		//unifico le tag di wqordpress e quelle generate dalla url
		keywordGlobal = mediamondTag.concat(sezionePaginaKey);
		//carico il file con il css e i comendi per far apparire la skin
		if(document.getElementById(divslotnameStrip)){
		document.getElementById(divslotnameStrip).style.display = 'none';
		}
	//
	if(MMlarghezzaSitoAdv > 970) {	
		var lipHpsponsor = document.createElement("script");
		lipHpsponsor.async = false;
		lipHpsponsor.type = "text/javascript";
		var useSSL = "https:" == document.location.protocol;
		lipHpsponsor.src = (useSSL ? "https:" : "http:") + "//adv.mediamond.it/hpsponsor/donnamoderna_2020/hpsponsor_dinamic.js";
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
	//creo un div in cui erogaqre la tag della skin
	if(MMstatusSkin){
	var newdiv = document.createElement('div');
	newdiv.setAttribute('id', 'div-gpt-skin');
	newdiv.setAttribute("style", "position:fixed;top:0;left:0;width:1px;height:1px;overflow:hidden;");
	var node = document.getElementsByTagName("body")[0];
	node.appendChild(newdiv);
	}
	var newdiv = document.createElement('div');
	newdiv.setAttribute('id', 'gpt-inread');
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

	//------------------------------------------------------------------------------------------------------------
	//per problema con troppi dati krux
	if(MMSitoHp == 'https://www.donnamoderna.com/storie/prima-elementare-cosa-serve-al-tuo-bambino-per-affrontare-al-meglio-la-scuola'){
		KruxSegments = '';
		KruxUser = '';
	}
//--------------------------------------------------------------------------------------------------------------------
	//inread	
	if(statusInread == true){
		var rifPointInread = jQuery(".dm20-foglia").find("p");
		if(rifPointInread.length > 0){
			jQuery( "<div id='adv-video-article'></div>" ).insertAfter(rifPointInread[3]);
		}
	}
	googletag.cmd.push(function() {
		if(MMstatusMh==false){//esclusione formati
			var mappingStrip = googletag.sizeMapping().
			addSize([0, 0], [[3,1],[320, 100],[320, 50]]).
			build();
		}else{
			if(devTypeUtility == "mobile_web_ipad" || devTypeUtility == "mobile_web_android_tablet"){
				  var mappingStrip = googletag.sizeMapping().
				addSize([0, 0], [[3,1],[320, 50],[320, 100],[720, 240]]).		
				addSize([600, 499], [[3,1],[720, 240]]).
				addSize([971, 500], [[3,1],[970, 250],[728, 90]]).
				build();
			}else{
				  var mappingStrip = googletag.sizeMapping().
				addSize([0, 0], [[3,1],[320, 50],[320, 100],[720, 240]]).	
				addSize([600, 499], [[3,1],[970, 250],[728, 90]]).
				build();
			}
			
		}
		//strip
		if (document.getElementById(divslotnameStrip) && MMstatusStrip && (MMstatusMh || MMlarghezzaSitoAdv<970)){
			mm_stript1 = googletag.defineSlot(MMsezioneTag,[[3,1],[970,250]],divslotnameStrip)
				.defineSizeMapping(mappingStrip)
				.setTargeting("pos","1")
				.setTargeting("test",2)
				.setCollapseEmptyDiv(true,true)
				.addService(googletag.pubads());		
		}
		//box
		if(esclusioneTagGpt300x600){//esclusione formati
			var mappingBox = googletag.sizeMapping().
			addSize([0, 0], [300,250]).
			build();
		}else{
			var mappingBox = googletag.sizeMapping().
			addSize([0, 0], [[300,250],[300,600]]).
			build();
		}
		if (document.getElementById(divslotnameBox) && MMstatusBox) {
			mm_box1 = googletag.defineSlot(MMsezioneTag,[[300,250],[300,600]],divslotnameBox)
			.defineSizeMapping(mappingBox)
				.setTargeting("pos","1")
				.setCollapseEmptyDiv(true,true)
				.addService(googletag.pubads());
		}
		if(MMstatusRichMedia){
			richmedia = googletag.defineOutOfPageSlot(MMsezioneTag,'adv-gpt-outofpage').addService(googletag.pubads());
		}
		if(MMlarghezzaSitoAdv > 970 && MMarrayUrlSkinControllo[1] != 'noskin' && MMstatusSkin){
			//skin
			mm_skin1 = googletag.defineSlot(MMsezioneTag,[100,100],'div-gpt-skin')
				.setTargeting("pos","1")
				.setCollapseEmptyDiv(true,true)
				.addService(googletag.pubads());

			MMerogazioneSkin = true;
		}
		//promobox
		if(MMstatusPromoBox){
			if (document.getElementById(divslotpromobox1)) {
				//promobox
				promobox1 = googletag.defineSlot(MMsezioneTag, [300, 100], divslotpromobox1)
					.addService(googletag.pubads())
					.setCollapseEmptyDiv(true,true)
					.setTargeting("pos", "1");

			}
			if (document.getElementById(divslotpromobox2)) {
				//per distanziare
				if(MMlarghezzaSitoAdv > 970){
					document.getElementById(divslotpromobox2).style.marginTop = '20px';
				}else{
					document.getElementById(divslotpromobox2).style.marginTop = '25px';
				}
				promobox2 = googletag.defineSlot(MMsezioneTag, [[300, 100],'fluid'], divslotpromobox2)
					.addService(googletag.pubads())
					.setCollapseEmptyDiv(true,true)
					.setTargeting("pos", "2");
			}
		}
		 if(MMstatusNativePromoBox)  {
                    if(document.getElementById("native-home-1")) {
                        nativehome1 = googletag.defineSlot(MMsezioneTag, [[90,100]], 'native-home-1')
                        .setTargeting('pos','1')
                        .setTargeting('spazio','null')
                        .setTargeting('native','home1')
                        .setTargeting('tipo_pagina','homepage')
                        .setTargeting("cssIndex", "7")
                        .setTargeting('sigla_sito','dm')
                        .setCollapseEmptyDiv(true)
                        .addService(googletag.pubads());
                    }
                    if(document.getElementById("native-home-2")){
                        nativehome2 = googletag.defineSlot(MMsezioneTag, [[90,100]], 'native-home-2')
                        .setTargeting('pos','2')
                        .setTargeting('spazio','null')
                        .setTargeting('native','home2')
                        .setTargeting('tipo_pagina','homepage')
                        .setTargeting("cssIndex", "7")
                        .setTargeting('sigla_sito','dm')
                        .setCollapseEmptyDiv(true)
                        .addService(googletag.pubads());
                    }
                    if(document.getElementById("native-list-1")){
                        nativehome1 = googletag.defineSlot(MMsezioneTag, [[90,100]], 'native-list-1')
                        .setTargeting('pos','1')
                        .setTargeting('spazio','null')
                        .setTargeting('native','home1')
                        .setTargeting('tipo_pagina','homepage')
                        .setTargeting("cssIndex", "7")
                        .setTargeting('sigla_sito','dm')
                        .setCollapseEmptyDiv(true)
                        .addService(googletag.pubads());
                    }
                    if(document.getElementById("native-list-2")){
                        nativehome2 = googletag.defineSlot(MMsezioneTag, [[90,100]], 'native-list-2')
                        .setTargeting('pos','2')
                        .setTargeting('spazio','null')
                        .setTargeting('native','home2')
                        .setTargeting('tipo_pagina','homepage')
                        .setTargeting("cssIndex", "7")
                        .setTargeting('sigla_sito','dm')
                        .setCollapseEmptyDiv(true)
                        .addService(googletag.pubads());
                    }
                    if(document.getElementById(sidebarSlotName1)){
                        nativesidebar1 = googletag.defineSlot(MMsezioneTag, [[80,100]], sidebarSlotName1)
                        .setTargeting('pos','1')
                        .setTargeting('spazio','null')
                        .setTargeting('native','sidebar1')
                        .setTargeting('tipo_pagina','homepage')
                        .setTargeting("cssIndex", "6")
                        .setTargeting('sigla_sito','dm')
                        .setCollapseEmptyDiv(true)
                        .addService(googletag.pubads());
                    }
                    if(document.getElementById(sidebarSlotName2)){
                        nativesidebar2 = googletag.defineSlot(MMsezioneTag, [[80,100]], sidebarSlotName2)
                        .setTargeting('pos','2')
                        .setTargeting('spazio','null')
                        .setTargeting('native','sidebar2')
                        .setTargeting('tipo_pagina','homepage')
                        .setTargeting("cssIndex", "6")
                        .setTargeting('sigla_sito','dm')
                        .setCollapseEmptyDiv(true)
                        .addService(googletag.pubads());
                    }
                    if(document.getElementById(sidebarSlotName3)){
                        nativesidebar3 = googletag.defineSlot(MMsezioneTag, [[80,100]], sidebarSlotName3)
                        .setTargeting('pos','3')
                        .setTargeting('spazio','null')
                        .setTargeting('native','sidebar3')
                        .setTargeting('tipo_pagina','homepage')
                        .setTargeting("cssIndex", "6")
                        .setTargeting('sigla_sito','dm')
                        .setCollapseEmptyDiv(true)
                        .addService(googletag.pubads());
                    }
					if(document.getElementById("native-classi-1")) {
						nativehome1 = googletag.defineSlot(MMsezioneTag, [[90,100]], 'native-classi-1')
						.setTargeting('pos','1')
						.setTargeting('spazio','null')
						.setTargeting('native','classi1')
						.setTargeting('tipo_pagina','classi')
						.setTargeting("cssIndex", "8")
						.setTargeting('sigla_sito','dm')
						.setCollapseEmptyDiv(true)
						.addService(googletag.pubads());
					}
					if(document.getElementById("native-classi-2")){
						nativehome2 = googletag.defineSlot(MMsezioneTag, [[90,100]], 'native-classi-2')
						.setTargeting('pos','2')
						.setTargeting('spazio','null')
						.setTargeting('native','classi2')
						.setTargeting('tipo_pagina','classi')
						.setTargeting("cssIndex", "8")
						.setTargeting('sigla_sito','dm')
						.setCollapseEmptyDiv(true)
						.addService(googletag.pubads());
					}
            }//MMstatusNativePromoBox
		if(MMstatusRichMedia){
			richmedia2x2 = googletag.defineSlot(MMsezioneTag, [2,2], 'adv-gpt-outofpage2x2').addService(googletag.pubads());
		}
        if (document.getElementById('adv-video-article') && statusInread){
            mm_inread = googletag.defineSlot(MMsezioneTag, [640,5], 'gpt-inread').addService(googletag.pubads()).setCollapseEmptyDiv(true);
        }
		googletag.pubads().setTargeting("purl",""+urlSetTargheting+"");
		googletag.pubads().setTargeting("keywordURL",[""+keywordURL+""]);
		googletag.pubads().setTargeting("sezionePagina",[""+sezionePaginaKey+""]);
		googletag.pubads().setTargeting("tagWordpress",[""+keywordGlobal+""]);
		googletag.pubads().setTargeting("adx",ADX_label);
        if(statusPolicy==0){
			googletag.pubads().setTargeting("ksg",KruxSegments);
			googletag.pubads().setTargeting("kuid",KruxUser);
        }
		googletag.pubads().enableSingleRequest();
        googletag.pubads().disableInitialLoad();
		googletag.enableServices();
		googletag.pubads().addEventListener('slotOnload', function(event) {
			if (document.getElementById(divslotnameStrip) && MMstatusStrip && (MMstatusMh || MMlarghezzaSitoAdv<970)){
                if(event.slot===mm_stript1) {
                    if(event.isEmpty == false){
                        document.getElementById(divslotnameStrip).style.display = 'display';
                    }
					if(MMarrayUrlSkin[2] != 'comefare.donnamoderna.com' && sizeStrip != '3,1' && sizeStrip != '320,50' && sizeStrip != '320,100' && sizeStrip != '375,100'){
					strip_animation();
					}
                    if(MMlarghezzaSitoAdv <= 970 && sizeCompleta == '720,240'){
                        ResizeIframe4();
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
			}//if(document.getElementById("adv-gpt-masthead-leaderboard-container1")){
            if (document.getElementById(divslotnameBox)  && MMstatusBox) {
                if(event.slot===mm_box1) {
                    initComscore(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,1,'mm_box1',1,divslotnameBox);
					initIAS2(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,1,divslotnameBox,mm_box1);
                }
            }
		});
		googletag.pubads().addEventListener('slotRenderEnded', function(event) {	
			if (document.getElementById(divslotnameStrip) && MMstatusStrip && (MMstatusMh || MMlarghezzaSitoAdv<970)){
				if(event.slot===mm_stript1) {
                    campaignIdStrip = event.campaignId;
                    creativeIdStrip = event.creativeId;
                    lineItemIdStrip = event.lineItemId;
                    sizeStrip = event.size;
					sizeCompleta = event.size;
					idCampagnaMastHead=event.campaignId;
					// pushdown PAMELA
					if(sizeCompleta != "970,250"){
						$("#strip_adv").removeClass("advCollapse");
					}
					if(MMlarghezzaSitoAdv <= 970 && sizeCompleta == '720,240'){
						ChangePositionInitial();
						ResizeIframe4();
						
					}
					if(MMlarghezzaSitoAdv <= 970 && (sizeStrip == '320,50' || sizeStrip == '320,100' || sizeStrip == '375,100')){
						ChangePosition();
					}
					if(sizeStrip == '320,50' || sizeStrip == '320,100' || sizeStrip == '375,100'){
						$("#gpt_strip_adv").removeClass("advCollapse");
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
                    sizeCompletaBox = event.size;
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
                googletag.pubads().refresh(); // Display the ads
                adserverRequestSent = true;
                //debugMediamond('[mediamond]===>Refresh tag di ias timer:'+(advTime/10),'worn');
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
    
	}//if(statusInitAdv){

}//initTagGpt



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// FINE STRUTTURA SRA ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ChangePosition(){
	document.querySelector('#'+divslotnameStrip).setAttribute('style','left: 0; position:fixed; bottom:0;z-index:999999;text-align:center;width:100%;background-color:#fff;-webkit-overflow-scrolling: touch;'); 
}

function ChangePositionInitial(){
	document.querySelector('#'+divslotnameStrip).setAttribute("style", "position:initial;"); 
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////- 300x250 ----////////////////////////////////////////////////////////////////////////////////////////////////////////
var nRefresh = 0;
function MediamondTagRefresh(){
	if(nRefresh == 2){
		googletag.pubads().refresh([mm_box1]);
		nRefresh = 0;
	}else{
		nRefresh ++;
	}
}
function MediamondTagCreate(){
	createTag();
}
var arraySlotBox = new Array();
var posNew=1;
//controllo lo scrol della pagina
window.addEventListener('load', function() {
	window.addEventListener('scroll', function() {
		if(MMarrayUrlSkin[2] != 'blog.donnamoderna.com' && MMarrayUrlSkin[2] != 'sognipossibili.donnamoderna.com'){
			for (n=2;n<20;n++){
				if(document.querySelector('#adv-gpt-box-container'+n) && MMlarghezzaSitoAdv >= 970  ) {
				  if( arraySlotBox[n] == undefined ){
						generaGpt(n);
				  }
				}
				if(document.querySelector('#adv-gpt-box-mobile-container'+n) && MMlarghezzaSitoAdv < 970  ) {
				  if( arraySlotBox[n] == undefined ){
						generaGpt(n);
				  }
				}
			}
		}
	});
});
//funzione crezione tag
function createTag(){
	//console.log('creazione tag');
		for (n=2;n<20;n++){
			if( document.querySelector('#adv-gpt-box-container'+n) && MMlarghezzaSitoAdv >= 970  ) {
			  if( arraySlotBox[n] == undefined ){
					generaGpt(n);
			  }
			}
			if( document.querySelector('#adv-gpt-box-mobile-container'+n)  && MMlarghezzaSitoAdv < 970 ) {
			  if( arraySlotBox[n] == undefined ){
					generaGpt(n);
			  }
			}
		}
}
//questa funzione genera le tag gpt
function generaGpt(nSlot){
	posNew = nSlot;
	if(MMlarghezzaSitoAdv < 970) {
		//mobile
		divslotnameNew = 'adv-gpt-box-mobile-container' + nSlot;
		window['mm_mobile_box' + posNew];
		//tag gpt
		googletag.cmd.push(function() {
		window['mm_mobile_box' + posNew] = googletag.defineSlot(MMsezioneTag,[[300,250],[300,600]],divslotnameNew).addService(googletag.pubads())
		.setTargeting("pos",""+posNew+"").setTargeting("idcampagna",""+idCampagnaBox+"").setCollapseEmptyDiv(true);
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
		window['mm_box' + posNew] = googletag.defineSlot(MMsezioneTag,[[300,250],[300,600]],divslotnameNew).addService(googletag.pubads())
		.setTargeting("pos",""+posNew+"").setTargeting("idcampagna",""+idCampagnaBox+"").setCollapseEmptyDiv(true);
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
                    initComscore(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,posNew,window['mm_mobile' + posNew],nSlot,divslotnameNew);
                    initIAS(campaignIdBox,creativeIdBox,lineItemIdBox,sizeBox,posNew,divslotnameNew);
				}
			});
		});
	}
	arraySlotBox[nSlot] = "pieno";
	googletag.cmd.push(function() { googletag.display(divslotnameNew); });
    if(MMlarghezzaSitoAdv<970){
        googletag.pubads().refresh([window['mm_mobile_box' + posNew]]);
    }else{
        googletag.pubads().refresh([window['mm_box' + posNew]]);
    }
}
function checkSizeBox(slot,sizeH){
	if(MMlarghezzaSitoAdv < 970) {
		document.getElementById('adv-gpt-box-mobile-container'+slot).style.height = sizeH+'px';
	}else{
		document.getElementById('adv-gpt-box-container'+slot).style.height = sizeH+'px';
	}
}
//js utility ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var lipHpsponsor = document.createElement("script");
lipHpsponsor.async = false;
lipHpsponsor.type = "text/javascript";
var useSSL = "https:" == document.location.protocol;
lipHpsponsor.src = (useSSL ? "https:" : "http:") + "//adv.mediamond.it/hp_sponsor/utility_mediamond.js";
var node = document.getElementsByTagName("script")[0];
node.parentNode.insertBefore(lipHpsponsor, node);