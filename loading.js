$(document).ready(function() {
	if (performance.navigation.type == 1) {
        $(".loading").css("display", "none");
        $(".content").css("display", "grid");
		$(".nav img").animate({opacity: 1}, 1000,);
		$(".nav, .content, .nav-mini").animate({opacity: 1}, 1000,);
    } else {
        $(".loading img, .quotes, .loading_tekst, .socials" ).animate({opacity: 1}, 4000, function() {
			$(".loading_tekst").css("animation-name", "none");
			$(".loading_tekst span:nth-child(2), .loading_tekst span:nth-child(3)").css("opacity", "1");
		  	$(".loading").delay(2000).animate({opacity: 0}, 1000, function() {
		  		$(".content").css("display", "grid");
				$(".nav img").animate({opacity: 1}, 1000,);
				$(".nav, .content, .nav-mini").animate({opacity: 1}, 1000,);
		  	});
  		});
    }
});