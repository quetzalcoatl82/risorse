var instaHeader,
	loadMore,
	loadMoreBidirectional,
	remoteControl,
	toggleVisibility,
	advElevator;

$(function(){
    /*
	instaHeader = new instaHeader();
    instaHeader.init();
	*/

    if(typeof url_load_more_prev !== "undefined" && typeof url_load_more_next !== "undefined"){
	    loadMoreBidirectional = new loadMoreBidirectional();
	    loadMoreBidirectional.init();
    } else {
	    loadMore = new loadMore();
	    loadMore.init();
    }

    remoteControl = new remoteControl();
    remoteControl.init();

    $(window).load(function() {
	    toggleVisibility = new toggleVisibility();
	    toggleVisibility.init();

	    advElevator = new advElevator();
	    advElevator.init();
	});
});

function cssLoader(){
	var me = this;
	me.styles = [];

	me.init = function(styles){
		if(styles.length){
			for (var i = 0; i < styles.length; i++) {
				me.styles.push(styles[i]);
			}
			me.loadCSS();
		}
	};

	me.loadPath = function(path){
		var link = $("<link rel='stylesheet' type='text/css'>");
    	link.attr("href", path);
    	$("head").append(link);
	};

	me.loadCSS = function(){
		for (var i = 0; i < me.styles.length; i++) {
			me.loadPath(me.styles[i]);
		}
	}
}

function swiperHandler(){
	var me = this;
	me.swipers = [];

	me.init = function(){
		me.swipers = $('.gtv-swiper-container');

		if(me.swipers.length > 0){
			$(window).on("load", function(){
				me.swipers.each(function(){
				    var swiper = new Swiper($(this), {
				        nextButton: $(this).nextAll('.gtv-swiper-button-next'),
				        prevButton: $(this).nextAll('.gtv-swiper-button-prev'),
					    slidesPerView: 'auto',
					    /*slidesOffsetBefore: 50,*/
					    simulateTouch: false,
					    breakpoints: {
					    	1000: {
								simulateTouch: true
							}
					    }
				    });
				});
			});
		}
	}
}

function toggleVisibility(){
	var me = this;
	me.elementToToggle;

	me.init = function(){
		me.elementToToggle = $('.gtv-toToggle');
		me.elementToToggle.each(function(){
			var _i = this;
			if($(_i).data("checkHeight") === true){
				me.checkHeight(_i);

				$(window).on('resize', function() {
					me.checkHeight(_i);
				});
			} else {
				var toggleHandler = $(_i).find('.gtv-toggle');
				toggleHandler.on("click", function(){
					me.toggleElement(_i);
				});
			}
		});
	}

	me.checkHeight = function(el){
		var inner = $(el).find('.gtv-toToggle-inner');

		if($(el).outerHeight() < inner.outerHeight()){
			var toggleHandler = $(el).find('.gtv-toggle');
			toggleHandler.addClass("available");
			toggleHandler.on("click", function(){
				me.toggleElement(el);
			});
		}
	}

	me.toggleElement = function(el){
		$(el).toggleClass("gtv-opened");
	}
}

function instaHeader() {
	var me = this;

	me.init = function() {
		var triggerHeads = $('.gtv-trigger-head');
		me.processHeads(triggerHeads);
	}

	me.processHeads = function(items){
		me.checkHeadPosition(items);
		$(window).scroll(function() {
			me.checkHeadPosition(items);
		});
	}

  	me.checkHeadPosition = function(items) {
    	items.each(function() {
	      	var _t = this;
	      	if(!$(_t).hasClass('processed')){
	      		$(_t).addClass('processed');
	      	}

	      	if(me.inPosition(_t)) {
	        	$(_t).addClass('fixed-to-top');
	        	$(_t).find('.gtv-trigger-head-content').addClass('fixed-to-top');
	      	} else {
	      		$(_t).removeClass('fixed-to-top');
	        	$(_t).find('.gtv-trigger-head-content').removeClass('fixed-to-top');
	      	}
    	});
  	}

  	me.inPosition = function(element) {
		var rect = element.getBoundingClientRect();
		var html = document.documentElement;
		return (
			rect.top <= 0
		);
	};

	me.refresh = function(){
		var triggerHeads = $('.gtv-trigger-head').not('.processed');
		me.processHeads(triggerHeads);
	}
}

function loadMore() {
	var me = this;

	me.init = function() {
		me.trigger = $('.gtv-load-more').not('.loading');
		me.baseUrl = 'ajax/snippet';
		me.page = 1;

		if (me.trigger.length == 0) return false;

		me.trigger.click(function(e) {
			var _t = $(this);
			_t.addClass('gtv-loading');
			setTimeout(function() {
				me.call(_t);
			}, 300);
			e.preventDefault();
		})

		// disattivo il caricamento automatico allo scroll
		// me.scroll();
	}

	me.call = function(_t) {
		me.url = me.baseUrl + me.page + ".html";
		if (me.domain){
			me.url = me.url + '&domain=' + me.domain;
		}

		$.ajax({
			url: me.url
		}).done(function(response) {
			$(response).addClass('ajax hidden').insertBefore(_t);
			setTimeout(function() {
				$('.ajax.hidden').removeClass('hidden')
				_t.removeClass('gtv-loading');
				me.page++;
				// instaHeader.refresh();
			}, 100);
		});
	}

	me.isElementInViewport = function(el, diffT, diffB) {
		var rect = el.getBoundingClientRect();

		return rect.top >= 0 - diffT &&
			/*rect.left >= 0 &&*/
			rect.bottom - diffB <= (window.innerHeight || document.documentElement.clientHeight)
			/* &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)*/
	}

	me.scroll = function() {
		$(window).scroll(function() {
			if (me.isElementInViewport(document.querySelector('.gtv-load-more'), 0, 0) && !me.trigger.hasClass('manual')) {
				me.trigger.addClass('manual').click();
			}
		})
	}
}

function remoteControl(){
    var me = this;
    me.body;
    me.remoteControlOverlay;
    me.remoteControlHandler;

    me.init = function(){
        me.body = $('body');
        me.remoteControlHandler = $('.gtv-remote-control-btn');
        me.remoteControlClose = $('.gtv-remote-control-close');

        if(me.remoteControlHandler){
            me.remoteControlHandler.on("click", me.toggleOverlay);
            me.remoteControlClose.on("click", me.toggleOverlay);
        }
    };

    me.toggleOverlay = function(ev){
        ev.preventDefault();
        ev.stopImmediatePropagation();

        if(me.body.hasClass("gtv-remote-control-opened")){
            me.body.removeClass("gtv-remote-control-opened");
	        $(document).off('touchmove');
        } else {
            me.body.addClass("gtv-remote-control-opened");
	        $(document).on('touchmove', function(e) {
	            if (!$(e.target).parents('.gtv-remote-control-opened')[0]) {
	                e.preventDefault();
	            }
	        });
        }
    }
}

function loadMoreBidirectional(){
	var me = this;
	me.url_load_more_prev,
	me.url_load_more_next,
	me.next_data_cache,
	me.prev_data_cache,
	me.last_scroll = 0,
	me.offset_top,
	me.load_items = true,
	me.is_loading = 0,
	me.hide_on_load = false,
	me.manual_load = false;
	me.current_page = null;

	me.init = function(){
		me.trigger = $('.gtv-load-more').not('.loading');
		me.url_load_more_prev = url_load_more_prev;
		me.url_load_more_next = url_load_more_next;
		me.current_page = me.getPageFromUrl();
		me.initCache();

		me.trigger.click(function(e) {
			var _t = $(this);
			_t.addClass('gtv-loading');
			setTimeout(function() {
				me.loadNext(_t);
			}, 300);
			e.preventDefault();
		})

		$(window).scroll(function() {
			var scroll_pos = $(window).scrollTop();
			if (me.isElementInViewport(document.querySelector('.gtv-load-more'), 0, 0) && !me.manual_load) {
				me.loadNext();
			}
			if (scroll_pos <= 0.9 * me.offset_top) {
				$(".gtv-more-top-items").addClass("processed");
				me.loadPrev();
			}
			if (me.current_page != me.getPageFromUrl()) {
				me.current_page = me.getPageFromUrl();
				me.refreshAdv();
			}

			if (Math.abs(scroll_pos - me.last_scroll) > $(window).height() * 0.1) {
				me.last_scroll = scroll_pos;
				$(".infinite-item-page").each(function(index) {
					if (me.mostlyVisible(this)) {
						history.replaceState(null, null, $(this).attr("data-url"));
						return(false);
					}
				});
			}
		});

		$(window).load(function () {
			me.offset_top = $(".infinite-item-page:first").offset().top;

			if(device == "desktop"){
				me.offset_top -= $("#ameheader_header").height() - 30;
			}

			if (me.url_load_more_prev != "") {
				setTimeout(function(){
					window.scrollTo(0, me.offset_top);
				},0);
			}
		});
	};

	me.getPageFromUrl = () => {
		const params = new URLSearchParams(window.location.search);
		const pagina = params.get('pagina') || 1;
		return pagina;
	};

	me.loadNext = function(_t) {
		if (me.url_load_more_next != "") {
			me.manual_load = true;
			me.is_loading = true;

			if (me.next_data_cache) {
				me.showNextData(me.next_data_cache, _t);
			} else {
				if (me.url_load_more_next != "") {
					$.getJSON(me.url_load_more_next, function(data) {
						me.showNextData(data,_t);
					});
				}
			}
		} else {
			me.trigger.hide();
		}
	};

	me.loadPrev = function() {
		if(me.url_load_more_prev != "") {
			me.is_loading = true;

			if (me.prev_data_cache) {
				me.showPrevData(me.prev_data_cache);
			} else {
				if (me.url_load_more_prev != "") {
					$.getJSON(me.url_load_more_prev, function(data) {
						me.showPrevData(data);
					});
				}
			}
		}
	};

	me.showNextData = function(data,_t){
		var tmp = $(data.template);
		if(_t){
			tmp.addClass("ajax hidden");
		}
		$('.infinite-item-page:last').after(tmp);

		me.url_load_more_next = data.url_load_more_next;
		me.next_data_cache = false;

		if (me.url_load_more_next != "") {
			$.getJSON(me.url_load_more_next, function(data_cache) {
				me.next_data_cache = data_cache;
			});
		}
		if(_t){
			if(me.url_load_more_next == ""){
				me.trigger.hide();
			}
			setTimeout(function() {
				$('.ajax.hidden').removeClass('hidden');
				_t.removeClass('gtv-loading');
				me.refreshTemplate();
			},100);
		} else {
			me.refreshTemplate();
			if(me.url_load_more_next == ""){
				me.trigger.hide();
			}
		}
	};

	me.showPrevData = function(data){
		$('.infinite-item-page:first').before(data.template);
		var item_height = $('.infinite-item-page:first').height();
		window.scrollTo(0, $(window).scrollTop() + item_height); // adjust scroll

		me.url_load_more_prev = data.url_load_more_prev;
		me.prev_data_cache = false;
		if (me.url_load_more_prev != "") {
			$.getJSON(me.url_load_more_prev, function(data_cache) {
				me.prev_data_cache = data_cache;
			});
		}
		me.refreshTemplate();
	};

	me.refreshTemplate = function(){
		// instaHeader.refresh();
		me.is_loading = false;
		// dopo aver ricaricato il template, richiamo la funzione link_in_pagina per disattivare i link interni
		console.log('refreshTemplate');
		link_in_pagina();
	};

	me.refreshAdv = function(){
		window.dispatchEvent(new CustomEvent('refreshTemplate'));
		console.log(`%c[PIEMME DATA] refreshAdv: 'pagina' = ${me.current_page}`, 'color: orange; font-weight: bold;');
	}

	me.mostlyVisible = function(element) {
		var scroll_pos = $(window).scrollTop();
		var window_height = $(window).height();
		var el_top = $(element).offset().top;
		var el_height = $(element).height();
		var el_bottom = el_top + el_height;
		return ((el_bottom - el_height * 0.25 > scroll_pos) && (el_top < (scroll_pos+0.5*window_height)));
	};

	me.isElementInViewport = function(el, diffT, diffB) {
		var rect = el.getBoundingClientRect();
		return rect.top >= 0 - diffT && rect.bottom - diffB <= (window.innerHeight || document.documentElement.clientHeight);
	};

	me.initCache = function() {
		if (me.url_load_more_prev != "") {
			$.getJSON(me.url_load_more_prev, function(data) {
				me.prev_data_cache = data;
			});
		}
		if (me.url_load_more_next != "") {
			$.getJSON(me.url_load_more_next, function(data) {
				me.next_data_cache = data;
			});
		}
	};
}

function advElevator(){
	var me = this;
	me.advContainerElevator,
	me.advTriggerElevator,
	me.stuck = false,
	me.adv_offset;

	me.init = function(){
		me.advContainerElevator = $(".gtv-sidebar");
		me.advTriggerElevator = $(".gtv-trigger-elevator");
		me.advContainerElevator = me.advTriggerElevator.parent();
		me.adv_offset = Math.max(70, $("#ameheader_header").height());

		if(device == "desktop"){
			$(window).scroll(function() {
				me.handleElevator();
			});

			$(window).resize(function() {
				me.handleElevator();
			});
		}
	}

	me.handleElevator = function(){
		var stick_point = me.advContainerElevator.offset().top - me.adv_offset;
		var stick_point_end = stick_point + me.advContainerElevator.outerHeight() - me.advTriggerElevator.outerHeight();
		var distance = stick_point - $(window).scrollTop();
		var offset = $(window).scrollTop();

		if (distance <= 0 && !me.stuck) {
			me.advTriggerElevator.addClass("stucked");
		    me.advContainerElevator.css('min-height', me.advTriggerElevator.outerHeight() + "px");
			me.stuck = true;
		} else if (me.stuck && (offset <= stick_point)){
			me.advTriggerElevator.removeClass("stucked");
			me.stuck = false;
		}

		if(offset >= stick_point_end){
			me.advTriggerElevator.addClass("hookbottom");
		} else {
			me.advTriggerElevator.removeClass("hookbottom");
		}
	}
}

const getCookieValue = (name) => {
	const searchCookie = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
	return (searchCookie !== null && searchCookie.pop()) || ''
};

async function isConsentGiven (siteId,cookiePolicyId){
	var cs = document.cookie.split(';');
	for (var i = 0; i < cs.length; i++) {
		while (cs[i].charAt(0) == ' ') cs[i] = cs[i].substring(1);
		await yieldToMain();
		if(cs[i].indexOf('_iub_cs-s'+ siteId) == 0||cs[i].indexOf('_iub_cs-'+ cookiePolicyId) == 0) {
			return true;
		}
	}
	return false;
}


    function startIasPet() {
        //Inserisco la libreria di ottimizzazione di IAS
        mmLoader({
            src: "https://static.adsafeprotected.com/iasPET.1.js",
            async: true,
        },"advChain")
    }
	function startAdvChain2022() {
		let startTime = performance.now();

		mmLoader({
			src: "//securepubads.g.doubleclick.net/tag/js/gpt.js",
			async: true
		},"advChain")
		.then((results) => {
			console.log('[startAdvChain2022] gpt caricato', performance.now() - startTime);
			mmLoader({
				src: "/guidatv/bundles/tvscnewsite/js/min/piemme2.min.js",
				async: true,
			},"advChain")
		}).then(e => {
			console.log('[startAdvChain2022] piemme caricato', performance.now() - startTime);
			const advChainEvent = new Event('advChainLoaded');
			window.dispatchEvent(advChainEvent);
		})
	}

    postTcfReady(startIasPet);
	postTcfReady(startAdvChain2022);


//Video sentinalla audio on
function injectAudioSentinel() {
    return new Promise((resolve, reject)=>{
        const videoSentinel = window.top.document.createElement('video');
        videoSentinel.src = 'https://www.sorrisi.com/guidatv/bundles/tvscnewsite/video-sentinel/sentinel.mp4';
        videoSentinel.controls = true;
        videoSentinel.muted = false;
        videoSentinel.playsInline = true;
        videoSentinel.volume = 0.001;
        videoSentinel.setAttribute("style", "position:fixed;bottom:-200px;z-index:-1;");
        window.top.document.body.appendChild(videoSentinel);
        console.log('[Check AudioOn] Video sentinella caricato');
        resolve(checkSentinelResponse(videoSentinel));
    });
}

//Controllo la risposta del video sentinella
function checkSentinelResponse(elem){
    let video = elem;
    return new Promise((resolve, reject) => {
        let interrogateSentinel = video.play();
        if (interrogateSentinel !== undefined){
            interrogateSentinel.then(function () {
                video.pause();
                console.log('[Check AudioOn]',video)
                resolve(audioModeOnSentinel = true);
                console.log('[Check AudioOn] AudioOn permesso!', 'Valore audioModeOnSentinel:',audioModeOnSentinel);
            }).catch(function (error) {
                resolve(); // Non modifico audioModeOnSentinel. È false di default
                console.log('[Check AudioOn]', error);
            });
        }
    });
}

function testNewVast() {
    const currentUrl = window.location.href;
    const test1 = "https://www.sorrisi.com/guidatv/programmi-tv-pomeriggio/";
    const test2 = [
        'https://www.sorrisi.com/guidatv/ora-in-tv/',
        'https://www.sorrisi.com/guidatv/stasera-in-tv/',
        'https://www.sorrisi.com/guidatv/film-stasera-in-tv/',
        'https://www.sorrisi.com/guidatv/serietv-fiction-stasera-in-tv/',
        'https://www.sorrisi.com/guidatv/spettacolo-stasera-in-tv/',
        'https://www.sorrisi.com/guidatv/sport-stasera-in-tv/',
        'https://www.sorrisi.com/guidatv/programmi-stasera-seconda-serata/'
    ];

    if (currentUrl === test1) {
        return '/38681514,22676954050/Sorrisi/test';
    }
    if (test2.includes(currentUrl)) {
        return '/38681514,22676954050/Sorrisi/test2';
    }

    return '/38681514,22676954050/Sorrisi/guidatv';
}


function startPushVideo(ptpWebsite,videoId='',clickEvent) {
    window.initStartPushVideo = 1;
    window.GlobalPusTimerStart = new Date().getTime();

    let obj = {
        website: ptpWebsite,
        type: "flyfirst",
        flyMode: "fade",
        mode: "content",
        advFallbacks: false,
        audioModeOn: audioModeOnSentinel,
        //tag:'/38681514,22676954050/Sorrisi/test',
        iasMonitoring:{enabled:true,id:'931714'},
        whenIsInViewport: {enabled:true, rootMargin:"0px 0px -150px 0px"},
        contentAutoplay:clickEvent,
        closeFlyingAfter: 10000,
        adServer: "ima",
    };
    videoId !== '' && (obj['videoId'] = videoId);
    obj['targetElementId'] = 'flyfirst-mobile-placement';
    if (window.innerWidth >= 1000) obj['targetElementId'] = 'flyfirst-placement';
    obj['tag'] = testNewVast();
    //Inserisco lo slot IAS
    obj['adRequestCustomParams'] = decodeURIComponent(playerContentConfig.slot);

    (function (a, l, t, e, r) {
        a[e] = a[e] || function (s) {
            (a[e].run = a[e].run || []).push(s)
        };
        let g, z = l.getElementsByTagName(t)[0];
        if (l.getElementById(e)) {
            return;
        }
        g = l.createElement(t);
        g.id = e;
        g.src = r;
        g.async = 1;
        z.parentNode.insertBefore(g, z);
    }(window, document, 'script', 'AVPushLoader', "https://ptp.stbm.it/pushdown/loader/av/pushdown-loader.js"));

    console.log('[pushVideo]', obj);

    AVPushLoader(obj);
};


/*function pushChainStarter(){
    injectAudioSentinel().then(function () {
        if (typeof ptpWebsite === "undefined") {
            let ptpWebsite = "srpv";
            if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) {
                ptpWebsite = "srpm-ios";
            } else if (navigator.userAgent.toLowerCase().indexOf("android") !== -1){
                ptpWebsite = "srpm-android";
            }
			startPushVideo(ptpWebsite);
            console.log('[Check AudioOn], Avvio la push');
        } else {
            console.log('[Check AudioOn], Video già presente in pagina non avvio la push');
        }
    }).then(function () {
        if (audioModeOnSentinel){
            window.addEventListener("preroll_started", function() {
                console.log('[Check AudioOn] preroll_started');
                setTimeout(function () {
                    AVPushRunningInstances[0].api.setVolume(0.05);
                    console.log('[Check AudioOn], imposto audio on');
                },200);
            });
        }
    });
}*/

function pushChainStarter(clickEvent=false){
    let ptpWebsite = "srpv";
    if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) {
        ptpWebsite = "srpm-ios";
    } else if (navigator.userAgent.toLowerCase().indexOf("android") !== -1){
        ptpWebsite = "srpm-android";
    }

    // Initialize playerContentConfig se non esiste
    if (typeof playerContentConfig === 'undefined') {
        playerContentConfig = {
            checked: false,
            videoId: ''
        };
    }

    if (!playerContentConfig.checked){
        console.log('[Check AudioOn], Avvio la push');
        startPushVideo(ptpWebsite,playerContentConfig.videoId,clickEvent);
        if (clickEvent || audioModeOnSentinel){
            window.addEventListener('content_played', () =>{AVPushRunningInstances[0].api.setVolume(0.05);});
            window.addEventListener('preroll_started', () =>{
                console.log('[Check AudioOn] preroll_started');
                setTimeout(function () {
                    console.log('[Check AudioOn], imposto audio on');
                    AVPushRunningInstances[0].api.setVolume(0.05);
                },200);
            });
            window.addEventListener("player_fatal_error", function() {
                console.log('[pushVideo] player_fatal_error');
            });
        }
        playerContentConfig.checked = true;
    }
}

if (typeof flyfirstContainer !== "undefined" && typeof flyfirstContainer !== null){
    flyfirstContainer.addEventListener('click', () => {
        audioModeOnSentinel = true;
        pushChainStarter(clickEvent=true);
        playerContentConfig.checked = true;
    });
}

const startPushDelay = () => {
    // Controlla se la URL corrisponde
    const delayGuida =  5000;
	

    setTimeout(() => {
        injectAudioSentinel().then(() => pushChainStarter());
        console.log(`%c[pushVideo] start push delayed (${delayGuida}ms)`, 'background-color: #55FF55;padding:5px;color:black;');
    }, delayGuida);
};

postTcfReady(startPushDelay);

  function startOutbrain() {
    let blankOBSlots = document.querySelectorAll(".OUTBRAIN[data-ob-template]");
    if(blankOBSlots.length > 0) {
      setTimeout(() => {
        mmLoader({
          src: "//widgets.outbrain.com/outbrain.js",
          async: true
        },"advChain");
      }, 3000);
    }
  }
  postTcfReady(startOutbrain);

  /* MH2021 web component specifico PIEMME */
  mmLoader({
    src: "https://dafne.sirio.stbm.it/utility-fe/prod/web-components/ame-mh-piemme.min.js",
    defer: true
  });


/* gestione colore skin */
function deltaE(rgbA, rgbB) {
	let labA = rgb2lab(rgbA);
	let labB = rgb2lab(rgbB);
	let deltaL = labA[0] - labB[0];
	let deltaA = labA[1] - labB[1];
	let deltaB = labA[2] - labB[2];
	let c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
	let c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
	let deltaC = c1 - c2;
	let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
	deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
	let sc = 1.0 + 0.045 * c1;
	let sh = 1.0 + 0.015 * c1;
	let deltaLKlsl = deltaL / (1.0);
	let deltaCkcsc = deltaC / (sc);
	let deltaHkhsh = deltaH / (sh);
	let i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
	return i < 0 ? 0 : Math.sqrt(i);
}

function rgb2lab(rgb) {
	let r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255, x, y, z;
	r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
	g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
	b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
	x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
	y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
	z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
	x = (x > 0.008856) ? Math.pow(x, 1 / 3) : (7.787 * x) + 16 / 116;
	y = (y > 0.008856) ? Math.pow(y, 1 / 3) : (7.787 * y) + 16 / 116;
	z = (z > 0.008856) ? Math.pow(z, 1 / 3) : (7.787 * z) + 16 / 116;
	return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
}

window.addEventListener('skinData', (e) => {
    if (device == 'desktop' && e.detail.url && (e.detail.color.toLowerCase() == '#f3f3f3' || e.detail.color === "rgb(243, 243, 243)")) handleBgSkin(e.detail.url, e.detail.tgt);
});

function handleBgSkin(url, tgt){
	let startTime = performance.now();
	let page = document.querySelector(tgt);
	var canvas = document.createElement("canvas");
	var pic = new Image();
	pic.crossOrigin = "Anonymous";
	pic.onload = function () {

        const populatePoint = (pointName, p1, p2, p3, p4) => {
            const point = c.getImageData(p1, p2, p3, p4).data;
            pointName.data = point.slice(0,3);
            pointName.hex = point[0] + "," + point[1] + "," + point[2];
        };

        const checkBestColor = (color) => (color != '255,255,255')? color : bestColor;

        const checkBestValues = (distance, color) => {
            if(distance < bestDistance) {
                bestDistance = distance;
                bestColor = checkBestColor(color);
            }
        }

		canvas.width = pic.width;
		canvas.height = pic.height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(pic,0,0);

		var c = canvas.getContext('2d');

		const pBottomSx = {};
		const pBottomDx = {};
		const pTopSx = {};
		const pTopDx = {};

		populatePoint(pBottomSx, 0, pic.height - 1, 1, 1);
		populatePoint(pBottomDx, pic.width - 1, pic.height - 1, 1, 1);
		populatePoint(pTopSx, 0, 0, 1, 1);
		populatePoint(pTopDx, pic.width - 1, 0, 1, 1);

		let bestDistance = deltaE(pTopSx.data, pTopDx.data);
		let distanceBottom = deltaE(pBottomSx.data, pBottomDx.data);
		let distanceSideSx = deltaE(pBottomSx.data, pTopSx.data);
		let distanceSideDx = deltaE(pBottomDx.data, pTopDx.data);
		console.log('[skincolor] distanza top', bestDistance, '\n'+
                    '[skincolor] distanza bottom', distanceBottom, '\n'+
                    '[skincolor] distanza lato sinistro', distanceSideSx, '\n'+
                    '[skincolor] distanza lato destro', distanceSideDx);

		let bestColor = '255,255,255';
        bestColor = checkBestColor(pTopSx.hex);

        checkBestValues(distanceBottom, pBottomSx.hex);
        checkBestValues(distanceSideSx, pBottomSx.hex);
        checkBestValues(distanceSideDx, pBottomDx.hex);

		page.style.setProperty("background-color", `rgb(${bestColor})`, "important");

		console.log('[skincolor] durata', Math.round(performance.now() - startTime)+'ms');
	}

	pic.src = url;
}

function link_in_pagina() {
    const currentUrl = window.location.href;
    const pagine = ["https://www.sorrisi.com/guidatv/programmi-tv-pomeriggio/","https://www.sorrisi.com/guidatv/stasera-in-tv/"];
	const modalVTR = document.querySelector('.bodymodaleVTR');
	if (!modalVTR) {
		let modalVTRdiv = createModalVTR();
		// add div dentro modalVTRdiv
		document.body.appendChild(modalVTRdiv);
	}
	// usa some per controllare se la pagina corrente è in pagine
	if (pagine.some(pagina => currentUrl.includes(pagina))) {
		console.log('link_in_pagina');
		// tutti gli article dentro .infinite-item-page
		const articles = document.querySelectorAll('.infinite-item-page article:not(.modaleVTR)');
		if (articles.length > 0) {
			articles.forEach(article => {
				// gli handler dei link sono gestiti via event delegation (vedi sotto)
				// aggiungi class 'modaleVTR'
				article.classList.add('modaleVTR');
			});
		}

		// Event delegation: un solo listener per tutti i link dentro gli article
		if (!document.body.getAttribute('data-vtr-delegation')) {
			document.body.setAttribute('data-vtr-delegation','1');
			document.body.addEventListener('click', function(e) {
				var link = e.target.closest('a');
				if (!link) return;
				var article = link.closest('.infinite-item-page article');
				if (!article || !article.classList.contains('modaleVTR')) return;
				
				// Escludi i link dentro la classe .gtv-program-title
				if (link.closest('.gtv-program-title')) return;
				
				e.preventDefault();
				// data-program-id
				call_info_programma(article.dataset.programId, link);
			});
		}
	}
}
link_in_pagina();

function call_info_programma(programId, link) {
	fetch(`https://programma.sorrisi.com/program-info.php?id=${programId}`)
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json()
		})
		.then(data => {
			console.log(data);
			if (data) {
				openModalVTR(data, link);
			}
		})
		.catch(error => {
			console.error('There has been a problem with your fetch operation:', error);
			showErrorModalVTR();
		});
}

function createModalVTR() {
	let modalVTRdiv = document.createElement('div');
	modalVTRdiv.classList.add('bodymodaleVTR');
	modalVTRdiv.innerHTML = `
		<div class="gtv-bodymodaleVTR-scroll">
			<div class="gtv-bodymodaleVTR-season-episode"></div>
			<div class="gtv-bodymodaleVTR-title"></div>
			<figure class="gtv-bodymodaleVTR-image-container">
				<img class="gtv-bodymodaleVTR-image" src="">
				<div class="gtv-mod9">
					<ul class="gtv-mod9-share">
						<li class="gtv-mod9-share-facebook"><a id="facebook-share" href="#">Condividi</a></li>
						<li class="gtv-mod9-share-twitter"><a id="twitter-share" href="#">Tweet</a></li>
					</ul>
				</div>
			</figure>
			<div class="gtv-bodymodaleVTR-title-serie"></div>
			<div class="gtv-bodymodaleVTR-description-title">TRAMA</div>
			<div class="gtv-bodymodaleVTR-description"></div>		
		</div>
		<div class="gtv-mod8-close"></div>
		<a href="" class="gtv-bodymodaleVTR-button">VEDI CAST E PROGRAMMAZIONE</a>
	`;
	document.body.appendChild(modalVTRdiv);
	// div per l'errore
	const errorDiv = document.createElement('div');
	errorDiv.classList.add('gtv-bodymodaleVTR-error');
	errorDiv.innerHTML = 'C\'è stato un errore nel caricamento del programma';
	document.body.appendChild(errorDiv);
	// div per il background
	const backgroundDiv = document.createElement('div');
	backgroundDiv.classList.add('gtv-bodymodaleVTR-background');
	backgroundDiv.innerHTML = '';
	document.body.appendChild(backgroundDiv);
	return modalVTRdiv;
}

function showErrorModalVTR() {
	const errorDiv = document.querySelector('.gtv-bodymodaleVTR-error');
	errorDiv.classList.add('open');
	// timeout 5 secondi
	setTimeout(() => {
		errorDiv.classList.remove('open');
	}, 5000);
}

function openModalVTR(data, link) {
	// rimuovo l'errore se esiste
	const errorDiv = document.querySelector('.gtv-bodymodaleVTR-error');
	errorDiv.classList.remove('open');
	const backgroundDiv = document.querySelector('.gtv-bodymodaleVTR-background');
	const modalVTR = document.querySelector('.bodymodaleVTR');
	const title = modalVTR.querySelector('.gtv-bodymodaleVTR-title');
	const seasonEpisode = modalVTR.querySelector('.gtv-bodymodaleVTR-season-episode');
	const titleSerie = modalVTR.querySelector('.gtv-bodymodaleVTR-title-serie');
	const image = modalVTR.querySelector('.gtv-bodymodaleVTR-image');
	const descriptionTitle = modalVTR.querySelector('.gtv-bodymodaleVTR-description-title');
	const description = modalVTR.querySelector('.gtv-bodymodaleVTR-description');
	const button = modalVTR.querySelector('.gtv-bodymodaleVTR-button');
	const shareFacebook = modalVTR.querySelector('.gtv-mod9-share-facebook a');
	const shareTwitter = modalVTR.querySelector('.gtv-mod9-share-twitter a');
	let il_titolo = data.titolo;
	const titolo_trama = '<p><b>TRAMA</b></p>';
	descriptionTitle.innerHTML = titolo_trama;
	if (data.immagine_grande) {
		// set CSS variable used by .bodymodaleVTR::before { background-image: var(--modal-bg); }
		modalVTR.style.setProperty('--modal-bg', `url(${data.immagine_grande})`);
		image.src = data.immagine_grande;
	} else if (data.immagine) {
		modalVTR.style.setProperty('--modal-bg', `url(${data.immagine})`);
		image.src = data.immagine;
	}
	if (data.titolo_serie) {
		// se titleSerie esiste sovrascrivo il titolo
		il_titolo = data.titolo_serie;
		titleSerie.innerHTML = data.titolo;
		descriptionTitle.innerHTML = '<p><b>TRAMA EPISODIO</b></p>';
	}
	title.innerHTML = il_titolo;
	if (data.stagione && data.episodio) {
		seasonEpisode.innerHTML = `Stagione ${data.stagione} - Episodio ${data.episodio}`;
	}
	if (data.trama) {
		description.innerHTML = data.trama;
	}
	if (link) {
		shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${link}`;
		shareTwitter.href = `https://twitter.com/home?status=${il_titolo}: Guida TV  - TV Sorrisi e Canzoni ${link}`;
		button.href = link;
	}
	modalVTR.classList.add('open');
	backgroundDiv.classList.add('open');
	// add event listener to background div once (avoid multiple listeners)
	if (!backgroundDiv.getAttribute('data-vtr-background-listener')) {
		backgroundDiv.setAttribute('data-vtr-background-listener', '1');
		backgroundDiv.addEventListener('click', () => {
			closeModalVTR();
		});
	}
	// add event listener to modalVTR close button once (avoid multiple listeners)
	if (!modalVTR.getAttribute('data-vtr-close-listener')) {
		modalVTR.setAttribute('data-vtr-close-listener', '1');
		modalVTR.querySelector('.gtv-mod8-close').addEventListener('click', () => {
			closeModalVTR();
		});
	}
}

function closeModalVTR() {
	const modalVTR = document.querySelector('.bodymodaleVTR');
	const backgroundDiv = document.querySelector('.gtv-bodymodaleVTR-background');
	const title = modalVTR.querySelector('.gtv-bodymodaleVTR-title');
	const seasonEpisode = modalVTR.querySelector('.gtv-bodymodaleVTR-season-episode');
	const titleSerie = modalVTR.querySelector('.gtv-bodymodaleVTR-title-serie');
	const image = modalVTR.querySelector('.gtv-bodymodaleVTR-image');
	const description = modalVTR.querySelector('.gtv-bodymodaleVTR-description');
	const button = modalVTR.querySelector('.gtv-bodymodaleVTR-button');
	const shareFacebook = modalVTR.querySelector('.gtv-mod9-share-facebook a');
	const shareTwitter = modalVTR.querySelector('.gtv-mod9-share-twitter a');
	const descriptionTitle = modalVTR.querySelector('.gtv-bodymodaleVTR-description-title');
	modalVTR.classList.remove('open');
	backgroundDiv.classList.remove('open');
	setTimeout(() => {
		modalVTR.style.removeProperty('--modal-bg');
		shareFacebook.href = "#";
		shareTwitter.href = "#";
		button.href = "#";
		title.innerHTML = "";
		seasonEpisode.innerHTML = "";
		titleSerie.innerHTML = "";
		image.innerHTML = "";
		description.innerHTML = "";
		descriptionTitle.innerHTML = '';		
	}, 500);
}
