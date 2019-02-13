let dataArray, cleared = false, upperCase = false;
const template = `<div style='background-color: #fff;' onmousedown='colorSel(this.style.backgroundColor)' class="box"></div>`;

// -------------------------------------------------------------- SUBMIT
function submit() {
    let newList = '';
    let data = userInput.value;
    if (data !== '') {
        // AVOID MODE SELECTION CONFLICT BEFORE FIRST CLEAR
        if (cleared === true) {
            notCleared();
        }
        dataArray = data.split('\n');
        let qty = dataArray.length;
        for (i = 0; i < qty; i++) {
            newList += template;
        }
        colorContainer.innerHTML = newList;
        setColors();
    }
    else {
        alert('No values!');
    }
}

// -------------------------------------------------------------- SET_COLORS
function setColors() {
    for (i = 0; i < dataArray.length; i++) {
        boxes[i].style.color = '#fff';
        boxes[i].style.backgroundColor = dataArray[i];
        boxes[i].style.margin = '5px';
        boxes[i].style.float = 'left';
        boxes[i].style.borderRadius = '5px';
        boxes[i].style.textAlign = 'center';
    }
}

// -------------------------------------------------------------- TOGGLE_CASE
function toggleCase() {
    upperCase = (upperCase === true) ? false : true;
    if (upperCase === true) {
        upcase.style.borderColor = '#00bcd4';
        userInput.value = userInput.value.toUpperCase();
        colorLabel.value = colorLabel.value.toUpperCase();
    } else {
        upcase.style.borderColor = '#333';
        userInput.value = userInput.value.toLowerCase();
        colorLabel.value = colorLabel.value.toLowerCase();
    }
}

// -------------------------------------------------------------- SORT
let sorted, colors;

function rmDuplicates() {
    let unique = {};
    dataArray.forEach(function(i) {
        if (!unique[i]) {
            unique[i] = true;
        }
    });
    return Object.keys(unique);
}

function sortAll() {
    let prefix = /#/g;
    let data = userInput.value;
    dataArray = data.replace(prefix, '').split('\n');
    dataArray = rmDuplicates();
    dataArray = dataArray.sort();
    let qty = dataArray.length;
    let newList = '',
        divList = '';

    for (i = 0; i < qty; i++) {
        newList += `#${dataArray[i]}\n`;
        divList += template;
    }
    userInput.value = newList;
    colorContainer.innerHTML = divList;
    submit();
}

// -------------------------------------------------------------- CLEAR
function clearAll() {
    isClear();
    cleared = true;
    userInput.value = '';
    colorContainer.innerHTML = '';
    colorLabel.value = '';
    colorLabel.style.borderColor = '#333';
}


// -------------------------------------------------------------- DARK MODE
function darkMode() {
    let curr = bod.style.backgroundColor;
    curr = rgbToHex(curr);
    let isDark = (curr === '#1b1b1b') ? 'enabled' : 'disabled';
    let bkgdSet = (isDark === 'enabled') ? '#333' : '#1b1b1b';

    // bod.classList.toggle("mystyle");
    bod.style.backgroundColor = bkgdSet;
    colorLabelDiv.style.backgroundColor = bkgdSet;
}
