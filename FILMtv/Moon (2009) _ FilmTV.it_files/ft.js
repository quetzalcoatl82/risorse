
if(window.top.location.href.includes("pushdownSwitch=PAMELa")){
parent.is_bnzm_pdown = true;
var GlobalPusTimerStart = new Date().getTime();
console.log('[push] Pamela pushdown initPushDesktop ft desktop');
window.top.postMessage({
  action: "initPushDesktop",
  pushConf: {
    website: "ft",
    type: "desktop",
    pausePrerollOnClose: true,
    adServer: "freewheel"
  }
}, '*');
throw new Error("PAMELa test Stop, non e' un errore, solo un'uscita forzata. DanCan ");
}
parent.is_bnzm_pdown = true;
var GlobalPusTimerStart = new Date().getTime();
console.debug('[push] --> is_bnzm_pdown:'+parent.is_bnzm_pdown);
var Meride; // Variabile che contiene l'oggetto player*
if(document.getElementById("avadv-push-result")===null) {
    document.write('<div id="avadv-push-result"></div>'); // Div che mi serve per iniettare tutto il codice html della pushdown
    console.debug('[push] --> avadv-push-result aggiunto');
}else{
    console.debug('[push] --> avadv-push-result esiste');
}



function Pushdown(opts)
{ this.init(opts); }

Pushdown.prototype = {
  options: {}, // Variabile contenente le opzioni

  /* Configurazione delle opzioni di default di visualizzazione della push */
  getBaseOptions: function()
  {
    var o = {
      PUSHtimerStart: new Date().getTime(),
      playerReadyInterval: null,
      player: null,
      server: null,
      html: '',

      embedAutoplay: 116490, // embed nebbiolina e thumb nera 1 secondo
      embedAdk: 119680,
      bulkNoAdv: 'push_video',
      adkaora_secondary_bulk: '',
      seconda_chiamata_adk: false,

      ptpEmbedPush: 0,
      embedpush: 0,
      embedpushSecondo: 0,

      canale: 'undefined',
      dominio: null,
      posizione: null,
      flyingpush: false,

      ptpAdStart: false,
      pushStatus: 'waiting',
      ad_status: '',
      PushPulseLog: '',
      PushAdStart: false,

      pushVideoPlaying: {}, // Video attualmente in uso
      pushVideoPlayingIndex: 0, // Usato per le push doppie. indice della push in visualizzazione

      video_uno: null, // {}
      video_due: null, // {}

      /**
        * Modalità push:
        * single          : Video singolo, secondo risultato link
        * double          : Due video in switch
        * youtube_single  : Video singolo di preroll + uso di youtube, e secondo risultato link
        * youtube_double  : Due video in preroll + uso di youtube
        * mobile          : Video singolo, da usare sui dispositivi mobile
        **/
      mode: 'single',
      /* ************************************ */

      advertiser: 'ima',
      audio_preroll: 'defaultOff',
      audio_video: 0,
      adv_autoplay: true,
      video_autoplay: true,
      collapse: false,

      eventi_ga: false,

      nielsen: '',
      nielsen_appid: '',
      push_adtracker: 'off',
      mostra_chiudi: false,
      audio_on_over: false,

      timeout: 4000,
      add_purl: true,
      add_krux: true,
      ga_sent: false,
      trakers_added: false,
      device: 'desktop',
      sectionID: '---',
      titlePrefix: '',
      push_vast_params: '',
      datasaver: 0,
      debugging: true,
      logging: true
    };
    return o;
  },

  /* Inizializzo le opzioni e faccio i controlli che tutto il necessario sia presente */
  init: function(opt)
  {
    this.options = Object.assign(this.getBaseOptions(),opt);

    // ***** Controllo se attivare il debug *****
    //var url = new URL(window.location.href);  // Non supportato in IE ed Edge ..........
    //if(url.searchParams.get("ptpdebug") == 'true')
    //  { this.set('debug',true); }
    if(this.getParameterByName('ptpdebug') == 'true')
      { this.set('debugging',true); }
    // ******************************************

    this.sendGA('Pushdown_init');
    this.debug('Pushdown version: 0529 function init() Merging options...')
    this.set('error','');

    /* Controlli per vedere se possiamo iniziare con tutto */
    if( this.checkConfigErrors() === false)
      { return false; }

    /* Opzioni non configurabili dall'utente */
    this.set('stillOpen',true);
    this.set('pushStatus','waiting');
    this.set('dompos',this.get('dominio')+this.get('posizione'))
    this.set('black_bulk_running',false);
    this.set('adkaora_secondary_bulk','');
    this.set('first_time_play',true);

    /* Riempio con le opzioni di default i campi vuoti */
    this.updateOptions();

    this.detectDevice();

    /* Aggiungo il js di meride se già non è presente */
    (function (a,l,t,e,r) {
      a[e] = a[e] || function(s) { (a[e].run = a[e].run || []).push(s)};
      let g,z = l.getElementsByTagName(t)[0];
      if (l.getElementById(e)){return;}
      g = l.createElement(t); g.id = e; g.src = r; g.async = 1;
      z.parentNode.insertBefore(g,z);
    }(window, document, 'script', 'AVPushLoader', "https://ptp.stbm.it/pushdown/loader/av/pushdown-loader.js"));

    AVPushLoader({
      website:  this.get('video_uno').bulk,
      adServer: "freewheel",
      flightEnabled:     false,
      mode: "content",
      videoId: this.get('video_uno').vkey,
      hasAdv: true,
      prerollAutoplay: true,
      contentAutoplay: false,
      targetElementId: "ptp_video_"+this.get('video_uno').vkey
    });
    parent.strip_animation();
    this.sendEvent('BmVideoAdv');
    //this.do();

  },

  /* Funzione con la logica principale */
  start: function()
  {
    if(this.get('error') != '')
      { this.debug(this.get('error')); return false; }

    this.debug('function start() Injecting the HTML...');
    document.getElementById('avadv-push-result').innerHTML = this.get('html'); // Con la document.write non funziona
    this.set('pushVideoPlayingIndex',1);
    this.set('pushVideoPlaying',this.get('video_uno'));
    this.createPlayer();
  },

  createPlayer: function(isVideo)
  {
    this.debug('function createPlayer()');
    if(!this.isSet(isVideo))
      { isVideo = false; }

    this.createMerideContainer(isVideo);
    if (this.isSet(Meride)) {
      this.do();
    }
    //this.waitForMeride();
  },

  do: function()
  {
    this.debug('function do() MODE: '+this.get('mode'));
    this.createMeridePlayer(); // Creo il player Meride
    this.debug('Creato il player Meride');
    this.addListener(); // Aggiungo i Listener sugli eventi
    this.debug('Aggiunto i Listener sugli eventi');
    if(this.get('trakers_added') === false)
    {
      this.addTracker();
      this.set('trakers_added',true);
    }
  },

  /*****************************************************
    * Funzioni per la creazione delle parti del player *
    *****************************************************/
  createMerideContainer: function(isVideo)
  {
    this.debug('function createMerideContainer() Creating the container div...');

    if(!this.isSet(isVideo))
      { isVideo = false; }

    var d = document.createElement('div');
    d.setAttribute('id','ptp_video_'+this.get('pushVideoPlaying').vkey);
    d.setAttribute('class','meride-video-container');
    d.setAttribute('style','width: 445px; height:250px;');
    d.setAttribute('data-embed',this.get('pushVideoPlaying').embed);
    d.setAttribute('data-customer','banzai');
    d.setAttribute('data-nfs','banzai');
    d.setAttribute('data-width','445');
    d.setAttribute('data-responsive','true');
    d.setAttribute('data-height','250');
    if(this.get('posizione')=='ama'){
      d.style.width = "300px";
      d.style.height = "169px";
      d.style.visibility = "visible";
      d.style.margin = "0";
    }
    if (this.get('adkaora_secondary_bulk')!='') {
        d.setAttribute('data-bulk-label',this.get('adkaora_secondary_bulk')+this.get('pushVideoPlaying').bulk);
        this.set('add_purl',false);
        d.setAttribute('data-autoplay',true);
    }else{
        d.setAttribute('data-bulk-label',this.get('pushVideoPlaying').bulk);
        if(isVideo == true) // In caso di bulk nero, durante la ricreazione, metto il valore giusto
          { d.setAttribute('data-autoplay',this.get('pushVideoPlaying').video_autoplay); }
        else
          { d.setAttribute('data-autoplay',this.get('pushVideoPlaying').adv_autoplay); }
    }

    d.setAttribute('data-advolume',this.get('audio_preroll'));
    d.setAttribute('data-volume',this.get('audio_video'));
    if(false==true && this.get('posizione') == 'av')
    {
      var a = document.createElement('div');
      a.setAttribute('class','placeholderFV');
      var b = document.createElement('div');
      b.setAttribute('class','targetFV flyingPush');

      b.appendChild(d);
      a.appendChild(b);
      document.getElementById("playerCont").appendChild(a);
    }
    else
      { document.getElementById("playerCont").appendChild(d); }
  },

  destroyMerideContainer: function()
  {
    this.log('destroyMerideContainer: Pauso e Distruggo il container ');
    this.get('videoElement').pause();
    document.getElementById("playerCont").innerHTML = '';
  },

  createMeridePlayer: function()
  {

    if( this.get('pushInitSent') === false ){
      this.set('pushInitSent',true);
      this.sendEvent('pushInit');
    }
  },

  checkBlackBulk: function(config)
  {
    //this.debug('function checkBlackBulk() Controllo lo stato del video nero');
    if(this.isSet(this.get('pushVideoPlaying').black_bulk) && this.get('pushVideoPlaying').black_bulk == true)
    {
      if(this.get('black_bulk_running') === false)
      {
        this.log('Aggiungo il video nero');
        this.set('black_bulk_running',true);

        /* Modifico il playerCont */
        var d = document.getElementById('ptp_video_'+this.get('pushVideoPlaying').vkey);
        d.setAttribute('data-embed',this.get('embedAutoplay'));
        config.embedID = this.get('embedAutoplay');
        config.analytics = {};
        config.webtrekk = {};
      }
      else
      {
        this.log('Modifico il bulk in bulkNoAdv');
        this.set('black_bulk_running',false);

        /* Modifico il playerCont */
        var d = document.getElementById('ptp_video_'+this.get('pushVideoPlaying').vkey);
        d.setAttribute('data-bulk-label',this.get('bulkNoAdv'));
        d.setAttribute('data-autoplay',this.get('pushVideoPlaying').video_autoplay)
        config.bulkLabel = this.get('bulkNoAdv');
        config.advManager = 'ima';
        config.freewheel = {};
      }
    }

    return config;
  },

  createYoutubePlayer: function()
  {
    /* Valutare opzione di Immagine+Link a YT invece dell'iframe */
    this.log('Creazione del player di YT...');
    document.getElementById('playerCont').innerHTML = '<iframe width="445" height="250" src="https://www.youtube.com/embed/'+this.get('pushVideoPlaying').youtube_id+'" allow="autoplay; encrypted-media" frameborder="0" allowfullscreen></iframe>';
  },

  switchVideo: function(videoIndex)
  {
    videoIndex = videoIndex+1;
    if(videoIndex == this.get('pushVideoPlayingIndex'))
      { return false; }

    this.set('black_bulk_running',false);
    this.get('pushVideoPlaying').black_bulk=false;
    if(this.get('pushVideoPlayingIndex') == 1)
    {
      document.getElementById('ptp_video_due').setAttribute('class','on');
      document.getElementById('ptp_video_uno').setAttribute('class','off');
      this.set('pushVideoPlayingIndex',2);
      this.set('pushVideoPlaying',this.get('video_due'));
    }
    else
    {
      document.getElementById('ptp_video_uno').setAttribute('class','on');
      document.getElementById('ptp_video_due').setAttribute('class','off');
      this.set('pushVideoPlayingIndex',1);
      this.set('pushVideoPlaying',this.get('video_uno'));
    }

    this.destroyMerideContainer();
    this.get('pushVideoPlaying').bulk=this.get('pushVideoPlaying').bulk+'_v2';
    this.get('pushVideoPlaying').video_autoplay=false;
    this.createPlayer();
  },

  /******************************************
    * Funzioni per la gestione degli eventi *
    ******************************************/
  addListener: function()
  {
    // Evento sul click della X nella FlyingPush
    window.parent.addEventListener('pushGoHome', this.closeFlyingPush.bind(this), true);

    var interval = this.getInterval();
    this.log('onReady complete ('+interval+'ms)');
    this.set('PushPulseLog', this.get('PushPulseLog') + '&PTP='+interval);
  },

  /*********************************************
    *     EVENTI DELLA MODALITA' STANDARD      *
    *********************************************/
  onReady: function(evnt)
  {
    var interval = this.getInterval();
    this.log('READY event ('+interval+'ms) ');
    if(this.get('pushVideoPlaying').black_bulk == false || this.get('black_bulk_running') == true  ){
      this.sendGA('Preroll_init');
    }
    this.set('videoTag',document.getElementById('ptp_video_'+this.get('pushVideoPlaying').vkey).querySelector('.meride-video-container video'));
		this.set('videoElement',evnt.detail.player);
    //this.set('pushStatus','READY');
    if(this.isSet(this.get('videoElement')))
      { /* this.deactivateVideoElementSound(); */ } // Commentato perchè non ha senso mettere il muto sul ready (online attualmente è così)
    else
      { this.debug('videoElement not found.'); }

    if(this.get('black_bulk_running') === true)
    {
      var s = document.querySelector("span.duration");
      if(s != null)
      {
        s.setAttribute('style','display: none;');
        this.debug('Elimino la duration del video nero');
      }
    }

		this.set('PushPulseLog', this.get('PushPulseLog') + '&READY='+interval);
    this.addNewStyle('.ptpHidden {display:none !important;}');
    if(this.get('audio_on_over') )
    {
      this.debug('Aggiungo listener per eventi over/out');
      document.getElementById('ptp_video_'+this.get('pushVideoPlaying').vkey).addEventListener('mouseover', this.onMouseOver.bind(this), true);
      document.getElementById('ptp_video_'+this.get('pushVideoPlaying').vkey).addEventListener('mouseout', this.onMouseOut.bind(this), true);
    }
  },

  onLoadmetadata: function(evnt)
  {
    var interval = this.getInterval();
    this.log('LOADMETADATA event ('+interval+'ms) ');
    this.set('PushPulseLog', this.get('PushPulseLog') + '&LOADEDMETADATA='+interval);

    if(this.get('pushStatus') == 'waiting')
    {
      //this.set('pushStatus','LOADEDMETADATA');
      if(this.get('pushVideoPlaying').audio_video == 0)
      {
        this.deactivateVideoElementSound();
      }
    }
  },

  onAdsManagerReady: function(evnt)
  {
    var interval = this.getInterval();
    this.log('ADS_MANAGER_READY event ('+interval+'ms) ');
    this.set('PushPulseLog', this.get('PushPulseLog') + '&ADS_MANAGER_READY='+interval);
    this.set('adsManagerAudio',evnt.detail.adsManager);
    //this.set('pushStatus','ADS_MANAGER_READY')
    /*if(this.get('pushVideoPlaying').audio_preroll == 'defaultOff')
    {
      this.deactivateAdsManagerSound();
      this.debug('ADS_MANAGER_READY setVolume 0 '+interval+ 'ms');
    }
    else
    {
      this.activateAdsManagerSound();
      this.debug('ADS_MANAGER_READY setVolume 1 '+interval+ 'ms');
    }

    if(this.get('audio_on_over'))
    {
      this.debug('Aggiungo listener per eventi over/out');
      document.getElementById('ptp_video_'+this.get('pushVideoPlaying').vkey).addEventListener('mouseover', this.onMouseOver.bind(this), true);
      document.getElementById('ptp_video_'+this.get('pushVideoPlaying').vkey).addEventListener('mouseout', this.onMouseOut.bind(this), true);
    }
    */
  },

  onAdStarted: function(evnt)
  {
    var interval = this.getInterval();
    var stampaadstart='';
    if(this.get('advertiser')=='freewheel'){
      stampaadstart=this.get('sectionID')+"_"+this.get('device')+"_pushdown";
    }else{
      stampaadstart=evnt.detail.tag;
    }
    this.log('%cAD_STARTED event ('+interval+'ms) ' + this.get('pushVideoPlaying').bulk + ' - ' + stampaadstart ,'background:gold;color:black;' );
/*
    if(this.get('pushVideoPlaying').audio_preroll == 'defaultOff')
      { this.deactivateAdsManagerSound(); }
    else
      { this.activateAdsManagerSound(); }
*/
    this.set('pushStatus','AD_STARTED');
    if(this.get('ad_status')=='ad_started'){
        this.set('ad_status','ad_double');
    }{
        this.set('ad_status','ad_started');
    }

    this.sendGA('Preroll_start');
    this.sendEvent('BmVideoAdv');

    /*
    if(this.get('advertiser') == 'freewheel' && false==true )
    {
        var btns = document.querySelectorAll('.meride-video-container .boxcenterBtn');
        btns.forEach(function (entry) {
          if (!entry.classList.contains('ptpHidden')) {
            entry.classList.add('ptpHidden');
          }
        });
        var controlBar = document.querySelectorAll('.meride-video-container .otherComponents');
        controlBar.forEach(function (entry) {
          entry.classList.add('ptpHidden');
        });
        this.debug('added ptpHidden');
    }
    */

    if(this.get('push_adtracker') =='on')
    {
      if(this.get('PushAdStart') === false  && interval <= 60000)
      {
        this.set('PushPulseLog', this.get('PushPulseLog') + '&AD_STARTED='+interval);
        var imgPulse = document.createElement("img");
        imgPulse.src='https://ptps.stbm.it/pulse/pulse-adstart.gif?FD='+this.get('pushVideoPlaying').vkey+'-'+this.get('dompos')+'&log=pushjs&type='+this.get('advertiser')+'&autoplay='+this.get('pushVideoPlaying').video_autoplay+'&'+this.get('PushPulseLog');
        imgPulse.style.display = 'hidden';
        document.getElementById('playerCont').appendChild(imgPulse);
        this.set('PushAdStart',true);
      }
    }

    if (this.get('stillOpen') === true)
    {
      this.set('stillOpen',false);
      this.firstPlayerStart(evnt);
    }
  },

  onAdEnded: function(evnt)
  {
    var interval = this.getInterval();
    this.log('AD_ENDED event ('+interval+'ms)');


    if(this.get('adkaora_secondary_bulk') != ''){
      this.set('adkaora_secondary_bulk','');
    }

    this.set('pushStatus','AD_ENDED');

    if(this.isSet(this.get('adsManager')))
    {
      if(this.get('adsManager').getVolume()==0 && this.get('pushVideoPlaying').audio_preroll != 'defaultOff')
      {
        if(this.isSet(this.get('videoElement')))
          { this.deactivateVideoElementSound(); }
      }
    }
    else
      { this.log('adsManager not defined'); }

    if(this.get('black_bulk_running') === true)
    {
      /* anche nel caso di 2preroll, evento inviato alla fine di tutti i preroll */
      this.destroyMerideContainer();
      this.log('ricreo il player con il video');
      //this.set('black_bulk_running',false);
      this.createPlayer(true);
      return false;
    }

    /*
    if(this.get('advertiser') == 'freewheel' && false==true)
    {
      var btns = document.querySelectorAll('.meride-video-container .boxcenterBtn');
      btns.forEach(function (entry) {
        if (entry.classList.contains('ptpHidden')) {
          entry.classList.remove('ptpHidden');
        }
      });
      var controlBar = document.querySelectorAll('.meride-video-container .otherComponents');
      controlBar.forEach(function (entry) {
        entry.classList.remove('ptpHidden');
      });
      this.debug('removed ptpHidden');
    }
    */
  },

  onAdError: function(evnt)
  {
    var interval = this.getInterval();
    if(evnt.detail.message=='Freewheel reseller_no_ad'){
      this.log('reseller_no_ad event ('+interval+'ms) ' );
      return;
    }
    this.log('%cAD_ERROR event ('+interval+'ms) - Error Code: ' + evnt.detail.errorCode + ' - Error Message: ' + evnt.detail.message, 'background:Red;' );
    this.set('pushStatus','AD_ERROR');
    if( this.get('adkaora_secondary_bulk')=='' && this.get('seconda_chiamata_adk') )
    {
      this.destroyMerideContainer();
      this.set('adkaora_secondary_bulk','adk_');
      this.log('ricreo il player con adkaora');
      this.createPlayer(true);
      return false;
    }else{
        if (this.get('stillOpen') === true)
        {
          this.set('stillOpen',false);
          this.firstPlayerStart();
        }
        if(this.get('mostra_chiudi') === true)
        {
          document.getElementById("close_btn_dc").style.display="block";
        }
    }

    this.sendGA('Preroll_error');

    if(this.get('collapse') === true)
      { document.getElementById('avadv-push-result').innerHTML=''; }

    this.set('ad_status','ad_error');
    this.set('isUserWatching',false);
    this.sendEvent('NoBmVideoAdv');
    if(this.get('black_bulk_running') === true)
    {
      this.destroyMerideContainer();
      this.log('ricreo il player con il video');
      this.set('adkaora_secondary_bulk','');
      //this.set('black_bulk_running',false);
      this.createPlayer(true);
      return false;
    }

  },

  onPlay: function(evnt)
  {
    var interval = this.getInterval();
    this.log('%cPLAY event ('+interval+'ms) ['+ this.get('pushStatus') + ']  ' +this.get('pushVideoPlaying').embed+ ' on ' +this.get('pushVideoPlaying').bulk+' : '+this.get('pushVideoPlaying').vkey,'background:LightGreen;color:black;');
    //this.set('PushAdStart',true);
    if(this.get('pushStatus') == 'AD_ENDED' || this.get('pushStatus') == 'AD_ERROR')
    {
        this.sendEvent('BmVideoPlay');
        this.set('pushStatus','PLAY');
    }


    // rimosso 17-07-2018
    // if(this.get('first_time_play') === true && this.get('pushVideoPlaying').video_autoplay === false && this.get('pushVideoPlaying').black_bulk==false)
    // {
    //   this.log('Stopping the video');
    //   this.get('videoElement').pause();
    //   var bi = document.getElementById('ptp_video_'+this.get('pushVideoPlaying').vkey).querySelectorAll("div:not([class])")[1];
    //   bi.style.display='block';
    //   bi.style.visibility='visible';
    // }
    //
    // if( this.get('isUserWatching') === false  && this.get('pushVideoPlaying').video_autoplay && true==false ){
    //   this.set('isUserWatching',true);
    //   var that=this;
    //   setTimeout(
    //       function() {
    //         if(typeof   that.get('videoElement') != "undefined"){
    //           that.get('videoElement').pause();
    //           var interval = that.getInterval();
    //           that.log('paused video not watched ('+interval+'ms)');
    //         }
    //       },
    //       3000
    //   );
    //   this.log('setTimeout the video');
    // }
    this.set('first_time_play',false);
  },

  onPause: function(evnt)
  {
    var interval = this.getInterval();
    this.log('PAUSE event ('+interval+'ms) ' );
  },


  onVideoEnded: function(evnt)
  {
    var interval = this.getInterval();
    this.log('ENDED event ('+interval+'ms) ' );
    if(this.get('black_bulk_running') === true)
    {
        this.destroyMerideContainer();
        this.log('ricreo il player con il video');
        //this.set('black_bulk_running',false);
        this.createPlayer(true);
        return false;
    }
  },


  onAdEmpty: function(evnt)
  {
    var interval = this.getInterval();
    this.log('%cAD_EMPTY event ('+interval+'ms) ', 'background:Red;' );
  },
  /*********************************************
    ********************************************
    *********************************************/


  /*********************************************
    *      EVENTI DELLA MODALITA' YOUTUBE      *
    *********************************************/
  onAdEndedYoutube: function(evnt)
  {
    var interval = this.getInterval();
    this.log('AD_ENDED event ('+interval+'ms)');

    this.destroyMerideContainer();
    this.createYoutubePlayer();
  },

  onAdErrorYoutube: function(evnt)
  {
    var interval = this.getInterval();
    this.log('%cAD_ERROR event ('+interval+'ms) - Error Code: ' + evnt.detail.errorCode + ' - Error Message: ' + evnt.detail.message, 'background:LightRed;');

    this.destroyMerideContainer();
    this.createYoutubePlayer();
  },

  /*********************************************
    ********************************************
    *********************************************/



  onMouseOver: function(evnt)
  {
    //this.debug('onMouseOver');
    var that = this;
    this.set('audio_on_over',true);
    setTimeout(
      function(){
        if(that.get('audio_on_over') ){
          {
            that.activateAdsManagerSound();
            that.activateVideoElementSound();
            that.debug('MouseOver -> volume on');
          }
        }
      }
    , 1000 );
  },

  onMouseOut: function()
  {
    this.set('audio_on_over',false);
    //this.deactivateAdsManagerSound();
    //this.deactivateVideoElementSound();
    //this.debug('MouseOut -> volume off');
  },

  /**************
    * Utilities *
    **************/

  activateVideoElementSound: function()
  {
    var interval = this.getInterval();
    if(this.isSet(this.get('videoElement')))
    {
      this.get('videoElement').muted=false;
      this.get('videoElement').volume=0.3;
      this.debug('VideoElement de-muted ('+interval+ 'ms)');
    }
    else
      { this.debug('videoElement is not defined'); }
  },

  activateAdsManagerSound: function()
  {
    var interval = this.getInterval();
    if(this.isSet(this.get('adsManagerAudio')))
    {
      //this.get('adsManager').muted=false;
      this.get('adsManagerAudio').setVolume(0.3);
      this.debug('adsManagerAudio de-muted ('+interval+ 'ms)');
    }
    else
      { this.debug('adsManagerAudio is not defined'); }
  },

  activateVideoTagSound: function()
  {
    var interval = this.getInterval();
    if(this.isSet(this.get('videoTag')))
    {
      this.get('videoTag').muted=false;
      this.get('videoTag').volume=0.3;
      this.debug('videoTag de-muted ('+interval+ 'ms)');
    }
    else
      { this.debug('videoTag is not defined'); }
  },

  deactivateVideoElementSound: function()
  {
    var interval = this.getInterval();
    if(this.isSet(this.get('videoElement')))
    {
      this.get('videoElement').muted=true;
      this.get('videoElement').volume=0;
      this.debug('VideoElement muted ('+interval+ 'ms)');
    }
    else
      { this.debug('videoElement is not defined'); }
  },

  deactivateAdsManagerSound: function()
  {
    var interval = this.getInterval();
    if(this.isSet(this.get('adsManager')))
    {
      //this.get('adsManager').muted=true;
      this.get('adsManager').setVolume(0);
      this.debug('adsManager muted ('+interval+ 'ms)');
    }
    else
      { this.debug('adsManager is not defined'); }
  },

  deactivateVideoTagSound: function()
  {
    var interval = this.getInterval();
    if(this.isSet(this.get('videoTag')))
    {
      this.get('videoTag').muted=true;
      this.get('videoTag').volume=0;
      this.debug('videoTag muted ('+interval+ 'ms)');
    }
    else
      { this.debug('videoTag is not defined'); }
  },

  detectDevice: function()
  {
    this.debug('Device detecting...');
    this.set('device','desktop');
    if( navigator.userAgent.indexOf('iPhone') != -1 )
      { this.set('device','mobile_web_iphone'); }
    else if( navigator.userAgent.indexOf('iPad') != -1 )
      { this.set('device','mobile_web_ipad'); }
    else if( navigator.userAgent.indexOf('GT-P') != -1 || navigator.userAgent.indexOf('SM-T') != -1  )
      { this.set('device','mobile_web_android_tablet'); }
    else if( navigator.userAgent.indexOf('Android') != -1 )
      { this.set('device','mobile_web_android_phone'); }

    if(this.get('device')!='desktop'){
        if(this.get('datasaver') == 0) {
          this.set('datasaver',-1);
          this.checkDataSaver();
        }
        if(this.get('datasaver') == -1) {
          this.sendGA('Pushdown_datasaver');
          this.sendEvent('BmDataSaver');
        }else{
        //  this.set('black_bulk',true) ;
        }
    }
  },


  checkDataSaver: function()
  {
    var req = new XMLHttpRequest();
    req.open('GET', 'https://ptps.stbm.it/adv/test/datasaver.php?live=1', false);
    req.send(null);
    if (req.status == 200)
    {
      if(req.responseText == 'false')
      {
          this.set('datasaver',1);
          this.debug('Data-Saver -> off');
      } else
      {
        this.debug('Data-Saver -> on');
      }
    }
  },

  /* Funzione che aspetta che l'oggetto Meride sia pronto */
  waitForMeride: function()
  {
    var interval = this.getInterval();
    this.debug('Wait For Meride... ('+interval+'ms)');
  	if (this.isSet(Meride))
    {
  			Meride.preventOnDOMLoaded = true;
  			this.do();
  	}
    else
    {
      playerReadyInterval = setInterval(
        function()
        {
          if (this.isSet(Meride))
          {
            clearInterval(playerReadyInterval);
						Meride.preventOnDOMLoaded = true;
	          this.do();
	        }
		    },
		    100
			);
  	}
  },

  getKrux: function()
  {
    var krux='';
    if (!( typeof parent.Krux === "undefined")  && !( typeof parent.Krux.user === "undefined") )
    {
        krux=krux + encodeURIComponent('&kuid='+parent.Krux.user);
        this.debug('Aggiunto user Krux.');
    }
    if (!( typeof parent.Krux === "undefined")  && !( typeof parent.Krux.segments === "undefined") )
    {
        krux=krux + encodeURIComponent('&ksg='+parent.Krux.segments.join(','));
        this.debug('Aggiunto segments Krux.');
    }
    return krux;
  },

  getAltervistaName: function()
  {
    var h = window.location.hostname;
    var p = window.location.pathname;
    var n = h.split('.')[0];
    if(n == 'blog' || n == 'www')
      { n = p.split('/')[1]; }
    return n;
  },

  closeFlyingPush: function(evnt)
  {
    //this.deactivateAdsManagerSound(); // NON necessario
    //this.deactivateVideoElementSound(); // NON necessario
    //this.deactivateVideoTagSound(); // NON necessario
    this.get('pushVideoPlaying').video_autoplay=false;
    if(this.isSet(this.get('videoElement')) && this.get('pushStatus') == 'PLAY' )
    {
        this.get('videoElement').pause();
        this.debug('Metto in pausa il video di contenuto');
    }

  },

  addStopAltervista: function(evnt)
  {
    this.get('pushVideoPlaying').video_autoplay = false; // Se clicco la x PRIMA che sia finito l'adv
    this.get('videoElement').pause(); // Se clicco la x DOPO la fine dell'adv
    this.debug('Metto in stop il video');
  },

  checkCloseAltervista: function()
  {
    if(this.get('posizione') == 'av')
    {
      var x;
      var list = document.getElementById('ptp_video_'+this.get('pushVideoPlaying').vkey).parentNode.querySelectorAll('a');
      for(var i=0; i<list.length; ++i)
      {
        if(list[i].className.indexOf('goHome') != -1)
          { x=list[i]; }
      }
      if(x)
      {
        x.addEventListener('click',this.addStopAltervista.bind(this));
        this.set('isUserWatching',false);
        this.debug('Aggiungo stop() sul chiudi (av)');
      }
      else
        { this.debug('Tasto chiudi non trovato (av)'); }
    }
  },

  /* LOGGER */
  debug: function(msg)
  {
    if(this.get('debugging') == true)
      { console.debug('[push] --> '+msg); }
  },

  log: function(msg)
  {
    if(this.get('logging') == true)
      { console.log('[push] --> '+msg); }
  },

  log: function(msg,color)
  {
    if(this.get('logging') == true)
      {
        if(typeof color !== 'undefined'){
          console.log('[push] --> '+msg,color);
        }else{
          console.log('[push] --> '+msg);
        }
      }
  },

  /* Ritorna il tempo passato dall'inizio dello script al momento attuale (in millisecondi) */
  getInterval: function()
  {
    return (new Date().getTime() - this.get('PUSHtimerStart'));
  },

  /* Controlla se le opzioni obbligatorie sono vuote e nel caso le riempie con i valori di default */
  updateOptions: function ()
  {
    if(!this.isSet(this.get('video_uno').audio_video))
      { this.get('video_uno').audio_video = this.get('audio_video'); }
    if(!this.isSet(this.get('video_due').audio_video))
      { this.get('video_due').audio_video = this.get('audio_video'); }

    if(!this.isSet(this.get('video_uno').audio_preroll))
      { this.get('video_uno').audio_preroll = this.get('audio_preroll'); }
    if(!this.isSet(this.get('video_due').audio_preroll))
      { this.get('video_due').audio_preroll = this.get('audio_preroll'); }
  },

  isSet: function(o)
  {
    if(typeof o == 'undefined')
      { return false; }
    return true;
  },

  checkConfigErrors: function()
  {
    if(this.get('server') == null)
      { this.set('error','ERRORE: nessun server specificato. Esco dalla Push'); return false; }
    if(this.get('dominio') == null)
      { this.set('error','ERRORE: nessun dominio specificato. Esco dalla Push'); return false; }
    if(this.get('posizione') == null)
      { this.set('error','ERRORE: nessuna posizione specificata. Esco dalla Push'); return false; }
    if(this.get('html') == '')
      { this.set('error','ERRORE: html vuoto. Esco dalla Push'); return false; }
    if(this.get('video_uno') == null)
      { this.set('error','ERRORE: video_uno deve essere valorizzato'); return false; }
    if(!this.inArray(this.get('mode'),['single','double','youtube_single','youtube_double','mobile']))
      { this.set('error','ERRORE: mode sconosciuta'); return false; }

    return true;
  },

  inArray: function(needle, haystack)
  {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
  },

  sendGA: function(type) // issue:VID-263;
  {
    if(this.get('eventi_ga') === true)
    {
      if(typeof parent.ga != 'undefined')
      {
        /* Distinguo Desktop o Mobile */
        var d='desk';
        if(this.get('mode') == 'mobile')
          { d='mobile'; }

        var valueGAN = 1;
        if(typeof parent.startPageTimes == 'undefined')
        {
          var interval = this.getInterval();
          var valueGA = Math.round(interval/1000);
        }
        else
        {
          var interval = new Date().getTime() - parent.startPageTimes.dateNow;
          var valueGAN = Math.round(interval/1000);
          valueGA = 'diff: '+valueGAN;
        }
        /* Invio evento */
        this.log('%cInvio evento GA '+type+' - '+d+' valore:'+valueGA,'background:#6B8395;color:black;');
        var trackerName = parent.ga.getAll()[0].get('name');
        if(valueGAN>60){
          this.log('Evento GA troppo tardi type:'+type+' valore:'+valueGAN);
        }else{
          parent.ga(trackerName+'.send', 'event', 'Pushdown_'+d, type, valueGA, valueGAN, { nonInteraction: true });
          this.log('%cInviato evento GA type:'+type+' valore:'+valueGA,'background:#789C4C;');
        }
      }else{
        this.log('%cGA non trovato','background:purple;');
      }
    }
  },

  sendEvent: function(EventName)
  {
    var interval = this.getInterval();
    if (document.createEvent)
    {
       this.log('CreateEvent '+EventName+' ('+interval+ 'ms)');
       var event = document.createEvent('Event');
       event.initEvent(EventName, true, false);
       var eventchild = document.createEvent('Event');
       eventchild.initEvent('child_'+EventName, true, false);
     }
     else
     {
       this.log('Event '+EventName+' ('+interval+ 'ms)');
       var event = new Event(EventName);
       var eventchild = new Event('child_'+EventName);
     }
     document.dispatchEvent(event);
     window.parent.document.dispatchEvent(eventchild);
  },

  firstPlayerStart: function(evnt)
  {
  		var interval = this.getInterval();
  		this.debug('firstPlayerStart() ('+interval+ 'ms)');

      var timeout = 4000;
      if(this.isSet('timeout') )
        { timeout = this.get('timeout'); }

      var that = this; // Hack per usare this dentro al setTimeout
      setTimeout(
          // conto 2.5s
          function()
          {
  						that.sendEvent('BmVideoView');
  						if(that.get('mostra_chiudi') === true)
                { document.getElementById("close_btn_dc").style.display="block"; }

              if(that.get('flyingpush') ){
                   that.debug('fliyng push');
              }else if(that.get('posizione') == 'av'){
                   that.debug('solo altervista check chiudi');
                   setTimeout( that.checkCloseAltervista.bind(that) , 1000 );
              }else{
                // questa parte non e' per altervista perche' altervista non eroga la push tramite DFP
                if(!that.isSet(parent.jQuery)) { that.debug('jQuery assente'); return; }

                // se l'utente ha scrollato oltre l'altezza della strip
                that.log('utente ha scrollato oltre l\'altezza della strip?');
                that.log('body ' + parent.jQuery('body').scrollTop() + ' doc '+ parent.document.documentElement.scrollTop + ' - strip ' + parent.jQuery('#strip_adv').height());

                if (parent.document.documentElement.scrollTop > parent.jQuery('#strip_adv').height() || parent.jQuery('body').scrollTop() > parent.jQuery('#strip_adv').height())
                {
                  that.log('%c[push] -------> SI ha scrollato!','background:yellow');
                  parent.jQuery('body').removeClass('pushing').addClass('hiding');
                  that.debug('remove pushing add hiding');
                  that.set('isUserWatching',false);
                  setTimeout(
                      // delay per l'animazione
                      function() {
                          parent.jQuery('body').removeClass('hiding');
                          parent.jQuery('.static-container').height( '' );
                          parent.jQuery('.flying-container').height( '' );
                          parent.isPushing = false;
                          that.debug('remove hiding');

                          if(that.get('pushStatus') == 'AD_STARTED')
                          {
                            if(that.isSet(that.get('videoElement'))) { that.get('videoElement').muted = true; }
                            if(that.isSet(that.get('adsManager'))) { that.get('adsManager').setVolume(0); }
                            that.debug('setAdvVolume 0');
                          }
                          if(that.get('pushStatus')=='PLAY')
                          {
                            if(typeof that.get('videoElement') != 'undefined' )
                            {
                              that.get('videoElement').muted = true;
                              that.debug('videoElement muted');
                              if(that.get('pushVideoPlaying').video_autoplay == true) {
                                that.get('videoElement').pause();
                                that.debug('videoElement paused');
                              }

                            }
                          }
                      },
                      300
                  );
              }
              else
              {
                  that.log('%c[push] -------> non ha scrollato...','background:red');
                  parent.jQuery('body').removeClass('pushing');
                  parent.jQuery('.flying-container').height( '' );
                  parent.jQuery('.static-container').height( '' );
                  parent.isPushing = false;
  								var interval = that.getInterval();
                  that.log('remove pushing ('+interval+ 'ms)');
              }
  					}
          },
          timeout
      );
  },

  getParameterByName: function(name)
  {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  },

  addTracker: function()
  {
    return;
    if(this.get('posizione') != 'am' && this.get('server').indexOf('https') == -1)
    {
      this.debug('Starting Trakers Tank');
      var useSSL = "https:" == document.location.protocol
      if ( typeof imgserverPTP === "undefined" && !useSSL )
      {
          imgserverPTP = 'http://'+this.get('server');
          referrePTP  = this.get('pushVideoPlaying').vkey+this.get('dompos');
          vkeyPTP = this.get('pushVideoPlaying').vkey+this.get('dompos');
          typePTP = 'ply';

          var aTrackers = ['/v/js/advert.js?v=140318','/v/js/wr.js?v=140318','/v/js/t2.js?v=140318'];
          aTrackers.forEach(function (t) {
            var a = document.createElement('script');
            a.setAttribute('src',imgserverPTP+t);
            document.getElementById('avadv-push-result').appendChild(a);
          });

          this.log('Trakers Tank added');
      }
      else
        { this('Skipping Trackers'); }
    }
  },

  /* SETTER */
  set: function(name,value)
  {
    this.options[name] = value;
  },

  /* GETTER */
  get: function(name)
  {
    return this.options[name];
  },

  addNewStyle: function(newStyle) {
     var styleElement = document.getElementById('styles_js');
     if (!styleElement) {
         styleElement = document.createElement('style');
         styleElement.type = 'text/css';
         styleElement.id = 'styles_js';
         document.getElementsByTagName('head')[0].appendChild(styleElement);
     }
     styleElement.appendChild(document.createTextNode(newStyle));
  },



   convertLetterToNumber: function(str,start) {
    //console.log(str);
    var len = str.length;
    for (pos = 0; pos < len; pos++) {
      start += (str.charCodeAt(pos) - 64);
    }
    return start;
  },

  addPtpKrux: function(item){
    console.log(item);
  }
}

/* controllare se questa funzione va lasciata */
function pushClose()
{
	if(parent.document.getElementById( "strip_adv" ) )
    { parent.document.getElementById("strip_adv").style.height=0; }
	document.getElementById("jq-pushdown-div").style.display="none";
	document.getElementById("jq-pushdown-div").innerHTML='';
}

/* Hack per IE che non supporta Object.assign */
if (!Object.assign)
{
  Object.defineProperty(Object, 'assign', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(target, firstSource) {
      'use strict';
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert first argument to object');
      }

      var to = Object(target);
      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) {
          continue;
        }
        nextSource = Object(nextSource);

        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
      return to;
    }
  });
}

var imgserverPTP, referrePTP, vkeyPTP, typePTP;

console.log('[push] start! filmtv 20 ftpv code off');

var P = new Pushdown(
  {
    /* obbligatori */
    html: '<link href="//fonts.googleapis.com/css?family=Lato:400,700|Roboto+Slab:400,700" rel="stylesheet" type="text/css"><link rel="stylesheet" type="text/css" media="all" href="//ptp.stbm.it/pushdown/v/css/push-v-4-0.css?v=20181002"><div class="pushdown-body" id="jq-pushdown-div">	<div id="pushptp_m7qy8o" >		<!--// video -->				<div id="playerCont" class="video" ></div>			</div>	<!--	// cont correlati -->	<div class="more">									<a class="logo" href="http://www.filmtv.it/trailer/" title="I video di oggi"  target="_blank" >I video di oggi</a>				<a class="vt" href="http://www.filmtv.it/trailer/" title="Vedi tutti" style="color: #fff"  target="_blank" >Vedi tutti</a>							<ul  >			<li data-count="1" id="ptp_video_uno" >				<a class="img160"  href="http://lab.banzaimedia.it/track/index1.php?id=11b0c30a7e12f02-798/-/click_push_20190326_m7qy8o_ft/-/https://www.filmtv.it/film/162301/instant-family/"  title="Instant Family - Trailer ufficiale italiano"   target="_blank" ><img src="//ptp.stbm.it/t/m7qy8o_160x90.jpg" /></a>				<a class="tit"  href="http://lab.banzaimedia.it/track/index1.php?id=11b0c30a7e12f02-798/-/click_push_20190326_m7qy8o_ft/-/https://www.filmtv.it/film/162301/instant-family/"  title="Instant Family - Trailer ufficiale italiano"   target="_blank" >Instant Family - Trailer ufficiale italiano</a>				<a class="cat"  href="http://lab.banzaimedia.it/track/index1.php?id=11b0c30a7e12f02-798/-/click_push_20190326_m7qy8o_ft/-/https://www.filmtv.it/film/162301/instant-family/"  title="Instant Family - Trailer ufficiale italiano"   target="_blank" >Trailer</a>			</li>			<li data-count="2" id="ptp_video_due" class="off">				<a class="img160"  href="http://lab.banzaimedia.it/track/index1.php?id=11b0c30a7e12f02-798/-/click_push_20190326_732pvw_ft/-/https://www.filmtv.it/film/163613/detective-per-caso/"  title="Detective per caso - Trailer ufficiale"   target="_blank" ><img src="//ptp.stbm.it/t/732pvw_160x90.jpg" /></a>				<a class="tit"  href="http://lab.banzaimedia.it/track/index1.php?id=11b0c30a7e12f02-798/-/click_push_20190326_732pvw_ft/-/https://www.filmtv.it/film/163613/detective-per-caso/"  title="Detective per caso - Trailer ufficiale"   target="_blank" >Detective per caso - Trailer ufficiale</a>				<a class="cat"  href="http://lab.banzaimedia.it/track/index1.php?id=11b0c30a7e12f02-798/-/click_push_20190326_732pvw_ft/-/https://www.filmtv.it/film/163613/detective-per-caso/"  title="Detective per caso - Trailer ufficiale"   target="_blank" >Trailer</a>			</li>		</ul>	</div><!-- 	// chiusura --></div>',
    server: 'ptp.stbm.it',
    dominio: 'ft',
    posizione: 'pv',
    ad_status: 'init',
    isUserWatching: true,
    pushInitSent: false,
    PUSHtimerStart: GlobalPusTimerStart,
    advertiser: 'ima',

    video_uno: {
      vkey: 'm7qy8o',
      titolo: 'Instant Family - Trailer ufficiale italiano',
      embed: '130860',
      adv_autoplay: true,
      video_autoplay: false,
      black_bulk: true,
      youtube_id: '',
      audio_preroll: 'defaultOff',
      audio_video: 0, // 0, 1
      bulk: 'ftpv',
      webtrekk_mg: 'mg8=mondadori;mg15=http://ptp.stbm.it/t/m7qy8o_mid.jpg',
      webtrekk_title: 'mondadori-filmtv-m7qy8o-instant-family-trailer-ufficiale-italiano',
      nielsen_title: 'push_filmtv_m7qy8o'
    },
    video_due: {
      vkey: '732pvw',
      titolo: 'Detective per caso - Trailer ufficiale',
      embed: '130320',
      adv_autoplay: false,
      video_autoplay: false,
      black_bulk: false,
      youtube_id: '',
      bulk: 'ftpv',
      webtrekk_mg: 'mg8=mondadori;mg15=http://ptp.stbm.it/t/732pvw_mid.jpg',
      webtrekk_title: 'mondadori-filmtv-732pvw-detective-per-caso-trailer-ufficiale',
      nielsen_title: 'filmtv_732pvw'
    },

    /* facoltativi */
        nielsen: 'b14',
    nielsen_appid: 'P725DC9E9-A85E-4AD1-9ABB-C90E0C13319A',
    
      advertiser: 'freewheel',
    push_adtracker: 'off',
    sectionID: 'filmtv_video',
                  flyingpush: true,
            seconda_chiamata_adk : false,
    mode: 'single',
    canale: '',
    titlePrefix: '[PUSH]',

    mostra_chiudi: false,
    google:   'on',
    audio_on_over: false,
    bulkNoAdv: 'ftpv_video',
    add_purl: true  }
);

P.start();
/*
document.onreadystatechange = function () {
  if (document.readyState === 'complete')
    { P.start(); }
};
*/
