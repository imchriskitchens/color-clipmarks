//

const radios = document.querySelectorAll('input[type="radio"]');


const app = {
  mode: "userMode",

  // color format display controller
  setMode(mode, format) {
    app.mode = mode;
    colorContainer.querySelectorAll('.box').forEach(box => {
      box.querySelectorAll('p').forEach(item => {
        if(format in item.dataset === true)
          item.removeAttribute("hidden");
        else item.setAttribute("hidden", true);
      });
    });
  },

  getValues() {
    return Array.from(userInput.value.split("\n"))
      .filter(v => !!v & v.length > 3)
      .map(item => item.trim());
  },

  submit() {
    let boxID = 0;
    radios[0].checked = true;
    listFormat[0].selected = "selected";
    colorContainer.textContent = "";

    const isHEX = /^#([a-f\d]{6}|[a-f\d]{3})$/i
    const isRGB = /^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/i
    const isHSL = /^hsl\((\d{1,3}),(\d{1,3}%),(\d{1,3}%)\)$/i

    const conversions = (value) => {
      value = value.replace(/\s*/g, "");

      const [formatDEF, formatRGB, formatHEX, formatHSL] =
      (isHEX.test(value)) ? [value, hexToRGB(value), value, hexToHSL(value)] :
      (isRGB.test(value)) ? [value, value, rgbToHEX(value), rgbToHSL(value)] :
      (isHSL.test(value)) ? [value, hslToRGB(value), hslToHEX(value), value] : "";

      return { formatDEF, formatRGB, formatHEX, formatHSL };
    }

    app.getValues().forEach(color => {
      if(color !== "") {
        const instance = document.importNode(template.content, true);
        const { formatDEF, formatRGB, formatHEX, formatHSL } = conversions(color);
        instance.querySelector('.box').id = `box${boxID}`;
        instance.querySelector('.box').style.backgroundColor = formatRGB;
        instance.querySelector('[data-user]').textContent = formatDEF;
        instance.querySelector('[data-rgb]').textContent = formatRGB;
        instance.querySelector('[data-hex]').textContent = formatHEX;
        instance.querySelector('[data-hsl]').textContent = formatHSL;
        colorContainer.appendChild(instance);
        boxID++;
      }
    });
  },

  copyText(str) {
    const body = document.body;
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', "");
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    body.appendChild(el);
    const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
    el.select();
    document.execCommand('copy');
    body.removeChild(el);
    if(selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
  },

  copyAnim(el) {
    el = document.getElementById(el);
    el.className = "box pulse";
    el.addEventListener("animationend", () => {
      el.className = "box";
    }, false);
  },

  copyColor(el) {
    const modeStr = (app.mode).replace("Mode", "");
    const result = document.querySelector(`#${el} [data-${modeStr}]`);
    app.copyText(result.textContent);
  },

  init() {
    submitBtn.addEventListener("click", () => { app.submit() }, false);
    selectBtn.addEventListener("click", () => { userInput.select() }, false);
    sortBtn.addEventListener("click", () => { sortAll('userMode') }, false);

    colorContainer.addEventListener("click", (e) => {
      if(e.target && e.target.id !== "colorContainer") {
        app.copyAnim(e.target.id);
        app.copyColor(e.target.id);
      }
    }, false);

    footer.addEventListener("click", (e) => {
      if(e.target && e.target.nodeName == "INPUT")
        app.setMode(e.target.id, e.target.value);
    });
  }
};

app.init();



//