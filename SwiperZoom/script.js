var myPlugin = {
    name: 'debugger',
    params: {
      debugger: false,
    },
    on: {
      init: function () {
        if (!this.params.debugger) return;
        console.log('init');
      },
      click: function (e) {
        if (!this.params.debugger) return;
        console.log('click');
      },
      tap: function (e) {
        if (!this.params.debugger) return;
        console.log('tap');
      },
      doubleTap: function (e) {
        if (!this.params.debugger) return;
        console.log('doubleTap');
      },
      sliderMove: function (e) {
        if (!this.params.debugger) return;
        console.log('sliderMove');
      },
      slideChange: function () {
        if (!this.params.debugger) return;
        console.log('slideChange', this.previousIndex, '->', this.activeIndex);
      },
      slideChangeTransitionStart: function () {
        if (!this.params.debugger) return;
        console.log('slideChangeTransitionStart');
      },
      slideChangeTransitionEnd: function () {
        if (!this.params.debugger) return;
        console.log('slideChangeTransitionEnd');
      },
      transitionStart: function () {
        if (!this.params.debugger) return;
        console.log('transitionStart');
      },
      transitionEnd: function () {
        if (!this.params.debugger) return;
        console.log('transitionEnd');
      },
      fromEdge: function () {
        if (!this.params.debugger) return;
        console.log('fromEdge');
      },
      reachBeginning: function () {
        if (!this.params.debugger) return;
        console.log('reachBeginning');
      },
      reachEnd: function () {
        if (!this.params.debugger) return;
        console.log('reachEnd');
      },
    },
  };

// Install Plugin To Swiper
  Swiper.use(myPlugin);

  // Init Swiper
  var swiper = new Swiper('.swiper-container', {
    zoom: true,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    // Enable debugger
});