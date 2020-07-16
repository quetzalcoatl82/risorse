"use strict";
let classehandler;
(classehandler = () => {
    let me = classehandler;
    me.videoActive;
    me.videoId;
    
    me.init = () => {
        me.playbutton = document.querySelector('.bottone');

        me.intObserveVideo = setInterval(() => {
            me.observeActiveVideo();
        }, 500);

        me.observeActiveVideo = function() {
            me.iframeActive = document.querySelector('.dm20-anastasia-video iframe');
            if(me.iframeActive != null) {
                me.videoActive = me.iframeActive.contentWindow.document.querySelector('video');
                if(me.videoActive!= null) {
                    // quando è pronto il video mostro il tasto play
                    me.videoId = Object.keys(videoArr)[0];
                    clearInterval(me.intObserveVideo);
                    // alla fine del video chiamo
                    me.videoActive.onended = function(e) {
                        console.log('il video è finito andate in pace');
                    };
                }
            };     
        };
        

        me.playvideo = function() {
            // recupera status del video
            console.log(videoArr[Object.keys(videoArr)[0]][0]['contentPlayer']['status']);
            me.videoActive.play();
            videoArr[Object.keys(videoArr)[0]][0]['contentPlayer']['status'].playing;
        };

        me.playbutton.addEventListener('click', me.playvideo);

    };

    me.init();
})();
