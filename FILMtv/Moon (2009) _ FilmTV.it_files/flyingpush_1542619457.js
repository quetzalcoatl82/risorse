var flyingPush,
    detectStripAnimation,
    creativeContext,
    isAnimationAllowed = true;

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

/* detectStripAnimation */
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
/* end detectStripAnimation */

/* creativeContext */
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
/* end creativeContext */

/*flyingPush*/
function flyingPush() {
    var me = this;
    me.isPushdownMobile = false;

    me.init = function(targetFP, devices, isPushdownMobile) {
        if(isPushdownMobile){
            me.isPushdownMobile = true;
        }
        if (typeof device === 'undefined') {
            var sw = document.documentElement.clientWidth,
                isTouch = "ontouchstart" in window || navigator.msMaxTouchPoints > 0;
            me.device = sw > 950 && !isTouch ? "desktop" : 950 > sw && sw > 670 || sw > 950 && isTouch ? "tablet" : "smartphone";
        } else {
            me.device = device;
        }

        if (typeof devices !== 'undefined') {
            if (!devices.hasOwnProperty(me.device)) return false;
        }

        me.body = jQuery('body');
        me.targetFP = jQuery(targetFP);

        if (me.targetFP.length === 0) return false;

        if(me.isPushdownMobile){
            me.flyingPushdown = me.targetFP;
            me.placeholderFP = jQuery('.placeholderFlyingPushdownMobile');
        } else {
            me.targetFP.addClass('flyingPush');
            me.flyingPushdown = me.targetFP;
            me.placeholderFP = jQuery('.placeholderFlyingPushdown').addClass('active');
        }

        setTimeout(function() {
            me.backHome();
            if(me.isPushdownMobile){
                setTimeout(function() {
                    me.backHome(true);
                }, 6000);
            }
        }, 4000);

        if(!me.isPushdownMobile) {
            me.checkWindowResize();
        }

        me.checkScroll();
        jQuery(window).scroll(function() {
            me.checkScroll();
        });
    };

    me.checkScroll = function() {
        if (me.flyingPushdown.hasClass('toHome')) return false;
        me.placeholderFPO = me.placeholderFP.offset();

        if(me.destroy == 1) {
            return false;
        }

        if (me.placeholderFPO.top + me.placeholderFP.outerHeight() < jQuery(window).scrollTop()) {
            if (!me.flyingPushdown.hasClass('flying small')) {
                me.flyingPushdown.addClass('flying');
                setTimeout(function() {
                    me.flyingPushdown.addClass('small');
                },10);
            }
        } else {
            if (me.flyingPushdown.hasClass('flying small')) me.flyingPushdown.removeClass('flying small');
        }
    };

    me.backHome = function(auto) {
        if (me.flyingPushdown.hasClass('toHome')) return false;

        if(auto) {
            if(me.flyingPushdown.hasClass('small')){
                me.flyingPushdown.addClass('hidden');

                console.log('[push FE] backHome "auto": '+parseInt(performance.now() - startPageTimes.performanceNow));

                setTimeout(function() {
                    me.resetPush(true);
                },300);
            }else{
                me.resetPush();
            }
        } else {
            me.goHome = jQuery(document.createElement('a')).addClass('goHome targetGoHome').html('<svg class="targetGoHome" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><polygon fill="#fff" id="x-mark-icon" points="438.393 374.595 319.757 255.977 438.378 137.348 374.595 73.607 255.995 192.225 137.375 73.622 73.607 137.352 192.246 255.983 73.622 374.625 137.352 438.393 256.002 319.734 374.652 438.378 "/></svg>');
            me.flyingPushdown.append(me.goHome);

            var pushGoHomeEvent = document.createEvent('Event');
            pushGoHomeEvent.initEvent("pushGoHome", true, false);

            if(me.isPushdownMobile) {
                me.goHomeResize = jQuery(document.createElement('a')).addClass('goHomeResize').html('<svg width="16" height="14" viewBox="0 0 200 175" mlns="http://www.w3.org/2000/svg"><path d="M0 62.5V0h62.5v25H25v37.5H0zm0 50h25V150h37.5v25H0v-62.5zm200-50h-25V25h-37.5V0H200v62.5zm0 50V175h-62.5v-25H175v-37.5h25z" fill="#FFF" fill-rule="nonzero"/></svg>');
                me.flyingPushdown.append(me.goHomeResize);

                me.goHomeResize.click(function(e) {
                    e.preventDefault();
                    me.flyingPushdown.removeClass('flying small').addClass('toHome');
                    jQuery("html,body").animate({scrollTop:0},500);

    				document.dispatchEvent(pushGoHomeEvent);
                });
            }

            console.log('[push FE] backHome "X": '+parseInt(performance.now() - startPageTimes.performanceNow));

            me.goHome.click(function(e) {
                e.preventDefault();
                me.flyingPushdown.removeClass('flying small').addClass('toHome');

				document.dispatchEvent(pushGoHomeEvent);
            });

            me.flyingPushdown.mouseenter(function(e) {
                if (!e.target.classList.contains('targetGoHome') && me.flyingPushdown.hasClass('small')) {
                    me.flyingPushdown.addClass('over');
                }
            });

            me.flyingPushdown.mouseleave(function(e) {
                me.flyingPushdown.removeClass('over');
            });
        }
    }

    me.resetPush = function(enableScrollTop){
        me.flyingPushdown.removeClass('flying small hidden').addClass('toHome').attr('style', '');
        me.placeholderFP.attr('style', '');

        if(enableScrollTop){
            me.goTop = jQuery(document.createElement('a')).addClass('goTop');
            jQuery("body").append(me.goTop);
            setTimeout(function() {me.goTop.addClass('rendered');},100);

            me.goTop.click(function(e){
                e.preventDefault();
                jQuery("html,body").animate({scrollTop:0},500);
                me.goTop.remove();
            });

            jQuery(window).scroll(function() {
                if (me.placeholderFP.offset().top + me.placeholderFP.outerHeight() >= jQuery(window).scrollTop()) {
                    me.goTop.remove();
                }
            });
        }
    };

    me.setPlaceholderHeight = function() {
        if(!me.flyingPushdown.hasClass('flying')) {
            me.placeholderFP.height(me.flyingPushdown.outerHeight());
        }
    };

    me.checkWindowResize = function() {
        jQuery(window).resize(function() {
            console.debug("[FV] resize");
            me.checkScroll();
        });
    };
}
/*end flyingPush*/