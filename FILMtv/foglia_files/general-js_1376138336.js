/* General javascript utilities  */
startRefresh();


function more ( placeholder, src ) {
    $('#'+placeholder+' .loader').show();
    $.get(src, function(data) {
        startRefresh();
/*      _gaq.push (['_gat._anonymizeIp']);
        _gaq.push([ '_trackPageview', data.requested_url ]);
*/
        if (!data.error) {
            $('#'+placeholder).replaceWith( data.html ); // ok
        }
    }, 'json');
}

function sort ( listwrapper, src, orderby ) {
    $('#'+listwrapper+' .loader').show();
    $.get(src.replace('#orderby#',orderby), function(data) {
        if (!data.error) {
            startRefresh();
/*          _gaq.push (['_gat._anonymizeIp']);
            _gaq.push([ '_trackPageview', data.requested_url ]);
*/
            $('#'+listwrapper).html( data.html );
            $('[data-sort="'+listwrapper+'"][data-sort-by!="'+orderby+'"]').removeClass('selected');
            $('[data-sort="'+listwrapper+'"][data-sort-by="'+orderby+'"]').addClass('selected');
        }
    }, 'json');
}

var dialogCloseCallback;

function alertdialog(message, alertclass, onclose) {
    $('.alert-box span.ico').addClass(alertclass);
    $('.alert-box p').html(message);
    $('.alert-box').show();
    dialogCloseCallback = onclose;
    setTimeout(function() { closealertdialog(); }, 30000);
}

function closealertdialog() {
    $('.alert-box').fadeOut(300,function() {
        $('.alert-box p').text('');
        $('.alert-box span.ico').attr('class','ico');
        if (dialogCloseCallback) dialogCloseCallback();
    });
}

function errordialog(message, onclose) {
    alertdialog(message,'error', onclose);
}

function warningdialog(message, onclose) {
    alertdialog(message,'warning', onclose);
}

function okdialog(message, onclose) {
    alertdialog(message,'success', onclose);
}

function toggleDrawer( target ) {
    $('#'+target).slideToggle();
}

function closeDrawer( button ) {
    var target = $(button).parents('aside').attr('id');
    toggleDrawer(target);
}

function newlist ( list, src, menuclass, wrapstyle ) {
    if (!menuclass) menuclass = 'menu-filtri';
    if (!wrapstyle) wrapstyle = 'items-list';
    $('.'+menuclass+' li a.active').removeClass('active');
    $('.'+menuclass+' li a#newlist-'+list).addClass('active');
    $('#master-loader').show();
    $('.'+menuclass).removeClass('open');
    
    $.get(src, function(data) {
        if (!data.error) {
            startRefresh();
/*
            _gaq.push (['_gat._anonymizeIp']);
            _gaq.push([ '_trackPageview', data.requested_url ]);
*/
            $('.filtra').slideUp();
            if (list == 'M') {
                $('.filtra-film').slideDown(200);
                $('.filtra-film .role-selector').val($('.role-selector').find('option').first().val());
            }
            $('.filtra-'+list).slideDown(200);
            $('.filtra-'+list+' .role-selector').val($('.filtra-'+list+' .role-selector').find('option').first().val());
            
            $('#item-list-container').fadeOut(200, function() {
                $('#item-list-container').html( '<section class="'+wrapstyle+'">'+data.html+'</section>' );
                only_owner();
            });
            $('#item-list-container').fadeIn(200);
        }
        $('#master-loader').hide();
        console.log(data.requested_url);
	}, 'json');
}

function listaFilm(mode) {
    if (mode == 'preview') {
            $('#list-container').addClass('contenitore-anteprime');
            $('#list-container').addClass('cf');
            $('#list-container').removeClass('view-list');
            $('.ico-anteprima').removeClass('btn-grey');
            $('.ico-anteprima').addClass('btn');
            $('.ico-listato').removeClass('btn');
            $('.ico-listato').addClass('btn-grey');
    } else {
            $('#list-container').removeClass('contenitore-anteprime');
            $('#list-container').removeClass('cf');
            $('#list-container').addClass('view-list');
            $('.ico-anteprima').removeClass('btn');
            $('.ico-anteprima').addClass('btn-grey');
            $('.ico-listato').removeClass('btn-grey');
            $('.ico-listato').addClass('btn');
    }
}

function TrovaCinema() {
    jQuery(document).ready(function() { 
        if (window.location.hash != '#tutti' && $.cookie('FilmTV.it-TrovaCinema')) {
            window.location.assign(location.origin + location.pathname + $.cookie('FilmTV.it-TrovaCinema'));
        }
    });
}

/*
jQuery(document).ready(function() { 
    FilmTrovaCinema();
    $('body').on('click','[data-salefilm-handle] a', function() {
       toggleDrawer($('[data-salefilm-drawer="'+$(this).parent().data('salefilm-handle')+'"]').attr('id'));
       return false;
    });
});


function FilmTrovaCinema() {
    if ($('.geosale').length == 0) {
        $('[data-salefilm-handle]').each( function() {
            var filmid  = $(this).data('salefilm-handle');
            if (!filmid) return;
            var cinenav = filmid+'/F/0/';
            if ($.cookie('FilmTV.it-FilmTrovaCinema')) cinenav = filmid + '/'+$.cookie('FilmTV.it-FilmTrovaCinema')+'/';
            
            var drawer = $('[data-salefilm-drawer="'+filmid+'"]');
            var handle = $('[data-salefilm-handle="'+filmid+'"]');
            
            $.get('/loader/cinenav/'+cinenav, function(result) {
                startRefresh();
                drawer.html(result.html);
            }, 'json');
        });
    }
}
*/


function repertorio_vai() {
    var cat = $('#navigator-categoria').val();
    var ann = $('#navigator-anno').val();
    var naz = $('#navigator-nazione').val();
    var gen = $('#navigator-genere').val();
	
	var url = location.protocol + '//' + location.host + '/';
	if (cat) url = url + cat + '/';
	else url = url + 'film/';
	if (gen) url = url + gen + '/';
	if (naz) url = url + naz + '/';
	if (ann) url = url + ann + '/';
	window.location.assign(url);
}

$.fn.phSet = function(value) {
    if (!$(this).data('placeholder')) $(this).data('placeholder',$(this).attr('placeholder'));
    $(this).val(value);
//    if ($(this).val() != $(this).data('placeholder')) $(this).addClass('notplaceholder'); else $(this).removeClass('notplaceholder');
}

$.fn.phGet = function() {
    return $(this).val();
//    if (!$(this).data('placeholder')) $(this).data('placeholder',$(this).val());
//    if ($(this).val() != $(this).data('placeholder')) return $(this).val(); else return '';
}

/* Frame home community */
var community_active_frame = 0;
var community_frame_timeout = false;

function community_frame(frame) {
    if (community_frame_timeout) clearTimeout(community_frame_timeout);
    if (!frame) frame = community_active_frame + 1;
    if (frame == 4) frame = 1;
    if (community_active_frame) $('.frame-'+community_active_frame).fadeOut(300, function() {
       $('.frame-'+frame).fadeIn(300);
    }); else $('.frame-'+frame).fadeIn(300);
    $('[data-frame]').removeClass('active');
    $('[data-frame='+frame+']').addClass('active');
    community_active_frame = frame;
    community_frame_timeout = setTimeout(function() { community_frame(); }, 5000);
}

String.prototype.noPage = function() {
    return this.replace(/-pagina-[0-9]+$/,'');
}

String.prototype.getPage = function() {
	match = /-pagina-([0-9]+)$/.exec(this);
    if (match != null) {
    	return parseInt(match[1]);
    } else return 1;
}

function goPage(page, relative, defaulthash) {
    if (!defaulthash) defaulthash = $('[data-default-hash]').data('default-hash');
	if (!defaulthash) defaulthash = '#tutto';
	var thehash = window.location.hash.noPage();
	if (!thehash.match(/#[a-z]+/)) thehash = '';	
	if (!thehash) thehash = defaulthash;
	if (relative) page = window.location.hash.getPage() + page;
	if (page > 1) thehash = thehash+'-pagina-'+page;
	window.location.hash = thehash;
	return false;
}

$(document).ready( function() {
	$('body').on('click', '[data-pagina]',  function() {
		var pagina = $(this).data('pagina');
        $('html, body').animate({ scrollTop: $('#item-list-container').offset().top - 100 },1000);
		return goPage(pagina);
	});
});


function dohash() {
    var thehash = window.location.hash.noPage();
    
    if (thehash && $(thehash).length > 0) {
        $('html, body').animate({
            scrollTop: $(thehash).offset().top
        }, 2000);
    }
    
    var pagina = window.location.hash.getPage();
    
    if ($('[href="'+thehash+'"][data-exec]').length > 0) {
        var exec = $('[href="'+thehash+'"][data-exec]').data('exec');

        if (pagina > 1) {
            match = /\/0\/(\d+)\//.exec(exec);
            if (match != null) {
                perpage = parseInt(match[1]);
                exec = exec.replace(/\/0\/(\d+)\//, '/'+(perpage*(pagina-1))+'/'+match[1]+'/');
            }
        }        
        console.log(exec);
        if (exec) eval(exec);
    } else $('body').trigger($.Event( "hash-"+thehash.replace('#','' )));
}

function startRefresh() {
    return; // refresh disabilitato
    clearTimeout(window.dorefresh);
    if (!logged_user && !window.location.pathname.match(/trailer/)
        && $.cookie('_iub_cs-local').match(/"consent":true/) // iubenda ok cookie
    ) {
        window.dorefresh = window.setTimeout( function() { console.log('Refresh'); location.reload(); }, 300000);
    }    
}


jQuery(document).ready(function() { 
    
    $('.collapsed-text .leggi-tutto').click(function() {
        $(this).parents('.collapsed-text').addClass('uncollapsed'); 
        return false;
    });

    $('.collapsed-text .leggi-meno').click(function() {
        $(this).parents('.collapsed-text').removeClass('uncollapsed'); 
        return false;
    });
    
    var autocompleteSetting = {
        serviceUrl: '/ajax/autocomplete.php',
        minChars:0,
        width:410,
        zIndex: 9999,
        align: 'left',
        params: {'action':'search'},
        formatResult: function (suggestion, currentValue) {
            var reEscape = new RegExp('(\\' + ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'].join('|\\') + ')', 'g'),
                pattern = '(' + currentValue.replace(reEscape, '\$1') + ')';
    
            if (suggestion.data.objtype == 'serietv') suggestion.data.objtype = 'serie Tv';
            
            var html = '';
            
            if (suggestion.data.objtype == 'advanced') html = '<a class="searchitem advanced" href="'+suggestion.data.href+'"><span class="value">'+suggestion.value+'</span></a>';
            else 
                html = '<a class="searchitem" href="'+suggestion.data.href+'"><img src="'+suggestion.data.image+'">'+
                '<span class="value">'+suggestion.value.replace(new RegExp(pattern, 'gi'), '<strong>$1</strong>')+'</span> '+
                '<span class="info">('+( suggestion.data.sublabel ? '<em>'+suggestion.data.sublabel+'</em>, ' : '')+
                suggestion.data.objtype+')</span> '+
                '<span class="desc">'+suggestion.data.desc+'</span>'
                +'</a>';
    
            return html;
        }
    };

    $('header.header .text-search').autocomplete(autocompleteSetting);
    var autocompleteSettingLight = autocompleteSetting;
    autocompleteSettingLight.align = 'right';
    autocompleteSettingLight.offset = 60;
    autocompleteSettingLight.width = 340;
    $('header.header-light .text-search').autocomplete(autocompleteSettingLight);
    
    /* spostamento target url dei post e delle recensioni */
    $('.testo-recensione a').each( function() {
        var url = $(this).prop('href');
    	var target = '_blank';
    	if (url.match(/^http:\/\/www\.filmtv\.it/)) target = '_self';
    	else target = '_blank';
    	$(this).prop('target',target);
    });
    $('.post a').each( function() {
        var url = $(this).prop('href');
        var target = '_blank';
    	if (url.match(/^http:\/\/www\.filmtv\.it/)) target = '_self';
    	else target = '_blank';
    	$(this).prop('target',target);
    });
    
    
  //  if ($.cookie('FilmTV.it-TrovaCinema')) $('a[href="/cinema/"]').attr('href','/cinema/'+$.cookie('FilmTV.it-TrovaCinema'));
    
    $('select.gourl').change(function() {
        window.location.assign(location.protocol + '//' + location.host + $(this).val());
    });
    
         
    $('body').on('click','a.navenv',function() {
        console.log(window.location.hash);
        console.log($(this).attr('href')+window.location.hash);
        if (window.location.hash) $(this).attr('href',$(this).attr('href')+window.location.hash);
        return true;
    });

    if (window.location.hash != '' && $('[href="'+window.location.hash.noPage()+'"]').length > 0) dohash();
    $(window).on('hashchange',dohash);
    
    $('body').on('userfilmdata', function() { load_userfilmdata(); });
    
    $('body').on('click','.unfollow-user', function() {
        var data = { id: $(this).parents('.follow-user-tool').data('friendship'), action: 'unfollow_user' };
        console.log(data);
        $.post('/ajax/bookmark.php', data, function(result) {
            if (result.status != 'error') {
                $('.follow-user-tool[data-friendship="'+result.id+'"]').removeClass('following');
                $('.seguaci .num').text($('.seguaci .num').text()-1);
            }
        });
        return false;
    });
    
    $('body').on('click','.follow-user', function() {
        var data = { id: $(this).parents('.follow-user-tool').data('friendship'), action: 'follow_user' };
        $.post('/ajax/bookmark.php', data, function(result) {
            if (result.status != 'error') {
                $('.follow-user-tool[data-friendship="'+result.id+'"]').addClass('following');
                $('.seguaci .num').text($('.seguaci .num').text()*1+1);
            }
        });
        return false;
    });
    
    /* messaggi */
    
    $('.manda-messaggio .open-panel').click( function() { $(this).siblings('.panel').addClass('open'); return false; });
    $('.manda-messaggio .chiudi').click( function() { $(this).parents('.panel').removeClass('open'); return false; });
    $('.manda-messaggio .invia').click( function() {
       if (!logged_user) errordialog('Devi aver fatto login per spedire un messaggio');
       if (!$('.manda-messaggio textarea').val()) errordialog('Devi scrivere il messaggio prima di spedirlo!');
       var data = { destid: $('.manda-messaggio').data('destid'), testo: $('.manda-messaggio textarea').val(), action: 'post' };
       $.post('/ajax/messaggi.php', data, function(result) {
           if (result.status != 'error') {
               $('.manda-messaggio .ok').slideDown(200);
               setTimeout(function() { $('.manda-messaggio .chiudi').click(); }, 2000);
           } else errordialog(result.message);
       }, 'json');
       return false;
    });
    
    $('select[data-azione=serietv-segui-stagione]').change( function() {
        $('select[data-azione=serietv-segui-episodio]').hide();
        $('select[data-azione=serietv-segui-episodio][data-stagione='+$(this).val()+']').show();
    });
    
    $('select[data-azione=serietv-segui-episodio]').change( function() {
        serietv_segui($(this).data('serietv'), $(this).val());
    });
    
    $('[data-azione=serietv-segui-tutti]').click( function() {
        serietv_segui($(this).data('serietv'), 9999);
    });
    
    $('[data-azione=serietv-segui-nessuno]').click( function() {
        serietv_segui($(this).data('serietv'), 0);
    });
   
    
    $('[data-azione=serietv_segui]').click( function() {
        if (logged_user) $('.segui-panel').slideToggle();
    });
    
    $('[data-azione=serietv-nonsegui]').click( function() {
        try {
            if (!logged_user) throw new Error('Devi aver fatto login per usare questa funzione');
            var data = { item: $(this).data('serietv'), action: 'nonsegui' };
        if (!data.item) throw new Error('Qualcosa non va, non posso continuare');
        
        $.post('/ajax/serietv.php', data, function(result) {
            if (result.item == data.item) {
                $('body').trigger('serietv-nonseguita',data.item)
            } else errordialog('Uhm, qualcosa è andato storto!');
        });
        
        } catch (e) {
            errordialog(e.message);
        }    
    });
    
    if ($('.frame').length) community_frame();
    $('[data-frame]').click( function() {
        community_frame($(this).data('frame'));
    });
    
/*    $('.closeModal').click( function() {
        console.log(window.history);
       if (window.history.length > 0) {
           window.history.back();
           return false;
       } else return true;
    });
*/
    $('.backclosemodal').click( function() { if($('.modale-chiudi').attr('href') != 'undefined') window.location = $('.modale-chiudi').attr('href'); else history.back(); return false; });
    
/*    $('body').on('focus','.placeholder', function() {
        if (!$(this).data('placeholder') && $(this).val()) {
            $(this).data('placeholder', $(this).val());
            if (!$(this).prop('placeholder')) $(this).prop('placeholder', $(this).val());
        }
        if ($(this).val() == $(this).data('placeholder')) $(this).val('');
    });
   
    $('body').on('blur','.placeholder', function() {
       if (!$(this).val()) $(this).val($(this).data('placeholder'));
       if ($(this).val() != $(this).data('placeholder')) $(this).addClass('notplaceholder'); else $(this).removeClass('notplaceholder');
    });
*/   
   $('.main-nav > ul > li.sub-nav').hover( function() {
       $(this).children('ul').slideDown(100);
   }, function() {
       $(this).children('ul').slideUp(100);
   });  
   
   $('.needlogin').click ( function(event) {
        if (!$('body').hasClass('user-logged')) {
            open_login("Devi essere registrato e aver fatto login per usare questa funzione.");
            event.stopPropagation();
            return false;
       }
   });
   
   $('#popup-login-darkening').click( function() { close_login(); });
   
    $('body').on('login', function(ev) {
        apply_login(); 
        load_user_data();
    });

    $('body').on('notlogged', function(ev) {
        apply_unlogged(); 
    });
/*
    $('body').on('click','.dove a', function() {
       $(this).parents('.logistica').children('aside').slideToggle(200);
       return false;
    });
*/    


    $('body').on('click','.sale a[data-cinenav]', function() {
        var aside = $(this).parents('aside.sale');
        var back = aside.data('cinenav');
        if (back) cinenav_cache['back'] = aside.html();
        var dest = $(this).data('cinenav');
        if (cinenav_cache[dest]) $(this).aside.html(cinenav_cache[dest]); 
        else { 
            $.get('/loader/cinenav/'+$(this).data('cinenav'), function(result) {
                aside.html(result.html);
                startRefresh();
/*
                _gaq.push (['_gat._anonymizeIp']);
                _gaq.push(['_trackPageview', '/loader/cinenav/'+$(this).data('cinenav')]);
*/
            }, 'json');
        }
        return false;
    });
    
    if (window.location.hash == '#status') {
        toggleDrawer('logistica');
    }
    
    login_test();
    
    $('.role-selector').change( function() {
        $waiting = $(this).parent().children('img');
        $waiting.show();
        var $selection = $(this).children('option:selected');
        var url = $selection.data('url');
        $.get(url, function(result) {
            if (result.html) {
                startRefresh();
/*
                _gaq.push (['_gat._anonymizeIp']);
                _gaq.push([ '_trackPageview', result.requested_url ]);
*/
                $('.items-list').fadeOut(200,function() { 
                    $('.items-list').html(result.html);
                    $('.items-list').fadeIn();
                })
            }
            $waiting.hide();
        });
    });

    $('body').on('click','.add-existing-playlist-toggler', function() {
       $('.add-existing-playlist').slideToggle();
       $(this).toggleClass('toggler-open');
       $('.add-new-playlist').slideUp();
       $('.add-new-playlist-toggler').removeClass('toggler-open');
       return false;
    });

    $('body').on('click','.add-new-playlist-toggler', function() {
       $('.add-existing-playlist').slideUp();
       $(this).toggleClass('toggler-open');
       $('.add-new-playlist').slideToggle();
       $('.add-existing-playlist-toggler').removeClass('toggler-open');
       return false;
    });
    
    $('.lost_psw a').click( function() {
        $('#login-form').fadeOut( function() { $('#memo-form').fadeIn(); }); 
    });
    
    /* INSERIMENTO COMMENTI */
    $('#commentobreve-form').submit(function() {
        var data = { action: 'salva_commento_breve', commento: $('#commento_breve').val(), film_id: $('[data-filmid]').data('filmid') };
        console.log("Scrivo commento");
        console.log(data);
        try {
            if (!data.film_id) throw('Non hai indicato il film che stai recensendo.');
            if (!data.commento || data.commento.length < 3) throw('Non hai scritto il commento!');
            if (data.commento.length > 350) throw('Hai scritto un commento troppo lungo, devi togliere '+(350-data.commento.length)+' caratteri');
        } catch (err) {
            warningdialog(err);
            return false;
        }
        $.post('/ajax/scrivi.php', data, function(result) {
            console.log(result);
            if (result.status != 'error') {
                okdialog('Grazie, commento salvato! Sarà pubblicata entro breve su questa pagina.');
                $('#commentabile-'+$('[data-filmid]').data('filmid')).slideUp();
                $('#commentato-'+$('[data-filmid]').data('filmid')).slideDown();
            } else {
                errordialog(result.message);
            }
        }, 'json');
        return false;
    });
    
    /* NAVIGAZIONE COMMENTI */

    $('.slide-commenti .next').click( function() {
        var count = $('.slide-commenti').data('slide-count');
        var current = $('.slide-commenti').data('current-slide');
        var next = current + 1; if (next > count) next = 1;
       
        $('li[data-slide="'+next+'"]').css('left','500px');
        $('li[data-slide="'+next+'"]').animate({ left: 0}, 300);
        $('li[data-slide="'+current+'"]').animate({ left: -500}, 300);

        $('.slide-commenti').data('current-slide',next);
        return false;
    });
    
    $('.slide-commenti .prev').click( function() {
        var count = $('.slide-commenti').data('slide-count');
        var current = $('.slide-commenti').data('current-slide');
        var prev = current - 1; if (prev < 1) prev = count;
       
        $('li[data-slide="'+prev+'"').css('left','-500px');
        $('li[data-slide="'+prev+'"').animate({ left: 0}, 300);
        $('li[data-slide="'+current+'"').animate({ left: 500}, 300);

        $('.slide-commenti').data('current-slide',prev);
        return false;
    });

    $('.slide-question ul li').width($('.slide-question').width());
    window.onresize = function() {
        $('.slide-question ul li').width($('.slide-question').width());
    };

    $('body').on('serietv-seguita', function (ev,valore) {
        var valori = valore.split('-');
        var serie = valori[0];
        var episodio = valori[1];
        var stnum = Math.floor(episodio/100);
        var epnum = episodio % 100;
        var epcom = stnum + 'x' + (epnum < 10 ? '0' : '') + epnum;
        console.log(serie, episodio, epcom);
        $('.segui-panel').slideUp();
        
        $('[data-serietv='+serie+'].seguibile').hide();
        $('[data-serietv='+serie+'].seguita').show();
        $('[data-serietv='+serie+'].vista').hide();
        $('[data-serietv='+serie+'][data-visto-ok]').each( function() {
            if (episodio >= $(this).data('visto-ok')) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
        if (episodio > 0) {
            $('[data-serietv='+serie+'].ultimo-visto').html('('+epcom+')');
            $('[data-azione="serietv-segui-stagione"]').val(stnum);
            $('[data-azione="serietv-segui-episodio"]').hide();
            $('[data-azione="serietv-segui-episodio"][data-stagione="'+stnum+'"]').val(episodio).show();
            if (episodio == $('[data-episodio-ultimo]').data('episodio-ultimo')) {
                $('[data-serietv='+serie+'].seguita').hide();
                $('[data-serietv='+serie+'].vista').show();
            }
        } else {
            $('[data-serietv='+serie+'].ultimo-visto').html('');
            $('[data-azione="serietv-segui-stagione"]').val(1);
            $('[data-azione="serietv-segui-episodio"]').hide();
            $('[data-azione="serietv-segui-episodio"][data-stagione="1"]').val('').show();
        }
        $('[data-serietv='+serie+'][data-visto-ko]').each( function() {
            if (episodio < $(this).data('visto-ko')) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
    $('body').on('serietv-nonseguita', function (ev,valore) {
        var serie = valore;        
        $('.segui-panel').slideUp();
        $('[data-serietv='+serie+'].seguibile').show();
        $('[data-serietv='+serie+'].seguita').hide();
        $('[data-serietv='+serie+'].vista').hide();
        $('[data-serietv='+serie+'][data-visto-ok]').hide();
        $('[data-azione="serietv-segui-stagione"]').val(1);
        $('[data-azione="serietv-segui-episodio"]').hide();
        $('[data-azione="serietv-segui-episodio"][data-stagione="1"]').val('').show();
        $('[data-serietv='+serie+'][data-visto-ko]').show();
    });

});

var cinenav_cache = { };

RegExp.quote = function(str) { return str.replace('/','\/'); }

function serietv_segui(serie, episodio) {
    try {
        if (!logged_user) throw new Error('Devi aver fatto login per usare questa funzione');
        var data = { item: serie, action: 'segui', episodio: episodio };
    if (!data.item) throw new Error('Qualcosa non va, non posso continuare');
    
    $.post('/ajax/serietv.php', data, function(result) {
        if (result.item == data.item) {
            $('body').trigger('serietv-seguita', [ data.item+'-'+result.visto ]);
        } else errordialog('Uhm, qualcosa è andato storto!');
    });
    
    } catch (e) {
        errordialog(e.message);
    }    

}

function open_login(message) {
    if (message) $('.boxlogin .error-message').text(message);
    $('#popup-login-darkening').fadeIn();
    $('.boxlogin').fadeIn();
    $('#login-user-nick').focus();
}

function close_login() {
    $('.boxlogin').fadeOut( function() {
        $('#memo-form').hide();
        $('#login-form').show();
        $('.boxlogin .error-message').text('');
    });
    $('#popup-login-darkening').fadeOut();
}

function cancelmemo() {
    $('#memo-form').fadeOut( function() { $('#login-form').fadeIn(); });
    $('.boxlogin .error-message').html('');
}

function sendmemo() {
    var email = $('#memo_nick').val();
    if (!email) $('.boxlogin .error-message').html('Inserisci email o nick!');
    $.post('/ajax/login.php', { email: email, action: 'sendMemo' }, function(result) {
        if (result.status=='error') {
            $('.boxlogin .error-message').html(result.message);
        } else {
            $('.boxlogin .error-message').html(result.message);
            $('#memo-form').fadeOut( function() { $('#login-form').fadeIn(); });
        }
    },'json');
}

function show_unread_messages() {
    if (logged_user.data && logged_user.data.unread_messages > 0) {
        $('span#login-user-unread-messages').text(logged_user.data.unread_messages);
        $('span#login-user-unread-messages').addClass('num');
    } else {
        $('span#login-user-unread-messages').text('');
        $('span#login-user-unread-messages').removeClass('num');
    }
}

function apply_login() {
    $('.login-user-url_home').html(logged_user.nick);
    $('.login-user-url_home').attr('href',logged_user.url_home);
    $('.login-user-url_messaggi').attr('href',logged_user.url_home+'#messaggi');
    if (logged_user.data && logged_user.data.unread_messages > 0) {
        $('span#login-user-unread-messages').text(logged_user.data.unread_messages);
        $('span#login-user-unread-messages').addClass('num');
    } else {
        $('span#login-user-unread-messages').text('');
        $('span#login-user-unread-messages').removeClass('num');
    }
	$('body').addClass('user-logged');
    $('body').removeClass('user-notlogged');
    startRefresh();
    /* attiva eventuali toolbar */
    if (logged_user.admin == "1") $('div.toolbar-box').show();
    else $('div.toolbar-box[data-owner="'+logged_user.nick_id+'"]').show();   
}

function apply_unlogged() {
    $('body').addClass('user-notlogged');
    $('body').removeClass('user-logged');
}

function login_test() {
    var data = { action: 'login_test' };
    $.post('/ajax/login.php', data, function(data) {
        if (data.status != 'error') {
            logged_user = data.user;
            $('body').trigger($.Event( "login"));
            $('body').trigger($.Event( "login_tested"));
            clearTimeout(window.dorefresh);

            data = { action: 'unreadMessages' };
            $.post('/ajax/login.php', data, function(result) { 
                if (typeof result !== 'undefined' && typeof logged_user !== 'undefined') {
                    logged_user.data.unread_messages = result.unread_messages;
                    show_unread_messages();
                }
            }, 'json');

        } else {
            $('body').trigger($.Event('notlogged'));
            $('body').trigger($.Event( "login_tested"));
        }
        
    }, 'json');
}

function login() {
    var data = { 
        username: $('#login_nick').val(), 
        password: $('#login_password').val()
    };
    $.post('/ajax/login.php', data, function(data) {
        if (data.status != 'error') {
            logged_user = data.user;
            $('body').trigger($.Event( "login"));
            close_login();
            alertdialog('ATTENZIONE:<br>Ricorda che ti stai assumendo la totale responsabilità anche giuridica per ogni attività da te svolta su questo sito e per ogni contenuto pubblicato e/o scambiato. (<a href=" http://privacy.stbm.it/site/filmtv/condizioni-generali.html">leggi le condizioni d’uso</a>).<br>Ti invitiamo quindi a non pubblicare o scambiare alcuna informazione che permetta di risalire, anche indirettamente, alla tua identità o all’identità di terzi (nome, cognome, residenza, email…) e divulgare alcun tipo di dato sensibile tuo o di terzi.<br>Desideriamo inoltre informarti che tutti i servizi sono erogati, agli stessi termini e condizioni, da Arnoldo Mondadori Editore S.p.A. quale società incorporante di Banzai Media S.r.l.');
            data = { action: 'unreadMessages' };
            $.post('/ajax/login.php', data, function(result) { 
                logged_user.data.unread_messages = result.unread_messages;
                show_unread_messages();
            }, 'json');
        
            
		} else {
            $('.error-message').text(data.message);
            $('.error-message').show();
		}
	}, 'json');
            
}

function logout(gohome) {
    var data = { action: 'logout' };
    $.post('/ajax/login.php', data, function(data) {
        if (data.status != 'error') {
            logged_user = false;
            $('#login-user-nick').text('logged_user.nick');
            $('#login-user-unread-messages').text('');
            $('body').removeClass('user-logged');
            $('body').trigger($.Event('notlogged'));
            $('body').trigger($.Event('loggedout'));
            startRefresh();
            if (gohome) window.location = location.protocol + '//www.filmtv.it/'; 
            else window.history(0);
        }
    }, 'json');
}

function load_userfilmdata() {
    if (logged_user) {
        var data = { };

        data.votabili = [ ];
        $('[data-votabile]').each(function( index ) {
            data.votabili.push($(this).data('votabile'));
        });
        $.post('/ajax/load_user_data.php', data, function(result) {
            if (result.status != 'error') {
                if (result.voti) for (votabile in result.voti) {
                    voto = 1 * result.voti[votabile];
                    $('#block-voti-'+votabile).removeClass('unvoted');
                    $('#block-voti-'+votabile).addClass('voted');
                    $('#voto-v-'+votabile+' .voto-stelle').attr('class','voto-stelle personale voto'+voto);
                    $('#voto-v-'+votabile+' .voto-stelle meter').attr('value',voto);
                }
            } else errordialog(result.message);
        }, 'json');
    } 
}

var hashu = false;

function load_user_data() {
    if (logged_user) {
         
        var voto = 0;
        var data = { userinfo: 1 };

        data.votabili = [ ];
        $('[data-votabile]').each(function( index ) {
            data.votabili.push($(this).data('votabile'));
        });
        data.seguibili = [ ];
        $('[data-seguibile]').each(function( index ) {
            data.seguibili.push($(this).data('seguibile'));
        });
        data.opinabili = [ ];
        $('[data-opinabile]').each(function( index ) {
            data.opinabili.push($(this).data('opinabile'));
        });
        data.commentati = [ ];
        $('[data-commentabili]').each(function( index ) {
            data.commentati.push($(this).data('commentabili'));
        });
        data.giudicabili = [ ];
        $('[data-utile]').each(function( index ) {
            data.giudicabili.push($(this).data('utile'));
        });
        data.bookmarkabili = [ ];
        $('[data-bookmarkabile]').each(function( index ) {
            data.bookmarkabili.push($(this).data('bookmarkabile'));
        });
        data.rilevanze = [ ];
        $('.rilevanza[data-plitem]').each(function (index) {
            data.rilevanze.push($(this).data('plitem'));
        });
        data.conversations = [ ];
        $('[data-followable-conversation]').each(function( index ) {
            data.conversations.push($(this).data('followable-conversation'));
        });
        data.permissions = $('[data-permissions]').data('permissions');
        data.votipreferiti = $('[data-voti-preferiti]').data('voti-preferiti');
        
        data.usercheck = { };
        $('[data-usercheck]').each(function( index ) {
            var check = $(this).data('usercheck');
            if (!data.usercheck[check]) data.usercheck[check] = [ ];
            data.usercheck[check].push($(this).data(check));
        });
        
        $.post('/ajax/load_user_data.php', data, function(result) {
            console.log("LOAD USER DATA");
            console.log(result);
            if (result.status != 'error') {
                var opurl;
                logged_user.data = result;
                if (result.avatar45) $('.owner-avatar45').attr('src',result.avatar45);
                logged_user.urls = result.urls;
                $('[data-user-url]').each( function() { $(this).attr('href',result.urls[$(this).data('user-url')]); });
                $('.owner-nick').html(result.nick);

                if (result.voti) for (votabile in result.voti) {
                    voto = 1 * result.voti[votabile];
                    $('#block-voti-'+votabile).removeClass('unvoted');
                    $('#block-voti-'+votabile).addClass('voted');
                    $('#voto-v-'+votabile+' .voto-stelle').attr('class','voto-stelle personale voto'+voto);
                    $('#voto-v-'+votabile+' .voto-stelle meter').attr('value',voto);
                }
                if (result.opinioni) for (opinabile in result.opinioni) {
                    $('#opinabile-'+opinabile).hide();
                    opurl = $('#opinato-'+opinabile).data('href') ? $('#opinato-'+opinabile).data('href') : $('#opinato-'+opinabile).attr('href');
                    $('#opinato-'+opinabile).attr('href',opurl.replace('[ID]',result.opinioni[opinabile]));
                    $('#opinato-'+opinabile).show();
                }
                if (result.seguite) for (seguita in result.seguite) {
                    $('body').trigger('serietv-seguita', [ seguita+'-'+result.seguite[seguita] ]);
                }
                if (result.commentati) for (commentato in result.commentati) {
                    $('#commentabile-'+commentato).hide();
                    opurl = $('#commentato-'+commentato+' a').data('href') ? $('#commentato-'+commentato+' a').data('href') : $('#commentato-'+commentato+' a').attr('href');
                    $('#commentato-'+commentato+' a').attr('href',opurl.replace('[ID]',result.commentati[commentato]));
                    $('#commentato-'+commentato).show();
                }
                if (result.giudizi) for (i=0; i<result.giudizi.length;i++) {
                    set_utile(result.giudizi[i].giudicabile, result.giudizi[i].totale, result.giudizi[i].giudizio);
                }
                if (result.permissions) for (permission in result.permissions) {
                    $('[data-permissions]').data('permissions-'+permission,result.permissions[permission]);
                    if (result.permissions.isowner || result.permissions.admin) $('.active-owner').addClass('active');
                }
                if (result.conversations) for (i=0; i<result.conversations.length;i++) {
                    $('[data-followable-conversation="'+result.conversations[i]+'"] .follow-conversation').hide();
                    $('[data-followable-conversation="'+result.conversations[i]+'"] .unfollow-conversation').show();
                }
                if (result.bookmarkati) for (i=0; i<result.bookmarkati.length;i++) {
                    $('[data-bookmarkabile="'+result.bookmarkati[i]+'"]').addClass('bookmarkato');
                }
                if (result.rilevanze) for (i=0; i<result.rilevanze.length; i++) if (result.rilevanze[i].plitem) { 
                    $('[data-plitem="'+result.rilevanze[i].plitem+'"]').parents('article').data('rilevanza',result.rilevanze[i].rilevanza);
                    $('[data-plitem="'+result.rilevanze[i].plitem+'"] .playlist-item-rilevanza-mostra').html(result.rilevanze[i].totali);
                    if (result.rilevanze[i].sino) $('[data-plitem="'+result.rilevanze[i].plitem+'"] .playlist-item-rilevanza[data-rilevante="'+result.rilevanze[i].sino+'"]').addClass('selected');
                }
                if (result.votipreferiti) if (result.votipreferiti) {
                    for (i=0; i<result.votipreferiti.length; i++) { 
                        voto = result.votipreferiti[i];
                        $('#lista-voti-preferiti .vp-template').clone().appendTo('#lista-voti-preferiti').removeClass('vp-template').attr('id','voto-'+voto.nick_id);
                        $('#voto-'+voto.nick_id+' .voto-stelle').addClass('voto'+voto.voto10);
                        $('#voto-'+voto.nick_id+' meter').text(voto.voto10);
                        $('#voto-'+voto.nick_id+' h3').text(voto.nick);
                        $('#voto-'+voto.nick_id+' a').attr('href',voto.nick_url);
                        $('#voto-'+voto.nick_id+' img').attr('src',$('#voto-'+voto.nick_id+' img').attr('src').replace('DUMMY/no_avatar150.jpg','UTENTI150/'+voto.foto_grande));
                        $('#voto-'+voto.nick_id).show();
                    }
                    
                    $('.voti-preferiti .voto-stelle-big').addClass('voto'+Math.round(result.votipreferiti_media));
                    $('.voti-preferiti .voto-stelle-big meter').text(result.votipreferiti_media);
                    $('.voti-preferiti header h1 span').text(result.votipreferiti_conto);
                    $('.voti-preferiti').show();
                    $('#carousel-voti-preferiti').carousel({ itemsPerPage: 7, itemsPerTransition: 7, easing: 'linear' });
                }
                if (result.usercheck) for (checklist in result.usercheck) for (i=0; i<result.usercheck[checklist].length; i++) {
                    var onclass = $('[data-'+checklist+'="'+result.usercheck[checklist][i]+'"]').data('onclass');
                    $('[data-'+checklist+'="'+result.usercheck[checklist][i]+'"]').addClass(onclass);
                }
                
                $('.active-owner[data-author="'+logged_user.nick_id+'"]').addClass('active');
                $('body').trigger($.Event( "logindata"));
                if (result.hashu) hashu = result.hashu;

                only_owner();
                
            } else errordialog(result.message);
        }, 'json');
    }

}

function only_owner() {
    var page_owner = 1*$('[data-owner]').data('owner');
    if (page_owner) {
        $('.only-owner').toggle(page_owner == 1*logged_user.nick_id);
        $('.only-owner input').prop('disabled', (page_owner == 1*logged_user.nick_id) ? '' : 'disabled' );
        $('.no-owner').toggle(page_owner != 1*logged_user.nick_id);
    }
    if (page_owner == 1*logged_user.nick_id) {
        
        $('.giudicabile').hide();
        
    }
}

function open_voto(block,panel,classe,id) {
    if (!$('#'+block+' .panel').length) {
        var html = '';
        if (panel == 'v') {
            html = $('#blocco-voto-film-voted').html();
        } else {
            html = $('#blocco-voto-film-unvoted').html();
        }
        html = html.replace(/\[class\]/g,classe);
        html = html.replace(/\[id\]/g,id);
        $('#'+block).append(html);        
    } else {
        if ($('#'+block+' .panel').hasClass('open')) {
            close_voto(block);
            return;
        } else {
            $('#'+block+' .panel').addClass('open');
        }
    }
    
}

function update_voti(target, voto, stats) {
    $('#block-voti-'+target+' .tuo-voto .voto-stelle').attr('class','voto-stelle personale voto'+voto);
    $('#block-voti-'+target+' .voto-stelle meter').attr('value',voto);
    $('[data-updcls="voto-pub-'+target+'"]').removeClass('voto0 voto1 voto2 voto3 voto4 voto5 voto6 voto7 voto8 voto9 voto10');
    $('[data-updcls="voto-pub-'+target+'"]').addClass('voto'+stats['voto-pub-m0']);
    $('[data-updcls="voto-frm-'+target+'"]').removeClass('voto0 voto1 voto2 voto3 voto4 voto5 voto6 voto7 voto8 voto9 voto10');
    $('[data-updcls="voto-frm-'+target+'"]').addClass('voto'+stats['voto-frm-m0']);
    $('[data-updcls="voto-ftv-'+target+'"]').removeClass('voto0 voto1 voto2 voto3 voto4 voto5 voto6 voto7 voto8 voto9 voto10');
    $('[data-updcls="voto-ftv-'+target+'"]').addClass('voto'+stats['voto-ftv-m0']);
            
    $('[data-updcnt="voto-pub-'+target+'"]').text(stats['voto-pub-m1']);
    $('[data-updcnt="voto-frm-'+target+'"]').text(stats['voto-frm-m1']);
    $('[data-updcnt="voto-ftv-'+target+'"]').text(stats['voto-ftv-m1']);
            
    $('[data-updval="voto-pub-'+target+'"]').attr('value',stats['voto-pub-m1']);
    $('[data-updval="voto-frm-'+target+'"]').attr('value',stats['voto-frm-m1']);
    $('[data-updval="voto-ftv-'+target+'"]').attr('value',stats['voto-ftv-m1']);
}

function choose_voto(target,voto) {
    var data = { item: target, voto: voto };
    if (logged_user) {
        $('#block-voti-'+target+' .tuo-voto .voto-stelle').attr('class','voto-stelle personale voto'+voto);
        $('#block-voti-'+target+' .voto-stelle meter').attr('value',voto);
        $('#block-voti-'+target).removeClass('unvoted');
        $('#block-voti-'+target).addClass('voted');        
        $('#block-voti-'+target+' .panel.open .star-rating').attr('class','star-rating voto'+voto);
        $('#block-voti-'+target+' .panel.open .ok').show();
        close_voto('block-voti-'+target);
    }
    
    $.post('/ajax/voto.php', data, function(data) {
        if (data.status != 'error') {
            update_voti(target, voto, data.stats);
            if (data.watchlist_remove) $('[data-itemid='+data.watchlist_remove+']').slideUp();
        } else {
            $('#block-voti-'+target+' .panel.open .alert b').text(data.message);
            $('#block-voti-'+target+' .panel.open .alert').show();
        }
    }, 'json');
}

function close_voto(block) {
     $('#'+block+' .panel').removeClass('open');
     $('#'+block+' .panel .star-rating').attr('class','star-rating');
     $('#'+block+' .panel .ok').hide();
     $('#'+block+' .panel .alert').hide();
}


jQuery(document).ready(function() { 

    $('body').on('click', '.utile-per-me', function() {
        $panel = $(this).parents('[data-utile]');
        var target = $panel.data('utile');
        var data = { item: $panel.data('utile'), giudizio: 'utile' };
        $.post('/ajax/giudizio.php', data, function(data) {
            if (data.status != 'error') {
                set_utile(target, data.totali, 1);
            } else {
                alert(data.message);
            }
        }, 'json');
    });
    
    $('body').on('click','.utile-per .chiudi', function() {
        $(this).parents('.utile-per').removeClass('open');
    });
    
    $('body').on('click','.utile-per-open', function() {
        $panel = $(this).parents('[data-utile]');
        var target = $panel.data('utile');
        var data = { item: target };
        $.post('/ajax/utile_per.php', data, function(data) {
            if (data.status != 'error') {
                $('.utile-per ul',$panel).html(data.html);
                $('.utile-per',$panel).addClass('open');
            }
        }, 'json');
    });
    
    $('body').on('click','.panel-close', function() {
        $(this).parents('.panel-box-wrapper').hide();
    });

});

function set_utile(target, totali, giudizio) {
    $panel = $('[data-utile="'+target+'"]');
    if (!totali) totali = $('[data-utile-conto="'+target+'"]').text()*1;
    $('.giudicabile',$panel).toggle(giudizio <= 0);
    $('[data-utile-conto="'+target+'"]').text(totali-giudizio);
    $('.giudicato',$panel).toggle(giudizio > 0);
    $('.utile-on',$panel).toggle(totali > 0);
    $('.utile-off',$panel).toggle(totali <= 0);    
}

function open_utile_per(target) {
    var data = { item: target };
    $.post('/ajax/utile_per.php', data, function(data) {
        if (data.status != 'error') {
            $panel = $('[data="'+target+'"]');
            $('.utile-per ul',$panel).html(data.html);
            $('.utile-per',$panel).addClass('open');
        }
    }, 'json');
}

function close_utile_per(target) {
    $('[data="'+target+'"] .utile-per').removeClass('open');
}


/* LIGHTGALLERY jquery plugin by Silvio Sosio */
 
(function($) {

    $.fn.lightGallery = function() {
        var galleryid = '#' + $(this).attr('id');
        
		$(galleryid).addClass('lightGallery-show');

		var scrollsize = 546;//$(this).width() - 100;
		var scrollheight = $(this).height();
		
		//$(galleryid).css('position', 'relative');
		//$(galleryid).css('overflow', 'hidden');
		$(galleryid + ' > *').css('display', 'block');
		$(galleryid + ' > *').css('float', 'left');
		$(galleryid + ' > *').css('clear', 'none');

		$(galleryid + ' > *').wrapAll('<div class="lightGallery-roller" style="width: ' + $(this).width() + 'px; overflow-x: hidden; overflow-y: hidden; position: relative;"><div class="lightGallery-roll" style="width: 200000px; position: relative;">');

		$(galleryid).append('<div class="lightGallery-left-tools" href="#"></div>');
		$(galleryid).append('<div class="lightGallery-right-tools" href="#"></div>');
		$(galleryid + ' .lightGallery-left-tools').css('opacity', '0.5');
		$(galleryid + ' .lightGallery-right-tools').css('opacity', '0.5');

		$(galleryid + ' .lightGallery-left-tools').append('<a class="lightGallery-left prev" href="#">&nbsp;</a>');
		$(galleryid + ' .lightGallery-right-tools').append('<a class="lightGallery-right next" href="#">&nbsp;</a>');
		//$(galleryid + ' .lightGallery-left-tools').append('<a class="lightGallery-moreleft"  href="#" style="display: block; text-decoration: none; border: none; position: absolute; top: 0; left: 0;    width: 5px;  height: ' + scrollheight + 'px; outline: none;">&nbsp;</a>');
		//$(galleryid + ' .lightGallery-right-tools').append('<a class="lightGallery-moreright" href="#" style="display: block; text-decoration: none; border: none; position: absolute; top: 0; right: 0;   width: 5px;  height: ' + scrollheight + 'px; outline: none;">&nbsp;</a>');
		
		$(galleryid + ' .lightGallery-roll').append('<div class="lightGallery-end" style="display: block; float: left; background: transparent; width: 10px; /* height: ' + scrollheight + 'px; */ margin:0;">&nbsp;</div>');	
		
		$(galleryid + ' .lightGallery-left-tools').hover(function() {
			$(galleryid + ' .lightGallery-left-tools').css('opacity', '1');
		}, function() {
			$(galleryid + ' .lightGallery-left-tools').css('opacity', '0.5');
		});
		$(galleryid + ' .lightGallery-right-tools').hover(function() {
			$(galleryid + ' .lightGallery-right-tools').css('opacity', '1');
		}, function() {
			$(galleryid + ' .lightGallery-right-tools').css('opacity', '0.5');
		});
		$(galleryid + ' .lightGallery-moreleft').hover(function() {
			$(galleryid + ' .lightGallery-left-tools').css('background-position', '-50px 50%');
		}, function() {
			$(galleryid + ' .lightGallery-left-tools').css('background-position', '0 50%');
		});
		$(galleryid + ' .lightGallery-moreright').hover(function() {
			$(galleryid + ' .lightGallery-right-tools').css('background-position', '-100px 50%');
		}, function() {
			$(galleryid + ' .lightGallery-right-tools').css('background-position', '-150px 50%');
		});

		$(galleryid + ' .lightGallery-moreleft').click(function() {
			$(galleryid + ' .lightGallery-roller').animate({
				scrollLeft : 0
			}, 'fast');
			return false;
		});
		$(galleryid + ' .lightGallery-moreright').click(function() {
			var realLength = $(galleryid + ' .lightGallery-end').position().left;
			$(galleryid + ' .lightGallery-roller').animate({
				scrollLeft : realLength
			}, 'fast');
			return false;
		});
		$(galleryid + ' .lightGallery-left').click(function() {
			$(galleryid + ' .lightGallery-roller').animate({
				scrollLeft : '-=' + scrollsize
			}, 'medium');
			return false;
		});
		$(galleryid + ' .lightGallery-right').click(function() {
			$(galleryid + ' .lightGallery-roller').animate({
				scrollLeft : '+=' + scrollsize
			}, 'medium');
			return false;
		});

		$(window).load(function() {			
			
			if ($(galleryid + ' .lightGallery-end').length > 0)
			{
				$(galleryid + ' .lightGallery-roll').width($(galleryid + ' .lightGallery-end').position().left + 10);
				$(galleryid).lightGallerySetup(galleryid);
				$(galleryid + ' .lightGallery-roller').scroll(function() {
					$(galleryid).lightGallerySetup(galleryid);
				});
			
				if ($("a.jq-img-select").length > 0) {
					
					var thumbW = (parseInt($("a.jq-img-select").children("figure").width())+20);
									
					$(galleryid + ' .lightGallery-roller').animate({
						scrollLeft : '+=' + (parseInt($("a.jq-img-select").position().left)-thumbW)
					}, 'medium');
				}				
			}
		});
	};

	$.fn.lightGallerySetup = function(galleryid) {
		
		var realLength = $(galleryid + ' .lightGallery-end').position().left;
		var winLength = $(galleryid + ' .lightGallery-roller').width();
		var offset = -$(galleryid + ' .lightGallery-roll').position().left;

		if (offset > 0) {
			$(galleryid + ' .lightGallery-left-tools').fadeIn(100);
		} else {
			$(galleryid + ' .lightGallery-left-tools').fadeOut(100);
		}
		if (realLength - winLength - offset > 0) {
			$(galleryid + ' .lightGallery-right-tools').fadeIn(100);
		} else {
			$(galleryid + ' .lightGallery-right-tools').fadeOut(100);
		}
	};

	$.fn.lightVerticalGallery = function() {

		var galleryid = '#' + $(this).attr('id');
		$(galleryid).addClass('lightVerticalGallery-show');

		var scrollsize = $(this).height() - 100;
		var scrollwidth = $(this).width();

		$(galleryid).css('position', 'relative');
		$(galleryid).css('overflow', 'hidden');
		$(galleryid + ' > *').css('display', 'block');
		$(galleryid + ' > *').css('float', 'none');
		$(galleryid + ' > *').css('clear', 'both');
		$(galleryid + ' > *').wrapAll('<div class="lightVerticalGallery-roller" style="width: ' + (scrollwidth + 30) + 'px; height: ' + $(this).height() + 'px; overflow-y: auto; overflow-x: hidden; position: relative;"><div class="lightVerticalGallery-roll" style="white-space: nowrap; position: relative;">');
		$(galleryid).append('<div class="lightVerticalGallery-top-tools" href="#" style="display: none; position: absolute; margin: 0; padding: 0;left: 0; top: 0; height: 50px; width: ' + scrollwidth + 'px;"></div>');
		$(galleryid).append('<div class="lightVerticalGallery-bottom-tools" href="#" style="display: none; position: absolute; margin: 0; padding: 0;left: 0; bottom: 0; height: 50px; width: ' + scrollwidth + 'px;"></div>');
		$(galleryid + ' .lightVerticalGallery-top-tools').css('opacity', '0.5');
		$(galleryid + ' .lightVerticalGallery-bottom-tools').css('opacity', '0.5');

		$(galleryid + ' .lightVerticalGallery-top-tools').append('<a class="lightVerticalGallery-top"      href="#" style="display: block; text-decoration: none; margin: 0; padding: 0; border: none; position: absolute; left: 0; top: 5px;  height: 45px; width: ' + scrollwidth + 'px; outline: none;">&nbsp;</a>');
		$(galleryid + ' .lightVerticalGallery-bottom-tools').append('<a class="lightVerticalGallery-bottom"     href="#" style="display: block; text-decoration: none; margin: 0; padding: 0;border: none; position: absolute; left: 0; bottom: 5px; height: 45px; width: ' + scrollwidth + 'px; outline: none;">&nbsp;</a>');
		$(galleryid + ' .lightVerticalGallery-top-tools').append('<a class="lightVerticalGallery-moretop"  href="#" style="display: block; text-decoration: none; margin: 0; padding: 0;border: none; position: absolute; left: 0; top: 0;    height: 5px;  width: ' + scrollwidth + 'px; outline: none;">&nbsp;</a>');
		$(galleryid + ' .lightVerticalGallery-bottom-tools').append('<a class="lightVerticalGallery-morebottom" href="#" style="display: block; text-decoration: none; margin: 0; padding: 0;border: none; position: absolute; left: 0; bottom: 0;   height: 5px;  width: ' + scrollwidth + 'px; outline: none;">&nbsp;</a>');
		$(galleryid + ' .lightVerticalGallery-roll').append('<div class="lightVerticalGallery-end" style="display: block; margin: 0; padding: 0;background: transparent; height: 10px; width: ' + scrollwidth + 'px; margin:0;">&nbsp;</div>');

		$(galleryid + ' .lightVerticalGallery-top-tools').hover(function() {
			$(galleryid + ' .lightVerticalGallery-top-tools').css('opacity', '1');
		}, function() {
			$(galleryid + ' .lightVerticalGallery-top-tools').css('opacity', '0.5');
		});
		$(galleryid + ' .lightVerticalGallery-bottom-tools').hover(function() {
			$(galleryid + ' .lightVerticalGallery-bottom-tools').css('opacity', '1');
		}, function() {
			$(galleryid + ' .lightVerticalGallery-bottom-tools').css('opacity', '0.5');
		});
		$(galleryid + ' .lightVerticalGallery-moretop').hover(function() {
			$(galleryid + ' .lightVerticalGallery-top-tools').css('background-position', '50% -50px');
		}, function() {
			$(galleryid + ' .lightVerticalGallery-top-tools').css('background-position', '50% 0');
		});
		$(galleryid + ' .lightVerticalGallery-morebottom').hover(function() {
			$(galleryid + ' .lightVerticalGallery-bottom-tools').css('background-position', '50% -100px');
		}, function() {
			$(galleryid + ' .lightVerticalGallery-bottom-tools').css('background-position', '50% -150px');
		});

		$(galleryid + ' .lightVerticalGallery-moretop').click(function() {
			$(galleryid + ' .lightVerticalGallery-roller').animate({
				scrollTop : 0
			}, 'fast');
			return false;
		});
		$(galleryid + ' .lightVerticalGallery-morebottom').click(function() {
			var realLength = $(galleryid + ' .lightVerticalGallery-end').position().top;
			$(galleryid + ' .lightVerticalGallery-roller').animate({
				scrollTop : realLength
			}, 'fast');
			return false;
		});
		$(galleryid + ' .lightVerticalGallery-top').click(function() {
			$(galleryid + ' .lightVerticalGallery-roller').animate({
				scrollTop : '-=' + scrollsize
			}, 'medium');
			return false;
		});
		$(galleryid + ' .lightVerticalGallery-bottom').click(function() {
			$(galleryid + ' .lightVerticalGallery-roller').animate({
				scrollTop : '+=' + scrollsize
			}, 'medium');
			return false;
		});

		$(window).load(function() {

			$(galleryid).lightVerticalGallerySetup(galleryid);
			$(galleryid + ' .lightVerticalGallery-roller').scroll(function() {
				$(galleryid).lightVerticalGallerySetup(galleryid);
			});

		});

	};

	$.fn.lightVerticalGallerySetup = function(galleryid) {
		var realLength = $(galleryid + ' .lightVerticalGallery-end').position().top;
		var winLength = $(galleryid + ' .lightVerticalGallery-roller').height();
		var offset = -$(galleryid + ' .lightVerticalGallery-roll').position().top;

		if (offset > 0) {
			$(galleryid + ' .lightVerticalGallery-top-tools').fadeIn(100);
		} else {
			$(galleryid + ' .lightVerticalGallery-top-tools').fadeOut(100);
		}
		if (realLength - winLength - offset > 0) {
			$(galleryid + ' .lightVerticalGallery-bottom-tools').fadeIn(100);
		} else {
			$(galleryid + ' .lightVerticalGallery-bottom-tools').fadeOut(100);
		}
	};

})(jQuery);

var logged_user = false;


jQuery(document).ready(function() { 

    $('body').on('click','a.aggiungi-a', function() {
        if (!logged_user || !logged_user.nick_id) return;
		var $button = $(this);
        console.log()
		var $panel = $(this).parents('.panel-box');
        if ($('.aggiungi-a-dialog').length === 0) {
            $.get('/loader/aggiungi/'+$(this).data('tipo')+'/'+$(this).data('item')+'/', { }, function(data) {
            if (data.status != 'error') {
                startRefresh();
/*
                _gaq.push (['_gat._anonymizeIp']);
                _gaq.push([ '_trackPageview', data.requested_url ]);
*/
                $('body').append(data.html);
                    inizializzaAggiungiA();                            
                }
            }, 'json');
        } else {
            $('.aggiungi-a-dialog').data('item',$(this).data('item'));
            aggiungia_load_personal('M');
            $('.aggiungi-a-dialog .panel').removeClass('open');
            $('.aggiungi-a-dialog .select-list-panel').addClass('open');
            $('.aggiungi-a-wrap').show();
            $('.aggiungi-a-dialog').fadeIn();
        }
		return false;
	});

});


function inizializzaAggiungiA() {
   
   aggiungia_load_personal('M');
   
    $('[name="playlist-sort"]').change( function() { aggiungia_load_personal($('[name="playlist-sort"]').val().toLowerCase()); });

    $('[name="playlist-filter"]').bind( 'input', function() { aggiungia_filter_list($('[name="playlist-filter"]').val()); });   
}

function aggiungia_load_personal(sort) {
    var data = { action: 'get_playlist_list', sort: sort, tipo: $('.aggiungi-a-dialog').data('tipo') };
    $.post('/ajax/playlist.php', data, function(response) {
        if (response.status != 'error' && response.conto > 0) {
            $('.personal-list ul').empty();
            $('.personal-list ul').append(response.html);
            if (aggiungia_filter) aggiungia_filter_list(aggiungia_filter);
            $('.personal-list').css('display','block');
        } else console.log(response.status);
    }, 'json');
}

var aggiungia_filter = '';

function aggiungia_filter_list(filter) {
    if (!filter)  $('.personal-list ul li').show();
    else {
        aggiungia_filter = filter;
        $('.personal-list ul li').hide();
        $('.personal-list ul li[data-titolo*="'+filter.replace('"','')+'"]').show();
    }
}

function aggiungia_chiudi() {
    $('.aggiungi-a-wrap').hide();
    $('.aggiungi-a-dialog').fadeIn();
}

function aggiungia_select_list(lista) {
    var data = { action: 'add', lista: lista, tipo: $('.aggiungi-a-dialog').data('tipo'), item: $('.aggiungi-a-dialog').data('item')  };
    $.post('/ajax/playlist.php', data, function(response) {
        if (response.status != 'error') {
            $('.select-list-panel').removeClass('open');
            $panel = $('.added-'+response.listkind+'-panel');
            $('strong#titolo-film').text(response.itemtitle);
            $('#nome-lista').text(response.listtitle);
            $('.modifica-lista').attr('href', response.review );
            $panel.data('id_playlist',response.id_playlist);
            $panel.data('id_item',response.id_item);
            $panel.addClass('open');
        } else panel_error( $('.select-list-panel'),response.message);
    }, 'json');
}

function panel_error($panel,message) {
    $('.error-message', $panel).text(message);
    $('.error-message', $panel).show();
    setTimeout(function() { $('.error-message', $panel).hide(); }, 3000);
}

function aggiungia_select_new() {
    $panel = $('.select-list-panel');
    var data = { action: 'new', tipo: $('.aggiungi-a-dialog').data('tipo'), item: $('.aggiungi-a-dialog').data('item'),
        titolo: $('[name="lista-titolo"]',$panel).val(), introduzione: $('[name="lista-introduzione"]',$panel).val(),
        visibilita: $('[name="lista-visibilita"]:checked',$panel).val(), modificabile: $('[name="lista-modificabile"]:checked',$panel).val()
    };
    $.post('/ajax/playlist.php', data, function(response) {
        if (response.status != 'error') {
            $('.select-list-panel').removeClass('open');
            $panel = $('.added-'+response.listkind+'-panel');
            $('#titolo-film',$panel).text(response.itemtitle);
            $('#nome-lista',$panel).text(response.listtitle);
            $panel.data('id_playlist',response.id_playlist);
            $panel.data('id_item',response.id_item);
            $panel.addClass('open');
        } else panel_error($('.select-list-panel'),response.message);
    }, 'json');
}

function aggiungia_commento(panel) {
    $panel = $('.added-'+panel+'-panel');
    var data = { action: 'add-comment', lista: $panel.data('id_playlist'), id_item: $panel.data('id_item'), commento: $('[name="item-commento"]',$panel).val(), video: $('[name="item-video"]',$panel).val() };
    $.post('/ajax/playlist.php', data, function(response) {
        if (response.status != 'error') {
            $panel.removeClass('open');
            $panel = $('.added-dettagli-panel');
            $panel.addClass('open');
            setTimeout(function () { aggiungia_chiudi(); }, 2000 );
        } else panel_error($('.added-'+panel+'-panel'),response.message );
    }, 'json');
}

function aggiungia_videoteca(panel) {
    $panel = $('.added-videoteca-panel');
    var data = { action: 'add-videoteca', lista: $panel.data('id_playlist'), id_item: $panel.data('id_item'), formati: $('[name="tipo"]:checked',$panel).val() };
    $.post('/ajax/playlist.php', data, function(response) {
        if (response.status != 'error') {
            $panel.removeClass('open');
            $panel = $('.added-dettagli-panel');
            $panel.addClass('open');
            setTimeout(function () { aggiungia_chiudi(); }, 2000 );
        } else  panel_error($('.added-videoteca-panel'),response.message );
    }, 'json');
}

jQuery.fn.sortElements = (function(){
 
    var sort = [].sort;
 
    return function(comparator, getSortable) {
 
        getSortable = getSortable || function(){return this;};
 
        var placements = this.map(function(){
 
            var sortElement = getSortable.call(this),
                parentNode = sortElement.parentNode,
 
                // Since the element itself will change position, we have
                // to have some way of storing its original position in
                // the DOM. The easiest way is to have a 'flag' node:
                nextSibling = parentNode.insertBefore(
                    document.createTextNode(''),
                    sortElement.nextSibling
                );
 
            return function() {
 
                if (parentNode === this) {
                    throw new Error(
                        "You can't sort elements if any one is a descendant of another."
                    );
                }
 
                // Insert before flag:
                parentNode.insertBefore(this, nextSibling);
                // Remove flag:
                parentNode.removeChild(nextSibling);
 
            };
 
        });
 
        return sort.call(this, comparator).each(function(i){
            placements[i].call(getSortable.call(this));
        });
 
    };
 
})();


/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie=function(name,value,options){if(typeof value!='undefined'){options=options||{};if(value===null){value='';options.expires=-1;}var expires='';if(options.expires&&(typeof options.expires=='number'||options.expires.toUTCString)){var date;if(typeof options.expires=='number'){date=new Date();date.setTime(date.getTime()+(options.expires*24*60*60*1000));}else{date=options.expires;}expires='; expires='+date.toUTCString();}var path=options.path?'; path='+(options.path):'';var domain=options.domain?'; domain='+(options.domain):'';var secure=options.secure?'; secure':'';document.cookie=[name,'=',encodeURIComponent(value),expires,path,domain,secure].join('');}else{var cookieValue=null;if(document.cookie&&document.cookie!=''){var cookies=document.cookie.split(';');for(var i=0;i<cookies.length;i++){var cookie=jQuery.trim(cookies[i]);if(cookie.substring(0,name.length+1)==(name+'=')){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break;}}}return cookieValue;}};

/**
 * Timeago is a jQuery plugin that makes it easy to support automatically
 * updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
 *
 * @name timeago
 * @version 1.4.0
 * @requires jQuery v1.2.3+
 * @author Ryan McGeary
 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
 *
 * For usage and examples, visit:
 * http://timeago.yarp.com/
 *
 * Copyright (c) 2008-2013, Ryan McGeary (ryan -[at]- mcgeary [*dot*] org)
 */

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function ($) {
  $.timeago = function(timestamp) {
    if (timestamp instanceof Date) {
      return inWords(timestamp);
    } else if (typeof timestamp === "string") {
      return inWords($.timeago.parse(timestamp));
    } else if (typeof timestamp === "number") {
      return inWords(new Date(timestamp));
    } else {
      return inWords($.timeago.datetime(timestamp));
    }
  };
  var $t = $.timeago;

  $.extend($.timeago, {
    settings: {
      refreshMillis: 60000,
      allowPast: true,
      allowFuture: false,
      localeTitle: false,
      cutoff: 2592000000,
      strings: {
        prefixAgo: null,
        prefixFromNow: null,
        suffixAgo: "fa",
        suffixFromNow: "da ora",
        inPast: 'a breve',
        seconds: "meno di un minuto",
        minute: "circa un minuto",
        minutes: "%d minuti",
        hour: "circa un'ora",
        hours: "circa %d ore",
        day: "un giorno",
        days: "%d giorni",
        month: "circa un mese",
        months: "%d mesi",
        year: "circa un anno",
        years: "%d anni",
        wordSeparator: " ",
        numbers: []
      }
    },

    inWords: function(distanceMillis) {
      if(!this.settings.allowPast && ! this.settings.allowFuture) {
          throw 'timeago allowPast and allowFuture settings can not both be set to false.';
      }

      var $l = this.settings.strings;
      var prefix = $l.prefixAgo;
      var suffix = $l.suffixAgo;
      if (this.settings.allowFuture) {
        if (distanceMillis < 0) {
          prefix = $l.prefixFromNow;
          suffix = $l.suffixFromNow;
        }
      }

      if(!this.settings.allowPast && distanceMillis >= 0) {
        return this.settings.strings.inPast;
      }

      var seconds = Math.abs(distanceMillis) / 1000;
      var minutes = seconds / 60;
      var hours = minutes / 60;
      var days = hours / 24;
      var years = days / 365;

      function substitute(stringOrFunction, number) {
        var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction;
        var value = ($l.numbers && $l.numbers[number]) || number;
        return string.replace(/%d/i, value);
      }

      var words = seconds < 45 && substitute($l.seconds, Math.round(seconds)) ||
        seconds < 90 && substitute($l.minute, 1) ||
        minutes < 45 && substitute($l.minutes, Math.round(minutes)) ||
        minutes < 90 && substitute($l.hour, 1) ||
        hours < 24 && substitute($l.hours, Math.round(hours)) ||
        hours < 42 && substitute($l.day, 1) ||
        days < 30 && substitute($l.days, Math.round(days)) ||
        days < 45 && substitute($l.month, 1) ||
        days < 365 && substitute($l.months, Math.round(days / 30)) ||
        years < 1.5 && substitute($l.year, 1) ||
        substitute($l.years, Math.round(years));

      var separator = $l.wordSeparator || "";
      if ($l.wordSeparator === undefined) { separator = " "; }
      return $.trim([prefix, words, suffix].join(separator));
    },

    parse: function(iso8601) {
      var s = $.trim(iso8601);
      s = s.replace(/\.\d+/,""); // remove milliseconds
      s = s.replace(/-/,"/").replace(/-/,"/");
      s = s.replace(/T/," ").replace(/Z/," UTC");
      s = s.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"); // -04:00 -> -0400
      s = s.replace(/([\+\-]\d\d)$/," $100"); // +09 -> +0900
      return new Date(s);
    },
    datetime: function(elem) {
      var iso8601 = $t.isTime(elem) ? $(elem).attr("datetime") : $(elem).attr("title");
      return $t.parse(iso8601);
    },
    isTime: function(elem) {
      // jQuery's `is()` doesn't play well with HTML5 in IE
      return $(elem).get(0).tagName.toLowerCase() === "time"; // $(elem).is("time");
    }
  });

  // functions that can be called via $(el).timeago('action')
  // init is default when no action is given
  // functions are called with context of a single element
  var functions = {
    init: function(){
      var refresh_el = $.proxy(refresh, this);
      refresh_el();
      var $s = $t.settings;
      if ($s.refreshMillis > 0) {
        this._timeagoInterval = setInterval(refresh_el, $s.refreshMillis);
      }
    },
    update: function(time){
      var parsedTime = $t.parse(time);
      $(this).data('timeago', { datetime: parsedTime });
      if($t.settings.localeTitle) $(this).attr("title", parsedTime.toLocaleString());
      refresh.apply(this);
    },
    updateFromDOM: function(){
      $(this).data('timeago', { datetime: $t.parse( $t.isTime(this) ? $(this).attr("datetime") : $(this).attr("title") ) });
      refresh.apply(this);
    },
    dispose: function () {
      if (this._timeagoInterval) {
        window.clearInterval(this._timeagoInterval);
        this._timeagoInterval = null;
      }
    }
  };

  $.fn.timeago = function(action, options) {
    var fn = action ? functions[action] : functions.init;
    if(!fn){
      throw new Error("Unknown function name '"+ action +"' for timeago");
    }
    // each over objects here and call the requested function
    this.each(function(){
      fn.call(this, options);
    });
    return this;
  };

  function refresh() {
    var data = prepareData(this);
    var $s = $t.settings;

    if (!isNaN(data.datetime)) {
      if ( $s.cutoff == 0 || distance(data.datetime) < $s.cutoff) {
        $(this).text(inWords(data.datetime));
      }
    }
    return this;
  }

  function prepareData(element) {
    element = $(element);
    if (!element.data("timeago")) {
      element.data("timeago", { datetime: $t.datetime(element) });
      var text = $.trim(element.text());
      if ($t.settings.localeTitle) {
        element.attr("title", element.data('timeago').datetime.toLocaleString());
      } else if (text.length > 0 && !($t.isTime(element) && element.attr("title"))) {
        element.attr("title", text);
      }
    }
    return element.data("timeago");
  }

  function inWords(date) {
    return $t.inWords(distance(date));
  }

  function distance(date) {
    return (new Date().getTime() - date.getTime());
  }

  // fix for IE6 suckage
  document.createElement("abbr");
  document.createElement("time");
}));

$.fn.jtemplate = function(data) {
/* jQuery template engine by Silvio Sosio */

    var html = $(this).html();
    html = html.replace('%7B%7B','{{');
    html = html.replace('%7D%7D','}}');
    
    /* {{? */
	var reg = new RegExp('{{\\?([^}]*)}}(.*?){{/\\?}}', 'gi');
    
	html = html.replace(reg, function(amatch,acondition,ablock) {
        try {
            with (data) {
	    		if (eval(acondition.replace('&gt;','>').replace('&lt;','<'))) return ablock;
		    	else return '';
		    }
        } catch (ex) {
           // console.log('Syntax Error ',ex);
        }
	});
    
    /* {{# */
	var reg = new RegExp('{{#\\s*([^}]*?)\\s*}}(.*?){{/#}}', 'gi');
    
    
    html = html.replace(reg,function(match,condition,block) {
		if (data[condition]) return block;
		else return '';
	});
    
    /* {{* */
	var reg = new RegExp('{{\\*\\s*([^}]*?)\\s*}}(.*?){{/\\*}}', 'gi');
	html = html.replace(reg, function(match,condition,block) {
		if (!Array.isArray(data[condition])) return block;
		var newblock = '';
		for (var i=0; i<data[condition].length; i++) {
			newblock += block.replace('[]','['+i+']');
		}
		return newblock;
	});

    
    /* data */
	for (v in data) {
		var reg = new RegExp('{{'+v+'}}', 'gi');
		html = html.replace(reg, data[v]);

		if (typeof(data[v]) == 'object' ) {
			var reg = new RegExp('{{'+v+'\\[(.+?)\\]}}', 'gi');
			html = html.replace(reg, function(match,p1) { return data[v][p1]; });
		}

		reg = new RegExp('{{('+v+'):([a-zA-Z0-9_]+)\\((.*?)\\)}}', 'gi');
		html = html.replace(reg, function(match,p1,p2,p3) {
			var params = eval('['+p3+']'); // 
			var func = window['jtemplate_'+p2];
			if (typeof func === "function") return func.apply(null, [ data[p1], params ]);
			else if (typeof (func = data[p1][p2]) === "function") return func.apply(data[p1], params);
			else if (typeof (func = window[p2]) === "function") { params.unshift(data[p1]); return func.apply(null, params); }
			else return data[p1];
		});
	}
	
	return $(html);
};

$.fn.jtemplateAppend = function(list, target, effect) { $(this).jtemplateAdd(list, target, effect, 'append'); }
$.fn.jtemplatePrepend = function(list, target, effect) { $(this).jtemplateAdd(list, target, effect, 'prepend'); }
$.fn.jtemplateReplace = function(list, target, effect) { $(this).jtemplateAdd(list, target, effect, 'replace'); }

$.fn.jtemplateAdd = function(list, target, effect, method) {
	var badge = 'tplapp'+Date.now();
    if (!list) return;
    if (!Array.isArray(list)) list = [ list ];
    
    for (var i=0; i<list.length; i++) {
    	var $html = $(this).jtemplate(list[i]).attr('data-tplappend',badge).css('display','none');
    	switch (method) {
    		case 'prepend': $html.prependTo(target); break;
    		case 'replace': $html.replaceAll(target); break;
    		default: case 'append': $html.appendTo(target); break;
    	}
	}
	switch (effect) {
		case 'slideDown': $('[data-tplappend="'+badge+'"]').slideDown(); break;
		case 'no': break;
		case 'show': $('[data-tplappend="'+badge+'"]').show(); break;
		default: case 'fadeIn': $('[data-tplappend="'+badge+'"]').fadeIn(); break;
	}
	$('[data-tplappend="'+badge+'"]').removeAttr('data-tplappend');
	return;
}

function jtemplate_date(string, params) {
	return new Date(string.replace(' ','T')).format(params[0]);
}

function jtemplate_number(string, params) {
	var num = parseFloat(string).toFixed(params[0]);
	if (params[1]) num = num.toString().replace('.',params[1]);
	if (num != '' && params[2] != '') {
		while (num.match(/(\d+)(\d\d\d)([^0-9]|$)/)) {
			num = num.replace(/(\d+)(\d\d\d)([^0-9]|$)/,'$1'+params[2]+'$2$3');
		}
	}
	return num;
}

function jtemplate_slug(string, params) {
	var len = params[0] ? params[0] : 60;
	string = string.replace(/^\s+|\s+$/g, '');
	string = string.toLowerCase();
	var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
	var to   = "aaaaaeeeeeiiiiooooouuuunc------";
	for (var i=0, l=from.length ; i<l ; i++) string = string.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	string = string.replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');
	string = string.substr(0,len);
	return string;
};

function jtemplate_wrap(string, params) {
	var len = params[0];
	var space = params[1] ? params[1] : ' ';
	string = string.replace(/<br\s*\/?>/, ' ', string);
	string = string.replace(/<[^>]+>/,'');
	if (string.length < len) return string;
	string = string.substr(0, len-3);
	var reg = new RegExp(space+'[^'+space+']+$');
	var string2 = string.replace(reg,'');
	if (string2.length > string.length/2) string = string2;
	if (space == ' ') string += '...';
	return string;
}

Date.prototype.format = function ( format, r, locale ) {
// by Giacomo Trudu improved by Silvio Sosio
   r = ( typeof r != 'undefined' && r );
   
   var time = this;
 
   // Build the Date object
   var date = ( typeof time != 'undefined' ) ? ( time instanceof Date ? time : new Date( time * 1000 ) ) : new Date;
 
   // Number of seconds since the beginning of this year
   var year_seconds = ( date - new Date( date.getFullYear(), 0, 1 ) ) / 1000;
 
   // Retrieve the date informations
   var meta = String( date ).match( /^.*?([A-Z]{1,4})([\-+]\d{4}) \(([A-Z]+)\).*$/ );
 
   date = {
 
      d : date.getDate(),
      D : date.getDay(),
      m : date.getMonth(),
      y : date.getFullYear(),
      l : ( new Date( date.getFullYear(), 1, 29 ).getMonth() === 1 | 0 ),
      h : date.getHours(),
      M : date.getMinutes(),
      s : date.getSeconds(),
      u : date.getMilliseconds(),
      t : date.getTime(),
      z : date.getTimezoneOffset()
   };
 
   // Stringa della data formattata
   var timestr = '';
 
   // Riempie di zeri le cifre alla sinistra di un numero
   var pad = function ( value, len ) {
 
      return ( '000000000' + String( value ) ).slice( -len );
   };
   
   	if (!locale) locale = 'it';
	var locale_string = {
		it: {
			D:	[ 'Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab' ],
			l:  [ 'Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato' ],
			S:	[ '', '', '', '' ],
			F:	[ 'Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic' ],
			M:	[ 'gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre' ]
		},
		en: {
			D:	[ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
			l:	[ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
			S:	[ 'th', 'st', 'nd', 'rd' ],
			F:	[ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
			M:	[ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
		} 
	}
 
   // Define the format characters
   var fmt_characters = {
 
      d : function () { return pad( date.d, 2 ); },
      D : function () { return locale_string[locale].D[ date.D ]; },
      j : function () { return date.d; },
      l : function () { return locale_string[locale].l[ date.D ]; },
      N : function () { return date.D + 1; },
      S : function () { return locale_string[locale].S[ date.d % 10 > 3 ? 0 : ( date.d < 10 || date.d > 20 ) * date.d % 10 ]; },
      w : function () { return date.D; },
      z : function () { return Math.ceil( year_seconds / 86400 ); },
      W : function () { return Math.ceil( year_seconds / 604800 ); },
      F : function () { return locale_string[locale].F[ date.m ]; },
      m : function () { return pad( date.m + 1, 2 ); },
      M : function () { return locale_string[locale].M[ date.m ]; },
      n : function () { return date.m + 1; },
      t : function () { return [31, (date.l ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][ date.m ]; },
      L : function () { return date.l; },
      Y : function () { return date.y; },
      y : function () { return String( date.y ).slice( -2 ); },
      a : function () { return ( date.h < 12 ? 'am' : 'pm' ); },
      A : function () { return ( date.h < 12 ? 'AM' : 'PM' ); },
      g : function () { return date.h % 12 || 12; },
      G : function () { return date.h; },
      h : function () { return pad( date.h % 12 || 12, 2 ); },
      H : function () { return pad( date.h, 2 ); },
      i : function () { return pad( date.M, 2 ); },
      s : function () { return pad( date.s, 2 ); },
      u : function () { return date.u * 1000; },
      I : function () { return ( date.m > 2 && date.m < 10 || ( date.m == 2 && date.D - date.d >= 8 - 1 ) ); },
      O : function () { return meta[2]; },
      P : function () { return meta[2].slice( 0, -2 ) + ':' + meta[2].slice( -2 ); },
      T : function () { return meta[3]; },
      Z : function () { return -date.z * 60; },
      c : function () { return ( !r ? formatDate( 'Y-m-d\\TH:i:sP', time, true ) : null ); },
      r : function () { return ( !r ? formatDate( 'D, d M Y H:i:s O', time, true ) : null ); },
      U : function () { return Math.floor( date.t / 1000 ); }
   };
 
   // Split the format string into tokens
   var tokens = format.match( /(\\.|.)/gi );
 
   // Make the time string
   for ( var i = 0; i < tokens.length; i++ )
      timestr += ( tokens[i] in fmt_characters ? fmt_characters[ tokens[i] ]() : ( tokens[i].length == 1 ? tokens[i] : tokens[i][1] ) );
 
   return timestr;
};



// Script social header
 $(document).ready(function(){
    $(".apri-social").click(function(){
    $(".social-header").toggleClass("close open");
    });
});

// Script filtri responsive
$(document).ready(function(){
        $(".espandi").click(function(){
        $(".menu-filtri").toggleClass("close open");
        });
    });

// Elimina hover in device touch
$(document).ready(function() {
        $('li.home a, li.cinema a, li.tv a, li.film a, li.community a, .clickme-all, .clickme-all-trailer  ').live('touchend', function(){
            $(this).mouseout();
        });  
});

// Cambia la classe ring nella lista film tv - sotto i 768px diventa ring36p

$(document).ready(function() {
          function checkWidth(init)
    {
        /*If browser resized, check width again */
        if ($(window).width() < 768) {
            $('.lista-film-tv footer .ring').removeClass('ring65p').addClass('ring36p');
        }
        else {
            if (!init) {
                $('.lista-film-tv footer .ring').removeClass('ring36p').addClass('ring65p');
            }
        }
    }

$(document).ready(function() {
    checkWidth(true);

    $(window).resize(function() {
        checkWidth(false);
    });
    
});
});

/* gestisce pulsante toogle in modale foto  */
$(document).ready(function(){
        	$('.clickme').click(function(){
    var link = $(this);
    $('.all-image-content').slideToggle('slow', function() {
        if ($(this).is(':visible')) {
             link.text('Torna alla foto');                
        } else {
             link.text('Guarda tutte le foto');                
        }        
    });       
});
	});
    
/* gestisce pulsante toogle in modale foto  */
$(document).ready(function(){
            $('.clickme-all').click(function(){
    $('.all-image-content').slideToggle('slow');
        $('.clickme').text('Guarda tutte le foto');
});
	});
    
/* gestisce pulsante toogle in modale video  */
$(document).ready(function(){
            $('.clickme-trailer').click(function(){
    var link = $(this);
    $('.all-image-content').slideToggle('slow', function() {
        if ($(this).is(':visible')) {
             link.text('Torna al trailer');                
        } else {
             link.text('Guarda tutti trailer');                
        }        
    });       
});
	});
    
/* gestisce pulsante toogle in modale video  */
$(document).ready(function(){
            $('.clickme-all-trailer').click(function(){
    $('.all-image-content').slideToggle('slow');
        $('.clickme-trailer').text('Guarda tutti trailer');
});
	});


/* gestisce pulsante socia e utente toogle in header   */
    
$(document).ready(function(){
    		$(".utente-icon").click(function(){
				$(".sottomenu-utente").slideToggle("swing");
				$('.sottomenu-social').fadeOut("swing");
		});
	});

$(document).ready(function() {
		$(".social-icon").click(function(){
				$(".sottomenu-social").slideToggle("swing");
				$(".sottomenu-utente").fadeOut("swing");
		});
		
});

function sswacarousel($div) {
    
    $(window).resize( function() { sswacarouselinit($div); });

    sswacarouselinit($div);

    $('.next',$div).click(function() {
		var current = $div.data('current_item');
		var target  = $div.data('current_item') + $div.data('items_per_screen');
		if (target > $div.data('items_count') - $div.data('items_per_screen') + 1) target = $div.data('items_count') - $div.data('items_per_screen') + 1;
        $div.data('current_item', target);
		$(this).siblings('ul').animate({ left: -($div.data('item_width') * ($div.data('current_item') - 1))}, 300 );
		$(this).siblings('.prev').fadeIn();
		if ($div.data('current_item') == $div.data('items_count') - $div.data('items_per_screen') + 1) $(this).fadeOut();
		return false;
	});

	$('.prev',$div).click(function() {
		var current = $div.data('current_item');
		var target  = $div.data('current_item') - $div.data('items_per_screen');
		if (target < 1) target = 1;
        $div.data('current_item', target);
		$(this).siblings('ul').animate({ left: -($div.data('item_width') * ($div.data('current_item') - 1))}, 300 );
		$(this).siblings('.next').fadeIn();
		if ($div.data('current_item') == 1) $(this).fadeOut();
		return false;
	});
};

function sswacarouselinit($div) {
    $div.css('overflow','hidden');
    $ul = $('ul', $div);
	$div.height($('li', $ul).height()+5);
	$ul.css('position','absolute');

	$div.data('item_width', $('li', $ul).width() + $('li', $ul).css('margin-right').replace('px','')*1 + $('li', $ul).css('margin-left').replace('px','')*1 );
	$div.data('item_margin', $('li', $ul).css('margin-right').replace('px','')*1 + $('li', $ul).css('margin-left').replace('px','')*1 );
	$div.data('items_count',$('li', $ul).length);
	$div.data('current_item',1);
    
    var items_visible = Math.floor(($div.parent().width() + $div.data('item_margin'))/$div.data('item_width'));
    console.log($div.parent().width(), $div.data('item_margin'), $div.data('item_width'), items_visible);
    
    $div.width( items_visible * $div.data('item_width') - $div.data('item_margin'));
    $div.data('items_per_screen', Math.ceil( ($div.width() + $div.data('item_margin') ) / $div.data('item_width')) );
   
    $ul.width($div.data('items_count') * $div.data('item_width'));
    
    if ($div.data('items_count') <= $div.data('items_per_screen')) {
        $('.next', $div).hide();
    } else {
        $('.next', $div).fadeIn();
    }
    
}



/* Scorrimento banner rettangolo medio dentro a ascensore -- obsoleto */
/*
$.fn.followTo = function () {
    var $this = this,
        $window = $(window);

    $window.scroll(function (e) {
        pos = $this.parent().offset().top;
        max = $this.parent().height() - $this.height();
        
        if ($window.scrollTop() > pos-10 && $window.scrollTop() < (pos+max)) {
            $this.css({
                position: 'fixed',
                top: 10
            });
        } else if ($window.scrollTop() > pos-10 && $window.scrollTop() > (pos+max)) {
            $this.css({
                position: 'relative',
                top: max+10
            });
            console.log(max);
        } else {
            $this.css({
                position: 'relative',
                top: 0
            });
        }
    });
};


 $(window).load(function() { 

    $('.bannerRight--fixedHeight').each(function() {
    
        var top = $(this).offset().top
        var diff = $(this).height() - $(this).children('.banner-wrap').height();
        
        if ( $(this).height() - diff < 10 ) {
            $(this).css({ height: '10px'});
        }

        if (diff > 2) {
        
            $(this).children('.banner-wrap').followTo();
            
        }
        
    });

});
*/

/* Scorrimento banner rettangolo medio dentro a ascensore */
$.fn.bannerLift = function () {
    var $this = this;
	var $window = $(window);
	var pos = $this.parent().offset().top;
	var max = $this.parent().height() - $this.height();
	var jump = $this.parent().data('jump');
	var thetop = 10;

	if (jump && $window.scrollTop() < jump[0] && $window.scrollTop() + $this.height() + 10 > jump[0]) {
		$this.css({
			position: 'relative',
			top: jump[0] - $this.height() - $this.parent().offset().top
		});	
		
	} else if (jump && $window.scrollTop() > jump[0] && $window.scrollTop() < jump[1] && $window.scrollTop() < (pos+max)) {
	
		$this.css({
			position: 'relative',
			top: jump[1] - $this.parent().offset().top
		});	

	} else if ($window.scrollTop() > pos-10 && $window.scrollTop() < (pos+max)) {
		$this.css({
			position: 'fixed',
			top: thetop
		});
	} else if ($window.scrollTop() > pos-10 && $window.scrollTop() > (pos+max)) {
		$this.css({
			position: 'relative',
			top: max + 10
		});
		console.log(max);
	} else {
		$this.css({
			position: 'relative',
			top: 0
		});
	}
}

$.fn.installLift = function (sidebar) {
	
	$parent = this.parent();
	$parent.css('position','relative');
	var $tube = false;
	var $wall = false;
	var $lift = false;

	if (!this.data('liftphid')) {
		var liftid = Math.floor(Math.random() * 1000);
		
		$wall = this.clone();
		$wall.html('<br/>');
		$wall.attr('data-liftphid',liftid);
		this.before($wall);
		
		this.attr('class','banner-lift-tube');
		this.css('position','absolute');
		this.attr('data-liftid', liftid);
		
		$tube = this;
	} else {
		$tube = $('[data-liftid='+this.data('liftphid')+']').first();
		$wall = this;
	}

	$tube.width($wall.width());
	$tube.height($wall.height());
	$tube.offset($wall.offset());
	$lift = $tube.children('.banner-wrap').first();
	
	var diff = $wall.height() - $lift.height();
	
	if ( $lift.height() < 10 ) {
		$wall.css({ height: '10px'});
	}
	
	else if (diff > 2) {

		var jump = false;
		$sb = $(sidebar);
		if ($sb.length) jump = [ $sb.offset().top, $sb.offset().top + $sb.height() ];
	
		var max = $parent.height() - 40;
		if (jump[1] > $parent.offset().top + max - $lift.height()) {
			max = jump[0] - $parent.offset().top - 20;
			jump = false;
		}
	
		$tube.css('top', $wall.offset().top - $parent.offset().top);
		$tube.css('left', $wall.offset().left - $parent.offset().left);
		$tube.css('height',max);
		$tube.data('jump', jump);
		
		$(window).scroll(function (e) {
			$lift.bannerLift();
		});
		$lift.bannerLift();
	}
     
}

$(window).load(function() { 
	$('.bannerRight--fixedHeight').installLift('.sidebar');
});

$(window).resize(function() { 
	$('.bannerRight--fixedHeight').installLift('.sidebar');
});

/* FINE Ascensore */


$(document).ready(function() {
	$(document).click(function(){
		$(".sottomenu-social, .sottomenu-utente").fadeOut("swing");
   });

	$(".utente-icon, .social-icon").click(function(e){
		e.stopPropagation(); 
	});
});




/* verifica numero trailer e nasconde pulsante .clickme-trailer se numero è 1   */
$(document).ready(function() {    
    if ( $('ul.elenco-foto li').length > 2 ) {
        
        $('.clickme-trailer').css('font-weight', 'normal');
    } else {
        $('.clickme-trailer').css('display', 'none');
        $('.modale-video .bannerRight').css('top', '68px');
        $('.modale-video .section-md .content .tag-side .img-nav').css('margin-bottom', '230px');
        $('.modale-video .social-tool').css('top', '490px');
    }
});

/* verifica numero foto e nasconde pulsante .clickme-trailer se numero è 1   */
$(document).ready(function() {    
    if ( $('ul.elenco-foto li').length > 2 ) {
        
        $('.clickme').css('font-weight', 'normal');
    } else {
        $('.clickme, .foto nav a, .img-nav a, .num-foto').css('display', 'none');
        $('.modale-foto .bannerRight').css('top', '68px');
        $('.section-md .content .photo-description .img-nav').css('margin-bottom', '230px');
        $('.modale-foto .social-tool').css('margin-top', '-215px');
       
    }
    
});


$(document).ready(function() {  
    if ($(".item.slide-box.slide-foto-gallery .in-evidenza a header h1").length > 0){
        $(".item.slide-box.slide-foto-gallery .in-evidenza a figure .play").addClass("no-big-title");
    }
});

function base64_decode(data) {
  //  discuss at: http://phpjs.org/functions/base64_decode/
  // original by: Tyler Akins (http://rumkin.com)
  // improved by: Thunder.m
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //    input by: Aman Gupta
  //    input by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Onno Marsman
  // bugfixed by: Pellentesque Malesuada
  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //   example 1: base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');
  //   returns 1: 'Kevin van Zonneveld'
  //   example 2: base64_decode('YQ===');
  //   returns 2: 'a'

  var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
    ac = 0,
    dec = '',
    tmp_arr = [];

  if (!data) {
    return data;
  }

  data += '';

  do { // unpack four hexets into three octets using index points in b64
    h1 = b64.indexOf(data.charAt(i++));
    h2 = b64.indexOf(data.charAt(i++));
    h3 = b64.indexOf(data.charAt(i++));
    h4 = b64.indexOf(data.charAt(i++));

    bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

    o1 = bits >> 16 & 0xff;
    o2 = bits >> 8 & 0xff;
    o3 = bits & 0xff;

    if (h3 == 64) {
      tmp_arr[ac++] = String.fromCharCode(o1);
    } else if (h4 == 64) {
      tmp_arr[ac++] = String.fromCharCode(o1, o2);
    } else {
      tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
    }
  } while (i < data.length);

  dec = tmp_arr.join('');

  return dec.replace(/\0+$/, '');
}