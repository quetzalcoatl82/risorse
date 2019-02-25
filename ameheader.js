function strip_animation(){
    if (typeof AMEheader !== "undefined") {
      if(AMEheaderOptions.topstrip){
        if(isAnimationAllowed) {
          AMEheader.topstrip();
        }
      }
    }
  }
  
  /* topstrip module */
  (function(){
      if(typeof AMEheader === "undefined") { AMEheader = {}; }
  
      var header,
          staticContainer,
          flyingContainer,
          body,
          stripAdv;
  
      function init(){
          if(device == "desktop"){
              if(!is_bnzm_pdown) {
          $("#strip_adv").removeClass("advCollapse");
              header = document.getElementById("ameheader_header");
  
                  staticContainer = document.getElementsByClassName("static-container")[0];
                  flyingContainer = document.getElementsByClassName("flying-container")[0];
                  body = document.getElementsByTagName("body")[0];
                  stripAdv = document.getElementById("strip_adv");
  
                  // assegno l'altezza del blocco strip+header ai due contenitori in modo che allo scroll le parti di pagina che non devono scrollare schizzino verso l'altro
                  staticContainer.style.height = flyingContainer.offsetHeight + "px";
                  flyingContainer.style.height = staticContainer.offsetHeight + "px";
  
                  // assegno al body la classe "pushing" per far scrollare strip+header
                  body.classList.add("pushing");
  
                  // comunico alla logica che la push deve scrollare con l'utente
                  isPushing = true;
  
                  // controllo se abbiamo a che fare con una push o con una creativitÃ  di altro genere
                  console.log('Ã¨ una pushdown? ' + is_bnzm_pdown);
  
                  // nel caso in cui il contenitore della strip sia vuoto (altezza zero) annullo l'assegnazione delle altezze ai contenitori e tolgo la classe pushing: gli do 5 secondi
                  var mycount = 0;
                  var myint = setInterval(function() {
                      if (stripAdv.offsetHeight == 0) {
                          clearInterval(myint);
                          flyingContainer.style.height = "auto";
                          staticContainer.style.height = "auto";
                          body.classList.remove("pushing");
                      } else if (mycount == 5000) {
                          clearInterval(myint);
                      }
                      mycount += 100;
                  }, 100);
  
                  // gestisco la logica per le strip NO push (logica della push nei JS all'interno delle creativitÃ )
                  if (!is_bnzm_pdown) {
                      // conto 5s
                      setTimeout(
                          function() {
                              stripToTop();
                          },
                          5000
                      );
                  }
              }
          }
      }
  
      function stripToTop(){
          // se l'utente ha iniziato a scrollare
          var scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
  
          if (scrollTop > stripAdv.offsetHeight) {
              // rimuovo la classe pushing e metto la classe hiding per la dissolvenza
              body.classList.add("hiding");
  
              // attendo la dissolvenza sia terminata
              setTimeout(
                  // rimuovo la classe hiding e rimuovo le altezze date ai due contenitori
                  function() {
                      body.classList.remove('hiding');
                      body.classList.remove('pushing');
                      staticContainer.style.height = "auto";
                      flyingContainer.style.height = "auto";
                      // comunico alla logica che la push non deve piÃ¹ scrollare con l'utente
                      isPushing = false;
                  },
                  300
              );
              // se l'utente non ha iniziato a scrollare
          } else {
              // rimuovo la classe pushing ma non ho bisogno della classe hiding per la dissolvenza
              body.classList.remove('pushing');
              // rimuovo le altezze date ai due contenitori
              flyingContainer.style.height = "auto";
              staticContainer.style.height = "auto";
              // comunico alla logica che la push non deve piÃ¹ scrollare con l'utente
              isPushing = false;
          }
      }
  
      AMEheader.topstrip = init;
  }());  

/* search module */
(function(){
	if(typeof AMEheader === "undefined") { AMEheader = {}; }

	var search_input,
		search_form,
		search_button,
		search_params,
		search_close_button,
		search_input_placeholder,
		search_placeholder_count,
		header;

	function init(params){
		if(typeof params !== "undefined" && Object.keys(params).length > 0){
			search_params = params;
		} else {
			search_params = {};
		}

		search_input = document.getElementsByClassName("ameheader_search_input")[0];
		search_form = document.getElementsByClassName("ameheader_search_form")[0];
		search_button = document.getElementById("ameheader_search");
		search_close_button = document.getElementById("ameheader_search_close");
		search_input_placeholder = search_params.placeholder ? search_params.placeholder : "Cerca...";
		search_placeholder_count = 0;
		header = document.getElementById("ameheader_header");
		bindHandlers();
	}

	function bindHandlers(){
		if(search_button && search_close_button){
			search_button.addEventListener('click', toggleSearch, false);
			search_close_button.addEventListener('click', toggleSearch, false);
			if(search_params.submitCallback){
				search_form.addEventListener('submit', function(ev){
					window[search_params.submitCallback](ev);
				}, false);
			}
		}

		if(search_input_placeholder && search_params.visible){
			search_input.placeholder = search_input_placeholder;
			search_placeholder_count = 0;
		}
	}

	function toggleSearch(ev){
		ev.preventDefault();
		ev.stopImmediatePropagation();
		if(header.classList.contains("ameheader_search_opened")){
			header.classList.remove("ameheader_search_opened");
			search_input.placeholder = search_input_placeholder;
			search_placeholder_count = 0;
		} else {
			header.classList.add("ameheader_search_opened");
			setTimeout(function(){
				if(search_input_placeholder){
					amimatePlaceholder();
				}
			},300);
		}
	}

	function amimatePlaceholder(){
		search_input.placeholder = "";
		printLetter(search_input_placeholder, search_input);
	}

	function delay(min, max){
		return Math.floor(Math.random() * (max-min+1)+min);
	}

	function printLetter(string, el) {
		var arr = string.split(""),
			input = el,
			origString = string,
			curPlace = input.placeholder,
			placeholder = curPlace + arr[search_placeholder_count];

		setTimeout(function(){
			input.placeholder = placeholder;
			search_placeholder_count++;
			if (search_placeholder_count < arr.length) {
				printLetter(origString, input);
			} else {
				input.focus();
			}
		}, delay(20, 30));
	}

	AMEheader.search = init;
}());

/* tal module */
(function(){
	if(typeof AMEheader === "undefined") { AMEheader = {}; }

	var overlay;

	function init(){
		overlay = document.getElementById("ameheader_overlay");
		setTalMode();
	}

	function setTalMode(){
		if(overlay){
			overlay.classList.add("ameheader_tal_mode");
		}
	}

	AMEheader.tal = init;
}());

/* social module */
(function(){
	if(typeof AMEheader === "undefined") { AMEheader = {}; }

	var overlay_social;

	function init(params){
		var overlay_social = document.getElementById("ameheader_overlay_social");

		if(typeof params !== "undefined" && params.length > 0){
			var social_links = getSocialLinks(params);
			if(social_links != ""){
				overlay_social.innerHTML = social_links;
				overlay_social.classList.remove("ameheader_hidden");
			}
		}
	}

	function getSocialLinks(social_list) {
		var list = social_list,
			links = "";

		for (var i = 0; i < list.length; i++) {
			links += '<a href="'+list[i].url+'" class="ameheader_social_channel '+list[i].className+'" title="'+list[i].name+'" target="_blank" rel="nofollow">'+list[i].name+'</a>';
		}

		return links;
	}

	AMEheader.social = init;
}());

/* special module */
(function(){
	if(typeof AMEheader === "undefined") { AMEheader = {}; }

	function init(params){
		if(typeof params !== "undefined" && Object.keys(params).length > 0){
			for(var i in params){
				if(!params[i]){
					AMEheader.hideComponent(i);
				}
			}
		}
	}

	AMEheader.special = init;
}());

/* populateLogos module */
(function(){
	if(typeof AMEheader === "undefined") { AMEheader = {}; }

	var logo,
		second_logo;

	function init(){
		logo = document.getElementById("ameheader_logo");
		second_logo = document.getElementById("ameheader_second_logo");
		populate();
	}

	function populate(){
		if(logo && second_logo){
			logo.innerHTML = second_logo.innerHTML;
		}
	}

	AMEheader.populateLogos = init;
}());

/* calcNavigationWidth module */
(function(){
	if(typeof AMEheader === "undefined") { AMEheader = {}; }

	var nav,
		nav_overflow,
		nav_overflow_menu,
		extra,
		nav_margin = 0,
		width;

	function init(){
		nav = document.getElementById("ameheader_nav");
		nav_overflow = document.getElementById("ameheader_nav_overflow");
		nav_overflow_menu = document.getElementById("ameheader_nav_overflow_menu");
		extra = document.getElementById("ameheader_extra");
		nav_ul = nav.querySelector(".ameheader_nav > ul");

		nav_ul.style.width = "auto";
		toggleOverflowMenu();

		window.addEventListener('scroll', toggleOverflowMenu, false);
		window.addEventListener('resize', toggleOverflowMenu, false);

	}

	function toggleOverflowMenu(){
		var offset,
			offset_width = 0;

		if(extra){
			offset_width = extra.offsetWidth;
		}

		if(width != offset_width) {
			width = offset_width;
			nav_overflow.style.width = offset_width + "px";
		}

		if(typeof window.getComputedStyle !== "undefined"){
			if(nav_margin != parseFloat(window.getComputedStyle(nav,null).getPropertyValue("margin-left")) + parseFloat(window.getComputedStyle(nav,null).getPropertyValue("margin-right"))) {
				nav_margin = parseFloat(window.getComputedStyle(nav,null).getPropertyValue("margin-left")) + parseFloat(window.getComputedStyle(nav,null).getPropertyValue("margin-right"));
			}
		}

		offset = window.innerWidth - (width + nav_margin);

		if(offset < nav_ul.offsetWidth){
			nav_overflow_menu.classList.remove("ameheader_hidden");
		}else{
			nav_overflow_menu.classList.add("ameheader_hidden");
		}
	}

	AMEheader.calcNavigationWidth = init;
}());

/* populateOverlay module */
(function(){
	if(typeof AMEheader === "undefined") { AMEheader = {}; }

	var prefix = "ameheader_",
		el,
		overlay_el;

	function init(el_name,overlay_el_name,mainmenu){
		el = document.getElementById(prefix + el_name);
		overlay_el = document.getElementById(prefix + overlay_el_name);
		populate(mainmenu);
	}

	function populate(mainmenu){
		if(el && overlay_el){
			if(mainmenu){
				overlay_el.innerHTML = mainmenu.replace('<li class="ameheader_section"></li>', el.querySelector('ul').innerHTML);
				overlay_el.querySelector('.ameheader_section').classList.add("selected");
			} else {
				overlay_el.innerHTML = el.innerHTML;
			}
		}
	}

	AMEheader.populateOverlay = init;
}());

/* hideComponent module */
(function(){
	if(typeof AMEheader === "undefined") { AMEheader = {}; }

	var prefix = "ameheader_",
		el;

	function init(el_name){
		el = document.getElementById(prefix + el_name);
		hide();
	}

	function hide(){
		if(el){
			el.classList.add("ameheader_hidden");
		}
	}

	AMEheader.hideComponent = init;
}());

/* menuManager module */
(function(){
	if(typeof AMEheader === "undefined") { AMEheader = {}; }

	var children;

	function init(){
		children = document.querySelectorAll(".ameheader_has_children");

		for(var i = 0; i < children.length; i++) {
			buildAccordion(children[i]);
		}

		checkSelected("nav");
		checkSelected("overlay_nav");
	}

	function checkSelected(navType){
		var nav = document.getElementById("ameheader_" + navType);
		var selectedElements = nav.querySelectorAll(".selected");

		if(selectedElements.length > 0){
			var lastOfSelected = selectedElements[selectedElements.length-1];

			for (var i = (navType == "nav") ? 1 : 0; i < selectedElements.length; i++) {
				if(selectedElements[i] != lastOfSelected && selectedElements[i].classList.contains("selected")){
					selectedElements[i].classList.remove("selected");
				}
			}
		}
	}

	function buildAccordion(item){
	    var target = item;
	    if(target.classList.contains("selected")){
	    	target.classList.add("opened");
	    }

	    var links = target.querySelectorAll('.ameheader_has_children a');
	    for (var i = 0; i < links.length; i++) {
		    links[i].addEventListener('click', function (ev) {
		        ev.stopPropagation();
		    });
	    }

	    target.addEventListener('click', handleAccordion, false);
	}

	function handleAccordion(ev){
		ev.preventDefault();
		ev.stopPropagation();
		var currentTarget = this;

		if(currentTarget.classList.contains("opened")){
			currentTarget.classList.remove("opened");
		} else {
			currentTarget.classList.add("opened");
		}
	}

	AMEheader.menuManager = init;
}());

/* stickyHeader module */
(function(){
	if(typeof AMEheader === "undefined") { AMEheader = {}; }

	var body,
		header,
		header_top_container,
		nav,
		secondLevelNavs,
		tal,
		cover,
		strip_adv,
		stuck;

	function init(){
		body = document.getElementsByTagName("body")[0];
		header = document.getElementById("ameheader_header");
		header_top_container = document.getElementById("ameheader_top_container");
		nav = document.getElementById("ameheader_nav");
		secondLevelNavs = header.classList.contains("ameheader_thirdlevel") ? nav.querySelectorAll('.ameheader_section ul > .ameheader_has_children > ul') : nav.querySelectorAll('ul:first-child > .ameheader_has_children > ul');
		tal = document.getElementById("ameheader_tal");
		cover = document.getElementById("ameheader_cover");
		strip_adv = document.getElementById("strip_adv");
		pamela = document.getElementById("av-pushdown-wrapper");
		stuck = false;

		window.addEventListener("scroll", handleSticky);
	}

	function getOffsetTop(){
		var offset = 0;
		if(header_top_container){
			offset += header_top_container.offsetHeight;
		}
		if(tal){
			offset += tal.offsetHeight;
		}

		return offset;
	}

	function handleSticky(){
		var stick_point = getOffsetTop() + strip_adv.offsetHeight + pamela.offsetHeight;
		var distance = stick_point - window.pageYOffset;
		var offset = window.pageYOffset;

		if(!body.classList.contains("pushing")){
			if (distance <= 0 && !stuck) {
				header.classList.add("ameheader_header_sticky");
				body.classList.add("ameheader_sticky");
				stuck = true;
			} else if (stuck && (offset <= stick_point)){
				header.classList.remove("ameheader_header_sticky");
				body.classList.remove("ameheader_sticky");
				stuck = false;
			}
		}

		positionSecondLevelNavs();
	}

	function positionSecondLevelNavs(){
		if(!body.classList.contains("pushing")){
			for (var i = 0; i < secondLevelNavs.length; i++) {
				var ul = secondLevelNavs[i];
				if(header.classList.contains("ameheader_header_sticky")){
					ul.style.top = "auto";
				}else{
					ul.style.top = getOffsetTop() + 55 + strip_adv.offsetHeight + pamela.offsetHeight - window.pageYOffset + "px";
				}
			}
		}
	}

	AMEheader.stickyHeader = init;
}());

/* handlers module */
(function(){
	if(typeof AMEheader === "undefined") { AMEheader = {}; }

	var body,
		html,
		hamburger,
		close_button,
		close_panel,
		open_menu,
		overlay_container,
		nav_overflow_menu,
		pageYOffset;

	function init(){
		html = document.getElementsByTagName("html")[0];
		body = document.getElementsByTagName("body")[0];
		hamburger = document.getElementById("ameheader_hamburger");
		open_menu = document.getElementsByClassName("ameheader_open_menu");
		close_button = document.getElementById("ameheader_overlay_close");
		close_panel = document.getElementById("ameheader_overlay_close_panel");
		nav_overflow_menu = document.getElementById("ameheader_nav_overflow_menu");
		bindHandlers();
	}

	function bindHandlers(){
		hamburger.addEventListener("click", toggleOverlay, false);
		for (var i = 0; i < open_menu.length; i++) {
			open_menu[i].addEventListener("click", toggleOverlay, false);
		}
		close_button.addEventListener("click", toggleOverlay, false);
		nav_overflow_menu.addEventListener("click", toggleOverlay, false);
		close_panel.addEventListener("click", hideOverlay, false);
	}

	function toggleOverlay(ev){
		ev.preventDefault();
		ev.stopImmediatePropagation();
		if(body.classList.contains("ameheader_overlay_opened")){
			body.classList.remove("ameheader_overlay_opened");
			window.scrollTo(0,pageYOffset);
			document.removeEventListener("touchmove", preventScroll, false);
		} else {
			pageYOffset = window.pageYOffset;
			body.classList.add("ameheader_overlay_opened");
			document.addEventListener("touchmove", preventScroll, false);
		}
	}

	function preventScroll(ev){
	    if(!findParentByClassName(ev.target, "ameheader_overlay_opened")){
	    	ev.preventDefault();
	    }
	}

	function findParentByClassName(el,className) {
    	while (el.parentNode && el.parentElement !== html) {
        	el = el.parentNode;
        	if (el.classList.contains(className)){
            	return el;
        	}
    	}
    	return null;
	}

	function hideOverlay(ev){
		if(body.classList.contains("ameheader_overlay_opened")){
			body.classList.remove("ameheader_overlay_opened");
			document.removeEventListener("touchmove", preventScroll, false);
		}
	}

	AMEheader.handlers = init;
}());

/*
Inizializzazione AMEheader
- popolamento logo
- popolamento del menù di navigazione presente nell'overlay
- gestione del funzionamento del menù
- gestione sticky header allo scroll
- bind eventi generici
*/
(function(o){
	if(typeof o === "undefined") { return; }
	var AMEHeaderOptions = JSON.parse(JSON.stringify(o));

	AMEheader.populateLogos();
	if(AMEHeaderOptions["thirdlevel"]){
		AMEheader.populateOverlay("nav","overlay_nav",AMEHeaderOptions["thirdlevel"]);
	} else {
		AMEheader.populateOverlay("nav","overlay_nav");
	}

	AMEheader.menuManager();
	AMEheader.stickyHeader();
	AMEheader.handlers();

	for(var i in AMEHeaderOptions){
		if(i !== "topstrip"){
			if(AMEHeaderOptions[i]){
				AMEheader.populateOverlay(i, "overlay_" + i);
				if(AMEheader[i]){
					if(typeof AMEHeaderOptions[i] !== "boolean"){
						AMEheader[i](AMEHeaderOptions[i]);
					} else {
						AMEheader[i]();
					}
				}
			} else {
				AMEheader.hideComponent(i);
			}
		}
	}

	AMEheader.calcNavigationWidth();
})(AMEheaderOptions);

/* script cross-90 */

(function(w,d) {
    // the class that take care of listeners and fixing the header
    var advHandler = function() {
        
        this.is720 = false;
        // check first if mm_stript1 event size is 720
        googletag.pubads().addEventListener('slotRenderEnded', function (e) {
            if (mm_stript1 && e.slot === mm_stript1) { // only for mm_stript1
                if (Array.isArray(e.size) && e.size[0] === 720) {
                    this.is720 = true;
                }
            }
        }.bind(this))
        // after the resize by header.js I can finally maybe fix the header
        googletag.pubads().addEventListener('slotOnload', function (e) {
            if (mm_stript1 && e.slot === mm_stript1 && this.is720) {
                this.maybeFixHeader();
            }
        }.bind(this));
        
        // check if we have to fix the header
        this.maybeFixHeader = function () {
            var wrap = document.getElementById('strip_adv');
            var adv = wrap.firstElementChild;
            
            if (adv && wrap) {
                this.fixHeader(adv, wrap);
            }
        }
        // fix adv
        this.fixHeader = function(adv, wrap) {
            var rect = adv.getBoundingClientRect(),
                advOffset = adv.offsetTop;
            // styles for adv and wrapper
            var advFixedStyle = 'position: fixed;' +
                'top: ' + advOffset + ';' +
                'left: ' + rect.left + ';' +
                'width: ' + rect.width + ';' +
                'z-index: 99;';
            var wrapFixedStyle = 'width: ' + rect.width + 'px;' +
                'height: ' + rect.height + 'px;';
            // fix adv and set placeholder
            setTimeout(function() {
                adv.style.cssText = advFixedStyle;
                wrap.style.cssText = wrapFixedStyle;
            }, 500);
            setTimeout(function() {
                adv.removeAttribute('style');
                wrap.removeAttribute('style');
            }, 3500);
        }
    };
    // activate feature only on mobile
    if (w.matchMedia("(max-width: 480px)").matches) {
        // Make sure that googletag.cmd exists.
        w.googletag = w.googletag || {};
        googletag.cmd = googletag.cmd || [];
        // queue our listener
        googletag.cmd.push(advHandler);
    }
})(window, document);