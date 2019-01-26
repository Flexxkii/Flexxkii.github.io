$(".linker_arrow").hover( function() {
    $(this).find("span:nth-child(1)").addClass("hover");
}, function() {
    $(this).find("span:nth-child(1)").removeClass("hover");
})

$(".rechter_arrow").hover( function() {
    $(this).find("span:nth-child(1)").addClass("hover");
}, function() {
    $(this).find("span:nth-child(1)").removeClass("hover");
})


var rechts = function() {
    var thiscontent = $(".projecten_full .displaygrid");
    var nextcontent = thiscontent.next();
    var firstcontent = $(".oned");
    if(nextcontent.is('div')) {
        thiscontent.removeClass("displaygrid");
        thiscontent.addClass("displaynone");
        nextcontent.addClass("displaygrid");
        nextcontent.removeClass("displaynone");
    } else {
        thiscontent.removeClass("displaygrid");
        thiscontent.addClass("displaynone");
        firstcontent.addClass("displaygrid");
        firstcontent.removeClass("displaynone");
    };
}

var links = function() {
    var thiscontent = $(".projecten_full .displaygrid");
    var prevcontent = thiscontent.prev();
    var lastcontent = $(".projecten_full .displaynone:last-of-type");
    if(prevcontent.is('div')) {
        thiscontent.removeClass("displaygrid");
        thiscontent.addClass("displaynone");
        prevcontent.addClass("displaygrid");
        prevcontent.removeClass("displaynone");
    } else {
        thiscontent.removeClass("displaygrid");
        thiscontent.addClass("displaynone");
        lastcontent.addClass("displaygrid");
        lastcontent.removeClass("displaynone");
    };
}

var cross = function() {
    $(".projecten_full").removeClass("showit");
    $('.gallerij_fotos img').each(function(index) {
        var that = this;
        setTimeout(function() {
            $(that).addClass('inview');
        }, 10 * index);
    });
} 

$(document).keydown(function(e) {
    if ( event.which == 39 ) {
        rechts();
    } else if (event.which == 37) {
        links();
    } else if (event.which == 27) {
        cross();
    }
});

$(".rechter_arrow").on("click", rechts);
$(".linker_arrow").on("click", links);
$(".cross").on("click", cross);


$(".one").on("click", function() {
    $(".projecten_full").addClass("showit");
    $(".content2").removeClass("displaygrid");
    $(".content2").addClass("displaynone");
    $(".oned").addClass("displaygrid");
});

$(".two").on("click", function() {
    $(".projecten_full").addClass("showit");
    $(".content2").removeClass("displaygrid");
    $(".content2").addClass("displaynone");
    $(".twod").addClass("displaygrid");
});

$(".three").on("click", function() {
    $(".projecten_full").addClass("showit");
    $(".content2").removeClass("displaygrid");
    $(".content2").addClass("displaynone");
    $(".threed").addClass("displaygrid");
});

$(".four").on("click", function() {
    $(".projecten_full").addClass("showit");
    $(".content2").removeClass("displaygrid");
    $(".content2").addClass("displaynone");
    $(".fourd").addClass("displaygrid");
});

$(".five").on("click", function() {
    $(".projecten_full").addClass("showit");
    $(".content2").removeClass("displaygrid");
    $(".content2").addClass("displaynone");
    $(".fived").addClass("displaygrid");
});

$(".six").on("click", function() {
    $(".projecten_full").addClass("showit");
    $(".content2").removeClass("displaygrid");
    $(".content2").addClass("displaynone");
    $(".sixd").addClass("displaygrid");
});


var timeoutScroll,
    $navbar = $('.nav'),
    $window = $(window);

function setOffset() {
    bannerH = $('.nav').height();
}

function navTop() {
    if ($window.scrollTop() > bannerH) {
        $navbar.addClass("nav-mini");
        $(".logo").removeClass("on");
        $(".logo").addClass("off");
        $(".logo").addClass("displaynone");
        $(".naam").removeClass("off");
        $(".naam").addClass("on");
    } else {
        $navbar.removeClass("nav-mini");
        $(".logo").removeClass("off");
        $(".logo").removeClass("displaynone");
        $(".logo").addClass("on");
        $(".naam").removeClass("on");
        $(".naam").addClass("off");
    }
}
setOffset();

$window.scroll(function() {
    clearTimeout(timeoutScroll);
    timeoutScroll = setTimeout(navTop, 10);
});

$('#filter button').click(function() {
    var ourClass = $(this).attr('class');
    if (ourClass == 'all') {
        $("#filter button").css("border-bottom", "2px solid var(--grijs)");
        $("#filter .all").css("border-bottom", "2px solid var(--sec)");
        $('.gallerij_fotos').children('div').show();
    } else if (ourClass == 'instas') {
        $("#filter button").css("border-bottom", "2px solid var(--grijs)");
        $("#filter .instas").css("border-bottom", "2px solid var(--sec)");
        $('.gallerij_fotos').children('div').show();
        $('.gallerij_fotos').children('div:not(.' + ourClass + ')').hide();
        $('.gallerij_fotos').children('div' + ourClass).show();
    } else if (ourClass == 'designs') {
        $("#filter button").css("border-bottom", "2px solid var(--grijs)");
        $("#filter .designs").css("border-bottom", "2px solid var(--sec)");
        $('.gallerij_fotos').children('div').show();
        $('.gallerij_fotos').children('div:not(.' + ourClass + ')').hide();
        $('.gallerij_fotos').children('div' + ourClass).show();
    } else if (ourClass == 'logos') {
        $("#filter button").css("border-bottom", "2px solid var(--grijs)");
        $("#filter .logos").css("border-bottom", "2px solid var(--sec)");
        $('.gallerij_fotos').children('div').show();
        $('.gallerij_fotos').children('div:not(.' + ourClass + ')').hide();
        $('.gallerij_fotos').children('div' + ourClass).show();
    }
    return false;
});

$.fn.is_on_screen = function() {
    var win = $(window);
    var viewport = {
        top: win.scrollTop(),
        left: win.scrollLeft()
    };

    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
};

var target_home = $("#home p");
var target_about = $("#about p");
var target_work = $(".gallerij_fotos");
var target_contact = $(".contact_content h2");
var $div = $(':root');

$(window).scroll(function() {
    if (target_home.is_on_screen()) {
        $(".nav nav a").css("color", "white");
        document.documentElement.style.setProperty("--sec", "#009688");
        $(".nav nav a:nth-child(1)").css("color", "var(--sec)");
        $(".scrolldown").attr("src", "scrolldown.svg");
        document.title = "Teodor Anthony's portfolio";
    } else if (target_about.is_on_screen()) {
        $(".nav nav a").css("color", "white");
        document.documentElement.style.setProperty("--sec", "#F44336");
        $('.gallerij_fotos img').each(function(index) {
            var that = this;
            setTimeout(function() {
                $(that).removeClass('inview');
            }, 10 * index);
        });
        $(".nav nav a:nth-child(2)").css("color", "var(--sec)");
        $(".scrolldown").attr("src", "scrolldown_about.svg");
        document.title = "ABOUT ME";
    } else if (target_work.is_on_screen()) {
        $(".work_header").css("top", "-13px");
        $(".nav nav a").css("color", "white");
        document.documentElement.style.setProperty("--sec", "#e91e63");
        $('.gallerij_fotos img').each(function(index) {
            var that = this;
            setTimeout(function() {
                $(that).addClass('inview');
            }, 10 * index);
        });
        $('.sectie').each(function(index) {
            var that = this;
            setTimeout(function() {
                $(that).removeClass('inview');
            }, 10 * index);
        });
        $(".nav nav a:nth-child(3)").css("color", "var(--sec)");
        $(".scrolldown").attr("src", "scrolldown_work.svg");
        document.title = "MY WORK";
    }
    if (target_contact.is_on_screen() == true) {
        $(".work_header").css("top", "-65px");
        $(".nav nav a").css("color", "white");
        document.documentElement.style.setProperty("--sec", "#2196f3");
        $('.gallerij_fotos img').each(function(index) {
            var that = this;
            setTimeout(function() {
                $(that).removeClass('inview');
            }, 10 * index);
        });
        $('.sectie').each(function(index) {
            var that = this;
            setTimeout(function() {
                $(that).addClass('inview');
            }, 10 * index);
        });
        $(".nav nav a:nth-child(4)").css("color", "var(--sec)");
        $(".scrolldown").attr("src", "scrolldown_contact.svg");
        document.title = "MESSAGE ME";
    }
});

$(".gallerij_fotos img").hover(function() {
    $(".gallerij_fotos img").not(this).addClass("filter");
}, function() {
    $(".gallerij_fotos img").not(this).removeClass("filter");
});

$('a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function() {
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) {
                        return false;
                    } else {
                        $target.attr('tabindex', '-1');
                        $target.focus();
                    };
                });
            }
        }
    });
    
$(".hamburg").click(function() {
	if ($('.hamburg span:nth-child(1)')[0].style.width == "75%")
    {
    	$(".hamburg span").animate({width: "100%"}, 500,);
    } else {
    	$(".hamburg span:nth-child(1)").animate({width: "75%"}, 500,);
    	$(".hamburg span:nth-child(2)").animate({width: "50%"}, 500,);
    	$(".hamburg span:nth-child(3)").animate({width: "25%"}, 500,);
    }
	$('.nav-mini nav').toggleClass("kleinenav");
});


$('.sectie div input').on('focus', function() {
    $(this).next('span').css("background", "var(--sec)");
    $(this).on('change', function() {
        if ($(this).is(':valid')) {
            $(this).css("color", "var(--third)");
            $(this).next('span').css("background", "var(--third)");
        } else {
            $(this).css("color", "var(--forth)");
            $("#submitbutton").addClass("error");
            $(this).next('span').css("background", "var(--forth)");
        }
    });
});

$(document).ready(function() {
    var numinstas = $('.gallerij_fotos .instas').length;
    var numdesigns = $('.gallerij_fotos .designs').length;
    var numlogos = $('.gallerij_fotos .logos').length;
	var numall = numinstas+numdesigns+numlogos;
	$("#filter .all").append("<span class='nums'>"+numall+"</span")
	$("#filter .instas").append("<span class='nums'>"+numinstas+"</span")
	$("#filter .designs").append("<span class='nums'>"+numdesigns+"</span")
	$("#filter .logos").append("<span class='nums'>"+numlogos+"</span")
})

$('.figure, .logo, .square, .instas img').tilt({
	maxTilt:        20,
	perspective:    500,   // Transform perspective, the lower the more extreme the tilt gets.
	easing:         "ease",    // Easing on enter/exit.
	scale:          1.1,      // 2 = 200%, 1.5 = 150%, etc..
	speed:          1000,    // Speed of the enter/exit transition.
	transition:     true,   // Set a transition on enter/exit.
	reset:          false,   // If the tilt effect has to be reset on exit.
	glare:          true,  // Enables glare effect
	maxGlare:       .05       // From 0 - 1.
});

$(".gallerij_fotos div").hover(function() {
	$(this).children("span").css("opacity","1");
}, function() {
	$(this).children("span").css("opacity","0");
})