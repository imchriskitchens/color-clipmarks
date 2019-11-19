const contentFilter = (content) => {
  const isHEX = /(^#[a-f\d]{6}$)|(^#[a-f\d]{3}$)/i;
  const isRGB = /rgb\((\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\)/i;
  const isHSL = /hsl\((\d{1,3})\s*,\s*(\d{1,3}%)\s*,\s*(\d{1,3}%)\)/i;

  const formatTestObjs = [
    { flag: "#", isValid: isHEX },
    { flag: "rgb", isValid: isRGB },
    { flag: "hsl", isValid: isHSL }
  ];

  const listObj = {
    cleared: false,
    data: [],
    store(value) {
      return this.data.push(value);
    },
    clearList() {
      userInput.value = "";
      return this.cleared = true;
    },
    updateList() {
      const result = this.data.join("\n");
      userInput.value += (userInput.value === "") ? result : `\n${result}`;
      app.submit();
    }
  }

  const lines = content.trim().split(`\n`);

  lines.forEach(line => {
    formatTestObjs.forEach(({ flag, isValid }) => {

      if(line.includes(flag)) {
        const segments = line
          .replace(`;`, ``)
          .replace(`)`, `)\n`)
          .replace(flag, `\n${flag}`)
          .split(`\n`);

        ([...segments]).forEach(item => {
          if(isValid.test(item))
            listObj.store(item.match(isValid)[0]);
        });
      }
    });
  });

  listObj.clearList();
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
  // console.log(e.target.result);
  pullfiles();
});