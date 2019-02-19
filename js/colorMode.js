let r, g, b, data, newColorRGB;

function rgbMode() {
    rgbModeSel();
    let newList = '',
        newColorList = '',
        data = userInput.value;
    let prefix = /#/g;
    let dataArray = data.replace(prefix, '').split('\n');
    for (i = 0; i < dataArray.length; i++) {
        newColorRGB = hexToRGB(dataArray[i]);
        let result = `rgb(${r}, ${g}, ${b})`;
        newList = (i === 0) ? newList += result : newList += `\n${result}`;
    }
    userInput.value = newList;
    let cLabel = colorLabel.value;
    cLabel = hexToRGB(cLabel);
    let cLabelNew = `rgb(${r}, ${g}, ${b})`;
    colorLabel.value = cLabelNew;
}

function hexToRGB(hex) {
    if (hex[0] === '#') {
        hex = hex.substring(1);
    }
    if (hex.length === 6) {
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
        return {
            r,
            g,
            b
        };
    } else if (hex.length === 3) {
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
        return {
            r,
            g,
            b
        };
    }
}

function hexMode() {
    hexModeSel();
    let newList = '';
    let data = userInput.value;
    let dataArray = data.split('\n');
    for (i = 0; i < dataArray.length; i++) {
        let result = (dataArray[i].charAt(0) === 'r') ? rgbToHex(dataArray[i]) : '';
        newList = (i === 0) ? newList += result : newList += `\n${result}`;
    }
    userInput.value = newList;
    colorLabel.value = rgbToHex(colorLabel.value);
}

function hslConvert() {
    let data = userInput.value;
    if (data.charAt(0) === 'h') {
        submit();
        let newList = '';
        for (var i = 0; i < boxes.length; i++) {
            let c = boxes[i].style.backgroundColor;
            c = (btnHex.disabled === true) ? rgbToHex(c) : c;
            newList = (i === 0) ? newList += `${c}` : newList += `\n${c}`;
        }
        userInput.value = newList;
    }
    else {
        alert('Currently, the first value must be HSL format to convert values.');
    }
}
