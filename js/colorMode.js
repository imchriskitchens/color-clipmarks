let r, g, b, data;

function rgbMode() {
    if (colorMode !== 'rgb') {
        let newList = '',
            data = userInput.value;

        if (colorMode === 'hex') {
            let prefix = /#/g,
                dataArray = data.replace(prefix, '').split('\n');

            for (i = 0; i < dataArray.length; i++) {
                let newColorRGB = hexToRGB(dataArray[i]),
                    result = `rgb(${r}, ${g}, ${b})`;
                newList = (i === 0) ? newList += result : newList += `\n${result}`;
            }
            userInput.value = newList;

            let cLabel = hexToRGB(colorLabel.value),
                cLabelNew = `rgb(${r}, ${g}, ${b})`;
            colorLabel.value = cLabelNew;
        }
        else {
            let data = userInput.value;
            if (data !== '') {
                dataArray = data.split('\n');
                let qty = dataArray.length;
                for (i = 0; i < qty; i++) {
                    newList += template;
                }
                colorContainer.innerHTML = newList;
                setColors();
            }
            newList = '';
            for (i = 0; i < boxes.length; i++) {
                let result = boxes[i].style.backgroundColor;
                newList = (i === 0) ? newList += result : newList += `\n${result}`;
            }
            userInput.value = newList;
            colorLabel.value = '';
        }
        cMode('rgb');
    }
}

function hexToRGB(hex) {
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
    if (colorMode !== 'hex') {
        let newList = '';
        let data = userInput.value;
        let dataArray = data.split('\n');
        for (i = 0; i < dataArray.length; i++) {
            let result = (dataArray[i].charAt(0) === 'r') ? rgbToHex(dataArray[i]) : '';
            newList = (i === 0) ? newList += result : newList += `\n${result}`;
        }
        userInput.value = newList;
        colorLabel.value = rgbToHex(colorLabel.value);
        cMode('hex');
    }
}

function hslConvert() {
    let data = userInput.value;
    if (data.charAt(0) === 'h') {
        submit();
        let newList = '';
        for (i = 0; i < boxes.length; i++) {
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

function hslMode() {
    if (colorMode !== 'hsl') {
        let newList = '',
            data = userInput.value,
            dataArray = data.split('\n');
        for (i = 0; i < dataArray.length; i++) {
            let result = (dataArray[i].charAt(0) === 'r') ? dataArray[i] : '';
            result = rgbToHsl(result);
            newList = (i === 0) ? newList += result : newList += `\n${result}`;
        }
        userInput.value = newList;
        colorLabel.value = rgbToHsl(colorLabel.value);
        cMode('hsl');
    }
}

function rgbToHsl(c) {
    let data = c;
    let val = data.replace('rgb(', '').replace(')', '').split(',');
    let r = val[0],
        g = val[1],
        b = val[2];
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max == min) {
        h = s = 0;
    } else {
        let c = max - min;
        s = (l > 0.5) ? c / (2 - max - min) : c / (max + min);
        switch (max) {
            case r:
                h = ((g - b) / c) % 6;
                break;
            case g:
                h = ((b - r) / c) + 2;
                break;
            case b:
                h = ((r - g) / c) + 4;
                break;
        }
        h *= 60;
    }
    s *= 100;
    l *= 100;
    let result = `hsl(${h.toFixed(0)}, ${s.toFixed(0)}%, ${l.toFixed(0)}%)`;
    // console.log(result);
    return result;
}
