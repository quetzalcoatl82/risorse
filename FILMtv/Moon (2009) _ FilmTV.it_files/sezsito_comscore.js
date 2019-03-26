//recupero il sito e faccio dei replace

function getElementsByText(str, tag = 'a') { //x check siti altervista
  return Array.prototype.slice.call(document.getElementsByTagName(tag)).filter(el => el.textContent.trim() === str.trim());
}

var sitoMMcmsc = document.location.hostname.replace(/\./ig,"_").replace(/www_|_it|_com|_net|_org|_eu|_mediaset/ig,"").split("/")[0];
sitoMMcmsc = sitoMMcmsc.replace(/m_my-personaltrainer/ig,"my-personaltrainer");
sitoMMcmsc = sitoMMcmsc.replace(/m_ilgiornale/ig,"ilgiornale");
var sezOk = false;
//sito padre per eventuali affiliati
var sitoPadreMMcmsc = "";
if (document.getElementsByClassName("partnerlogo")[0]) { sitoPadreMMcmsc = document.getElementsByClassName("partnerlogo")[0].innerText.toLocaleLowerCase().replace(/ /ig,""); }
if (document.getElementById("donnamodernalogo")) { if (document.getElementById("donnamodernalogo").innerText.indexOf("Questo sito contribuisce alla audience di") != -1) { sitoPadreMMcmsc = "donnamoderna"; } }
if (document.getElementById("ameheader_tal")) { sitoPadreMMcmsc = document.querySelector("#ameheader_tal > a > img").alt.replace(/\./ig,"_").replace(/ /ig,"_").replace(/http:\/\/|www_|_it|_com|_net|_org|_eu|_mediaset/ig,"").toLowerCase(); }
////////////

//recupero la sezione e la sottosezione (che serve in alcuni casi, tipo tgcom video in quanto prima nell'url viene messo l'anno di pubblicazione)
var PathSito = document.location.pathname;
var sezioneMMcmsc = PathSito.split("/")[1];
var SottoSezioneMMcmsc = PathSito.split("/")[2];
var SottoSezioneMMcmsc2 = PathSito.split("/")[3];

//gestione delle eccezioni. Modifico la sezione in base alla struttura particolare di alcuni siti o sezione di siti
if (sitoMMcmsc.indexOf("_altervista") != -1) { sezioneMMcmsc = ""; sitoMMcmsc = "altervista_blog";}
if (getElementsByText('Hosted by AlterVista', 'a').length != 0) { sitoPadreMMcmsc ="altervista_blog"; sezioneMMcmsc = ""; }
	
if (sitoMMcmsc == "giallozafferano") {
	if (sezioneMMcmsc == "ricette-cat" && SottoSezioneMMcmsc == "videoricette" && (typeof(SottoSezioneMMcmsc2) != 'undefined' || SottoSezioneMMcmsc2 != null || SottoSezioneMMcmsc2 != '')) { sezioneMMcmsc = SottoSezioneMMcmsc+"_"+SottoSezioneMMcmsc2; }
	if (sezioneMMcmsc == "ricette-cat" && SottoSezioneMMcmsc == "Ricette-di-base" && (typeof(SottoSezioneMMcmsc2) != 'undefined' || SottoSezioneMMcmsc2 != null || SottoSezioneMMcmsc2 != '')) { sezioneMMcmsc = SottoSezioneMMcmsc+"_"+SottoSezioneMMcmsc2; }
	if (sezioneMMcmsc == "ricette-cat" && (typeof(SottoSezioneMMcmsc) != 'undefined' || SottoSezioneMMcmsc != null || SottoSezioneMMcmsc != '')) { sezioneMMcmsc = sezioneMMcmsc+"_"+SottoSezioneMMcmsc; }
}

if (sitoMMcmsc == "zingarate") { if (sezioneMMcmsc == "idee-di-viaggio" && SottoSezioneMMcmsc=="italia") { sezioneMMcmsc = "idee-di-viaggio_italia"; } }
if (sitoMMcmsc == "skuola") { if (sezioneMMcmsc == "scuola" && SottoSezioneMMcmsc=="alternanza-scuola-lavoro") { sezioneMMcmsc = "alternanza-scuola-lavoro"; } }
if (sitoMMcmsc.indexOf("pianetadonna") != -1) { sitoPadreMMcmsc = ""; }
if (sitoMMcmsc == "programma_sorrisi") { sezioneMMcmsc == "programma_sorrisi"; }
if (sitoMMcmsc.indexOf("sorrisi") != -1) { sitoPadreMMcmsc = ""; }
if (sitoMMcmsc == "nonsprecare") { sitoPadreMMcmsc = ""; }
if (sitoMMcmsc == "lookdavip_tgcom24") { sezioneMMcmsc = ""; }
if (sitoMMcmsc == "programma_sorrisi") { sezioneMMcmsc = ""; }
if (sitoMMcmsc == "ricette_donnamoderna") { sezioneMMcmsc = ""; }
if (sitoMMcmsc == "ricette_giallozafferano") { if (sezioneMMcmsc.indexOf(".html") == -1) { sezioneMMcmsc = "elenco_ricette_con"; } else { sezioneMMcmsc = "ricetta"; } }
if (sitoMMcmsc.indexOf("pianetamamma") != -1) { sitoPadreMMcmsc = ""; }
if (sitoMMcmsc == "cartoonitocheidea") { if (sezioneMMcmsc=="index.php") { sezioneMMcmsc=""; }; }
if (sitoMMcmsc == "my-personaltrainer" || sitoMMcmsc == "cookaround" || sitoMMcmsc == "cartoonitocheidea") { sitoPadreMMcmsc = ""; sezioneMMcmsc = sezioneMMcmsc.replace(/\.shtml|\.html|\.htm|\.php/ig,""); }
if (sitoMMcmsc.indexOf("tgcom24") != -1) { //lasciare indexof
	if (SottoSezioneMMcmsc == "video") { sezioneMMcmsc = SottoSezioneMMcmsc; }
	if (document.getElementById("blogsTgcom")) { sezioneMMcmsc = ""; }
}
if (sitoMMcmsc == "radiomontecarlo" && sezioneMMcmsc == "sezioni") { sezioneMMcmsc = SottoSezioneMMcmsc2; }
if (sitoMMcmsc == "ilgiornale" && (sezioneMMcmsc == "sezioni" || sezioneMMcmsc == "speciali" || sezioneMMcmsc == "static")) { sezioneMMcmsc = SottoSezioneMMcmsc.replace(/\.shtml|\.html|\.htm|\.php/ig,""); }
if (sitoMMcmsc == "radiosubasio" && sezioneMMcmsc == "category") { sezioneMMcmsc = SottoSezioneMMcmsc; }
if (sitoMMcmsc == "sportmediaset" && SottoSezioneMMcmsc == "cover-girl") { sezioneMMcmsc = SottoSezioneMMcmsc; }
if (sitoMMcmsc == "grandprix_sportmediaset") { sezioneMMcmsc = ""; }
if (sitoMMcmsc == "studenti" && sezioneMMcmsc.indexOf(".html") != -1) { if (document.querySelector("#page > div.sw.ovisible > div.container > ol > li:nth-child(2) > a")) { sezioneMMcmsc =document.querySelector("#page > div.sw.ovisible > div.container > ol > li:nth-child(2) > a").innerText.toLowerCase().replace(/ /ig, "");; } }
if (sitoMMcmsc == "ricette-per-bambini_pianetamamma" && sezioneMMcmsc == "ricette-cat") { sezioneMMcmsc = SottoSezioneMMcmsc; }
if (sitoMMcmsc == "ilvicolodellenews" && sezioneMMcmsc == "categoria") { sezioneMMcmsc = SottoSezioneMMcmsc; }
if (sitoMMcmsc == "indici_soldionline" && sezioneMMcmsc == "at.aspx") { sezioneMMcmsc = ""; }
//recupero la sezione attiva se non la trovo nell'url:
if ((sitoMMcmsc == "105" || sitoMMcmsc == "virginradio") && sezioneMMcmsc == "sezioni") { if (document.getElementsByClassName("attivo")[0]) { sezioneMMcmsc = document.getElementsByClassName("attivo")[0].innerText.toLowerCase().replace(/ /ig,"_"); } }
if (sitoMMcmsc == "androidworld" || sitoMMcmsc == "mobileworld" || sitoMMcmsc == "smartworld" || sitoMMcmsc == "newsued" || sitoMMcmsc == "nonsprecare") {
	if (sitoMMcmsc == "nonsprecare" && sezioneMMcmsc == "sezione") { sezioneMMcmsc = SottoSezioneMMcmsc; sezOk = true; }
	if (sezOk==false) {
		if (document.getElementsByClassName("current-menu-item")[0]) {
			sezioneMMcmsc = document.getElementsByClassName("current-menu-item")[0].innerText.toLowerCase().replace(/ /ig,"_");
		}
		else if (document.getElementsByClassName("current-post-parent")[0]) {
			if (document.getElementsByClassName("current-post-parent")[0].getElementsByClassName("current-post-parent")[0]) { sezioneMMcmsc = document.getElementsByClassName("current-post-parent")[0].getElementsByClassName("current-post-parent")[0].innerText.toLowerCase().replace(/ /ig,"_");
			} else {
			sezioneMMcmsc = document.getElementsByClassName("current-post-parent")[0].innerText.toLowerCase().replace(/ /ig,"_");
			}
		} else {
		if (document.querySelector("meta[property='article:section']")) { sezioneMMcmsc = document.querySelector("meta[property='article:section']").getAttribute("content").toLowerCase().replace(/ /ig,"_"); }
		}
	}
}
if (sitoMMcmsc == "casabellaweb" || sitoMMcmsc == "superguidatv") {
	if (document.querySelector("meta[property='article:section']")) { sezioneMMcmsc = document.querySelector("meta[property='article:section']").getAttribute("content").toLowerCase().replace(/ /ig,"_").replace(/\//ig,"_"); }
}
if (sitoMMcmsc == "rockol") {
	if (sezioneMMcmsc.indexOf("news") != -1) { sezioneMMcmsc = "news"; sezOk = true; }
	if (sezioneMMcmsc.indexOf("album") != -1) { sezioneMMcmsc = "album"; sezOk = true; }
	if (sezOk == false) {
		//if (document.querySelector("meta[name='article:section']")) { sezioneMMcmsc = document.querySelector("meta[name='article:section']").getAttribute("content").toLowerCase().replace(/ /ig,"_").replace(/\//ig,"_"); }
		if (document.querySelector("meta[name='type']").getAttribute("content") == "concerti") { sezioneMMcmsc = "concerti"; }
		if (document.querySelector("meta[name='type']").getAttribute("content") == "video") { sezioneMMcmsc = "video"; }
	}
}
//o2o:
if (document.getElementsByClassName("byo2o")[0]) { if (sezioneMMcmsc.indexOf(".html") != -1) { sezioneMMcmsc=document.querySelector("#bnzm_container > div.content.sitewidth > div > div.areaTopArticolo.clearfix > div.breadcrumb > a:nth-child(2)").innerText.toLowerCase().replace(/ /ig,"_"); } }
////////

//controllo se esiste una sezione oppure se l'utente è sulla HP
if (sezioneMMcmsc != "") { sezioneMMcmsc = "_"+sezioneMMcmsc.toLowerCase(); }

//verifico se la sezione è composta da un file (solitamente htm o php) e la setto correttamente come sezione, se necessario (ad es. su mypersonal)
var CercaStringaCmsc = sezioneMMcmsc.indexOf(".htm") || sezioneMMcmsc.indexOf(".php");

//tronco sezioni troppo lunghe
if (sezioneMMcmsc.length > 40) { sezioneMMcmsc="_altre_troncata"; }
//

//compongo la var finale in base alla ricerca qui in alto
if (CercaStringaCmsc == -1) { sezioneMMcmsc = sitoMMcmsc+sezioneMMcmsc; } else { sezioneMMcmsc = sitoMMcmsc+"_altre_troncata"; }
if (sitoPadreMMcmsc != "") { sitoPadreMMcmsc = sitoPadreMMcmsc+ "_"; }
sezioneMMcmsc = sitoPadreMMcmsc+sezioneMMcmsc;