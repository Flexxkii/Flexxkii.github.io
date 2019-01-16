$(".linker_arrow").hover( function() {
    $(this).find("span:nth-child(1)").addClass("hover");
    $(this).find("span:nth-child(2)").addClass("hover_text");
}, function() {
    $(this).find("span:nth-child(1)").removeClass("hover");
    $(this).find("span:nth-child(2)").removeClass("hover_text");
})