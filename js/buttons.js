let dataArray, cleared = false,
    upperCase = false;
const template = `<div style='background-color: #fff;' onmousedown='colorSel(this.style.backgroundColor)' class="box"></div>`;

// -------------------------------------------------------------- SUBMIT
function submit() {
    topFunction()
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
        newList = (i === 0) ? newList += `#${dataArray[i]}` : newList += `\n#${dataArray[i]}`;
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
    let text = document.getElementById("userInput").value;
    let filename = "colors.txt";
    download(filename, text);
}, false);

// -------------------------------------------------------------- SCROLL
// window.onscroll = function() {
//     scrollFunction()
// };
// 
// function scrollFunction() {
//     if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//         document.getElementById("btnScroll").style.display = "block";
//     } else {
//         document.getElementById("btnScroll").style.display = "none";
//     }
// }

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
