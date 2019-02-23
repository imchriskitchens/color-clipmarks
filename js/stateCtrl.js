const btnHex = document.getElementById('btnHEX'),
    btnRgb = document.getElementById('btnRGB'),
    btnHsl = document.getElementById('btnHSL'),
    btnSort = document.getElementById('btnSORT'),
    btnSubmit = document.getElementById('btnSUBMIT'),
    btnSelect = document.getElementById('btnSELECT'),
    btnClear = document.getElementById('btnCLEAR'),
    btnExport = document.getElementById('btnEXPORT');

function isClear() {
    let btnArray = [btnSelect, btnClear, btnHsl, btnExport];
    for (i = 0; i < btnArray.length; i++) {
        btnArray[i].disabled = true;
        btnArray[i].classList.toggle("btn-disabled");
    }
    if (upperCase === true) {
        toggleCase();
    }
    btnRgb.disabled = true;
    btnHex.disabled = true;
}

function notCleared() {
    let btnArray = [btnSelect, btnClear, btnHsl, btnExport];
    for (i = 0; i < btnArray.length; i++) {
        btnArray[i].disabled = false;
        btnArray[i].classList.toggle("btn-disabled");
    }
    btnRgb.disabled = false;
    btnHex.disabled = true;
}

function toggleHighlight() {
    let current = colorMode;
    switch (current) {
        case 'hex':
            btnHex.classList.toggle("btn-highlight");
            btnHsl.classList.toggle("btn-disabled");
            btnSort.classList.toggle("btn-disabled");
            upcase.classList.toggle("btn-disabled");
            break;
        case 'rgb':
            btnRgb.classList.toggle("btn-highlight");
            break;
        case 'hsl':
            btnHsl.classList.toggle("btn-highlight");
            btnHex.classList.toggle("btn-disabled");
            break;
    }
}

function cMode(mode) {
    toggleHighlight();
    colorMode = mode;
    toggleHighlight();
    return colorMode;
}

// function lightModeVars() {
//     colorDef = '#fff';
//     bgDef = '#555';
//     colorDis = '#ccc';
//     bgDis = '#999';
//     modeSel = '#0094d4';
// }
// 
// function darkModeVars() {
//     colorDef = '#ccc';
//     bgDef = '#222';
//     colorDis = '#666';
//     bgDis = '#1b1b1b';
//     modeSel = '#00bcd4';
// }
