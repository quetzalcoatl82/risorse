/*
PUSHUP
strip_animation: gestisce il comportamento delle strip
*/
var topStrip,
    detectStripAnimation,
    creativeContext,
    isAnimationAllowed = true;
/* PUSHUP */

function strip_animation() {
    if(isAnimationAllowed){
        topStrip = new topStrip();
        topStrip.init();
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

    detectStripAnimation = new detectStripAnimation();
    detectStripAnimation.init(e);

    return detectStripAnimation.isAllowed();
}

function topStrip() {
    me = this;

    me.init = function() {
        if (device == 'desktop') {
            if(is_bnzm_pdown) {
                var devices = {
                    desktop: 1,
                    tablet: false,
                    mobile: false
                };

                flyingPush = new flyingPush();
                flyingPush.init('.targetFlyingPushdown', devices);
            } else {
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
                // controllo se abbiamo a che fare con una push o con una creatività di altro genere
                console.log('è una pushdown? ' + is_bnzm_pdown);

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

                // gestisco la logica per le strip NO push (logica della push nei JS all'interno delle creatività)
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
        } else if(device == "smartphone") {
            document.addEventListener("child_BmVideoAdv", function() {
                console.log('[push FE] init flyingPushMobile: '+parseInt(performance.now() - startPageTimes.performanceNow));
                jQuery(".placeholderFlyingPushdownMobile").parent().addClass("mobile-push");
                jQuery(".placeholderFlyingPushdownMobile").parent().prepend("<span class='pushTitle'>Video del giorno</span>");
                if(!jQuery(".placeholderFlyingPushdownMobile").hasClass("rendered")){
                    jQuery("body").addClass("mobile-push-rendered");
                    jQuery(".placeholderFlyingPushdownMobile").addClass("rendered");
                }

                var devices = {
                    smartphone: 1
                };
                flyingPush = new flyingPush();
                flyingPush.init('.targetFlyingPushdownMobile', devices, true);
            });
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
                    // comunico alla logica che la push non deve più scrollare con l'utente
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
            // comunico alla logica che la push non deve più scrollare con l'utente
            isPushing = false;
        }
    }
}

function detectStripAnimation() {
    me = this;
    me.slotEvent;
    me.hasStripAnimation = true;
    me.stripContainerId;

    me.init = function(slotEvent) {
        me.slotEvent = slotEvent;
        me.checkSize();
    }

    me.checkSize = function(){
        if(me.slotEvent.size[0] == "320"){
            if(me.slotEvent.size[1] == "1"){
                creativeContext = new creativeContext();
                creativeContext.init(me.slotEvent.slot.getSlotElementId());
            } else {
                me.hasStripAnimation = false;
                $('.strip').addClass("bottom");
                $('.strip-mobile').addClass("hidden");
            }
        } else if(me.slotEvent.size[0] == "300"){
            me.hasStripAnimation = false;
        }
    }

    me.isAllowed = function() {
        return me.hasStripAnimation;
    }
}

function creativeContext(){
	var me = this;
	me.parentId,
	me.context = false,
	me.size = false;

	me.init = function(parentId){
        if(parentId != ''){
			me.parentId = parentId;
            if (window.addEventListener) {
				addEventListener('message', me.onMessageReceived, false);
			}
			else {
				if (window.attachEvent) {
					attachEvent('onmessage', me.onMessageReceived);
				}
				else {
					window.onmessage = me.onMessageReceived;
				}
			}
		}
	};

	me.onMessageReceived = function(e){
		e.preventDefault();
		e.stopPropagation();

		if (typeof e.data !== 'object') {
			return;
		}

		var obj = e.data;

		if(obj.id && obj.cmd){
			switch (obj.cmd) {
				case "setContext":
					if(!me.context){
						me.setContext(obj.id);
						jQuery('body').addClass("mobile-push");
					}
					break;
				case "setSize":
					if(!me.size){
						me.setSize(obj.id);
                        jQuery(window).resize(function() {
                            me.setSize(obj.id);
                        });
					}
					break;
				default:
					break;
			}
		}
	};

	me.setContext = function(elId){
		var iframe = document.getElementById(elId);
        jQuery("#"+me.parentId).addClass("placeholderFlyingPushdownMobile");
        jQuery(iframe).parent().addClass("targetFlyingPushdownMobile flyingPushMobile");
		me.context = true;
	};

	me.setSize = function(elId) {
		var iframe = document.getElementById(elId);
        if(!jQuery(iframe).hasClass("flying")){
            var height = Math.round((jQuery(iframe).outerWidth()/16)*9);
    		jQuery(iframe).attr("height",height);
        }
		me.size = true;
	};
}