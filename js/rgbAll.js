const testData = ['#000011', '#00ce9e', '#05b088', '#08393b', '#1110d7', '#111111', '#1380af', '#140518', '#14051b', '#1498d1', '#18d97d', '#19071f', '#190a1f', '#1a1a1a', '#1aaaba', '#1d1d1d', '#1dbfd1', '#1dd143', '#1fc3b1', '#200226', '#200418', '#200e22', '#201022', '#230f2a', '#24052d', '#28132f', '#292727', '#2a052d', '#2b0636', '#2d0037', '#2d0522', '#310a3c', '#34143d', '#38d1d7', '#391041', '#39b6c7', '#3ae2e9', '#3c1746', '#430650', '#444444', '#44a8e6', '#4b2667', '#4db16f', '#502b6e', '#603b7d', '#61b14d', '#653f66', '#6a4c7c', '#6cbee0', '#6d083e', '#6eda8c', '#6f0e3e', '#7c338b', '#7d4ea2', '#8070d5', '#822d94', '#833793', '#871653', '#8c57b5', '#901773', '#919ee4', '#9381f4', '#98c379', '#9a2a67', '#a695ff', '#a746bb', '#aaaaaa', '#ab051e', '#ac50c3', '#acb6eb', '#ae6ce0', '#b01260', '#b01f6e', '#b05ba5', '#b41dad', '#b9168c', '#ba2c4a', '#ba3450', '#c40d56', '#c4467f', '#c4528b', '#c65894', '#c71054', '#c744cd', '#c85fcd'];

let r, g, b, newColorRGB, thisNewColorRGB = '';
// rgbAll(testData);

// rgbAll(INPUT_ARRAY);

let newColorList = '';
let thisList = '';
function rgbAll(testData) {
	console.clear();
	let data = txtareaCol[0].value;
	let prefix = /#/g;
	dataArray = data.replace(prefix, '').split('\n');
	for (i = 0; i < dataArray.length; i++) {
		newColorRGB = hex2rgb(dataArray[i]);
		thisNewColorRGB = `rgb(${r}, ${g}, ${b})`;
		console.log(i + ": " + thisNewColorRGB);
		 thisList += thisNewColorRGB + '\n';
	}
	txtareaCol[0].value = thisList;
}

function hex2rgb(hex) {
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
