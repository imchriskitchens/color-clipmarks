let r, g, b, data, newColorRGB;

function rgbMode() {
    rgbModeSel();
    let newList = '',
        newColorList = '',
        thisNewColorRGB = '';
    data = userInput.value;
    let prefix = /#/g;
    let dataArray = data.replace(prefix, '').split('\n');
    for (i = 0; i < dataArray.length; i++) {
        if (dataArray[i].charAt(0) !== 'r') {
            newColorRGB = hexToRGB(dataArray[i]);
            thisNewColorRGB = `rgb(${r}, ${g}, ${b})`;
            newList += thisNewColorRGB + '\n';
        } else {
            let newline = (i < dataArray.length - 1) ? `\n` : ``;
            newList += `#${dataArray[i]}${newline}`;
        }
    }
    console.log(newList);
    userInput.value = newList;
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
    let hexList = '';
    let data = userInput.value;
    let dataArray = data.split('\n');
    for (i = 0; i < dataArray.length; i++) {
        if (dataArray[i].charAt(0) === 'r') {
            let result = rgbToHex(dataArray[i]);
            let newline = (i > 10) ? '' : `\n`;
            console.log(newline);
            hexList += `${result}${newline}`;
        }
    }
    console.log(hexList);
    userInput.value = hexList;
}
