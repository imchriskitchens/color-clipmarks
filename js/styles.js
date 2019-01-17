const bod = document.body,
	title = document.getElementById('title'),
	main = document.getElementById('main'),
	btns = document.getElementsByTagName('button'),
	boxes = document.getElementsByClassName('box'),
	inputBox = document.getElementById('inputBox'),
	inputDiv = document.getElementById('inputDiv'),
	txtareaCol = document.getElementsByTagName('textarea'),
	colorContainer = document.getElementById('colorContainer');



// ----------------------------------------------------------------- BODY
function bodyStyle() {
	bod.style.fontFamily = 'Arial';
	bod.style.backgroundColor = '#f2f2f2';
	bod.style.margin = '20px 10% 150px 10%';
}
bodyStyle();

// ----------------------------------------------------------------- TITLE
function titleStyle() {
	title.style.color = '#ccc';
	title.style.fontSize = '40px';
}
titleStyle();

// ----------------------------------------------------------------- MAIN
function mainStyle() {
	main.style.margin = '0';
}
// mainStyle();

// ----------------------------------------------------------------- MARGINS
let mar = main.style.margin,
	marSideT = main.style.marginTop,
	marSideR = main.style.marginRight,
	marSideB = main.style.marginBottom,
	marSideL = main.style.marginLeft,
	marArry = [marSideT, marSideR, marSideB, marSideR];

function percentToInt(num) {
	num = num.replace('%', '');
	num = parseInt(num);
	return num;
}

let marSideLVal = percentToInt(marSideL),
	marSideRVal = percentToInt(marSideR),
	marSides = marSideLVal + marSideRVal,
	boxWidth;

// ----------------------------------------------------------------- BOX
function boxStyle() {
	boxWidth = 100 - marSides;
	let numBoxes = boxes.length;
	boxWidth = boxWidth / numBoxes;
	boxWidth = boxWidth.toFixed(2);
	boxWidth += '%';
	for (i = 0; i < numBoxes; i++) {
		boxes[i].style.float = 'left';
		boxes[i].style.width = boxWidth;
		boxes[i].style.height = '15vh';
		boxes[i].style.fontSize = '60px';
		boxes[i].style.textAlign = 'center';
		boxes[i].style.color = 'white';
	}
	return boxWidth;
}

// ----------------------------------------------------------------- TEXTAREA
function textAreaStyle() {
	let margins = '0';
	let totalMargins = percentToInt(margins) * 2;
	let thisWidth = 100 - totalMargins;
	thisWidth += '%';

	txtareaCol[0].value = `#339966\n#339999\n#3399cc\n#3399ff\n#33cc00\n#33cc33\n#33cc66\n#33cc99\n#33cccc\n#33ccff\n#33ff00\n#33ff33\n#33ff66\n#33ff99\n#ff0000\n#ff0033\n#ff0066\n#ff0099\n#ff00cc\n#ff00ff\n#ff3300\n#ff3333\n#ff3366\n#ff3399\n#ff33cc\n#ff33ff\n#ff6600\n#ff6633\n#ff6666\n#ff6699\n#ff66cc\n#ff66ff\n#ff9900\n#ff9933\n#ff9966\n#ff9999\n#ff99cc\n#ff99ff\n#ffcc00\n#ffcc33\n#ffcc66\n#ffcc99\n#ffcccc\n#ffccff\n#ffff00\n#ffff33\n#ffff66\n#ffff99\n#ffffff`;

	for (i = 0; i < txtareaCol.length; i++) {
		txtareaCol[i].style.fontSize = '18px';
		txtareaCol[i].style.color = '#444';
		txtareaCol[i].style.width = thisWidth;
		txtareaCol[i].style.height = '200px';
		txtareaCol[i].style.paddingTop = '20px';
		txtareaCol[i].style.paddingLeft = '20px';
		txtareaCol[i].style.marginLeft = margins;
		txtareaCol[i].style.marginTop = '10%';
		txtareaCol[i].style.marginRight = margins;
		txtareaCol[i].style.borderRadius = '5px';
		txtareaCol[i].rows = 8;
	}
}
textAreaStyle();

// ----------------------------------------------------------------- BUTTON
function buttonStyle() {
	for (i = 0; i < btns.length; i++) {
		btns[i].style.fontSize = '20px';
		btns[i].style.width = '120px';
		btns[i].style.height = '50px';
		btns[i].style.color = 'white';
		btns[i].style.backgroundColor = '#555';
		btns[i].style.margin = '50px 50px 50px 0';
		btns[i].style.border = 'none';
		btns[i].style.borderRadius = '5px';
	}
}
buttonStyle();

// ----------------------------------------------------------------- INPUT_DIV
function inputDivStyle() {
	inputDiv.style.width = '80vw';
	inputDiv.style.backgroundColor = '#f2f2f2';
	inputDiv.style.borderBottom = 'solid 1px #ccc';
	inputDiv.style.top = '0';
	inputDiv.style.position = 'sticky';
	inputDiv.style.position = '-webkit-sticky';
}
inputDivStyle();

// ----------------------------------------------------------------- INPUT
function inputStyle() {
	inputBox.value = '#C010R';
	inputBox.style.fontSize = '20px';
	inputBox.style.color = '#444';
	inputBox.style.width = '30vw';
	inputBox.style.margin = '10px 0 20px 0';
	inputBox.style.padding = '10px';
	inputBox.style.borderRadius = '10px';
	let tbBorder = 'solid 20px ' + '#ddd';
	let lrBorder = 'solid 30px ' + '#ddd';
	inputBox.style.borderTop = tbBorder;
	inputBox.style.borderRight = lrBorder;
	inputBox.style.borderBottom = tbBorder;
	inputBox.style.borderLeft = lrBorder;
}
inputStyle();
