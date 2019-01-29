let dataArray;
const divtemp = `<div style='background-color: #fff;' onmousedown='bgChange(this.style.backgroundColor)' class="box"></div>`;

// -------------------------------------------------------------- SUBMIT
function submit() {
	let divList = '';
	let data = txtareaCol[0].value;

	let prefix = /#/g;
	dataArray = data.replace(prefix, '').split('\n');

	for (i = 0; i < dataArray.length; i++) {
		divList += divtemp;
	}

	colorContainer.innerHTML = divList;
	setColors();
}

// -------------------------------------------------------------- SET_COLORS
function setColors() {
	for (i = 0; i < dataArray.length; i++) {
		boxes[i].style.color = '#fff';
		boxes[i].style.backgroundColor = '#' + dataArray[i];
		boxes[i].style.margin = '5px';
		boxes[i].style.float = 'left';
		boxes[i].style.width = '10vw';
		boxes[i].style.height = '20vh';
		boxes[i].style.borderRadius = '5px';
		boxes[i].style.textAlign = 'center';
	}
}

// -------------------------------------------------------------- RESET
function reset() {
	textAreaStyle();
	inputStyle();
	submit();
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
	let divList = '';
	let newList = '';
	let data = txtareaCol[0].value;

	let prefix = /#/g;
	dataArray = data.replace(prefix, '').split('\n');

	dataArray = rmDuplicates();
	dataArray = dataArray.sort();

	for (i = 0; i < dataArray.length; i++) {
		let newLine = `#${dataArray[i]}\n`;
		newList += newLine;
	}
	txtareaCol[0].value = newList;

	for (i = 0; i < dataArray.length; i++) {
		divList += divtemp;
	}

	colorContainer.innerHTML = divList;
	setColors();
}

// -------------------------------------------------------------- CLEAR
function clearAll() {
	txtareaCol[0].value = '';
	colorContainer.innerHTML = '';

}
