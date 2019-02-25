// cambio il markup da qua per non entrare dentro il template
let wrapperdiv = document.createElement("div");
wrapperdiv.id = 'av-pushdown-wrapper';

let expanding = document.querySelectorAll(".expanding");
expanding[0].classList.add('advCollapse');
console.log('advcollapse added');

let contstatic = document.querySelectorAll(".static-container");

contstatic[0].parentNode.insertBefore(wrapperdiv, contstatic[0]);

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
    AVPushLoader({
      website: obj['website'],
      type: obj['type'],
      pausePrerollOnClose: obj['pausePrerollOnClose'],
      adServer: obj['adServer'],
      flyMode: "fade"
    });

  }
}