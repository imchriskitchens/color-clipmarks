const d = document,
    bod = d.body,
    gid = (id) => d.getElementById(id),
    gtn = (id) => d.getElementsByTagName(id),
    gcn = (id) => d.getElementsByClassName(id),
    tglClass = (el, cls) => el.classList.toggle(cls),
    qsa = (qry) => d.querySelectorAll(qry),
    title = gid('cclm-title'),
    main = gid('main'),
    btns = gtn('button'),
    boxes = gcn('box'),
    colorLabel = gid('colorLabel'),
    colorLabelDiv = gid('colorLabelDiv'),
    userInput = gid('userInput'),
    colorContainer = gid('colorContainer'),
    upcase = gid('upperCase'),
    menu = gid("btnMENU"),
    sd = gid("mySidebar"),
    sdbr = gid("sideBorder"),
    cir = gid("circleTab"),
    footer = gid('FTR'),
    fragment = gid('template'),
    btnFooter = gid('btnFTR'),
    btnHex = gid('btnHEX'),
    btnRgb = gid('btnRGB'),
    btnHsl = gid('btnHSL'),
    btnSort = gid('btnSORT'),
    btnSubmit = gid('btnSUBMIT'),
    btnSelect = gid('btnSELECT'),
    btnClear = gid('btnCLEAR'),
    btnExport = gid('btnEXPORT');

const tg0 = d.querySelector('[tgl0]'),
    tg1 = d.querySelector('[tgl1]'),
    tg2 = d.querySelector('[tgl2]'),
    tg3 = d.querySelector('[tgl3]'),
    tg4 = qsa('[tgl4]');


const tglAttr = function(el, attr) {
    if (el.hasAttribute(attr)) {
        el.removeAttribute(attr);
    } else {
        el.setAttribute(attr, true);
    }
}

function toggleNav() {
    tglAttr(tg0, 'bdmar2');
    tglAttr(tg1, 'sdbr2');
    tglAttr(tg2, 'cir2');
    tglAttr(tg3, 'sd2');
    tglAttr(main, 'mar2');
    tglAttr(title, 'mar2');
}

function ccRGB(rgb) {
    let rgbVal = rgb.replace('rgb(', '').replace(')', '').split(',');
    let r = rgbVal[0];
    let g = rgbVal[1];
    let b = rgbVal[2];
    let rec709 = r * 0.2126 + g * 0.7152 + b * 0.0722;
    let result = rec709 >= 128 ? "black" : "white";
    return result;
}

function submit() {
    hexMode();
    let data = userInput.value;
    let colors = data.split(`\n`);
    let cNum = 0;
    colorContainer.innerHTML = '';
    colors.forEach(color => {
        const instance = d.importNode(fragment.content, true);
        instance.querySelector('.box').style.backgroundColor = color;
        let cinfo = instance.querySelectorAll('.cinfo');
        // dynamic font color based on background 
        // cinfo.forEach(info => { info.style.color = ccRGB(hexToRGB(color)) });
        instance.querySelector('.box').id = `box${cNum}`;
        instance.querySelector('.hex').innerHTML = color;
        instance.querySelector('.rgb').innerHTML = hexToRGB(color);
        instance.querySelector('.hsl').innerHTML = hexToHSL(color);
        colorContainer.appendChild(instance);
        cNum++;
    });
}

function toggleSticky() {
    tglClass(footer, "sticky-footer");
    tglClass(footer, "not-sticky");
    tglClass(btnFooter, "btn-disabled");
}

function toggleCase() {
    let upper = qsa('[case-toggle]');
    upper.forEach(box => { tglAttr(box, "data-uppercase"); });
    tglAttr(upcase, 'highlight');
}

function cMode(mode) {
    let modes = qsa('[mode-toggle]');
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

function mode(c) {
    switch (colorMode) {
        case `RGB`:
            v0 = c;
            break;
        case `HEX`:
            v0 = rgbToHEX(c);
            break;
        case `HSL`:
            v0 = rgbToHSL(c);
            break;
    }
    return v0;
}

function mode2(id) {
    let bxid = id.replace('box', '');
    let vali = '';
    switch (colorMode) {
        case `RGB`:
            let prgb = boxes[bxid].querySelector('.rgb');
            vali = prgb.innerHTML;
            break;
        case `HEX`:
            let phex = boxes[bxid].querySelector('.hex');
            vali = phex.innerHTML;
            break;
        case `HSL`:
            let phsl = boxes[bxid].querySelector('.hsl');
            vali = phsl.innerHTML;
            break;
    }
    return vali;
}

function rgbMode() {
    for (i = 0; i < boxes.length; i++) {
        let phex = boxes[i].querySelector('.hex'),
            prgb = boxes[i].querySelector('.rgb'),
            phsl = boxes[i].querySelector('.hsl');
        phex.setAttribute("data-hide", true);
        prgb.removeAttribute("data-hide");
        phsl.setAttribute("data-hide", true);
    }
    cMode(`RGB`);
}

function hexMode() {
    for (i = 0; i < boxes.length; i++) {
        let phex = boxes[i].querySelector('.hex'),
            prgb = boxes[i].querySelector('.rgb'),
            phsl = boxes[i].querySelector('.hsl');
        phex.removeAttribute("data-hide");
        prgb.setAttribute("data-hide", true);
        phsl.setAttribute("data-hide", true);
    }
    cMode(`HEX`);
}

function hslMode() {
    for (i = 0; i < boxes.length; i++) {
        let phex = boxes[i].querySelector('.hex'),
            prgb = boxes[i].querySelector('.rgb'),
            phsl = boxes[i].querySelector('.hsl');
        phex.setAttribute("data-hide", true);
        prgb.setAttribute("data-hide", true);
        phsl.removeAttribute("data-hide");
    }
    cMode(`HSL`);
}
