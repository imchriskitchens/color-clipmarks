let dataArray,
    len,
    newList = '',
    upperCase = false,
    colorMode = 'HEX';

function getData() {
    let data = userInput.value;
    dataArray = (data !== '') ? data.split('\n') : '';
    len = dataArray.length;
    return [len, dataArray, newList = ''];
}


// -------------------------------------------------------------- SORT
// let sorted, colors;
// 
// function rmDuplicates() {
//     let unique = {};
//     dataArray.forEach(function(i) {
//         if (!unique[i]) {
//             unique[i] = true;
//         }
//     });
//     return Object.keys(unique);
// }
// 
// 
// function sortAll() {
//     if (colorMode === 'HEX' && userInput.value !== '') {
//         let prefix = /#/g;
//         let data = getData();
//         dataArray = dataArray.replace(prefix, '');
//         dataArray = rmDuplicates();
//         dataArray = dataArray.sort();
//         for (i = 0; i < len; i++) {
//             newList = (i === 0) ? newList += `#${dataArray[i]}` : newList += `\n#${dataArray[i]}`;
//         }
//         userInput.value = newList;
//         submit();
//     } else {
//         let msg = (colorMode !== 'HEX') ? "Sort is only available for hex values" : "Failed to sort list values!";
//         alert(msg);
//     }
// }

// -------------------------------------------------------------- CLEAR
function clearAll() {
    isClear();
    userInput.value = '';
    colorContainer.innerHTML = '';
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
    if (userInput.value !== '') {
        let text = document.getElementById("userInput").value;
        let filename = "palette.txt";
        download(filename, text);
    } else {
        alert('No values!');
    }
}, false);
