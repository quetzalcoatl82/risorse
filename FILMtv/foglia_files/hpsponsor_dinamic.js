function loadSkinWeb(colore_sfondo_w,img_web_w,posizione_w,altezza_testata_w,url_puntamento_personalizzazione_w,statusStrip_w,status300x100_w,statusRichMedia_w){
	console.log('----------------------> SkinWeb attiva 2.4');	
	var cssSkinWebObj = document.createElement('style');
	
	
	if(cssTemplateSkin == 1){//tutto il sito
	
	cssSkinWeb = '/*css skin web*/';
	cssSkinWeb += 'body {background: url('+img_web_w+') no-repeat center top '+colore_sfondo_w+' '+posizione_w+' !important;background-size: 1539px auto !important;}';
	//cssSkinWeb += 'body {background: '+colore_sfondo_w+' !important;}';
cssSkinWeb += 'a.adv_esterno {display:block;width:100%;height:1000px;color:#000; margin-top:0; position:fixed;top:0px; left:0px;}';    
cssSkinWeb += '#contenitore-sito-x-adv{background: url('+img_web_w+') no-repeat center top '+colore_sfondo_w+';background-size: 1539px auto !important; height:840px !important;width:100%;margin:0 auto;display:block;}';
cssSkinWeb += '.wrapper{margin-top: '+(parseInt(altezza_testata_w) + 2 - 840)+'px !important;width:1005px;margin:0 auto;display:block;background: #fff;}';
//cssSkinWeb += '.bannerStrip {margin: 0 auto;text-align: center;width: 980px;padding: 10px 0 10px 0;background-color: #fff;}';

cssSkinWeb += '#more-film,.wrapper,.firme-wrap,.footer-wrap{position:relative;}';


	
	cssSkinWeb += '@media only screen and (min-width: 768px){.menu-filtri{margin-bottom:40px;}.box-pp{width: 980px; margin: 0 auto;}/* HEADER */.header-wrap{width:980px; margin: 0 auto;}.header-wrap .header{padding:0 20px;}.header-wrap .header .utente{padding-right:240px;}.header-wrap .header .utente .primo-piano{right:62px;}.header-wrap .header .utente .ilpost{right:-10px;}/* Header light */.header-wrap .header .utente{right:20px;}/* WRAPPER */.wrapper{padding:25px 20px}/* FIRME -------------------------------------------*/.firme-wrap .firme{width:940px;}.firme-wrap .firme .wrapper-lista-autori{width:930px;}/* SCHEDA-------------------------------------------*/.wrapper-scheda{width:980px; padding:0;}.wrapper-scheda .scheda-head{width:980px;}.wrapper-scheda .scheda-head .wrap-head > h1{padding-left:270px;}.wrapper-scheda .scheda-head .wrap-head-content{width:620px; padding-left:270px;}.wrapper-scheda .scheda-film-head .head-content .locandina{left:20px;}.wrapper-scheda .scheda-film-head .block-voti{right:20px;}.wrapper-scheda .content-scheda{padding:0 20px;}.wrapper-scheda .scheda-desc .social-tool{left:auto; right:30px; top:10px;}.wrapper-scheda .scheda-desc .social-tool li{float:left; margin-left:10px;}.wrapper-scheda .scheda-desc .social-tool .arrow{display:none;}.wrapper-scheda .items-list{left:-20px; padding:0 0 80px 20px; background-position:8px 0;}.wrapper-scheda .items-list .item{margin:0 0 54px;}.wrapper-scheda .items-list .time{top:-24px; left:-21px; width:602px; height:30px; line-height:30px; padding:0 10px 0 20px; text-align:left; font-size:15px;}.wrapper-scheda .items-list .item.item-light .time{top:-24px;}.wrapper-scheda .items-list .time span{display:inline; line-height:30px; font-size:23px;}.wrapper-scheda .items-list .time .triangle{display:none;}.wrapper-scheda .items-list .year-title{margin:0 0 40px;}.wrapper-scheda .items-list .year-title div{left:-12px;}.wrapper-scheda .scheda-desc .arrow-wrap .arrow{display:none;}.content-scheda .content > .social-tool{float:left; clear:both; position:static; margin:0 0 20px;}.content-scheda .content > .social-tool ul li{float:left; margin:0 10px;}/* SCHEDA PERSONA */.wrapper-scheda .scheda-persona-head .head-content .foto{left:20px;}.wrapper-scheda .scheda-head .wrap-head-content .aggiungi,.wrapper-scheda .scheda-head .wrap-head-content .periodo-att{right:20px;}.scheda-persona-head .visione{width:480px;}/* Community Firma */.wrapper-scheda-firma .wrap-head .nav-firme,.wrapper-scheda-firma .wrap-head .header-firma{padding-left:20px; padding-right:20px;}.wrapper-scheda-firma .wrap-head .seguaci{right:20px;}.wrapper-scheda-firma .wrap-head .header-segui .bkg-appassionati .slides-wrap{padding:0;}/* SCHEDA SPECIALE */.wrapper-scheda .scheda-speciale-head .head-content .foto{left:20px; top:-290px; width:212px;}.behind-overlay{display: none;}.dark-bkg {background: none;}.header-light-wrap.jq-scroll-fixed .header-light{width: 960px; padding: 0;}.content{background-color: transparent;}/* MODIFICA GALLERY */.dark-bkg .wrapper-md.modale-foto, .dark-bkg .wrapper-md.modale-video{width:960px;}.header-light-wrap .header-light .nav > ul > li > a {padding:0 8px; font-size:13px;} }';	
	
	cssSkinWeb += '@media only screen and (min-width: 768px){.wrapper-scheda .scheda-head .wrap-head > h1.overL{font-size:24px;}.wrapper-scheda .scheda-head .wrap-head > h1.overXL{font-size:26px; line-height:38px}.wrapper-scheda .scheda-head .wrap-head > h1.overXXL{font-size:22px; line-height:26px}.wrapper-scheda .items-list .item.item-voto h1{margin-top: 25px;} }';

	
	cssSkinWeb += '@media only screen and (min-width: 768px) and (max-width: 1023px){ body{background-size:1130px auto !important;}#contenitore-sito-x-adv{margin-top: '+(parseInt(altezza_testata_w) - 1000-20)+'px !important;} }';
	
	
	cssSkinWeb += '@media only screen and (max-width: 500px){ .bannerStrip {width: 100%;}}';
	
	cssSkinWeb += '.skinPositionScroll{ background: url('+img_web_w+') no-repeat center top '+colore_sfondo_w+' fixed !important; }';
	
	cssSkinWeb += '@media only screen and (min-width: 768px){.wrapper-scheda,.wrapper-scheda .scheda-head {width: 1047px;}.wrapper-scheda .scheda-head .wrap-head-content {width: 687px;} }';
	
	
	cssSkinWebObj.innerHTML = cssSkinWeb;
	///blocco variabili	
	statusPersonalizzazioniWeb = true;
	statusStrip = statusStrip_w;
  	status300x100 = status300x100_w;
  	statusRichMedia = statusRichMedia_w;
	
	
	//css
	$( cssSkinWebObj ).insertAfter( ".static-container" );
	//contenitore
	$( "<div id='contenitore-sito-x-adv'></div>" ).insertAfter( ".static-container" );
	//link
	$( "<a class='adv_esterno' href='"+url_puntamento_personalizzazione_w+"' target='_blank' ></a>" ).insertAfter( ".static-container" );
		
		
		$(window).scroll(function() {
			var scrollPos = $(this).scrollTop();
			//console.log('skin web posizione:',scrollPos);
			if(statusPersonalizzazioniWeb == true){
				//da popolare
				if(scrollPos >= 250){
					$('#contenitore-sito-x-adv').addClass('skinPositionScroll');
				}else{
					$('#contenitore-sito-x-adv').removeClass('skinPositionScroll');
				}
			}
		});
		
	}else if(cssTemplateSkin = 2){//home page
		
		cssSkinWeb = '/*css skin web*/';
	cssSkinWeb += 'body {background: url('+img_web_w+') no-repeat center top '+colore_sfondo_w+' '+posizione_w+' !important;background-size: 1539px auto !important;}';
	//cssSkinWeb += 'body {background: '+colore_sfondo_w+' !important;}';
cssSkinWeb += 'a.adv_esterno {display:block;width:100%;height:1000px;color:#000; margin-top:0; position:fixed;top:0px; left:0px;}';    
cssSkinWeb += '#contenitore-sito-x-adv{background: url('+img_web_w+') no-repeat center top '+colore_sfondo_w+';background-size: 1539px auto !important; height:840px !important;width:100%;margin:0 auto;display:block;}';
cssSkinWeb += '.wrapper{width:1005px;margin:0 auto;display:block;background: #fff;}';
//cssSkinWeb += '.bannerStrip {margin: 0 auto;text-align: center;width: 980px;padding: 10px 0 10px 0;background-color: #fff;}';
cssSkinWeb += '.bannerStrip{margin-top: '+(parseInt(altezza_testata_w) + 2 - 840)+'px !important;width:1047px;margin:0 auto;display:block;background: #fff;padding:10px 0 10px 0;}';
		
cssSkinWeb += '#more-film,.wrapper,.firme-wrap,.footer-wrap{position:relative;}';


	
	cssSkinWeb += '@media only screen and (min-width: 768px){.menu-filtri{margin-bottom:40px;}/* HEADER */.header-wrap{position:relative; z-index: 1;margin-bottom: 0px;}.header-wrap .header{padding:0 20px;}.header-wrap .header .utente{padding-right:240px;}.header-wrap .header .utente .primo-piano{right:62px;}.header-wrap .header .utente .ilpost{right:-10px;}/* Header light */.header-wrap .header .utente{right:20px;}/* WRAPPER */.wrapper{padding:25px 20px}/* FIRME -------------------------------------------*/.firme-wrap .firme{width:940px;}.firme-wrap .firme .wrapper-lista-autori{width:930px;}/* SCHEDA-------------------------------------------*/.wrapper-scheda{width:980px; padding:0;}.wrapper-scheda .scheda-head{width:980px;}.wrapper-scheda .scheda-head .wrap-head > h1{padding-left:270px;}.wrapper-scheda .scheda-head .wrap-head-content{width:620px; padding-left:270px;}.wrapper-scheda .scheda-film-head .head-content .locandina{left:20px;}.wrapper-scheda .scheda-film-head .block-voti{right:20px;}.wrapper-scheda .content-scheda{padding:0 20px;}.wrapper-scheda .scheda-desc .social-tool{left:auto; right:30px; top:10px;}.wrapper-scheda .scheda-desc .social-tool li{float:left; margin-left:10px;}.wrapper-scheda .scheda-desc .social-tool .arrow{display:none;}.wrapper-scheda .items-list{left:-20px; padding:0 0 80px 20px; background-position:8px 0;}.wrapper-scheda .items-list .item{margin:0 0 54px;}.wrapper-scheda .items-list .time{top:-24px; left:-21px; width:602px; height:30px; line-height:30px; padding:0 10px 0 20px; text-align:left; font-size:15px;}.wrapper-scheda .items-list .item.item-light .time{top:-24px;}.wrapper-scheda .items-list .time span{display:inline; line-height:30px; font-size:23px;}.wrapper-scheda .items-list .time .triangle{display:none;}.wrapper-scheda .items-list .year-title{margin:0 0 40px;}.wrapper-scheda .items-list .year-title div{left:-12px;}.wrapper-scheda .scheda-desc .arrow-wrap .arrow{display:none;}.content-scheda .content > .social-tool{float:left; clear:both; position:static; margin:0 0 20px;}.content-scheda .content > .social-tool ul li{float:left; margin:0 10px;}/* SCHEDA PERSONA */.wrapper-scheda .scheda-persona-head .head-content .foto{left:20px;}.wrapper-scheda .scheda-head .wrap-head-content .aggiungi,.wrapper-scheda .scheda-head .wrap-head-content .periodo-att{right:20px;}.scheda-persona-head .visione{width:480px;}/* Community Firma */.wrapper-scheda-firma .wrap-head .nav-firme,.wrapper-scheda-firma .wrap-head .header-firma{padding-left:20px; padding-right:20px;}.wrapper-scheda-firma .wrap-head .seguaci{right:20px;}.wrapper-scheda-firma .wrap-head .header-segui .bkg-appassionati .slides-wrap{padding:0;}/* SCHEDA SPECIALE */.wrapper-scheda .scheda-speciale-head .head-content .foto{left:20px; top:-290px; width:212px;}.behind-overlay{display: none;}.dark-bkg {background: none;}.header-light-wrap.jq-scroll-fixed .header-light{width: 960px; padding: 0;}.content{background-color: transparent;}/* MODIFICA GALLERY */.dark-bkg .wrapper-md.modale-foto, .dark-bkg .wrapper-md.modale-video{width:960px;}.header-light-wrap .header-light .nav > ul > li > a {padding:0 8px; font-size:13px;} }';	
	
	cssSkinWeb += '@media only screen and (min-width: 768px){.wrapper-scheda .scheda-head .wrap-head > h1.overL{font-size:24px;}.wrapper-scheda .scheda-head .wrap-head > h1.overXL{font-size:26px; line-height:38px}.wrapper-scheda .scheda-head .wrap-head > h1.overXXL{font-size:22px; line-height:26px}.wrapper-scheda .items-list .item.item-voto h1{margin-top: 25px;} }';

	
	cssSkinWeb += '@media only screen and (min-width: 768px) and (max-width: 1023px){ body{background-size:1130px auto !important;}#contenitore-sito-x-adv{margin-top: '+(parseInt(altezza_testata_w) - 1000-20)+'px !important;} }';
	
	
	cssSkinWeb += '@media only screen and (max-width: 500px){ .bannerStrip {width: 100%;}}';
	
	cssSkinWeb += '.skinPositionScroll{ background: url('+img_web_w+') no-repeat center top '+colore_sfondo_w+' fixed !important; }';
	
	cssSkinWeb += '@media only screen and (min-width: 768px){.wrapper-scheda,.wrapper-scheda .scheda-head {width: 1047px;}.wrapper-scheda .scheda-head .wrap-head-content {width: 687px;} }';
	
	
	cssSkinWebObj.innerHTML = cssSkinWeb;
	///blocco variabili	
	statusPersonalizzazioniWeb = true;
	statusStrip = statusStrip_w;
  	status300x100 = status300x100_w;
  	statusRichMedia = statusRichMedia_w;
	
	
	//css
	$( cssSkinWebObj ).insertAfter( ".header-wrap" );
	//contenitore
	$( "<div id='contenitore-sito-x-adv'></div>" ).insertAfter( ".header-wrap" );
	//link
	$( "<a class='adv_esterno' href='"+url_puntamento_personalizzazione_w+"' target='_blank' ></a>" ).insertAfter( ".header-wrap" );
		
		
		$(window).scroll(function() {
			var scrollPos = $(this).scrollTop();
			//console.log('skin web posizione:',scrollPos);
			if(statusPersonalizzazioniWeb == true){
				//da popolare
				if(scrollPos >= 600){
					$('#contenitore-sito-x-adv').addClass('skinPositionScroll');
				}else{
					$('#contenitore-sito-x-adv').removeClass('skinPositionScroll');
				}
			}
		});
		
	}
	
	
}//loadSkinWeb
// per controllare lo scroll ed aggiungere una classe che mi permette di cambiare la posizione del background
