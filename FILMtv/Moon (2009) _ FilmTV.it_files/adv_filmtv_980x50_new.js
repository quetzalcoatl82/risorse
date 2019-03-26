/*if(statusStrip == true){

	if(larghezzaSitoAdv < 500){
		
		googletag.cmd.push(function() {
		googletag.defineSlot(sezioneTag,[320,50],'div-gpt-ad-1234567891234-strip').addService(googletag.pubads())
		
		googletag.pubads().setTargeting("ksg",Krux.segments);
		googletag.pubads().setTargeting("kuid",Krux.user);	
		googletag.pubads().setTargeting("adx",ADX_label);
		
		googletag.enableServices();
		});
	
	}else if(larghezzaSitoAdv < 980){
		
		googletag.cmd.push(function() {
		googletag.defineSlot(sezioneTag,[[728,90],[980,323]],'div-gpt-ad-1234567891234-strip').addService(googletag.pubads())
		
		googletag.pubads().setTargeting("ksg",Krux.segments);
		googletag.pubads().setTargeting("kuid",Krux.user);	
		googletag.pubads().setTargeting("adx",ADX_label);
		
		googletag.enableServices();
		});
		
		
	}else{
		
		googletag.cmd.push(function() {
		var gpt_strip = googletag.defineSlot(sezioneTag,[[728,90],[980,50],[970,250],[980,250],[980,323]],'div-gpt-ad-1234567891234-strip').addService(googletag.pubads())
		
		googletag.pubads().setTargeting("ksg",Krux.segments);
		googletag.pubads().setTargeting("kuid",Krux.user);	
		googletag.pubads().setTargeting("adx",ADX_label);
		
		googletag.enableServices();

		googletag.pubads().addEventListener('slotOnload', function(event) {
			if(event.slot===gpt_strip) {
				strip_animation();
			}
		});
		
		});
	
	}
	document.write("<div id='adv-strip' style='margin: 0 auto'><div id='div-gpt-ad-1234567891234-strip' >");
	googletag.cmd.push(function() { googletag.display('div-gpt-ad-1234567891234-strip'); });
	document.write("</div></div>");

}//if(statusStrip == true){
//tag richmedia //////////////////////////////////////////////////////////////
if(statusRichMedia == true){
	googletag.cmd.push(function() {
	  googletag.defineOutOfPageSlot(sezioneTag,'div-gpt-ad-1234567891234-3').addService(googletag.pubads())	
	  googletag.enableServices();
	});
	document.write("<div id='div-gpt-ad-1234567891234-3' >");
	googletag.cmd.push(function() { googletag.display('div-gpt-ad-1234567891234-3'); });
	document.write("</div>");
}//if(statusRichMedia == true){
// fine tag richmedia /////////////////////////////////////////////////////////
*/
document.write('<div id="adv-gpt-masthead-leaderboard-container1"></div>');
