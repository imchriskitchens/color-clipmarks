function colorSel(bg) {
    let cval = (btnHEX.disabled === true) ? rgbToHex(bg) : bg;
    cval = (upperCase === true) ? cval.toUpperCase() : cval;
    colorLabel.value = cval;
    colorLabel.style.borderColor = cval;
}

function rgbToHex(rgbVal) {
    if (rgbVal.charAt(0) == 'r') {
        rgbVal = rgbVal.replace('rgb(', '').replace(')', '').split(',');
        let r = parseInt(rgbVal[0], 10).toString(16),
            g = parseInt(rgbVal[1], 10).toString(16),
            b = parseInt(rgbVal[2], 10).toString(16);
        r = r.length == 1 ? '0' + r : r;
        g = g.length == 1 ? '0' + g : g;
        b = b.length == 1 ? '0' + b : b;
        let hexVal = '#' + r + g + b;
        return hexVal;
    }
}

function copyColor() {
    colorLabel.select();
    document.execCommand("copy");
    alert("Copied Color: " + colorLabel.value);
}
