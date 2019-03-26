
/*PUSHUP
strip_animation: gestisce il comportamento delle strip
*/

var sw                  = document.documentElement.clientWidth,
    isTouch             = "ontouchstart"in window||navigator.msMaxTouchPoints>0,
    device              = sw>950&&!isTouch?"desktop":950>sw&&sw>670||sw>950&&isTouch?"tablet":"smartphone",
    isPushing           = false,
    is_bnzm_pdown       = false,
    load_pdown_desktop  = false;

var pdown_desktop_data;

var topStrip,
    isAnimationAllowed = true;
/* PUSHUP */

function strip_animation() {
    if(isAnimationAllowed){
        topStrip = new topStrip();
        topStrip.init();
    }
}

function topStrip() {
    me = this;

    me.init = function() {
        if (device == 'desktop') {
            if(!is_bnzm_pdown) {
                $("#strip_adv").removeClass("advCollapse");
                me.staticContainer = $('.static-container');
                me.flyingContainer = $('.flying-container');
                me.body = $('body');
                me.stripAdv = $('#strip_adv');

                // assegno l'altezza del blocco strip+header ai due contenitori in modo che allo scroll le parti di pagina che non devono scrollare schizzino verso l'altro
                me.staticContainer.height(me.flyingContainer.height());
                me.flyingContainer.height(me.staticContainer.height());
                // assegno al body la classe "pushing" per far scrollare strip+header
                me.body.addClass('pushing');
                // comunico alla logica che la push deve scrollare con l'utenre
                isPushing = true;
                // controllo se abbiamo a che fare con una push o con una creativitÃƒ  di altro genere
                console.log('ÃƒÂ¨ una pushdown? ' + is_bnzm_pdown);

                // nel caso in cui il contenitore della strip sia vuoto (altezza zero) annullo l'assegnazione delle altezze ai contenitori e tolgo la classe pushing: gli do 5 secondi
                var mycount = 0;
                var myint = setInterval(function() {
                    if (me.stripAdv.height() == 0) {
                        clearInterval(myint);
                        me.flyingContainer.height('');
                        me.staticContainer.height('');
                        me.body.removeClass('pushing');
                    } else if (mycount == 5000) {
                        clearInterval(myint);
                    }
                    mycount += 100;
                }, 100);

                // gestisco la logica per le strip NO push (logica della push nei JS all'interno delle creativitÃƒ )
                if (!is_bnzm_pdown) {
                    // conto 5s
                    setTimeout(
                        function() {
                            me.stripToTop();
                        },
                        5000
                    );
                }
            }
        }
    };

    me.stripToTop = function() {
        // se l'utente ha iniziato a scrollare
        if ($(window).scrollTop() > me.stripAdv.height()) {
            // sego la classe pushing e metto la classe hiding per la dissolvenza
            me.body.addClass('hiding');
            // attendo la dissolvenza sia terminata
            setTimeout(
                // rimuovo la classe hiding e rimuovo le altezze date ai due contenitori
                function() {
                    me.body.removeClass('hiding').removeClass('pushing');
                    me.staticContainer.height('');
                    me.flyingContainer.height('');
                    // comunico alla logica che la push non deve piÃƒÂ¹ scrollare con l'utente
                    isPushing = false;
                },
                300
            );
            // se l'utente non ha iniziato a scrollare
        } else {
            // sego la classe pushing ma non ho bisogno della classe hiding per la dissolvenza
            me.body.removeClass('pushing');
            // rimuovo le altezze date ai due contenitori
            me.flyingContainer.height('');
            me.staticContainer.height('');
            // comunico alla logica che la push non deve piÃƒÂ¹ scrollare con l'utente
            isPushing = false;
        }
    }
}

function isStripAnimationAllowed(e) {
    document.addEventListener("child_NoBmVideoAdv", function() {
        console.log('[push FE] NoBmVideoAdv: '+parseInt(performance.now() - startPageTimes.performanceNow));
    });

    document.addEventListener("child_BmVideoPlay", function() {
        console.log('[push FE] BmVideoPlay: '+parseInt(performance.now() - startPageTimes.performanceNow));
    });

    document.addEventListener("child_BmVideoAdv", function() {
        console.log('[push FE] BmVideoAdv: '+parseInt(performance.now() - startPageTimes.performanceNow));
    });

    return true;
}

window.addEventListener("message", initPushdown, false);

function initPushdown(event) {
  if(event.data && (event.data.action=='initPushMobile' || event.data.action=='initPushDesktop')){
    event.stopImmediatePropagation();

    // funzione che chiama lo script PAMELa
    (function (a,l,t,e,r) {
      a[e] = a[e] || function(s) { (a[e].run = a[e].run || []).push(s)};
      let g,z = l.getElementsByTagName(t)[0];
      if (l.getElementById(e)){return;}
      g = l.createElement(t); g.id = e; g.src = r; g.async = 1;
      z.parentNode.insertBefore(g,z);
    }(window, document, 'script', 'AVPushLoader', "https://ptp.stbm.it/pushdown/loader/av/pushdown-loader.js"));

    // prendiamo le configurazioni dall'evento
    var obj = event.data.pushConf;
    obj['flyMode'] = 'fade';
    AVPushLoader(obj);
  }
}