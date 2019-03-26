
/*
googletag.cmd.push(function() {
  googletag.defineSlot(sezioneTag,[300,250],'div-gpt-ad-1234567891234-topbox').addService(googletag.pubads())


	googletag.pubads().setTargeting("ksg",Krux.segments);
	googletag.pubads().setTargeting("kuid",Krux.user);
	googletag.pubads().setTargeting("adx",ADX_label);

	for (var i=1;i<crtg_split.length;i++){ googletag.pubads().setTargeting("" + (crtg_split[i-1].split('='))[0] + "", "" + (crtg_split[i-1].split('='))[1] + ""); }
    for (var i=1;i<crtg_bnzm_split.length;i++){ googletag.pubads().setTargeting("" + (crtg_bnzm_split[i-1].split('='))[0] + "", "" + (crtg_bnzm_split[i-1].split('='))[1] + ""); }

  googletag.enableServices();
});



document.write("<div id='adv-top-box' style='margin: 0 auto'><div id='div-gpt-ad-1234567891234-topbox' >");
googletag.cmd.push(function() { googletag.display('div-gpt-ad-1234567891234-topbox'); });
document.write("</div></div>");*/


//inread ///////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
	googletag.cmd.push(function() {
	googletag.defineSlot(sezioneTag, [[640,5]], 'gpt-inread').addService(googletag.pubads());
	googletag.enableServices();
	});

	document.write("<div id='gpt-inread' style='display:none;width:1px;overflow:hidden;' >");
	googletag.cmd.push(function() { googletag.display('gpt-inread'); });
	document.write("</div>");
*/
//mi serve perchè i js del 300x250 si ripetono nella pagina mobile
if(typeof(slotBox) == undefined || typeof(slotBox) == 'undefined'){
  console.log('===>slotBox non definito');
  var slotBox = 1;
  document.write('<div id="adv-gpt-box-container'+slotBox+'"></div>');
}else{
  console.log('===>slotBox definito');
  slotBox++;
  document.write('<div id="adv-gpt-box-container'+slotBox+'"></div>');
}
