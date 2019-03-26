if (bnzm_cpdata===undefined) { var bnzm_cpdata = { cpId: 8108345, sId: 800187, cpUrl: 'https://www.iubenda.com/privacy-policy/8108345/cookie-policy', lang: "it" }; }

(function(d,s){
	var styles, t, h = d.getElementsByTagName('head')[0];
	styles = '#iubenda-iframe{z-index:2147483647!important;}';
	styles += '#iubenda-cs-banner{top:0!important;left:0!important;position:fixed!important;width:100%!important;z-index:2147483647!important;background:#000;}';
	styles += '.iubenda-cs-content{display:block;margin:0 auto;padding:30px 30px 30px 20px;width:auto;font-family:Helvetica,Arial,FreeSans,sans-serif;font-size:16px;color:#fff!important;line-height:1.4}';
	styles += '.iubenda-cs-content b{font-weight:700;}';
	styles += '.iubenda-cs-rationale{max-width:900px;position:relative;margin:0 auto}';
	styles += '.iubenda-banner-content>p{font-family:Helvetica,Arial,FreeSans,sans-serif;}';
	styles += '.iubenda-cs-close-btn{box-sizing:border-box;color:#fff!important;text-decoration:none;font-size:12px;position:absolute;top:-20px;right:-20px;border:1px solid #fff!important;display:inline-block;width:20px;height:20px;line-height:18px;text-align:center;border-radius:10px}';
	styles += '.iubenda-cs-cookie-policy-lnk{text-decoration:underline!important;color:#fff!important;font-size:16px;font-weight:800}';
	styles += '@media only screen and (max-width: 480px){';
	styles += '#iubenda-cs-banner{top:auto!important;bottom:0!important;}';
	styles += '.iubenda-cs-content{padding:50px 30px 50px 20px;}';
	styles += '.iubenda-cs-close-btn{top:-30px;}';
	styles += '}';

	t = d.createElement('style');
	t.type = 'text/css';

	if (t.styleSheet){
	  t.styleSheet.cssText = styles;
	} else {
	  t.appendChild(d.createTextNode(styles));
	}

	h.appendChild(t);
})(document,'style');

var _iub = _iub || [];
_iub.csConfiguration = {
	cookiePolicyId: 	bnzm_cpdata.cpId,
	siteId: 			bnzm_cpdata.sId,
	cookiePolicyUrl: 	bnzm_cpdata.cpUrl,
	lang: 				bnzm_cpdata.lang,
	banner: 			{
							prependOnBody: false,
							applyStyles: false,
							content: "Questo sito utilizza cookie, di prima e di terza parte, per inviarti pubblicit&agrave; in linea con le tue preferenze. <b>Se vuoi saperne di pi&ugrave; o negare il consenso a tutti o ad alcuni cookie, %{cookie_policy_link}</b>. Chiudendo questo banner, scorrendo questa pagina, cliccando su un link o proseguendo la navigazione in altra maniera, acconsenti all&apos;uso dei cookie.",
							cookiePolicyLinkCaption: "clicca qui"
						},
	callback: 			{
							onConsentGiven: function() {
								if (typeof GTMConsent == "function") {
									GTMConsent();
								}
							},
                            onConsentFirstGiven: function() {
                                try{
                                    Krux('consent:set', {
                                        dc: true,
                                        al: true,
                                        tg: true,
                                        cd: true,
                                        sh: true,
                                        re: true
                                    }, function(errors, body) {
                                        if (errors) {
                                            console.error(errors);
                                        } else {
                                            console.log('Successfully set consent flags.');
                                        }
                                    });
                                } catch(e) {
                                    console.log(e.message);
                                }
                            },
							onCookiePolicyShown: function(){
								document.getElementById('iubenda-cs-banner').remove();
							}
						}
};

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

(function (w, d) {
 	if(getParameterByName('optoutg5') != '1'){
		var s = d.createElement("script"), tag = d.getElementsByTagName("script")[0];s.src = "https://static.stbm.it/cookie_policy/policy_ovl25072017.js";tag.parentNode.insertBefore(s, tag);
	}
})(window, document);

var check_optout;

jQuery(function() {
	check_optout = new check_optout();
	check_optout.init();

	check_iubenda = new check_iubenda();
	check_iubenda.init();
})

function check_optout() {
	var me = this;

	me.init = function() {
		//console.log('%c '+me.getCookie('dam_jca'),'color: #ff9900; font-weight: bold; background: #000');
		//console.log('%c '+me.getParameterByName('optoutg5'),'color: #ff9900; font-weight: bold; background: #000');

		if(me.getParameterByName('optoutg5') == '1') {


			me.deleteCookie('dam_jca');
			me.createCookie('optOutG5',1,7300);

			//console.log('%c '+me.getCookie('dam_jca'),'color: red; font-weight: bold; background: #000');

			var msgOpt = jQuery(document.createElement('div')).addClass('msgOpt').css({
				position: 'fixed',
				left: '0',
				bottom: '0',
				background: '#000',
				font: '400 14px/1.5em Lato, Arial, sans-serif',
				width: 'calc(100% - 60px)',
				'text-align' : 'center',
				color: '#fff',
				padding: '10px 30px',
				transform: 'translateY(100%)',
				transition: 'all 300ms ease-in-out',
				'z-index': 10000000000000
			}).text('Hai effettuato con successo l\'opt out sui cookie');
			var close = jQuery(document.createElement('div')).addClass('close').css({
					'background-image': 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC0xMDM2LjM2KSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Im0yIDEwNTAuMzZsMTItMTIiLz48cGF0aCBkPSJtMiAxMDM4LjM2bDEyIDEyIi8+PC9nPjwvc3ZnPg==)',
					'background-repeat': 'no-repeat',
					position: 'absolute',
					right: '10px',
					top: '10px',
					width: '15px',
					height: '15px',
					cursor: 'pointer'
			});

			msgOpt.append(close);
			jQuery('body').append(msgOpt);

			setTimeout(function(){
				msgOpt.css({
					transform: 'translateY(0)'
				});
			},1000);

			setTimeout(function(){
				msgOpt.css({
					transform: 'translateY(100%)'
				});
			},10000);

			close.click(function() {
				msgOpt.css({
					transform: 'translateY(100%)'
				});
			});
		}
	};

	me.getParameterByName = function (name, url) {
	    return getParameterByName(name, url);
	};

	me.createCookie = function(name,value,days) {
	    if (days) {
	        var date = new Date();
	        date.setTime(date.getTime()+(days*24*60*60*1000));
	        var expires = "; expires="+date.toGMTString();
	    }
	    else var expires = "";
	    document.cookie = name+"="+value+expires+"; path=/";
	};

	me.getCookie = function(name) {
	    var nameEQ = name + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0;i < ca.length;i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1,c.length);
	        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	    }
	    return null;
	};

	me.deleteCookie = function(name) {
	    me.createCookie(name,"",-1);
	};

}

function check_iubenda(){
	var me = this;
	var iubendaCsBannerId,
		interval;

	me.init = function() {
		iubendaCsBannerId = 'iubenda-cs-banner';
		if(!me.isConsentGiven(bnzm_cpdata.sId, bnzm_cpdata.cpId)){
			interval = setInterval(function(){
				me.detectCookieBannerPosition()
			},300);

			setTimeout(function(){
				clearInterval(interval);
			},10000);
		}
	};

	me.detectCookieBannerPosition = function() {
		if(me.isConsentGiven(bnzm_cpdata.sId, bnzm_cpdata.cpId)){
			clearInterval(interval);
			return;
		}

		var iubendaCsBanner = document.getElementById(iubendaCsBannerId);
		var lastBodyChild = jQuery('body').children().last();

		if(jQuery(iubendaCsBanner).length > 0 && jQuery(lastBodyChild).attr('id') != iubendaCsBannerId){
			jQuery(iubendaCsBanner).appendTo(document.body);
		}
	};

    me.isConsentGiven = function(siteId,cookiePolicyId){
		var cs = document.cookie.split(';');
		for (var i = 0; i < cs.length; i++) {
			while (cs[i].charAt(0) == ' ') cs[i] = cs[i].substring(1);
			if(cs[i].indexOf('_iub_cs-s'+ siteId) == 0||cs[i].indexOf('_iub_cs-'+ cookiePolicyId) == 0) return true;
		}
		return false;
    };
}
