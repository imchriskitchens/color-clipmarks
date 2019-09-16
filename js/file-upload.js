const contentFilter = (content) => {
  const isHEX = /(^#?[0-9A-F]{6}$)|(^#?[0-9A-F]{3}$)/i;
  const isRGB = /^rgb\((\s*\d{1,3}\s*),(\s*\d{1,3}\s*),(\s*\d{1,3}\s*)\)$/i;
  const isHSL = /^hsl\((\s*\d{1,3}\s*),(\s*\d{1,3}%\s*),(\s*\d{1,3}%\s*)\)$/i;
  const testArray = [["#", isHEX], ["rgb", isRGB], ["hsl", isHSL]];

  const updateList = (val) => userInput.value += `${val}\n`;

  const lines = content.replace(/[:;"']/g, "").trim().split(`\n`);
  lines.forEach(line => {
    testArray.forEach(([flag, isValid] = item) => {
      if (line.includes(flag)) {
        line = (flag === "#") ? line.replace(",", " ") : line;
        let segment = line.replace(flag, `\n${flag}`).split("\n")[1];
        segment = segment.replace(/([,]\s+)/g, ",").split(/\s+/g)[0];
        if (isValid.test(segment)) updateList(segment.match(isValid)[0]);
      }
    });
  });
  submit();
}

const pullfiles = function () {
  const fileInput = document.querySelector("#myfiles");
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = function (evt) {
    userInput.value = "";
    contentFilter(evt.target.result);
  };
  reader.readAsText(file);
}

document.querySelector("#myfiles").onchange = pullfiles;
