
// Get House ID from current URL
var currentpath = window.location.href;
var currentpath_split = currentpath.split('/');
var currentpath_last = currentpath_split[currentpath_split.length - 1];

// Bieding website link
var sw24_api;

// Variables
var window_button;
var bid_block;
var object_date;
var agency_id;
var agency_obj_id;
var object_color;
var object_btn_color;
var fetch_obj;
var fetch_agency;
var bgcolor;
var agency;
var bid_info;
var bid_info_formatted;

//CSS variables for dark mode
function activateDarkMode(object_color_var, object_btn_color_var) {
  const rootElement = document.querySelector(':root')
  const darkTheme = {
    '--background-gradient-1': '#1F252C',
    '--background-gradient-2': '#262d34',
    '--label-color': '#bcbcbc',
    '--value-color': '#FFFFFF',
    '--help-btn-background': '#181d23',
    '--help-btn-background-hover': '#0e1115',
    '--help-btn-color': '#e5e7eb',
    '--bid-btn-boxshadow': '0px 10px 10px 0 rgba(0,0,0,0.25)',
    '--bid-btn-boxshadow-hover': '0px 15px 15px 0' + hexToRgbA(object_btn_color_var),
    '--venster-btn-boxshadow': '0px 10px 10px 0 rgba(0,0,0,0.25)',
    '--tooltip-bgcolor': '#1F252C transparent transparent transparent',
    '--tooltip-color': '#FFFFFF'
  }
  for(k in darkTheme) {
    rootElement.style.setProperty(k, darkTheme[k])
  }
}

//CSS variables for light mode
function activateLightMode(object_color_var, object_btn_color_var, fontcolor3) {
  const rootElement = document.querySelector(':root')
  const lightTheme = {
    '--background-gradient-1': '#EFEFEF',
    '--background-gradient-2': '#FFFFFF',
    '--label-color': '#111111',
    '--value-color': fontcolor3,
    '--help-btn-background': '#e1e1e1',
    '--help-btn-background-hover': '#cbcbcb',
    '--help-btn-color': '#333333',
    '--bid-btn-boxshadow': '0px 10px 10px 0 ' + hexToRgbA(object_btn_color_var),
    '--bid-btn-boxshadow-hover': '0px 15px 15px 0 ' + hexToRgbA(object_btn_color_var),
    '--venster-btn-boxshadow': '0px 10px 10px 0 ' + hexToRgbA(object_color_var),
    '--tooltip-bgcolor': '#EFEFEF transparent transparent transparent',
    '--tooltip-color': '#181d23'
  }
  for(k in lightTheme) {
    rootElement.style.setProperty(k, lightTheme[k])
  }
}

// Sets a color scheme for the website.
// If browser supports "prefers-color-scheme" it will respect the setting for light or dark mode
// otherwise it will set a dark theme during night time
function setColorScheme() {
    console.log('set color scheme');
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
    const isLightMode = window.matchMedia("(prefers-color-scheme: light)").matches
    const isNotSpecified = window.matchMedia("(prefers-color-scheme: no-preference)").matches
    const hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified;
    
    var contrastRatio = 2.5;
    
    const color1rgb = hexToRgb('#FFFFFF');
    const color2rgb = hexToRgb(object_btn_color);
    const color3rgb = hexToRgb(object_color);
                    
    const color1luminance = luminance(color1rgb.r, color1rgb.g, color1rgb.b);
    const color2luminance = luminance(color2rgb.r, color2rgb.g, color2rgb.b);
    const color3luminance = luminance(color3rgb.r, color3rgb.g, color3rgb.b);
                    
    const ratio = color1luminance > color2luminance 
        ? ((color2luminance + 0.05) / (color1luminance + 0.05))
        : ((color1luminance + 0.05) / (color2luminance + 0.05));
        
    const ratio2 = color1luminance > color3luminance 
        ? ((color3luminance + 0.05) / (color1luminance + 0.05))
        : ((color1luminance + 0.05) / (color3luminance + 0.05));
        
    var fontcolor = ratio < 1/contrastRatio ? '#FFFFFF' : '#181d23';
    var fontcolor2 = ratio2 < 1/contrastRatio ? '#FFFFFF' : '#181d23';
    var fontcolor3 = ratio2 < 1/contrastRatio ? object_color : '#181d23';
    
    console.log(fontcolor3);

    window.matchMedia("(prefers-color-scheme: dark)").addListener(e => e.matches && activateDarkMode(object_color, object_btn_color))
    window.matchMedia("(prefers-color-scheme: light)").addListener(e => e.matches && activateLightMode(object_color, object_btn_color, fontcolor3))

//   if(isDarkMode) activateDarkMode(object_color_var, object_btn_color_var)
//   if(isLightMode) activateLightMode(object_color_var, object_btn_color_var)
//   if(isNotSpecified || hasNoSupport) {
//     console.log('You specified no preference for a color scheme or your browser does not support it. I schedule dark mode during night time.')
//     now = new Date();
//     hour = now.getHours();
//     if (hour < 4 || hour >= 16) {
//       activateDarkMode(object_color_var, object_btn_color_var);
//     }
//   }

    var now = new Date();
    var hour = now.getHours();
    
    // if it's evening use dark mode
    if (hour < 9 || hour >= 20) {
        activateDarkMode(object_color, object_btn_color);
    } else {
        activateLightMode(object_color, object_btn_color, fontcolor3)
    }
  document.head.insertAdjacentHTML("beforeend", setStyling(object_color, object_btn_color, fontcolor, fontcolor2));
}

// Get luminance from RGB
function luminance(r, g, b) {
    var a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928
            ? v / 12.92
            : Math.pow( (v + 0.055) / 1.055, 2.4 );
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

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

// function to convert HEX to RGB
function hexToRgb(hex) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// function to append styling to head
function setStyling(setcolor, bgcolor, fontcolor, fontcolor2) {
    console.log('set styling');
    return `
    <style class="bieding_widget_stylesheet">
        .tekst-title {color:yellow;}
        .bied_balk {
            position: fixed;
            bottom: 20px;
            left: 0;
            height: 110px;
            width: 100%;
            z-index: 9999;
            opacity: 1;
            padding: 0 20px;
            filter: drop-shadow(0px 10px 10px rgb(0 0 0 / 15%));
            transition: all 1s cubic-bezier(0.5, 0, 0.5, 1);
        }
        
        .bied_balk.expand_window {height: 600px;}
        .bied_balk.foldedup {transform: translateY(130px);}
        .bied_balk.expand_window.foldedup {transform: translateY(620px);}
        
        .bied_container {
            display: grid;
            grid-template-columns: 100px auto auto;
            justify-content: space-between;
            align-items: center;
            height: 0%;
            width: 100%;
            background: linear-gradient(0deg, var(--background-gradient-1), var(--background-gradient-2));
            padding: 0px 150px;
            border-radius: 10px 10px 20px 20px;
            animation-name: heightslide;
            animation-duration: 1s;
            animation-delay: 1s;
            animation-iteration-count: 1;
            animation-timing-function: ease-in-out;
            animation-fill-mode: forwards;
            transition: all .5s ease;
        }
        
        .bied_info {
            display: flex;
            gap: 25px;
            grid-column: 2;
            grid-row: 1;
            align-self: flex-start;
            height: 100%;
            justify-content: space-evenly;
        }
        
        .bied_info,
        .bied_action {
            opacity: 0;
            animation-name: fadeIn;
            animation-duration: 1s;
            animation-iteration-count: 1;
            animation-timing-function: ease-in-out;
            animation-delay: 2s;
            animation-fill-mode: forwards;
        }
        
        .bied_datum {
            display: flex;
            flex-direction:row;
            gap: 20px;
            margin-right: 20px;
        }
        
        .bied_startprijs,
        .bied_datum_start,
        .bied_datum_end {
            display: flex;
            flex-direction: row;
            align-items: center;
        }
        
        .bied_venster_btn {
            position: relative;
            height: 100px;
            width: 100px;
            border-radius: 100%;
            margin-top: 0px;
            background: linear-gradient(45deg, ${getColor(setcolor)}, ${getMuchLighterColor(setcolor)});
            box-shadow: var(--venster-btn-boxshadow);
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
            
            animation-fill-mode: forwards;
            transition: all 1s ease;
        }
        
        .bied_balk.expand_window .bied_venster_btn {margin-bottom: 70px;}
        
        .bied_venster_btn svg {
            transform: scale(1.5);
            transition: transform .5s ease;
            fill: ${fontcolor2}!important;
        }
        
        .bied_venster_btn:hover .bied_venster_btn_svg {transform: scale(1.75);}
        
        .bid_tooltiptext {
            visibility: hidden;
            width: 120px;
            font-size: 11pt;
            font-weight: 400;
            background: linear-gradient(0deg, var(--background-gradient-1), var(--background-gradient-2));
            color: var(--tooltip-color);
            text-align: center;
            border-radius: 6px;
            padding: 5px 0;
            position: absolute;
            z-index: 1;
            bottom: 125%;
            left: 50%;
            margin-left: -60px;
            opacity: 0;
            transition: opacity 0.3s;
        }

        .bid_tooltiptext::after {
            content: "";
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: var(--tooltip-bgcolor);
        }

        @media (hover: hover) {
            .bied_venster_btn:hover .bid_tooltiptext,
            .bied_action_info:hover .bid_tooltiptext, 
            .bied_action_bid:hover .bid_tooltiptext {
                visibility: visible;
                opacity: 1;
            }
        }
        
        .bied_startprijs svg,
        .bied_datum svg {
            fill: #bcbcbc!important;
        }
        
        .bied_startprijs_label {
            font-size: 1.2em;
            font-weight: bold;
            color: var(--label-color);
        }
        
        .bied_startprijs_value {
            color: var(--value-color);
            font-size: 2em;
        }
        
        .bied_datum_value {
            font-style: italic;
            color: var(--value-color);
        }
        
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
            color: var(--label-color);
        }
        
        .bied_datum_start_value,
        .bied_datum_end_value {
            color: var(--label-color);
        }
        
        .bied_icon {
            border-right: 2px solid rgb(0 0 0 / 5%);
            padding-right: 20px;
            margin-right: 20px;
        }
        
        .bied_action {
            grid-column: 3;
            grid-row: 1;
            transition: all .5s ease;
            display: flex;
            gap:20px;
        }
        
        .bied_action_bid {
            color: ${fontcolor};
            background: ${getColor(bgcolor)};
            box-shadow: var(--bid-btn-boxshadow);
            transition: all .5s ease;
        }
        
        .bied_action_info {
            color: var(--help-btn-color)!important;
            background: var(--help-btn-background);
            transition: all .25s ease;
        }
        
        .bied_action a {
            padding: 10px 40px;
            border-radius: 10px;
            font-weight: bold;
            position: relative;
        }
        
        .bied_action_bid:hover {
            background: ${getLighterColor(bgcolor)};
            box-shadow: var(--bid-btn-boxshadow-hover);
            color: ${fontcolor};
            text-decoration: none;
            transform: translateY(-5px);
            transition: all 1s ease;
        }
        
        .bied_action_info:hover {
            color: var(--help-btn-color)!important;
            text-decoration: none;
            background: var(--help-btn-background-hover);
        }
        
        .bied_detail {
            grid-column: 1 / 3;
            grid-row: 2;
            background: rgba(0,0,0,0.05);
            color: white;
            padding: 20px;
            border-radius: 20px;
            height: 0;
            opacity:0;
            overflow:scroll;
            transition: all 1s ease;
        }
        
        .bied_balk.expand_window .bied_detail {opacity:1;height: 350px;}
        
        .bied_detail span {
            color: var(--label-color);
            white-space: pre-wrap;
        }
        
        
        
        /**************/
        /**************/
        /* For mobile */
        /**************/
        /**************/
        
        
        
        
        @media (max-width: 768px) {
            .bied_balk {height: 200px;}
            
            .bied_container {
                grid-template-columns: 100px auto;
                padding: 0px 10px;
                animation-name: heightslideMobile;
            }
            
            .bied_info {
                gap: 0;
                flex-direction: column;
                justify-content: space-between;
                padding: 0 20px 20px 20px;
                align-items: start;
            }
            
            .bied_datum {
                flex-direction: column;
                gap:0px;
                margin-right: 0;
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
                margin-bottom: 10px;
                margin-top: 70px;
                flex-direction: column;
                gap: 10px;
            }
            
            .bied_icon {
                padding-right: 10px;
                margin-right: 10px;
            }
            
            .bied_action a {padding: 10px 30px;}
            
            .bied_balk.foldedup {transform: translateY(220px);}
            
            .bied_venster_btn {
                margin-top: -275px;
                animation-name: fadeInAnimationMobile;
            }
            
            .bied_balk.expand_window .bied_venster_btn { margin-bottom: 30px; }
            
            @keyframes fadeInAnimationMobile {
                from {
                    margin-top: -275px;
                    opacity: 0;
                }
                to {
                    margin-top: -250px;
                    opacity: 1;
                }
            }
            
            @keyframes heightslideMobile {
                from {height: 0%;padding: 0px 10px 0px 10px;}
                to {height: 100%;padding: 20px 10px 0px 10px;}
            } 
        }
        
        
        
        
        /**************/
        /**************/
        /* For tablet */
        /**************/
        /**************/
        
        
        
        
        @media (min-width: 768px) and (max-width: 1200px) {
            .bied_balk {
                height:120px;
            }
            
            .bied_balk.foldedup {transform: translateY(140px);}
            
            .bied_container {
                padding: 0 10px;
                grid-template-columns: 100px auto auto;
            }
            
            .bied_info {
                grid-column: 2;
                flex-direction: row;
                padding: 0;
                align-items: flex-start;
                gap: 20px;
            }
            
            .bied_datum {
                flex-direction: column;
                justify-content: center;
                gap: 5px;
            }
            
            .bied_action {
                flex-direction: column;
                justify-content: center;
                align-self: start;
                gap: 5px;
                grid-column: 3;
                margin-top: 0;
            }
            
            .bied_venster_btn {
                margin-top: -215px;
                animation-name: fadeInAnimationTablet;
            }
            
            .bied_balk.expand_window .bied_venster_btn { margin-bottom: 20px; }
            
            .bied_balk.expand_window .bied_detail { height: 430px; }
            
            @keyframes fadeInAnimationTablet {
                from {
                    margin-top: -215px;
                    opacity: 0;
                }
                to {
                    margin-top: -190px;
                    opacity: 1;
                }
            }
        }      
        
        
        
        
        /***************************/
        /***************************/
        /* For extra large screens */
        /***************************/
        /***************************/
        
        
        
        
        @media (min-width: 1920px) { 
            .bied_container {
                padding: 0 500px;
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
                margin-top: -150px;
                opacity: 1;
            }
        }
        
        @keyframes fadeIn {
            from {opacity: 0;}
            to {opacity: 1;}
        }
        
        @keyframes heightslide {
            from {height: 0%;padding: 0px 150px;}
            to {height: 100%;padding: 20px 150px;}
        } 
    </style>
    `;
}

// Widget HTML object
var object_item = ( sw24_url, waarde, datum_start, datum_end, this_info) => `
<div class="bied_balk">
    <div class="bied_container">
        <div class="bied_venster_btn">
            <span class="bid_tooltiptext">Schuif venster</span>
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
            <a class="bied_action_info">
                <span class="bid_tooltiptext">Toon info</span>
                <span>info</span>
            </a>
            <a class="bied_action_bid" target="_blank" href="https://www.streetwise24.com/version-test/create__account_customer?unique_id=${sw24_url}">
                <span class="bid_tooltiptext">Ga naar bieding</span>
                <span>Bied</span>
            </a>
        </div>
        <div class="bied_detail">
            <span>${this_info}</span>
        </div>
    </div>
</div>
`;

// Widget API & appending loading function
function load_widget() {
    console.log('Load widget');
    // API request to Properties
    fetch('https://www.streetwise24.com/version-test/api/1.1/obj/properties').then(function(response) {
        return response.json();
    }).then(function(obj) {
        fetch_obj = obj.response.results;
        console.log(fetch_obj);
        console.log('Fetch properties');

        // Loop each results
        fetch_obj.forEach(function (value, index) {
            agency = value.Agency;
            var house_id = value.house_id;
            
            // if house id exist
            if(typeof house_id !== 'undefined') {
                // if house id equals URL house id
                if(house_id == currentpath_last) {
                    // set object agency id
                    agency_obj_id = agency;
                }
            }
        }); 
    }).catch(function(error) {
        console.log('API error');
        console.log(error);
    }).then(function() {
        fetch('https://www.streetwise24.com/version-test/api/1.1/obj/agency').then(function(response) {
            return response.json();
        }).then(function(agency_obj) {
            fetch_agency = agency_obj.response;
            console.log(fetch_agency);
            console.log('Fetch Agency');
            
            // Loop each results
            fetch_agency.results.forEach(function (value, index) {
                var this_id = value._id;
                var this_btn_color = value.button_color;
                var this_color = value.Color;
                var this_info = value.bids_information;
                
                console.log("Agency ID: " + this_id);
                
                // if agency id equals object agency id
                if(this_id == agency_obj_id) {
                    object_color = this_color;
                    object_btn_color = this_btn_color;
                    bid_info = this_info || 'Er is geen descriptie tekst';
                    
                    // appends stylesheet
                    setColorScheme();
                    
                }
            }); 
        }).catch(function(error) {
            console.log('API error');
            console.log(error);
        }).then(function() {
            
            console.log('Fetch loop');
            
            // Loop each results
            fetch_obj.forEach(function (value, index) {
                var house_id = value.house_id;
                var start_price = value.start_price_bid;
                var start_price_formatted = String(start_price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                var house_date_start = new Date(value.start_date_bid);
                var house_date_start_formatted = `${house_date_start.getDate()}/${house_date_start.getMonth()}/${house_date_start.getFullYear()}`;
                var house_date_end = new Date(value.end_date_bid);
                var house_date_end_formatted = `${house_date_end.getDate()}/${house_date_end.getMonth()}/${house_date_end.getFullYear()}`;
                var enable_bidding = value.bids_property;
                
                // if house_id exist
                if(typeof house_id !== 'undefined') {
                    console.log(value);
                    // if house_id equals URL house id
                    if(house_id == currentpath_last && enable_bidding) {
                        console.log('Appending widget');
                        
                        // appends widget object to body
                        document.body.insertAdjacentHTML("beforeend", object_item(agency, start_price_formatted, house_date_start_formatted, house_date_end_formatted, bid_info));
                    }
                }
            }); 
        // When everything is complete
        }).then(function() {
            window_button = document.querySelector('.bied_venster_btn');
            help_button = document.querySelector('.bied_action_info');
            window_balk = document.querySelector('.bied_balk');
            
            // Clicking the big round icon dismisses the widget
            window_button.addEventListener('click', function() {
                window_balk.classList.toggle('foldedup');
            })
            
            // Clicking the info button expands the window
            help_button.addEventListener('click', function() {
                window_balk.classList.toggle('expand_window');
            })
        })
    })
}

// initialize widget
console.log('load widget function');
load_widget();

