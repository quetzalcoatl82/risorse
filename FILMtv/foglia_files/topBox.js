OBR.Eb=OBR.Eb||function(){var a={},b={},c=!0,e,d,g=OBR,f,h,k,l,m,n,p=!1,q=!1,r=window.innerHeight,y=OBR.L.Xc();a.Ca={mm:{ID:3150,LIMIT:1},Af:{ID:3050,LIMIT:20},Ec:{ID:3E3,LIMIT:100},vm:{ID:3200,LIMIT:100},pm:{ID:3100,LIMIT:1}};a.Ne={};b.Ba=function(a){g=a};b.v=function(d){c&&(c=!1,a.wa=!1,a.rh=0,a.Wd=0,440<g.L.sa().width||a.nc()?g.i.log("TopBox - Exiting the 'init' phase, screen is wider than 440px"):(f=d,a.I=a.fe(f),e=a.hc(),null===e?g.i.log("TopBox - Reference element doesn't exist"):(!0===f.j("scrollMethodDetectionAutoMode",
!1)?a.Ne=e||window:a.Ne=window,a.eu(),a.on(),a.Mg(),!1===a.I.Uq&&b.kk(),a.kq())))};a.kq=function(){a.Fk=f.j("hideTopBoxWhenOverlapsFooter",!1);a.Fk&&(a.Uh=!0,a.ph=new g.Ed)};a.iq=function(b){return null===b?null:b.scrollHeight>b.clientHeight?b:a.iq(b.parentNode)};a.eu=function(){var b=setInterval(function(){!1===a.am&&a.oq()&&a.I.wd&&(a.I.qe&&OBR.Bb&&OBR.Bb.nh||!a.I.qe)&&(a.I.Hq?a.Ih():(g.b.U(window,"scroll",a.td),"onorientationchange"in window&&void 0!==window.orientation&&g.b.U(window,"orientationchange",
a.resize),g.b.U(window,"resize",a.resize)),clearInterval(b));a.Oa&&(1>a.Oa.g("tcr",-1)||!0===a.am)&&clearInterval(b)},200)};a.oq=function(){var a=document.querySelector(".ob-shrink .ob-rec-image");return!(null===a||!a.complete)};a.on=function(){g.b.M(".OUTBRAIN.ob-shrink.ob-top-box{top:0px;display:initial;}.OUTBRAIN.ob-shrink.ob-bottom-box{bottom:0px;display:initial;}.OUTBRAIN.ob-shrink{display:none;position:fixed;left:0px;width:100%;z-index:999999;-webkit-backface-visibility:hidden;}.OUTBRAIN.ob-shrink.ob-top-box{-webkit-transition:-webkit-transform 600ms;transition:transform 600ms;}.OUTBRAIN.ob-top-box.ob-shrink-hide{-webkit-transform:translateY(-200px);transform: translateY(-200px);}.OUTBRAIN.ob-bottom-box.ob-shrink-hide{-webkit-transform:translateY(800px);transform:translateY(800px);}.OUTBRAIN.ob-top-box.ob-shrink-show{-webkit-transform:translateY("+
a.I.We+"px);transform:translateY("+a.I.We+"px);}.OUTBRAIN.ob-bottom-box.ob-shrink-show{-webkit-transform:translateY(-"+a.I.We+"px);transform:translateY(-"+a.I.We+"px);}.OUTBRAIN.ob-static.ob-shrink-hide{display:none;}")};a.Mg=function(){d=g.b.createElement("div","ob-topbox-placeholder",null,null);"after"===f.j("widgetReferenceRelativePos","after")?e.nextSibling?g.b.insertBefore(d,e.nextSibling):e.parentNode.appendChild(d):g.b.insertBefore(d,e)};a.fg=function(){h=f.j("widgetIdToInject","TBX_1");k=
g.b.createElement("div",null,null,{"class":"OUTBRAIN ob-shrink ob-shrink-hide ob-fixed"+(g.f.dd?" ob-in-app":""),"data-src":f.da(),"data-widget-id":h});g.b.insertBefore(k,d)};a.nc=function(){if(void 0!==window.orientation)return 0!==window.orientation;var a=g.L.sa();return a.width>a.height};a.resize=function(){if(a.nc()&&(a.Le(),a.I.wd)){var b=document.getElementsByClassName("ob-shrink")[0];b&&b.parentNode.removeChild(b)}};a.fe=function(a){return{Sh:g.L.sa().height,xl:!1,wd:!1,Oh:!1,jj:0,fd:!1,Lo:a.j("topBoxFirstTrigger",
.5),pu:a.j("topBoxSecondTrigger",0),We:a.j("topBoxFixedModePositionY",0),qe:!1,lc:!1,Hq:a.j("topBoxIsAlwaysShown",!1),Uq:a.j("topBoxLocked",!1)&&!g.f.$k,sh:!1}};a.Le=function(){g.b.ob(window,"scroll",a.td);g.b.ob(window,"resize",a.resize);g.b.ob(window,"orientationchange",a.resize)};a.td=function(){function b(){if(!a.I.sh&&!a.I.Oh){a.I.sh=!0;if(a.Ne===window)var b=window.scrollY;else if(b=a.Ne){var c=document.body.scrollTop,d=b.scrollTop;0===d&&(d=b.getBoundingClientRect().top);b=Math.abs(c+d)}else b=
0;!a.I.xl&&a.I.Sh*a.I.Lo<b&&(q=a.I.xl=!0);b>a.rh&&(a.I.fd&&(a.Uh=!0,a.ik(),a.I.fd=!1),a.I.jj=b);b<a.rh&&b<a.I.jj-a.I.pu&&!a.I.fd&&a.I.wd&&q&&(a.Fk?a.hs():(a.Ih(),a.I.fd=!0));a.rh=b;a.I.sh=!1}}function c(){if(g.f.dd&&a.I.lc&&(r=window.innerHeight,"facebook"===g.f.Ef||"google"===g.f.Ef)){if(document.body.scrollHeight-100<=document.body.scrollTop+window.innerHeight)r=window.screen.height;else if("google"===g.f.Ef){var b=k.getElementsByClassName("ob-widget")[0];r=window.screen.height-b.clientHeight+50}k.style.top=
r+"px"}}!a.I.lc&&!a.I.Oh&&a.I.wd&&!0===y.ac(d,0)&&q&&(a.Le(),a.vr(),a.I.Oh=!0);a.wa||(c(),b(),setTimeout(function(){a.wa=!1},150),a.wa=!0)};a.hs=function(){a.Uh&&null===a.Pe()&&(a.Uh=!1,a.Ih(),a.I.fd=!0)};a.Pe=function(){for(var b=0;b<g.o.length;b+=1)if(g.b.A(b)&&!0===a.ph.ac(g.b.A(b),0))return b;return null};a.Ih=function(){if(k){var b=a.Ha();if(g.f.dd&&a.I.lc){var c=k.getElementsByClassName("ob-widget")[0];k.style.transform="translateY(-"+c.clientHeight+"px)";k.style.webkitTransform="translateY(-"+
c.clientHeight+"px)";k.style.top=r+"px";k.style.bottom="0"}g.b.N(k,"ob-shrink-hide");g.b.J(k,"ob-shrink-show");a.Wd+=1;b.requestEventCounter=a.Wd;a.S.H(a.Ca.Ec,b,OBR.f.ia.na,{})}p||(g.Ua.af(l),p=!0)};a.ik=function(){if(k){var b=a.Ha();b.requestEventCounter=a.Wd;g.b.N(k,"ob-shrink-show");g.b.J(k,"ob-shrink-hide");g.f.dd&&a.I.lc&&(k.style.transform="",k.style.webkitTransform="");a.S.H(a.Ca.vm,b,OBR.f.ia.na,{})}};a.vr=function(){g.b.N(k,"ob-shrink");g.b.N(k,"ob-shrink-show");g.b.N(k,"ob-shrink-hide");
g.b.M(".OUTBRAIN.ob-shrink{position:static;width:auto;z-index:auto;top:0;transition: all 7s ease-in-out;-webkit-transition: all 7s ease-in-out;}");k.className=k.className.replace("ob-fixed","ob-static");d.parentNode.removeChild(d);p||(g.Ua.af(l),p=!0);g.Bb.ve&&g.Bb.Oe.resizeEvent();a.S.H(a.Ca.pm,a.Ha(),OBR.f.ia.na,{})};a.debug=function(a){-1<window.location.href.indexOf("obdraft")&&console.log(a)};b.kk=function(){q=!1;a.fg();g.display.nb(a.Wa);g.controller.qd()};b.no=function(){k&&(a.ik(),a.Le(),
a.S.H(a.Ca.mm,a.Ha(),OBR.f.ia.na,{}))};a.hc=function(){var a=null,b=f.j("widgetLocationReference","");0<b.length&&(a=document.querySelector(b));return a};a.Wa=function(b){var c;g.o[b]&&g.o[b].C()===h&&(a.Oa=g.o[b],(c=a.Oa.j("recMode"))?(a.In(c),m=-1<c.indexOf("top-box-"),n=-1<c.indexOf("bottom-box-vertical"),a.qu(),a.Ot(),a.I.wd=!0,l=b):a.Le())};a.In=function(b){a.am=!!(-1<b.indexOf("bottom-box-vertical-strip")&&2>a.Oa.g("tcr",-1))};a.qu=function(){a.I.lc=!m;a.I.qe=m||!n;a.S=new g.S(a.Oa,m?"TopBox":
"BottomBox");a.S.setActive(!0===f.j("topBoxBIEventsEnabled",!1))};a.Ot=function(){var b=200;g.b.J(k,m?"ob-top-box":"ob-bottom-box");if(a.I.lc){var c=a.Oa.j("bottomBoxSpeed",600);a.I.qe||(b=k&&150<k.clientHeight?k.clientHeight+1:800);g.b.M(".OUTBRAIN.ob-bottom-box.ob-shrink-hide{-webkit-transform: translateY("+b+"px);transform: translateY("+b+"px);}.OUTBRAIN.ob-shrink.ob-bottom-box{-webkit-transition:-webkit-transform "+c+"ms;transition:transform "+c+"ms;}")}};b.ga=function(){c=!0;q=p=!1;k&&k.parentNode&&
k.parentNode.removeChild(k)};b.Bh=function(b,c,d){var e=a.Ha();b=b>c?"left":"right";if(!d){d=a.Oa.g("tcr",-1);for(var f=a.Oa.j("topBoxSpaceBetweenRecs",10),g=document.querySelectorAll("."+a.Oa.C()+" .ob-dynamic-rec-container"),h=a.Oa.j("dynamicWidgetDirection","LTR"),k,l=0;l<d;l++)if(k="RTL"===h?d-1-l:l,(g[l].offsetWidth+f)*k===c){c=g[l].getAttribute("data-pos");break}}e.swipeDirection=b;e.absolutePosId=c;a.S.H(a.Ca.Af,e,OBR.f.ia.na,{})};a.Ha=function(){var b=a.Oa.j,c=a.Oa.g;return{publisherId:c("pid",
""),sectionId:c("sid",""),widgetJsId:c("widgetJsId",""),widgetId:c("wnid",""),uuid:c("lsd",""),deviceOs:"",widgetRecMode:b("recMode",!1),layoutVersion:b("dynamicDynamicLayoutVersion",1),widgetNumOfRecs:c("tcr",""),widgetIsCloseButtonEnabled:"none"!==b("topBoxCloseEnable","none"),isSwipable:!(-1<b("recMode","").indexOf("bottom-box-vertical-wide")||-1<b("recMode","").indexOf("bottom-box-vertical-strip")||-1<b("recMode","").indexOf("bottom-box-vertical-sbs"))}};b.aa=function(){a.ub=g;return a};return b}();
OBR.h.P(OBR.h.l.Df);

OBR.Bb=OBR.Bb||function(){var a,b={},c={};b.v=function(c){a=c;b.ve=!1;b.nh=!1;b.hd=0;b.Oe={}};b.aa=function(){return c};c.Jt=function(){var b=a.b.A(c.s.w);if(b=c.Iu(b)){var d=b.getAttribute("id");d=null===d?a.f.yl+"-"+c.s.w:d+("-"+c.s.w);b.setAttribute("id",d);b.setAttribute("class","widget-direction");setTimeout(function(){c.zo(b)},10);OBR.xd.Zb(c.s)}};c.Iu=function(a){var b=document.createElement("div");a=a.getElementsByClassName("ob-widget-items-container")[0];if(!a)return null;b.appendChild(a.cloneNode(!0));
b.style.overflow="hidden";a.parentNode.replaceChild(b,a);return b};c.xp=function(a){for(var d=c.s,e,f,h=a.getElementsByTagName("ul")[0],k="RTL"===d.j("dynamicWidgetDirection","LTR"),l=document.body.clientWidth,m=d.j("topBoxRecWidth",.8),n=Math.floor(m*l),p=d.j("topBoxSpaceBetweenRecs",10),q=h.getElementsByClassName("ob-dynamic-rec-container"),r=a.parentNode.getElementsByClassName("ob-widget-header")[0],y=n-p,B=p/2+"px",E=0,C=q.length;E<C;E++)if(e=q[E],e.style.padding=B,e.style.maxWidth="none",e.style.minHeight=
"initial",e.style.marginLeft=B,e.style.marginRight=B,e.style.boxSizing="border-box",f=d.j("recMode",""),0<f.indexOf("bottom-box-pager")&&-1===f.indexOf("bottom-box-pager-wide")||0<f.indexOf("top-box-pager"))e.style.overflow="hidden",e.style.maxHeight=c.Qi(y,p)+"px";h.style.position="relative";switch(d.j("topBoxRecommendationTileAlignment","title")){case "center":r=(l-n-2*p)/2+"px";break;case "noGap":r=0;break;default:case "title":k?(e=parseInt(window.getComputedStyle(r,null).getPropertyValue("margin-right"),
10),r=parseInt(window.getComputedStyle(r,null).getPropertyValue("padding-right"),10)):(e=parseInt(window.getComputedStyle(r,null).getPropertyValue("margin-left"),10),r=parseInt(window.getComputedStyle(r,null).getPropertyValue("padding-left"),10)),r=(r>e?r:e||8)+"px"}k?h.style.right=r:h.style.left=r;a.style.margin="0px auto";a.style.overflow="visible";a.parentNode.style.overflow="hidden";a.parentNode.style.paddingBottom="5px";a=new window.OBR.OBPagerNew({slider:a,wrapper:a.getElementsByClassName("ob-widget-items-container")[0],
slides:q},{callback:c.dj,rtl:k,centeredSlides:!0,slidePercent:m,spacing:p,offsetFromStart:parseInt(r,10)||0,nextSlideHint:-1<d.j("recMode","").match(/('odb_dynamic_swipe'|'odb_dynamic_smartfeed-swipe')/)?d.j("swipeLayoutRecommendationHint","recommendationHint"):"recommendationHint",isTextOnImage:d.j("swipeLayoutIsTextOnImage",!1),scrollingY:-1<d.j("recMode","").match(/('odb_dynamic_swipe'|'odb_dynamic_smartfeed-swipe')/)});b.nh=!0;return a};c.yp=function(a){var d=c.s,e=a.getElementsByTagName("ul")[0];
e.style.width="auto";for(var f=Math.floor(d.j("topBoxRecWidth",.9)*document.body.clientWidth),h=d.j("topBoxSpaceBetweenRecs",10),k=e.getElementsByClassName("ob-dynamic-rec-container"),l=f*k.length,m=f-h,n=h/2+"px",p=0,q=k.length;p<q;p++){var r=k[p];r.style.width=m+"px";r.style.padding=n;r.style.maxWidth="none";r.style.minHeight="initial";r.style.marginLeft=n;r.style.marginRight=n;r.style.boxSizing="border-box";var y=d.j("recMode","");if(0<y.indexOf("bottom-box-pager")&&-1===y.indexOf("bottom-box-pager-wide")||
0<y.indexOf("top-box-pager"))r.style.overflow="hidden",r.style.maxHeight=c.Qi(m,h)+"px"}e.style.width=l+"px";a.style.width=f+"px";a.style.margin="0px auto";a.style.overflow="visible";a.parentNode.style.overflow="hidden";a.parentNode.style.paddingBottom="5px";r=window.OBR.OBPagerRenderer(window,e);r=new window.OBR.OBPager(r,{scrollingY:!1,bouncing:!0,penetrationDeceleration:.65,penetrationAcceleration:.25,speedMultiplier:1,paging:!0});y=a.getBoundingClientRect();r.setPosition(y.left+a.clientLeft,y.top+
a.clientTop);r.setDimensions(a.clientWidth,a.clientHeight,e.offsetWidth,e.offsetHeight);"RTL"===d.j("dynamicWidgetDirection","LTR")&&r.scrollTo(l,0,!1,null,b.Kt);b.nh=!0;return r};c.Qi=function(a,b){return Math.round(c.s.j("dynamicImageHeight",100)/c.s.j("dynamicImageWidth",150)*(1===c.s.j("dynamicDynamicLayoutVersion",1)?.45:c.s.j("dynamicImageWidthInPercentage",50)/100)*(a-b))+b+2};c.ro=function(a,b){a.addEventListener("touchstart",function(a){a.target.tagName.match(/input|textarea|sele\u200ect/i)||
b.doTouchStart(a.touches,a.timeStamp)},!1);a.addEventListener("touchmove",function(a){3>c.s.j("dynamicDynamicLayoutVersion",1)?(a.preventDefault(),a.stopPropagation(),b.doTouchMove(a.touches,a.timeStamp)):b.doTouchMove(a)},!1);document.addEventListener("touchend",function(a){b.doTouchEnd(a.timeStamp,c.dj)},!1)};c.qo=function(a,b){var c=!1;a.addEventListener("mousedown",function(a){a.target.tagName.match(/input|textarea|select/i)||(b.doTouchStart([{pageX:a.pageX,pageY:a.pageY}],a.timeStamp),c=!0)},
!1);document.addEventListener("mousemove",function(a){c&&(b.doTouchMove([{pageX:a.pageX,pageY:a.pageY}],a.timeStamp),c=!0)},!1);document.addEventListener("mouseup",function(a){if(c)return b.doTouchEnd(a.timeStamp),c=!1},!1)};c.zo=function(a){b.Oe=b.ve?c.xp(a):c.yp(a);"ontouchstart"in window?c.ro(a,b.Oe):c.qo(a,b.Oe)};c.dj=function(e){b.hd!==e&&(c.s.Wg()?a.Mh.Bh(b.hd,e):a.Eb.Bh(b.hd,e,b.ve),b.hd=e)};b.Kt=function(a){b.hd=a};b.Zd=function(a){c.s=a;c.Jt()};b.eh=function(a){3===a.j("dynamicDynamicLayoutVersion",
1)?OBR.h.F(OBR.h.l.pi,function(a){b.ve=!0;OBR.Bb.Zd(a)},this,a):OBR.h.F(OBR.h.l.oi,function(a){OBR.Bb.Zd(a)},this,a)};b.v(OBR);return b}();OBR.h.P(OBR.h.l.lf);


/*
 * Scroller
 * http://github.com/zynga/scroller
 *
 * Copyright 2011, Zynga Inc.
 * Licensed under the MIT License.
 * https://raw.github.com/zynga/scroller/master/MIT-LICENSE.txt
 *
 * Based on the work of: Unify Project (unify-project.org)
 * http://unify-project.org
 * Copyright 2011, Deutsche Telekom AG
 * License: MIT + Apache (V2)
 */

/**
 * Generic animation class with support for dropped frames both optional easing and duration.
 *
 * Optional duration is useful when the lifetime is defined by another condition than time
 * e.g. speed of an animating object, etc.
 *
 * Dropped frame logic allows to keep using the same updater logic independent from the actual
 * rendering. This eases a lot of cases where it might be pretty complex to break down a state
 * based on the pure time difference.
 */
(function(global) {
  var time = Date.now || function() {
        return +new Date();
      };
  var desiredFrames = 60;
  var millisecondsPerSecond = 1000;
  var running = {};
  var counter = 1;

  // Create namespaces
  if (!global.core) {
    global.core = { effect : {} };

  } else if (!core.effect) {
    core.effect = {};
  }

  core.effect.Animate = {

    /**
     * A requestAnimationFrame wrapper / polyfill.
     *
     * @param callback {Function} The callback to be invoked before the next repaint.
     * @param root {HTMLElement} The root element for the repaint
     */
    requestAnimationFrame: (function() {

      // Check for request animation Frame support
      var requestFrame = global.requestAnimationFrame || global.webkitRequestAnimationFrame || global.mozRequestAnimationFrame || global.oRequestAnimationFrame;
      var isNative = !!requestFrame;

      if (requestFrame && !/requestAnimationFrame\(\)\s*\{\s*\[native code\]\s*\}/i.test(requestFrame.toString())) {
        isNative = false;
      }

      if (isNative) {
        return function(callback, root) {
          requestFrame(callback, root)
        };
      }

      var TARGET_FPS = 60;
      var requests = {};
      var requestCount = 0;
      var rafHandle = 1;
      var intervalHandle = null;
      var lastActive = +new Date();

      return function(callback, root) {
        var callbackHandle = rafHandle++;

        // Store callback
        requests[callbackHandle] = callback;
        requestCount++;

        // Create timeout at first request
        if (intervalHandle === null) {

          intervalHandle = setInterval(function() {

            var time = +new Date();
            var currentRequests = requests;

            // Reset data structure before executing callbacks
            requests = {};
            requestCount = 0;

            for(var key in currentRequests) {
              if (currentRequests.hasOwnProperty(key)) {
                currentRequests[key](time);
                lastActive = time;
              }
            }

            // Disable the timeout when nothing happens for a certain
            // period of time
            if (time - lastActive > 2500) {
              clearInterval(intervalHandle);
              intervalHandle = null;
            }

          }, 1000 / TARGET_FPS);
        }

        return callbackHandle;
      };

    })(),


    /**
     * Stops the given animation.
     *
     * @param id {Integer} Unique animation ID
     * @return {Boolean} Whether the animation was stopped (aka, was running before)
     */
    stop: function(id) {
      var cleared = running[id] != null;
      if (cleared) {
        running[id] = null;
      }

      return cleared;
    },


    /**
     * Whether the given animation is still running.
     *
     * @param id {Integer} Unique animation ID
     * @return {Boolean} Whether the animation is still running
     */
    isRunning: function(id) {
      return running[id] != null;
    },


    /**
     * Start the animation.
     *
     * @param stepCallback {Function} Pointer to function which is executed on every step.
     *   Signature of the method should be `function(percent, now, virtual) { return continueWithAnimation; }`
     * @param verifyCallback {Function} Executed before every animation step.
     *   Signature of the method should be `function() { return continueWithAnimation; }`
     * @param completedCallback {Function}
     *   Signature of the method should be `function(droppedFrames, finishedAnimation) {}`
     * @param duration {Integer} Milliseconds to run the animation
     * @param easingMethod {Function} Pointer to easing function
     *   Signature of the method should be `function(percent) { return modifiedValue; }`
     * @param root {Element ? document.body} Render root, when available. Used for internal
     *   usage of requestAnimationFrame.
     * @return {Integer} Identifier of animation. Can be used to stop it any time.
     */
    start: function(stepCallback, verifyCallback, completedCallback, duration, easingMethod, root) {

      var start = time();
      var lastFrame = start;
      var percent = 0;
      var dropCounter = 0;
      var id = counter++;

      if (!root) {
        root = document.body;
      }

      // Compacting running db automatically every few new animations
      if (id % 20 === 0) {
        var newRunning = {};
        for (var usedId in running) {
          newRunning[usedId] = true;
        }
        running = newRunning;
      }

      // This is the internal step method which is called every few milliseconds
      var step = function(virtual) {

        // Normalize virtual value
        var render = virtual !== true;

        // Get current time
        var now = time();

        // Verification is executed before next animation step
        if (!running[id] || (verifyCallback && !verifyCallback(id))) {

          running[id] = null;
          completedCallback && completedCallback(desiredFrames - (dropCounter / ((now - start) / millisecondsPerSecond)), id, false);
          return;

        }

        // For the current rendering to apply let's update omitted steps in memory.
        // This is important to bring internal state variables up-to-date with progress in time.
        if (render) {

          var droppedFrames = Math.round((now - lastFrame) / (millisecondsPerSecond / desiredFrames)) - 1;
          for (var j = 0; j < Math.min(droppedFrames, 4); j++) {
            step(true);
            dropCounter++;
          }

        }

        // Compute percent value
        if (duration) {
          percent = (now - start) / duration;
          if (percent > 1) {
            percent = 1;
          }
        }

        // Execute step callback, then...
        var value = easingMethod ? easingMethod(percent) : percent;
        if ((stepCallback(value, now, render) === false || percent === 1) && render) {
          running[id] = null;
          completedCallback && completedCallback(desiredFrames - (dropCounter / ((now - start) / millisecondsPerSecond)), id, percent === 1 || duration == null);
        } else if (render) {
          lastFrame = now;
          core.effect.Animate.requestAnimationFrame(step, root);
        }
      };

      // Mark as running
      running[id] = true;

      // Init first step
      core.effect.Animate.requestAnimationFrame(step, root);

      // Return unique animation ID
      return id;
    }
  };
})(this);

/*
 * Scroller
 * http://github.com/zynga/scroller
 *
 * Copyright 2011, Zynga Inc.
 * Licensed under the MIT License.
 * https://raw.github.com/zynga/scroller/master/MIT-LICENSE.txt
 *
 * Based on the work of: Unify Project (unify-project.org)
 * http://unify-project.org
 * Copyright 2011, Deutsche Telekom AG
 * License: MIT + Apache (V2)
 */

var Scroller;

(function() {
  var NOOP = function(){};

  /**
   * A pure logic 'component' for 'virtual' scrolling/zooming.
   */
  Scroller = function(callback, options) {

    this.__callback = callback;

    this.options = {

      /** Enable scrolling on x-axis */
      scrollingX: true,

      /** Enable scrolling on y-axis */
      scrollingY: true,

      /** Enable animations for deceleration, snap back, zooming and scrolling */
      animating: true,

      /** duration for animations triggered by scrollTo/zoomTo */
      animationDuration: 250,

      /** Enable bouncing (content can be slowly moved outside and jumps back after releasing) */
      bouncing: true,

      /** Enable locking to the main axis if user moves only slightly on one of them at start */
      locking: true,

      /** Enable pagination mode (switching between full page content panes) */
      paging: false,

      /** Enable snapping of content to a configured pixel grid */
      snapping: false,

      /** Enable zooming of content via API, fingers and mouse wheel */
      zooming: false,

      /** Minimum zoom level */
      minZoom: 0.5,

      /** Maximum zoom level */
      maxZoom: 3,

      /** Multiply or decrease scrolling speed **/
      speedMultiplier: 1,

      /** Callback that is fired on the later of touch end or deceleration end,
       provided that another scrolling action has not begun. Used to know
       when to fade out a scrollbar. */
      scrollingComplete: NOOP,

      /** This configures the amount of change applied to deceleration when reaching boundaries  **/
      penetrationDeceleration : 0.03,

      /** This configures the amount of change applied to acceleration when reaching boundaries  **/
      penetrationAcceleration : 0.08

    };

    for (var key in options) {
      this.options[key] = options[key];
    }

  };


  // Easing Equations (c) 2003 Robert Penner, all rights reserved.
  // Open source under the BSD License.

  /**
   * @param pos {Number} position between 0 (start of effect) and 1 (end of effect)
   **/
  var easeOutCubic = function(pos) {
    return (Math.pow((pos - 1), 3) + 1);
  };

  /**
   * @param pos {Number} position between 0 (start of effect) and 1 (end of effect)
   **/
  var easeInOutCubic = function(pos) {
    if ((pos /= 0.5) < 1) {
      return 0.5 * Math.pow(pos, 3);
    }

    return 0.5 * (Math.pow((pos - 2), 3) + 2);
  };


  var members = {

    /*
     ---------------------------------------------------------------------------
     INTERNAL FIELDS :: STATUS
     ---------------------------------------------------------------------------
     */

    /** {Boolean} Whether only a single finger is used in touch handling */
    __isSingleTouch: false,

    /** {Boolean} Whether a touch event sequence is in progress */
    __isTracking: false,

    /** {Boolean} Whether a deceleration animation went to completion. */
    __didDecelerationComplete: false,

    /**
     * {Boolean} Whether a gesture zoom/rotate event is in progress. Activates when
     * a gesturestart event happens. This has higher priority than dragging.
     */
    __isGesturing: false,

    /**
     * {Boolean} Whether the user has moved by such a distance that we have enabled
     * dragging mode. Hint: It's only enabled after some pixels of movement to
     * not interrupt with clicks etc.
     */
    __isDragging: false,

    /**
     * {Boolean} Not touching and dragging anymore, and smoothly animating the
     * touch sequence using deceleration.
     */
    __isDecelerating: false,

    /**
     * {Boolean} Smoothly animating the currently configured change
     */
    __isAnimating: false,



    /*
     ---------------------------------------------------------------------------
     INTERNAL FIELDS :: DIMENSIONS
     ---------------------------------------------------------------------------
     */

    /** {Integer} Available outer left position (from document perspective) */
    __clientLeft: 0,

    /** {Integer} Available outer top position (from document perspective) */
    __clientTop: 0,

    /** {Integer} Available outer width */
    __clientWidth: 0,

    /** {Integer} Available outer height */
    __clientHeight: 0,

    /** {Integer} Outer width of content */
    __contentWidth: 0,

    /** {Integer} Outer height of content */
    __contentHeight: 0,

    /** {Integer} Snapping width for content */
    __snapWidth: 100,

    /** {Integer} Snapping height for content */
    __snapHeight: 100,

    /** {Integer} Height to assign to refresh area */
    __refreshHeight: null,

    /** {Boolean} Whether the refresh process is enabled when the event is released now */
    __refreshActive: false,

    /** {Function} Callback to execute on activation. This is for signalling the user about a refresh is about to happen when he release */
    __refreshActivate: null,

    /** {Function} Callback to execute on deactivation. This is for signalling the user about the refresh being cancelled */
    __refreshDeactivate: null,

    /** {Function} Callback to execute to start the actual refresh. Call {@link #refreshFinish} when done */
    __refreshStart: null,

    /** {Number} Zoom level */
    __zoomLevel: 1,

    /** {Number} Scroll position on x-axis */
    __scrollLeft: 0,

    /** {Number} Scroll position on y-axis */
    __scrollTop: 0,

    /** {Integer} Maximum allowed scroll position on x-axis */
    __maxScrollLeft: 0,

    /** {Integer} Maximum allowed scroll position on y-axis */
    __maxScrollTop: 0,

    /* {Number} Scheduled left position (final position when animating) */
    __scheduledLeft: 0,

    /* {Number} Scheduled top position (final position when animating) */
    __scheduledTop: 0,

    /* {Number} Scheduled zoom level (final scale when animating) */
    __scheduledZoom: 0,



    /*
     ---------------------------------------------------------------------------
     INTERNAL FIELDS :: LAST POSITIONS
     ---------------------------------------------------------------------------
     */

    /** {Number} Left position of finger at start */
    __lastTouchLeft: null,

    /** {Number} Top position of finger at start */
    __lastTouchTop: null,

    /** {Date} Timestamp of last move of finger. Used to limit tracking range for deceleration speed. */
    __lastTouchMove: null,

    /** {Array} List of positions, uses three indexes for each state: left, top, timestamp */
    __positions: null,



    /*
     ---------------------------------------------------------------------------
     INTERNAL FIELDS :: DECELERATION SUPPORT
     ---------------------------------------------------------------------------
     */

    /** {Integer} Minimum left scroll position during deceleration */
    __minDecelerationScrollLeft: null,

    /** {Integer} Minimum top scroll position during deceleration */
    __minDecelerationScrollTop: null,

    /** {Integer} Maximum left scroll position during deceleration */
    __maxDecelerationScrollLeft: null,

    /** {Integer} Maximum top scroll position during deceleration */
    __maxDecelerationScrollTop: null,

    /** {Number} Current factor to modify horizontal scroll position with on every step */
    __decelerationVelocityX: null,

    /** {Number} Current factor to modify vertical scroll position with on every step */
    __decelerationVelocityY: null,



    /*
     ---------------------------------------------------------------------------
     PUBLIC API
     ---------------------------------------------------------------------------
     */

    /**
     * Configures the dimensions of the client (outer) and content (inner) elements.
     * Requires the available space for the outer element and the outer size of the inner element.
     * All values which are falsy (null or zero etc.) are ignored and the old value is kept.
     *
     * @param clientWidth {Integer ? null} Inner width of outer element
     * @param clientHeight {Integer ? null} Inner height of outer element
     * @param contentWidth {Integer ? null} Outer width of inner element
     * @param contentHeight {Integer ? null} Outer height of inner element
     */
    "setDimensions": function(clientWidth, clientHeight, contentWidth, contentHeight) {

      var self = this;

      // Only update values which are defined
      if (clientWidth === +clientWidth) {
        self.__clientWidth = clientWidth;
      }

      if (clientHeight === +clientHeight) {
        self.__clientHeight = clientHeight;
      }

      if (contentWidth === +contentWidth) {
        self.__contentWidth = contentWidth;
      }

      if (contentHeight === +contentHeight) {
        self.__contentHeight = contentHeight;
      }

      // Refresh maximums
      self.__computeScrollMax();

      // Refresh scroll position
      self.scrollTo(self.__scrollLeft, self.__scrollTop, true);

    },


    /**
     * Sets the client coordinates in relation to the document.
     *
     * @param left {Integer ? 0} Left position of outer element
     * @param top {Integer ? 0} Top position of outer element
     */
    "setPosition": function(left, top) {

      var self = this;

      self.__clientLeft = left || 0;
      self.__clientTop = top || 0;

    },


    /**
     * Configures the snapping (when snapping is active)
     *
     * @param width {Integer} Snapping width
     * @param height {Integer} Snapping height
     */
    setSnapSize: function(width, height) {

      var self = this;

      self.__snapWidth = width;
      self.__snapHeight = height;

    },


    /**
     * Activates pull-to-refresh. A special zone on the top of the list to start a list refresh whenever
     * the user event is released during visibility of this zone. This was introduced by some apps on iOS like
     * the official Twitter client.
     *
     * @param height {Integer} Height of pull-to-refresh zone on top of rendered list
     * @param activateCallback {Function} Callback to execute on activation. This is for signalling the user about a refresh is about to happen when he release.
     * @param deactivateCallback {Function} Callback to execute on deactivation. This is for signalling the user about the refresh being cancelled.
     * @param startCallback {Function} Callback to execute to start the real async refresh action. Call {@link #finishPullToRefresh} after finish of refresh.
     */
    activatePullToRefresh: function(height, activateCallback, deactivateCallback, startCallback) {

      var self = this;

      self.__refreshHeight = height;
      self.__refreshActivate = activateCallback;
      self.__refreshDeactivate = deactivateCallback;
      self.__refreshStart = startCallback;

    },


    /**
     * Starts pull-to-refresh manually.
     */
    triggerPullToRefresh: function() {
      // Use publish instead of scrollTo to allow scrolling to out of boundary position
      // We don't need to normalize scrollLeft, zoomLevel, etc. here because we only y-scrolling when pull-to-refresh is enabled
      this.__publish(this.__scrollLeft, -this.__refreshHeight, this.__zoomLevel, true);

      if (this.__refreshStart) {
        this.__refreshStart();
      }
    },


    /**
     * Signalizes that pull-to-refresh is finished.
     */
    finishPullToRefresh: function() {

      var self = this;

      self.__refreshActive = false;
      if (self.__refreshDeactivate) {
        self.__refreshDeactivate();
      }

      self.scrollTo(self.__scrollLeft, self.__scrollTop, true);

    },


    /**
     * Returns the scroll position and zooming values
     *
     * @return {Map} `left` and `top` scroll position and `zoom` level
     */
    getValues: function() {

      var self = this;

      return {
        left: self.__scrollLeft,
        top: self.__scrollTop,
        zoom: self.__zoomLevel
      };

    },


    /**
     * Returns the maximum scroll values
     *
     * @return {Map} `left` and `top` maximum scroll values
     */
    getScrollMax: function() {

      var self = this;

      return {
        left: self.__maxScrollLeft,
        top: self.__maxScrollTop
      };

    },


    /**
     * Zooms to the given level. Supports optional animation. Zooms
     * the center when no coordinates are given.
     *
     * @param level {Number} Level to zoom to
     * @param animate {Boolean ? false} Whether to use animation
     * @param originLeft {Number ? null} Zoom in at given left coordinate
     * @param originTop {Number ? null} Zoom in at given top coordinate
     * @param callback {Function ? null} A callback that gets fired when the zoom is complete.
     */
    zoomTo: function(level, animate, originLeft, originTop, callback) {

      var self = this;

      if (!self.options.zooming) {
        throw new Error("Zooming is not enabled!");
      }

      // Add callback if exists
      if(callback) {
        self.__zoomComplete = callback;
      }

      // Stop deceleration
      if (self.__isDecelerating) {
        core.effect.Animate.stop(self.__isDecelerating);
        self.__isDecelerating = false;
      }

      var oldLevel = self.__zoomLevel;

      // Normalize input origin to center of viewport if not defined
      if (originLeft == null) {
        originLeft = self.__clientWidth / 2;
      }

      if (originTop == null) {
        originTop = self.__clientHeight / 2;
      }

      // Limit level according to configuration
      level = Math.max(Math.min(level, self.options.maxZoom), self.options.minZoom);

      // Recompute maximum values while temporary tweaking maximum scroll ranges
      self.__computeScrollMax(level);

      // Recompute left and top coordinates based on new zoom level
      var left = ((originLeft + self.__scrollLeft) * level / oldLevel) - originLeft;
      var top = ((originTop + self.__scrollTop) * level / oldLevel) - originTop;

      // Limit x-axis
      if (left > self.__maxScrollLeft) {
        left = self.__maxScrollLeft;
      } else if (left < 0) {
        left = 0;
      }

      // Limit y-axis
      if (top > self.__maxScrollTop) {
        top = self.__maxScrollTop;
      } else if (top < 0) {
        top = 0;
      }

      // Push values out
      self.__publish(left, top, level, animate);

    },


    /**
     * Zooms the content by the given factor.
     *
     * @param factor {Number} Zoom by given factor
     * @param animate {Boolean ? false} Whether to use animation
     * @param originLeft {Number ? 0} Zoom in at given left coordinate
     * @param originTop {Number ? 0} Zoom in at given top coordinate
     * @param callback {Function ? null} A callback that gets fired when the zoom is complete.
     */
    zoomBy: function(factor, animate, originLeft, originTop, callback) {

      var self = this;

      self.zoomTo(self.__zoomLevel * factor, animate, originLeft, originTop, callback);

    },


    /**
     * Scrolls to the given position. Respect limitations and snapping automatically.
     *
     * @param left {Number?null} Horizontal scroll position, keeps current if value is <code>null</code>
     * @param top {Number?null} Vertical scroll position, keeps current if value is <code>null</code>
     * @param animate {Boolean?false} Whether the scrolling should happen using an animation
     * @param zoom {Number?null} Zoom level to go to
     */
    scrollTo: function(left, top, animate, zoom, callback) {

      var self = this;

      // Stop deceleration
      if (self.__isDecelerating) {
        core.effect.Animate.stop(self.__isDecelerating);
        self.__isDecelerating = false;
      }

      // Correct coordinates based on new zoom level
      if (zoom != null && zoom !== self.__zoomLevel) {

        if (!self.options.zooming) {
          throw new Error("Zooming is not enabled!");
        }

        left *= zoom;
        top *= zoom;

        // Recompute maximum values while temporary tweaking maximum scroll ranges
        self.__computeScrollMax(zoom);

      } else {

        // Keep zoom when not defined
        zoom = self.__zoomLevel;

      }

      if (!self.options.scrollingX) {

        left = self.__scrollLeft;

      } else {

        if (self.options.paging) {
          left = Math.round(left / self.__clientWidth) * self.__clientWidth;
        } else if (self.options.snapping) {
          left = Math.round(left / self.__snapWidth) * self.__snapWidth;
        }

      }

      if (!self.options.scrollingY) {

        top = self.__scrollTop;

      } else {

        if (self.options.paging) {
          top = Math.round(top / self.__clientHeight) * self.__clientHeight;
        } else if (self.options.snapping) {
          top = Math.round(top / self.__snapHeight) * self.__snapHeight;
        }

      }

      // Limit for allowed ranges
      left = Math.max(Math.min(self.__maxScrollLeft, left), 0);
      top = Math.max(Math.min(self.__maxScrollTop, top), 0);

      // Don't animate when no change detected, still call publish to make sure
      // that rendered position is really in-sync with internal data
      if (left === self.__scrollLeft && top === self.__scrollTop) {
        animate = false;
      }

      // Publish new values
      if (typeof callback === 'function') {
        callback(left);
      }
      self.__publish(left, top, zoom, animate);

    },


    /**
     * Scroll by the given offset
     *
     * @param left {Number ? 0} Scroll x-axis by given offset
     * @param top {Number ? 0} Scroll x-axis by given offset
     * @param animate {Boolean ? false} Whether to animate the given change
     */
    scrollBy: function(left, top, animate) {

      var self = this;

      var startLeft = self.__isAnimating ? self.__scheduledLeft : self.__scrollLeft;
      var startTop = self.__isAnimating ? self.__scheduledTop : self.__scrollTop;

      self.scrollTo(startLeft + (left || 0), startTop + (top || 0), animate);

    },



    /*
     ---------------------------------------------------------------------------
     EVENT CALLBACKS
     ---------------------------------------------------------------------------
     */

    /**
     * Mouse wheel handler for zooming support
     */
    doMouseZoom: function(wheelDelta, timeStamp, pageX, pageY) {

      var self = this;
      var change = wheelDelta > 0 ? 0.97 : 1.03;

      return self.zoomTo(self.__zoomLevel * change, false, pageX - self.__clientLeft, pageY - self.__clientTop);

    },


    /**
     * Touch start handler for scrolling support
     */
    doTouchStart: function(touches, timeStamp) {

      // Array-like check is enough here
      if (touches.length == null) {
        throw new Error("Invalid touch list: " + touches);
      }

      if (timeStamp instanceof Date) {
        timeStamp = timeStamp.valueOf();
      }
      if (typeof timeStamp !== "number") {
        throw new Error("Invalid timestamp value: " + timeStamp);
      }

      var self = this;

      // Reset interruptedAnimation flag
      self.__interruptedAnimation = true;

      // Stop deceleration
      if (self.__isDecelerating) {
        core.effect.Animate.stop(self.__isDecelerating);
        self.__isDecelerating = false;
        self.__interruptedAnimation = true;
      }

      // Stop animation
      if (self.__isAnimating) {
        core.effect.Animate.stop(self.__isAnimating);
        self.__isAnimating = false;
        self.__interruptedAnimation = true;
      }

      // Use center point when dealing with two fingers
      var currentTouchLeft, currentTouchTop;
      var isSingleTouch = touches.length === 1;
      if (isSingleTouch) {
        currentTouchLeft = touches[0].pageX;
        currentTouchTop = touches[0].pageY;
      } else {
        currentTouchLeft = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
        currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
      }

      // Store initial positions
      self.__initialTouchLeft = currentTouchLeft;
      self.__initialTouchTop = currentTouchTop;

      // Store current zoom level
      self.__zoomLevelStart = self.__zoomLevel;

      // Store initial touch positions
      self.__lastTouchLeft = currentTouchLeft;
      self.__lastTouchTop = currentTouchTop;

      // Store initial move time stamp
      self.__lastTouchMove = timeStamp;

      // Reset initial scale
      self.__lastScale = 1;

      // Reset locking flags
      self.__enableScrollX = !isSingleTouch && self.options.scrollingX;
      self.__enableScrollY = !isSingleTouch && self.options.scrollingY;

      // Reset tracking flag
      self.__isTracking = true;

      // Reset deceleration complete flag
      self.__didDecelerationComplete = false;

      // Dragging starts directly with two fingers, otherwise lazy with an offset
      self.__isDragging = !isSingleTouch;

      // Some features are disabled in multi touch scenarios
      self.__isSingleTouch = isSingleTouch;

      // Clearing data structure
      self.__positions = [];

    },


    /**
     * Touch move handler for scrolling support
     */
    doTouchMove: function(touches, timeStamp, scale) {

      // Array-like check is enough here
      if (touches.length == null) {
        throw new Error("Invalid touch list: " + touches);
      }

      if (timeStamp instanceof Date) {
        timeStamp = timeStamp.valueOf();
      }
      if (typeof timeStamp !== "number") {
        throw new Error("Invalid timestamp value: " + timeStamp);
      }

      var self = this;

      // Ignore event when tracking is not enabled (event might be outside of element)
      if (!self.__isTracking) {
        return;
      }


      var currentTouchLeft, currentTouchTop;

      // Compute move based around of center of fingers
      if (touches.length === 2) {
        currentTouchLeft = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
        currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
      } else {
        currentTouchLeft = touches[0].pageX;
        currentTouchTop = touches[0].pageY;
      }

      var positions = self.__positions;

      // Are we already is dragging mode?
      if (self.__isDragging) {

        // Compute move distance
        var moveX = currentTouchLeft - self.__lastTouchLeft;
        var moveY = currentTouchTop - self.__lastTouchTop;

        // Read previous scroll position and zooming
        var scrollLeft = self.__scrollLeft;
        var scrollTop = self.__scrollTop;
        var level = self.__zoomLevel;

        // Work with scaling
        if (scale != null && self.options.zooming) {

          var oldLevel = level;

          // Recompute level based on previous scale and new scale
          level = level / self.__lastScale * scale;

          // Limit level according to configuration
          level = Math.max(Math.min(level, self.options.maxZoom), self.options.minZoom);

          // Only do further compution when change happened
          if (oldLevel !== level) {

            // Compute relative event position to container
            var currentTouchLeftRel = currentTouchLeft - self.__clientLeft;
            var currentTouchTopRel = currentTouchTop - self.__clientTop;

            // Recompute left and top coordinates based on new zoom level
            scrollLeft = ((currentTouchLeftRel + scrollLeft) * level / oldLevel) - currentTouchLeftRel;
            scrollTop = ((currentTouchTopRel + scrollTop) * level / oldLevel) - currentTouchTopRel;

            // Recompute max scroll values
            self.__computeScrollMax(level);

          }
        }

        if (self.__enableScrollX) {

          scrollLeft -= moveX * this.options.speedMultiplier;
          var maxScrollLeft = self.__maxScrollLeft;

          if (scrollLeft > maxScrollLeft || scrollLeft < 0) {

            // Slow down on the edges
            if (self.options.bouncing) {

              scrollLeft += (moveX / 2  * this.options.speedMultiplier);

            } else if (scrollLeft > maxScrollLeft) {

              scrollLeft = maxScrollLeft;

            } else {

              scrollLeft = 0;

            }
          }
        }

        // Compute new vertical scroll position
        if (self.__enableScrollY) {

          scrollTop -= moveY * this.options.speedMultiplier;
          var maxScrollTop = self.__maxScrollTop;

          if (scrollTop > maxScrollTop || scrollTop < 0) {

            // Slow down on the edges
            if (self.options.bouncing) {

              scrollTop += (moveY / 2 * this.options.speedMultiplier);

              // Support pull-to-refresh (only when only y is scrollable)
              if (!self.__enableScrollX && self.__refreshHeight != null) {

                if (!self.__refreshActive && scrollTop <= -self.__refreshHeight) {

                  self.__refreshActive = true;
                  if (self.__refreshActivate) {
                    self.__refreshActivate();
                  }

                } else if (self.__refreshActive && scrollTop > -self.__refreshHeight) {

                  self.__refreshActive = false;
                  if (self.__refreshDeactivate) {
                    self.__refreshDeactivate();
                  }

                }
              }

            } else if (scrollTop > maxScrollTop) {

              scrollTop = maxScrollTop;

            } else {

              scrollTop = 0;

            }
          }
        }

        // Keep list from growing infinitely (holding min 10, max 20 measure points)
        if (positions.length > 60) {
          positions.splice(0, 30);
        }

        // Track scroll movement for decleration
        positions.push(scrollLeft, scrollTop, timeStamp);

        // Sync scroll position
        self.__publish(scrollLeft, scrollTop, level);

        // Otherwise figure out whether we are switching into dragging mode now.
      } else {

        var minimumTrackingForScroll = self.options.locking ? 3 : 0;
        var minimumTrackingForDrag = 5;

        var distanceX = Math.abs(currentTouchLeft - self.__initialTouchLeft);
        var distanceY = Math.abs(currentTouchTop - self.__initialTouchTop);

        self.__enableScrollX = self.options.scrollingX && distanceX >= minimumTrackingForScroll;
        self.__enableScrollY = self.options.scrollingY && distanceY >= minimumTrackingForScroll;

        positions.push(self.__scrollLeft, self.__scrollTop, timeStamp);

        self.__isDragging = (self.__enableScrollX || self.__enableScrollY) && (distanceX >= minimumTrackingForDrag || distanceY >= minimumTrackingForDrag);
        if (self.__isDragging) {
          self.__interruptedAnimation = false;
        }

      }

      // Update last touch positions and time stamp for next event
      self.__lastTouchLeft = currentTouchLeft;
      self.__lastTouchTop = currentTouchTop;
      self.__lastTouchMove = timeStamp;
      self.__lastScale = scale;

    },


    /**
     * Touch end handler for scrolling support
     */
    doTouchEnd: function(timeStamp, callbackAfterPublish) {

      if (timeStamp instanceof Date) {
        timeStamp = timeStamp.valueOf();
      }
      if (typeof timeStamp !== "number") {
        throw new Error("Invalid timestamp value: " + timeStamp);
      }

      var self = this;

      // Ignore event when tracking is not enabled (no touchstart event on element)
      // This is required as this listener ('touchmove') sits on the document and not on the element itself.
      if (!self.__isTracking) {
        return;
      }

      // Not touching anymore (when two finger hit the screen there are two touch end events)
      self.__isTracking = false;

      // Be sure to reset the dragging flag now. Here we also detect whether
      // the finger has moved fast enough to switch into a deceleration animation.
      if (self.__isDragging) {

        // Reset dragging flag
        self.__isDragging = false;

        // Start deceleration
        // Verify that the last move detected was in some relevant time frame
        if (self.__isSingleTouch && self.options.animating && (timeStamp - self.__lastTouchMove) <= 100) {

          // Then figure out what the scroll position was about 100ms ago
          var positions = self.__positions;
          var endPos = positions.length - 1;
          var startPos = endPos;

          // Move pointer to position measured 100ms ago
          for (var i = endPos; i > 0 && positions[i] > (self.__lastTouchMove - 100); i -= 3) {
            startPos = i;
          }

          // If start and stop position is identical in a 100ms timeframe,
          // we cannot compute any useful deceleration.
          if (startPos !== endPos) {

            // Compute relative movement between these two points
            var timeOffset = positions[endPos] - positions[startPos];
            var movedLeft = self.__scrollLeft - positions[startPos - 2];
            var movedTop = self.__scrollTop - positions[startPos - 1];

            // Based on 50ms compute the movement to apply for each render step
            self.__decelerationVelocityX = movedLeft / timeOffset * (1000 / 60);
            self.__decelerationVelocityY = movedTop / timeOffset * (1000 / 60);

            // How much velocity is required to start the deceleration
            var minVelocityToStartDeceleration = self.options.paging || self.options.snapping ? 4 : 1;

            // Verify that we have enough velocity to start deceleration
            if (Math.abs(self.__decelerationVelocityX) > minVelocityToStartDeceleration || Math.abs(self.__decelerationVelocityY) > minVelocityToStartDeceleration) {

              // Deactivate pull-to-refresh when decelerating
              if (!self.__refreshActive) {
                self.__startDeceleration(timeStamp, callbackAfterPublish);
              }
            }
          } else {
            self.options.scrollingComplete(callbackAfterPublish);
          }
        } else if ((timeStamp - self.__lastTouchMove) > 100) {
          self.options.scrollingComplete(callbackAfterPublish);
        }
      }

      // If this was a slower move it is per default non decelerated, but this
      // still means that we want snap back to the bounds which is done here.
      // This is placed outside the condition above to improve edge case stability
      // e.g. touchend fired without enabled dragging. This should normally do not
      // have modified the scroll positions or even showed the scrollbars though.
      if (!self.__isDecelerating) {

        if (self.__refreshActive && self.__refreshStart) {

          // Use publish instead of scrollTo to allow scrolling to out of boundary position
          // We don't need to normalize scrollLeft, zoomLevel, etc. here because we only y-scrolling when pull-to-refresh is enabled
          if (typeof callbackAfterPublish === 'function') {
            callbackAfterPublish(self.__scrollLeft);
          }
          self.__publish(self.__scrollLeft, -self.__refreshHeight, self.__zoomLevel, true);

          if (self.__refreshStart) {
            self.__refreshStart();
          }

        } else {

          if (self.__interruptedAnimation || self.__isDragging) {
            self.options.scrollingComplete(callbackAfterPublish);
          }
          self.scrollTo(self.__scrollLeft, self.__scrollTop, true, self.__zoomLevel, callbackAfterPublish);

          // Directly signalize deactivation (nothing todo on refresh?)
          if (self.__refreshActive) {

            self.__refreshActive = false;
            if (self.__refreshDeactivate) {
              self.__refreshDeactivate();
            }

          }
        }
      }

      // Fully cleanup list
      self.__positions.length = 0;

    },



    /*
     ---------------------------------------------------------------------------
     PRIVATE API
     ---------------------------------------------------------------------------
     */

    /**
     * Applies the scroll position to the content element
     *
     * @param left {Number} Left scroll position
     * @param top {Number} Top scroll position
     * @param animate {Boolean?false} Whether animation should be used to move to the new coordinates
     */
    __publish: function(left, top, zoom, animate) {

      var self = this;

      // Remember whether we had an animation, then we try to continue based on the current "drive" of the animation
      var wasAnimating = self.__isAnimating;
      if (wasAnimating) {
        core.effect.Animate.stop(wasAnimating);
        self.__isAnimating = false;
      }

      if (animate && self.options.animating) {

        // Keep scheduled positions for scrollBy/zoomBy functionality
        self.__scheduledLeft = left;
        self.__scheduledTop = top;
        self.__scheduledZoom = zoom;

        var oldLeft = self.__scrollLeft;
        var oldTop = self.__scrollTop;
        var oldZoom = self.__zoomLevel;

        var diffLeft = left - oldLeft;
        var diffTop = top - oldTop;
        var diffZoom = zoom - oldZoom;

        var step = function(percent, now, render) {

          if (render) {

            self.__scrollLeft = oldLeft + (diffLeft * percent);
            self.__scrollTop = oldTop + (diffTop * percent);
            self.__zoomLevel = oldZoom + (diffZoom * percent);

            // Push values out
            if (self.__callback) {
              self.__callback(self.__scrollLeft, self.__scrollTop, self.__zoomLevel);
            }

          }
        };

        var verify = function(id) {
          return self.__isAnimating === id;
        };

        var completed = function(renderedFramesPerSecond, animationId, wasFinished) {
          if (animationId === self.__isAnimating) {
            self.__isAnimating = false;
          }
          if (self.__didDecelerationComplete || wasFinished) {
            self.options.scrollingComplete();
          }

          if (self.options.zooming) {
            self.__computeScrollMax();
            if(self.__zoomComplete) {
              self.__zoomComplete();
              self.__zoomComplete = null;
            }
          }
        };

        // When continuing based on previous animation we choose an ease-out animation instead of ease-in-out
        self.__isAnimating = core.effect.Animate.start(step, verify, completed, self.options.animationDuration, wasAnimating ? easeOutCubic : easeInOutCubic);

      } else {

        self.__scheduledLeft = self.__scrollLeft = left;
        self.__scheduledTop = self.__scrollTop = top;
        self.__scheduledZoom = self.__zoomLevel = zoom;

        // Push values out
        if (self.__callback) {
          self.__callback(left, top, zoom);
        }

        // Fix max scroll ranges
        if (self.options.zooming) {
          self.__computeScrollMax();
          if(self.__zoomComplete) {
            self.__zoomComplete();
            self.__zoomComplete = null;
          }
        }
      }
    },


    /**
     * Recomputes scroll minimum values based on client dimensions and content dimensions.
     */
    __computeScrollMax: function(zoomLevel) {

      var self = this;

      if (zoomLevel == null) {
        zoomLevel = self.__zoomLevel;
      }

      self.__maxScrollLeft = Math.max((self.__contentWidth * zoomLevel) - self.__clientWidth, 0);
      self.__maxScrollTop = Math.max((self.__contentHeight * zoomLevel) - self.__clientHeight, 0);

    },



    /*
     ---------------------------------------------------------------------------
     ANIMATION (DECELERATION) SUPPORT
     ---------------------------------------------------------------------------
     */

    /**
     * Called when a touch sequence end and the speed of the finger was high enough
     * to switch into deceleration mode.
     */
    __startDeceleration: function(timeStamp, callback) {

      var self = this;

      if (self.options.paging) {

        var scrollLeft = Math.max(Math.min(self.__scrollLeft, self.__maxScrollLeft), 0);
        var scrollTop = Math.max(Math.min(self.__scrollTop, self.__maxScrollTop), 0);
        var clientWidth = self.__clientWidth;
        var clientHeight = self.__clientHeight;

        // We limit deceleration not to the min/max values of the allowed range, but to the size of the visible client area.
        // Each page should have exactly the size of the client area.
        self.__minDecelerationScrollLeft = Math.floor(scrollLeft / clientWidth) * clientWidth;
        self.__minDecelerationScrollTop = Math.floor(scrollTop / clientHeight) * clientHeight;
        self.__maxDecelerationScrollLeft = Math.ceil(scrollLeft / clientWidth) * clientWidth;
        self.__maxDecelerationScrollTop = Math.ceil(scrollTop / clientHeight) * clientHeight;

      } else {

        self.__minDecelerationScrollLeft = 0;
        self.__minDecelerationScrollTop = 0;
        self.__maxDecelerationScrollLeft = self.__maxScrollLeft;
        self.__maxDecelerationScrollTop = self.__maxScrollTop;

      }

      // Wrap class method
      var step = function(percent, now, render) {
        self.__stepThroughDeceleration(render);
      };

      // How much velocity is required to keep the deceleration running
      var minVelocityToKeepDecelerating = self.options.snapping ? 4 : 0.1;

      // Detect whether it's still worth to continue animating steps
      // If we are already slow enough to not being user perceivable anymore, we stop the whole process here.
      var verify = function() {
        var shouldContinue = Math.abs(self.__decelerationVelocityX) >= minVelocityToKeepDecelerating || Math.abs(self.__decelerationVelocityY) >= minVelocityToKeepDecelerating;
        if (!shouldContinue) {
          self.__didDecelerationComplete = true;
        }
        return shouldContinue;
      };

      var completed = function(renderedFramesPerSecond, animationId, wasFinished) {
        self.__isDecelerating = false;
        if (self.__didDecelerationComplete) {
          self.options.scrollingComplete();
        }

        // Animate to grid when snapping is active, otherwise just fix out-of-boundary positions
        self.scrollTo(self.__scrollLeft, self.__scrollTop, self.options.snapping, null, callback);
      };

      // Start animation and switch on flag
      self.__isDecelerating = core.effect.Animate.start(step, verify, completed);

    },


    /**
     * Called on every step of the animation
     *
     * @param inMemory {Boolean?false} Whether to not render the current step, but keep it in memory only. Used internally only!
     */
    __stepThroughDeceleration: function(render) {

      var self = this;


      //
      // COMPUTE NEXT SCROLL POSITION
      //

      // Add deceleration to scroll position
      var scrollLeft = self.__scrollLeft + self.__decelerationVelocityX;
      var scrollTop = self.__scrollTop + self.__decelerationVelocityY;


      //
      // HARD LIMIT SCROLL POSITION FOR NON BOUNCING MODE
      //

      if (!self.options.bouncing) {

        var scrollLeftFixed = Math.max(Math.min(self.__maxDecelerationScrollLeft, scrollLeft), self.__minDecelerationScrollLeft);
        if (scrollLeftFixed !== scrollLeft) {
          scrollLeft = scrollLeftFixed;
          self.__decelerationVelocityX = 0;
        }

        var scrollTopFixed = Math.max(Math.min(self.__maxDecelerationScrollTop, scrollTop), self.__minDecelerationScrollTop);
        if (scrollTopFixed !== scrollTop) {
          scrollTop = scrollTopFixed;
          self.__decelerationVelocityY = 0;
        }

      }


      //
      // UPDATE SCROLL POSITION
      //

      if (render) {

        self.__publish(scrollLeft, scrollTop, self.__zoomLevel);

      } else {

        self.__scrollLeft = scrollLeft;
        self.__scrollTop = scrollTop;

      }


      //
      // SLOW DOWN
      //

      // Slow down velocity on every iteration
      if (!self.options.paging) {

        // This is the factor applied to every iteration of the animation
        // to slow down the process. This should emulate natural behavior where
        // objects slow down when the initiator of the movement is removed
        var frictionFactor = 0.95;

        self.__decelerationVelocityX *= frictionFactor;
        self.__decelerationVelocityY *= frictionFactor;

      }


      //
      // BOUNCING SUPPORT
      //

      if (self.options.bouncing) {

        var scrollOutsideX = 0;
        var scrollOutsideY = 0;

        // This configures the amount of change applied to deceleration/acceleration when reaching boundaries
        var penetrationDeceleration = self.options.penetrationDeceleration;
        var penetrationAcceleration = self.options.penetrationAcceleration;

        // Check limits
        if (scrollLeft < self.__minDecelerationScrollLeft) {
          scrollOutsideX = self.__minDecelerationScrollLeft - scrollLeft;
        } else if (scrollLeft > self.__maxDecelerationScrollLeft) {
          scrollOutsideX = self.__maxDecelerationScrollLeft - scrollLeft;
        }

        if (scrollTop < self.__minDecelerationScrollTop) {
          scrollOutsideY = self.__minDecelerationScrollTop - scrollTop;
        } else if (scrollTop > self.__maxDecelerationScrollTop) {
          scrollOutsideY = self.__maxDecelerationScrollTop - scrollTop;
        }

        // Slow down until slow enough, then flip back to snap position
        if (scrollOutsideX !== 0) {
          if (scrollOutsideX * self.__decelerationVelocityX <= 0) {
            self.__decelerationVelocityX += scrollOutsideX * penetrationDeceleration;
          } else {
            self.__decelerationVelocityX = scrollOutsideX * penetrationAcceleration;
          }
        }

        if (scrollOutsideY !== 0) {
          if (scrollOutsideY * self.__decelerationVelocityY <= 0) {
            self.__decelerationVelocityY += scrollOutsideY * penetrationDeceleration;
          } else {
            self.__decelerationVelocityY = scrollOutsideY * penetrationAcceleration;
          }
        }
      }
    }
  };

  // Copy over members to prototype
  for (var key in members) {
    Scroller.prototype[key] = members[key];
  }

})();

/* DOM-based rendering (Uses 3D when available, falls back on margin when transform not available) */
var render = (function(global, content) {
  var docStyle = document.documentElement.style;

  var engine;
  if (global.opera && Object.prototype.toString.call(opera) === '[object Opera]') {
    engine = 'presto';
  } else if ('MozAppearance' in docStyle) {
    engine = 'gecko';
  } else if ('WebkitAppearance' in docStyle) {
    engine = 'webkit';
  } else if (typeof navigator.cpuClass === 'string') {
    engine = 'trident';
  }

  var vendorPrefix = {
    trident: 'ms',
    gecko: 'Moz',
    webkit: 'Webkit',
    presto: 'O'
  }[engine];

  var helperElem = document.createElement("div");
  var undef;

  var perspectiveProperty = vendorPrefix + "Perspective";
  var transformProperty = vendorPrefix + "Transform";

  if (helperElem.style[perspectiveProperty] !== undef) {

    return function(left, top, zoom) {
      content.style[transformProperty] = 'translate(' + (-left) + 'px,' + (-top) + 'px) scale(' + zoom + ')';
      /* translate3d has a bug in safari (mobile). Content is hidden while transform */
      //content.style[transformProperty] = 'translate3d(' + (-left) + 'px,' + (-top) + 'px,0) scale(' + zoom + ')';
    };

  } else if (helperElem.style[transformProperty] !== undef) {

    return function(left, top, zoom) {
      content.style[transformProperty] = 'translate(' + (-left) + 'px,' + (-top) + 'px) scale(' + zoom + ')';
    };

  } else {

    return function(left, top, zoom) {
      content.style.marginLeft = left ? (-left/zoom) + 'px' : '';
      content.style.marginTop = top ? (-top/zoom) + 'px' : '';
      content.style.zoom = zoom || '';
    };

  }
});


window["OBR"]["OBPagerRenderer"] = render;
window["OBR"]["OBPager"] = Scroller;
window["OBR"]["extern"]["handshakeModule"]('PAGEREXTERNAL');

/**
 *
 * Liron Zluf
 * LzSwiper
 * CATS, Outbrain
 *
 */

window["OBR"]["OBPagerNew"] = function(sliderElements, params) {

  "use strict";

  var my = {},
    pub = {};

  // Dom prefixes for css selectors
  my.dom_prefixes = '-webkit-transform -moz-transform -ms-transform -o-transform transform'.split(' ');
  // Swiper default parameters
  my.params = {
    callback: null, // callback function when transition has ended
    rtl: false, // enable Right to Left mode
    showButtons: false, // show Pagination buttons
    spacing: 0, // Slide spacing
    autoSlideIntervalMsec: 2000, // Auto mode interval between slides
    infiniteLoop: false, // Infinite loop mode,
    offsetFromStart: 10,
    offsetFromEnd: 15,
    nextSlideHint: 'recommendationHint',
    isTextOnImage: false,
    scrollingY: false
  };
  my.autoSlideInterval = null; // Interval object for auto mode
  my.domReferenceElements = {
    slider: null, // The slider div
    wrapper: null, // The slider wrapper (ul element)
    slides: null // The slides (li elements)
  };
  my.positions = [];
  my.currentPos = 0;
  my.slideWidth = 0;
  my.index = 0;
  my.startIndex = 0;
  my.numberOfSlides = 0;
  my.mouseDown = false;
  my.windowOverflow = null;

  /**
   * Adds a class to a dom element
   * @param el
   * @param className
   */
  my.addClass = function (el, className) {
    if (!el) {
      return;
    }
    var pattTxt = "[ '\"|]" + className + "[ '\"|]";//pipe to save end of line treatment
    var patt = new RegExp(pattTxt);
    if (el.classList) {
      el.classList.add(className);
    }
    else if (!patt.test("|" + el.className + "|")) {
      el.className += " " + className;
    }
  };

  /**
   * Removes a class from a dom element
   * @param el
   * @param className
   */
  my.removeClass = function (el, className) {
    if (!el) {
      return;
    }

    if (el.classList) {
      el.classList.remove(className);
    }
    else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className + '(\\b|$)', 'gi'), ' ');
    }
  };

  /**
   * Extend / Merge an object
   * @param obj
   * @param src
   * @returns {*}
   */
  my.extend = function (obj, src) {
    if (src) {
      if (typeof Object.assign === 'function') {
        return Object.assign({},obj,src);
      }
      for (var key in src) {
        if (src.hasOwnProperty(key)) {
          obj[key] = src[key];
        }
      }
    }
    return obj;
  };

  /**
   * Clones the last slide and inserts it before the first slide
   */
  my.cloneSlides = function () {
    if (my.params.infiniteLoop) {
      var firstSlide = my.domReferenceElements.slides[0];
      var lastSlide = my.domReferenceElements.slides[my.domReferenceElements.slides.length - 1];
      var cloneLast = lastSlide.cloneNode(true);
      my.domReferenceElements.wrapper.insertBefore(cloneLast, firstSlide);
    }
  };

  /**
   * binds the touches/clicks/transition events to the swiper
   */
  my.bindUIEvents = function () {
    /*Transition End (used for callback function)*/
    my.domReferenceElements.wrapper.addEventListener('transitionend', my.transitionEnd, false);
  };

  /**
   *
   * @param event
   */
  my.transitionEnd = function (event) {
    // Go to the first slide (which is same as the last one) without transition when
    // the loop mode activated and current slide is the last slide
    if (my.params.infiniteLoop && my.index === my.numberOfSlides) {
      my.removeClass(my.domReferenceElements.wrapper, 'animate');
      my.setTransform(0);
      my.index = 0;
      my.currentPos = my.positions[my.index];
    }
    // Go to the last slide (which is the same as the first one) without transition when
    // the loop mode activated and current slide is the first slide
    else if (my.params.infiniteLoop && my.index === 0) {
      my.index = my.numberOfSlides;
      my.removeClass(my.domReferenceElements.wrapper, 'animate');
      my.setTransform(my.positions[my.index]);
      my.currentPos = my.positions[my.index];
      my.index = my.numberOfSlides - 1;
    }
    // Stop autoslide when Auto mode is activated and Loop mode is off and we're on the last slide
    else if (my.params.auto && !my.params.infiniteLoop && my.index === my.numberOfSlides) {
      pub.stopAutoSlide();
    }
    // if callback function has been supplied as parameter, call it
    if (my.params.callback) {
      my.params.callback(my.index);
    }
  };

  my.checkNextTouch = function(){
    window.ontouchmove = function(e) {
      if (!my.isDescendant(my.domReferenceElements.slider, e.target)) {
        my.resumeScrolling();
      }
    };
    setTimeout(my.resumeScrolling,500);
  };


  /**
   * Determines if an HTMLElement is a descendant of another
   * @param parent
   * @param child
   * @returns {boolean}
   */
  my.isDescendant = function(parent,child){
    var node = child.parentNode;
    while (node !== null) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  };

  my.bindResize = function (event) {
    window.addEventListener('resize', pub.resizeEvent, false);
  };

  /**
   * Inits Pagination buttons based on current slide
   */
  my.showButtons = function () {
    if (my.params.showButtons) {
      var paginationRightDiv = document.createElement('DIV');
      var paginationRight = document.createElement('IMG');
      paginationRight.src = 'https://widgets.outbrain.com/images/widgetIcons/right-arrow.png';
      paginationRight.style.right = '5px';
      paginationRightDiv.classList.add('ob-swipe-pagination-container');
      paginationRightDiv.classList.add('ob-pagination-right');
      paginationRightDiv.style.top = '60%';
      paginationRightDiv.appendChild(paginationRight);
      my.domReferenceElements.slider.appendChild(paginationRightDiv);
      my.domReferenceElements.paginationRight = paginationRightDiv;


      var paginationLeftDiv = document.createElement('DIV');
      var paginationLeft = document.createElement('IMG');
      paginationLeft.src = 'https://widgets.outbrain.com/images/widgetIcons/left-arrow.png';
      paginationLeft.style.left = '5px';
      paginationLeftDiv.classList.add('ob-swipe-pagination-container');
      paginationLeftDiv.classList.add('ob-pagination-left');
      paginationLeftDiv.style.top = '60%';
      paginationLeftDiv.appendChild(paginationLeft);
      my.domReferenceElements.slider.appendChild(paginationLeftDiv);
      my.domReferenceElements.paginationLeft = paginationLeftDiv;
      if (my.params.rtl) {
        paginationLeftDiv.style.display = 'block';
      }
      else {
        paginationRightDiv.style.display = 'block';
      }
      paginationLeftDiv.onclick = function (event) {
        my.mouseDown = false;
        event.stopPropagation();
        event.preventDefault();
        my.pagination('left');
      };
      paginationRightDiv.onclick = function (event) {
        my.mouseDown = false;
        event.stopPropagation();
        event.preventDefault();
        my.pagination('right');
      };
    }
  };

  /**
   * Moves the slide left or right based on pagination button click
   * @param side
   */
  my.pagination = function (side) {
    my.removeClass(my.domReferenceElements.wrapper, 'animate');
    my.removeClass(my.domReferenceElements.wrapper, 'fast');
    if (side && typeof side === 'string') {
      if (side === 'right') {
        if (my.index < my.numberOfSlides) {
          my.increaseIndex();
        }
      }
      else {
        if (my.index !== 0) {
          my.decreaseIndex();
        }
      }
      my.moveSlide();
    }
  };

  /**
   * Update the pagination buttons viewability
   */
  my.updateButtons = function () {
    if (my.params.showButtons) {
      if (my.index === 0) {
        my.domReferenceElements.paginationLeft.style.display = 'none';
        my.domReferenceElements.paginationRight.style.display = 'block';
      }
      else if (my.index === my.numberOfSlides) {
        my.domReferenceElements.paginationRight.style.display = 'none';
        my.domReferenceElements.paginationLeft.style.display = 'block';
      }
      else {
        my.domReferenceElements.paginationLeft.style.display = 'block';
        my.domReferenceElements.paginationRight.style.display = 'block';
      }
    }
  };

  /**
   * ReInit the swiper based on current viewport
   */
  pub.resizeEvent = function () {
    my.setSlideSize();
    my.initPositions();
    my.moveSlide();
  };

  /**
   * Increase the slide index
   */
  my.increaseIndex = function () {
    my.index++;
    my.updateButtons();
  };

  /**
   * Decrease the slide index
   */
  my.decreaseIndex = function () {
    my.index--;
    my.updateButtons();
  };

  /**
   * Moves the slide and saves the current position
   */
  my.moveSlide = function () {
    my.addClass(my.domReferenceElements.wrapper, 'animate');
    my.currentPos = my.positions[my.index];
    my.setTransform(my.positions[my.index]);
  };

  my.preventDefault = function(e){
    e.preventDefault();
    e.stopPropagation();
  };

  my.stopScrolling = function(){
    if (!my.windowOverflow){
      my.windowOverflow = document.body.style.overflow;//Take overflow once
    }
    document.body.style.overflow = 'hidden !important';
    document.body.addEventListener('touchmove', my.preventDefault);
    my.checkNextTouch();
  };

  my.resumeScrolling = function(){
    document.body.style.overflow = my.windowOverflow !== null ? my.windowOverflow : 'auto';
    document.body.removeEventListener('touchmove', my.preventDefault);
  };

  /**
   * Inits the positions array based on if centeredSlides mode is activated or not
   */
  my.initPositions = function () {
    my.positions = [];
    // If centeredSlides mode is activated
    // Set first and last view to 2 slides per view
    // Set each other view to 3 slides per view, when the middle slide is centered
    if (my.params.centeredSlides) {
      //the next position on x axis that the second slide is in the middle.
      //to calculate this position we need to "bite" a piece (this dist) from the 0 slide so it can peek from the right side ] [] [
      var xOffset = (my.domReferenceElements.slider.clientWidth - my.slideWidth - (my.getSlideSpacing() * 2)) / 2;
      my.positions[0] = 0;

      // recalculate the center position using the offset
      if (!my.params.rtl) {
        xOffset -= my.params.offsetFromStart;
      }
      else {
        xOffset -= my.getSlideSpacing()/2;
        xOffset += my.params.offsetFromStart/2;
      }
      my.positions[1] = my.slideWidth - xOffset;
      for (var i = 2; i <= my.numberOfSlides; i += 1) {
        my.positions[i] = my.positions[i - 1] + my.slideWidth + my.getSlideSpacing();
      }
      my.positions[my.numberOfSlides] -= xOffset + my.getSlideSpacing();
      // offset the last slide (first slide in rtl)
      if (my.params.rtl) {
        my.positions[my.numberOfSlides] += my.params.offsetFromStart - my.getSlideSpacing();
        if (my.params.nextSlideHint === 'arrow-hint') {
          for (var i = 1; i < my.numberOfSlides; i += 1) {
            my.positions[i] -= my.getSlideSpacing() / 2;
          }
        }
      }
    }
    // One slide per view
    else {
      for (var i = 0; i <= my.numberOfSlides; i++) {
        my.positions[i] = i * my.slideWidth;
      }
    }
  };

  /**
   * Sets the transform css attribute to the wrapper element
   * @param x
   */
  my.setTransform = function (x) {
    x = x * -1;
    // Disable bounce/spring effect on starting and ending slide
    //else if (x < 0){
    //    x = 0;
    //}
    // else if (x > my.numberOfSlides * my.slideWidth){
    //    x = (my.numberOfSlides - 1) * my.slideWidth;
    //}
    for (var k in my.dom_prefixes) {
      my.domReferenceElements.wrapper.style[my.dom_prefixes[k]] = 'translate(' + x + 'px,0)';
    }
  };

  my.getSlideSpacing = function () {
    return my.params.spacing;
  };

  /**
   * Sets each slide size based on slider width
   */
  my.setSlideSize = function () {
    // If slide perecent parameter was supplied, multiply the slide ratio with it (mainly used with centered slides mode)
    var slideWidth = my.domReferenceElements.slider.clientWidth * (my.params.slidePercent ? my.params.slidePercent : 1),
      slides = my.domReferenceElements.slides;

    for (var i = 0; i < slides.length; i += 1) {
      my.setSlideStyle(slides[i], slideWidth);
    }

    my.slideWidth = slideWidth;
    my.setWrapperStyle();
  };

  my.setRecTextStyle = function(rec) {
    var recTextElement = rec.getElementsByClassName('ob-rec-text');
    var imgElement = rec.getElementsByClassName('ob-rec-image');
    if (recTextElement && recTextElement[0] && imgElement && imgElement[0]) {
      recTextElement[0].style.width = parseInt(rec.style.width,10) + 'px';
    }
  };

  my.setWrapperStyle = function () {
    var wrapper = my.domReferenceElements.wrapper;
    var width = my.slideWidth * my.domReferenceElements.slides.length;
    if (my.params.rtl) {
      width += my.numberOfSlides * my.getSlideSpacing() + my.getSlideSpacing();
    }
    else {
      width += my.numberOfSlides * my.getSlideSpacing() * 2;
    }
    wrapper.style.width = width + 'px';
  };

  my.setSlideStyle = function (slide, slideWidth) {
    slide.style.width = slideWidth + 'px';
    slide.style.margin = '0 ' + my.getSlideSpacing() + 'px 0 0';
    slide.style.float = my.params.rtl ? 'right' : 'left';
    if (my.params.isTextOnImage) {
      my.setRecTextStyle(slide);
    }
  };

  my.initInfiniteLoop = function(){
    if (my.params.infiniteLoop) {
      my.startIndex = my.index = 1;
      my.currentPos = my.positions[my.startIndex];
      my.setTransform(my.positions[my.startIndex]);
    }
  };

  my.initRTLMode = function(){
    // If RTL Mode is activated set the first slide coming to view to the last slide
    // And move the view to it
    if (my.params.rtl) {
      my.currentPos = my.positions[my.numberOfSlides];
      my.setTransform(my.positions[my.numberOfSlides]);
      my.index = my.numberOfSlides;
    }
    else {
      my.currentPos = my.positions[0];
      my.setTransform(my.positions[0]);
    }
  };

  my.initRecommendationHint = function(){
    if (my.params.nextSlideHint === 'arrow-hint') {
      my.params.showButtons = true;
      my.params.centeredSlides = true;
      my.params.spacing = my.domReferenceElements.slider.clientWidth - my.domReferenceElements.slider.clientWidth * (my.params.slidePercent ? my.params.slidePercent : 1);
    }
  };

  pub.getNumberOfSlides = function () {
    return my.numberOfSlides;
  };

  pub.getSlideWidth = function () {
    return my.slideWidth;
  };

  pub.getSlideIndex = function () {
    return my.index;
  };

  /**
   * start auto slide mode
   * put it on hold when user clicks or swipes
   */
  pub.startAutoSlide = function () {
    if (my.params.auto) {
      my.params.autoSlideInterval =
        setInterval(function () {
          if (!my.mouseDown) {
            if (my.index === my.numberOfSlides) {
              my.index = my.startIndex;
            } else {
              my.increaseIndex();
            }
            my.moveSlide();
          }
        }, my.params.autoSlideIntervalMsec);
    }
  };

  pub.stopAutoSlide = function () {
    clearInterval(my.params.autoSlideInterval);
  };

  /**
   * public function for touch start event
   * @param event
   * @param timestamp
   */
  pub.doTouchStart = function (event, timestamp) {
    if (event) {
      my.stopScrolling();
      my.timerStart = timestamp;
      my.mouseDown = true;

      // Get the original touch position.
      my.touchstartx = event.pageX || event[0].pageX;
      my.touchstarty = event.pageY || event[0].pageY;

      // The movement gets all janky if there's a transition on the elements.
      my.removeClass(my.domReferenceElements.wrapper, 'animate');
      my.removeClass(my.domReferenceElements.wrapper, 'fast');
    }
  };

  /**
   * public function for touch move event
   * @param event
   * @param timestamp
   */
  pub.doTouchMove = function (event) {
    if (my.mouseDown && event) {
      // Continuously return touch position.
      my.touchmovex = event.touches.pageX || event.touches[0].pageX;
      my.touchmovey = event.touches.pageY || event.touches[0].pageY;
      // Calculate distance to translate wrapper.
      my.movex = my.currentPos + (my.touchstartx - my.touchmovex);
      my.movey = Math.abs(my.touchstarty - my.touchmovey);
      if (my.params.scrollingY && my.movey > Math.abs(my.currentPos - my.movex)) {
        my.scrollYDetected = true;
        my.resumeScrolling();
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      my.wasSwiped = true;
      // Move by distance calculated, make the wrapper stop moving when there is no more content.
      if (!my.scrollYDetected && my.movex < ((my.numberOfSlides + 2) * my.slideWidth)) {
        my.setTransform(my.movex);
      }
    }
  };

  /**
   * public function for touch end event
   * @param timestamp
   * @param callback
   */
  pub.doTouchEnd = function (timestamp, callback) {
    // no touch on scroller
    if (!my.mouseDown) {
      return;
    }
    my.mouseDown = false;
    //if (my.params.nextSlideHint === 'arrow-hint' && my.params.rtl) {
    //  my.movex -= my.slideWidth + 2 * my.getSlideSpacing();
    //}
    // Calculate the time touched
    var diff = timestamp - my.timerStart;
    // Calculate the distance swiped.
    var absMove = Math.abs(my.positions[my.index] - my.movex);
    // Check if the swipe was acceptable for slide change
    if (my.wasSwiped && absMove > 2 && diff > 50 && diff < 350 || absMove > (my.slideWidth / 5) && diff > 120) {
      // add fast swipe class - large distance in small time
      //if (absMove >= 100 && diff < 180) {
      //  my.addClass(my.domReferenceElements.wrapper, 'fast');
      //}
      // Increase or decrease index based on direction
      if (my.movex > my.positions[my.index] && my.index < my.numberOfSlides) {
        my.increaseIndex();
      } else if (my.movex <= my.positions[my.index] && my.index > 0) {
        my.decreaseIndex();
      }
    }
    my.wasSwiped = false;
    my.scrollYDetected = false;
    // Move and animate the elements.
    my.moveSlide();
  };

  /**
   * Init
   * @param sliderElements
   * @param params
   */
  pub.init = function (sliderElements, params) {
    my.domReferenceElements = sliderElements;
    my.params = my.extend(my.params, params);
    my.cloneSlides();
    my.numberOfSlides = my.domReferenceElements.slides.length - 1;
    my.initRecommendationHint();
    my.setSlideSize();
    my.initPositions();
    my.bindUIEvents();
    my.bindResize();
    my.initRTLMode();
    my.initInfiniteLoop();
    my.showButtons();
    pub.startAutoSlide();
  };

  pub.init(sliderElements, params);
  return pub;

};



window["OBR"]["extern"]["handshakeModule"]('PAGEREXTERNALNEW');