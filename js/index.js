const radios = document.querySelectorAll('input[type="radio"]');
const colorContainer = document.getElementById('colorContainer');
const userInput = document.getElementById('userInput');
const fragment = document.getElementById('template');
let boxes = document.querySelectorAll('.box');

const updateBoxes = () => boxes = document.querySelectorAll('.box');

// color format display controller
const setMode = (cMode) => {
    boxes.forEach(box => {
        box.querySelectorAll('p').forEach(item => {
            if (cMode in item.dataset === true)
                item.removeAttribute("hidden");
            else item.setAttribute("hidden", true);
        });
    });
}

// radio button events
radios.forEach(option => {
    option.addEventListener('change', (event) => {
        return setMode(event.target.value);
    });
});

// initialize radio button selection and color format
const setDefault = () => {
    let num = radios.length;
    radios.forEach(item => {
        if (item.checked === false) num--;
        if (num === 0) radios[0].click();
        else radios[num].click();
    });
}
setDefault();

const sendToClipboard = (str) => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
    el.select();
    document.execCommand('copy');
    alert(`copied "${el.value}"`);
    document.body.removeChild(el);
    if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
    }
}

const copyColor = (el) => {
    radios.forEach(item => {
        if (item.checked === true) {
            let bxid = el.match(/\d+/);
            let result = boxes[bxid].querySelector(`[data-${item.value}]`);
            sendToClipboard(result.textContent);
        }
    });
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

function submit() {
    let colors = userInput.value;
    colors = colors.trim().split(`\n`);
    colorContainer.textContent = '';
    let boxID = 0;
    colors.forEach(color => {
        if (color !== '') {
            const temp = document.importNode(template.content, true);
            const cFormat = conversions(color);
            temp.querySelector('.box').id = `box${boxID}`;
            temp.querySelector('.box').style.backgroundColor = cFormat[0];
            temp.querySelector('[data-default]').textContent = color; // DEF
            temp.querySelector('[data-rgb]').textContent = cFormat[0]; // RGB
            temp.querySelector('[data-hex]').textContent = cFormat[1]; // HEX
            temp.querySelector('[data-hsl]').textContent = cFormat[2]; // HSL
            colorContainer.appendChild(temp);
            boxID++;
        }
    });
    // NOTE: Required to update "boxes" and sync color format selection
    updateBoxes();
    setDefault();
}
