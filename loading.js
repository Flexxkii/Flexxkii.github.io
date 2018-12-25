$(document).ready(function() {
	$(".loading img, .quotes, .loading_tekst, .socials" ).animate({opacity: 1}, 4000, function() {
		$(".loading_tekst").css("animation-name", "none");
		$(".loading_tekst span:nth-child(2)").css("opacity", "1");
	  	$(".loading").delay(2000).animate({opacity: 0}, 1000, function() {
	  		$(".content").css("display", "grid");
			$(".nav img").animate({opacity: 1}, 1000,);
			$(".nav, .content, .nav-mini").animate({opacity: 1}, 1000,);
	  	});
  	});
});