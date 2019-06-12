const palette = [
    {
        rgb: "rgb(17, 3, 7)",
        hex: "#110307",
        hsl: "hsl(345, 70%, 4%)"
	},
    {
        rgb: "rgb(30, 5, 12)",
        hex: "#1e050c",
        hsl: "hsl(345, 70%, 7%)"
	},
    {
        rgb: "rgb(43, 8, 17)",
        hex: "#2b0811",
        hsl: "hsl(345, 70%, 10%)"
	},
    {
        rgb: "rgb(56, 10, 22)",
        hex: "#380a16",
        hsl: "hsl(345, 70%, 13%)"
	},
    {
        rgb: "rgb(69, 12, 27)",
        hex: "#450c1b",
        hsl: "hsl(345, 70%, 16%)"
	}
]


function submitJSON() {
    let boxID = 0;
    userInput.value = colorContainer.innerHTML = '';
    palette.forEach(color => {
        const temp = document.importNode(template.content, true);
        temp.querySelector('.box').style.backgroundColor = color.rgb;
        temp.querySelector('.box').id = `box${boxID}`;
        const options = [color.rgb, color.hex, color.hsl];
        userInput.value += `${options[boxID % 3]}\n`;
        temp.querySelector('[data-default]').textContent = options[boxID % 3];
        temp.querySelector('[data-rgb]').textContent = color.rgb; // RGB
        temp.querySelector('[data-hex]').textContent = color.hex; // HEX
        temp.querySelector('[data-hsl]').textContent = color.hsl; // HSL
        colorContainer.appendChild(temp);
        boxID++;
    });
    userInput.rows = (boxID < 20) ? (boxID + 1) : 20;
    return boxes = document.querySelectorAll('.box');
}
// submitJSON();
