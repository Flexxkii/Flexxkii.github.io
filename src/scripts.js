!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof module&&module.exports?module.exports=function(s,i){return void 0===i&&(i="undefined"!=typeof window?require("jquery"):require("jquery")(s)),t(i),i}:t(jQuery)}((function(t){return t.fn.tilt=function(s){const i=function(){this.ticking||(requestAnimationFrame(c.bind(this)),this.ticking=!0)},e=function(){t(this).on("mousemove",l),t(this).on("mouseenter",o),this.settings.reset&&t(this).on("mouseleave",r),this.settings.glare&&t(window).on("resize",g.bind(this))},n=function(){void 0!==this.timeout&&clearTimeout(this.timeout),t(this).css({transition:`${this.settings.speed}ms ${this.settings.easing}`}),this.settings.glare&&this.glareElement.css({transition:`opacity ${this.settings.speed}ms ${this.settings.easing}`}),this.timeout=setTimeout(()=>{t(this).css({transition:""}),this.settings.glare&&this.glareElement.css({transition:""})},this.settings.speed)},o=function(s){this.ticking=!1,t(this).css({"will-change":"transform"}),n.call(this),t(this).trigger("tilt.mouseEnter")},a=function(s){return void 0===s&&(s={pageX:t(this).offset().left+t(this).outerWidth()/2,pageY:t(this).offset().top+t(this).outerHeight()/2}),{x:s.pageX,y:s.pageY}},l=function(t){this.mousePositions=a(t),i.call(this)},r=function(){n.call(this),this.reset=!0,i.call(this),t(this).trigger("tilt.mouseLeave")},d=function(){const s=t(this).outerWidth(),i=t(this).outerHeight(),e=t(this).offset().left,n=t(this).offset().top,o=(this.mousePositions.x-e)/s,a=(this.mousePositions.y-n)/i;return{tiltX:(this.settings.maxTilt/2-o*this.settings.maxTilt).toFixed(2),tiltY:(a*this.settings.maxTilt-this.settings.maxTilt/2).toFixed(2),percentageX:100*o,percentageY:100*a,angle:Math.atan2(this.mousePositions.x-(e+s/2),-(this.mousePositions.y-(n+i/2)))*(180/Math.PI)}},c=function(){if(this.transforms=d.call(this),this.reset)return this.reset=!1,t(this).css("transform",`perspective(${this.settings.perspective}px) rotateX(0deg) rotateY(0deg)`),void(this.settings.glare&&(this.glareElement.css("transform","rotate(180deg) translate(-50%, -50%)"),this.glareElement.css("opacity","0")));t(this).css("transform",`perspective(${this.settings.perspective}px) rotateX(${"x"===this.settings.disableAxis?0:this.transforms.tiltY}deg) rotateY(${"y"===this.settings.disableAxis?0:this.transforms.tiltX}deg) scale3d(${this.settings.scale},${this.settings.scale},${this.settings.scale})`),this.settings.glare&&(this.glareElement.css("transform",`rotate(${this.transforms.angle}deg) translate(-50%, -50%)`),this.glareElement.css("opacity",`${this.transforms.percentageY*this.settings.maxGlare/100}`)),t(this).trigger("change",[this.transforms]),this.ticking=!1},h=function(){const s=this.settings.glarePrerender;if(s||t(this).append('<div class="js-tilt-glare"><div class="js-tilt-glare-inner"></div></div>'),this.glareElementWrapper=t(this).find(".js-tilt-glare"),this.glareElement=t(this).find(".js-tilt-glare-inner"),s)return;this.glareElementWrapper.css({position:"absolute",top:"0",left:"0",width:"100%",height:"100%"}).css({overflow:"hidden","pointer-events":"none"}),this.glareElement.css({position:"absolute",top:"50%",left:"50%","background-image":"linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",width:`${2*t(this).outerWidth()}`,height:`${2*t(this).outerWidth()}`,transform:"rotate(180deg) translate(-50%, -50%)","transform-origin":"0% 0%",opacity:"0"})},g=function(){this.glareElement.css({width:`${2*t(this).outerWidth()}`,height:`${2*t(this).outerWidth()}`})};return t.fn.tilt.destroy=function(){t(this).each((function(){t(this).find(".js-tilt-glare").remove(),t(this).css({"will-change":"",transform:""}),t(this).off("mousemove mouseenter mouseleave")}))},t.fn.tilt.getValues=function(){const s=[];return t(this).each((function(){this.mousePositions=a.call(this),s.push(d.call(this))})),s},t.fn.tilt.reset=function(){t(this).each((function(){this.mousePositions=a.call(this),this.settings=t(this).data("settings"),r.call(this),setTimeout(()=>{this.reset=!1},this.settings.transition)}))},this.each((function(){this.settings=t.extend({maxTilt:t(this).is("[data-tilt-max]")?t(this).data("tilt-max"):20,perspective:t(this).is("[data-tilt-perspective]")?t(this).data("tilt-perspective"):300,easing:t(this).is("[data-tilt-easing]")?t(this).data("tilt-easing"):"cubic-bezier(.03,.98,.52,.99)",scale:t(this).is("[data-tilt-scale]")?t(this).data("tilt-scale"):"1",speed:t(this).is("[data-tilt-speed]")?t(this).data("tilt-speed"):"400",transition:!t(this).is("[data-tilt-transition]")||t(this).data("tilt-transition"),disableAxis:t(this).is("[data-tilt-disable-axis]")?t(this).data("tilt-disable-axis"):null,axis:t(this).is("[data-tilt-axis]")?t(this).data("tilt-axis"):null,reset:!t(this).is("[data-tilt-reset]")||t(this).data("tilt-reset"),glare:!!t(this).is("[data-tilt-glare]")&&t(this).data("tilt-glare"),maxGlare:t(this).is("[data-tilt-maxglare]")?t(this).data("tilt-maxglare"):1},s),null!==this.settings.axis&&(console.warn("Tilt.js: the axis setting has been renamed to disableAxis. See https://github.com/gijsroge/tilt.js/pull/26 for more information"),this.settings.disableAxis=this.settings.axis),this.init=()=>{t(this).data("settings",this.settings),this.settings.glare&&h.call(this),e.call(this)},this.init()}))},t("[data-tilt]").tilt(),!0})),$(".linker_arrow").hover((function(){$(this).find("span:nth-child(1)").addClass("hover")}),(function(){$(this).find("span:nth-child(1)").removeClass("hover")})),$(".rechter_arrow").hover((function(){$(this).find("span:nth-child(1)").addClass("hover")}),(function(){$(this).find("span:nth-child(1)").removeClass("hover")})),$(".fa-times").on("click",(function(){$(".approved").addClass("reveal"),$(".policy").fadeOut(1400),setTimeout(()=>{$(".policy").remove()},1500)}));var rechts=function(){var t=$(".projecten_full .displaygrid"),s=t.next(),i=$(".oned");s.is("div")?(t.removeClass("displaygrid"),t.addClass("displaynone"),s.addClass("displaygrid"),s.removeClass("displaynone")):(t.removeClass("displaygrid"),t.addClass("displaynone"),i.addClass("displaygrid"),i.removeClass("displaynone"))},links=function(){var t=$(".projecten_full .displaygrid"),s=t.prev(),i=$(".projecten_full .displaynone:last-of-type");s.is("div")?(t.removeClass("displaygrid"),t.addClass("displaynone"),s.addClass("displaygrid"),s.removeClass("displaynone")):(t.removeClass("displaygrid"),t.addClass("displaynone"),i.addClass("displaygrid"),i.removeClass("displaynone"))},cross=function(){$(".projecten_full").removeClass("showit"),$(".gallerij_fotos img").each((function(t){var s=this;setTimeout((function(){$(s).addClass("inview")}),1*t)}))};$(document).keydown((function(t){39==event.which?rechts():37==event.which?links():27==event.which&&cross()})),$(".rechter_arrow").on("click",rechts),$(".linker_arrow").on("click",links),$(".cross").on("click",cross),$(".one").on("click",(function(){$(".projecten_full").addClass("showit"),$(".content2").removeClass("displaygrid"),$(".content2").addClass("displaynone"),$(".oned").addClass("displaygrid")})),$(".two").on("click",(function(){$(".projecten_full").addClass("showit"),$(".content2").removeClass("displaygrid"),$(".content2").addClass("displaynone"),$(".twod").addClass("displaygrid")})),$(".three").on("click",(function(){$(".projecten_full").addClass("showit"),$(".content2").removeClass("displaygrid"),$(".content2").addClass("displaynone"),$(".threed").addClass("displaygrid")})),$(".four").on("click",(function(){$(".projecten_full").addClass("showit"),$(".content2").removeClass("displaygrid"),$(".content2").addClass("displaynone"),$(".fourd").addClass("displaygrid")})),$(".five").on("click",(function(){$(".projecten_full").addClass("showit"),$(".content2").removeClass("displaygrid"),$(".content2").addClass("displaynone"),$(".fived").addClass("displaygrid")})),$(".six").on("click",(function(){$(".projecten_full").addClass("showit"),$(".content2").removeClass("displaygrid"),$(".content2").addClass("displaynone"),$(".sixd").addClass("displaygrid")}));var timeoutScroll,$navbar=$(".nav"),$window=$(window);function setOffset(){bannerH=$(".nav").height()/2}function navTop(){$window.scrollTop()>bannerH?($navbar.addClass("nav-mini"),$(".logo").removeClass("on"),$(".logo").addClass("off"),$(".logo").addClass("displaynone"),$(".naam").removeClass("off"),$(".naam").addClass("on")):($navbar.removeClass("nav-mini"),$(".logo").removeClass("off"),$(".logo").removeClass("displaynone"),$(".logo").addClass("on"),$(".naam").removeClass("on"),$(".naam").addClass("off"))}setOffset(),$window.scroll((function(){clearTimeout(timeoutScroll),timeoutScroll=setTimeout(navTop,10)})),$("#filter button").click((function(){var t=$(this).attr("class");return"all"==t?($("#filter button").css("border-bottom","2px solid var(--grijs)"),$("#filter .all").css("border-bottom","2px solid var(--sec)"),$(".gallerij_fotos").children("div").show()):"instas"==t?($("#filter button").css("border-bottom","2px solid var(--grijs)"),$("#filter .instas").css("border-bottom","2px solid var(--sec)"),$(".gallerij_fotos").children("div").show(),$(".gallerij_fotos").children("div:not(."+t+")").hide(),$(".gallerij_fotos").children("div"+t).show()):"designs"==t?($("#filter button").css("border-bottom","2px solid var(--grijs)"),$("#filter .designs").css("border-bottom","2px solid var(--sec)"),$(".gallerij_fotos").children("div").show(),$(".gallerij_fotos").children("div:not(."+t+")").hide(),$(".gallerij_fotos").children("div"+t).show()):"logos"==t&&($("#filter button").css("border-bottom","2px solid var(--grijs)"),$("#filter .logos").css("border-bottom","2px solid var(--sec)"),$(".gallerij_fotos").children("div").show(),$(".gallerij_fotos").children("div:not(."+t+")").hide(),$(".gallerij_fotos").children("div"+t).show()),!1})),$.fn.is_on_screen=function(){var t=$(window),s={top:t.scrollTop(),left:t.scrollLeft()};s.right=s.left+t.width(),s.bottom=s.top+t.height();var i=this.offset();return i.right=i.left+this.outerWidth(),i.bottom=i.top+this.outerHeight(),!(s.right<i.left||s.left>i.right||s.bottom<i.top||s.top>i.bottom)};var target_home=$("#home p"),target_about=$("#about p"),target_work=$(".gallerij_fotos"),target_contact=$(".contact_content h2"),$div=$(":root");$(window).scroll((function(){target_home.is_on_screen()?($(".nav nav a").css("color","white"),document.documentElement.style.setProperty("--sec","#009688"),$(".nav nav a:nth-child(1)").css("color","var(--sec)"),$(".scrolldown").attr("src","assets/scrolldown.svg"),document.title="Teodor Anthony's portfolio - Webdesigner"):target_about.is_on_screen()?($(".nav nav a").css("color","white"),document.documentElement.style.setProperty("--sec","#F44336"),$(".gallerij_fotos img").each((function(t){var s=this;setTimeout((function(){$(s).removeClass("inview")}),1*t)})),$(".nav nav a:nth-child(2)").css("color","var(--sec)"),$(".scrolldown").attr("src","assets/scrolldown_about.svg"),document.title="About me"):target_work.is_on_screen()&&($(".work_header").css("top","-20px"),$(".nav nav a").css("color","white"),document.documentElement.style.setProperty("--sec","#e91e63"),$(".gallerij_fotos img").each((function(t){var s=this;setTimeout((function(){$(s).addClass("inview")}),1*t)})),$(".sectie").each((function(t){var s=this;setTimeout((function(){$(s).removeClass("inview")}),1*t)})),$(".nav nav a:nth-child(3)").css("color","var(--sec)"),$(".scrolldown").attr("src","assets/scrolldown_work.svg"),document.title="My projects"),1==target_contact.is_on_screen()&&($(".work_header").css("top","-65px"),$(".nav nav a").css("color","white"),document.documentElement.style.setProperty("--sec","#2196f3"),$(".gallerij_fotos img").each((function(t){var s=this;setTimeout((function(){$(s).removeClass("inview")}),1*t)})),$(".sectie").each((function(t){var s=this;setTimeout((function(){$(s).addClass("inview")}),1*t)})),$(".nav nav a:nth-child(4)").css("color","var(--sec)"),$(".scrolldown").attr("src","assets/scrolldown_contact.svg"),document.title="Send me a message")})),$(".gallerij_fotos img").hover((function(){$(".gallerij_fotos img").not(this).addClass("filter")}),(function(){$(".gallerij_fotos img").not(this).removeClass("filter")})),$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click((function(t){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var s=$(this.hash);(s=s.length?s:$("[name="+this.hash.slice(1)+"]")).length&&(t.preventDefault(),$("html, body").animate({scrollTop:s.offset().top},1e3,(function(){var t=$(s);if(t.focus(),t.is(":focus"))return!1;t.attr("tabindex","-1"),t.focus()})))}})),$(".hamburg").click((function(){"75%"==$(".hamburg span:nth-child(1)")[0].style.width?$(".hamburg span").animate({width:"100%"},500):($(".hamburg span:nth-child(1)").animate({width:"75%"},500),$(".hamburg span:nth-child(2)").animate({width:"50%"},500),$(".hamburg span:nth-child(3)").animate({width:"25%"},500)),$(".nav-mini nav").toggleClass("kleinenav")})),$(".sectie div input").on("focus",(function(){$(this).next("span").css("background","var(--sec)"),$(this).on("change",(function(){$(this).is(":valid")?($(this).css("color","var(--third)"),$(this).next("span").css("background","var(--third)")):($(this).css("color","var(--forth)"),$("#submitbutton").addClass("error"),$(this).next("span").css("background","var(--forth)"))}))})),$(document).ready((function(){var t=$(".gallerij_fotos .instas").length,s=$(".gallerij_fotos .designs").length,i=$(".gallerij_fotos .logos").length,e=t+s+i;$("#filter .all").append("<span class='nums'>"+e+"</span"),$("#filter .instas").append("<span class='nums'>"+t+"</span"),$("#filter .designs").append("<span class='nums'>"+s+"</span"),$("#filter .logos").append("<span class='nums'>"+i+"</span")})),$(".figure, .logo, .square, .instas img").tilt({maxTilt:20,perspective:500,easing:"ease",scale:1.1,speed:1e3,transition:!0,reset:!1,glare:!0,maxGlare:.05}),$(".gallerij_fotos div").hover((function(){$(this).children("span").css("opacity","1")}),(function(){$(this).children("span").css("opacity","0")}));