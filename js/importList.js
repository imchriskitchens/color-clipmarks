const contentFilter = (content) => {
  const isHEX = /(#[0-9A-F]{6})|(#[0-9A-F]{3})/i;
  const isRGB = /(rgb\((?:\d{1,3})\s*,\s*(?:\d{1,3})\s*,\s*(?:\d{1,3})\))/i;
  const isHSL = /(hsl\((?:\d{1,3})\s*,\s*(?:\d{1,3}%)\s*,\s*(?:\d{1,3}%)\))/i;

  const formatTestObjs = [
    { flag: "#", isValid: isHEX },
    { flag: "rgb", isValid: isRGB },
    { flag: "hsl", isValid: isHSL }
  ];

  const listObj = {
    data: [],
    store(value) { this.data.push(value); },
    updateList({ append } = false) {
      const result = this.data.filter(v => !!v);
      if(result.length) {
        const current = (append) ? `${userInput.value}\n` : "";
        userInput.value = `${current}${result.join("\n")}`;
        app.submit();
      } else alert("No values found.");
    }
  }

  const lines = content.trim()
    .replace(/#/g, `\n#`)
    .replace(/rgb/g, `\nrgb`)
    .replace(/hsl/g, `\nhsl`).trim().split(`\n`);

  lines.forEach(line => {
    formatTestObjs.forEach(({ flag, isValid }) => {
      if(line.includes(flag) && isValid.test(line))
        listObj.store(line.match(isValid)[0]);
    });
  });

  listObj.updateList();
}


const pullfiles = function() {
  const file = fileUpload.files[0];
  const reader = new FileReader();
  reader.onload = function(evt) {
    contentFilter(evt.target.result);
  };
  reader.readAsText(file);
}

importList.addEventListener("click", () => {
  if(fileUpload) fileUpload.click();
}, false);

fileUpload.addEventListener("change", (e) => {
  pullfiles();
});