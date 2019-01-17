function bgChange(bg) {
	let cval = rgbToHex(bg);
	inputBox.value = cval;
	inputBox.style.textTransform = 'uppercase';
	let tbBorder = 'solid 20px ' + inputBox.value;
	let lrBorder = 'solid 30px ' + inputBox.value;
	inputBox.style.borderTop = tbBorder;
	inputBox.style.borderRight = lrBorder;
	inputBox.style.borderBottom = tbBorder;
	inputBox.style.borderLeft = lrBorder;
}

function rgbToHex(rgbVal) {
	if (rgbVal.charAt(0) == 'r') {
		rgbVal = rgbVal.replace('rgb(', '').replace(')', '').split(',');
		let r = parseInt(rgbVal[0], 10).toString(16),
			g = parseInt(rgbVal[1], 10).toString(16),
			b = parseInt(rgbVal[2], 10).toString(16);
		r = r.length == 1 ? '0' + r : r;
		g = g.length == 1 ? '0' + g : g;
		b = b.length == 1 ? '0' + b : b;
		let hexVal = '#' + r + g + b;
		return hexVal;
	}
}

function copyColor() {
	inputBox.select();
	document.execCommand("copy");
	alert("Copied Color: " + inputBox.value);
}