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
        $(".naam").removeClass("off");
        $(".naam").addClass("on");
    } else {
        $navbar.removeClass("nav-mini");
        $(".logo").removeClass("off");
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
        $('.gallerij_fotos').children('a').show();
    } else if (ourClass == 'instas') {
        $('.gallerij_fotos').children('a').show();
        $('.gallerij_fotos').children('a:not(.' + ourClass + ')').hide();
        $('.gallerij_fotos').children('a' + ourClass).show();
    } else if (ourClass == 'designs') {
        $('.gallerij_fotos').children('a').show();
        $('.gallerij_fotos').children('a:not(.' + ourClass + ')').hide();
        $('.gallerij_fotos').children('a' + ourClass).show();
    } else if (ourClass == 'logos') {
        $('.gallerij_fotos').children('a').show();
        $('.gallerij_fotos').children('a:not(.' + ourClass + ')').hide();
        $('.gallerij_fotos').children('a' + ourClass).show();
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

$(window).scroll(function() {
    if (target_home.is_on_screen()) {
        $(".nav nav a").css("color", "white");
        $(".nav nav a:nth-child(1)").css("color", "var(--sec)");
        $(".scrolldown").attr("src", "scrolldown.svg");
        document.title = "Teodor Anthony's portfolio";
    } else if (target_about.is_on_screen()) {
        $(".nav nav a").css("color", "white");
        $(".nav nav a:nth-child(2)").css("color", "var(--sec)");
        $(".scrolldown").attr("src", "scrolldown_about.svg");
        document.title = "ABOUT ME";
    } else if (target_work.is_on_screen()) {
        $(".nav nav a").css("color", "white");
        $(".nav nav a:nth-child(3)").css("color", "var(--sec)");
        $(".scrolldown").attr("src", "scrolldown_work.svg");
        document.title = "MY WORK";
    }
    if (target_contact.is_on_screen() == true) {
        $(".nav nav a").css("color", "white");
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


$('.sectie div input').on('input', function() {
    $(this).next('span').css("background", "var(--sec)");
    $(this).on('change', function() {
        if ($(this).is(':valid')) {
            $(this).css("color", "var(--third)");
            $(this).next('span').css("background", "var(--third)");
        } else {
            $(this).css("color", "var(--forth)");
            $(this).next('span').css("background", "var(--forth)");
        }
    });
});

var counter = 0;
var colors = [
	"#2ecc71",
	"#3498db",
	"#f1c40f",
	"#e74c3c",
	"hotpink"      
];

var $div = $(':root');

setInterval(function() {
	console.log("test");
    var testje = colors[(counter++)%colors.length];
    $div.get(0).style.setProperty("--sec", testje);
}, 20000);

$(document).ready(function() {
	var numall = $('.gallerij_fotos a').length;
	var numinstas = $('.gallerij_fotos .instas').length;
	var numdesigns = $('.gallerij_fotos .designs').length;
	var numlogos = $('.gallerij_fotos .logos').length;
	$("#filter .all").append("<span class='nums'>"+numall+"</span")
	$("#filter .instas").append("<span class='nums'>"+numinstas+"</span")
	$("#filter .designs").append("<span class='nums'>"+numdesigns+"</span")
	$("#filter .logos").append("<span class='nums'>"+numlogos+"</span")
})

$('.figure, .square').tilt({
	maxTilt:        20,
	perspective:    500,   // Transform perspective, the lower the more extreme the tilt gets.
	easing:         "ease",    // Easing on enter/exit.
	scale:          1.1,      // 2 = 200%, 1.5 = 150%, etc..
	speed:          1000,    // Speed of the enter/exit transition.
	transition:     true,   // Set a transition on enter/exit.
	reset:          true,   // If the tilt effect has to be reset on exit.
	glare:          true,  // Enables glare effect
	maxGlare:       .05       // From 0 - 1.
});

$(".gallerij_fotos a").hover(function() {
	$(this).children("span").css("opacity","1");
}, function() {
	$(this).children("span").css("opacity","0");
})