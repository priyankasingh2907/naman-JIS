/*

(function($) {
	$.fn.visible = function(partial) {
	  
		var $t            = $(this),
			$w            = $(window),
			viewTop       = $w.scrollTop(),
			viewBottom    = viewTop + $w.height(),
			_top          = $t.offset().top,
			_bottom       = _top + $t.height(),
			compareTop    = partial === true ? _bottom : _top,
			compareBottom = partial === true ? _top : _bottom;
	  
	  return ((compareBottom <= viewBottom) && (compareTop >= viewTop));  
	};
	  
  })(jQuery);
  
  var win = $(window);
  
  var allMods = $(".module");
  
  allMods.each(function(i, el) {
	var el = $(el);
	if (el.visible(true)) {
	  el.addClass("already-visible"); 
	} 
  });
  
  win.scroll(function(event) {
	
	allMods.each(function(i, el) {
	  var el = $(el);
	  if (el.visible(true)) {
		el.addClass("come-in"); 
	  } 
	});
	
});

*/

jQuery(document).ready(function(e) {


    if (_getCookie("fontSize")) {

        fontSize = _getCookie("fontSize");

    } else {

        fontSize = 67.5;
    }

    jQuery("html").css("font-size", fontSize + "%");

    function _set_font_size(fontType) {

        if (fontType == 'increase') {

            if (Math.floor(fontSize) < 75) {

                fontSize = Math.floor(fontSize) + 5;
            }
        } else if (fontType == "decrease") {
            if (Math.floor(fontSize) > 60) {
                fontSize = Math.floor(fontSize) - 4;
            }
        } else {

            fontSize = 67.5;

        }

        var thirtyDays = 1000 * 60 * 60 * 24 * 30;
        var expireDate = new Date((new Date()).valueOf() + thirtyDays);

        _setCookie("fontSize", fontSize, expireDate);

        jQuery("html").css("font-size", fontSize + "%");
    }

    // cookies	
    function _getCookie(name) {
        var arg = name + "=";
        var alen = arg.length;
        var clen = document.cookie.length;
        var i = 0;
        while (i < clen) {
            var j = i + alen;
            if (document.cookie.substring(i, j) == arg) {
                return _getCookieVal(j);
            }
            i = document.cookie.indexOf(" ", i) + 1;
            if (i == 0)
                break;
        }
        return null;
    }

    function _deleteCookie(name, path, domain) {
        if (_getCookie(name)) {
            document.cookie = name + "=" +
                ((path) ? "; path=" + path : "") +
                ((domain) ? "; domain=" + domain : "") +
                "; expires=Thu, 01-Jan-70 00:00:01 GMT";
        }
    }

    function _setCookie(name, value, expires, path, domain, secure) {
        var vurl = true;
        if (path != '' && path != undefined) {
            vurl = validUrl(path);
        }
        if (jQuery.type(name) == "string" && vurl) {
            document.cookie = name + "=" + escape(value) +
                ((expires) ? "; expires=" + expires.toGMTString() : "") +
                ((path) ? "; path=" + path : "") +
                ((domain) ? "; domain=" + domain : "") +
                ((secure) ? "; secure" : "");
        }
    }

    function _getCookieVal(offset) {
        var endstr = document.cookie.indexOf(";", offset);
        if (endstr == -1) {
            endstr = document.cookie.length;
        }
        return unescape(document.cookie.substring(offset, endstr));
    }

    jQuery('.font-increase').click(function(e) {
        e.stopPropagation();
        e.preventDefault();
        _set_font_size('increase');
    });

    jQuery('.font-normal').click(function(e) {
        e.stopPropagation();
        e.preventDefault();
        _set_font_size();
    });

    jQuery('.font-decrease').click(function(e) {
        e.stopPropagation();
        e.preventDefault();
        _set_font_size('decrease');
    });

    //fontSize increase & decrease end

    //skiptomain content start
    jQuery('.skip-content').bind('click', function(event) {
        var $anchor = jQuery(this);
        jQuery('html, body').stop().animate({
            scrollTop: jQuery($anchor.attr('href')).offset().top
        }, 800);
        event.preventDefault();
    });

    jQuery(".skip-content").click(function(e) {
        e.preventDefault();
        jQuery('#main-content').attr('tabindex', '-1');
        jQuery('#main-content').focus();
    });
    //skiptomain content end

    jQuery('.mob-menu').click(function() {
        jQuery(this).toggleClass('active');
        jQuery('.main-menu > ul').slideToggle();
        return false;
    });

    jQuery('.btn-cat').click(function() {
        jQuery(this).toggleClass('active');
        jQuery('.grid-content-outer').slideToggle();
        return false;
    });

    //footer slider start
    jQuery('.footer-carousel').owlCarousel({
        margin: 8,
        responsiveClass: true,
        nav: true,
        dots: false,
        navText: "",
        autoplay: true,
        autoplayHoverPause: true,
        loop: false,
        responsive: {
            0: {
                items: 2,
                nav: false
            },
            768: {
                items: 3,
                nav: true
            },
            992: {
                items: 4,
                nav: true
            },
            1200: {
                items: 6,
                nav: true
            }
        }
    });
    //footer slider end

    /*
    jQuery(".owl-nav").each(function(index, element) {
    	jQuery(this).find(".owl-prev").append("<span class='hide'>Previous</span>");
    	jQuery(this).find(".owl-next").append("<span class='hide'>Next</span>");
    });

    */

    jQuery('body').click(function(e) {
        jQuery('#accessibility-menu li').removeClass("mFocus")
    });

    //keyboard accessing functions start
    function addFocusClass() {

        jQuery('#accessibility-menu li').each(function(index, element) {
            jQuery(this).find('>a').focus(function(e) {
                jQuery(this).parent('li').addClass('mFocus').siblings().removeClass('mFocus');
            });
        });

        jQuery("#accessibility ul li.site-lang .lang-opt ul li:last-child a").focusout(function(e) {
            jQuery(this).parents('.site-lang').removeClass("mFocus")
        });

        jQuery('.section-directory .directory-content .dir-connect ul li .dir-meta').each(function() {
            jQuery(this).find('h5 > a').focus(function(e) {
                jQuery(this).parents('li').addClass('mFocus').siblings().removeClass('mFocus');
            });
        });

        jQuery(".section-directory .directory-content .dir-connect ul li .dir-meta.bmrk ul li:last-child a").focusout(function(e) {
            jQuery(this).parents('li').removeClass("mFocus");
        });

        document.addEventListener('keydown', function(e) {
            if (e.keyCode === 9) {
                jQuery('body').addClass('show-focus-outlines');
            }
        });

        document.addEventListener('mousedown', function(e) {
            jQuery('body').removeClass('show-focus-outlines');
        });

    }

    addFocusClass();
    //keyboard accessing functions end

    var more_block = jQuery(".search-row");

    more_block.slice(0, 10).show();

    jQuery("#loadMore").on('click', function(e) {
        e.preventDefault();

        var hidden_tour = jQuery(".search-row:hidden");

        hidden_tour.slice(0, 10).slideDown();
        if (hidden_tour.length == 0) {
            jQuery("#load").fadeOut('slow');
        }
        jQuery('html,body').animate({
            scrollTop: jQuery(this).offset().top - 400
        }, 1500);
    });

    /*var data_block = jQuery(".table-row");

    data_block.slice(0, 3).show();

    jQuery("#loadMoreData").on('click', function (e) {
        e.preventDefault();

        var data_tour = jQuery(".table-row:hidden");

        data_tour.slice(0, 3).slideDown();
        if (data_tour.length == 0) {
            jQuery("#load").fadeOut('slow');
        }
        jQuery('html,body').animate({
            scrollTop: jQuery(this).offset().top - 400
        }, 1500);
    });*/

});