/* in questo file sono raccolte tutte le funzioni comuni utilizzate dai file js*/
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/// INIT GPT //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var adxLoad = false;
var statusLoadGpt = false;
function checkPageAdv(){
    if(typeof(ADX_label) != 'undefined' && !statusLoadGpt){
        if(MMarrayUrlSkinControllo[1] != 'noadv' && (document.getElementById(divslotnameBox) || document.getElementById(divslotnameStrip))){
            initTagGpt();
            clearInterval(timerCheckPage);
            statusLoadGpt = true;
            console.log('[mediamond][initTagGpt]===>set intervall');
        }
    }
}
nomeSito = 'filmtv';
if(nomeSito == 'meteo'){
    function initGptIubenda(){
        console.log('[mediamond]===>call initGptIubenda');
        if((document.getElementById(divslotnameStrip) || document.getElementById(divslotnameBox)) && MMarrayUrlSkinControllo[1] != 'noadv'){
            timer2 = setInterval(function(){checkPageAdv();},100);
        }
    }
}else{
    var timerCheckPage = setInterval(function(){checkPageAdv();},100);
    window.addEventListener('load', function() {
        if(MMarrayUrlSkinControllo[1] != 'noadv' && !statusLoadGpt){
            initTagGpt();
            clearInterval(timerCheckPage);
            statusLoadGpt = false;
            console.log('[mediamond][initTagGpt]===>load windows');
        }
    });
}

/// fine init gpt
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/// resize minimasthead /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ResizeIframe4() {
	//===> prende come punto di riferimento il div divslotnameStrip configurato sulla pagina iniziale sempre presente in pagina
	//console.log('[mediamond]===>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
	console.log('[mediamond]===>ResizeIframe4');
    //var rifDivSlot = jQuery("#"+divslotnameStrip);
    var rifDivSlot = document.getElementById(divslotnameStrip);
    var  rifDivSlotW = rifDivSlot.offsetWidth;
	var rifPointIframeMinimasthead = jQuery("#"+divslotnameStrip).find("iframe");
	var rifPointDivMinimasthead = jQuery("#"+divslotnameStrip).find("div");
    console.log('[mediamond]===>rifDivSlot:'+rifDivSlot.offsetWidth);
	//console.log('[mediamond]===>rifPointIframeMinimasthead:'+rifPointIframeMinimasthead[0].offsetWidth);
	//console.log('[mediamond]===>rifPointDivMinimasthead:'+rifPointDivMinimasthead[0].offsetWidth);
	var iFrameGptMastHeadWidth = rifPointIframeMinimasthead[0].offsetWidth;
	if(rifDivSlotW <= MMlarghezzaSitoAdv){
        console.log('[mediamond]===>risize sulla larghezza del div');
		rifPointIframeMinimasthead[0].style.width = rifDivSlotW+'px';
		rifPointDivMinimasthead[0].style.width = rifDivSlotW+'px';
		var divGptMastHeadHeightValNew = Math.ceil(((rifDivSlotW*720)/240)/9);
		rifPointDivMinimasthead[0].style.height = divGptMastHeadHeightValNew+'px';
		rifPointIframeMinimasthead[0].style.height = divGptMastHeadHeightValNew+'px';
	}else{
        console.log('[mediamond]===>risize sulla larghezza della pagina');
        rifPointIframeMinimasthead[0].style.width = MMlarghezzaSitoAdv+'px';
		rifPointDivMinimasthead[0].style.width = MMlarghezzaSitoAdv+'px';
		var divGptMastHeadHeightValNew = Math.ceil(((MMlarghezzaSitoAdv*720)/240)/9);
		rifPointDivMinimasthead[0].style.height = divGptMastHeadHeightValNew+'px';
		rifPointIframeMinimasthead[0].style.height = divGptMastHeadHeightValNew+'px';
    }
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/// Comscore //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var lipHpsponsor = document.createElement("script");
lipHpsponsor.async = false;
lipHpsponsor.type = "text/javascript";
var useSSL = "https:" == document.location.protocol;
lipHpsponsor.src = (useSSL ? "https:" : "http:") + "//adv.mediamond.it/hp_sponsor/sezsito_comscore.js";
var node = document.getElementsByTagName("script")[0];
node.parentNode.insertBefore(lipHpsponsor, node);
//

if(nomeSito == 'skuola' || nomeSito == 'ilvicolodellenews'){
    
    //senza jquery
    function initComscore(campaignId,creativeId,lineItemId,size,pos,slot,nslot,divslot){	
	var sitoMM = document.location.hostname.replace("www.","").split(".")[0];
	if (MMarrayUrlSkin[3] != "" && MMarrayUrlSkin[3] != undefined && MMarrayUrlSkin[3].charAt(0) != '?') { 
		sezioneMMComscore = "_"+MMarrayUrlSkin[3];
	}else{
		sezioneMMComscore = '';
	}
        
    console.log('[mediamond][comscore]===>dati codice Comscore:campaignId='+campaignId+',creativeId='+creativeId+',lineItemId:'+lineItemId+',size='+size+',pos='+pos+',slot='+slot+',nslot='+nslot+',divslot='+divslot);    
	var urlPag = sezioneMMcmsc;//sitoMM+sezioneMMComscore;
	var devType = "_desk";
	if(navigator.userAgent.indexOf('iPhone') != -1)   { devType = "_mob_iPh"; } else if( navigator.userAgent.indexOf('iPad') != -1 )   { devType = "_mob_iPa"; } else if( navigator.userAgent.indexOf('Android') != -1 && navigator.userAgent.indexOf('Mobile') != -1 )   { devType = "_mob_AnS"; } else if( navigator.userAgent.indexOf('Android') != -1 && !navigator.userAgent.indexOf('Mobile') != -1  )   { devType = "_mob_AnT"; }
	//rifPointComscore non si popolava in caso di iframe di adex per problemi di cross domain (perchè se eroga adex l'iframe di dfp non è presente), quindi l'ho dichiarata prima come nuovo array 	
    if(campaignId != null){
       var sizeMod = size[0]+'x'+size[1]
    }else{
        var sizeMod = '';
    }
	//no jquery
    var iframeAdvSrcNoJquery1 = document.getElementById(divslot);
    var iframeAdvSrcNoJquery2 = iframeAdvSrcNoJquery1.getElementsByTagName("iframe")[0];
    var iframeAdvSrcNoJquery3 = iframeAdvSrcNoJquery2.getAttribute("src");
    console.log('[mediamond][comscore]===>iframeAdvSrcNoJquery3:'+iframeAdvSrcNoJquery3);
	if((iframeAdvSrcNoJquery3 == null || iframeAdvSrcNoJquery3 == undefined) && lineItemId != null){
        var rifPointComscoreNoJquery3 = iframeAdvSrcNoJquery2.contentDocument;
        var rifPointComscoreNoJquery4 = rifPointComscoreNoJquery3.getElementById("scriptComscore");
        console.log('[mediamond][comscore]===>scriptComscore presente');
		if(!rifPointComscoreNoJquery4){
			console.log('[mediamond][comscore]===>inserimento codice Comscore '+sizeMod+'...');

			var st = document.createElement('script');
			st.id="scriptComscore"+slot;
			st.type = 'text/javascript';
			st.async = true;
			st.src = "//sb.voicefive.com/c2/12315081/rs.js#c1=3&c3="+campaignId+"_"+lineItemId+"&c4="+sizeMod+"_"+pos+"_"+creativeId+devType+"&c5="+urlPag+devType+"&c11="+idSitoDfp+"&c12=&c13="+sizeMod+"&c16=dfp";
			document.getElementById(divslot).appendChild(st);

		}

	}else{
        
        console.log('[mediamond][comscore]===>inserimento codice Comscore '+sizeMod+' programmatic ...');

		var st = document.createElement('script');
		st.id="scriptComscore"+slot;
		st.type = 'text/javascript';
		st.async = true;
		st.src = "//sb.voicefive.com/c2/12315081/rs.js#c1=3&c3=programmatic&c4="+sizeMod+"_"+pos+devType+"&c5="+urlPag+devType+"&c11="+idSitoDfp+"&c12=&c13="+sizeMod+"&c16=dfp";
		document.getElementById(divslot).appendChild(st);

	}//if(iframeAdvBoxSrc == null || iframeAdvBoxSrc == undefined)

} 
    
}else{

    function initComscore(campaignId,creativeId,lineItemId,size,pos,slot,nslot,divslot){
        console.log('[mediamond][comscore]====>sezioneMMcmsc:'+sezioneMMcmsc);
        console.log('[mediamond][comscore]===>dati codice Comscore:campaignId='+campaignId+',creativeId='+creativeId+',lineItemId:'+lineItemId+',size='+size+',pos='+pos+',slot='+slot+',nslot='+nslot+',divslot='+divslot);
        var sitoMM = document.location.hostname.replace("www.","").split(".")[0];
        if (MMarrayUrlSkin[3] != "" && MMarrayUrlSkin[3] != undefined && MMarrayUrlSkin[3].charAt(0) != '?') {
            sezioneMMComscore = "_"+MMarrayUrlSkin[3];
        }else{
            sezioneMMComscore = '';
        }
        var urlPag = sezioneMMcmsc;//sitoMM+sezioneMMComscore;
        var custom3devType = "desktop"; if(navigator.userAgent.indexOf('iPhone') != -1)   { custom3devType = "mob_iphone"; } else if( navigator.userAgent.indexOf('iPad') != -1 )   { custom3devType = "mob_ipad"; } else if( navigator.userAgent.indexOf('Android') != -1 && navigator.userAgent.indexOf('Mobile') != -1 )   { custom3devType = "mob_android_sma"; } else if( navigator.userAgent.indexOf('Android') != -1 && !navigator.userAgent.indexOf('Mobile') != -1  )   { custom3devType = "mob_android_tab"; };
        //rifPointComscore non si popolava in caso di iframe di adex per problemi di cross domain (perchè se eroga adex l'iframe di dfp non è presente), quindi l'ho dichiarata prima come nuovo array
        var rifPointComscore = new Array();
        //---------------------------------------------------------------------------------------------------------------------------------------------
        var sizeMod = size[0]+'x'+size[1];
        //console.log('[mediamond]===>sizeMod:'+sizeMod);
        var iframeAdvSrc = jQuery('#'+divslot+' > div >iframe').attr('src');
        console.log('[mediamond][comscore]===>iframeAdvSrc:'+iframeAdvSrc);
        if((iframeAdvSrc == null || iframeAdvSrc == undefined) && lineItemId != null){
            rifPointComscore = jQuery('#'+divslot+' > div >iframe').contents().find('#scriptComscore');
            console.log('[mediamond][comscore]===>xxxx rifPointComscore:'+rifPointComscore.length);
            if(rifPointComscore.length == 0){
                console.log('[mediamond][comscore]===>inserimento codice Comscore '+sizeMod+'...');
                var st = document.createElement('script');
                st.id="scriptComscore"+slot;
                st.type = 'text/javascript';
                st.async = true;
                st.src = "//sb.voicefive.com/c2/12315081/rs.js#c1=3&c3="+campaignId+"_"+lineItemId+"&c4="+sizeMod+"_"+pos+"_"+creativeId+'_'+custom3devType+"&c5="+urlPag+'_'+custom3devType+"&c11="+idSitoDfp+"&c12=&c13="+sizeMod+"&c16=dfp";
                document.getElementById(divslot).appendChild(st);
            }
        }else if (lineItemId != null){
            console.log('[mediamond][comscore]===>inserimento codice Comscore 3th parti '+sizeMod+'...');
            var st = document.createElement('script');
                st.id="scriptComscore"+slot;
                st.type = 'text/javascript';
                st.async = true;
                st.src = "//sb.voicefive.com/c2/12315081/rs.js#c1=3&c3="+campaignId+"_"+lineItemId+"&c4="+sizeMod+"_"+pos+"_"+creativeId+'_'+custom3devType+"&c5="+urlPag+'_'+custom3devType+"&c11="+idSitoDfp+"&c12=&c13="+sizeMod+"&c16=dfp";
                document.getElementById(divslot).appendChild(st);
        }else{
            console.log('[mediamond][comscore]===>inserimento codice Comscore programmatic '+sizeMod+'...');
            var st = document.createElement('script');
            st.id="scriptComscore"+slot;
            st.type = 'text/javascript';
            st.async = true;
            st.src = "//sb.voicefive.com/c2/12315081/rs.js#c1=3&c3=programmatic&c4="+sizeMod+"_"+pos+'_'+custom3devType+"&c5="+urlPag+'_'+custom3devType+"&c11="+idSitoDfp+"&c12=&c13="+sizeMod+"&c16=dfp";
            document.getElementById(divslot).appendChild(st);
        }//if(iframeAdvBoxSrc == null || iframeAdvBoxSrc == undefined){
    }//initComscore();
    
}//if(nomeSito == 'skuola'){

//setInterval(function(){ initComscore(); }, 5000);
/// fine comscore ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
///ias ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function initIAS(campaignId,creativeId,lineItemId,size,pos,divslot){
    console.log('[mediamond][IAS]===>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
   //if(MMarrayUrlSkinControllo[1] == 'testIas'){
        //no jquery
        
        console.log('[mediamond][IAS]===>dati codice IAS:campaignId='+campaignId+',creativeId='+creativeId+',lineItemId:'+lineItemId+',size='+size+',pos='+pos+',divslot='+divslot);
    
        MMsezioneTagOrig = MMsezioneTag.replace('/4758/','','ig').replace('/','_','ig');
        //console.log('[mediamond][IAS]===>MMsezioneTagOrig:'+MMsezioneTagOrig);

         if(campaignId != null){
           var sizeMod = size[0]+'x'+size[1]
        }else{
            var sizeMod = '';
        }

        var sitoMM = document.location.hostname.replace("www.","").split(".")[0];
        if (MMarrayUrlSkin[3] != "" && MMarrayUrlSkin[3] != undefined && MMarrayUrlSkin[3].charAt(0) != '?') {
            sezioneMMComscore = "_"+MMarrayUrlSkin[3];
        }else{
            sezioneMMComscore = '';
        }

        //console.log('[mediamond][IAS]===>sezioneMMComscore:'+sezioneMMComscore);

        var urlPag = sitoMM+sezioneMMComscore;
        // console.log('[mediamond][IAS]===>urlPag:'+urlPag);

        var custom3devType = "desktop"; if(navigator.userAgent.indexOf('iPhone') != -1)   { custom3devType = "mob_iphone"; } else if( navigator.userAgent.indexOf('iPad') != -1 )   { custom3devType = "mob_ipad"; } else if( navigator.userAgent.indexOf('Android') != -1 && navigator.userAgent.indexOf('Mobile') != -1 )   { custom3devType = "mob_android_sma"; } else if( navigator.userAgent.indexOf('Android') != -1 && !navigator.userAgent.indexOf('Mobile') != -1  )   { custom3devType = "mob_android_tab"; }
        //console.log('[mediamond][IAS]===>custom3devType:'+custom3devType);


        //rifPointIAS0 = jQuery('#'+divslot+' > div >iframe').attr('src');
        
         var iframeAdvSrcNoJquery1 = document.getElementById(divslot);
        var iframeAdvSrcNoJquery2 = iframeAdvSrcNoJquery1.getElementsByTagName("iframe")[0];
        var rifPointIAS0 = iframeAdvSrcNoJquery2.getAttribute("src");
         console.log('[mediamond][IAS]===>src iframe:'+rifPointIAS0);
        
      var rifPointIAS0Array = [];
        if(rifPointIAS0 != undefined && rifPointIAS0 != null){
             var rifPointIAS0Replace = rifPointIAS0.replace('http://','').replace('https://','');
             console.log('[mediamond][IAS]===>rifPointIAS0Replace:'+rifPointIAS0Replace);
            rifPointIAS0Array = rifPointIAS0Replace.split('/');
            console.log('[mediamond][IAS]===>rifPointIAS0Array:'+rifPointIAS0Array[1]);
        }
        
       

        var cachebusterIAS = Math.floor(Math.random() * 10000000000); 
            console.log('[mediamond][IAS]====>cachebusterIAS:'+cachebusterIAS);
            var idCachebusterIAS = 'ias-'+cachebusterIAS;

        if(rifPointIAS0Array[1] == 'safeframe'){

            //console.log('[mediamond][IAS]====>safeframe');
            //console.log('[mediamond][IAS]====>inserimento script:'+sizeMod);
            
            debugMediamond('[IAS]====>safeframe','info');
            debugMediamond('[IAS]====>inserimento script:'+sizeMod+' pos:'+pos,'info');



            var scriptIASObj = document.createElement('script');
            scriptIASObj.id = idCachebusterIAS;

            //document.body.appendChild(scriptIASObj);
            document.getElementById(divslot).appendChild(scriptIASObj);


            // IAS Monitoring
            if (typeof(MMsezioneTagOrig) == 'undefined' || MMsezioneTagOrig == null || MMsezioneTagOrig == '') { MMsezioneTagOrig = 'non definito'; }
            var iasScriptUrl, hiddenFrame, hiddenDoc, where, domain;
            iasScriptUrl = '//pixel.adsafeprotected.com/jload?anId=929824&campId='+sizeMod+'&pubId=&chanId='+MMsezioneTagOrig+'&placementId=programmatic&pubCreative=programmatic&pubOrder='+campaignId+'&cb='+cachebusterIAS+'&adsafe_par&impId=&custom='+pos+'&custom2='+urlPag+'&custom3='+custom3devType;
            hiddenFrame = document.createElement('iframe');
            (hiddenFrame.frameElement || hiddenFrame).style.cssText = 'width: 0; height: 0; border: 0; display: none;';
            hiddenFrame.src = 'javascript:false';
            where = document.getElementById(idCachebusterIAS);
            where.parentNode.insertBefore(hiddenFrame, where);
            try {
            hiddenDoc = hiddenFrame.contentWindow.document
            } catch (e) {
            domain = document.domain;
            hiddenFrame.src = "javascript:var d=document.open();d.domain=\" + domain + \";void(0);";
            hiddenDoc = hiddenFrame.contentWindow.document
            };
            hiddenDoc.open().write('<body onload=\"window.__IntegralASUseFIF = true; var js = document.createElement(\'script\');js.id = \'scriptIAS\';js.src = \'' + iasScriptUrl + '\';document.body.appendChild(js);\">');

            hiddenDoc.close();


        }else if (lineItemId == null ){

            //rifPointIAS1 = jQuery('#'+divslot+' > div >iframe').contents().find('iframe');
            //rifPointIAS2 = jQuery(rifPointIAS1[0]).contents().find('#scriptIAS');
            
           // console.log('[mediamond][IAS]====>programmatic');
            
            debugMediamond('[IAS]====>programmatic','info');
            debugMediamond('[IAS]====>inserimento script:'+sizeMod+' pos:'+pos,'info');

         
            /*
            
            console.log('[mediamond][IAS]===>rifPointIAS2:'+rifPointIAS2.length);
             console.log('[mediamond][IAS]===>programmatic');
            console.log('[mediamond][IAS]====>inserimento script:'+sizeMod);
            console.log('[mediamond][IAS]===>rifPointIAS1:'+rifPointIAS1);*/


            var scriptIASObj = document.createElement('script');
            scriptIASObj.id = idCachebusterIAS;
            document.getElementById(divslot).appendChild(scriptIASObj);
            //document.body.appendChild(scriptIASObj);

            // IAS Monitoring
            if (typeof(MMsezioneTagOrig) == 'undefined' || MMsezioneTagOrig == null || MMsezioneTagOrig == '') { MMsezioneTagOrig = 'non definito'; }
            var iasScriptUrl, hiddenFrame, hiddenDoc, where, domain;
            iasScriptUrl = '//pixel.adsafeprotected.com/jload?anId=929824&campId='+sizeMod+'&pubId=&chanId='+MMsezioneTagOrig+'&placementId=programmatic&pubCreative=programmatic&pubOrder='+campaignId+'&cb='+cachebusterIAS+'&adsafe_par&impId=&custom='+pos+'&custom2='+urlPag+'&custom3='+custom3devType;
            hiddenFrame = document.createElement('iframe');
            (hiddenFrame.frameElement || hiddenFrame).style.cssText = 'width: 0; height: 0; border: 0; display: none;';
            hiddenFrame.src = 'javascript:false';
            where = document.getElementById(idCachebusterIAS);
            where.parentNode.insertBefore(hiddenFrame, where);
            try {
            hiddenDoc = hiddenFrame.contentWindow.document
            } catch (e) {
            domain = document.domain;
            hiddenFrame.src = "javascript:var d=document.open();d.domain=\" + domain + \";void(0);";
            hiddenDoc = hiddenFrame.contentWindow.document
            };
            hiddenDoc.open().write('<body onload=\"window.__IntegralASUseFIF = true; var js = document.createElement(\'script\');js.id = \'scriptIAS\';js.src = \'' + iasScriptUrl + '\';document.body.appendChild(js);\">');

            hiddenDoc.close();


        }else{

            //console.log('[mediamond][IAS]===>standard');
            
            debugMediamond('[IAS]====>standard','info');
            
           
            
            //var iframeAdvSrcNoJquery2Test = document.getElementById("google_ads_iframe_/4758/ame_confidenze/home_1");
            var rifPointIASNoJquery3 = iframeAdvSrcNoJquery2.contentWindow.document;
            //console.log('[mediamond][IAS]===>iframe principale test:'+iframeAdvSrcNoJquery2Test);    
            console.log('[mediamond][IAS]===>contenuto iframe principale test:'+rifPointIASNoJquery3);
            //secondo i frame
             var iframeAdvSrcNoJquery5 = rifPointIASNoJquery3.getElementsByTagName("iframe")[0];
            //var iframeAdvSrcNoJquery5Src = iframeAdvSrcNoJquery5.getAttribute("src");
            
            //alcune creatività generano iframe e devo trovare quello generato da ias.
            var iframeAdvSrcNoJqueryArray = rifPointIASNoJquery3.getElementsByTagName("iframe");
            for(i=0;i<iframeAdvSrcNoJqueryArray.length;i++){
                console.log('[mediamond][IAS]===>src iframe:'+i+' - '+iframeAdvSrcNoJqueryArray[i].getAttribute("src"));
                if(iframeAdvSrcNoJqueryArray[i].getAttribute("src") == 'javascript:false'){
                    console.log('[mediamond][IAS]===>contenuto iframe secondario affidabile');
                    iframeAdvSrcNoJquery5 = iframeAdvSrcNoJqueryArray[i];
                }
            }
            
            
            if(iframeAdvSrcNoJquery5){
            
             //console.log('[mediamond][IAS]===>contenuto iframe secondario src:'+iframeAdvSrcNoJquery5Src);
            console.log('[mediamond][IAS]===>contenuto iframe secondario test:'+iframeAdvSrcNoJquery5);
            var rifPointIASNoJquery6 = iframeAdvSrcNoJquery5.contentWindow.document;//contentDocument
            var rifPointIASNoJquery7 = rifPointIASNoJquery6.getElementById("scriptIAS");
            console.log('[mediamond][IAS]===>presenza scriptIAS iframe secondario:'+rifPointIASNoJquery7);
            
            

            if(!rifPointIASNoJquery7){
                
                debugMediamond('[IAS]====>inserimento script:'+sizeMod+' pos:'+pos,'info');


                var scriptIASObj = document.createElement('script');
                scriptIASObj.id = idCachebusterIAS;
               // scriptIASTxt = "console.log('[mediamond][IAS]====>inserimento script');";
               // document.body.appendChild(scriptIASObj);
                document.getElementById(divslot).appendChild(scriptIASObj);

               // console.log('[mediamond][IAS]====>inserimento script:'+sizeMod);
                // IAS Monitoring
                if (typeof(MMsezioneTagOrig) == 'undefined' || MMsezioneTagOrig == null || MMsezioneTagOrig == '') { MMsezioneTagOrig = 'non definito'; }
                var iasScriptUrl, hiddenFrame, hiddenDoc, where, domain;
                iasScriptUrl = '//pixel.adsafeprotected.com/jload?anId=929824&campId='+sizeMod+'&pubId=&chanId='+MMsezioneTagOrig+'&placementId='+lineItemId+'&pubCreative='+creativeId+'&pubOrder='+campaignId+'&cb='+cachebusterIAS+'&adsafe_par&impId=&custom='+pos+'&custom2='+urlPag+'&custom3='+custom3devType;
                hiddenFrame = document.createElement('iframe');
                (hiddenFrame.frameElement || hiddenFrame).style.cssText = 'width: 0; height: 0; border: 0; display: none;';
                hiddenFrame.src = 'javascript:false';
                where = document.getElementById(idCachebusterIAS);
                where.parentNode.insertBefore(hiddenFrame, where);
                try {
                hiddenDoc = hiddenFrame.contentWindow.document
                } catch (e) {
                domain = document.domain;
                hiddenFrame.src = "javascript:var d=document.open();d.domain=\" + domain + \";void(0);";
                hiddenDoc = hiddenFrame.contentWindow.document
                };
                hiddenDoc.open().write('<body onload=\"window.__IntegralASUseFIF = true; var js = document.createElement(\'script\');js.id = \'scriptIAS\';js.src = \'' + iasScriptUrl + '\';document.body.appendChild(js);\">');

                hiddenDoc.close();


            }// if(!rifPointIASNoJquery4){
                
            }else{//if(iframeAdvSrcNoJquery5){
                
                debugMediamond('[IAS]====>standard programmatic','info');
                debugMediamond('[IAS]====>inserimento script:'+sizeMod+' pos:'+pos,'info');
                
                var scriptIASObj = document.createElement('script');
                scriptIASObj.id = idCachebusterIAS;
                document.getElementById(divslot).appendChild(scriptIASObj);
                //document.body.appendChild(scriptIASObj);

                // IAS Monitoring
                if (typeof(MMsezioneTagOrig) == 'undefined' || MMsezioneTagOrig == null || MMsezioneTagOrig == '') { MMsezioneTagOrig = 'non definito'; }
                var iasScriptUrl, hiddenFrame, hiddenDoc, where, domain;
                iasScriptUrl = '//pixel.adsafeprotected.com/jload?anId=929824&campId='+sizeMod+'&pubId=&chanId='+MMsezioneTagOrig+'&placementId=programmatic&pubCreative=programmatic&pubOrder='+campaignId+'&cb='+cachebusterIAS+'&adsafe_par&impId=&custom='+pos+'&custom2='+urlPag+'&custom3='+custom3devType;
                hiddenFrame = document.createElement('iframe');
                (hiddenFrame.frameElement || hiddenFrame).style.cssText = 'width: 0; height: 0; border: 0; display: none;';
                hiddenFrame.src = 'javascript:false';
                where = document.getElementById(idCachebusterIAS);
                where.parentNode.insertBefore(hiddenFrame, where);
                try {
                hiddenDoc = hiddenFrame.contentWindow.document
                } catch (e) {
                domain = document.domain;
                hiddenFrame.src = "javascript:var d=document.open();d.domain=\" + domain + \";void(0);";
                hiddenDoc = hiddenFrame.contentWindow.document
                };
                hiddenDoc.open().write('<body onload=\"window.__IntegralASUseFIF = true; var js = document.createElement(\'script\');js.id = \'scriptIAS\';js.src = \'' + iasScriptUrl + '\';document.body.appendChild(js);\">');

                hiddenDoc.close();
                
            }

        }//if(rifPointIAS0 == 'https://tpc.googlesyndication.com/safeframe/1-0-31/html/container.html'){

//}//MMarrayUrlSkin[2] == 'www.starbene.it'
        
}
//fine ias //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/// JS Open Wrap  Header Bidding Pubmatic ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//no su rti, meteo si per il test con la cmp
if(nomeSito != 'tgcom24' && nomeSito != 'sportmediaset' && nomeSito != 'boing' && nomeSito != 'cartoonito'){

    var PWT={}; //Initialize Namespace
    var googletag = googletag || {};
    googletag.cmd = googletag.cmd || [];
    var gptRan = false;
    PWT.jsLoaded = function(){ //PubMatic pwt.js on load callback is used to load GPT
        loadGPT();
    };
    var loadGPT = function() {
    // Check the gptRan flag
        if (!gptRan) {
            gptRan = true;
            var gads = document.createElement('script');
            gads.async = true;
            gads.type = "text/javascript";
            var useSSL = 'https:' == document.location.protocol;
            gads.src = (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';
            var node = document.getElementsByTagName('script')[0];
            node.parentNode.insertBefore(gads, node);
        }
    };
    // Failsafe to call gpt. 500 ms timeout can be updated as per publisher preference.
    setTimeout(loadGPT, 500);
    //
    (function() {
        var purl = window.location.href;
        if(MMlarghezzaSitoAdv<970 && (nomeSito == 'starbene' || nomeSito == 'donnamoderna' || nomeSito == 'mypersonaltrainer_new' || nomeSito == 'panorama' || nomeSito == 'farmacoecura')){
            var url = '//ads.pubmatic.com/AdServer/js/pwt/76492/1305';
        }else{
            var url = '//ads.pubmatic.com/AdServer/js/pwt/76492/745';
        }
        if(MMlarghezzaSitoAdv<970 && nomeSito == 'meteo'){
            var url = '//ads.pubmatic.com/AdServer/js/pwt/76492/1306';
        }else if(nomeSito == 'meteo'){
            var url = '//ads.pubmatic.com/AdServer/js/pwt/76492/1307';
        }
        var profileVersionId = '';
        if(purl.indexOf('pwtv=')>0){
            var regexp = /pwtv=(.*?)(&|$)/g;
            var matches = regexp.exec(purl);
            if(matches.length >= 2 && matches[1].length > 0){
                            profileVersionId = '/'+matches[1];
            }
        }
        var wtads = document.createElement('script');
        wtads.async = true;
        wtads.type = 'text/javascript';
        wtads.src = url+profileVersionId+'/pwt.js';
        var node = document.getElementsByTagName('script')[0];
        node.parentNode.insertBefore(wtads, node);
    })();

}else{
    
    var gads = document.createElement('script');
    gads.async = true;
    gads.type = "text/javascript";
    var useSSL = 'https:' == document.location.protocol;
    gads.src = (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';
    var node = document.getElementsByTagName('script')[0];
    node.parentNode.insertBefore(gads, node);
    
}


/// fine JS Open Wrap  Header Bidding Pubmatic /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//chiamate per debug ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function debugMediamond(testo,tipo){
    var debugStyleError = 'background: none; color: #000; padding: 5px;';
    if(tipo == 'error'){
        debugStyleError = 'background: red; color: #fff; padding: 5px;';
    }else if(tipo == 'worn'){
        debugStyleError = 'background: orange; color: #000; padding: 5px;';
    }else if(tipo == 'info'){
        debugStyleError = 'background: blue; color: #fff; padding: 5px;';
    }
    console.log('%c[mediamond]'+testo+'',debugStyleError);
}

//fine chiamate debug ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//verifica presenta box e strip /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
window.addEventListener('load', function() {
    if (!document.getElementById(divslotnameStrip)){
        debugMediamond('[strip] non presente','error');
    }
    if (!document.getElementById(divslotnameBox)){
        debugMediamond('[box] non presente','error');
    }
});
//fine verifica box ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++