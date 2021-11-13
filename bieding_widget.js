// converts HEX to HSL
function getColor(hex) {
    let color = HexToHSL(hex)
    return 'hsl(' + color.h + ', ' + color.s + '%, ' + color.l + '%)';
}

// converts HEX to HSL + 10% brightness
function getLighterColor(hex) {
    let color = HexToHSL(hex)
    var colorLighter = color.l + 10;
    return 'hsl(' + color.h + ', ' + color.s + '%, ' + colorLighter + '%)';
}

// converts HEX to HSL + 30% brightness
function getMuchLighterColor(hex) {
    let color = HexToHSL(hex)
    var colorLighter = color.l + 30;
    return 'hsl(' + color.h + ', ' + color.s + '%, ' + colorLighter + '%)';
}

// function to convert HEX to HSL
function HexToHSL(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);

    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        
        h /= 6;
    }

    s = s*100;
    s = Math.round(s);
    l = l*100;
    l = Math.round(l);
    h = Math.round(360*h);

    return {h, s, l};
}

// function to convert HEX to RGBA
function hexToRgbA(hex){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',0.25)';
    }
    throw new Error('Bad Hex');
}

// function to append styling to head
function setStyling(setcolor, bgcolor) {
    $("head").append(`
    <style class="bieding_widget_stylesheet" type="text/css">
        
.bied_balk {
    position: fixed;
    bottom: 20px;
    left: 0;
    height: 100px;
    width: 100%;
    z-index: 9999;
    opacity: 1;
    padding: 0 20px;
    filter: drop-shadow(0px 10px 10px rgb(0 0 0 / 15%));
    transition: transform .5s ease;
}

.bied_balk.foldedup {transform: translateY(110px);}

.bied_container {
    display: grid;
    grid-template-columns: 100px auto auto;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;
    background: linear-gradient(0deg, #EFEFEF, #FFFFFF);
    padding: 0 150px;
    border-radius: 5px 5px 20px 20px;
    animation-name: heightslide;
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
    transition: transform .5s ease;
}

.bied_info {
    display: flex;
    gap: 25px;
    grid-column: 2;
    grid-row: 1;
}

.bied_info,
.bied_action {
    opacity: 0;
    animation-name: fadeIn;
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-timing-function: ease-in-out;
    animation-delay: 1s;
    animation-fill-mode: forwards;
}

.bied_datum {
    display: flex;
    flex-direction:row;
    gap: 20px;
}

.bied_startprijs,
.bied_datum_start,
.bied_datum_end {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
}

.bied_venster_btn {
    height: 100px;
    width: 100px;
    border-radius: 100%;
    margin-top: 0px;
    background: linear-gradient(45deg, ${getColor(setcolor)}, ${getMuchLighterColor(setcolor)});
    box-shadow: 0px 10px 10px 0 ${hexToRgbA(setcolor)};
    display: flex;
    justify-content: center;
    align-items: center;
    grid-column: 1;
    grid-row: 1;
    cursor: pointer;
    opacity: 0;
    animation-name: fadeInAnimation;
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-timing-function: ease-in-out;
    animation-delay: 1s;
    animation-fill-mode: forwards;
    transition: transform .5s ease;
}

.bied_venster_btn svg {
    transform: scale(1.5);
    transition: transform .5s ease;
    fill: white!important;
}

.bied_venster_btn:hover .bied_venster_btn_svg {transform: scale(1.75);}

.bied_startprijs svg,
.bied_datum svg {
    fill: #bcbcbc!important;
}

.bied_startprijs_label {
    font-size: 1.2em;
    font-weight: bold;
}

.bied_startprijs_value {
    color: ${setcolor};
    font-size: 2em;
}

.bied_datum_value {font-style: italic;}

.bied_startprijs_container {
    display: flex;
    flex-direction: column;
    border-right: 2px solid rgb(0 0 0 / 5%);
    padding-right: 20px;
}

.bied_datum_start_container,
.bied_datum_end_container{
    display: flex;
    flex-direction: column;
}

.bied_datum_start_label,
.bied_datum_end_label {
    font-size: .75em;
    font-weight: bold;
}

.bied_icon {
    border-right: 2px solid rgb(0 0 0 / 5%);
    padding-right: 20px;
}

.bied_action {
    grid-column: 3;
    grid-row: 1;
    transition: all .5s ease;
}

.bied_action a {
    padding: 10px 40px;
    background: ${getColor(bgcolor)};
    border-radius: 10px;
    color: white;
    font-weight: bold;
    box-shadow: 0px 10px 10px 0 ${hexToRgbA(bgcolor)};
    transition: all .5s ease;
}

.bied_action a:hover {
    background: ${getLighterColor(bgcolor)};
    box-shadow: 0px 15px 15px 0 ${hexToRgbA(bgcolor)};
    color: white;
    text-decoration: none;
}

.bied_action:hover {
    
    transform: translateY(-5px);
    transition: all .5s ease;
}




/**************/
/**************/
/* For mobile */
/**************/
/**************/




@media (max-width: 576px) {
    .bied_balk {height: 200px;}
    
    .bied_container {
        grid-template-columns: 100px auto;
        padding: 0 10px;
    }
    
    .bied_info {
        gap: 0;
        flex-direction: column;
    }
    
    .bied_datum {
        flex-direction: column;
        gap:0px;
    }
    
    .bied_startprijs_container {
        font-size: .8em;
        border-right: none;
        padding-right: 0;
    }
    
    .bied_action {
        grid-column: 1;
        grid-row: 1;
        align-self: end;
        margin-bottom: 20px;
    }
    
    .bied_action a {padding: 10px 30px;}
    
    .bied_balk.foldedup {transform: translateY(215px);}
    
    .bied_venster_btn {
        margin-top: -250px;
        animation-name: fadeInAnimationMobile;
    }
    
    @keyframes fadeInAnimationMobile {
        from {
            margin-top: -250px;
            opacity: 0;
        }
        to {
            margin-top: -175px;
            opacity: 1;
        }
    }
}




/**************/
/**************/
/*  Animatie  */
/**************/
/**************/



@keyframes fadeInAnimation {
    from {
        margin-top: 0px;
        opacity: 0;
    }
    to {
        margin-top: -100px;
        opacity: 1;
    }
}

@keyframes fadeIn {
    from {opacity: 0;}
    to {opacity: 1;}
}

@keyframes heightslide {
    from {height: 0%;}
    to {height: 100%;}
} 
        
    </style>
    `);
}

// Get House ID from current URL
var currentpath = window.location.href;
var currentpath_split = currentpath.split('/');
var currentpath_last = currentpath_split[currentpath_split.length - 1];

// Bieding website link
var sw24_api = 'https://www.streetwise24.com/version-test/customer_dashboard';

// Variables
var startprice_el = $('.bied_startprijs_value');
var bid_btn = $('.bied_action a');
var bid_block = $('.bied_balk');
var object_date;
var agency_id;
var agency_obj_id;
var object_color;
var object_btn_color;

// Widget HTML object
var object_item = ( sw24_url, waarde, datum_start, datum_end ) => `
<div class="bied_balk">
    <div class="bied_container">
        <div class="bied_venster_btn">
            <svg class="bied_venster_btn_svg" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30" style=" fill:#000000;">    <path d="M 15.980469 1.9902344 A 1.0001 1.0001 0 0 0 15.292969 2.2929688 L 9.2929688 8.2929688 A 1.0001 1.0001 0 1 0 10.707031 9.7070312 L 16.707031 3.7070312 A 1.0001 1.0001 0 0 0 15.980469 1.9902344 z M 18 5 A 1 1 0 0 0 17.287109 5.2988281 L 12.328125 10.261719 A 1 1 0 0 0 12 11 A 1 1 0 0 0 12.355469 11.765625 L 18.285156 17.699219 A 1 1 0 0 0 19 18 A 1 1 0 0 0 19.708984 17.705078 L 24.697266 12.716797 A 1 1 0 0 0 25 12 A 1 1 0 0 0 24.701172 11.287109 L 18.716797 5.3027344 A 1 1 0 0 0 18.705078 5.2910156 A 1 1 0 0 0 18 5 z M 26.980469 12.990234 A 1.0001 1.0001 0 0 0 26.292969 13.292969 L 20.292969 19.292969 A 1.0001 1.0001 0 1 0 21.707031 20.707031 L 27.707031 14.707031 A 1.0001 1.0001 0 0 0 26.980469 12.990234 z M 13.292969 15.292969 L 3.7714844 23.423828 A 2 2 0 0 0 3 25 A 2 2 0 0 0 5 27 A 2 2 0 0 0 6.5546875 26.257812 A 2 2 0 0 0 6.5644531 26.246094 L 6.5664062 26.244141 L 14.707031 16.707031 L 13.292969 15.292969 z"></path></svg>
        </div>
        <div class="bied_info">
            <div class="bied_startprijs">
                <div class="bied_icon">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24" style=" fill:#000000;"> <path d="M16.1464844 14.2618084l.2924805.2926741c.2827148.2838783.659668.4402313 1.0610352.4402313s.7783203-.156353 1.0605469-.439743l3.9995117-4.0021544C22.84375 10.2699146 23 9.8927126 23 9.4910803s-.15625-.7788343-.4394531-1.0612478l-.2929688-.2931623c-.1953125-.1954412-.5117188-.1954412-.7070313 0l-5.4140625 5.4176397C15.9511719 13.7497511 15.9511719 14.0663671 16.1464844 14.2618084zM9.7324219 7.8435078c.0976563.0977211.2255859.1465812.3535156.1465812s.2558594-.0488601.3535156-.1465812l5.4140625-5.4176397c.1953125-.1954415.1953125-.5120568 0-.7074984l-.2924805-.2926737c-.5654297-.5677577-1.5571289-.5672691-2.121582-.0004886L9.4399414 5.427362C9.15625 5.7102633 9 6.0874658 9 6.4890981s.15625.7788343.4394531 1.0612473L9.7324219 7.8435078zM14.7324219 12.8468113c.0976563.0977211.2255859.1465816.3535156.1465816s.2558594-.0488605.3535156-.1465816l5.4140625-5.4176393c.1953125-.1954417.1953125-.5120568 0-.7074986l-3.5859375-3.5883069c-.1953125-.1954415-.5117188-.1954415-.7070313 0l-5.4140625 5.4176397c-.1953125.1954412-.1953125.5120573 0 .7074986l.7189331.719408c-3.8718872 3.3572578-8.8483887 8.1737328-10.27948 9.6057682C1.2080078 19.9618607 1 20.4641457 1 20.9986782 1 22.1024342 1.8969727 23 3 23c.5341797 0 1.0361328-.2081451 1.4140625-.5863247 1.7227173-1.723856 6.4188232-6.5902891 9.6113892-10.2743015L14.7324219 12.8468113zM20 18h-7c-1.6542969 0-3 1.3311768-3 2.9854736 0 1.1030273.8969727 2 2 2h9c1.1030273 0 2-.8969727 2-2C23 19.3311768 21.6542969 18 20 18z"></path></path> </svg>
                </div>
                <div class="bied_startprijs_container">
                    <span class="bied_startprijs_label">Startprijs:</span>
                    <span class="bied_startprijs_value">€${waarde},-</span>
                </div>
            </div>
            <div class="bied_datum">
                <div class="bied_datum_start">
                    <div class="bied_icon">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24" style=" fill:#000000;"> <path d="M 7 1 C 6.448 1 6 1.448 6 2 L 6 3 L 5 3 C 3.9 3 3 3.9 3 5 L 3 19 C 3 20.1 3.9 21 5 21 L 19 21 C 20.1 21 21 20.1 21 19 L 21 5 C 21 3.9 20.1 3 19 3 L 18 3 L 18 2 C 18 1.448 17.552 1 17 1 C 16.448 1 16 1.448 16 2 L 16 3 L 8 3 L 8 2 C 8 1.448 7.552 1 7 1 z M 5 8 L 19 8 L 19 18 C 19 18.552 18.552 19 18 19 L 6 19 C 5.448 19 5 18.552 5 18 L 5 8 z"></path></svg>
                    </div>
                    <div class="bied_datum_start_container">
                        <span class="bied_datum_start_label">Startdatum:</span>
                        <span class="bied_datum_start_value">${datum_start}</span>
                    </div>
                </div>
                <div class="bied_datum_end">
                    <div class="bied_icon">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24" style=" fill:#000000;"> <path d="M 7 1 C 6.448 1 6 1.448 6 2 L 6 3 L 5 3 C 3.9 3 3 3.9 3 5 L 3 19 C 3 20.1 3.9 21 5 21 L 19 21 C 20.1 21 21 20.1 21 19 L 21 5 C 21 3.9 20.1 3 19 3 L 18 3 L 18 2 C 18 1.448 17.552 1 17 1 C 16.448 1 16 1.448 16 2 L 16 3 L 8 3 L 8 2 C 8 1.448 7.552 1 7 1 z M 5 8 L 19 8 L 19 18 C 19 18.552 18.552 19 18 19 L 6 19 C 5.448 19 5 18.552 5 18 L 5 8 z"></path></svg>
                    </div>
                    <div class="bied_datum_end_container">
                        <span class="bied_datum_end_label">Einddatum:</span>
                        <span class="bied_datum_end_value">${datum_end}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="bied_action">
            <a target="_blank" href="${sw24_url}">Bied</a>
        </div>
    </div>
</div>
`;

// Widget loading function
function load_widget() {
    $.ajax({
        url: 'https://www.streetwise24.com/version-test/api/1.1/obj/properties',
        data: {
            contentType: "application/json",
            dataType: 'json',
        },
        type: 'GET',
        success: function (data) {
            console.log(data.response.results);
            
            $.each(data.response.results, function (value, item) {
                var house_id = this.house_id;
                // if house id exist
                if(typeof house_id !== 'undefined') {
                    // if house id equals URL house id
                    if(house_id == currentpath_last) {
                        // set object agency id
                        agency_obj_id = this.Agency;
                    }
                }
            });
            
            $.ajax({
                url: 'https://www.streetwise24.com/version-test/api/1.1/obj/agency',
                data: {
                    contentType: "application/json",
                    dataType: 'json',
                },
                type: 'GET',
                success: function (result) {
                    console.log(result.response.results);
                    
                    $.each(result.response.results, function(value, item) {
                        var this_id = this._id;
                        var this_btn_color = this.button_color;
                        var this_color = this.Color;
                        
                        // if agency id equals object agency id
                        if(this_id == agency_obj_id) {
                            object_color = this_color;
                            object_btn_color = this_btn_color;
                            // appends stylesheet
                            setStyling(object_color, object_btn_color);
                        }
                    });
                },
                complete: function(result) {
                    $.each(data.response.results, function (value, item) {
                        
                        var house_id = this.house_id;
                        var start_price = this.start_price_bid;
                        var start_price_formatted = String(start_price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                        var house_date_start = new Date(this.start_date_bid);
                        var house_date_start_formatted = `${house_date_start.getDate()}/${house_date_start.getMonth()}/${house_date_start.getFullYear()}`;
                        var house_date_end = new Date(this.end_date_bid);
                        var house_date_end_formatted = `${house_date_end.getDate()}/${house_date_end.getMonth()}/${house_date_end.getFullYear()}`;
                        var enable_bidding = this.Bids_property;
                        
                        // if house_id exist
                        if(typeof house_id !== 'undefined') {
                            // if house_id equals URL house id
                            if(house_id == currentpath_last) {
                                console.log(house_date_start_formatted);
                                console.log(house_date_end_formatted);
                                console.log(enable_bidding);
                                console.log(this.start_date_bid);
                                console.log(this.end_date_bid);
                                // appends widget object to body
                                $('body').prepend(object_item(sw24_api, start_price_formatted, house_date_start_formatted, house_date_end_formatted));
                                // $(bid_block).show();
                            }
                        }
                    });
                    
                    // Clicking the big round icon dismisses the widget
                    $('.bied_venster_btn').on('click', function() {
                        $('.bied_balk').toggleClass('foldedup');
                    });
                }
            });
        }
    });
}

// Load the widget when the document has been loaded, for performance
document.addEventListener("DOMContentLoaded",function(){
    console.log('document ready');
    load_widget(); 
});