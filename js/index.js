const bod = document.body,
    main = document.getElementById('main'),
    footer = document.getElementById('FTR'),
    upcase = document.getElementById('upperCase'),
    boxes = document.getElementsByClassName('box'),
    userInput = document.getElementById('userInput'),
    btnExport = document.getElementById('btnEXPORT'),
    color_template = document.getElementById('template'),
    colorContainer = document.getElementById('colorContainer');

const tg0 = document.querySelector('[tgl0]'),
    tg1 = document.querySelector('[tgl1]'),
    tg2 = document.querySelector('[tgl2]'),
    tg3 = document.querySelector('[tgl3]');

const tglAttr = (el, attr) => {
    if (el.hasAttribute(attr))
        el.removeAttribute(attr);
    else
        el.setAttribute(attr, true);
}

function toggleNav() {
    tglAttr(tg0, 'bdmar2');
    tglAttr(tg1, 'sdbrd2');
    tglAttr(tg2, 'cir2');
    tglAttr(tg3, 'sd2');
    tglAttr(main, 'mar2');
}

function toggleSticky() {
    footer.classList.toggle("sticky-footer");
    footer.classList.toggle("not-sticky");
    btnFooter.classList.toggle("btn-disabled");
}

function toggleCase() {
    let upper = document.querySelectorAll('[case-toggle]');
    upper.forEach(box => { tglAttr(box, "data-uppercase"); });
    tglAttr(upcase, 'highlight');
}

function cMode(mode) {
    let modes = document.querySelectorAll('[mode-toggle]');
    colorMode = mode;
    switch (mode) {
        case `RGB`:
            modes[0].removeAttribute("mode-active");
            modes[1].setAttribute("mode-active", true);
            modes[2].removeAttribute("mode-active");
            break;
        case `HEX`:
            modes[0].setAttribute("mode-active", true);
            modes[1].removeAttribute("mode-active");
            modes[2].removeAttribute("mode-active");
            break;
        case `HSL`:
            modes[0].removeAttribute("mode-active");
            modes[1].removeAttribute("mode-active");
            modes[2].setAttribute("mode-active", true);
            break;
    }
    return colorMode;
}

function mode(id) {
    // NOTE: USES cNum from submit()
    let bxid = id.replace('box', '');
    let vali = '';
    switch (colorMode) {
        case `RGB`:
            let drgb = boxes[bxid].querySelector('[data-rgb]');
            vali = drgb.innerHTML;
            break;
        case `HEX`:
            let dhex = boxes[bxid].querySelector('[data-hex]');
            vali = dhex.innerHTML;
            break;
        case `HSL`:
            let dhsl = boxes[bxid].querySelector('[data-hsl]');
            vali = dhsl.innerHTML;
            break;
    }
    return vali;
}

const boxq = (el, q) => el.querySelector(q),
    setHide = function(one, two, thr) {
        one.removeAttribute("data-hide");
        two.setAttribute("data-hide", true);
        thr.setAttribute("data-hide", true);
    }

function rgbMode() {
    for (i = 0; i < boxes.length; i++) setHide(boxq(boxes[i], '[data-rgb]'), boxq(boxes[i], '[data-hex]'), boxq(boxes[i], '[data-hsl]'));
    cMode(`RGB`);
}

function hexMode() {
    for (i = 0; i < boxes.length; i++) setHide(boxq(boxes[i], '[data-hex]'), boxq(boxes[i], '[data-hsl]'), boxq(boxes[i], '[data-rgb]'));
    cMode(`HEX`);
}

function hslMode() {
    for (i = 0; i < boxes.length; i++) setHide(boxq(boxes[i], '[data-hsl]'), boxq(boxes[i], '[data-rgb]'), boxq(boxes[i], '[data-hex]'));
    cMode(`HSL`);
}

// --------------------------------------------------------------------- BUTTONS 
let dataArray = len = newList = '',
    upperCase = false;

const clearAll = () => userInput.value = colorContainer.innerHTML = '';

// -------------------------------------------------------------- SORT
function srt(data) {
    data = (typeof data === 'string') ? data.split('\n') : data;
    let unique = {};
    data.forEach(function(i) { if (!unique[i]) unique[i] = true; });
    data = Object.keys(unique).sort();
    return data.join(`\n`).trim();
}

function sortAll() {
    userInput.value = srt(userInput.value);
    submit();
}

// -------------------------------------------------------------- EXPORT
function download(filename, text) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
document.getElementById("btnEXPORT").addEventListener("click", function() {
    if (userInput.value !== '') {
        let text = document.getElementById("userInput").value;
        let filename = "palette.txt";
        download(filename, text);
    } else {
        alert('No values!');
    }
}, false);

// ---------------------------------------------------------------------- COLORSEL 
let alerts_enabled = prefix_enabled = false;
const colorSel = str => {
    const el = document.createElement('textarea');
    el.value = (prefix_enabled) ? str.replace('#', '') : str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
    el.select();
    document.execCommand('copy');
    if (!alerts_enabled) alert(`copied "${el.value}"`);
    document.body.removeChild(el);
    if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
    }
};

// --------------------------------------------------------------------- COLORMODE 
function hexToRGB(hex) {
    hex = +`0x${hex.replace("#",'')}`;
    let r = (hex >> 16) & 255,
        g = (hex >> 8) & 255,
        b = hex & 255;
    return `rgb(${r}, ${g}, ${b})`;
}

function hexToHSL(hex) {
    hex = +`0x${hex.replace("#",'')}`;
    let r = (hex >> 16) & 255,
        g = (hex >> 8) & 255,
        b = hex & 255;
    (r /= 255), (g /= 255), (b /= 255);
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        c = cmax - cmin;
    let h = (s = l = 0);
    if (c == 0) h = 0;
    else if (cmax == r) h = ((g - b) / c) % 6;
    else if (cmax == g) h = (b - r) / c + 2;
    else h = (r - g) / c + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
    l = (cmax + cmin) / 2;
    s = c == 0 ? 0 : c / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(0);
    l = +(l * 100).toFixed(0);
    return `hsl(${h}, ${s}%, ${l}%)`;
}

function rgbToHEX(val) {
    val = val.replace('rgb', "").replace(/[()]/g, "").split(",");
    let r = parseInt(val[0], 10).toString(16),
        g = parseInt(val[1], 10).toString(16),
        b = parseInt(val[2], 10).toString(16);
    r = r.length === 1 ? `0${r}` : r;
    g = g.length === 1 ? `0${g}` : g;
    b = b.length === 1 ? `0${b}` : b;
    return `#${r}${g}${b}`;
}

function rgbToHSL(val) {
    val = val.replace('rgb', "").replace(/[()]/g, "").split(",");
    let r = val[0],
        g = val[1],
        b = val[2];
    (r /= 255), (g /= 255), (b /= 255);
    let cmax = Math.max(r, g, b),
        cmin = Math.min(r, g, b),
        c = cmax - cmin;
    let h = s = l = 0;
    switch (cmax) {
        case r:
            h = ((g - b) / c) % 6;
            break;
        case g:
            h = (b - r) / c + 2;
            break;
        case b:
            h = (r - g) / c + 4;
            break;
    }
    h = Math.round(h * 60);
    h = (h < 0) ? h + 360 : h;
    l = (cmax + cmin) / 2;
    s = c === 0 ? 0 : c / (1 - Math.abs(2 * l - 1));
    s *= 100;
    l *= 100;
    let result = `hsl(${h.toFixed(0)}, ${s.toFixed(0)}%, ${l.toFixed(0)}%)`;
    return result;
}

function hslToRGB(hsl) {
    hsl = hsl.replace(/%/g, "").match(/\w+/g);
    h = hsl[1];
    s = hsl[2] / 100;
    l = hsl[3] / 100;
    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;
    if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
    }
    r = Math.round(Math.abs((r + m) * 255));
    g = Math.round(Math.abs((g + m) * 255));
    b = Math.round(Math.abs((b + m) * 255));
    return `rgb(${r}, ${g}, ${b})`;
}

function hslToHEX(hsl) {
    hsl = hsl.replace(/%/g, "").match(/\w+/g);
    h = hsl[1];
    s = hsl[2] / 100;
    l = hsl[3] / 100;
    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
        m = l - c / 2,
        r = g = b = 0;
    if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
    }
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);
    if (r.length == 1) r = `0${r}`;
    if (g.length == 1) g = `0${g}`;
    if (b.length == 1) b = `0${b}`;
    return `#${r}${g}${b}`;
}

function conversions(c) {
    c = c.includes('(') ? [c.match(/\w+/g)[0].toUpperCase(), c] : ['HEX', c];
    let v0 = v1 = v2 = "";
    switch (c[0]) {
        case "RGB":
            v0 = c[1];
            v1 = rgbToHEX(c[1]); // rgbToHEX
            v2 = rgbToHSL(c[1]); // rgbToHSL
            break;
        case "HEX":
            v0 = hexToRGB(c[1]); // hexToRGB
            v1 = c[1];
            v2 = hexToHSL(c[1]); // hexToHSL
            break;
        case "HSL":
            v0 = hslToRGB(c[1]); // hslToRGB
            v1 = hslToHEX(c[1]); // hslToHEX
            v2 = c[1];
            break;
    }
    return [v0, v1, v2];
}

// ------------------------------------------------------------------------ SUBMIT 
function submit() {
    let colors = userInput.value;
    colors = colors.trim().split(`\n`);

    colorContainer.innerHTML = '';

    let boxID = 0;
    colors.forEach(color => {
        if (color !== '') {
            const temp = document.importNode(color_template.content, true);
            temp.querySelector('.box').style.backgroundColor = color;
            temp.querySelector('.box').id = `box${boxID}`;
            let cFormat = conversions(color);
            temp.querySelector('[data-rgb]').innerHTML = cFormat[0]; // RGB
            temp.querySelector('[data-hex]').innerHTML = cFormat[1]; // HEX
            temp.querySelector('[data-hsl]').innerHTML = cFormat[2]; // HSL
            colorContainer.appendChild(temp);
            boxID++;
        }
    });
}


// --------------------------------------------------------------------- DEFAULTS 
function defaultSetup() {
    const cArray = ["#2cd918", "rgb(44,217,24)", "#a8ea08", "rgb(168,234,8)", "#cfff00", "rgb(207,255,0)", "rgb(207,255,0)", "#460a18", "rgb(70,10,24)", "#350812", "rgb(53,8,18)", "#23050c", "rgb(35,5,12)", "#120206", "rgb(18,2,6)", "#523c3e", "rgb(82,60,62)", "#d5dbee", "rgb(213,219,238)", "#373642", "rgb(55,54,66)", "#27293f", "rgb(39,41,63)", "#d5aaf0", "rgb(213,170,240)", "#996699", "rgb(153,102,153)", "#330033", "rgb(51,0,51)", "#50b2a1", "rgb(80,178,161)", "#336669", "#336669", "rgb(51,102,105)", "#295749", "rgb(41,87,73)", "#a4cabc", "rgb(164,202,188)", "#ebd596", "rgb(235,213,150)", "#e79f23", "rgb(231,159,35)", "rgb(231,159,35)", "#eab364", "rgb(234,179,100)", "#b2373e", "rgb(178,55,62)", "rgb(178,55,62)", "#acdb7a", "rgb(172,219,122)", "#ffffff", "rgb(255,255,255)", "#c5d6ea", "rgb(197,214,234)", "#1c2722", "rgb(28,39,34)", "#dcca61", "#dcca61", "rgb(220,202,97)", "#fa7d08", "rgb(250,125,8)", "#d32746", "rgb(211,39,70)", "#c5d6e8", "rgb(197,214,232)", "#493c3c", "rgb(73,60,60)", "rgb(73,60,60)", "#f2db74", "rgb(242,219,116)", "#d64128", "rgb(214,65,40)", "#feacdd", "rgb(254,172,221)", "#d3a11e", "rgb(211,161,30)", "#eee16a", "rgb(238,225,106)", "#2c1d1a", "rgb(44,29,26)", "#681e21", "rgb(104,30,33)", "#be0a16", "rgb(190,10,22)", "rgb(28,97,150)", "rgb(28,97,150)", "#3d5392", "rgb(61,83,146)", "#49407e", "rgb(73,64,126)", "#4e2f76", "rgb(78,47,118)", "#521d6b", "rgb(82,29,107)", "#223344"];

    cArrayList = cArray.join('\n');
    userInput.value = cArrayList;

    hexMode();
    submit();
}
defaultSetup();
