const btnHex = document.getElementById('btnHEX'),
    btnRgb = document.getElementById('btnRGB'),
    btnSort = document.getElementById('btnSORT'),
    btnSubmit = document.getElementById('btnSUBMIT'),
    btnSelect = document.getElementById('btnSELECT'),
    btnClear = document.getElementById('btnCLEAR');

function hexModeSel() {
    btnRgb.disabled = false;
    btnSort.disabled = false;
    btnHex.disabled = true;
    upcase.disabled = false;
    btnRgb.style.color = `#ccc`;
    btnSort.style.color = `#ccc`;
    btnHex.style.color = `#ccc`;
    upcase.style.color = `#ccc`;
    btnRgb.style.backgroundColor = `#222`;
    btnSort.style.backgroundColor = `#222`;
    btnHex.style.backgroundColor = `#222`;
    upcase.style.backgroundColor = `#222`;
    btnHex.style.borderColor = '#00bcd4';
    btnRgb.style.borderColor = '#333';
    btnHsl.innerHTML = 'HSL > HEX';
}

function rgbModeSel() {
    upperCase = false;
    btnRgb.disabled = true;
    btnSort.disabled = true;
    btnHex.disabled = false;
    upcase.disabled = true;
    btnSort.style.color = `#666`;
    btnHex.style.color = `#ccc`;
    upcase.style.color = `#666`;
    btnSort.style.backgroundColor = `#1b1b1b`;
    btnHex.style.backgroundColor = `#222`;
    upcase.style.backgroundColor = `#1b1b1b`;
    btnRgb.style.borderColor = '#00bcd4';
    btnHex.style.borderColor = '#333';
    upcase.style.borderColor = '#333';
    btnHsl.innerHTML = 'HSL > RGB';
}

function isClear() {
    btnRgb.disabled = true;
    btnHex.disabled = true;
    btnSort.disabled = true;
    btnSelect.disabled = true;
    btnClear.disabled = true;
    upcase.disabled = true;
    btnRgb.style.color = `#666`;
    btnHex.style.color = `#666`;
    btnSort.style.color = `#666`;
    btnSelect.style.color = `#666`;
    btnClear.style.color = `#666`;
    upcase.style.color = `#666`;
    btnRgb.style.backgroundColor = `#1b1b1b`;
    btnHex.style.backgroundColor = `#1b1b1b`;
    btnSort.style.backgroundColor = `#1b1b1b`;
    btnSelect.style.backgroundColor = `#1b1b1b`;
    btnClear.style.backgroundColor = `#1b1b1b`;
    upcase.style.backgroundColor = `#1b1b1b`;
}

function notCleared() {
    hexModeSel();
    btnSelect.disabled = false;
    btnClear.disabled = false;
    upcase.disabled = false;
    btnSort.style.color = `#ccc`;
    btnSelect.style.color = `#ccc`;
    btnClear.style.color = `#ccc`;
    upcase.style.color = `#ccc`;
    btnSort.style.backgroundColor = `#222`;
    btnSelect.style.backgroundColor = `#222`;
    btnClear.style.backgroundColor = `#222`;
    upcase.style.backgroundColor = `#222`;
}
