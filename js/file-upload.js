const contentFilter = (content) => {
  const isHEX = /(^#?[0-9A-F]{6}$)|(^#?[0-9A-F]{3}$)/i;
  const isRGB = /^rgb\((\s*\d{1,3}\s*),(\s*\d{1,3}\s*),(\s*\d{1,3}\s*)\)$/i;
  const isHSL = /^hsl\((\s*\d{1,3}\s*),(\s*\d{1,3}%\s*),(\s*\d{1,3}%\s*)\)$/i;

  const lines = content.trim().split(`\n`);
  lines.forEach(color => {
    userInput.value +=
      (isHEX.test(color)) ? `${color}\n` :
      (isRGB.test(color)) ? `${color}\n` :
      (isHSL.test(color)) ? `${color}\n` : '';
  });
  submit();
}

const pullfiles = function () {
  const fileInput = document.querySelector("#myfiles");
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = function (evt) {
    userInput.value = '';
    contentFilter(evt.target.result);
  };
  reader.readAsText(file);
}

document.querySelector("#myfiles").onchange = pullfiles;