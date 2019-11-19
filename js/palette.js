const palettes = {
  "palette1": [{
      "rgb": "rgb(17, 3, 7)",
      "hex": "#110307",
      "hsl": "hsl(345, 70%, 4%)"
		},
    {
      "rgb": "rgb(30, 5, 12)",
      "hex": "#1e050c",
      "hsl": "hsl(345, 70%, 7%)"
		},
    {
      "rgb": "rgb(43, 8, 17)",
      "hex": "#2b0811",
      "hsl": "hsl(345, 70%, 10%)"
		},
    {
      "rgb": "rgb(56, 10, 22)",
      "hex": "#380a16",
      "hsl": "hsl(345, 70%, 13%)"
		},
    {
      "rgb": "rgb(69, 12, 27)",
      "hex": "#450c1b",
      "hsl": "hsl(345, 70%, 16%)"
		}
	],
  "palette2": [{
      "rgb": "rgb(115, 201, 144)",
      "hex": "#73c990",
      "hsl": "hsl(140, 44%, 62%)"
		},
    {
      "rgb": "rgb(86, 208, 127)",
      "hex": "#56d07f",
      "hsl": "hsl(140, 56%, 58%)"
		},
    {
      "rgb": "rgb(56, 209, 215)",
      "hex": "#38d1d7",
      "hsl": "hsl(182, 67%, 53%)"
		},
    {
      "rgb": "rgb(0, 178, 255)",
      "hex": "#00b2ff",
      "hsl": "hsl(198, 100%, 50%)"
		},
    {
      "rgb": "rgb(19, 128, 175)",
      "hex": "#1380af",
      "hsl": "hsl(198, 80%, 38%)"
		},
    {
      "rgb": "rgb(0, 14, 19)",
      "hex": "#000e13",
      "hsl": "hsl(196, 100%, 4%)"
		},
    {
      "rgb": "rgb(14, 0, 20)",
      "hex": "#0e0014",
      "hsl": "hsl(282, 100%, 4%)"
		},
    {
      "rgb": "rgb(20, 5, 27)",
      "hex": "#14051b",
      "hsl": "hsl(281, 69%, 6%)"
		},
    {
      "rgb": "rgb(57, 16, 65)",
      "hex": "#391041",
      "hsl": "hsl(290, 60%, 16%)"
		},
    {
      "rgb": "rgb(129, 34, 94)",
      "hex": "#81225e",
      "hsl": "hsl(322, 58%, 32%)"
		},
    {
      "rgb": "rgb(20, 152, 209)",
      "hex": "#1498d1",
      "hsl": "hsl(198, 83%, 45%)"
		},
    {
      "rgb": "rgb(10, 14, 25)",
      "hex": "#0a0e19",
      "hsl": "hsl(224, 43%, 7%)"
		},
    {
      "rgb": "rgb(227, 110, 89)",
      "hex": "#e36e59",
      "hsl": "hsl(9, 71%, 62%)"
		},
    {
      "rgb": "rgb(144, 127, 60)",
      "hex": "#907f3c",
      "hsl": "hsl(48, 41%, 40%)"
		},
    {
      "rgb": "rgb(150, 149, 74)",
      "hex": "#96954a",
      "hsl": "hsl(59, 34%, 44%)"
		},
    {
      "rgb": "rgb(191, 188, 34)",
      "hex": "#bfbc22",
      "hsl": "hsl(59, 70%, 44%)"
		},
    {
      "rgb": "rgb(0, 163, 152)",
      "hex": "#00a398",
      "hsl": "hsl(176, 100%, 32%)"
		},
    {
      "rgb": "rgb(115, 154, 156)",
      "hex": "#739a9c",
      "hsl": "hsl(182, 17%, 53%)"
		},
    {
      "rgb": "rgb(0, 107, 112)",
      "hex": "#006b70",
      "hsl": "hsl(183, 100%, 22%)"
		},
    {
      "rgb": "rgb(17, 20, 24)",
      "hex": "#111418",
      "hsl": "hsl(214, 16%, 8%)"
		},
    {
      "rgb": "rgb(100, 148, 237)",
      "hex": "#6494ed",
      "hsl": "hsl(219, 79%, 66%)"
		},
    {
      "rgb": "rgb(22, 22, 24)",
      "hex": "#161618",
      "hsl": "hsl(220, 6%, 9%)"
		},
    {
      "rgb": "rgb(10, 14, 25)",
      "hex": "#0a0e19",
      "hsl": "hsl(227, 42%, 7%)"
		},
    {
      "rgb": "rgb(87, 82, 183)",
      "hex": "#5752b7",
      "hsl": "hsl(243, 41%, 52%)"
		},
    {
      "rgb": "rgb(13, 4, 16)",
      "hex": "#0d0410",
      "hsl": "hsl(285, 60%, 4%)"
		},
    {
      "rgb": "rgb(150, 90, 128)",
      "hex": "#965a80",
      "hsl": "hsl(322, 25%, 47%)"
		},
    {
      "rgb": "rgb(168, 93, 140)",
      "hex": "#a85d8c",
      "hsl": "hsl(322, 30%, 51%)"
		},
    {
      "rgb": "rgb(143, 86, 122)",
      "hex": "#8f567a",
      "hsl": "hsl(322, 25%, 45%)"
		},
    {
      "rgb": "rgb(129, 34, 94)",
      "hex": "#81225e",
      "hsl": "hsl(322, 58%, 32%)"
		},
    {
      "rgb": "rgb(0, 202, 209)",
      "hex": "#00cad1",
      "hsl": "hsl(182, 100%, 41%)"
		},
    {
      "rgb": "rgb(0, 203, 214)",
      "hex": "#00cbd6",
      "hsl": "hsl(183, 100%, 42%)"
		},
    {
      "rgb": "rgb(57, 16, 65)",
      "hex": "#391041",
      "hsl": "hsl(290, 60%, 16%)"
		},
    {
      "rgb": "rgb(56, 209, 214)",
      "hex": "#38d1d6",
      "hsl": "hsl(182, 66%, 53%)"
		},
    {
      "rgb": "rgb(55, 210, 215)",
      "hex": "#37d2d7",
      "hsl": "hsl(182, 67%, 53%)"
		}
	]
}

const submitJSON = (palette) => {
  if(palette === "") return;
  let boxID = 0;
  userInput.value = colorContainer.innerHTML = '';
  palette.forEach(color => {
    const colorValue = [color.rgb, color.hex, color.hsl][boxID % 3];
    userInput.value += `${colorValue}\n`;
    boxID++;
  });
  userInput.rows = (boxID < 10) ? (boxID + 1) : 10;
  app.submit();
}

// submitJSON(palettes.palette2);