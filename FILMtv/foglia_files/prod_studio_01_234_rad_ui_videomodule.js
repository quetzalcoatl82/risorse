self.studioLoader.context.evalInContext("window.STUDIO_SDK_START=+new Date();var To=function(a,b){this.messageName=a;this.parameters=b||{}},Uo=function(a,b){ze.call(this,a.messageName,b);this.params=a.parameters||{}};z(Uo,ze);var Zo=function(){if(window.googleJsEnvironment&&(\"rhino\"==window.googleJsEnvironment.environment||\"jscore\"==window.googleJsEnvironment.environment))return new Vo;if(pj&&window.external&&\"notify\"in window.external)return new Wo;if(oj&&window.googleAdsJsInterface&&\"notify\"in window.googleAdsJsInterface)try{return window.googleAdsJsInterface.notify(\"gmsg://mobileads.google.com/noop\"),new Vo}catch(a){}else if(window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers.gadGMSGHandler)return new Xo;return new Yo},ap=function(){$o||($o=Zo());return $o},$o=null,bp=function(){};z(bp,I);var cp=function(a){var b=\"gmsg://mobileads.google.com/\"+a.messageName,c=Gb(a.parameters);c[\"google.afma.Notify_dt\"]=(new Date).getTime();a={};for(var d in c){var e=encodeURIComponent(String(d));a[e]=c[d]}d=[];for(var f in a)eg(f,a[f],d);return dg(b,d.join(\"&\"))},dp=function(a,b){this.h=a;this.j=b||1;this.g=[];this.f=new kf(this.j);this.l=new L(this);M(this.l,this.f,\"tick\",this.s,void 0)};z(dp,bp);dp.prototype.sendMessage=function(a){this.g.push(a);this.f.xa||(a=this.g.shift(),this.h(a),this.f.start())};dp.prototype.s=function(){var a=this.g.shift();a?this.h(a):this.f.stop()};var Wo=function(){};z(Wo,bp);Wo.prototype.sendMessage=function(a){a=cp(a);window.external.notify(a)};var Yo=function(){dp.call(this,this.w);this.a=[];this.b=0};z(Yo,dp);Yo.prototype.w=function(a){var b=this.a[this.b];b||(b=document.createElement(\"IFRAME\"),b.id=\"afma-notify-\"+(new Date).getTime(),b.style.display=\"none\",this.a[this.b]=b);this.b=(this.b+1)%25;a=cp(a);b.src=a;b.parentNode||document.body.appendChild(b)};Yo.prototype.v=function(){this.a.forEach(jd);this.a=[];Yo.o.v.call(this)};var Vo=function(){};z(Vo,bp);Vo.prototype.sendMessage=function(a){a=cp(a);window.googleAdsJsInterface.notify(a);window.googleAdsJsInterface.DEBUG&&console.log(a)};var Xo=function(){};z(Xo,bp);Xo.prototype.sendMessage=function(a){a=cp(a);window.webkit.messageHandlers.gadGMSGHandler.postMessage(a)};var ep=function(){J.call(this);this.b=ap();this.b=ap();xe(this,this.b);this.a={}};z(ep,J);ep.prototype.sendMessage=function(a,b){var c;n(a)?c=new To(a,b):a instanceof To&&(c=a);\"loading\"==document.readyState?(a=x(this.b.sendMessage,this.b,c),Ue(h,\"DOMContentLoaded\",a,!1,this)):this.b.sendMessage(c)};ep.prototype.receiveMessage=function(a,b){\"onshow\"==a&&\"loading\"==document.readyState?(a=x(fp,h,a,b),Ue(h,\"DOMContentLoaded\",a)):this.dispatchEvent(new Uo(new To(a,b),this))};ep.prototype.addObserver=function(a,b,c){c=x(c,b);var d=x(function(a){c(a.type,a.params)},b);this.za(a,d);this.a[a]||(this.a[a]={});this.a[a][b]=d};ep.prototype.removeObserver=function(a,b){this.a[a]&&this.a[a][b]&&(this.Ha(a,this.a[a][b]),delete this.a[a][b])};var hp=function(a,b){h.AFMA_Communicator?h.AFMA_Communicator.sendMessage(a,b):gp(a,b)},gp=function(a,b){\"loading\"==document.readyState?(a=x(gp,null,a,b),Ue(h,\"DOMContentLoaded\",a,!1)):(a=new To(a,b),ap().sendMessage(a))},fp=function(a,b){h.AFMA_Communicator.receiveMessage(a,b)},ip=function(a,b,c,d){h.AFMA_Communicator.removeEventListener(a,b,c,d)},jp=function(a,b,c,d){h.AFMA_Communicator.addEventListener(a,b,c,d)},kp=function(a,b,c){h.AFMA_Communicator.addObserver(a,b,c)},lp=function(a,b){h.AFMA_Communicator.removeObserver(a,b)};h.AFMA_Communicator||(r(\"AFMA_AddEventListener\",jp,h),r(\"AFMA_RemoveEventListener\",ip,h),r(\"AFMA_AddObserver\",kp,h),r(\"AFMA_RemoveObserver\",lp,h),r(\"AFMA_ReceiveMessage\",fp,h),r(\"AFMA_SendMessage\",hp,h),h.AFMA_Communicator=new ep);r(\"google.afma.support.blockPageClosed\",function(){hp(\"delayPageClosed\",{start:1})},void 0);r(\"google.afma.support.unblockPageClosed\",function(){hp(\"delayPageClosed\",{stop:1})},void 0);r(\"google.afma.support.blockPageLoaded\",function(){hp(\"delayPageLoaded\",{start:1})},void 0);var mp=function(){hp(\"delayPageLoaded\",{stop:1})};r(\"google.afma.support.unblockPageLoaded\",mp,void 0);r(\"google.afma.support.cancelPageLoaded\",function(){var a;if(a=qj())l(kj)||(kj=qj()?(a=lj().match(/afma\\-sdk\\-a\\-v\\.?([\\d+\\.]+)/))?a[1]:\"\":\"\"),a=kj,a=!(a&&0<=sb(a,\"9047000.0.0\"));a?mp():hp(\"delayPageLoaded\",{cancel:1})},void 0);r(\"google.afma.support.disableBackButton\",function(a){hp(\"backButton\",{disabled:a})},void 0);r(\"google.afma.support.notifyRewardedVideoStart\",function(){hp(\"reward\",{action:\"video_start\"})},void 0);r(\"google.afma.support.notifyRewardedVideoComplete\",function(){hp(\"reward\",{action:\"video_complete\"})},void 0);r(\"google.afma.support.grantReward\",function(a){var b={action:\"grant\"};a?(b.amount=a.amount,b.type=a.type):b.amount=0;hp(\"reward\",b)},void 0);var np=function(a){var b=md($c(document),\"IMG\");b.style.visibility=\"hidden\";b.style.width=\"0px\";b.style.height=\"0px\";b.src=a;b.onload=function(){b.src=\"\"};document.body.appendChild(b)},op=function(a){if(a&&gb(a,\"intent:\")){var b=a.indexOf(\"#Intent;\");if(!(0>b)){var c={id:a,url:a.substr(9,b-9)};a=a.substr(b+8).split(\";\");b=\"\";for(var d=0;d<a.length;d++){var e=a[d].split(\"=\");if(2==e.length)switch(e[0]){case \"package\":c.Ya=e[1];break;case \"action\":c.action=e[1];break;case \"scheme\":b=e[1]}}b&&(c.url=b+\"://\"+c.url);return c}}},pp=function(){var a;nj?(l(gj)||(gj=(a=/CPU\\s+(?:(?:i?OS)|(?:iPhone)|(?:iPhone\\s+OS))\\s+([0-9_|\\.]+)/.exec(lj()))&&2==a.length?a[1].replace(/_/g,\".\"):\"\"),a=0<=sb(gj,9)):a=!1;return a};r(\"google.afma.support.canOpenURLs\",function(a,b,c,d){var e=c||function(){};c=d||500;var f=a instanceof Array?a:[a];if(pp()){a={};for(c=0;c<f.length;++c)a[f[c]]=!0;b(\"openableURLs\",a)}else{a=f.join(\",\");var k=!1,m=function(a){ip(\"openableURLs\",m);if(!k){k=!0;for(var c=Gb(a.params),d=0;d<f.length;++d){var e=f[d],t=Mb(e);t=c[t];null!=t&&(c[e]=t)}b(a.type,c)}};jp(\"openableURLs\",m);hp(\"canOpenURLs\",{urls:a});setTimeout(function(){k||(k=!0,e())},c)}},void 0);r(\"google.afma.support.canOpenIntents\",function(a,b,c,d){if(!qj())return!1;var e=c||function(){};c=d||500;var f=!1,k={},m=function(a){ip(\"openableIntents\",m);if(!f){f=!0;var c=Gb(a.params),d={},e;for(e in c)d[k[e]]=c[e];b(a.type,d)}};d=[];for(var t=0;t<a.length;++t){var q=a[t],E=Rb(q.id).toString();k[E]=q.id;E={id:E};q.url&&(E.u=q.url);if(q.url&&(gb(q.url,\"intent:\")||gb(q.url,\"Intent#\"))){E.intent_url=q.url;delete E.u;var O=op(q.url);O&&(O.url&&(E.u=O.url),O.Ya&&(E.p=O.Ya),O.action&&(E.i=O.action))}q.mimeType&&(E.m=q.mimeType);q.Ya&&(E.p=q.Ya);q.action&&(E.i=q.action);d.push(E)}a={intents:d};jp(\"openableIntents\",m);hp(\"canOpenIntents\",{data:JSON.stringify(a)});setTimeout(function(){f||(f=!0,e())},c);return!0},void 0);r(\"google.afma.support.trackActiveViewUnit\",function(){hp(\"trackActiveViewUnit\")},void 0);r(\"google.afma.support.untrackActiveViewUnit\",function(){hp(\"untrackActiveViewUnit\")},void 0);r(\"google.afma.support.sendInstrumentGmsg\",function(a){hp(\"instrument\",a)},void 0);jp(\"onshow\",function(){});jp(\"onhide\",function(){});gg(window.location.href,\"canvasLogLevel\");rj();var qp=function(a,b){J.call(this);this.b=a;this.b.id||(this.b.id=Ca(this).toString());this.f=b};z(qp,J);g=qp.prototype;g.Pa=!1;g.mc=!1;g.Ka=!1;g.getConfig=function(){return Gb(this.b)};g.setConfig=function(a){Ib(this.b,a);rp(this)};g.incrementMetricCounter=function(a,b){this.f.getEnvironment().incrementCounter((this.b.name||this.b.id)+\" - \"+a,b)};g.addEventListener=function(a,b,c,d){\"boolean\"==typeof c?qp.o.addEventListener.call(this,a,b,c,d):qp.o.addEventListener.call(this,a,b,c.capture,d)};g.removeEventListener=function(a,b,c,d){\"boolean\"==typeof c?qp.o.removeEventListener.call(this,a,b,c,d):qp.o.removeEventListener.call(this,a,b,c.capture,d)};g.getElement=function(){return this.A};g.setElement=function(a){this.A=a;rp(this)};var rp=function(a){a.getElement();a.getConfig();a.dispatchEvent(\"configured\")},sp=function(a){a.j||(a.j=new L(a));return a.j};g=qp.prototype;g.ab=function(){this.mc=!0;this.dispatchEvent(\"load\")};g.isLoaded=function(){return this.mc};g.isBound=function(){return this.Pa};g.isVisible=function(){return this.Ka};g.load=function(){this.lc()};g.lc=function(){this.ab()};g.createDom=function(){this.setElement(document.createElement(\"DIV\"))};g.bind=function(){this.Pa=!0};g.present=function(){this.Ka=!0;this.dispatchEvent(\"visible\")};g.dismiss=function(){this.Ka=!1;this.dispatchEvent(\"hidden\")};g.unbind=function(){this.j&&(this.j.dispose(),this.j=null);this.Pa=!1};g.v=function(){this.Pa&&this.unbind();delete this.A;qp.o.v.call(this)};var up=function(a,b){qp.call(this,a,b);this.w=this.getConfig().id;this.h=this.getConfig().sources||[];this.s=\"block\";this.l=null;this.a=document.createElement(\"VIDEO\");this.a.autoplay=this.getConfig().autoplay;this.a.controls=this.getConfig().controls;this.a.loop=this.getConfig().loop;this.a.muted=this.getConfig().muted;this.a.setAttribute(\"webkit-playsinline\",!0);this.a.setAttribute(\"x-webkit-airplay\",\"allow\");this.a.style.width=\"100%\";this.a.style.height=\"100%\";this.l=ri(tp)};z(up,qp);var tp=Rc(\".canvas-component-video-movie-hidden\",{\"-webkit-transform\":\"translateX(-10000px)\"});g=up.prototype;g.R=function(){return this.a};g.bind=function(){up.o.bind.call(this);var a;if(a=oj&&!rj())oj?(l(fj)||(fj=(a=/Android\\s+([0-9.]+)/.exec(lj()))&&2==a.length?a[1]:\"\"),a=parseFloat(fj)||0):a=0,a=4==a;if(a&&this.R()){var b=oj?3:1;a=oj?\"durationchange\":\"loadedmetadata\";this.R().readyState&&this.R().readyState>=b&&1<this.R().duration?this.tb():(b=sp(this),M(b,this.R(),a,this.tb,void 0))}a=sp(this);M(a,this.R(),\"playing pause stalled play ended volumechange\".split(\" \"),this.dispatchEvent,void 0);(a=this.R())&&this.f.getEnvironment().trackVideo(this.w,a,this.getConfig().autoplay)};g.present=function(){up.o.present.call(this);if(1==this.h.length){var a=this.f.getEnvironment().getFilename(this.h[0]);this.R().src=a}else{a=this.a;for(var b;b=a.firstChild;)a.removeChild(b);for(a=0;a<this.h.length;a++)b=document.createElement(\"SOURCE\"),b.src=this.f.getEnvironment().getFilename(this.h[a]),this.R().appendChild(b)}this.getElement().appendChild(this.R());this.getConfig().autoplay&&this.R().paused&&this.R().play()};g.dismiss=function(){this.R().paused||this.R().pause();up.o.dismiss.call(this)};g.tb=function(a){var b=this.R();a&&a.type&&Fg(sp(this),b,a.type,this.tb);\"-webkit-box\"!=this.s&&(this.s=\"-webkit-box\",mi(this.getElement(),{\"-webkit-box-align\":\"center\",\"-webkit-box-pack\":\"center\"}),mi(this.getElement(),\"display\",this.s),a=this.R())&&(a.style.display=\"\");a=b.videoWidth/b.videoHeight;var c=this.getElement();b:{var d=Zc(c);if(d.defaultView&&d.defaultView.getComputedStyle&&(d=d.defaultView.getComputedStyle(c,null))){d=d.display||d.getPropertyValue(\"display\")||\"\";break b}d=\"\"}if(\"none\"!=(d||(c.currentStyle?c.currentStyle.display:null)||c.style&&c.style.display))d=pi(c);else{d=c.style;var e=d.display,f=d.visibility,k=d.position;d.visibility=\"hidden\";d.position=\"absolute\";d.display=\"inline\";c=pi(c);d.display=e;d.position=k;d.visibility=f;d=c}e=d.width;c=d.height;a>d.width/d.height?c=d.width/a:e=d.height*a;a=e;if(a instanceof Xc)c=a.height,a=a.width;else if(void 0==c)throw Error(\"missing height argument\");b.style.width=oi(a);b.style.height=oi(c)};g.unbind=function(){this.f.getEnvironment().untrackVideo(this.w);up.o.unbind.call(this)};g.v=function(){this.l&&si(this.l);this.h=this.l=this.a=null;up.o.v.call(this)};var vp=function(){};g=vp.prototype;g.position=\"absolute\";g.height=100;g.width=100;g.x=0;g.y=0;g.z=1;g.opacity=1;g.rotation=0;var wp=function(){};z(wp,vp);wp.prototype.expanded=!1;wp.prototype.isDefault=!1;var xp=function(a,b){qp.call(this,a,b)};z(xp,qp);xp.prototype.removeChild=function(a,b){Ya(this.a[p(b)?b:1],a);Fg(sp(this),a,\"configured\",this.s)};xp.prototype.s=function(){this.isLoaded()&&this.isVisible()&&yp(this)};xp.prototype.lc=function(){zp(this,0)};var zp=function(a,b){var c=0,d=x(function(a){a.target.removeEventListener(\"load\",d,!1);c--;0==c&&zp(this,b+1)},a);if(a.a&&a.a.length>b){var e=a.a[b];if(u(e)&&0<e.length)for(c=e.length,a=0;a<e.length;a++)e[a].addEventListener(\"load\",d,!1),e[a].load();else zp(a,b+1)}else a.ab()},Bp=function(a,b){if(u(a.a))for(var c=0;c<a.a.length;c++)Ap(a,b,c)},Ap=function(a,b,c){u(a.a)&&(c=a.a[c],u(c)&&B(c,b,a))};xp.prototype.bind=function(){xp.o.bind.call(this);Bp(this,function(a){Cp(this,a);a.bind()})};var Cp=function(a,b){var c=a.getElement();kd(b.getElement(),function(a){return a==c})||hd(c,b.getElement())};xp.prototype.present=function(){u(this.a)?yp(this):xp.o.present.call(this)};var yp=function(a){var b=0,c=0,d=x(function(a){a.target.removeEventListener(\"visible\",d,!1);a.stopPropagation();c++;b==c&&(this.Ka=!0,this.dispatchEvent(\"visible\"))},a);Bp(a,function(a){b++;a.addEventListener(\"visible\",d,!1);a.present()})};xp.prototype.dismiss=function(){u(this.a)?Dp(this):xp.o.dismiss.call(this)};var Dp=function(a){var b=0,c=0,d=x(function(a){a.target.removeEventListener(\"hidden\",d,!1);a.stopPropagation();c++;b==c&&(this.Ka=!1,this.dispatchEvent(\"hidden\"))},a);Bp(a,function(a){b++;a.addEventListener(\"hidden\",d,!1);a.dismiss()})};xp.prototype.unbind=function(){Bp(this,function(a){a.unbind()});xp.o.unbind.call(this)};xp.prototype.v=function(){Bp(this,function(a){a.dispose()});this.a=null;xp.o.v.call(this)};var Ep=function(a,b){qp.call(this,a,b);this.h=[]};z(Ep,xp);Ep.prototype.bind=function(){for(var a=0;a<this.h.length;a++){var b=this.h[a];b.src.addEventListener(b.type,b.Ba,b.Fe)}Ep.o.bind.call(this)};Ep.prototype.unbind=function(){for(var a=0;a<this.h.length;a++){var b=this.h[a];b.src.removeEventListener(b.type,b.Ba,b.Fe)}Ep.o.unbind.call(this)};Ep.prototype.v=function(){this.h=null;Ep.o.v.call(this)};var Fp=function(a,b){Ep.call(this,a,b)};z(Fp,Ep);Fp.prototype.l=!1;Fp.prototype.w=null;Fp.prototype.setElement=function(a){Fp.o.setElement.call(this,a);this.w=this.getElement().parentElement};var Hp=function(a){a.l||(a.l=!0,a.dispatchEvent(\"brandingload\"),Ap(a,function(a){Cp(this,a)},0),Gp(a))},Gp=function(a){var b=a.w||document.body;b!=a.getElement().parentElement&&(a=a.getElement(),b.appendChild(a))};g=Fp.prototype;g.qc=function(){this.dispatchEvent(\"pagepresented\")};g.ab=function(){Hp(this);Fp.o.ab.call(this)};g.bind=function(){Gp(this);Fp.o.bind.call(this)};g.unbind=function(){Fp.o.unbind.call(this);jd(this.getElement());var a=this.getConfig().introAnimationSequence;a&&l(a.a)&&a.a()};g.present=function(){Fp.o.present.call(this);this.dispatchEvent(\"pagepresenting\");var a=this.getConfig().introAnimationSequence;if(a){var b=sp(this);Eg(b,a,\"animationend\",this.qc,void 0);a.start()}else this.qc()};g.dismiss=function(){Fp.o.dismiss.call(this)};g.v=function(){var a=this.getConfig();a.introAnimationSequence&&(a.introAnimationSequence.dispose&&a.introAnimationSequence.dispose(),a.introAnimationSequence=null);Fp.o.v.call(this)};var Ip=function(a){J.call(this);this.b=a;this.f=new L(this);M(this.f,document,\"touchmove\",Ae,void 0)};z(Ip,J);Ip.prototype.addEventListener=function(a,b,c,d){\"boolean\"==typeof c?Ip.o.addEventListener.call(this,a,b,c,d):\"object\"==c?Ip.o.addEventListener.call(this,a,b,c.capture,d):Ip.o.addEventListener.call(this,a,b,!1,d)};Ip.prototype.removeEventListener=function(a,b,c,d){\"boolean\"==typeof c?Ip.o.removeEventListener.call(this,a,b,c,d):\"object\"==c?Ip.o.removeEventListener.call(this,a,b,c.capture,d):Ip.o.removeEventListener.call(this,a,b,!1,d)};Ip.prototype.getEnvironment=function(){return this.b};Ip.prototype.v=function(){this.f.dispose();delete this.f;this.b.dispose&&this.b.dispose();delete this.b;Ip.o.v.call(this)};var Jp=function(a){Ip.call(this,a)};z(Jp,Ip);Jp.prototype.init=function(){this.getEnvironment().onInit(this.a.load,this.a)};Jp.prototype.h=function(){this.a.bind();this.getEnvironment().onVisible(this.j,this)};Jp.prototype.j=function(){this.getEnvironment().onHidden(this.a.dismiss,this.a);this.a.present()};Jp.prototype.v=function(){this.a.dispose();this.a=null;Jp.o.v.call(this)};var Kp=function(){J.call(this);this.f=this.l=this.b=!1;this.j={}};z(Kp,J);var Lp=[\"impurl\",\"impurl3party\"],Mp=[\"clickurl\",\"clickurl3party\"];g=Kp.prototype;g.jb=function(){var a=x(this.Tc,this);\"loading\"===document.readyState?Ue(document,\"DOMContentLoaded\",a):a()};g.Tc=function(){this.b=!0;this.dispatchEvent(\"init\");this.f&&this.Sa()};g.kb=function(){this.l=!0;this.dispatchEvent(\"pageloaded\")};g.Sa=function(){var a=x(this.Uc,this);\"complete\"===document.readyState?a():Ue(window,\"load\",a)};g.Uc=function(){this.f=!0;this.b&&(Np(this,Lp),this.dispatchEvent(\"visible\"))};g.Nb=function(){this.dispatchEvent(\"expand\")};g.Mb=function(){this.dispatchEvent(\"collapse\")};g.Ob=function(){this.onVisible(this.Sc,this)};g.Sc=function(){this.f=!1;this.dispatchEvent(\"hidden\")};g.addEventListener=function(a,b,c,d){\"boolean\"==typeof c?Kp.o.addEventListener.call(this,a,b,c,d):\"object\"==typeof c?Kp.o.addEventListener.call(this,a,b,c.capture,d):Kp.o.addEventListener.call(this,a,b,!1,d)};g.removeEventListener=function(a,b,c,d){\"boolean\"==typeof c?Kp.o.removeEventListener.call(this,a,b,c,d):\"object\"==typeof c?Kp.o.removeEventListener.call(this,a,b,c.capture,d):Kp.o.removeEventListener.call(this,a,b,!1,d)};g.onInit=function(a,b){this.isInitialized()?a.call(b):Ue(this,\"init\",a,void 0,b)};g.onPageLoaded=function(a,b){this.isPageLoaded()?a.call(b):Ue(this,\"pageloaded\",a,void 0,b)};g.onVisible=function(a,b){this.isVisible()?a.call(b):Ue(this,\"visible\",a,void 0,b)};g.onHidden=function(a,b){Ue(this,\"hidden\",a,void 0,b)};g.isInitialized=function(){return this.b};g.isPageLoaded=function(){return this.l};g.isVisible=function(){return this.b&&this.f};g.trackProgress=function(a,b){this.trackInteraction();b=25*Math.floor(4*b);0===b?this.incrementCounter(a+\" Start\"):this.incrementCounter(a+\" \"+b+\"%\")};g.exit=function(a,b,c,d){Np(this,Mp);if(l(c)){if(b=c){c=Qb(\"%\",\"time\",\"%\");var e=Math.round(Fa()/1E3);b=b.replace(c,e.toString());b=b.replace(Qb(\"%\",\"pa\",\"%\"),\"0\")}c=b}this.a.exit(a,c);d&&this.a.Da()};var Np=function(a,b){for(var c=0;c<b.length;c++){var d=b[c];a.j[d]||(a.j[d]=!0,(d=gg(h.location.href,d))&&np(d))}};g=Kp.prototype;g.reportManualClose=function(){};g.expand=function(){};g.onExpand=function(){};g.expandComplete=function(){};g.collapse=function(){};g.onCollapse=function(){};g.collapseComplete=function(){};g.v=function(){delete this.j;if(this)if(He(this))this.g&&Oe(this.g,\"pageloaded\");else{var a=Ye(this);if(a){var b=0,c=\"pageloaded\".toString(),d;for(d in a.a)if(!c||d==c)for(var e=a.a[d].concat(),f=0;f<e.length;++f)cf(e[f])&&++b}}Kp.o.v.call(this)};var Op=function(a){Kp.call(this);this.a=a;this.h=[];this.a.isInitialized()?this.jb():this.a.addEventListener(\"init\",this.jb,void 0,this);this.a.isPageLoaded()?this.kb():this.a.addEventListener(\"pageLoaded\",this.kb,void 0,this);this.a.isVisible()&&this.Sa();this.a.addEventListener(\"visible\",this.Sa,void 0,this);this.a.addEventListener(\"hidden\",this.Ob,void 0,this);this.a.addEventListener(\"expandStart\",this.Nb,void 0,this);this.a.addEventListener(\"collapseStart\",this.Mb,void 0,this)};z(Op,Kp);g=Op.prototype;g.getFilename=function(a){return this.a.Ga(a)};g.trackBrandingAssetsLoaded=function(){this.incrementCounter(\"branding\")};g.trackAllAssetsLoaded=function(){this.incrementCounter(\"interactive\")};g.incrementCounter=function(a,b){this.a.Fa(a,b)};g.trackInteraction=function(){};g.startTimer=function(a){this.a.startTimer(a)};g.stopTimer=function(a){this.a.stopTimer(a)};g.trackVideo=function(a,b,c){this.h.push({id:a,He:b,Jd:c});this.a.Ja(\"video\",x(this.Ie,this))};g.Ie=function(){for(;this.h.length;){var a=this.h.shift();fo(a.id,a.He,a.Jd)}};g.untrackVideo=function(a){Un&&co&&go&&go(a)};g.reportManualClose=function(){this.a.reportManualClose()};g.expand=function(){this.a.$a()};g.onExpand=function(a,b){Ue(this,\"expand\",a,void 0,b)};g.expandComplete=function(){this.a.nb()};g.collapse=function(){this.a.Da()};g.onCollapse=function(a,b){Ue(this,\"collapse\",a,void 0,b)};g.collapseComplete=function(){this.a.mb()};g.v=function(){this.a.removeEventListener(\"init\",this.jb,void 0,this);this.a.removeEventListener(\"pageLoaded\",this.kb,void 0,this);this.a.removeEventListener(\"visible\",this.Sa,void 0,this);this.a.removeEventListener(\"hidden\",this.Ob,void 0,this);this.a.removeEventListener(\"expandStart\",this.Nb,void 0,this);this.a.removeEventListener(\"collapseStart\",this.Mb,void 0,this);Op.o.v.call(this)};var Pp=function(){Op.call(this,R())};z(Pp,Op);var Qp=function(){};r(\"studio.sdk.rad.Rad\",Qp,void 0);var Rp=null,Sp=null,Tp=null,Up=function(){Rp=Rp||document.body;if(Tp||Sp){Sp&&Sp.isBound()&&Sp.unbind();var a;if(a=Tp)a=!Tp.B;a&&Tp.dispose();Tp=Sp=null}a=new Jp(new Pp);var b=new Fp(new wp,a);Rp&&b.setElement(Rp);a.a=b;Eg(a.f,b,\"load\",a.h,void 0);Sp=b;a.init();Tp=a},Vp=function(){Tp||Up();return Tp},Wp=function(){Sp||Up();return Sp};Qp.setTopLevelElement=function(){};Qp.isTopLevelElementSet=function(){return null!=Rp};var Xp=function(){};r(\"studio.sdk.rad.VideoConfig\",Xp,void 0);Xp.prototype.autoplay=!1;Xp.prototype.autoplay=Xp.prototype.autoplay;Xp.prototype.controls=!0;Xp.prototype.controls=Xp.prototype.controls;Xp.prototype.sources=null;Xp.prototype.sources=Xp.prototype.sources;Xp.prototype.loop=!1;Xp.prototype.loop=Xp.prototype.loop;Xp.prototype.muted=!1;Xp.prototype.muted=Xp.prototype.muted;g=Xp.prototype;g.id=\"\";g.name=\"\";g.position=\"\";g.height=0;g.width=0;g.x=0;g.y=0;g.z=1;g.opacity=1;g.rotation=0;var Yp=function(a){up.call(this,a,Vp());a=Wp();var b=p(void 0)?void 0:1;a.a||(a.a=[]);a.a[b]||(a.a[b]=[]);a.a[b].push(this);b=sp(a);M(b,this,\"configured\",a.s,void 0);this.bind()};z(Yp,up);r(\"studio.sdk.rad.Video\",Yp,void 0);Yp.prototype.R=function(){return Yp.o.R.call(this)};Yp.prototype.getVideoElement=Yp.prototype.R;Yp.prototype.setElement=function(a){return Yp.o.setElement.call(this,a)};Yp.prototype.setElement=Yp.prototype.setElement;Yp.prototype.Rc=function(){this.dismiss();this.dispose()};Yp.prototype.destroy=Yp.prototype.Rc;Yp.prototype.v=function(){var a=this.R();null!=a&&(l(a.paused)&&!a.paused&&a.pause(),jd(a));Wp().removeChild(this);Yp.o.v.call(this)};");